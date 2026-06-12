import { useState } from 'react';
import { GripVertical, ChevronDown, ChevronRight, FileText, Lock } from 'lucide-react';
import { useDragDrop, DocumentStatus } from './DragDropContext';
import { Document } from '../App';
import { toast } from 'sonner';

interface DocumentRailProps {
  documents: Document[];
  activeDocumentId?: string;
  onDocumentClick: (docId: string) => void;
}

export const DocumentRail = ({ documents, activeDocumentId, onDocumentClick }: DocumentRailProps) => {
  const { setDraggedItem, dropTarget, setDropTarget, isDragging, handleDrop, canDrop, draggedItem } = useDragDrop();
  
  const [expandedGroups, setExpandedGroups] = useState<Set<DocumentStatus>>(
    new Set(['unclassified', 'approved', 'rejected'])
  );

  const toggleGroup = (status: DocumentStatus) => {
    const newSet = new Set(expandedGroups);
    if (newSet.has(status)) {
      newSet.delete(status);
    } else {
      newSet.add(status);
    }
    setExpandedGroups(newSet);
  };

  const groupedDocs = {
    unclassified: documents.filter(d => d.status === 'unclassified'),
    approved: documents.filter(d => d.status === 'approved'),
    rejected: documents.filter(d => d.status === 'rejected'),
  };

  const getGroupLabel = (status: DocumentStatus) => {
    switch (status) {
      case 'unclassified': return 'Unclassified';
      case 'approved': return 'Approved';
      case 'rejected': return 'Rejected';
    }
  };

  const getGroupColor = (status: DocumentStatus) => {
    switch (status) {
      case 'unclassified': return '#5a626f';
      case 'approved': return '#039855';
      case 'rejected': return '#D92D20';
    }
  };

  return (
    <div className="w-[240px] bg-[#f7f8fa] border border-[#e4e7ec] rounded-[8px] h-full overflow-y-auto flex flex-col">
      {/* Rail Header */}
      <div className="p-[12px] border-b border-[#e4e7ec] rounded-t-[8px] bg-white">
        <p className="text-[#3d3d3d] text-[12px]">Documents ({documents.length})</p>
      </div>

      {/* Document Groups */}
      <div className="flex-1 overflow-y-auto">
        {(['unclassified', 'approved', 'rejected'] as DocumentStatus[]).map((status) => {
          const docs = groupedDocs[status];
          const isExpanded = expandedGroups.has(status);
          const isDropTarget = dropTarget?.type === 'group' && dropTarget?.status === status;
          const isLocked = status === 'approved' || status === 'rejected';
          const isInvalidDrop = isLocked && isDragging && draggedItem && !canDrop(draggedItem, { type: 'group', status });

          return (
            <div key={status} className="border-b border-[#e4e7ec]">
              {/* Group Header */}
              <div
                className={`
                  p-[12px] cursor-pointer flex items-center justify-between gap-[8px] 
                  hover:bg-[#eef6fb] transition-colors
                  ${isDropTarget ? 'bg-[#eef6fb] border-2 border-[#2474bb] border-solid' : ''}
                  ${isInvalidDrop ? 'cursor-not-allowed bg-[#fef2f2]' : ''}
                `}
                onClick={() => toggleGroup(status)}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  
                  if (isDragging && draggedItem) {
                    // Check if drop is allowed
                    if (canDrop(draggedItem, { type: 'group', status })) {
                      setDropTarget({ type: 'group', status });
                    } else {
                      // Show not-allowed cursor
                      e.dataTransfer.dropEffect = 'none';
                    }
                  }
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX;
                  const y = e.clientY;
                  if (x < rect.left || x >= rect.right || y < rect.top || y >= rect.bottom) {
                    if (dropTarget?.type === 'group' && dropTarget?.status === status) {
                      setDropTarget(null);
                    }
                  }
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  
                  // Handle drop on group header
                  if (draggedItem && dropTarget?.type === 'group' && dropTarget?.status === status) {
                    if (canDrop(draggedItem, dropTarget)) {
                      handleDrop(draggedItem, dropTarget);
                    } else {
                      toast.error(`Cannot drop into ${status} group`);
                    }
                  }
                  
                  setDropTarget(null);
                }}
              >
                <div className="flex items-center gap-[8px] flex-1">
                  {isExpanded ? (
                    <ChevronDown className="h-[14px] w-[14px] text-[#5a626f]" />
                  ) : (
                    <ChevronRight className="h-[14px] w-[14px] text-[#5a626f]" />
                  )}
                  <p className="text-[12px]" style={{ color: getGroupColor(status) }}>
                    {getGroupLabel(status)}
                  </p>
                </div>
                <div 
                  className="h-[18px] min-w-[18px] rounded-full flex items-center justify-center px-[6px]"
                  style={{ backgroundColor: `${getGroupColor(status)}20` }}
                >
                  <p className="text-[10px]" style={{ color: getGroupColor(status) }}>
                    {docs.length}
                  </p>
                </div>
              </div>

              {/* Drop hint when dragging over group header */}
              {isDropTarget && !isLocked && (
                <div className="px-[12px] pb-[8px]">
                  <p className="text-[10px] text-[#2474bb]">Drop to create new document here</p>
                </div>
              )}
              
              {/* Locked group indicator */}
              {isInvalidDrop && (
                <div className="px-[12px] pb-[8px] flex items-center gap-[6px]">
                  <Lock className="h-[10px] w-[10px] text-[#dc2626]" />
                  <p className="text-[10px] text-[#dc2626]">This group is locked</p>
                </div>
              )}

              {/* Document List */}
              {isExpanded && (
                <div className="flex flex-col">
                  {docs.map((doc, index) => (
                    <DocumentCard
                      key={doc.id}
                      document={doc}
                      isActive={doc.id === activeDocumentId}
                      onClick={() => onDocumentClick(doc.id)}
                      index={index}
                    />
                  ))}
                  {docs.length === 0 && (
                    <div className="p-[16px] text-center">
                      <p className="text-[11px] text-[#8a92a0]">No documents</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface DocumentCardProps {
  document: Document;
  isActive: boolean;
  onClick: () => void;
  index: number;
}

const DocumentCard = ({ document, isActive, onClick, index }: DocumentCardProps) => {
  const { draggedItem, setDraggedItem, dropTarget, setDropTarget, handleDrop } = useDragDrop();
  const [isDragOver, setIsDragOver] = useState(false);
  
  const isDragging = draggedItem?.type === 'doc' && draggedItem?.id === document.id;
  const isDropBefore = dropTarget?.type === 'doc-insert-before' && dropTarget?.documentId === document.id;
  const isDropAfter = dropTarget?.type === 'doc-insert-after' && dropTarget?.documentId === document.id;

  return (
    <div className="relative">
      {/* Drop zone before */}
      {isDropBefore && (
        <div className="h-[3px] bg-[#2474bb] mx-[12px] rounded-full" />
      )}

      <div
        className={`
          group relative mx-[8px] my-[4px] p-[8px] rounded-[6px] cursor-pointer
          ${isActive ? 'bg-[#c8dcee]' : 'hover:bg-[#eef6fb]'}
          ${isDragging ? 'opacity-40' : ''}
          ${isDragOver ? 'ring-2 ring-[#2474bb]' : ''}
        `}
        onClick={onClick}
        draggable={true}
        onDragStart={(e) => {
          setDraggedItem({ type: 'doc', id: document.id });
          e.dataTransfer.effectAllowed = 'move';
          e.dataTransfer.setData('text/plain', document.id);
        }}
        onDragEnd={() => {
          // Execute the drop if there's a valid target
          if (draggedItem && dropTarget) {
            handleDrop(draggedItem, dropTarget);
          }
          setDraggedItem(null);
          setDropTarget(null);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDragOver(true);
          
          // Determine if drop should be before or after based on mouse position
          const rect = e.currentTarget.getBoundingClientRect();
          const midpoint = rect.top + rect.height / 2;
          
          if (e.clientY < midpoint) {
            setDropTarget({ type: 'doc-insert-before', documentId: document.id, index });
          } else {
            setDropTarget({ type: 'doc-insert-after', documentId: document.id, index });
          }
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setIsDragOver(false);
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX;
          const y = e.clientY;
          if (x < rect.left || x >= rect.right || y < rect.top || y >= rect.bottom) {
            setDropTarget(null);
          }
        }}
      >
        {/* Drag handle */}
        <div className="absolute left-[4px] top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 cursor-grab active:cursor-grabbing">
          <GripVertical className="h-[14px] w-[14px] text-[#5a626f]" />
        </div>

        <div className="flex items-start gap-[8px] pl-[16px]">
          {/* Document icon */}
          <div className="mt-[2px]">
            <FileText className="h-[14px] w-[14px] text-[#5a626f]" />
          </div>

          {/* Document info */}
          <div className="flex-1 min-w-0">
            <p className="text-[11px] text-[#3d3d3d] truncate">{document.name}</p>
            <p className="text-[10px] text-[#8a92a0] mt-[2px]">{document.type}</p>
          </div>
        </div>
      </div>

      {/* Drop zone after */}
      {isDropAfter && (
        <div className="h-[3px] bg-[#2474bb] mx-[12px] rounded-full" />
      )}
    </div>
  );
};
