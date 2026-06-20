import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ValidationGrid, { ValidationField } from './ValidationGrid';
import MissingDocumentsContainer, { MissingDocument } from './MissingDocumentsContainer';
import { Document, DocumentType } from '../App';
import svgPaths from '../imports/svg-yp1i5y3a7m';
import type { DocumentHold, HoldReason, ManualHoldEntry } from '../types/documentHolds';

interface ConsolidatedExceptionsViewProps {
  // Field Exceptions
  validationData: ValidationField[];
  onFieldUpdate: (id: string, updates: Partial<ValidationField>) => void;
  onApprove: () => void;
  parseRangeFromAdditionalInfo: (additionalInfo: string) => { min: number; max: number } | null;
  isValueInRange: (value: string, range: { min: number; max: number } | null) => boolean;
  selectedSections: Set<string>;
  onSelectedSectionsChange: (sections: Set<string>) => void;
  approvedDocuments: any[];
  selectedDocumentId: string;
  onDocumentSelect: (documentId: string) => void;

  // Missing Documents
  missingDocuments: MissingDocument[];
  onToggleMissingDocIgnore: (documentId: string) => void;

  // Unclassified Documents
  documents: Document[];
  onDocumentClassification: (documentId: string, newType: DocumentType) => void;

  // Document Holds
  holdReasons?: HoldReason[];
  getActiveHolds?: (section: string) => DocumentHold[];
  getRemovedHolds?: (section: string) => DocumentHold[];
  hasActiveHolds?: (section: string) => boolean;
  getHoldIndicatorVariant?: (section: string) => 'none' | 'overridable' | 'locked';
  canOverrideHold?: (section: string) => boolean;
  getReasonLabel?: (reasonId: string) => string;
  onPlaceManualHolds?: (section: string, entries: ManualHoldEntry[]) => void;
  onOverrideHolds?: (section: string, holdIds: string[]) => void;
}

// Icon Components
function FieldExceptionIcon() {
  return (
    <div className="h-[13px] relative shrink-0 w-[12px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g>
          <path d={svgPaths.p2cf56c00} fill="var(--fill-0, #FF5C00)" />
          <path d={svgPaths.p30c9700} fill="var(--fill-0, #FF5C00)" />
          <path d={svgPaths.p37ed0900} fill="var(--fill-0, #FF5C00)" />
          <path d={svgPaths.pb9a1d80} fill="var(--fill-0, #FF5C00)" />
          <path clipRule="evenodd" d={svgPaths.p305b4e00} fill="var(--fill-0, #FF5C00)" fillRule="evenodd" />
          <path clipRule="evenodd" d={svgPaths.pfe41d00} fill="var(--fill-0, #FF5C00)" fillRule="evenodd" />
          <path clipRule="evenodd" d={svgPaths.p16219cc0} fill="var(--fill-0, #FF5C00)" fillRule="evenodd" />
        </g>
      </svg>
    </div>
  );
}

function MissingDocIcon() {
  return (
    <div className="h-[13px] relative shrink-0 w-[10px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 16">
        <g>
          <path d={svgPaths.p372a2070} fill="var(--fill-0, #DA1F2C)" />
          <path d={svgPaths.p1a044400} fill="var(--fill-0, #DA1F2C)" />
          <path clipRule="evenodd" d={svgPaths.p1e33da00} fill="var(--fill-0, #DA1F2C)" fillRule="evenodd" />
        </g>
      </svg>
    </div>
  );
}

function UnclassifiedIcon() {
  return (
    <div className="h-[13px] relative shrink-0 w-[10px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 16">
        <g>
          <path d={svgPaths.p1dbc9480} fill="var(--fill-0, #9747FF)" />
          <path d={svgPaths.p2f9aca00} fill="var(--fill-0, #9747FF)" />
          <path d={svgPaths.p3f26300} fill="var(--fill-0, #9747FF)" />
          <path d={svgPaths.p1553b740} fill="var(--fill-0, #9747FF)" />
          <path d={svgPaths.p3a8f5000} fill="var(--fill-0, #9747FF)" />
        </g>
      </svg>
    </div>
  );
}

