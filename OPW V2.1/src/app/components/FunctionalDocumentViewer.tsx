import { useState, useRef, useEffect } from 'react';
import { useDocumentViewerStore, DocumentTypeCategory, Document, DocumentPage } from './DocumentViewerStore';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner';
import {
  RotateCw,
  RotateCcw,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
  Search,
  Download,
  ExternalLink,
  Upload,
  ArrowLeft,
  ArrowRight,
  ChevronsLeft,
  ChevronsRight,
  MoreVertical,
  Menu,
  X,
  FileText,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';

export default function FunctionalDocumentViewer() {
  
  const {
    documents,
    activePageId,
    zoomMode,
    zoomPercent,
    rotationDeg,
    hoverZoomEnabled,
    getActiveDocument,
    getActivePage,
    getDocumentsByType,
    getAllDocumentTypes,
    setActivePage,
    nextPage,
    prevPage,
    firstPage,
    lastPage,
    movePage,
    reorderPage,
    rejectPage,
    rejectDocument,
    setZoomMode,
    toggleHoverZoom,
    rotateLeft,
    rotateRight,
    zoomIn,
    zoomOut
  } = useDocumentViewerStore();

  const [hoverZoomPosition, setHoverZoomPosition] = useState<{ x: number; y: number } | null>(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [toolbarWidth, setToolbarWidth] = useState(0);
  const [approvedExpanded, setApprovedExpanded] = useState(false);
  const [thumbnailSidebarCollapsed, setThumbnailSidebarCollapsed] = useState(false);
  const [thumbnailSidebarWidth, setThumbnailSidebarWidth] = useState(320);
  const [isResizing, setIsResizing] = useState(false);
  
  const viewerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const thumbnailSidebarRef = useRef<HTMLDivElement>(null);

  const activeDoc = getActiveDocument();
  const activePageData = getActivePage();
  const documentTypes = getAllDocumentTypes();

  // Filter out Unclassified for main list
  const mainDocumentTypes = documentTypes.filter(type => type !== 'Unclassified');
  const unclassifiedDocs = getDocumentsByType('Unclassified');

  // Determine sidebar mode based on viewport
  const isOverlayMode = windowWidth < 1040;
  
  const getSidebarWidth = () => {
    if (windowWidth >= 1440) return 240;
    if (windowWidth >= 1280) return Math.floor(windowWidth * 0.18);
    if (windowWidth >= 1040) return Math.max(160, Math.floor(windowWidth * 0.15));
    return 220; // overlay mode
  };

  const sidebarWidth = getSidebarWidth();

  // Track window width for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth <= 900 && isOverlayMode) {
        setIsOverlayOpen(false);
      }
      if (toolbarRef.current) {
        setToolbarWidth(toolbarRef.current.offsetWidth);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOverlayMode]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '=')) {
        e.preventDefault();
        zoomIn();
      } else if ((e.ctrlKey || e.metaKey) && e.key === '-') {
        e.preventDefault();
        zoomOut();
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        rotateRight();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextPage();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevPage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [zoomIn, zoomOut, rotateRight, nextPage, prevPage]);

  // Close overlay on outside click
  useEffect(() => {
    if (!isOverlayMode || !isOverlayOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        setIsOverlayOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOverlayMode, isOverlayOpen]);

  // Resize handler for thumbnail sidebar
  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!thumbnailSidebarRef.current) return;
      
      const containerWidth = window.innerWidth;
      const maxWidth = containerWidth * 0.7;
      const minWidth = 256; // 320px * 0.8 (allow 20% smaller)
      
      // Calculate new width from right edge (since sidebar is on right)
      const newWidth = containerWidth - e.clientX;
      const clampedWidth = Math.max(minWidth, Math.min(maxWidth, newWidth));
      
      setThumbnailSidebarWidth(clampedWidth);
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

  // Responsive toolbar visibility
  const showDownload = toolbarWidth >= 1100;
  const showOpenWindow = toolbarWidth >= 1000;
  const showHoverZoomButton = toolbarWidth >= 900;
  const showFirstLast = toolbarWidth >= 800;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hoverZoomEnabled || !imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setHoverZoomPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setHoverZoomPosition(null);
  };

  const handleDownload = () => {
    if (!activeDoc) return;
    toast.success(`Downloading ${activeDoc.name}`);
  };

  const handleOpenNewWindow = () => {
    if (!activeDoc) return;
    toast.success(`Opening ${activeDoc.name} in new window`);
  };

  const handleUploadReplacement = () => {
    toast.success('Upload new document');
  };

  // Arrow button handlers for page reordering - handled inside PageThumbnail component

  // Get the active document ID to highlight the entire group
  const activeDocumentId = activeDoc?.id;

  // Page thumbnail component (.PageThumb in spec)
  const PageThumbnail = ({ 
    page, 
    document,
    pageIndex,
    isFirst,
    isLast
  }: { 
    page: DocumentPage;
    document: Document;
    pageIndex: number;
    isFirst: boolean;
    isLast: boolean;
  }) => {
    const isActive = page.id === activePageId;
    const isMultiPage = document.pages.length > 1;
    const allDocuments = documents;
    const otherDocuments = allDocuments.filter(d => d.id !== document.id);
    
    const handleMoveUp = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!isFirst) {
        reorderPage(page.id, document.id, pageIndex - 1);
        toast.success('Page moved up');
      }
    };
    
    const handleMoveDown = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!isLast) {
        reorderPage(page.id, document.id, pageIndex + 1);
        toast.success('Page moved down');
      }
    };
    
    const handleMoveToDocument = (targetDocId: string, e: React.MouseEvent) => {
      e.stopPropagation();
      const targetDoc = allDocuments.find(d => d.id === targetDocId);
      if (targetDoc) {
        movePage(page.id, targetDoc.documentType, targetDocId);
        toast.success(`Page moved to ${targetDoc.name}`);
      }
    };
    
    const handleSplitToNew = (e: React.MouseEvent) => {
      e.stopPropagation();
      // This would create a new document from this page
      toast.info('Split to new document - coming soon');
    };
    
    return (
      <div 
        className="PageThumb relative group page-thumbnail-container"
      >
        {/* Outer container */}
        <div 
          onClick={() => setActivePage(page.id)}
          className={`relative rounded-[6px] cursor-pointer transition-all ${
            isActive 
              ? 'bg-[rgba(0,0,0,0.2)]' 
              : 'group-hover:bg-[rgba(0,0,0,0.05)]'
          }`}
        >
          <div className="flex flex-col items-center size-full">
            <div className="box-border content-stretch flex flex-col gap-[4px] items-center p-[8px] relative size-full">
              {/* Thumbnail container */}
              <div className="aspect-[79/111] relative rounded-[4px] shrink-0 w-full">
                <div className="aspect-[79/111] overflow-clip relative rounded-[inherit] size-full">
                  {/* Image container - with hover zoom effect */}
                  <div className={`absolute aspect-[79/111] left-1/2 rounded-[1.817px] translate-x-[-50%] ${
                    isActive 
                      ? 'bottom-0 top-0' 
                      : 'bottom-0 top-0 group-hover:bottom-[-6px] group-hover:top-[-6px]'
                  }`}>
                    <img
                      alt=""
                      draggable={false}
                      className="absolute inset-0 max-w-none object-50%-50% object-cover rounded-[1.817px] size-full"
                      src={page.imageUrl}
                    />
                    {/* Inner border - white for resting/hover, light blue for selected */}
                    <div 
                      aria-hidden="true" 
                      className={`absolute border-solid pointer-events-none ${
                        isActive 
                          ? 'border-[#72cdf4] border-[3px] inset-[-3px] rounded-[4.817px]'
                          : 'border-white border-[1.817px] inset-[-1.817px] rounded-[3.634px]'
                      }`}
                    />
                  </div>
                  
                  {/* Page number badge - gets darker on hover and selected */}
                  {isMultiPage && (
                    <div className={`absolute backdrop-blur-[0.5px] backdrop-filter bottom-0 box-border content-stretch flex gap-[10px] items-center left-0 px-[8px] py-[4px] right-0 ${
                      isActive 
                        ? 'bg-[rgba(0,0,0,0.59)]' 
                        : 'bg-[rgba(0,0,0,0.39)] group-hover:bg-[rgba(0,0,0,0.49)]'
                    }`}>
                      <div className="flex flex-col font-medium justify-center leading-[0] relative shrink-0 text-[10px] text-center text-nowrap text-white select-none">
                        <p className="leading-[normal] whitespace-pre">Pg. {page.pageNumber}</p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Outer border - gray for resting/hover, dark blue for selected */}
                <div 
                  aria-hidden="true" 
                  className={`absolute border-solid inset-0 pointer-events-none rounded-[4px] ${
                    isActive 
                      ? 'border-2 border-[#2474bb]'
                      : 'border border-[#e2e6eb]'
                  }`}
                />
                
                {/* Control buttons - show on hover */}
                <div className="absolute top-[-8px] right-[-8px] opacity-0 group-hover:opacity-100 transition-opacity flex gap-[4px] z-10">
                  {/* Move Up Button */}
                  {!isFirst && (
                    <button
                      onClick={handleMoveUp}
                      className="bg-white border border-[#2474bb] rounded-[2px] size-[20px] flex items-center justify-center hover:bg-[#eef6fb] transition-colors shadow-sm"
                      title="Move page up"
                    >
                      <ChevronUp className="h-[12px] w-[12px] text-[#2474bb]" />
                    </button>
                  )}
                  
                  {/* Move Down Button */}
                  {!isLast && (
                    <button
                      onClick={handleMoveDown}
                      className="bg-white border border-[#2474bb] rounded-[2px] size-[20px] flex items-center justify-center hover:bg-[#eef6fb] transition-colors shadow-sm"
                      title="Move page down"
                    >
                      <ChevronDown className="h-[12px] w-[12px] text-[#2474bb]" />
                    </button>
                  )}
                  
                  {/* More Options Menu */}
                  {otherDocuments.length > 0 && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className="bg-white border border-[#2474bb] rounded-[2px] size-[20px] flex items-center justify-center hover:bg-[#eef6fb] transition-colors shadow-sm"
                          title="More options"
                        >
                          <MoreVertical className="h-[12px] w-[12px] text-[#2474bb]" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[200px]">
                        <div className="px-2 py-1.5 text-[11px] text-[#747d89]">Move to document:</div>
                        {otherDocuments.map(doc => (
                          <DropdownMenuItem 
                            key={doc.id}
                            onClick={(e) => handleMoveToDocument(doc.id, e)}
                            className="text-[11px]"
                          >
                            <FileText className="h-[12px] w-[12px] mr-2" />
                            {doc.name}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </div>

              {/* Context menu for individual page - top right */}
              <div className="absolute top-[12px] right-[12px] opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-auto">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button 
                      className="p-[4px] bg-white hover:bg-white rounded-[3px] shadow-md border border-[#c6ccd6] hover:border-[#2474bb] transition-colors"
                      onClick={(e) => e.stopPropagation()}
                      onMouseDown={(e) => e.stopPropagation()}
                    >
                      <MoreVertical className="h-[14px] w-[14px] text-[#5a626f]" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={(e) => {
                      e.stopPropagation();
                      rejectPage(page.id);
                      toast.success('Page rejected');
                    }}>
                      <X className="h-[14px] w-[14px] mr-2" />
                      Reject Page
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Drop zone component - shows blue insertion line between pages when hovering
  const DropZone = ({
    documentId,
    index,
    onDrop,
    onDragOver
  }: {
    documentId: string;
    index: number;
    onDrop: (e: React.DragEvent, documentId: string, index: number) => void;
    onDragOver: (e: React.DragEvent) => void;
  }) => {
    const isActive = localDropTarget?.documentId === documentId && localDropTarget?.index === index;
    const isDraggingAny = !!draggedPage;
    
    return (
      <div
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setLocalDropTarget({ documentId, index });
          onDragOver(e);
        }}
        onDragLeave={(e) => {
          e.stopPropagation();
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX;
          const y = e.clientY;
          if (x < rect.left || x >= rect.right || y < rect.top || y >= rect.bottom) {
            setLocalDropTarget(null);
          }
        }}
        onDrop={(e) => onDrop(e, documentId, index)}
        className="relative flex items-center justify-center transition-all"
        style={{ 
          height: isActive ? '12px' : (isDraggingAny ? '8px' : '0px'),
          margin: 0
        }}
      >
        {/* Blue insertion line - only shows when actively hovering */}
        {isActive && (
          <div className="absolute inset-x-0 h-[2px] bg-[#2474bb] rounded-full" />
        )}
      </div>
    );
  };

  // Document group component - pages stacked vertically (.DocumentGroup in spec)
  const DocumentGroup = ({ 
    document,
    isActiveDoc
  }: { 
    document: Document;
    isActiveDoc: boolean;
  }) => {
    return (
      <div 
        className={`DocumentGroup p-[5px] rounded-[4px] ${
          isActiveDoc ? 'bg-[#c8dcee]' : ''
        }`}
      >
        <div className="flex flex-col gap-[11px]">
          {document.pages.map((page, index) => (
            <div key={page.id} className="relative">
              {/* The page thumbnail */}
              <PageThumbnail
                page={page}
                document={document}
                pageIndex={index}
                isFirst={index === 0}
                isLast={index === document.pages.length - 1}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Document type section component - vertical column
  const DocumentTypeSection = ({ 
    docType,
    isUnclassified = false
  }: { 
    docType: DocumentTypeCategory;
    isUnclassified?: boolean;
  }) => {
    const docsOfType = getDocumentsByType(docType);
    if (docsOfType.length === 0) return null;

    const bgColor = isUnclassified ? 'bg-[#fbf7ff]' : 'bg-[#fbfcfc]';
    const borderColor = isUnclassified ? 'border-[#ead6fd]' : 'border-[#eff2f4]';
    const badgeBgColor = isUnclassified ? 'bg-[#ead6fd]' : 'bg-[#e2e6eb]';

    // Check if any document in this type is active
    const hasActiveDoc = docsOfType.some(doc => doc.id === activeDocumentId);
    const activeBg = hasActiveDoc && !isUnclassified ? 'bg-[#f1fafe]' : bgColor;
    const activeBorder = hasActiveDoc && !isUnclassified ? 'border-[#e3f5fd]' : borderColor;

    // Determine if we're in single column mode
    const isSingleColumn = thumbnailSidebarWidth <= 280;

    return (
      <div 
        className={`${activeBg} border ${activeBorder} rounded-[4px] p-[8px] flex flex-col gap-[8px] min-h-0 ${
          isSingleColumn 
            ? 'w-full' 
            : 'basis-0 grow shrink-0 min-w-[100px] max-w-[164px]'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between shrink-0">
          <span className="text-[#3d3d3d] text-[10px] font-bold">
            {docType}
          </span>
          <div className={`${badgeBgColor} rounded-[9px] size-[16px] flex items-center justify-center`}>
            <span className="text-[#3d3d3d] text-[10px] font-semibold">
              {docsOfType.length}
            </span>
          </div>
        </div>

        {/* Documents - stacked vertically */}
        <div className="flex flex-col gap-[8px]">
          {docsOfType.map((doc) => (
            <DocumentGroup 
              key={doc.id}
              document={doc}
              isActiveDoc={doc.id === activeDocumentId}
            />
          ))}
        </div>
      </div>
    );
  };

  // Sidebar content component
  const SidebarContent = () => (
    <>
      {/* Upload Button */}
      <div className="bg-white p-[10px] shrink-0">
        <button
          onClick={handleUploadReplacement}
          className="w-full h-[26px] bg-white border border-[#2474bb] rounded-[4px] text-[#2474bb] text-[12px] font-['Roboto'] px-[8px] flex items-center justify-center gap-[10px] hover:bg-[#eef6fb] transition-colors"
        >
          <Upload className="h-[16px] w-[16px]" />
          Upload
        </button>
      </div>

      {/* Documents Area */}
      <div className="flex-1 overflow-y-auto px-[8px] py-[8px] bg-white">
        <div 
          className="flex gap-[16px] justify-end items-start content-start"
          style={{
            flexWrap: thumbnailSidebarWidth > 280 ? 'wrap' : 'nowrap',
            flexDirection: thumbnailSidebarWidth > 280 ? 'row' : 'column'
          }}
        >
          {/* Main document types */}
          {mainDocumentTypes.map((docType) => (
            <DocumentTypeSection key={docType} docType={docType} />
          ))}

          {/* Unclassified */}
          {unclassifiedDocs.length > 0 && (
            <DocumentTypeSection docType="Unclassified" isUnclassified />
          )}
        </div>
      </div>

      {/* Approved Section */}
      <div className="bg-white shrink-0 shadow-[0px_-1px_2px_0px_rgba(0,0,0,0.15)]">
        <button
          onClick={() => setApprovedExpanded(!approvedExpanded)}
          className="w-full px-[8px] py-[12px] flex items-center justify-between hover:bg-[#f6f8fa] transition-colors"
        >
          <div className="flex items-center gap-[8px]">
            {approvedExpanded ? (
              <ChevronUp className="h-[12px] w-[12px] text-[#004c13]" />
            ) : (
              <ChevronDown className="h-[12px] w-[12px] text-[#004c13]" />
            )}
            <span className="text-[#004c13] text-[10px] font-bold">
              Approved
            </span>
          </div>
          <div className="bg-[#ccf2d6] rounded-[8px] size-[16px] flex items-center justify-center">
            <span className="text-[#004c13] text-[12px]">1</span>
          </div>
        </button>
        
        {approvedExpanded && (
          <div className="px-[8px] pb-[8px]">
            <div className="bg-[#ccf2d6] border border-[#66d983] rounded-[4px] p-[8px]">
              <div className="flex items-center justify-between mb-[8px]">
                <span className="text-[#3d3d3d] text-[10px] font-bold">Fuel Receipt</span>
                <div className="bg-[#99e5ac] rounded-[9px] size-[16px] flex items-center justify-center">
                  <span className="text-[#3d3d3d] text-[10px] font-semibold">1</span>
                </div>
              </div>
              <p className="text-[9px] text-[#5a626f]">Approved documents...</p>
            </div>
          </div>
        )}
      </div>
    </>
  );

  return (
    <div className={`relative size-full bg-[#f1fafe] rounded-[8px] flex flex-col overflow-hidden max-w-full ${isResizing ? 'cursor-col-resize select-none' : ''}`}>
      {/* Toolbar */}
      <div ref={toolbarRef} className="bg-[#5a626f] rounded-tl-[8px] rounded-tr-[8px] px-[12px] py-[8px] flex-shrink-0 max-w-full">
        <div className="flex items-center gap-[8px] justify-between">
          {/* Cluster 1: Filename Pill */}
          <div className="flex items-center gap-[8px] min-w-0">
            {isOverlayMode && (
              <button
                onClick={() => setIsOverlayOpen(!isOverlayOpen)}
                className="text-[#e1e1e1] hover:text-white transition-colors p-[6px] hover:bg-white/10 rounded flex-shrink-0"
                title="Toggle Sidebar"
                aria-label="Toggle sidebar"
              >
                <Menu className="h-[16px] w-[16px]" />
              </button>
            )}

            <div className="bg-[#3d3d3d] rounded-[2px] px-[10px] py-[4px] min-w-0">
              <span className="text-white text-[11px] truncate block max-w-[200px]">
                {activeDoc?.name || 'No Document Selected'}
              </span>
            </div>
          </div>

          {/* Cluster 2: Rotation */}
          <div className="flex items-center gap-[8px] flex-shrink-0">
            <div className="h-[20px] w-[1px] bg-[#8d9aae]" />
            <button
              onClick={rotateLeft}
              className="text-[#e1e1e1] hover:text-white transition-colors p-[6px] hover:bg-white/10 rounded"
              title="Rotate Left"
              aria-label="Rotate left"
            >
              <RotateCcw className="h-[16px] w-[16px]" />
            </button>
            <button
              onClick={rotateRight}
              className="text-[#e1e1e1] hover:text-white transition-colors p-[6px] hover:bg-white/10 rounded"
              title="Rotate Right (R)"
              aria-label="Rotate right"
            >
              <RotateCw className="h-[16px] w-[16px]" />
            </button>

            <ToggleGroup 
              type="single" 
              value={zoomMode === 'custom' ? '' : zoomMode}
              onValueChange={(value) => value && setZoomMode(value as 'fit_width' | 'fit_height')}
              className="bg-[#3d3d3d] rounded-[2px]"
            >
              <ToggleGroupItem 
                value="fit_width" 
                aria-label="Fit width"
                className="h-[28px] px-[8px] text-[11px] text-white data-[state=on]:bg-[#2474bb] data-[state=on]:text-white hover:bg-[#4d5561]"
              >
                Fit W
              </ToggleGroupItem>
              <ToggleGroupItem 
                value="fit_height" 
                aria-label="Fit height"
                className="h-[28px] px-[8px] text-[11px] text-white data-[state=on]:bg-[#2474bb] data-[state=on]:text-white hover:bg-[#4d5561]"
              >
                Fit H
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          {/* Cluster 3: Zoom */}
          <div className="flex items-center gap-[8px] flex-shrink-0">
            <div className="h-[20px] w-[1px] bg-[#8d9aae]" />
            
            <button
              onClick={zoomOut}
              className="text-[#e1e1e1] hover:text-white transition-colors p-[6px] hover:bg-white/10 rounded"
              title="Zoom Out (Ctrl+-)"
              aria-label="Zoom out"
            >
              <ZoomOutIcon className="h-[16px] w-[16px]" />
            </button>
            <div className="bg-white rounded-[2px] px-[10px] py-[4px] min-w-[64px] text-center">
              <span className="text-[#3d3d3d] text-[11px]">{Math.round(zoomPercent)}%</span>
            </div>
            <button
              onClick={zoomIn}
              className="text-[#e1e1e1] hover:text-white transition-colors p-[6px] hover:bg-white/10 rounded"
              title="Zoom In (Ctrl++)"
              aria-label="Zoom in"
            >
              <ZoomInIcon className="h-[16px] w-[16px]" />
            </button>
          </div>

          {/* Cluster 4: Pagination */}
          <div className="flex items-center gap-[8px] flex-shrink-0">
            <div className="h-[20px] w-[1px] bg-[#8d9aae]" />

            {showFirstLast && (
              <button
                onClick={firstPage}
                disabled={!activeDoc || activePageData?.page.pageNumber === 1}
                className="text-[#e1e1e1] hover:text-white transition-colors p-[6px] hover:bg-white/10 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                title="First Page"
                aria-label="First page"
              >
                <ChevronsLeft className="h-[16px] w-[16px]" />
              </button>
            )}

            <button
              onClick={prevPage}
              disabled={!activeDoc || activePageData?.page.pageNumber === 1}
              className="text-[#e1e1e1] hover:text-white transition-colors p-[6px] hover:bg-white/10 rounded disabled:opacity-30 disabled:cursor-not-allowed"
              title="Previous Page (←)"
              aria-label="Previous page"
            >
              <ArrowLeft className="h-[16px] w-[16px]" />
            </button>

            <div className="bg-white rounded-[2px] px-[10px] py-[4px] min-w-[64px] text-center">
              <span className="text-[#3d3d3d] text-[11px]">
                {activePageData?.page.pageNumber || 0} / {activeDoc?.pages.length || 0}
              </span>
            </div>

            <button
              onClick={nextPage}
              disabled={!activeDoc || activePageData?.page.pageNumber === activeDoc.pages.length}
              className="text-[#e1e1e1] hover:text-white transition-colors p-[6px] hover:bg-white/10 rounded disabled:opacity-30 disabled:cursor-not-allowed"
              title="Next Page (→)"
              aria-label="Next page"
            >
              <ArrowRight className="h-[16px] w-[16px]" />
            </button>

            {showFirstLast && (
              <button
                onClick={lastPage}
                disabled={!activeDoc || activePageData?.page.pageNumber === activeDoc.pages.length}
                className="text-[#e1e1e1] hover:text-white transition-colors p-[6px] hover:bg-white/10 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                title="Last Page"
                aria-label="Last page"
              >
                <ChevronsRight className="h-[16px] w-[16px]" />
              </button>
            )}
          </div>

          {/* Cluster 5: Tools */}
          <div className="flex items-center gap-[8px] flex-shrink-0">
            <div className="h-[20px] w-[1px] bg-[#8d9aae]" />

            {showHoverZoomButton && (
              <button
                onClick={toggleHoverZoom}
                className={`p-[6px] rounded transition-colors ${
                  hoverZoomEnabled ? 'bg-[#2474bb] text-white' : 'text-[#e1e1e1] hover:text-white hover:bg-white/10'
                }`}
                title="Toggle Hover Zoom"
                aria-label="Toggle hover zoom"
              >
                <Search className="h-[16px] w-[16px]" />
              </button>
            )}

            {showOpenWindow && (
              <button
                onClick={handleOpenNewWindow}
                disabled={!activeDoc}
                className="text-[#e1e1e1] hover:text-white transition-colors p-[6px] hover:bg-white/10 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                title="Open in New Window"
                aria-label="Open in new window"
              >
                <ExternalLink className="h-[16px] w-[16px]" />
              </button>
            )}

            {showDownload && (
              <button
                onClick={handleDownload}
                disabled={!activeDoc}
                className="text-[#e1e1e1] hover:text-white transition-colors p-[6px] hover:bg-white/10 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                title="Download"
                aria-label="Download"
              >
                <Download className="h-[16px] w-[16px]" />
              </button>
            )}

            {/* More Options Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="text-[#e1e1e1] hover:text-white transition-colors p-[6px] hover:bg-white/10 rounded"
                  title="More Options"
                  aria-label="More options"
                >
                  <MoreVertical className="h-[16px] w-[16px]" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {!showDownload && (
                  <DropdownMenuItem onClick={handleDownload} disabled={!activeDoc}>
                    <Download className="h-[14px] w-[14px] mr-2" />
                    Download
                  </DropdownMenuItem>
                )}
                {!showOpenWindow && (
                  <DropdownMenuItem onClick={handleOpenNewWindow} disabled={!activeDoc}>
                    <ExternalLink className="h-[14px] w-[14px] mr-2" />
                    Open in New Window
                  </DropdownMenuItem>
                )}
                {!showHoverZoomButton && (
                  <DropdownMenuItem onClick={toggleHoverZoom}>
                    <Search className="h-[14px] w-[14px] mr-2" />
                    {hoverZoomEnabled ? 'Disable' : 'Enable'} Hover Zoom
                  </DropdownMenuItem>
                )}
                {!showFirstLast && (
                  <>
                    <DropdownMenuItem onClick={firstPage} disabled={!activeDoc || activePageData?.page.pageNumber === 1}>
                      <ChevronsLeft className="h-[14px] w-[14px] mr-2" />
                      First Page
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={lastPage} disabled={!activeDoc || activePageData?.page.pageNumber === activeDoc.pages.length}>
                      <ChevronsRight className="h-[14px] w-[14px] mr-2" />
                      Last Page
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden relative min-h-0">
        {/* Document Display Area */}
        <div 
          ref={viewerRef}
          className="flex-1 bg-[#e2e6eb] p-[8px] overflow-auto relative min-w-0"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {activePageData ? (
            <div className="flex items-center justify-center min-h-full">
              <div
                className="relative bg-white shadow-lg"
                style={{
                  transform: `rotate(${rotationDeg}deg) scale(${zoomPercent / 100})`,
                  transition: 'transform 0.15s ease-out'
                }}
              >
                <img
                  ref={imageRef}
                  src={activePageData.page.imageUrl}
                  alt={`${activePageData.document.name} - Page ${activePageData.page.pageNumber}`}
                  className="max-w-none"
                  style={{ width: 'auto', height: 'auto', maxHeight: zoomMode === 'fit_height' ? '100%' : 'none' }}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-[#747d89]">
                <FileText className="h-[64px] w-[64px] mx-auto mb-[16px] opacity-30" />
                <p className="text-[14px]">No document selected</p>
                <p className="text-[11px] mt-[4px]">Select a document from the sidebar</p>
              </div>
            </div>
          )}

          {/* Hover Zoom Overlay */}
          {hoverZoomEnabled && hoverZoomPosition && activePageData && (
            <div
              className="fixed pointer-events-none bg-white border-2 border-[#2474bb] shadow-xl rounded-[4px] overflow-hidden z-50"
              style={{
                width: '200px',
                height: '200px',
                top: '50%',
                right: '20px',
                transform: 'translateY(-50%)'
              }}
            >
              <div
                className="absolute"
                style={{
                  width: '400%',
                  height: '400%',
                  backgroundImage: `url(${activePageData.page.imageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: `${hoverZoomPosition.x}% ${hoverZoomPosition.y}%`,
                  transform: `translate(-${hoverZoomPosition.x * 3}%, -${hoverZoomPosition.y * 3}%)`
                }}
              />
            </div>
          )}
        </div>

        {/* Thumbnail Sidebar - Docked */}
        {!isOverlayMode && !thumbnailSidebarCollapsed && (
          <div
            ref={thumbnailSidebarRef}
            className="bg-white border-l border-[#c6ccd6] flex flex-col flex-shrink-0 h-full relative group/sidebar"
            style={{ width: `${thumbnailSidebarWidth}px` }}
          >
            {/* Resize Handle - Left Edge */}
            <div
              className="absolute left-0 top-0 bottom-0 w-[8px] cursor-col-resize z-10 hover:bg-[#2474bb]/10 transition-colors group-hover/sidebar:bg-[#2474bb]/5"
              onMouseDown={() => setIsResizing(true)}
            />
            
            {/* Collapse Button - Left Side */}
            <button
              onClick={() => setThumbnailSidebarCollapsed(true)}
              className="absolute left-[-12px] top-1/2 -translate-y-1/2 w-[24px] h-[48px] bg-white border border-[#c6ccd6] rounded-l-[4px] shadow-sm hover:bg-[#f6f9fc] transition-all opacity-0 group-hover/sidebar:opacity-60 hover:!opacity-100 z-20 flex items-center justify-center"
              title="Collapse thumbnails"
            >
              <ChevronsRight className="h-[14px] w-[14px] text-[#5a626f]" />
            </button>

            <SidebarContent />
          </div>
        )}

        {/* Thumbnail Sidebar - Collapsed State */}
        {!isOverlayMode && thumbnailSidebarCollapsed && (
          <div className="relative">
            <button
              onClick={() => setThumbnailSidebarCollapsed(false)}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-[24px] h-[48px] bg-white border border-[#c6ccd6] rounded-l-[4px] shadow-md hover:bg-[#f6f9fc] hover:shadow-lg transition-all z-20 flex items-center justify-center opacity-100"
              title="Expand thumbnails"
            >
              <ChevronsLeft className="h-[14px] w-[14px] text-[#5a626f]" />
            </button>
          </div>
        )}

        {/* Overlay Sidebar */}
        {isOverlayMode && isOverlayOpen && (
          <div
            ref={sidebarRef}
            className="absolute top-0 right-0 h-full bg-white border-l border-[#c6ccd6] shadow-xl z-50 flex flex-col"
            style={{ width: `${sidebarWidth}px` }}
          >
            <div className="flex items-center justify-between px-[8px] py-[6px] border-b border-[#c6ccd6]">
              <span className="text-[11px] text-[#5a626f]">Documents</span>
              <button
                onClick={() => setIsOverlayOpen(false)}
                className="p-[4px] hover:bg-[#e1e6eb] rounded"
              >
                <X className="h-[14px] w-[14px] text-[#747d89]" />
              </button>
            </div>
            <SidebarContent />
          </div>
        )}
      </div>
    </div>
  );
}
