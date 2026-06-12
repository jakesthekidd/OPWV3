import { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'sonner';

// Types from spec
export type DocumentStatus = 'unclassified' | 'approved' | 'rejected';
export type DocumentType = 'Invoice' | 'POD' | 'FuelReceipt' | 'Other';

export interface DraggedItem {
  type: 'doc' | 'page' | 'file';
  id: string;
  documentId?: string; // For pages
  pageIndex?: number; // For pages
  fileName?: string; // For files
  mime?: string; // For files
}

export interface DropTarget {
  type: 'group' | 'doc-insert-before' | 'doc-insert-after' | 'page-strip' | 'viewer-replace';
  documentId?: string;
  status?: DocumentStatus;
  index?: number;
}

interface DragDropContextValue {
  draggedItem: DraggedItem | null;
  dropTarget: DropTarget | null;
  isDragging: boolean;
  setDraggedItem: (item: DraggedItem | null) => void;
  setDropTarget: (target: DropTarget | null) => void;
  canDrop: (source: DraggedItem, target: DropTarget) => boolean;
  handleDrop: (source: DraggedItem, target: DropTarget) => void;
}

const DragDropContext = createContext<DragDropContextValue | null>(null);

export const useDragDrop = () => {
  const context = useContext(DragDropContext);
  if (!context) {
    throw new Error('useDragDrop must be used within DragDropProvider');
  }
  return context;
};

interface DragDropProviderProps {
  children: ReactNode;
  onDocumentReclassify?: (docId: string, status: DocumentStatus, index: number) => void;
  onPageReorder?: (docId: string, fromIndex: number, toIndex: number) => void;
  onPageMove?: (fromDocId: string, fromIndex: number, toDocId: string, toIndex: number) => void;
  onPageSplit?: (fromDocId: string, fromIndex: number, status: DocumentStatus) => void;
  onDocumentReplace?: (viewerDocId: string, sourceDocId: string) => void;
  onFileUpload?: (viewerDocId: string, file: File) => void;
}

export const DragDropProvider = ({
  children,
  onDocumentReclassify,
  onPageReorder,
  onPageMove,
  onPageSplit,
  onDocumentReplace,
  onFileUpload,
}: DragDropProviderProps) => {
  const [draggedItem, setDraggedItem] = useState<DraggedItem | null>(null);
  const [dropTarget, setDropTarget] = useState<DropTarget | null>(null);

  const isDragging = draggedItem !== null;

  // Rule validation based on spec
  const canDrop = (source: DraggedItem, target: DropTarget): boolean => {
    // SR1: Block drops to approved/rejected groups (from spec)
    if (target.type === 'group' && (target.status === 'approved' || target.status === 'rejected')) {
      return false;
    }

    // R1: Drag doc to group (only unclassified allowed)
    if (source.type === 'doc' && target.type === 'group') {
      return target.status === 'unclassified';
    }
    
    // R1b: Drag page to group header (only unclassified allowed)
    if (source.type === 'page' && target.type === 'group') {
      return target.status === 'unclassified';
    }

    // R2: Drag page within same doc (reorder)
    if (
      source.type === 'page' &&
      target.type === 'page-strip' &&
      source.documentId === target.documentId
    ) {
      return true;
    }

    // R3a: Drag page to different doc's page strip
    if (
      source.type === 'page' &&
      target.type === 'page-strip' &&
      source.documentId !== target.documentId
    ) {
      return true;
    }

    // R3b: Drag page to doc insert position
    if (
      source.type === 'page' &&
      (target.type === 'doc-insert-before' || target.type === 'doc-insert-after') &&
      source.documentId !== target.documentId
    ) {
      return true;
    }



    // R4: Drag doc to viewer replace
    if (source.type === 'doc' && target.type === 'viewer-replace') {
      return true;
    }

    // R5: Drag file to viewer replace
    if (source.type === 'file' && target.type === 'viewer-replace') {
      return true;
    }

    // R6: Drag doc to doc (reorder within group)
    if (source.type === 'doc' && target.type === 'doc-insert-before') {
      return true;
    }

    return false;
  };

  const handleDrop = (source: DraggedItem, target: DropTarget) => {
    if (!canDrop(source, target)) {
      // Show specific message for blocked groups
      if (target.type === 'group' && (target.status === 'approved' || target.status === 'rejected')) {
        toast.error(`Cannot drop into ${target.status} group`);
      } else {
        toast.error('Drop not allowed here');
      }
      return;
    }

    try {
      // R1: Reclassify document
      if (source.type === 'doc' && target.type === 'group' && target.status) {
        onDocumentReclassify?.(source.id, target.status, target.index ?? 0);
        toast.success(`Document reclassified to ${target.status}`);
      }

      // R2: Reorder pages within same doc
      else if (
        source.type === 'page' &&
        target.type === 'page-strip' &&
        source.documentId === target.documentId &&
        source.pageIndex !== undefined &&
        target.index !== undefined
      ) {
        onPageReorder?.(source.documentId!, source.pageIndex, target.index);
        toast.success('Page reordered');
      }

      // R3a: Move page to different doc
      else if (
        source.type === 'page' &&
        target.type === 'page-strip' &&
        source.documentId !== target.documentId &&
        source.pageIndex !== undefined &&
        target.index !== undefined &&
        target.documentId
      ) {
        onPageMove?.(source.documentId!, source.pageIndex, target.documentId, target.index);
        toast.success('Page moved to document');
      }

      // R3c: Split page into new document
      else if (
        source.type === 'page' &&
        target.type === 'group' &&
        source.pageIndex !== undefined &&
        target.status
      ) {
        onPageSplit?.(source.documentId!, source.pageIndex, target.status);
        toast.success('New document created from page');
      }

      // R4: Replace viewer document
      else if (source.type === 'doc' && target.type === 'viewer-replace' && target.documentId) {
        onDocumentReplace?.(target.documentId, source.id);
        toast.success('Document replaced in viewer');
      }

      // R5: Upload and replace
      else if (source.type === 'file' && target.type === 'viewer-replace' && target.documentId) {
        // File drops are handled differently via native file API
        toast.success('File upload initiated');
      }
    } catch (error) {
      toast.error('Drop failed');
      console.error('Drop error:', error);
    } finally {
      setDraggedItem(null);
      setDropTarget(null);
    }
  };

  const value: DragDropContextValue = {
    draggedItem,
    dropTarget,
    isDragging,
    setDraggedItem,
    setDropTarget,
    canDrop,
    handleDrop,
  };

  return (
    <DragDropContext.Provider value={value}>
      {children}
    </DragDropContext.Provider>
  );
};