interface SectionHeaderProps {
  icon: React.ReactNode;
  title: string;
  count: number;
  isExpanded: boolean;
  onToggle: () => void;
  accentColor: string;
}

function SectionHeader({ icon, title, count, isExpanded, onToggle, accentColor }: SectionHeaderProps) {
  return (
    <button
      onClick={onToggle}
      className="w-full flex items-center gap-[12px] px-[16px] py-[14px] bg-white hover:bg-[#fafafa] transition-colors border-b border-[#e5e7eb] group"
    >
      {/* Chevron */}
      <motion.div
        animate={{ rotate: isExpanded ? 90 : 0 }}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        className="shrink-0"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 4L10 8L6 12" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>

      {/* Icon */}
      <div className="shrink-0">
        {icon}
      </div>

      {/* Title */}
      <div className="flex-1 text-left font-['Roboto:SemiBold',sans-serif] font-semibold text-[14px] text-[#1f2937]" style={{ fontVariationSettings: "'wdth' 100" }}>
        {title}
      </div>

      {/* Count Badge */}
      <div 
        className="shrink-0 min-w-[24px] h-[24px] rounded-full flex items-center justify-center px-[8px] font-['Roboto:Bold',sans-serif] font-bold text-[12px]"
        style={{ 
          backgroundColor: `${accentColor}15`,
          color: accentColor,
          fontVariationSettings: "'wdth' 100"
        }}
      >
        {count}
      </div>
    </button>
  );
}

// Unclassified Documents Component (inline for simplicity)
interface UnclassifiedProps {
  documents: Document[];
  onDocumentClassification: (documentId: string, newType: DocumentType) => void;
  selectedDocumentId: string;
  onDocumentSelect: (documentId: string) => void;
}

