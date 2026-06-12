import { useState, useEffect } from "react";
import { Resizable } from "re-resizable";
import Background from "./imports/Background";
import ValadationSection from "./imports/ValadationSection";
import { ValidationField } from "./components/ValidationGrid";
import ApprovedContainer, { ApprovedDocument } from "./components/ApprovedContainer";
import MissingDocumentsContainer, { MissingDocument } from "./components/MissingDocumentsContainer";
import DocumentViewerWithToolbar from "./components/DocumentViewerWithToolbar";
import { toast, Toaster } from "sonner";
import { MessageCenterFab } from "./components/MessageCenterFab";
import OnboardingTour from "./components/OnboardingTour";
import { LibraryContext } from "./context/LibraryContext";
import ComponentLibrary from "./components/library/ComponentLibrary";

export type DocumentType = 
  | 'Invoice' 
  | 'Bill of Lading' 
  | 'Proof of Delivery' 
  | 'Fuel Receipt' 
  | 'Driver Log'
  | 'Unclassified';

export type DocumentStatus = 'unclassified' | 'approved' | 'rejected';

export interface Document {
  id: string;
  name: string;
  type: DocumentType;
  status: DocumentStatus;
}

const initialDocuments: Document[] = [
  { id: 'doc-1', name: 'Fuel_Receipt_001.pdf', type: 'Unclassified', status: 'unclassified' },
  { id: 'doc-2', name: 'Scanned_Image_42.pdf', type: 'Unclassified', status: 'unclassified' },
  { id: 'doc-3', name: 'POD_Signed.pdf', type: 'Proof of Delivery', status: 'unclassified' },
  { id: 'doc-5', name: 'Invoice_2024_1234.pdf', type: 'Invoice', status: 'approved' },
  // Fuel Receipt documents will only appear when user classifies an unclassified document
];

const initialMissingDocuments: MissingDocument[] = [
  { id: 'missing-1', name: 'Fuel Receipt', isIgnored: false },
];

const initialValidationData: ValidationField[] = [
  // Initial validation data with fields from different documents
  {
    id: 'inv-1',
    fieldName: 'Total Amount',
    expectedValue: '$1,250.00',
    evaluatedValue: '$1,150.00',
    isRequired: true,
    isResolved: false,
    isIgnored: false,
    section: 'Scale Ticket',
    additionalInfo: 'Range: $1,000 - $1,300',
    isIgnorable: true
  },
  {
    id: 'inv-2',
    fieldName: 'Carrier Name',
    expectedValue: 'Swift Transportation',
    evaluatedValue: 'Swift Transportation',
    isRequired: true,
    isResolved: true,
    isIgnored: false,
    section: 'Scale Ticket'
  },
  {
    id: 'inv-3',
    fieldName: 'Invoice Number',
    expectedValue: 'INV-2024-1234',
    evaluatedValue: 'INV-2024-1235',
    isRequired: true,
    isResolved: false,
    isIgnored: false,
    section: 'Scale Ticket'
  },
  {
    id: 'inv-4',
    fieldName: 'Invoice Date',
    expectedValue: '2024-11-01',
    evaluatedValue: '2024-11-01',
    isRequired: true,
    isResolved: false,
    isIgnored: false,
    section: 'Scale Ticket',
    fieldType: 'date'
  },
  {
    id: 'inv-5',
    fieldName: 'PO Number',
    expectedValue: 'PO-98765',
    evaluatedValue: '',
    isRequired: false,
    isResolved: false,
    isIgnored: false,
    section: 'Scale Ticket',
    isIgnorable: true
  },
  // Bill of Lading fields
  {
    id: 'bol-1',
    fieldName: 'BOL Number',
    expectedValue: 'BOL-2024-5678',
    evaluatedValue: 'BOL-2024-5678',
    isRequired: true,
    isResolved: false,
    isIgnored: false,
    section: 'Bill of Lading'
  },
  {
    id: 'bol-2',
    fieldName: 'Shipper',
    expectedValue: 'ABC Logistics Inc',
    evaluatedValue: 'ABC Logistic Inc',
    isRequired: true,
    isResolved: false,
    isIgnored: false,
    section: 'Bill of Lading',
    isIgnorable: true
  },
  {
    id: 'bol-3',
    fieldName: 'Consignee',
    expectedValue: 'XYZ Warehouse',
    evaluatedValue: 'XYZ Warehouse',
    isRequired: true,
    isResolved: false,
    isIgnored: false,
    section: 'Bill of Lading'
  },
  {
    id: 'bol-4',
    fieldName: 'Weight (lbs)',
    expectedValue: '45,000',
    evaluatedValue: '45,000',
    isRequired: true,
    isResolved: false,
    isIgnored: false,
    section: 'Bill of Lading'
  },
  // Proof of Delivery fields
  {
    id: 'pod-1',
    fieldName: 'Delivery Date',
    expectedValue: '2024-11-03',
    evaluatedValue: '2024-11-03',
    isRequired: true,
    isResolved: false,
    isIgnored: false,
    section: 'Proof of Delivery',
    fieldType: 'date'
  },
  {
    id: 'pod-2',
    fieldName: 'Receiver Name',
    expectedValue: 'John Smith',
    evaluatedValue: '',
    isRequired: true,
    isResolved: false,
    isIgnored: false,
    section: 'Proof of Delivery'
  },
  {
    id: 'pod-3',
    fieldName: 'Signature Status',
    expectedValue: 'Signed',
    evaluatedValue: 'Signed',
    isRequired: true,
    isResolved: false,
    isIgnored: false,
    section: 'Proof of Delivery'
  },
  {
    id: 'pod-4',
    fieldName: 'Delivery Time',
    expectedValue: '2024-11-03 14:30:00',
    evaluatedValue: '2024-11-03 14:30:00',
    isRequired: false,
    isResolved: false,
    isIgnored: false,
    section: 'Proof of Delivery',
    fieldType: 'datetime'
  },
  // Driver Log fields
  {
    id: 'log-1',
    fieldName: 'Driver Name',
    expectedValue: 'Michael Johnson',
    evaluatedValue: 'Michael Johnson',
    isRequired: true,
    isResolved: false,
    isIgnored: false,
    section: 'Driver Log'
  },
  {
    id: 'log-2',
    fieldName: 'Vehicle ID',
    expectedValue: 'TRK-4567',
    evaluatedValue: '',
    isRequired: true,
    isResolved: false,
    isIgnored: false,
    section: 'Driver Log'
  },
  {
    id: 'log-3',
    fieldName: 'Start Odometer',
    expectedValue: '123,456',
    evaluatedValue: '123456',
    isRequired: true,
    isResolved: false,
    isIgnored: false,
    section: 'Driver Log'
  },
  {
    id: 'log-4',
    fieldName: 'End Odometer',
    expectedValue: '123,789',
    evaluatedValue: '123789',
    isRequired: true,
    isResolved: false,
    isIgnored: false,
    section: 'Driver Log'
  }
];

