import { 
  RotateCcw, 
  RotateCw, 
  ZoomIn, 
  ZoomOut, 
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  Download,
  ExternalLink,
  ArrowUpDown,
  ArrowLeftRight
} from 'lucide-react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { ScrollArea } from './ui/scroll-area';
import { useState, useMemo, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import ModernThumbnailSidebar from './ModernThumbnailSidebar';
import { DocumentDataPopover } from './InfoPopovers';
import Vector from '../imports/Vector-162-227';
import FitHeight from '../imports/FitHeight';
import FitWidth from '../imports/FitWidth';
import doc1 from 'figma:asset/9cdc5defd2242643b5a8013aa978361e36f30c5f.png';
import doc2 from 'figma:asset/fb96375b1336a92c6702702b078dd6ecc8d8ffd0.png';
import doc3 from 'figma:asset/2e1e190d29a8b62373c91c896df85dd5a7c43811.png';
import fuelReceiptImage from 'figma:asset/e85e55fd7c8af1af2d525e8533cb8678db520e68.png';

interface UnclassifiedDoc {
  id: string;
  name: string;
  type: string;
  status: string;
}

interface MissingDoc {
  id: string;
  name: string;
  isIgnored: boolean;
}

interface AppDocument {
  id: string;
  name: string;
  type: string;
  status: 'unclassified' | 'approved' | 'rejected';
}

interface ApprovedDocument {
  section: string;
  approvedAt: Date;
  fields: any[];
  pageCount: number;
}

interface DocumentViewerWithToolbarProps {
  selectedDocumentId: string;
  onDocumentSelect?: (sectionName: string) => void;
  unclassifiedDocuments?: UnclassifiedDoc[];
  missingDocuments?: MissingDoc[];
  allDocuments?: AppDocument[];
  approvedDocuments?: ApprovedDocument[];
  onDocumentClassification?: (documentId: string, newType: string) => void;
  onDocumentReject?: (documentId: string, reason: string) => void;
  activeTab?: string;
}

export default function DocumentViewerWithToolbar({ 
  selectedDocumentId, 
  onDocumentSelect, 
  unclassifiedDocuments = [], 
  missingDocuments = [],
  allDocuments = [],
  approvedDocuments = [],
  onDocumentClassification,
  onDocumentReject,
  activeTab = 'exceptions'
}: DocumentViewerWithToolbarProps) {
  console.log('=== DOCUMENT VIEWER RENDER ===');
  console.log('Unclassified Documents:', unclassifiedDocuments);
  console.log('All Documents:', allDocuments);
  console.log('Approved Documents:', approvedDocuments);
  console.log('Selected Document ID:', selectedDocumentId);
  
  // Document structure with multiple document types and pages
  const initialDocuments = useMemo(() => [
    {
      id: 'scale-ticket',
      name: 'Scale Ticket',
      pages: [
        { id: 'scale-1', pageNumber: 1, thumbnail: doc1 },
        { id: 'scale-2', pageNumber: 2, thumbnail: doc2 }
      ]
    },
    {
      id: 'bill-of-lading',
      name: 'Bill of Lading',
      pages: [
        { id: 'bol-1', pageNumber: 1, thumbnail: doc2 },
        { id: 'bol-2', pageNumber: 2, thumbnail: doc1 },
        { id: 'bol-3', pageNumber: 3, thumbnail: doc3 }
      ]
    },
    {
      id: 'proof-of-delivery',
      name: 'Proof of Delivery',
      pages: [
        { id: 'pod-1', pageNumber: 1, thumbnail: doc1 },
        { id: 'pod-2', pageNumber: 2, thumbnail: doc2 }
      ]
    },
    {
      id: 'driver-log',
      name: 'Driver Log',
      pages: [
        { id: 'driver-1', pageNumber: 1, thumbnail: doc1 },
        { id: 'driver-2', pageNumber: 2, thumbnail: doc2 }
      ]
    },
    {
      id: 'invoice',
      name: 'Invoice',
      pages: [
        { id: 'invoice-1', pageNumber: 1, thumbnail: doc3 }
      ]
    },
    {
      id: 'toll-receipt',
      name: 'Toll Receipt',
      pages: [
        { id: 'toll-1', pageNumber: 1, thumbnail: doc3 }
      ]
    },
    {
      id: 'permit-copy',
      name: 'Permit Copy',
      pages: [
        { id: 'permit-1', pageNumber: 1, thumbnail: doc1 }
      ]
    }
    // Fuel Receipt will be added dynamically when user classifies an unclassified document
  ], []);

  const [documents, setDocuments] = useState(initialDocuments);
  
  // Sync documents with allDocuments to pick up newly classified types
  useEffect(() => {
    console.log('🔄 Syncing documents with allDocuments:', allDocuments);
    
    // Get document types from allDocuments (excluding unclassified)
    const approvedSections = new Set(approvedDocuments.map(doc => doc.section));
    const documentTypes = new Set(
      allDocuments
        .filter(doc => doc.type !== 'Unclassified' && !approvedSections.has(doc.type))
        .map(doc => doc.type)
    );
    
    console.log('📋 Document types in allDocuments:', Array.from(documentTypes));
    
    // Check if there are new document types not in our current documents
    const currentTypes = new Set(documents.map(doc => doc.name));
    const newTypes = Array.from(documentTypes).filter(type => !currentTypes.has(type));
    
    if (newTypes.length > 0) {
      console.log('✨ New document types found:', newTypes);
      
      // Add new document types to documents state
      setDocuments(prevDocs => {
        const updatedDocs = [...prevDocs];
        
        newTypes.forEach(type => {
          // Map type name to ID (kebab-case)
          const id = type.toLowerCase().replace(/\s+/g, '-');
          
          // Get thumbnail based on type
          const thumbnail = type === 'Fuel Receipt' ? fuelReceiptImage : doc1;
          
          // Count how many documents of this type exist
          const docsOfType = allDocuments.filter(doc => doc.type === type);
          
          // Create pages for each document of this type
          const pages = docsOfType.map((doc, index) => ({
            id: `${id}-${index + 1}`,
            pageNumber: index + 1,
            thumbnail,
            sourceDocId: doc.id
          }));
          
          // Add the new document type
          updatedDocs.push({
            id,
            name: type,
            pages
          });
        });
        
        console.log('✅ Updated documents:', updatedDocs);
        return updatedDocs;
      });
    }
  }, [allDocuments, approvedDocuments, documents]);

  const [currentDocumentId, setCurrentDocumentId] = useState(''); // No document selected initially
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [isMetadataOpen, setIsMetadataOpen] = useState(false);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  
  // Refs for fit width/height calculations
  const imageRef = useRef<HTMLImageElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  
  // State for drag-to-pan functionality
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [scrollStart, setScrollStart] = useState({ x: 0, y: 0 });
  const dragThreshold = 5; // Minimum pixels to move before considering it a drag

  // Sync viewer when selected document changes
  useEffect(() => {
    console.log('🔄 selectedDocumentId changed to:', selectedDocumentId);
    console.log('🔄 currentDocumentId before sync:', currentDocumentId);
    
    // Don't auto-select if no document is selected
    if (!selectedDocumentId) {
      console.log('🔄 No document selected, clearing viewer');
      setCurrentDocumentId('');
      return;
    }
    
    const sectionToDocId: Record<string, string> = {
      'Scale Ticket': 'scale-ticket',
      'Bill of Lading': 'bill-of-lading',
      'Proof of Delivery': 'proof-of-delivery',
      'Driver Log': 'driver-log',
      'Invoice': 'invoice',
      'Toll Receipt': 'toll-receipt',
      'Permit Copy': 'permit-copy'
    };
    
    // Check if it's an unclassified document ID (starts with 'doc-')
    const isUnclassifiedId = selectedDocumentId.startsWith('doc-');
    
    if (isUnclassifiedId) {
      // It's an unclassified document ID, use it directly
      console.log('🔄 Setting to unclassified document:', selectedDocumentId);
      setCurrentDocumentId(selectedDocumentId);
      setCurrentPageNumber(1);
    } else {
      // It's a section name, map to document ID
      const newDocId = sectionToDocId[selectedDocumentId];
      console.log('🔄 Mapping section to doc ID:', selectedDocumentId, '->', newDocId);
      
      // Only update if we found a valid mapping and it's different
      if (newDocId && newDocId !== currentDocumentId) {
        setCurrentDocumentId(newDocId);
        setCurrentPageNumber(1);
      }
    }
  }, [selectedDocumentId]);

  // Add global mouse event listeners for smoother dragging
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging || !viewportRef.current) return;
      
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;
      
      viewportRef.current.scrollLeft = scrollStart.x - dx;
      viewportRef.current.scrollTop = scrollStart.y - dy;
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleGlobalMouseMove);
      window.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, dragStart, scrollStart]);

  // Derive rejected documents from allDocuments with 'rejected' status
  const viewerRejectedDocuments = useMemo(() => {
    console.log('🔍 Computing rejected documents from allDocuments:', allDocuments);
    
    const rejectedDocs = allDocuments
      .filter(doc => doc.status === 'rejected')
      .map((doc, index) => {
        const thumbnail = doc.type === 'Fuel Receipt' ? fuelReceiptImage : [doc1, doc2, doc3][index % 3];
        
        return {
          id: doc.id,
          name: doc.type, // Use type name instead of filename
          pages: [
            { id: `${doc.id}-page-1`, pageNumber: 1, thumbnail }
          ]
        };
      });
    
    console.log('✅ Rejected documents computed:', rejectedDocs);
    return rejectedDocs;
  }, [allDocuments]);

  const [rejectedDocuments, setRejectedDocuments] = useState(viewerRejectedDocuments);

  // Sync with incoming rejected documents
  useEffect(() => {
    console.log('🔄 Syncing rejected documents:', viewerRejectedDocuments);
    setRejectedDocuments(viewerRejectedDocuments);
  }, [viewerRejectedDocuments]);

  // Convert incoming unclassified documents to viewer format
  const viewerUnclassifiedDocuments = useMemo(() => {
    return unclassifiedDocuments.map((doc, index) => {
      // Use fuel receipt image for Fuel_Receipt_001.pdf
      const thumbnail = doc.name === 'Fuel_Receipt_001.pdf' 
        ? fuelReceiptImage 
        : [doc2, doc3, doc1][index % 3];
      
      return {
        id: doc.id,
        name: doc.name,
        pages: [
          { id: `${doc.id}-page-1`, pageNumber: 1, thumbnail }
        ]
      };
    });
  }, [unclassifiedDocuments]);

  const [localUnclassifiedDocuments, setLocalUnclassifiedDocuments] = useState(viewerUnclassifiedDocuments);

  // Sync with incoming unclassified documents
  useEffect(() => {
    setLocalUnclassifiedDocuments(viewerUnclassifiedDocuments);
  }, [viewerUnclassifiedDocuments]);
  
  // Derive missing documents from missingDocuments prop
  const viewerMissingDocuments = useMemo(() => {
    return missingDocuments.map((doc, index) => {
      // Cycle through thumbnails for variety
      const thumbnail = index === 0 ? fuelReceiptImage : doc3;
      
      return {
        id: doc.id,
        name: doc.name,
        pages: [
          { id: `${doc.id}-page-1`, pageNumber: 1, thumbnail }
        ]
      };
    });
  }, [missingDocuments]);

  const [localMissingDocuments, setLocalMissingDocuments] = useState(viewerMissingDocuments);

  // Sync with incoming missing documents
  useEffect(() => {
    setLocalMissingDocuments(viewerMissingDocuments);
  }, [viewerMissingDocuments]);
  
  // Derive approved documents from approvedDocuments prop (section-based)
  const viewerApprovedDocuments = useMemo(() => {
    // Get a set of approved section names
    const approvedSections = new Set(approvedDocuments.map(doc => doc.section));
    
    console.log('🔍 Approved documents prop:', approvedDocuments);
    console.log('📋 Approved sections:', Array.from(approvedSections));
    console.log('📄 Available viewer documents:', documents.map(d => ({ id: d.id, name: d.name })));
    
    // Find matching documents from the static documents list
    // Match by document name (e.g., "Bill of Lading") to section name
    const matched = documents.filter(doc => {
      return approvedSections.has(doc.name);
    });
    
    console.log('🎯 Matched viewer documents for approved:', matched.map(d => ({ id: d.id, name: d.name })));
    
    return matched;
  }, [approvedDocuments, documents]);

  const [localApprovedDocuments, setLocalApprovedDocuments] = useState(viewerApprovedDocuments);

  // Sync with incoming approved documents
  useEffect(() => {
    setLocalApprovedDocuments(viewerApprovedDocuments);
  }, [viewerApprovedDocuments]);

  // Filter out approved documents from the main documents list
  const filteredDocuments = useMemo(() => {
    const approvedIds = new Set(localApprovedDocuments.map(doc => doc.id));
    // Use the local documents state, NOT viewerRegularDocuments
    return documents.filter(doc => !approvedIds.has(doc.id));
  }, [documents, localApprovedDocuments]);

  // Get current document and page - check all document sources
  const currentDocument = filteredDocuments.find(doc => doc.id === currentDocumentId) 
    || localUnclassifiedDocuments.find(doc => doc.id === currentDocumentId)
    || localMissingDocuments.find(doc => doc.id === currentDocumentId)
    || localApprovedDocuments.find(doc => doc.id === currentDocumentId)
    || rejectedDocuments.find(doc => doc.id === currentDocumentId);
  const currentPage = currentDocument?.pages.find(page => page.pageNumber === currentPageNumber);
  
  // Calculate total pages across all documents
  const allPages = useMemo(() => {
    const pages: Array<{ documentId: string; pageNumber: number; thumbnail: string }> = [];
    
    // Add pages from main documents (filtered - approved ones are excluded)
    filteredDocuments.forEach(doc => {
      doc.pages.forEach(page => {
        pages.push({
          documentId: doc.id,
          pageNumber: page.pageNumber,
          thumbnail: page.thumbnail
        });
      });
    });
    
    // Add pages from unclassified documents
    localUnclassifiedDocuments.forEach(doc => {
      doc.pages.forEach(page => {
        pages.push({
          documentId: doc.id,
          pageNumber: page.pageNumber,
          thumbnail: page.thumbnail
        });
      });
    });
    
    // Add pages from missing documents
    localMissingDocuments.forEach(doc => {
      doc.pages.forEach(page => {
        pages.push({
          documentId: doc.id,
          pageNumber: page.pageNumber,
          thumbnail: page.thumbnail
        });
      });
    });
    
    // Add pages from approved documents
    localApprovedDocuments.forEach(doc => {
      doc.pages.forEach(page => {
        pages.push({
          documentId: doc.id,
          pageNumber: page.pageNumber,
          thumbnail: page.thumbnail
        });
      });
    });
    
    return pages;
  }, [filteredDocuments, localUnclassifiedDocuments, localMissingDocuments, localApprovedDocuments]);

  const currentPageIndex = allPages.findIndex(
    page => page.documentId === currentDocumentId && page.pageNumber === currentPageNumber
  );
  const totalPages = allPages.length;

  const handleRotateLeft = () => setRotation((prev) => (prev - 90) % 360);
  const handleRotateRight = () => setRotation((prev) => (prev + 90) % 360);
  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 25, 25));
  
  const handleFitWidth = () => {
    if (!imageRef.current || !viewportRef.current) {
      setZoom(100);
      return;
    }
    
    const imageWidth = imageRef.current.naturalWidth;
    const viewportWidth = viewportRef.current.clientWidth - 64; // Account for padding
    
    if (imageWidth > 0) {
      const zoomPercent = Math.floor((viewportWidth / imageWidth) * 100);
      setZoom(Math.max(25, Math.min(200, zoomPercent)));
    }
  };
  
  const handleFitHeight = () => {
    if (!imageRef.current || !viewportRef.current) {
      setZoom(100);
      return;
    }
    
    const imageHeight = imageRef.current.naturalHeight;
    const viewportHeight = viewportRef.current.clientHeight - 64; // Account for padding
    
    if (imageHeight > 0) {
      const zoomPercent = Math.floor((viewportHeight / imageHeight) * 100);
      setZoom(Math.max(25, Math.min(200, zoomPercent)));
    }
  };

  // Drag-to-pan handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!viewportRef.current) return;
    
    // Only start drag if the target is not a scrollbar
    // We detect this by checking if the event is on the viewport itself or its content
    const rect = viewportRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    
    // Check if click is within the scrollable content area (not on scrollbars)
    const isInContentArea = offsetX < viewportRef.current.clientWidth && 
                            offsetY < viewportRef.current.clientHeight;
    
    if (!isInContentArea) {
      return;
    }
    
    setDragStart({ x: e.clientX, y: e.clientY });
    setScrollStart({ 
      x: viewportRef.current.scrollLeft, 
      y: viewportRef.current.scrollTop 
    });
    
    // Mark as potentially dragging (will confirm on move)
    setIsDragging(true);
    
    // Prevent text selection while dragging
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Mouse move is now handled by global listener for smoother performance
    return;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    // Don't stop dragging on mouse leave - let global listener handle it
    return;
  };

  const handleFirstPage = () => {
    const firstPage = allPages[0];
    setCurrentDocumentId(firstPage.documentId);
    setCurrentPageNumber(firstPage.pageNumber);
  };

  const handlePreviousPage = () => {
    if (currentPageIndex > 0) {
      const prevPage = allPages[currentPageIndex - 1];
      setCurrentDocumentId(prevPage.documentId);
      setCurrentPageNumber(prevPage.pageNumber);
    }
  };

  const handleNextPage = () => {
    if (currentPageIndex < totalPages - 1) {
      const nextPage = allPages[currentPageIndex + 1];
      setCurrentDocumentId(nextPage.documentId);
      setCurrentPageNumber(nextPage.pageNumber);
    }
  };

  const handleLastPage = () => {
    const lastPage = allPages[allPages.length - 1];
    setCurrentDocumentId(lastPage.documentId);
    setCurrentPageNumber(lastPage.pageNumber);
  };

  const handlePageClick = (documentId: string, pageNumber: number) => {
    setCurrentDocumentId(documentId);
    setCurrentPageNumber(pageNumber);
    
    // Notify parent component of document selection change
    if (onDocumentSelect) {
      // Check if it's an unclassified document ID (starts with 'doc-')
      const isUnclassifiedId = documentId.startsWith('doc-');
      
      if (isUnclassifiedId) {
        // It's an unclassified document, pass the ID directly
        onDocumentSelect(documentId);
      } else {
        // Map document ID back to section name for parent component
        const docIdToSection: Record<string, string> = {
          'scale-ticket': 'Scale Ticket',
          'invoice': 'Invoice',
          'bill-of-lading': 'Bill of Lading',
          'proof-of-delivery': 'Proof of Delivery',
          'driver-log': 'Driver Log',
          'toll-receipt': 'Toll Receipt',
          'permit-copy': 'Permit Copy'
        };
        
        const sectionName = docIdToSection[documentId];
        if (sectionName) {
          onDocumentSelect(sectionName);
        }
      }
    }
  };

  // Handle page reclassification (moving a page from one document to another)
  const handlePageReclassify = (pageId: string, sourceDocId: string, targetDocId: string) => {
    // Check if source is an unclassified document
    const isSourceUnclassified = localUnclassifiedDocuments.some(doc => doc.id === sourceDocId);
    
    if (isSourceUnclassified) {
      // Handle unclassified -> regular document reclassification
      
      // Map targetDocId to document type name for parent classification
      const docIdToType: Record<string, string> = {
        'bill-of-lading': 'Bill of Lading',
        'proof-of-delivery': 'Proof of Delivery',
        'fuel-receipt': 'Fuel Receipt',
        'driver-log': 'Driver Log',
        'toll-receipt': 'Toll Receipt',
        'permit-copy': 'Permit Copy'
      };
      
      const newDocumentType = docIdToType[targetDocId];
      
      // Call parent classification handler to update shared state
      // The parent will update unclassifiedDocuments and allDocuments
      // Then those changes will flow back down via props and update our local state
      if (onDocumentClassification && newDocumentType) {
        console.log('🎯 Classifying document:', sourceDocId, 'as', newDocumentType);
        onDocumentClassification(sourceDocId, newDocumentType);
        toast.success(`Classified as ${newDocumentType}`);
      }
    } else {
      // Handle regular document -> regular document reclassification
      setDocuments(prevDocs => {
        const newDocs = prevDocs.map(doc => ({
          ...doc,
          pages: [...doc.pages]
        }));
        
        // Find and extract from source
        const sourceDoc = newDocs.find(d => d.id === sourceDocId);
        if (!sourceDoc) return prevDocs;
        
        const pageIndex = sourceDoc.pages.findIndex((p: any) => p.id === pageId);
        if (pageIndex === -1) return prevDocs;
        
        const [page] = sourceDoc.pages.splice(pageIndex, 1);
        
        // Renumber remaining pages in source
        sourceDoc.pages.forEach((p: any, index: number) => {
          p.pageNumber = index + 1;
        });
        
        // Add to target if it exists
        const targetDoc = newDocs.find(d => d.id === targetDocId);
        if (targetDoc) {
          targetDoc.pages.push({
            ...page,
            pageNumber: targetDoc.pages.length + 1
          });
        }
        
        toast.success('Page reclassified successfully');
        
        // Filter out empty documents
        return newDocs.filter(doc => doc.pages.length > 0);
      });
    }
  };

  return (
    <div className="bg-[#F5F7FA] relative size-full border border-[#D0D5DD] rounded-lg overflow-hidden">
      <div className="size-full flex flex-col">
        {/* Toolbar */}
        <div data-tour="viewer-toolbar" className="flex items-center justify-between gap-4 px-4 py-2.5 flex-wrap bg-white border-b border-[#E0E4E9]">
          {/* Left: Document Info */}
          <div className="flex items-center gap-2 text-sm text-[#475467]">
            <span className="font-light">Viewing:</span>
            <span className="font-semibold text-[#1A1F36]">{currentDocument?.name || 'Document'} - Page {currentPageNumber}</span>
          </div>

          {/* Right: Tools */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Action Buttons Group - Primary Blue */}
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-[#2563EB] hover:text-[#1E40AF] hover:bg-[#EFF6FF]"
                aria-label="Download"
                title="Download document"
              >
                <Download className="h-4 w-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-[#2563EB] hover:text-[#1E40AF] hover:bg-[#EFF6FF]"
                aria-label="Open in new tab"
                title="Open in new tab"
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>

            <Separator orientation="vertical" className="h-6 bg-[#D0D5DD]" />

            {/* Rotation Controls - Gray */}
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-[#475467] hover:text-[#1A1F36] hover:bg-[#F5F7FA]"
                onClick={handleRotateLeft}
                aria-label="Rotate left"
                title="Rotate left"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-[#475467] hover:text-[#1A1F36] hover:bg-[#F5F7FA]"
                onClick={handleRotateRight}
                aria-label="Rotate right"
                title="Rotate right"
              >
                <RotateCw className="h-4 w-4" />
              </Button>
            </div>

            <Separator orientation="vertical" className="h-6 bg-[#D0D5DD]" />

            {/* View Controls - Gray */}
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-[#475467] hover:text-[#1A1F36] hover:bg-[#F5F7FA]"
                onClick={handleFitHeight}
                aria-label="Fit height"
                title="Fit to height"
              >
                <ArrowUpDown className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-[#475467] hover:text-[#1A1F36] hover:bg-[#F5F7FA]"
                onClick={handleFitWidth}
                aria-label="Fit width"
                title="Fit to width"
              >
                <ArrowLeftRight className="h-4 w-4" />
              </Button>
            </div>

            <Separator orientation="vertical" className="h-6 bg-[#D0D5DD]" />

            {/* Zoom Controls - Gray with prominent zoom display */}
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-[#475467] hover:text-[#1A1F36] hover:bg-[#F5F7FA]"
                onClick={handleZoomOut}
                aria-label="Zoom out"
                title="Zoom out"
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Popover open={isZoomOpen} onOpenChange={setIsZoomOpen}>
                <PopoverTrigger asChild>
                  <button 
                    className="min-w-[70px] h-8 flex items-center justify-center bg-white rounded border-2 border-[#2563EB] px-3 hover:bg-[#EFF6FF] transition-colors cursor-pointer"
                    title="Click to change zoom level"
                  >
                    <span className="text-xs text-[#1A1F36] font-semibold">{zoom}%</span>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-32 p-1" align="center">
                  <ScrollArea className="h-48">
                    {[25, 50, 75, 100, 125, 150, 200, 300, 400].map((zoomLevel) => (
                      <button
                        key={zoomLevel}
                        className="w-full text-left px-3 py-1.5 text-sm hover:bg-[#F5F7FA] rounded"
                        onClick={() => {
                          setZoom(zoomLevel);
                          setIsZoomOpen(false);
                        }}
                      >
                        {zoomLevel}%
                      </button>
                    ))}
                  </ScrollArea>
                </PopoverContent>
              </Popover>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-[#475467] hover:text-[#1A1F36] hover:bg-[#F5F7FA]"
                onClick={handleZoomIn}
                aria-label="Zoom in"
                title="Zoom in"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>

            <Separator orientation="vertical" className="h-6 bg-[#D0D5DD]" />

            {/* Page Navigation - Gray */}
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-[#475467] hover:text-[#1A1F36] hover:bg-[#F5F7FA] disabled:opacity-40"
                onClick={handleFirstPage}
                disabled={currentPageIndex === 0}
                aria-label="First page"
                title="First page"
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-[#475467] hover:text-[#1A1F36] hover:bg-[#F5F7FA] disabled:opacity-40"
                onClick={handlePreviousPage}
                disabled={currentPageIndex === 0}
                aria-label="Previous page"
                title="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="min-w-[60px] h-8 flex items-center justify-center bg-[#F9FAFB] rounded border border-[#E0E4E9] px-3">
                <span className="text-xs text-[#475467] font-medium">{currentPageIndex + 1} / {totalPages}</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-[#475467] hover:text-[#1A1F36] hover:bg-[#F5F7FA] disabled:opacity-40"
                onClick={handleNextPage}
                disabled={currentPageIndex === totalPages - 1}
                aria-label="Next page"
                title="Next page"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-[#475467] hover:text-[#1A1F36] hover:bg-[#F5F7FA] disabled:opacity-40"
                onClick={handleLastPage}
                disabled={currentPageIndex === totalPages - 1}
                aria-label="Last page"
                title="Last page"
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>

            <Separator orientation="vertical" className="h-6 bg-[#D0D5DD]" />

            {/* Action Buttons */}
            <div className="flex items-center gap-1">
              <Popover open={isMetadataOpen} onOpenChange={setIsMetadataOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-[#475467] hover:text-[#1A1F36] hover:bg-[#F5F7FA]"
                    aria-label="Document data"
                  >
                    <div className="h-4 w-4">
                      <Vector />
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-[300px] p-0 overflow-hidden rounded-[10px] border border-[#e3e8ee] shadow-[0px_12px_32px_rgba(15,23,42,0.16)]"
                  align="start"
                  side="bottom"
                  sideOffset={8}
                >
                  <DocumentDataPopover />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        {/* Document Viewer and Thumbnail Sidebar */}
        <div className="flex-1 flex gap-0 min-h-0 overflow-hidden bg-[#F5F7FA]">
          {/* Document Viewer */}
          <div className="flex-1 p-6 min-h-0 min-w-0">
            <div 
              ref={viewportRef}
              className="document-viewer-viewport h-full bg-white rounded-lg overflow-x-scroll overflow-y-scroll relative shadow-sm border border-[#E0E4E9]"
              style={{
                cursor: isDragging ? 'grabbing' : 'grab'
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
            >
              <div className="p-8 min-h-full min-w-full inline-flex items-center justify-center">
                <div 
                  className="bg-white shadow-md transition-transform origin-center"
                  style={{ 
                    transform: `rotate(${rotation}deg) scale(${zoom / 100})`,
                    transformOrigin: 'center center',
                    pointerEvents: 'none'
                  }}
                >
                  <img 
                    ref={imageRef}
                    src={currentPage?.thumbnail || doc1} 
                    alt={`${currentDocument?.name} - Page ${currentPageNumber}`}
                    className="block max-w-none"
                    style={{ 
                      width: 'auto',
                      height: 'auto',
                      userSelect: 'none'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Modern Thumbnail Sidebar */}
          <div className="shrink-0">
            <ModernThumbnailSidebar
              documents={filteredDocuments}
              unclassifiedDocuments={localUnclassifiedDocuments}
              approvedDocuments={localApprovedDocuments}
              rejectedDocuments={rejectedDocuments}
              currentDocumentId={currentDocumentId}
              currentPageNumber={currentPageNumber}
              onPageClick={handlePageClick}
              onPageReclassify={handlePageReclassify}
              onDocumentClassification={onDocumentClassification}
              onDocumentReject={onDocumentReject}
              activeTab={activeTab}
            />
          </div>
        </div>
      </div>
    </div>
  );
}