function Unclassified({ documents, onDocumentClassification, selectedDocumentId, onDocumentSelect }: UnclassifiedProps) {
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number; showAbove: boolean } | null>(null);

  const unclassifiedDocs = documents.filter(doc => doc.type === 'Unclassified');

  const documentTypes: DocumentType[] = [
    'Invoice',
    'Bill of Lading',
    'Proof of Delivery',
    'Fuel Receipt',
    'Driver Log'
  ];

  const handleTypeSelect = (docId: string, newType: DocumentType, isNewDocument: boolean) => {
    onDocumentClassification(docId, newType);
    setOpenDropdownId(null);
    setDropdownPosition(null);
    
    // You can add additional logic here if needed to differentiate between
    // assigning to existing vs creating new document
    if (isNewDocument) {
      console.log(`Creating new ${newType} document`);
    } else {
      console.log(`Assigning to existing ${newType} document`);
    }
  };

  const handleDropdownToggle = (e: React.MouseEvent, docId: string, isOpen: boolean) => {
    e.stopPropagation();
    if (isOpen) {
      setOpenDropdownId(null);
      setDropdownPosition(null);
    } else {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const spaceBelow = viewportHeight - rect.bottom;
      const spaceAbove = rect.top;
      const menuHeight = 500; // Approximate max height of dropdown
      
      // Determine if we should show above or below
      const showAbove = spaceBelow < menuHeight && spaceAbove > spaceBelow;
      
      setDropdownPosition({
        top: showAbove ? rect.top : rect.bottom + 4,
        left: rect.right,
        showAbove
      });
      setOpenDropdownId(docId);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-[4px] w-full pt-[8px] pr-[16px] pb-[0px] pl-[16px] bg-[rgba(208,0,0,0)]">
        {unclassifiedDocs.map((doc, index) => {
          const isSelected = selectedDocumentId === doc.id;
          const isDropdownOpen = openDropdownId === doc.id;
          const displayName = `Unclassified #${index + 1}`;
          
          return (
            <div 
              key={doc.id}
              className="relative w-full"
            >
              <div 
                className={`relative rounded-[4px] w-full transition-colors cursor-pointer ${
                  isSelected ? 'bg-[#e1f2fb]' : 'bg-white hover:bg-[#f7f8f9]'
                }`}
                onClick={() => onDocumentSelect(doc.id)}
              >
                <div 
                  aria-hidden="true" 
                  className={`absolute border border-solid inset-0 pointer-events-none rounded-[4px] ${
                    isSelected ? 'border-[#72cdf4]' : 'border-[#eff2f4]'
                  }`} 
                />
                {isSelected && (
                  <div 
                    aria-hidden="true" 
                    className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#72cdf4] rounded-tl-[4px] rounded-bl-[4px]"
                  />
                )}
                <div className="flex flex-row items-center w-full">
                  <div className="box-border content-stretch flex gap-[8px] h-[44px] items-center pl-0 pr-[16px] py-0 relative w-full">
                    <div className="basis-0 grow h-[38px] min-h-px min-w-px relative shrink-0">
                      <div className="flex flex-row items-center size-full">
                        <div className="box-border content-stretch flex gap-[10px] h-[38px] items-center pl-[16px] pr-[10px] py-[10px] relative w-full">
                          <UnclassifiedIcon />
                          <div className="flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3d3d3d] text-[16px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[normal] whitespace-pre">{displayName}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="relative shrink-0">
                      <button
                        onClick={(e) => handleDropdownToggle(e, doc.id, isDropdownOpen)}
                        className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[4px] shrink-0 h-[28px] px-[8px] hover:bg-[#f7f8f9] transition-colors"
                      >
                        <div aria-hidden="true" className="absolute border border-[#8d9aae] border-solid inset-0 pointer-events-none rounded-[4px]" />
                        <div className="flex flex-row items-center gap-[6px] h-full">
                          <div className="flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3d3d3d] text-[12px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[normal]">Change Type</p>
                          </div>
                          <ChevronDown className="h-[12px] w-[12px] text-[#8d9aae]" />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Render dropdown with fixed positioning outside the main container */}
      {openDropdownId && dropdownPosition && (
        <>
          <div 
            className="fixed inset-0 z-[100]"
            onClick={() => {
              setOpenDropdownId(null);
              setDropdownPosition(null);
            }}
          />
          <div 
            className="fixed bg-white rounded-[6px] shadow-[0_4px_16px_rgba(0,0,0,0.15)] border border-[#e2e6eb] min-w-[220px] max-w-[280px] z-[101] overflow-hidden max-h-[240px] flex flex-col"
            style={{
              top: dropdownPosition.showAbove ? 'auto' : `${dropdownPosition.top}px`,
              bottom: dropdownPosition.showAbove ? `${window.innerHeight - dropdownPosition.top + 4}px` : 'auto',
              left: `${dropdownPosition.left}px`,
              transform: 'translateX(-100%)'
            }}
          >
            {/* Single Scrollable Container */}
            <div className="overflow-y-auto custom-scrollbar">
              {/* Existing Documents Header */}
              <div className="px-[16px] py-[10px] border-b border-[#eff2f4] bg-[#f7f9fb]">
                <div className="font-['Roboto:SemiBold',sans-serif] font-semibold text-[12px] text-[#5a636f] uppercase tracking-wide" style={{ fontVariationSettings: "'wdth' 100" }}>
                  Existing Documents
                </div>
              </div>
              
              {/* Existing Document Type List */}
              <div className="py-[4px]">
                {documentTypes.map((type) => (
                  <button
                    key={type}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTypeSelect(openDropdownId, type, false);
                    }}
                    className="w-full px-[16px] py-[10px] text-left hover:bg-[#e6f3ff] transition-colors font-['Roboto:Regular',sans-serif] text-[14px] text-[#3d3d3d] flex items-center"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    {type}
                  </button>
                ))}
              </div>
              
              {/* Divider */}
              <div className="h-[1px] bg-[#eff2f4] mx-[8px]" />
              
              {/* New Document Header */}
              <div className="px-[16px] py-[10px] border-b border-[#eff2f4] bg-[#f7f9fb]">
                <div className="font-['Roboto:SemiBold',sans-serif] font-semibold text-[12px] text-[#5a636f] uppercase tracking-wide" style={{ fontVariationSettings: "'wdth' 100" }}>
                  New Document
                </div>
              </div>
              
              {/* New Document Type List */}
              <div className="py-[4px]">
                {documentTypes.map((type) => (
                  <button
                    key={`new-${type}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTypeSelect(openDropdownId, type, true);
                    }}
                    className="w-full px-[16px] py-[10px] text-left hover:bg-[#e6f3ff] transition-colors font-['Roboto:Regular',sans-serif] text-[14px] text-[#3d3d3d] flex items-center"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default function ConsolidatedExceptionsView(props: ConsolidatedExceptionsViewProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['field-exceptions'])
  );

  const unclassifiedDocs = props.documents.filter(doc => doc.type === 'Unclassified');
  const fieldExceptionCount = props.validationData.filter(field =>
    !field.isResolved &&
    !field.isIgnored &&
    field.expectedValue !== field.evaluatedValue
  ).length;
  const missingCount = props.missingDocuments.filter(doc => !doc.isIgnored && !doc.isPendingRemoval).length;
  const missingTotalCount = props.missingDocuments.filter(doc => !doc.isPendingRemoval).length;
  const unclassifiedCount = unclassifiedDocs.length;

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

  return (
    <div className="flex flex-col gap-[8px] w-full">
      {/* Unclassified Documents Section */}
      {unclassifiedCount > 0 && (
        <div className="flex flex-col w-full" data-tour="unclassified">
          <SectionHeader
            icon={<UnclassifiedIcon />}
            title="Unclassified Documents"
            count={unclassifiedCount}
            isExpanded={expandedSections.has('unclassified')}
            onToggle={() => toggleSection('unclassified')}
            accentColor="#9747FF"
          />
          <AnimatePresence initial={false}>
            {expandedSections.has('unclassified') && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                className="w-full overflow-hidden"
              >
                <div className="pt-[8px] bg-[rgba(205,37,37,0)]">
                  <Unclassified
                    documents={props.documents}
                    onDocumentClassification={props.onDocumentClassification}
                    selectedDocumentId={props.selectedDocumentId}
                    onDocumentSelect={props.onDocumentSelect}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Missing Documents Section */}
      {missingTotalCount > 0 && (
        <div className="flex flex-col w-full" data-tour="missing">
          <SectionHeader
            icon={<MissingDocIcon />}
            title="Missing Documents"
            count={missingCount}
            isExpanded={expandedSections.has('missing')}
            onToggle={() => toggleSection('missing')}
            accentColor="#DA1F2C"
          />
          <AnimatePresence initial={false}>
            {expandedSections.has('missing') && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                className="w-full overflow-hidden"
              >
                <div className="pt-[8px]">
                  <MissingDocumentsContainer
                    missingDocuments={props.missingDocuments.filter(doc => !doc.isPendingRemoval)}
                    onToggleIgnore={props.onToggleMissingDocIgnore}
                    selectedDocumentId={props.selectedDocumentId}
                    onDocumentSelect={props.onDocumentSelect}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Field Exceptions Section */}
      {fieldExceptionCount > 0 && (
        <div className="flex flex-col w-full" data-tour="field-exceptions">
          <SectionHeader
            icon={<FieldExceptionIcon />}
            title="Field Exceptions"
            count={fieldExceptionCount}
            isExpanded={expandedSections.has('field-exceptions')}
            onToggle={() => toggleSection('field-exceptions')}
            accentColor="#FF5C00"
          />
          {expandedSections.has('field-exceptions') && (
            <>
              {/* Sticky Column Headers - Outside animation wrapper */}
              <div className="sticky top-0 z-20 bg-white pt-[8px]">
                <div className="content-stretch flex flex-col gap-[10px] h-[40px] items-start shrink-0 w-full border-b border-[#eff2f4]">
                  <div className="box-border content-stretch flex h-[40px] isolate items-center pl-0 pr-px py-0 relative shrink-0 w-full">
                    {/* Empty spacing to match row structure */}
                    <div className="box-border content-stretch flex gap-[10px] h-full items-center justify-center px-0 py-[10px] shrink-0 w-[40px]" />
                    
                    {/* Fields Column */}
                    <div className="bg-white box-border content-stretch flex gap-[10px] h-full items-center mr-[-1px] pl-0 pr-[10px] py-[4px] relative shrink-0 w-[121px] z-[5]">
                      <div aria-hidden="true" className="absolute border-[#eff2f4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
                      <div className="flex flex-col font-['Roboto:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#123b60] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                        <p className="leading-[normal] whitespace-pre">Fields </p>
                      </div>
                    </div>
                    
                    {/* Expected Column */}
                    <div className="basis-0 bg-white grow h-full min-h-px min-w-px mr-[-1px] relative shrink-0 z-[4]">
                      <div aria-hidden="true" className="absolute border-[#eff2f4] border-[0px_1px_0px] border-solid inset-0 pointer-events-none" />
                      <div className="flex flex-row items-center size-full">
                        <div className="box-border content-stretch flex gap-[19px] items-center px-[8px] py-[4px] relative w-full">
                          <div className="flex flex-col font-['Roboto:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#123b60] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[normal] whitespace-pre">Expected </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Evaluated Column */}
                    <div className="basis-0 bg-white grow h-full min-h-px min-w-px mr-[-1px] relative shrink-0 z-[1]">
                      <div aria-hidden="true" className="absolute border-[#eff2f4] border-[0px_0px_0px_1px] border-solid inset-0 pointer-events-none" />
                      <div className="flex flex-row items-center size-full">
                        <div className="box-border content-stretch flex gap-[19px] items-center px-[8px] py-[4px] relative w-full">
                          <div className="flex flex-col font-['Roboto:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#123b60] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[normal] whitespace-pre">Evaluated </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Animated Content */}
              <AnimatePresence initial={false}>
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                  className="w-full overflow-hidden"
                >
                  <ValidationGrid
                    data={props.validationData}
                    onFieldUpdate={props.onFieldUpdate}
                    onApprove={props.onApprove}
                    parseRangeFromAdditionalInfo={props.parseRangeFromAdditionalInfo}
                    isValueInRange={props.isValueInRange}
                    selectedSections={props.selectedSections}
                    onSelectedSectionsChange={props.onSelectedSectionsChange}
                    approvedDocuments={props.approvedDocuments}
                    selectedDocumentId={props.selectedDocumentId}
                    onDocumentSelect={props.onDocumentSelect}
                    isEmbedded={true}
                    holdReasons={props.holdReasons}
                    getActiveHolds={props.getActiveHolds}
                    getRemovedHolds={props.getRemovedHolds}
                    hasActiveHolds={props.hasActiveHolds}
                    getHoldIndicatorVariant={props.getHoldIndicatorVariant}
                    canOverrideHold={props.canOverrideHold}
                    getReasonLabel={props.getReasonLabel}
                    onPlaceManualHolds={props.onPlaceManualHolds}
                    onOverrideHolds={props.onOverrideHolds}
                  />
                </motion.div>
              </AnimatePresence>
            </>
          )}
        </div>
      )}

      {/* Empty State */}
      {fieldExceptionCount === 0 && missingCount === 0 && unclassifiedCount === 0 && (
        <div className="flex flex-col items-center justify-center w-full p-8 text-[#8d9aae] text-[13px] gap-[8px]">
          <div className="h-[32px] w-[32px] rounded-full bg-[#00bf30]/10 flex items-center justify-center">
            <svg className="h-5 w-5 text-[#00bf30]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p>All exceptions resolved!</p>
        </div>
      )}
    </div>
  );
}