import { useState, useEffect, useMemo } from 'react';
import { MoreVertical, Upload, GripVertical, Check, X, ChevronRight, ChevronDown, Maximize2, FileQuestion } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';
import DocumentContextMenu from './DocumentContextMenu';
import { Badge } from './ui/badge';

interface Page {
  id: string;
  pageNumber: number;
  thumbnail: string;
}

interface Document {
  id: string;
  name: string;
  pages: Page[];
  type?: string;
}

interface ModernThumbnailSidebarProps {
  documents: Document[];
  unclassifiedDocuments?: Document[];
  approvedDocuments?: Document[];
  rejectedDocuments?: Document[];
  currentDocumentId: string;
  currentPageNumber: number;
  onPageClick: (documentId: string, pageNumber: number) => void;
  onPageReclassify?: (pageId: string, sourceDocId: string, targetDocId: string) => void;
  onDocumentClassification?: (documentId: string, newType: string) => void;
  onDocumentReject?: (documentId: string, reason: string) => void;
  activeTab?: string;
}

interface DraggedPageData {
  pageId: string;
  documentId: string;
  pageNumber: number;
}

type ViewMode = 'list' | 'grid';

export default function ModernThumbnailSidebar({
  documents,
  unclassifiedDocuments = [],
  approvedDocuments = [],
  rejectedDocuments = [],
  currentDocumentId,
  currentPageNumber,
  onPageClick,
  onPageReclassify,
  onDocumentClassification,
  onDocumentReject,
  activeTab = 'exceptions',
}: ModernThumbnailSidebarProps) {
  console.log('=== MODERN THUMBNAIL SIDEBAR RENDER ===');
  console.log('📁 Regular Documents:', documents);
  console.log('❓ Unclassified Documents:', unclassifiedDocuments);
  console.log('✅ Approved Documents:', approvedDocuments);
  console.log('❌ Rejected Documents:', rejectedDocuments);
  console.log('🎯 Current Document ID:', currentDocumentId);
  console.log('🔖 Active Tab:', activeTab); // Add active tab logging
  
  const [sidebarWidth, setSidebarWidth] = useState(160);
  const [isResizing, setIsResizing] = useState(false);
  const [draggedPage, setDraggedPage] = useState<DraggedPageData | null>(null);
  const [dropTarget, setDropTarget] = useState<string | null>(null);
  const [dropZoneActive, setDropZoneActive] = useState<'approved' | 'rejected' | null>(null);
  const [hoveredPage, setHoveredPage] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [expandedDocs, setExpandedDocs] = useState<Set<string>>(new Set([currentDocumentId]));
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['active']));
  const [contextMenu, setContextMenu] = useState<{
    isOpen: boolean;
    position: { x: number; y: number };
    documentId: string;
    documentName: string;
    documentGroup: 'active' | 'approved' | 'rejected' | 'unclassified';
  } | null>(null);

  // Auto-expand current document
  useEffect(() => {
    setExpandedDocs(prev => new Set(prev).add(currentDocumentId));
  }, [currentDocumentId]);

  // Load saved width from localStorage
  useEffect(() => {
    const savedWidth = localStorage.getItem('sidebar-width');
    if (savedWidth) {
      setSidebarWidth(parseInt(savedWidth, 10));
    }
  }, []);

  // Handle resize
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };

  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newWidth = Math.max(120, Math.min(600, window.innerWidth - e.clientX));
      setSidebarWidth(newWidth);
      localStorage.setItem('sidebar-width', newWidth.toString());
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  // Drag handlers
  const handleDragStart = (e: React.DragEvent, page: Page, documentId: string) => {
    const dragData: DraggedPageData = {
      pageId: page.id,
      documentId,
      pageNumber: page.pageNumber,
    };
    
    setDraggedPage(dragData);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('application/json', JSON.stringify(dragData));
  };

  const handleDragEnd = () => {
    setDraggedPage(null);
    setDropTarget(null);
    setDropZoneActive(null);
  };

  const handleDrop = (targetDocumentId: string, targetType?: 'approved' | 'rejected') => {
    if (!draggedPage) return;

    if (draggedPage.documentId === targetDocumentId) {
      toast.error("Can't drop here - same document");
      setDraggedPage(null);
      setDropTarget(null);
      setDropZoneActive(null);
      return;
    }

    if (onPageReclassify) {
      onPageReclassify(draggedPage.pageId, draggedPage.documentId, targetDocumentId);
      
      const targetName = targetType === 'approved' ? 'Approved' : targetType === 'rejected' ? 'Rejected' : 'document';
      toast.success(`Page moved to ${targetName}`);
    }

    setDraggedPage(null);
    setDropTarget(null);
    setDropZoneActive(null);
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const toggleDocExpansion = (docId: string) => {
    setExpandedDocs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(docId)) {
        newSet.delete(docId);
      } else {
        newSet.add(docId);
      }
      return newSet;
    });
  };

  // Calculate grid columns based on width
  const gridCols = sidebarWidth >= 300 ? 3 : sidebarWidth >= 200 ? 2 : 1;

  // Filter documents based on active tab
  const filteredDocuments = useMemo(() => {
    if (activeTab === 'approved') {
      // When viewing approved tab, show only approved documents
      console.log('🔍 Filtering: Showing approved documents only');
      return approvedDocuments;
    } else {
      // When viewing exceptions tab, show only documents with exceptions (regular documents)
      console.log('🔍 Filtering: Showing exception documents only');
      return documents;
    }
  }, [activeTab, documents, approvedDocuments]);

  console.log('📋 Filtered Documents:', filteredDocuments);

  // Get existing document types from all documents
  const existingDocumentTypes = [
    ...new Set([
      ...documents.filter(doc => doc.name).map(doc => doc.name),
      ...approvedDocuments.filter(doc => doc.name).map(doc => doc.name)
    ])
  ].filter(Boolean);

  return (
    <div
      data-tour="doc-sidebar"
      className="flex h-full bg-white relative border-l border-[#E0E4E9]"
      style={{ width: `${sidebarWidth}px` }}
    >
      {/* Resize Handle */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-1 cursor-ew-resize hover:bg-[#2563EB] transition-colors z-50 ${
          isResizing ? 'bg-[#2563EB]' : 'bg-transparent'
        }`}
        onMouseDown={handleMouseDown}
      >
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-16 bg-gray-300 rounded-r-sm opacity-0 hover:opacity-100 transition-opacity" />
      </div>

      {/* Main Content */}
      <div className="flex flex-col w-full">
        {/* Header */}
        <div className="bg-white border-b border-[#E0E4E9] px-3 py-2.5 shrink-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-semibold text-[#1A1F36]">Docs</h3>
            <Button
              size="sm"
              variant="ghost"
              className="h-6 w-6 p-0 text-[#475467] hover:text-[#1A1F36] hover:bg-[#F5F7FA]"
              onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}
            >
              <Maximize2 className="h-3 w-3" />
            </Button>
          </div>
          
          <Button
            size="sm"
            className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs h-7"
          >
            <Upload className="h-3 w-3 mr-1" />
            Upload
          </Button>
        </div>

        {/* Scrollable Documents Area */}
        <div className="flex-1 overflow-y-auto bg-white">
          {/* Unclassified Documents Section - Purple themed, prominent */}
          {unclassifiedDocuments.length > 0 && (
            <div className="border-b-2 border-purple-200 bg-purple-50/30">
              <div className="px-1.5 py-2 space-y-1.5">
                {unclassifiedDocuments.map((document, index) => (
                  <UnclassifiedDocumentCard
                    key={document.id}
                    document={document}
                    documentIndex={index + 1}
                    currentDocumentId={currentDocumentId}
                    currentPageNumber={currentPageNumber}
                    onPageClick={onPageClick}
                    draggedPage={draggedPage}
                    hoveredPage={hoveredPage}
                    setHoveredPage={setHoveredPage}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    gridCols={gridCols}
                    setContextMenu={setContextMenu}
                    isExpanded={expandedDocs.has(document.id)}
                    onToggleExpand={() => toggleDocExpansion(document.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Regular Document Types */}
          <div className="px-1.5 py-1.5 space-y-1">
            {filteredDocuments.map((document) => (
              <DocumentCard
                key={document.id}
                document={document}
                currentDocumentId={currentDocumentId}
                currentPageNumber={currentPageNumber}
                onPageClick={onPageClick}
                draggedPage={draggedPage}
                dropTarget={dropTarget}
                setDropTarget={setDropTarget}
                hoveredPage={hoveredPage}
                setHoveredPage={setHoveredPage}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDrop={handleDrop}
                gridCols={gridCols}
                viewMode={viewMode}
                setContextMenu={setContextMenu}
                isExpanded={expandedDocs.has(document.id)}
                onToggleExpand={() => toggleDocExpansion(document.id)}
              />
            ))}
          </div>
        </div>

        {/* Sticky Bottom Section - Approved & Rejected */}
        <div className="border-t-2 border-gray-200 bg-gray-50 shrink-0">
          {/* Large Approved Drop Zone */}
          <DropZone
            type="approved"
            count={approvedDocuments.length}
            isActive={dropZoneActive === 'approved'}
            isDragging={!!draggedPage}
            documents={approvedDocuments}
            onDragEnter={() => setDropZoneActive('approved')}
            onDragLeave={() => setDropZoneActive(null)}
            onDrop={() => {
              if (approvedDocuments.length > 0) {
                handleDrop(approvedDocuments[0].id, 'approved');
              }
            }}
            currentDocumentId={currentDocumentId}
            currentPageNumber={currentPageNumber}
            onPageClick={onPageClick}
            gridCols={gridCols}
            viewMode={viewMode}
            isExpanded={expandedSections.has('approved')}
            onToggle={() => toggleSection('approved')}
            draggedPage={draggedPage}
            dropTarget={dropTarget}
            setDropTarget={setDropTarget}
            hoveredPage={hoveredPage}
            setHoveredPage={setHoveredPage}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDropOnDoc={handleDrop}
            setContextMenu={setContextMenu}
            expandedDocs={expandedDocs}
            onToggleDocExpand={toggleDocExpansion}
          />

          {/* Large Rejected Drop Zone */}
          <DropZone
            type="rejected"
            count={rejectedDocuments.length}
            isActive={dropZoneActive === 'rejected'}
            isDragging={!!draggedPage}
            documents={rejectedDocuments}
            onDragEnter={() => setDropZoneActive('rejected')}
            onDragLeave={() => setDropZoneActive(null)}
            onDrop={() => {
              if (rejectedDocuments.length > 0) {
                handleDrop(rejectedDocuments[0].id, 'rejected');
              }
            }}
            currentDocumentId={currentDocumentId}
            currentPageNumber={currentPageNumber}
            onPageClick={onPageClick}
            gridCols={gridCols}
            viewMode={viewMode}
            isExpanded={expandedSections.has('rejected')}
            onToggle={() => toggleSection('rejected')}
            draggedPage={draggedPage}
            dropTarget={dropTarget}
            setDropTarget={setDropTarget}
            hoveredPage={hoveredPage}
            setHoveredPage={setHoveredPage}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDropOnDoc={handleDrop}
            setContextMenu={setContextMenu}
            expandedDocs={expandedDocs}
            onToggleDocExpand={toggleDocExpansion}
          />
        </div>
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <DocumentContextMenu
          isOpen={contextMenu.isOpen}
          onClose={() => setContextMenu(null)}
          position={contextMenu.position}
          documentGroup={contextMenu.documentGroup}
          documentId={contextMenu.documentId}
          documentName={contextMenu.documentName}
          existingDocumentTypes={existingDocumentTypes}
          onChangeDocumentType={(newType) => {
            if (onDocumentClassification) {
              onDocumentClassification(contextMenu.documentId, newType);
            }
            setContextMenu(null);
          }}
          onDownload={() => {}}
          onMoveToLoadId={() => {}}
          onReject={(reason) => {
            if (onDocumentReject) {
              onDocumentReject(contextMenu.documentId, reason);
            }
            setContextMenu(null);
          }}
        />
      )}
    </div>
  );
}

// Document Card Component
interface DocumentCardProps {
  document: Document;
  currentDocumentId: string;
  currentPageNumber: number;
  onPageClick: (documentId: string, pageNumber: number) => void;
  draggedPage: DraggedPageData | null;
  dropTarget: string | null;
  setDropTarget: (target: string | null) => void;
  hoveredPage: string | null;
  setHoveredPage: (page: string | null) => void;
  onDragStart: (e: React.DragEvent, page: Page, documentId: string) => void;
  onDragEnd: () => void;
  onDrop: (targetDocumentId: string) => void;
  gridCols: number;
  viewMode: ViewMode;
  setContextMenu: (menu: any) => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
  readOnly?: boolean; // View-only mode for approved documents
}

function DocumentCard({
  document,
  currentDocumentId,
  currentPageNumber,
  onPageClick,
  draggedPage,
  dropTarget,
  setDropTarget,
  hoveredPage,
  setHoveredPage,
  onDragStart,
  onDragEnd,
  onDrop,
  gridCols,
  viewMode,
  setContextMenu,
  isExpanded,
  onToggleExpand,
  readOnly = false,
}: DocumentCardProps) {
  const isCurrentDocument = document.id === currentDocumentId;
  const isDropTarget = dropTarget === document.id;

  return (
    <div>
      {/* Compact Document Header - Always Visible, Acts as Drop Target */}
      <div
        className={`flex items-center justify-between px-2 py-1.5 rounded transition-all cursor-pointer ${
          isDropTarget
            ? 'bg-blue-200 ring-2 ring-blue-500'
            : isCurrentDocument 
              ? 'bg-blue-50 border border-blue-400' 
              : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
        }`}
        onClick={() => {
          // Navigate to first page of this document
          if (document.pages.length > 0) {
            onPageClick(document.id, document.pages[0].pageNumber);
          }
        }}
        onDragOver={(e) => {
          if (readOnly) return;
          e.preventDefault();
          e.stopPropagation();
          setDropTarget(document.id);
        }}
        onDragEnter={(e) => {
          if (readOnly) return;
          e.preventDefault();
          setDropTarget(document.id);
        }}
        onDragLeave={(e) => {
          if (readOnly) return;
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX;
          const y = e.clientY;
          if (x < rect.left || x >= rect.right || y < rect.top || y >= rect.bottom) {
            setDropTarget(null);
          }
        }}
        onDrop={(e) => {
          if (readOnly) return;
          e.preventDefault();
          e.stopPropagation();
          onDrop(document.id);
        }}
      >
        <div className="flex items-center gap-1.5 flex-1 min-w-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleExpand();
            }}
            className="shrink-0 hover:bg-white/50 rounded p-0.5"
          >
            {isExpanded ? (
              <ChevronDown className="h-3 w-3 text-gray-600" />
            ) : (
              <ChevronRight className="h-3 w-3 text-gray-600" />
            )}
          </button>
          <div className={`w-0.5 h-4 rounded-full shrink-0 ${isCurrentDocument ? 'bg-blue-500' : 'bg-gray-300'}`} />
          <span className={`text-[11px] font-medium truncate ${
            isCurrentDocument ? 'text-blue-900' : 'text-gray-900'
          }`}>
            {document.name}
          </span>
          {document.type && (
            <Badge variant="outline" className="text-[9px] px-1 py-0 h-3.5 shrink-0">
              {document.type}
            </Badge>
          )}
          <Badge variant="secondary" className="text-[9px] px-1 py-0 h-3.5 shrink-0 ml-auto">
            {document.pages.length}p
          </Badge>
        </div>
        <Button
          size="sm"
          variant="ghost"
          className="h-5 w-5 p-0 shrink-0"
          onClick={(e) => {
            e.stopPropagation();
            const rect = e.currentTarget.getBoundingClientRect();
            setContextMenu({
              isOpen: true,
              position: { x: rect.right, y: rect.top },
              documentId: document.id,
              documentName: document.name,
              documentGroup: 'active',
            });
          }}
        >
          <MoreVertical className="h-3 w-3" />
        </Button>
      </div>

      {/* Expandable Thumbnails Grid */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="overflow-hidden"
          >
            <div className="pt-1.5 px-1.5">
              <div
                className={`rounded p-1.5 transition-all ${
                  isCurrentDocument ? 'bg-blue-50/50' : 'bg-gray-50'
                }`}
              >
                <div className={`grid gap-1.5 ${
                  gridCols === 3 ? 'grid-cols-3' : gridCols === 2 ? 'grid-cols-2' : 'grid-cols-1'
                }`}>
                  {document.pages.map((page) => (
                    <ThumbnailCard
                      key={page.id}
                      page={page}
                      documentId={document.id}
                      documentName={document.name}
                      isActive={currentDocumentId === document.id && currentPageNumber === page.pageNumber}
                      isHovered={hoveredPage === `${document.id}-${page.pageNumber}`}
                      isDragging={draggedPage?.pageId === page.id}
                      onPageClick={onPageClick}
                      onHoverChange={(hovered) => setHoveredPage(hovered ? `${document.id}-${page.pageNumber}` : null)}
                      onDragStart={onDragStart}
                      onDragEnd={onDragEnd}
                      readOnly={readOnly}
                      setContextMenu={setContextMenu}
                      documentGroup={readOnly ? 'approved' : 'active'}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Thumbnail Card Component
interface ThumbnailCardProps {
  page: Page;
  documentId: string;
  documentName: string;
  isActive: boolean;
  isHovered: boolean;
  isDragging: boolean;
  onPageClick: (documentId: string, pageNumber: number) => void;
  onHoverChange: (hovered: boolean) => void;
  onDragStart: (e: React.DragEvent, page: Page, documentId: string) => void;
  onDragEnd: () => void;
  readOnly?: boolean; // View-only mode for approved documents
  setContextMenu?: (menu: any) => void;
  documentGroup?: 'active' | 'approved' | 'rejected' | 'unclassified';
}

function ThumbnailCard({
  page,
  documentId,
  documentName,
  isActive,
  isHovered,
  isDragging,
  onPageClick,
  onHoverChange,
  onDragStart,
  onDragEnd,
  readOnly = false,
  setContextMenu,
  documentGroup = 'active',
}: ThumbnailCardProps) {
  return (
    <motion.div
      className={`group relative bg-white rounded shadow-sm hover:shadow-md transition-all max-w-[100px] mx-auto ${
        readOnly ? 'cursor-pointer' : 'cursor-grab active:cursor-grabbing'
      } ${
        isDragging ? 'opacity-50' : ''
      } ${isActive ? 'ring-1 ring-blue-500' : ''}`}
      draggable={!readOnly}
      onDragStart={(e) => {
        if (readOnly) {
          e.preventDefault();
          return;
        }
        onDragStart(e, page, documentId);
      }}
      onDragEnd={onDragEnd}
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
      onClick={() => onPageClick(documentId, page.pageNumber)}
      onContextMenu={(e) => {
        // Only show context menu for classified documents (not unclassified)
        if (setContextMenu && documentGroup !== 'unclassified') {
          e.preventDefault();
          e.stopPropagation();
          setContextMenu({
            isOpen: true,
            position: { x: e.clientX, y: e.clientY },
            documentId: documentId,
            documentName: documentName,
            documentGroup: documentGroup,
          });
        }
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Drag Handle */}
      {!readOnly && (
        <div className="absolute top-1 left-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-white/90 backdrop-blur-sm rounded p-0.5 shadow-sm">
            <GripVertical className="h-2.5 w-2.5 text-gray-600" />
          </div>
        </div>
      )}

      {/* Thumbnail Image */}
      <div className="aspect-[8.5/11] relative overflow-hidden rounded-t">
        <img
          src={page.thumbnail}
          alt={`${documentName} page ${page.pageNumber}`}
          className="w-full h-full object-cover"
        />
        
        {/* Active Overlay */}
        {isActive && (
          <div className="absolute inset-0 bg-blue-500/10 border border-blue-500 rounded-t" />
        )}
      </div>

      {/* Info Footer */}
      <div className="px-1.5 py-1">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-medium text-gray-700">P{page.pageNumber}</span>
          {isActive && (
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Drop Zone Component
interface DropZoneProps {
  type: 'approved' | 'rejected';
  count: number;
  isActive: boolean;
  isDragging: boolean;
  documents: Document[];
  onDragEnter: () => void;
  onDragLeave: () => void;
  onDrop: () => void;
  currentDocumentId: string;
  currentPageNumber: number;
  onPageClick: (documentId: string, pageNumber: number) => void;
  gridCols: number;
  viewMode: ViewMode;
  isExpanded: boolean;
  onToggle: () => void;
  draggedPage?: DraggedPageData | null;
  dropTarget?: string | null;
  setDropTarget?: (target: string | null) => void;
  hoveredPage?: string | null;
  setHoveredPage?: (page: string | null) => void;
  onDragStart?: (e: React.DragEvent, page: Page, documentId: string) => void;
  onDragEnd?: () => void;
  onDropOnDoc?: (targetDocumentId: string) => void;
  setContextMenu?: (menu: any) => void;
  expandedDocs?: Set<string>;
  onToggleDocExpand?: (docId: string) => void;
}

function DropZone({
  type,
  count,
  isActive,
  isDragging,
  documents,
  onDragEnter,
  onDragLeave,
  onDrop,
  currentDocumentId,
  currentPageNumber,
  onPageClick,
  gridCols,
  viewMode,
  isExpanded,
  onToggle,
  draggedPage,
  dropTarget,
  setDropTarget,
  hoveredPage,
  setHoveredPage,
  onDragStart,
  onDragEnd,
  onDropOnDoc,
  setContextMenu,
  expandedDocs,
  onToggleDocExpand,
}: DropZoneProps) {
  const config = {
    approved: {
      icon: Check,
      label: 'Approved',
      bgColor: 'bg-green-50',
      hoverColor: 'bg-green-100',
      activeColor: 'bg-green-200',
      borderColor: 'border-green-300',
      activeBorderColor: 'border-green-500',
      textColor: 'text-green-900',
      iconColor: 'text-green-600',
      badgeColor: 'bg-green-500',
    },
    rejected: {
      icon: X,
      label: 'Rejected',
      bgColor: 'bg-red-50',
      hoverColor: 'bg-red-100',
      activeColor: 'bg-red-200',
      borderColor: 'border-red-300',
      activeBorderColor: 'border-red-500',
      textColor: 'text-red-900',
      iconColor: 'text-red-600',
      badgeColor: 'bg-red-500',
    },
  };

  const style = config[type];
  const Icon = style.icon;

  return (
    <div
      className={`border-t transition-all ${
        isActive 
          ? `${style.activeColor} ${style.activeBorderColor} border-t-2` 
          : `${style.bgColor} ${style.borderColor}`
      }`}
      onDragEnter={onDragEnter}
      onDragOver={(e) => {
        e.preventDefault();
        onDragEnter();
      }}
      onDragLeave={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX;
        const y = e.clientY;
        if (x < rect.left || x >= rect.right || y < rect.top || y >= rect.bottom) {
          onDragLeave();
        }
      }}
      onDrop={(e) => {
        e.preventDefault();
        onDrop();
      }}
    >
      {/* Header/Drop Zone */}
      <button
        onClick={onToggle}
        className={`w-full px-2 py-2 flex items-center justify-between transition-all ${
          isDragging ? `${style.hoverColor} cursor-copy` : 'hover:bg-opacity-80'
        }`}
      >
        <div className="flex items-center gap-2">
          <div className={`p-1 rounded ${isActive ? style.activeColor : style.bgColor}`}>
            <Icon className={`h-3 w-3 ${style.iconColor}`} />
          </div>
          <div className="flex items-center gap-1.5">
            <span className={`text-xs font-semibold ${style.textColor}`}>
              {style.label}
            </span>
            <Badge className={`${style.badgeColor} text-white text-[10px] h-4 px-1`}>
              {count}
            </Badge>
          </div>
        </div>
        {isExpanded ? (
          <ChevronDown className={`h-3 w-3 ${style.iconColor} shrink-0`} />
        ) : (
          <ChevronRight className={`h-3 w-3 ${style.iconColor} shrink-0`} />
        )}
      </button>

      {/* Drop Hint */}
      <AnimatePresence>
        {isDragging && isActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`px-2 py-1.5 text-center ${style.textColor} text-[10px] font-medium`}
          >
            Drop here to {type === 'approved' ? 'approve' : 'reject'}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded Documents */}
      <AnimatePresence>
        {isExpanded && count > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden px-1.5 py-1.5 max-h-48 overflow-y-auto"
          >
            {/* Render full DocumentCard components for approved/rejected documents */}
            <div className="space-y-1">
              {documents.map((document) => (
                <DocumentCard
                  key={document.id}
                  document={document}
                  currentDocumentId={currentDocumentId}
                  currentPageNumber={currentPageNumber}
                  onPageClick={onPageClick}
                  draggedPage={draggedPage || null}
                  dropTarget={dropTarget || null}
                  setDropTarget={setDropTarget || (() => {})}
                  hoveredPage={hoveredPage || null}
                  setHoveredPage={setHoveredPage || (() => {})}
                  onDragStart={onDragStart || (() => {})}
                  onDragEnd={onDragEnd || (() => {})}
                  onDrop={onDropOnDoc || (() => {})}
                  gridCols={gridCols}
                  viewMode={viewMode}
                  setContextMenu={setContextMenu || (() => {})}
                  isExpanded={expandedDocs?.has(document.id) || false}
                  onToggleExpand={() => onToggleDocExpand?.(document.id)}
                  readOnly={type === 'approved'} // View-only for approved documents
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Unclassified Document Card Component
interface UnclassifiedDocumentCardProps {
  document: Document;
  documentIndex: number;
  currentDocumentId: string;
  currentPageNumber: number;
  onPageClick: (documentId: string, pageNumber: number) => void;
  draggedPage: DraggedPageData | null;
  hoveredPage: string | null;
  setHoveredPage: (page: string | null) => void;
  onDragStart: (e: React.DragEvent, page: Page, documentId: string) => void;
  onDragEnd: () => void;
  gridCols: number;
  setContextMenu: (menu: any) => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

function UnclassifiedDocumentCard({
  document,
  documentIndex,
  currentDocumentId,
  currentPageNumber,
  onPageClick,
  draggedPage,
  hoveredPage,
  setHoveredPage,
  onDragStart,
  onDragEnd,
  gridCols,
  setContextMenu,
  isExpanded,
  onToggleExpand,
}: UnclassifiedDocumentCardProps) {
  const isCurrentDocument = document.id === currentDocumentId;

  return (
    <div>
      {/* Compact Document Header - Purple themed for unclassified */}
      <div
        className={`flex items-center justify-between px-2 py-1.5 rounded transition-all cursor-pointer border-2 ${
          isCurrentDocument 
            ? 'bg-purple-100 border-purple-500 ring-1 ring-purple-400' 
            : 'bg-purple-50 border-purple-300 hover:bg-purple-100/80 hover:border-purple-400'
        }`}
        onClick={() => {
          // Navigate to first page of this document
          if (document.pages.length > 0) {
            onPageClick(document.id, document.pages[0].pageNumber);
          }
        }}
      >
        <div className="flex items-center gap-1.5 flex-1 min-w-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleExpand();
            }}
            className="shrink-0 hover:bg-purple-200 rounded p-0.5"
          >
            {isExpanded ? (
              <ChevronDown className="h-3 w-3 text-purple-700" />
            ) : (
              <ChevronRight className="h-3 w-3 text-purple-700" />
            )}
          </button>
          <div className={`w-0.5 h-4 rounded-full shrink-0 ${isCurrentDocument ? 'bg-purple-600' : 'bg-purple-300'}`} />
          <span className="text-[11px] font-semibold truncate text-purple-900">
            Unclassified#{documentIndex}
          </span>
          <Badge className="bg-purple-600 text-white text-[9px] px-1 py-0 h-3.5 shrink-0 ml-auto">
            {document.pages.length}p
          </Badge>
        </div>
        <Button
          size="sm"
          variant="ghost"
          className="h-5 w-5 p-0 shrink-0 hover:bg-purple-200"
          onClick={(e) => {
            e.stopPropagation();
            const rect = e.currentTarget.getBoundingClientRect();
            console.log('🔵 Unclassified Document Context Menu Opened');
            console.log('Document Object:', document);
            console.log('Document ID:', document.id);
            console.log('Document Name:', document.name);
            console.log('Document Type:', document.type);
            setContextMenu({
              isOpen: true,
              position: { x: rect.right, y: rect.top },
              documentId: document.id,
              documentName: `Unclassified#${documentIndex}`,
              documentGroup: 'unclassified',
            });
          }}
        >
          <MoreVertical className="h-3 w-3 text-purple-700" />
        </Button>
      </div>

      {/* Expandable Thumbnails Grid */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="overflow-hidden"
          >
            <div className="pt-1.5 px-1.5">
              <div className="rounded p-1.5 transition-all bg-purple-50/50">
                <div className={`grid gap-1.5 ${
                  gridCols === 3 ? 'grid-cols-3' : gridCols === 2 ? 'grid-cols-2' : 'grid-cols-1'
                }`}>
                  {document.pages.map((page) => (
                    <UnclassifiedThumbnailCard
                      key={page.id}
                      page={page}
                      documentId={document.id}
                      documentName={document.name}
                      isActive={currentDocumentId === document.id && currentPageNumber === page.pageNumber}
                      isHovered={hoveredPage === `${document.id}-${page.pageNumber}`}
                      isDragging={draggedPage?.pageId === page.id}
                      onPageClick={onPageClick}
                      onHoverChange={(hovered) => setHoveredPage(hovered ? `${document.id}-${page.pageNumber}` : null)}
                      onDragStart={onDragStart}
                      onDragEnd={onDragEnd}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Unclassified Thumbnail Card Component
interface UnclassifiedThumbnailCardProps {
  page: Page;
  documentId: string;
  documentName: string;
  isActive: boolean;
  isHovered: boolean;
  isDragging: boolean;
  onPageClick: (documentId: string, pageNumber: number) => void;
  onHoverChange: (hovered: boolean) => void;
  onDragStart: (e: React.DragEvent, page: Page, documentId: string) => void;
  onDragEnd: () => void;
}

function UnclassifiedThumbnailCard({
  page,
  documentId,
  documentName,
  isActive,
  isHovered,
  isDragging,
  onPageClick,
  onHoverChange,
  onDragStart,
  onDragEnd,
}: UnclassifiedThumbnailCardProps) {
  return (
    <motion.div
      className={`group relative bg-white rounded shadow-sm hover:shadow-md transition-all cursor-grab active:cursor-grabbing max-w-[100px] mx-auto ${
        isDragging ? 'opacity-50' : ''
      } ${isActive ? 'ring-1 ring-blue-500' : ''}`}
      draggable
      onDragStart={(e) => onDragStart(e, page, documentId)}
      onDragEnd={onDragEnd}
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
      onClick={() => onPageClick(documentId, page.pageNumber)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Drag Handle */}
      <div className="absolute top-1 left-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="bg-white/90 backdrop-blur-sm rounded p-0.5 shadow-sm">
          <GripVertical className="h-2.5 w-2.5 text-gray-600" />
        </div>
      </div>

      {/* Thumbnail Image */}
      <div className="aspect-[8.5/11] relative overflow-hidden rounded-t">
        <img
          src={page.thumbnail}
          alt={`${documentName} page ${page.pageNumber}`}
          className="w-full h-full object-cover"
        />
        
        {/* Active Overlay */}
        {isActive && (
          <div className="absolute inset-0 bg-blue-500/10 border border-blue-500 rounded-t" />
        )}
      </div>

      {/* Info Footer */}
      <div className="px-1.5 py-1">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-medium text-gray-700">P{page.pageNumber}</span>
          {isActive && (
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
          )}
        </div>
      </div>
    </motion.div>
  );
}