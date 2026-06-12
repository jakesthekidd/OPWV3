import { useState, useEffect } from 'react';
import { ChevronRight, ChevronDown, CheckCircle2, Trash2, MoreVertical } from 'lucide-react';
import svgPaths from '../imports/svg-hx66qwl8rc';
import DocumentContextMenu from './DocumentContextMenu';
import { toast } from 'sonner';

interface Page {
  id: string;
  pageNumber: number;
  thumbnail: string;
}

interface Document {
  id: string;
  name: string;
  pages: Page[];
}

interface CollapsibleDocumentSectionProps {
  type: 'unclassified' | 'approved' | 'rejected';
  documents: Document[];
  currentDocumentId?: string;
  currentPageNumber?: number;
  onPageClick?: (documentId: string, pageNumber: number) => void;
  onPageReclassify?: (pageId: string, sourceDocId: string, targetDocId: string) => void;
}

export default function CollapsibleDocumentSection({
  type,
  documents,
  currentDocumentId,
  currentPageNumber,
  onPageClick,
  onPageReclassify,
}: CollapsibleDocumentSectionProps) {
  const [isExpanded, setIsExpanded] = useState(type === 'unclassified'); // Default open for unclassified
  const [hoveredPage, setHoveredPage] = useState<string | null>(null);
  const [draggedPage, setDraggedPage] = useState<any>(null);
  const storageKey = `collapsible-${type}-expanded`;
  const [contextMenu, setContextMenu] = useState<{
    isOpen: boolean;
    position: { x: number; y: number };
    documentId: string;
    documentName: string;
    documentGroup: 'active' | 'approved' | 'rejected' | 'unclassified';
  } | null>(null);

  // Load expanded state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved !== null) {
      setIsExpanded(saved === 'true');
    } else if (type === 'unclassified') {
      // Default to open for unclassified if no saved state
      setIsExpanded(true);
    }
  }, [storageKey, type]);

  // Save expanded state to localStorage
  const handleToggle = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);
    localStorage.setItem(storageKey, String(newState));
  };

  const isReadOnly = type === 'approved';
  const totalPages = documents.reduce((sum, doc) => sum + doc.pages.length, 0);

  // Drag handlers (enabled for unclassified and rejected sections)
  const handleDragStart = (e: React.DragEvent, page: Page, documentId: string) => {
    if (isReadOnly) {
      e.preventDefault();
      return;
    }

    const dragData = {
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
  };

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <div
        className={`h-[23px] w-full relative shrink-0 cursor-pointer transition-colors ${
          isExpanded 
            ? type === 'approved' 
              ? 'bg-[#e5f9ea]' 
              : type === 'unclassified'
                ? 'bg-[#f3edff]'
                : 'bg-[#f6f9fc]'
            : 'bg-white'
        }`}
        onClick={handleToggle}
      >
        <div className="flex flex-row items-center size-full">
          <div className="box-border flex h-[23px] items-center justify-between pb-[5px] pt-[4px] px-[8px] w-full">
            <div className="flex gap-[4px] items-center shrink-0">
              {/* Chevron Icon */}
              <div className="relative shrink-0 size-[12px]">
                {isExpanded ? (
                  <ChevronDown className="h-3 w-3 text-[#3d3d3d]" />
                ) : (
                  <ChevronRight className="h-3 w-3 text-[#3d3d3d]" />
                )}
              </div>

              {/* Status Icon */}
              {type === 'approved' ? (
                <CheckCircle2 className="h-[10px] w-[10px] text-[#00bf30]" />
              ) : type === 'unclassified' ? (
                <div className="h-[10px] w-[8px] relative shrink-0" style={{ "--fill-0": "rgba(151, 71, 255, 1)" } as React.CSSProperties}>
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 5">
                    <g>
                      <path d={svgPaths.p1ec7e500} fill="var(--fill-0, #9747FF)" />
                      <path d={svgPaths.p22654f80} fill="var(--fill-0, #9747FF)" />
                      <path d={svgPaths.p25608a80} fill="var(--fill-0, #9747FF)" />
                      <path d={svgPaths.p207cc600} fill="var(--fill-0, #9747FF)" />
                      <path d={svgPaths.p15842900} fill="var(--fill-0, #9747FF)" />
                    </g>
                  </svg>
                </div>
              ) : (
                <Trash2 className="h-[10px] w-[10px] text-[#8d9aae]" />
              )}

              {/* Label */}
              <p
                className="text-[10px]"
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontVariationSettings: "'wdth' 100",
                  color: '#3d3d3d',
                }}
              >
                {type === 'approved' ? 'Approved' : type === 'unclassified' ? 'Unclassified' : 'Rejected'}
              </p>

              {/* Document Count */}
              {documents.length > 0 && (
                <span
                  className="text-[10px] text-[#8a92a0]"
                  style={{
                    fontFamily: 'Roboto, sans-serif',
                    fontVariationSettings: "'wdth' 100",
                  }}
                >
                  ({documents.length})
                </span>
              )}
            </div>

            {/* Context Menu */}
            <button
              className="flex items-center justify-center p-[2px] rounded-[2px] shrink-0 hover:bg-black/10 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                // Context menu handler placeholder
              }}
            >
              <MoreVertical className="h-3 w-3 text-[#2068a8]" />
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="flex flex-col w-full bg-white">
          {documents.map((document) => {
            const isCurrentDocument = document.id === currentDocumentId;

            return (
              <div key={document.id} className="flex flex-col">
                {/* Document Header */}
                <div
                  className={`h-[23px] relative shrink-0 w-full ${
                    isCurrentDocument ? 'bg-[#2474bb]' : 'bg-[#eff2f4]'
                  }`}
                >
                  <div className="flex flex-row items-center size-full">
                    <div className="box-border flex h-[23px] items-center justify-between pb-[5px] pt-[4px] px-[8px] w-full">
                      <p
                        className="text-[12px] truncate flex-1"
                        style={{
                          fontFamily: 'Roboto, sans-serif',
                          fontVariationSettings: "'wdth' 100",
                          color: isCurrentDocument ? '#ffffff' : '#3d3d3d',
                        }}
                      >
                        {document.name}
                      </p>
                      <button
                        className="flex items-center justify-center p-[2px] rounded-[2px] shrink-0 hover:bg-black/10 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          const rect = e.currentTarget.getBoundingClientRect();
                          setContextMenu({
                            isOpen: true,
                            position: { x: rect.right, y: rect.top },
                            documentId: document.id,
                            documentName: document.name,
                            documentGroup: type,
                          });
                        }}
                      >
                        <MoreVertical
                          className="h-3 w-3"
                          style={{
                            color: isCurrentDocument ? '#ffffff' : '#2068a8',
                          }}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Thumbnails */}
                <div
                  className={`flex flex-col items-center gap-[8px] p-[8px] ${
                    isCurrentDocument ? 'bg-[#c8dcee]' : 'bg-[#e2e6eb]'
                  }`}
                >
                  {document.pages.map((page) => {
                    const isActive =
                      isCurrentDocument && page.pageNumber === currentPageNumber;
                    const pageId = `${document.id}-${page.pageNumber}`;
                    const isHovered = hoveredPage === pageId && !isReadOnly;
                    const isBeingDragged = draggedPage?.pageId === page.id;

                    return (
                      <div
                        key={pageId}
                        className={`box-border flex gap-[10px] h-[92px] items-center justify-center p-px rounded-[4px] w-[70px] transition-all ${
                          isReadOnly 
                            ? 'cursor-default'
                            : isBeingDragged 
                              ? 'opacity-50 cursor-grabbing' 
                              : 'cursor-grab'
                        }`}
                        draggable={!isReadOnly}
                        onDragStart={(e) => handleDragStart(e, page, document.id)}
                        onDragEnd={handleDragEnd}
                        onMouseEnter={() => !draggedPage && !isReadOnly && setHoveredPage(pageId)}
                        onMouseLeave={() => setHoveredPage(null)}
                        onClick={() => !draggedPage && onPageClick?.(document.id, page.pageNumber)}
                      >
                        {/* Thumbnail Container */}
                        <div className="h-[82px] relative shrink-0 w-[60px]">
                          {/* Image */}
                          <div className="absolute h-[80px] left-px rounded-[2px] top-px w-[58px] overflow-hidden pointer-events-none">
                            <img
                              src={page.thumbnail}
                              alt={`${document.name} page ${page.pageNumber}`}
                              className="absolute inset-0 max-w-none object-cover rounded-[2px] size-full"
                              style={{ objectPosition: '50% 50%' }}
                            />
                            <div
                              aria-hidden="true"
                              className={`absolute inset-[-1px] rounded-[3px] border-solid ${
                                isActive ? 'border-[3px] border-[#2474bb]' : 'border border-[#8d9aae]'
                              }`}
                            />
                          </div>

                          {/* Page Number Badge */}
                          <div
                            className={`absolute box-border flex flex-col gap-[10px] items-center justify-center px-[2px] py-[4px] rounded-br-[2px] rounded-tl-[4px] ${
                              isActive ? 'bg-[#2474bb] left-[48px] top-[59px]' : 'bg-white left-[48px] top-[59px]'
                            }`}
                          >
                            <p
                              className="text-[8px] leading-none"
                              style={{
                                fontFamily: 'Roboto, sans-serif',
                                fontVariationSettings: "'wdth' 100",
                                color: isActive ? '#ffffff' : '#3a3a3a',
                              }}
                            >
                              {page.pageNumber}
                            </p>
                          </div>

                          {/* Context Menu Button on Hover (only for rejected) */}
                          {(isHovered || isActive) && !isBeingDragged && !isReadOnly && (
                            <div
                              className="absolute backdrop-blur-[1.5px] backdrop-filter bg-[#3a3a3a] box-border flex flex-col gap-[10px] items-center justify-center left-[48px] p-[2px] rounded-[2px] top-[3px] cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                const rect = e.currentTarget.getBoundingClientRect();
                                setContextMenu({
                                  isOpen: true,
                                  position: { x: rect.right, y: rect.top },
                                  documentId: document.id,
                                  documentName: document.name,
                                  documentGroup: type,
                                });
                              }}
                            >
                              <MoreVertical className="h-3 w-3 text-[#e9f1f8]" />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Empty State */}
          {documents.length === 0 && (
            <div className="p-[16px] text-center bg-[#e2e6eb]">
              <p
                className="text-[10px] text-[#8a92a0]"
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontVariationSettings: "'wdth' 100",
                }}
              >
                No {type} documents
              </p>
            </div>
          )}
        </div>
      )}

      {/* Context Menu */}
      {contextMenu && (
        <DocumentContextMenu
          isOpen={contextMenu.isOpen}
          onClose={() => setContextMenu(null)}
          position={contextMenu.position}
          documentGroup={contextMenu.documentGroup}
          documentId={contextMenu.documentId}
          documentName={contextMenu.documentName}
          onChangeDocumentType={(newType) => {
            toast.info(`Change document type to ${newType} - feature in progress`);
          }}
          onDownload={() => {
            // Download handler
          }}
          onMoveToLoadId={(loadId) => {
            // Move to Load ID handler
          }}
          onReject={(reason) => {
            // Reject handler
          }}
        />
      )}
    </div>
  );
}