export default function App() {
  const [showLibrary, setShowLibrary] = useState(false);
  const [validationData, setValidationData] = useState<ValidationField[]>(initialValidationData);
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);
  const [missingDocuments, setMissingDocuments] = useState<MissingDocument[]>(initialMissingDocuments);
  const [hasChanges, setHasChanges] = useState(false);
  const [selectedSections, setSelectedSections] = useState<Set<string>>(new Set());
  const [selectedDocumentId, setSelectedDocumentId] = useState<string>(''); // No document selected initially
  const [activeTab, setActiveTab] = useState<string>('exceptions'); // Track active tab for filtering
  const [leftPanelWidth, setLeftPanelWidth] = useState(484);
  const [approvedDocuments, setApprovedDocuments] = useState<ApprovedDocument[]>([
    {
      section: 'Scale Ticket',
      approvedAt: new Date('2024-11-04T10:30:00'),
      pageCount: 2,
      fields: [
        {
          id: 'inv-1',
          fieldName: 'Invoice Number',
          expectedValue: 'INV-2024-1234',
          evaluatedValue: 'INV-2024-1234',
          isRequired: true,
          isResolved: true,
          isIgnored: false,
          section: 'Scale Ticket',
          wasOverridden: true  // Arrow button was used to copy expected to evaluated
        },
        {
          id: 'inv-2',
          fieldName: 'Total Amount',
          expectedValue: '$1,250.00',
          evaluatedValue: '$1,248.50',
          isRequired: true,
          isResolved: true,
          isIgnored: false,
          section: 'Scale Ticket',
          wasManuallyEdited: true  // User manually corrected this value
        },
        {
          id: 'inv-3',
          fieldName: 'Due Date',
          expectedValue: '2024-11-15',
          evaluatedValue: '2024-11-15',
          isRequired: false,
          isResolved: true,
          isIgnored: false,
          section: 'Scale Ticket',
          fieldType: 'date'
        },
        {
          id: 'inv-4',
          fieldName: 'PO Number',
          expectedValue: 'PO-98765',
          evaluatedValue: '',
          isRequired: false,
          isResolved: false,
          isIgnored: true,  // This field was ignored
          section: 'Scale Ticket',
          isIgnorable: true
        }
      ]
    }
  ]);

  const handleFieldUpdate = (id: string, updates: Partial<ValidationField>) => {
    setValidationData(prev => 
      prev.map(field => 
        field.id === id ? { ...field, ...updates } : field
      )
    );
    setHasChanges(true);
  };

  const handleRevertChanges = () => {
    // Revert validation data
    setValidationData(initialValidationData);
    
    // Revert document classifications
    setDocuments(initialDocuments);
    
    // Revert missing documents to initial state (clear pending removal flags)
    setMissingDocuments(initialMissingDocuments);
    
    setHasChanges(false);
    toast.info('Changes reverted');
  };

  const handleSave = () => {
    // Remove any missing documents marked as pending removal
    setMissingDocuments(prev => 
      prev.filter(doc => !doc.isPendingRemoval)
    );
    
    // Persist changes - in a real app, this would save to backend
    setHasChanges(false);
    toast.success('Changes saved successfully');
  };

  const getDocumentPageCount = (section: string): number => {
    const pageCountMap: Record<string, number> = {
      'Invoice': 2,
      'Bill of Lading': 3,
      'Proof of Delivery': 5,
      'Fuel Receipt': 1,
      'Driver Log': 3,
      'Toll Receipt': 1,
      'Permit Copy': 2,
    };
    return pageCountMap[section] || 1;
  };

  const handleApprove = () => {
    if (selectedSections.size === 0) return;

    // Create approved documents from selected sections
    const newApprovedDocs: ApprovedDocument[] = Array.from(selectedSections).map(section => {
      const sectionFields = validationData.filter(field => field.section === section);
      return {
        section,
        approvedAt: new Date(),
        fields: sectionFields, // Can be empty for documents with no fields
        pageCount: getDocumentPageCount(section)
      };
    });

    // Add to approved documents
    setApprovedDocuments(prev => [...prev, ...newApprovedDocs]);
    
    // Update document status to 'approved' in the documents state
    setDocuments(prev => 
      prev.map(doc => {
        // Map document type to section name
        const isApproved = selectedSections.has(doc.type);
        return isApproved ? { ...doc, status: 'approved' as DocumentStatus } : doc;
      })
    );

    // Remove approved fields from validation data
    setValidationData(prev => 
      prev.filter(field => !selectedSections.has(field.section))
    );

    // Auto-select next available document
    const approvedSectionNames = [...approvedDocuments.map(doc => doc.section), ...Array.from(selectedSections)];
    const remainingSections = [...new Set(validationData.map(field => field.section))]
      .filter(section => !selectedSections.has(section));
    
    if (remainingSections.length > 0) {
      setSelectedDocumentId(remainingSections[0]);
    }

    // Clear selected sections
    setSelectedSections(new Set());
    setHasChanges(false);
  };

  const handleDocumentClassification = (documentId: string, newType: DocumentType) => {
    console.log('=== DOCUMENT CLASSIFICATION ACTION ===');
    console.log('Document ID:', documentId);
    console.log('New Type:', newType);
    console.log('Current documents state BEFORE update:', JSON.parse(JSON.stringify(documents)));
    
    setDocuments(prev => {
      const updated = prev.map(doc => 
        doc.id === documentId ? { ...doc, type: newType } : doc
      );
      console.log('Updated documents state AFTER update:', JSON.parse(JSON.stringify(updated)));
      console.log('Unclassified documents AFTER update:', updated.filter(d => d.type === 'Unclassified'));
      return updated;
    });
    
    // Mark as having unsaved changes
    setHasChanges(true);
    
    // Check if this clears a missing document exception
    const hasMissingDoc = missingDocuments.some(
      doc => doc.name === newType && !doc.isIgnored
    );
    
    console.log('Has missing document for this type:', hasMissingDoc);
    
    if (hasMissingDoc) {
      // Mark the missing document as resolved (but don't remove yet - wait for save)
      setMissingDocuments(prev => 
        prev.map(doc => 
          doc.name === newType 
            ? { ...doc, isPendingRemoval: true } 
            : doc
        )
      );
      console.log('Marked missing document as pending removal');
    }
    
    // Add validation fields for the newly classified document type
    const addValidationFieldsForType = (type: DocumentType) => {
      // Check if validation fields already exist for this section
      const hasExistingFields = validationData.some(field => field.section === type);
      console.log('Has existing validation fields for', type, ':', hasExistingFields);
      
      if (hasExistingFields) {
        toast.info(`${type} classified successfully.`);
        return;
      }

      // Define validation fields for each document type
      const fieldsByType: Record<string, ValidationField[]> = {
        'Fuel Receipt': [
          {
            id: `fuel-${Date.now()}-1`,
            fieldName: 'Fuel Amount',
            expectedValue: '$245.00',
            evaluatedValue: '',
            isRequired: true,
            isResolved: false,
            isIgnored: false,
            section: 'Fuel Receipt'
          },
          {
            id: `fuel-${Date.now()}-2`,
            fieldName: 'Gallons',
            expectedValue: '95.5',
            evaluatedValue: '95.5',
            isRequired: false,
            isResolved: false,
            isIgnored: false,
            section: 'Fuel Receipt',
            isIgnorable: true
          },
          {
            id: `fuel-${Date.now()}-3`,
            fieldName: 'Station Location',
            expectedValue: 'Pilot Travel Center #456',
            evaluatedValue: 'Pilot TC 456',
            isRequired: false,
            isResolved: false,
            isIgnored: false,
            section: 'Fuel Receipt',
            isIgnorable: true
          }
        ],
        'Lumper': [
          {
            id: `lumper-${Date.now()}-1`,
            fieldName: 'Lumper Fee',
            expectedValue: '$150.00',
            evaluatedValue: '',
            isRequired: true,
            isResolved: false,
            isIgnored: false,
            section: 'Lumper'
          }
        ],
        'Toll Receipt': [
          {
            id: `toll-${Date.now()}-1`,
            fieldName: 'Toll Amount',
            expectedValue: '$25.00',
            evaluatedValue: '',
            isRequired: true,
            isResolved: false,
            isIgnored: false,
            section: 'Toll Receipt'
          }
        ],
        'Permit Copy': [
          {
            id: `permit-${Date.now()}-1`,
            fieldName: 'Permit Number',
            expectedValue: 'PER-2024-5678',
            evaluatedValue: '',
            isRequired: true,
            isResolved: false,
            isIgnored: false,
            section: 'Permit Copy'
          }
        ]
      };

      const newFields = fieldsByType[type];
      console.log('Adding new validation fields for', type, ':', newFields);
      
      if (newFields) {
        setValidationData(prev => {
          const updated = [...prev, ...newFields];
          console.log('Updated validation data:', updated);
          return updated;
        });
        if (hasMissingDoc) {
          toast.info(`${type} classified. Save changes to clear missing document exception.`);
        } else {
          toast.success(`${type} classified successfully.`);
        }
      } else {
        toast.success(`${type} classified successfully.`);
      }
    };
    
    // Add fields for the newly classified type
    if (newType !== 'Unclassified') {
      addValidationFieldsForType(newType);
    }
    
    // Auto-select the newly classified document
    if (newType !== 'Unclassified') {
      console.log('Auto-selecting document:', newType);
      setSelectedDocumentId(newType);
    }
    
    console.log('=== END CLASSIFICATION ACTION ===\n');
  };

  const handleToggleMissingDocIgnore = (documentId: string) => {
    setMissingDocuments(prev =>
      prev.map(doc =>
        doc.id === documentId ? { ...doc, isIgnored: !doc.isIgnored } : doc
      )
    );
  };

  const handleDocumentReject = (documentId: string, reason: string) => {
    console.log('=== DOCUMENT REJECTION ACTION ===');
    console.log('Document ID:', documentId);
    console.log('Reason:', reason);
    
    // Update document status to 'rejected'
    setDocuments(prev =>
      prev.map(doc =>
        doc.id === documentId ? { ...doc, status: 'rejected' as DocumentStatus } : doc
      )
    );
    
    // Remove validation fields for this document if any exist
    const docToReject = documents.find(doc => doc.id === documentId);
    if (docToReject) {
      setValidationData(prev =>
        prev.filter(field => field.section !== docToReject.type)
      );
    }
    
    setHasChanges(true);
    toast.success(`Document rejected: ${reason}`);
    
    console.log('=== END REJECTION ACTION ===\n');
  };

  const parseRangeFromAdditionalInfo = (additionalInfo: string) => {
    if (!additionalInfo) return null;
    const rangeMatch = additionalInfo.match(/Range:\s*\$?([\d,]+)\s*-\s*\$?([\d,]+)/i);
    if (rangeMatch) {
      const min = parseFloat(rangeMatch[1].replace(/,/g, ''));
      const max = parseFloat(rangeMatch[2].replace(/,/g, ''));
      return { min, max };
    }
    return null;
  };

  const isValueInRange = (value: string, range: { min: number; max: number } | null) => {
    if (!range || !value) return false;
    const numericValue = parseFloat(value.replace(/[$,]/g, ''));
    if (isNaN(numericValue)) return false;
    return numericValue >= range.min && numericValue <= range.max;
  };

  // Filter out validation data for sections that have been approved
  const approvedSectionNames = approvedDocuments.map(doc => doc.section);
  const unapprovedValidationData = validationData.filter(
    field => !approvedSectionNames.includes(field.section)
  );

  // Ensure selectedDocumentId is always valid - only reset if current selection becomes invalid
  useEffect(() => {
    // Don't auto-select on initial load (when selectedDocumentId is empty)
    if (selectedDocumentId === '') return;
    
    const availableSections = [...new Set(unapprovedValidationData.map(field => field.section))];
    const documentsWithNoFields = ['Toll Receipt', 'Permit Copy'];
    const unclassifiedDocIds = documents.filter(doc => doc.type === 'Unclassified').map(doc => doc.id);
    const missingDocIds = missingDocuments.map(doc => doc.id);
    const allAvailableSections = [
      ...availableSections, 
      ...documentsWithNoFields.filter(doc => !approvedSectionNames.includes(doc)),
      ...unclassifiedDocIds,
      ...missingDocIds,
      ...approvedSectionNames // Add approved sections as valid selections
    ];
    
    // Only reset if current selection is invalid (not in the list of available sections)
    if (!allAvailableSections.includes(selectedDocumentId)) {
      // Find first available section, or leave empty if none
      if (allAvailableSections.length > 0) {
        setSelectedDocumentId(allAvailableSections[0]);
      }
    }
  }, [unapprovedValidationData, approvedSectionNames, selectedDocumentId, documents, missingDocuments]);

  return (
    <LibraryContext.Provider value={{ showLibrary, setShowLibrary }}>
      <Toaster 
        position="top-right" 
        richColors 
        expand={false}
        duration={3000}
      />
      {showLibrary ? (
        <ComponentLibrary />
      ) : (
        <div className="flex flex-col h-screen w-full overflow-hidden">
          <Background />
          <div className="absolute top-[118px] left-0 right-0 bottom-0 flex gap-[13px] px-[13px] pb-[13px] max-w-full overflow-hidden">
            <Resizable
              size={{ width: leftPanelWidth, height: '100%' }}
              onResizeStop={(e, direction, ref, d) => {
                setLeftPanelWidth(leftPanelWidth + d.width);
              }}
              minWidth={300}
              maxWidth={800}
              enable={{
                top: false,
                right: true,
                bottom: false,
                left: false,
                topRight: false,
                bottomRight: false,
                bottomLeft: false,
                topLeft: false
              }}
              handleStyles={{
                right: {
                  width: '13px',
                  right: '-6.5px',
                  cursor: 'col-resize',
                  zIndex: 10
                }
              }}
              handleComponent={{
                right: (
                  <div className="w-[13px] h-full flex items-center justify-center group">
                    <div className="w-[3px] h-full bg-transparent group-hover:bg-[#3b82f6] transition-colors rounded-full" />
                  </div>
                )
              }}
            >
              <ValadationSection 
                validationData={unapprovedValidationData}
                onFieldUpdate={handleFieldUpdate}
                onApprove={handleApprove}
                parseRangeFromAdditionalInfo={parseRangeFromAdditionalInfo}
                isValueInRange={isValueInRange}
                hasChanges={hasChanges}
                onRevertChanges={handleRevertChanges}
                onSave={handleSave}
                documents={documents}
                onDocumentClassification={handleDocumentClassification}
                selectedSections={selectedSections}
                onSelectedSectionsChange={setSelectedSections}
                approvedDocuments={approvedDocuments}
                missingDocuments={missingDocuments}
                onToggleMissingDocIgnore={handleToggleMissingDocIgnore}
                selectedDocumentId={selectedDocumentId}
                onDocumentSelect={setSelectedDocumentId}
                onActiveTabChange={setActiveTab}
                onDocumentReject={handleDocumentReject}
              />
            </Resizable>
            <div className="flex-1 min-w-0 max-w-full overflow-hidden">
              <DocumentViewerWithToolbar 
                selectedDocumentId={selectedDocumentId}
                onDocumentSelect={setSelectedDocumentId}
                unclassifiedDocuments={documents.filter(doc => doc.type === 'Unclassified')}
                missingDocuments={missingDocuments}
                allDocuments={documents}
                approvedDocuments={approvedDocuments}
                onDocumentClassification={handleDocumentClassification}
                onDocumentReject={handleDocumentReject}
                activeTab={activeTab}
              />
            </div>
          </div>
          <MessageCenterFab />
          <OnboardingTour />
        </div>
      )}
    </LibraryContext.Provider>
  );
}