import { MoreVertical, Upload } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import { toast } from 'sonner';
import CollapsibleDocumentSection from './CollapsibleDocumentSection';
import DocumentContextMenu from './DocumentContextMenu';

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

interface ThumbnailSidebarProps {
  documents: Document[];
  unclassifiedDocuments?: Document[];
  approvedDocuments?: Document[];
  rejectedDocuments?: Document[];
  currentDocumentId: string;
  currentPageNumber: number;
  onPageClick: (documentId: string, pageNumber: number) => void;
  onPageReclassify?: (pageId: string, sourceDocId: string, targetDocId: string) => void;
}

interface DraggedPageData {
  pageId: string;
  documentId: string;
  pageNumber: number;
}

export default function ThumbnailSidebar({
  documents,
  unclassifiedDocuments = [],
  approvedDocuments = [],
  rejectedDocuments = [],
  currentDocumentId,
  currentPageNumber,
  onPageClick,
  onPageReclassify,
}: ThumbnailSidebarProps) {
  const [hoveredPage, setHoveredPage] = useState<string | null>(null);
  const [hoveredDocument, setHoveredDocument] = useState<string | null>(null);
  const [draggedPage, setDraggedPage] = useState<DraggedPageData | null>(null);
  const [dropTarget, setDropTarget] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState<{
    isOpen: boolean;
    position: { x: number; y: number };
    documentId: string;
    documentName: string;
    documentGroup: 'active' | 'approved' | 'rejected' | 'unclassified';
  } | null>(null);

  // Handle drag start on a page thumbnail
  const handleDragStart = (e: React.DragEvent, page: Page, documentId: string) => {
    const dragData: DraggedPageData = {
      pageId: page.id,
      documentId,
      pageNumber: page.pageNumber,
    };
    
    setDraggedPage(dragData);
    
    // Set drag data for native drag-and-drop
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('application/json', JSON.stringify(dragData));
    
    // Create a subtle drag image
    if (e.dataTransfer.setDragImage && e.currentTarget) {
      const dragImage = e.currentTarget.cloneNode(true) as HTMLElement;
      e.dataTransfer.setDragImage(e.currentTarget as Element, 24, 32);
    }
  };

  // Handle drag end
  const handleDragEnd = () => {
    setDraggedPage(null);
    setDropTarget(null);
  };

  // Handle drag over a document (drop zone)
  const handleDragOver = (e: React.DragEvent, targetDocumentId: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Allow drops from both local drags and external drags (from CollapsibleDocumentSection)
    e.dataTransfer.dropEffect = 'move';
    setDropTarget(targetDocumentId);
  };

  // Handle drag enter
  const handleDragEnter = (e: React.DragEvent, targetDocumentId: string) => {
    e.preventDefault();
    
    // Highlight the drop target
    setDropTarget(targetDocumentId);
  };

  // Handle drag leave
  const handleDragLeave = (e: React.DragEvent, targetDocumentId: string) => {
    // Only clear if we're actually leaving the document container
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    
    if (x < rect.left || x >= rect.right || y < rect.top || y >= rect.bottom) {
      if (dropTarget === targetDocumentId) {
        setDropTarget(null);
      }
    }
  };

  // Handle drop on a document
  const handleDrop = (e: React.DragEvent, targetDocumentId: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Try to get drag data from either local state or dataTransfer
    let pageData: DraggedPageData | null = draggedPage;
    
    if (!pageData) {
      // Try to parse from dataTransfer (for drags from CollapsibleDocumentSection)
      try {
        const jsonData = e.dataTransfer.getData('application/json');
        if (jsonData) {
          pageData = JSON.parse(jsonData);
        }
      } catch (err) {
        console.error('Failed to parse drag data:', err);
      }
    }
    
    if (!pageData) {
      setDropTarget(null);
      return;
    }
    
    // Validate drop
    if (pageData.documentId === targetDocumentId) {
      toast.error("Can't drop here - same document");
      setDraggedPage(null);
      setDropTarget(null);
      return;
    }
    
    const targetDoc = documents.find(d => d.id === targetDocumentId);
    if (!targetDoc) {
      toast.error("Invalid drop target");
      setDraggedPage(null);
      setDropTarget(null);
      return;
    }
    
    // Call the reclassify callback
    if (onPageReclassify) {
      onPageReclassify(pageData.pageId, pageData.documentId, targetDocumentId);
      
      // Show success toast
      toast.success(`Page moved to ${targetDoc.name}`);
    }
    
    // Reset drag state
    setDraggedPage(null);
    setDropTarget(null);
  };

  return (
    <div className="flex flex-col h-full bg-[#fbfcfc] w-[101px] shrink-0" style={{ borderLeft: '1px solid #c6ccd6' }}>
      {/* Upload Button */}
      <div className="bg-white w-full h-[44px] flex items-center justify-center px-2" style={{ borderBottom: '1px solid #c6ccd6' }}>
        <button className="h-[26px] px-[8px] rounded-[2px] border border-[#2474bb] flex items-center gap-[8px] flex-1">
          <Upload className="h-3 w-3 text-[#2474bb]" />
          <span className="text-[12px] text-[#2474bb]" style={{ fontFamily: 'Roboto, sans-serif', fontVariationSettings: "'wdth' 100" }}>
            Upload
          </span>
        </button>
      </div>

      {/* Scrollable Thumbnails Area */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col">
        {/* Active Documents */}
        {documents.map((document) => {
          const isCurrentDocument = document.id === currentDocumentId;
          const hasCurrentPage = document.pages.some(
            (page) => page.pageNumber === currentPageNumber && isCurrentDocument
          );
          const isDropTarget = dropTarget === document.id;
          const isDraggingFromThisDoc = draggedPage?.documentId === document.id;

          return (
            <div key={document.id} className="flex flex-col">
              {/* Document Header */}
              <div
                className={`h-[23px] relative shrink-0 w-full transition-colors ${
                  isCurrentDocument ? 'bg-[#2474bb]' : 'bg-[#eff2f4]'
                }`}
                onMouseEnter={() => setHoveredDocument(document.id)}
                onMouseLeave={() => setHoveredDocument(null)}
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
                          documentGroup: 'active',
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

              {/* Thumbnails - This is the drop zone */}
              <div
                className={`flex flex-col items-center gap-[8px] p-[8px] transition-all ${
                  isCurrentDocument ? 'bg-[#c8dcee]' : 'bg-[#e2e6eb]'
                } ${
                  isDropTarget ? 'ring-2 ring-[#2474bb] ring-inset bg-[#eef6fb]' : ''
                }`}
                onDragOver={(e) => handleDragOver(e, document.id)}
                onDragEnter={(e) => handleDragEnter(e, document.id)}
                onDragLeave={(e) => handleDragLeave(e, document.id)}
                onDrop={(e) => handleDrop(e, document.id)}
              >
                {document.pages.map((page) => {
                  const isActive =
                    isCurrentDocument && page.pageNumber === currentPageNumber;
                  const pageId = `${document.id}-${page.pageNumber}`;
                  const isHovered = hoveredPage === pageId;
                  const isBeingDragged = draggedPage?.pageId === page.id;

                  return (
                    <div
                      key={pageId}
                      className={`box-border flex gap-[10px] h-[92px] items-center justify-center p-px rounded-[4px] w-[70px] transition-all ${
                        isBeingDragged ? 'opacity-50 cursor-grabbing' : 'cursor-grab'
                      }`}
                      draggable={true}
                      onDragStart={(e) => handleDragStart(e, page, document.id)}
                      onDragEnd={handleDragEnd}
                      onMouseEnter={() => !draggedPage && setHoveredPage(pageId)}
                      onMouseLeave={() => setHoveredPage(null)}
                      onClick={() => !draggedPage && onPageClick(document.id, page.pageNumber)}
                    >
                      {/* Thumbnail Container */}
                      <div className="h-[82px] relative shrink-0 w-[60px]">
                        {/* Image */}
                        <div className={`absolute h-[80px] left-px rounded-[2px] top-px w-[58px] overflow-hidden pointer-events-none`}>
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

                        {/* Context Menu Button on Hover or Active */}
                        {(isHovered || isActive) && !isBeingDragged && (
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
                                documentGroup: 'active',
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

        {/* Unclassified Documents Section */}
        {unclassifiedDocuments.length > 0 && (
          <CollapsibleDocumentSection
            type="unclassified"
            documents={unclassifiedDocuments}
            currentDocumentId={currentDocumentId}
            currentPageNumber={currentPageNumber}
            onPageClick={onPageClick}
            onPageReclassify={onPageReclassify}
          />
        )}

        {/* Approved Documents Section */}
        {approvedDocuments.length > 0 && (
          <CollapsibleDocumentSection
            type="approved"
            documents={approvedDocuments}
            currentDocumentId={currentDocumentId}
            currentPageNumber={currentPageNumber}
            onPageClick={onPageClick}
          />
        )}

        {/* Rejected Documents Section */}
        {rejectedDocuments.length > 0 && (
          <CollapsibleDocumentSection
            type="rejected"
            documents={rejectedDocuments}
            currentDocumentId={currentDocumentId}
            currentPageNumber={currentPageNumber}
            onPageClick={onPageClick}
            onPageReclassify={onPageReclassify}
          />
        )}
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
