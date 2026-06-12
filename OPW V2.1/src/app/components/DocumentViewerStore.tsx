import { create } from 'zustand';

export type DocumentTypeCategory = 
  | 'Invoice'
  | 'Bill of Lading'
  | 'Proof of Delivery'
  | 'Fuel Receipt'
  | 'Driver Log'
  | 'Toll Receipt'
  | 'Permit Copy'
  | 'Unclassified';

export interface DocumentPage {
  id: string; // Unique page ID
  pageNumber: number; // Page number within the document
  imageUrl: string;
  thumbnailUrl?: string;
}

export interface Document {
  id: string;
  name: string; // e.g., "Invoice #1", "POD_Delivery_001"
  documentType: DocumentTypeCategory;
  pages: DocumentPage[];
  uploadDate: string;
}

interface ViewerState {
  documents: Document[];
  activePageId: string | null;
  zoomMode: 'fit_width' | 'fit_height' | 'custom';
  zoomPercent: number;
  rotationDeg: number;
  hoverZoomEnabled: boolean;
  
  // Getters
  getActiveDocument: () => Document | undefined;
  getActivePage: () => { document: Document; page: DocumentPage } | undefined;
  getDocumentsByType: (type: DocumentTypeCategory) => Document[];
  getAllDocumentTypes: () => DocumentTypeCategory[];
  
  // Navigation actions
  setActivePage: (pageId: string) => void;
  nextPage: () => void;
  prevPage: () => void;
  firstPage: () => void;
  lastPage: () => void;
  
  // Document management actions
  movePage: (pageId: string, targetDocumentType: DocumentTypeCategory, targetDocumentId?: string) => void;
  reorderPage: (pageId: string, targetDocumentId: string, targetIndex: number) => void;
  rejectPage: (pageId: string) => void;
  rejectDocument: (documentId: string) => void;
  
  // Viewer actions
  setZoomMode: (mode: 'fit_width' | 'fit_height' | 'custom') => void;
  setZoomPercent: (percent: number) => void;
  setRotation: (deg: number) => void;
  toggleHoverZoom: () => void;
  rotateLeft: () => void;
  rotateRight: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
  resetViewerState: () => void;
}

// Mock data generator
const generateMockDocuments = (): Document[] => {
  const docs: Document[] = [];
  
  // Invoice - 1 document with 2 pages (Approved in your example)
  docs.push({
    id: 'doc-invoice-001',
    name: 'Invoice #2024-001',
    documentType: 'Invoice',
    pages: [
      { 
        id: 'page-inv-001-1', 
        pageNumber: 1, 
        imageUrl: 'https://images.unsplash.com/photo-1518893560155-b89cac6db0c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnZvaWNlJTIwZG9jdW1lbnQlMjBwYXBlcnxlbnwxfHx8fDE3NjIyMzc0OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      { 
        id: 'page-inv-001-2', 
        pageNumber: 2, 
        imageUrl: 'https://images.unsplash.com/photo-1721379805142-faaa28ab1424?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGRvY3VtZW50JTIwZm9ybXxlbnwxfHx8fDE3NjIyODcwNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080'
      }
    ],
    uploadDate: '2024-11-01T10:30:00Z'
  });

  // Bill of Lading - 1 document with 3 pages
  docs.push({
    id: 'doc-bol-001',
    name: 'BOL_20241101_A',
    documentType: 'Bill of Lading',
    pages: [
      { 
        id: 'page-bol-001-1', 
        pageNumber: 1, 
        imageUrl: 'https://images.unsplash.com/photo-1606295835125-2338079fdfc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxpdmVyeSUyMHJlY2VpcHQlMjBkb2N1bWVudHxlbnwxfHx8fDE3NjIyODcwNjV8MA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      { 
        id: 'page-bol-001-2', 
        pageNumber: 2, 
        imageUrl: 'https://images.unsplash.com/photo-1721379805142-faaa28ab1424?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGRvY3VtZW50JTIwZm9ybXxlbnwxfHx8fDE3NjIyODcwNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      { 
        id: 'page-bol-001-3', 
        pageNumber: 3, 
        imageUrl: 'https://images.unsplash.com/photo-1606295835125-2338079fdfc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxpdmVyeSUyMHJlY2VpcHQlMjBkb2N1bWVudHxlbnwxfHx8fDE3NjIyODcwNjV8MA&ixlib=rb-4.1.0&q=80&w=1080'
      }
    ],
    uploadDate: '2024-11-01T09:15:00Z'
  });

  // Proof of Delivery - 1 document with 1 page
  docs.push({
    id: 'doc-pod-001',
    name: 'POD_DEL20241101',
    documentType: 'Proof of Delivery',
    pages: [
      { 
        id: 'page-pod-001-1', 
        pageNumber: 1, 
        imageUrl: 'https://images.unsplash.com/photo-1606295835125-2338079fdfc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxpdmVyeSUyMHJlY2VpcHQlMjBkb2N1bWVudHxlbnwxfHx8fDE3NjIyODcwNjV8MA&ixlib=rb-4.1.0&q=80&w=1080'
      }
    ],
    uploadDate: '2024-11-01T11:20:00Z'
  });

  // Fuel Receipt - 2 documents, 1 page each
  docs.push({
    id: 'doc-fuel-001',
    name: 'Fuel_Shell_20241101',
    documentType: 'Fuel Receipt',
    pages: [
      { 
        id: 'page-fuel-001-1', 
        pageNumber: 1, 
        imageUrl: 'https://images.unsplash.com/photo-1668257790461-282ee6da6aa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdWVsJTIwcmVjZWlwdCUyMGdhcyUyMHN0YXRpb258ZW58MXx8fHwxNzYyMjg3MDY2fDA&ixlib=rb-4.1.0&q=80&w=1080'
      }
    ],
    uploadDate: '2024-11-01T16:30:00Z'
  });

  docs.push({
    id: 'doc-fuel-002',
    name: 'Fuel_BP_20241102',
    documentType: 'Fuel Receipt',
    pages: [
      { 
        id: 'page-fuel-002-1', 
        pageNumber: 1, 
        imageUrl: 'https://images.unsplash.com/photo-1668257790461-282ee6da6aa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdWVsJTIwcmVjZWlwdCUyMGdhcyUyMHN0YXRpb258ZW58MXx8fHwxNzYyMjg3MDY2fDA&ixlib=rb-4.1.0&q=80&w=1080'
      }
    ],
    uploadDate: '2024-11-02T08:15:00Z'
  });

  // Driver Log - 1 document with 2 pages
  docs.push({
    id: 'doc-log-001',
    name: 'DriverLog_Nov1_2024',
    documentType: 'Driver Log',
    pages: [
      { 
        id: 'page-log-001-1', 
        pageNumber: 1, 
        imageUrl: 'https://images.unsplash.com/photo-1721379805142-faaa28ab1424?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGRvY3VtZW50JTIwZm9ybXxlbnwxfHx8fDE3NjIyODcwNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      { 
        id: 'page-log-001-2', 
        pageNumber: 2, 
        imageUrl: 'https://images.unsplash.com/photo-1606295835125-2338079fdfc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxpdmVyeSUyMHJlY2VpcHQlMjBkb2N1bWVudHxlbnwxfHx8fDE3NjIyODcwNjV8MA&ixlib=rb-4.1.0&q=80&w=1080'
      }
    ],
    uploadDate: '2024-11-01T14:00:00Z'
  });

  // Toll Receipt - 1 document with 1 page
  docs.push({
    id: 'doc-toll-001',
    name: 'Toll_I95_20241101',
    documentType: 'Toll Receipt',
    pages: [
      { 
        id: 'page-toll-001-1', 
        pageNumber: 1, 
        imageUrl: 'https://images.unsplash.com/photo-1518893560155-b89cac6db0c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnZvaWNlJTIwZG9jdW1lbnQlMjBwYXBlcnxlbnwxfHx8fDE3NjIyMzc0OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
      }
    ],
    uploadDate: '2024-11-01T15:45:00Z'
  });

  // Permit Copy - 1 document with 1 page
  docs.push({
    id: 'doc-permit-001',
    name: 'Permit_20241101_TX',
    documentType: 'Permit Copy',
    pages: [
      { 
        id: 'page-permit-001-1', 
        pageNumber: 1, 
        imageUrl: 'https://images.unsplash.com/photo-1721379805142-faaa28ab1424?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGRvY3VtZW50JTIwZm9ybXxlbnwxfHx8fDE3NjIyODcwNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080'
      }
    ],
    uploadDate: '2024-11-01T13:30:00Z'
  });

  // Unclassified - 2 separate single-page documents
  docs.push({
    id: 'doc-unc-001',
    name: 'Unknown_Doc_1',
    documentType: 'Unclassified',
    pages: [
      { 
        id: 'page-unc-001-1', 
        pageNumber: 1, 
        imageUrl: 'https://images.unsplash.com/photo-1721379805142-faaa28ab1424?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGRvY3VtZW50JTIwZm9ybXxlbnwxfHx8fDE3NjIyODcwNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080'
      }
    ],
    uploadDate: '2024-11-04T13:00:00Z'
  });

  docs.push({
    id: 'doc-unc-002',
    name: 'Unknown_Doc_2',
    documentType: 'Unclassified',
    pages: [
      { 
        id: 'page-unc-002-1', 
        pageNumber: 1, 
        imageUrl: 'https://images.unsplash.com/photo-1606295835125-2338079fdfc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxpdmVyeSUyMHJlY2VpcHQlMjBkb2N1bWVudHxlbnwxfHx8fDE3NjIyODcwNjV8MA&ixlib=rb-4.1.0&q=80&w=1080'
      }
    ],
    uploadDate: '2024-11-04T13:15:00Z'
  });

  return docs;
};

export const useDocumentViewerStore = create<ViewerState>((set, get) => ({
  documents: generateMockDocuments(),
  activePageId: 'page-inv-001-1', // Start with first page of invoice
  zoomMode: 'fit_width',
  zoomPercent: 100,
  rotationDeg: 0,
  hoverZoomEnabled: false,

  // Getters
  getActiveDocument: () => {
    const { documents, activePageId } = get();
    if (!activePageId) return undefined;
    return documents.find(doc => doc.pages.some(page => page.id === activePageId));
  },

  getActivePage: () => {
    const { documents, activePageId } = get();
    if (!activePageId) return undefined;
    
    for (const doc of documents) {
      const page = doc.pages.find(p => p.id === activePageId);
      if (page) {
        return { document: doc, page };
      }
    }
    return undefined;
  },

  getDocumentsByType: (type: DocumentTypeCategory) => {
    const { documents } = get();
    return documents.filter(doc => doc.documentType === type);
  },

  getAllDocumentTypes: () => {
    const { documents } = get();
    const types = new Set(documents.map(doc => doc.documentType));
    return Array.from(types).sort((a, b) => {
      // Keep Unclassified at the end
      if (a === 'Unclassified') return 1;
      if (b === 'Unclassified') return -1;
      return a.localeCompare(b);
    });
  },

  // Navigation
  setActivePage: (pageId) => {
    set({
      activePageId: pageId,
      zoomMode: 'fit_width',
      zoomPercent: 100,
      rotationDeg: 0
    });
  },

  nextPage: () => {
    const state = get();
    const active = state.getActivePage();
    if (!active) return;

    const { document: doc, page } = active;
    const currentIndex = doc.pages.findIndex(p => p.id === page.id);
    
    if (currentIndex < doc.pages.length - 1) {
      // Next page in same document
      set({ activePageId: doc.pages[currentIndex + 1].id });
    }
  },

  prevPage: () => {
    const state = get();
    const active = state.getActivePage();
    if (!active) return;

    const { document: doc, page } = active;
    const currentIndex = doc.pages.findIndex(p => p.id === page.id);
    
    if (currentIndex > 0) {
      // Previous page in same document
      set({ activePageId: doc.pages[currentIndex - 1].id });
    }
  },

  firstPage: () => {
    const state = get();
    const doc = state.getActiveDocument();
    if (doc && doc.pages.length > 0) {
      set({ activePageId: doc.pages[0].id });
    }
  },

  lastPage: () => {
    const state = get();
    const doc = state.getActiveDocument();
    if (doc && doc.pages.length > 0) {
      set({ activePageId: doc.pages[doc.pages.length - 1].id });
    }
  },

  // Document management
  movePage: (pageId, targetDocumentType, targetDocumentId) => {
    set(state => {
      const documents = [...state.documents];
      
      // Find source document and page
      let sourceDoc: Document | undefined;
      let sourcePage: DocumentPage | undefined;
      let sourcePageIndex = -1;
      
      for (const doc of documents) {
        const pageIndex = doc.pages.findIndex(p => p.id === pageId);
        if (pageIndex !== -1) {
          sourceDoc = doc;
          sourcePage = doc.pages[pageIndex];
          sourcePageIndex = pageIndex;
          break;
        }
      }
      
      if (!sourceDoc || !sourcePage) return state;
      
      // Remove page from source document
      sourceDoc.pages.splice(sourcePageIndex, 1);
      
      // If source document is now empty, remove it
      const sourceDocIndex = documents.findIndex(d => d.id === sourceDoc!.id);
      if (sourceDoc.pages.length === 0) {
        documents.splice(sourceDocIndex, 1);
      }
      
      // Add page to target document or create new document
      if (targetDocumentId) {
        // Move to existing document
        const targetDoc = documents.find(d => d.id === targetDocumentId);
        if (targetDoc) {
          sourcePage.pageNumber = targetDoc.pages.length + 1;
          targetDoc.pages.push(sourcePage);
        }
      } else {
        // Create new document with this page
        const newDoc: Document = {
          id: `doc-${Date.now()}`,
          name: `${targetDocumentType}_${Date.now()}`,
          documentType: targetDocumentType,
          pages: [{ ...sourcePage, pageNumber: 1 }],
          uploadDate: new Date().toISOString()
        };
        documents.push(newDoc);
      }
      
      return { documents };
    });
  },

  reorderPage: (pageId, targetDocumentId, targetIndex) => {
    set(state => {
      const documents = [...state.documents];
      
      // Find source document and page
      let sourceDoc: Document | undefined;
      let sourcePage: DocumentPage | undefined;
      let sourcePageIndex = -1;
      
      for (const doc of documents) {
        const pageIndex = doc.pages.findIndex(p => p.id === pageId);
        if (pageIndex !== -1) {
          sourceDoc = doc;
          sourcePage = doc.pages[pageIndex];
          sourcePageIndex = pageIndex;
          break;
        }
      }
      
      if (!sourceDoc || !sourcePage) return state;
      
      const targetDoc = documents.find(d => d.id === targetDocumentId);
      if (!targetDoc) return state;
      
      // If moving within the same document
      if (sourceDoc.id === targetDoc.id) {
        // Remove from old position
        sourceDoc.pages.splice(sourcePageIndex, 1);
        // Insert at new position (adjust index if we removed from before the target)
        const adjustedIndex = sourcePageIndex < targetIndex ? targetIndex - 1 : targetIndex;
        sourceDoc.pages.splice(adjustedIndex, 0, sourcePage);
        
        // Renumber all pages
        sourceDoc.pages.forEach((page, index) => {
          page.pageNumber = index + 1;
        });
      } else {
        // Moving to a different document
        // Remove from source
        sourceDoc.pages.splice(sourcePageIndex, 1);
        
        // Renumber source document pages
        sourceDoc.pages.forEach((page, index) => {
          page.pageNumber = index + 1;
        });
        
        // Remove source document if empty
        if (sourceDoc.pages.length === 0) {
          const sourceDocIndex = documents.findIndex(d => d.id === sourceDoc!.id);
          documents.splice(sourceDocIndex, 1);
        }
        
        // Insert into target document at specific index
        targetDoc.pages.splice(targetIndex, 0, sourcePage);
        
        // Renumber target document pages
        targetDoc.pages.forEach((page, index) => {
          page.pageNumber = index + 1;
        });
      }
      
      return { documents };
    });
  },

  rejectPage: (pageId) => {
    set(state => {
      const documents = [...state.documents];
      
      // Find and remove the page
      for (const doc of documents) {
        const pageIndex = doc.pages.findIndex(p => p.id === pageId);
        if (pageIndex !== -1) {
          doc.pages.splice(pageIndex, 1);
          
          // Renumber remaining pages
          doc.pages.forEach((page, index) => {
            page.pageNumber = index + 1;
          });
          
          // Remove document if empty
          if (doc.pages.length === 0) {
            const docIndex = documents.findIndex(d => d.id === doc.id);
            documents.splice(docIndex, 1);
          }
          
          break;
        }
      }
      
      // If active page was rejected, switch to another page
      let newActivePageId = state.activePageId;
      if (pageId === state.activePageId) {
        newActivePageId = documents[0]?.pages[0]?.id || null;
      }
      
      return { documents, activePageId: newActivePageId };
    });
  },

  rejectDocument: (documentId) => {
    set(state => {
      const documents = state.documents.filter(d => d.id !== documentId);
      
      // If active document was rejected, switch to another
      const activeDoc = documents.find(doc => 
        doc.pages.some(page => page.id === state.activePageId)
      );
      
      let newActivePageId = state.activePageId;
      if (!activeDoc) {
        newActivePageId = documents[0]?.pages[0]?.id || null;
      }
      
      return { documents, activePageId: newActivePageId };
    });
  },

  // Viewer actions
  setZoomMode: (mode) => set({ zoomMode: mode }),

  setZoomPercent: (percent) => set({ 
    zoomPercent: Math.max(10, Math.min(500, percent)),
    zoomMode: 'custom'
  }),

  setRotation: (deg) => set({ rotationDeg: deg % 360 }),

  toggleHoverZoom: () => set((state) => ({ hoverZoomEnabled: !state.hoverZoomEnabled })),

  rotateLeft: () => set((state) => ({ rotationDeg: (state.rotationDeg - 90) % 360 })),

  rotateRight: () => set((state) => ({ rotationDeg: (state.rotationDeg + 90) % 360 })),

  zoomIn: () => set((state) => ({ 
    zoomPercent: Math.min(500, state.zoomPercent + 10),
    zoomMode: 'custom'
  })),

  zoomOut: () => set((state) => ({ 
    zoomPercent: Math.max(10, state.zoomPercent - 10),
    zoomMode: 'custom'
  })),

  resetViewerState: () => set({
    zoomMode: 'fit_width',
    zoomPercent: 100,
    rotationDeg: 0
  })
}));
