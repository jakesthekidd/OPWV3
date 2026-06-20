import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import svgPaths from '../imports/svg-2jag0y0jhh';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar as CalendarComponent } from './ui/calendar';
import { format } from 'date-fns';
import { MoreVertical, File, CheckCircle2, AlertTriangle, AlertCircle, ArrowRight, Undo2, Calendar } from 'lucide-react';
import DocumentContextMenu from './DocumentContextMenu';
import DocumentTitle from './DocumentTitle';
import AddDocumentHoldDialog from './holds/AddDocumentHoldDialog';
import OverrideDocumentHoldDialog from './holds/OverrideDocumentHoldDialog';
import OverriddenHoldsDialog from './holds/OverriddenHoldsDialog';
import type { DocumentHold, HoldReason, ManualHoldEntry } from '../types/documentHolds';
import { toast } from 'sonner';

export interface ValidationField {
  id: string;
  fieldName: string;
  expectedValue: string;
  evaluatedValue: string;
  isRequired: boolean;
  isResolved: boolean;
  isIgnored: boolean;
  section: string;
  additionalInfo?: string;
  fieldType?: 'text' | 'date' | 'datetime' | 'number';
  isIgnorable?: boolean;
  previousValue?: string;
  wasOverridden?: boolean;
  wasManuallyEdited?: boolean;
  modifiedBy?: string; // Track who modified the field
}

interface ApprovedDocument {
  section: string;
  approvedAt: Date;
  fields: ValidationField[];
  pageCount: number;
}

interface ValidationGridProps {
  data: ValidationField[];
  onFieldUpdate: (id: string, updates: Partial<ValidationField>) => void;
  onApprove: () => void;
  parseRangeFromAdditionalInfo: (additionalInfo: string) => { min: number; max: number } | null;
  isValueInRange: (value: string, range: { min: number; max: number } | null) => boolean;
  selectedSections: Set<string>;
  onSelectedSectionsChange: (sections: Set<string>) => void;
  approvedDocuments?: ApprovedDocument[];
  selectedDocumentId: string;
  onDocumentSelect: (documentId: string) => void;
  isEmbedded?: boolean;
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

type ValidationStatus = 'resolved' | 'match' | 'within-range' | 'error' | 'warning' | 'ignored';

export default function ValidationGrid({
  data,
  onFieldUpdate,
  onApprove,
  parseRangeFromAdditionalInfo,
  isValueInRange,
  selectedSections,
  onSelectedSectionsChange,
  approvedDocuments = [],
  selectedDocumentId,
  onDocumentSelect,
  isEmbedded = false,
  holdReasons = [],
  getActiveHolds = () => [],
  getRemovedHolds = () => [],
  hasActiveHolds = () => false,
  getHoldIndicatorVariant = () => 'none' as const,
  canOverrideHold = () => false,
  getReasonLabel = (id) => id,
  onPlaceManualHolds,
  onOverrideHolds,
}: ValidationGridProps) {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [animatingField, setAnimatingField] = useState<string | null>(null);
  const [animationStage, setAnimationStage] = useState<'arrow' | 'value' | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [openDatePicker, setOpenDatePicker] = useState<string | null>(null);
  const [previousCompletionState, setPreviousCompletionState] = useState<Record<string, boolean>>({});
  const [contextMenu, setContextMenu] = useState<{
    isOpen: boolean;
    position: { x: number; y: number };
    documentId: string;
    documentName: string;
    documentGroup: string;
  }>({
    isOpen: false,
    position: { x: 0, y: 0 },
    documentId: '',
    documentName: '',
    documentGroup: '',
  });

  const [addHoldDialog, setAddHoldDialog] = useState<{ open: boolean; section: string }>({
    open: false,
    section: '',
  });
  const [overrideHoldDialog, setOverrideHoldDialog] = useState<{ open: boolean; section: string }>({
    open: false,
    section: '',
  });
  const [overriddenHoldsDialog, setOverriddenHoldsDialog] = useState<{ open: boolean; section: string }>({
    open: false,
    section: '',
  });

  const getDocumentInfo = (section: string) => {
    const documentData: Record<string, { pageCount: number; isAvailable: boolean; hasFields: boolean; exceptionCount: number }> = {
      'Invoice': { pageCount: 2, isAvailable: true, hasFields: true, exceptionCount: 1 },
      'Bill of Lading': { pageCount: 3, isAvailable: true, hasFields: true, exceptionCount: 2 },
      'Proof of Delivery': { pageCount: 5, isAvailable: true, hasFields: true, exceptionCount: 2 },
      'Fuel Receipt': { pageCount: 1, isAvailable: true, hasFields: true, exceptionCount: 1 },
      'Driver Log': { pageCount: 3, isAvailable: true, hasFields: true, exceptionCount: 2 },
      'Toll Receipt': { pageCount: 1, isAvailable: true, hasFields: false, exceptionCount: 0 },
      'Permit Copy': { pageCount: 2, isAvailable: true, hasFields: false, exceptionCount: 0 },
    };
    
    return documentData[section] || { pageCount: 1, isAvailable: false, hasFields: true, exceptionCount: 0 };
  };

  const getValidationStatus = (field: ValidationField): ValidationStatus => {
    if (field.isResolved) return 'resolved';
    if (field.isIgnored) return 'ignored';
    if (field.expectedValue === field.evaluatedValue && field.evaluatedValue !== '') return 'match';
    
    const range = parseRangeFromAdditionalInfo(field.additionalInfo || '');
    if (range && field.evaluatedValue && isValueInRange(field.evaluatedValue, range)) {
      return 'within-range';
    }
    
    // All fields are now treated as errors (required)
    return 'error';
  };

  const isSectionComplete = (section: string) => {
    const docInfo = getDocumentInfo(section);
    if (!docInfo.hasFields) return true;
    
    const sectionFields = data.filter(field => field.section === section);
    if (sectionFields.length === 0) return false;
    
    return sectionFields.every(field => {
      const status = getValidationStatus(field);
      return status === 'resolved' || status === 'match' || status === 'ignored' || status === 'within-range';
    });
  };

  const handleInputChange = (fieldId: string, value: string) => {
    const field = data.find(f => f.id === fieldId);
    if (!field) return;

    const isMatch = value === field.expectedValue && value !== '';
    onFieldUpdate(fieldId, {
      evaluatedValue: value,
      isResolved: isMatch,
      isIgnored: false,
      wasManuallyEdited: value !== field.expectedValue && value !== '',
      wasOverridden: false
    });
  };

  const handleOverride = async (fieldId: string) => {
    const field = data.find(f => f.id === fieldId);
    if (!field) return;

    setAnimatingField(fieldId);
    setAnimationStage('arrow');
    
    setTimeout(() => {
      setAnimationStage('value');
      
      setTimeout(() => {
        onFieldUpdate(fieldId, {
          evaluatedValue: field.expectedValue,
          isResolved: true,
          isIgnored: false,
          wasOverridden: true,
          wasManuallyEdited: false
        });
        
        setTimeout(() => {
          setAnimatingField(null);
          setAnimationStage(null);
        }, 200);
      }, 100);
    }, 300);
  };

  const handleToggleIgnore = (fieldId: string) => {
    const field = data.find(f => f.id === fieldId);
    if (!field) return;
    
    onFieldUpdate(fieldId, { 
      isIgnored: !field.isIgnored,
      isResolved: false
    });
  };

  const handleIgnoreField = (fieldId: string) => {
    const field = data.find(f => f.id === fieldId);
    if (!field) return;
    
    onFieldUpdate(fieldId, { 
      isIgnored: true,
      previousValue: field.evaluatedValue,
      isResolved: false
    });
  };

  const handleUndoIgnore = (fieldId: string) => {
    const field = data.find(f => f.id === fieldId);
    if (!field) return;
    
    onFieldUpdate(fieldId, { 
      isIgnored: false,
      evaluatedValue: field.previousValue || field.evaluatedValue,
      isResolved: false
    });
  };

  // Ignore All function removed - all fields are now required

  const handleSectionClick = (section: string) => {
    onDocumentSelect(section);
  };

  const sections = [...new Set(data.map(field => field.section))];
  const documentsWithNoFields = ['Toll Receipt', 'Permit Copy'];
  
  // Filter out approved sections
  const approvedSectionNames = approvedDocuments.map(doc => doc.section);
  const unapprovedSections = sections.filter(section => !approvedSectionNames.includes(section));
  const unapprovedNoFieldDocs = documentsWithNoFields.filter(
    doc => !approvedSectionNames.includes(doc) && !sections.includes(doc)
  );
  
  const allSections = [...unapprovedSections, ...unapprovedNoFieldDocs];

  // Auto-check sections when they become complete
  useEffect(() => {
    const newSelectedSections = new Set(selectedSections);
    let hasChanges = false;
    
    allSections.forEach(section => {
      const isComplete = isSectionComplete(section);
      const wasComplete = previousCompletionState[section] || false;
      
      // Auto-check when a section transitions from incomplete to complete
      if (isComplete && !wasComplete && !hasActiveHolds(section)) {
        newSelectedSections.add(section);
        hasChanges = true;
      }
      // Auto-uncheck when a section transitions from complete to incomplete
      if (!isComplete && wasComplete) {
        newSelectedSections.delete(section);
        hasChanges = true;
      }
    });
    
    if (hasChanges) {
      onSelectedSectionsChange(newSelectedSections);
    }
    
    // Update completion state
    const newCompletionState: Record<string, boolean> = {};
    allSections.forEach(section => {
      newCompletionState[section] = isSectionComplete(section);
    });
    setPreviousCompletionState(newCompletionState);
  }, [data]);

  const handleCheckboxToggle = (section: string) => {
    const isComplete = isSectionComplete(section);
    if (!isComplete) return;
    if (hasActiveHolds(section)) {
      toast.error(`Cannot approve ${section} — active holds must be cleared first`);
      return;
    }
    
    const newSet = new Set(selectedSections);
    if (newSet.has(section)) {
      newSet.delete(section);
    } else {
      newSet.add(section);
    }
    onSelectedSectionsChange(newSet);
  };

  return (
    <div className={`content-stretch flex flex-col isolate items-start relative rounded-[inherit] w-full ${isEmbedded ? '' : 'overflow-clip size-full'}`}>
      {/* Header - Only show when NOT embedded */}
      {!isEmbedded && (
        <div className="content-stretch flex flex-col gap-[10px] h-[40px] items-start sticky top-0 shrink-0 w-full bg-white z-20 border-b border-[#eff2f4]">
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
      )}

      {/* Body - Conditionally Scrollable */}
      <div className={`content-stretch flex flex-col items-start relative shrink-0 w-full ${isEmbedded ? '' : 'basis-0 grow min-h-px min-w-px overflow-x-clip overflow-y-auto'}`}>
        {allSections.map((section, sectionIndex) => {
          const sectionComplete = isSectionComplete(section);
          const sectionFields = data.filter(field => field.section === section);
          const hasNoFields = documentsWithNoFields.includes(section);
          const docInfo = getDocumentInfo(section);

          return (
            <div key={section} className="content-stretch flex flex-col isolate items-start relative shrink-0 w-full">
              {/* Section Header */}
              <div className="content-stretch flex flex-col gap-[10px] h-[44px] items-start shrink-0 w-full z-[5] bg-white">
                <DocumentTitle
                  documentName={section}
                  exceptionCount={data.filter(f => f.section === section && getValidationStatus(f) === 'error').length}
                  isSelected={selectedDocumentId === section}
                  isChecked={selectedSections.has(section)}
                  isComplete={sectionComplete}
                  onSelect={() => handleSectionClick(section)}
                  onCheckboxToggle={(e) => {
                    e.stopPropagation();
                    handleCheckboxToggle(section);
                  }}
                  isCheckboxDisabled={!sectionComplete || hasActiveHolds(section)}
                  holdVariant={getHoldIndicatorVariant(section)}
                  activeHolds={getActiveHolds(section)}
                  removedHolds={getRemovedHolds(section)}
                  holdReasons={holdReasons}
                  getReasonLabel={getReasonLabel}
                  onHoldIconClick={() =>
                    setOverrideHoldDialog({ open: true, section })
                  }
                  onOverriddenHoldIconClick={() =>
                    setOverriddenHoldsDialog({ open: true, section })
                  }
                  onContextMenu={(e) => {
                    e.stopPropagation();
                    const rect = e.currentTarget.getBoundingClientRect();
                    const menuWidth = 210;
                    setContextMenu({
                      isOpen: true,
                      position: { x: rect.right - menuWidth, y: rect.top },
                      documentId: section,
                      documentName: section,
                      documentGroup: 'validation',
                    });
                  }}
                  pageCount={docInfo.pageCount}
                />
              </div>
              
              {/* Section Fields or No Fields Message */}
              {hasNoFields ? (
                <div className="content-stretch flex gap-[16px] h-[42px] items-center justify-center leading-[0] bg-[#eff2f4] relative shrink-0 text-nowrap w-full border-b border-[#c6ccd6]">
                  <File className="h-4 w-4 text-[#8d9aae]" />
                  <div className="flex flex-col font-['Roboto:Light',sans-serif] font-light justify-center relative shrink-0 text-[#5a626f] text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    <p className="leading-[normal] text-nowrap whitespace-pre">No fields required to validate for this document type</p>
                  </div>
                </div>
              ) : (
                sectionFields.map((field, fieldIndex) => {
                  const status = getValidationStatus(field);
                  const isAnimating = animatingField === field.id;
                  const showArrow = status !== 'resolved' && status !== 'match' && status !== 'ignored' && status !== 'within-range';
                  const isFocused = focusedField === field.id;

                  // Determine input styling
                  let inputBg = 'bg-white';
                  let inputBorder = 'border-[#e2e6eb]';
                  let inputShadow = '';
                  let statusIcon = null;

                  if (isFocused && !field.isIgnored) {
                    inputBorder = 'border-[#72cdf4]';
                    inputShadow = 'shadow-[0_0_0_3px_rgba(114,205,244,0.25)]';
                  } else if (status === 'resolved' || status === 'match' || status === 'within-range') {
                    inputBg = 'bg-[#e5f9ea]';
                    inputBorder = 'border-[#00bf30]';
                    statusIcon = (
                      <CheckCircle2 className="h-3 w-3 text-[#00bf30]" />
                    );
                  } else if (status === 'error' && field.isIgnorable) {
                    // Ignorable fields with exceptions show orange
                    inputBorder = 'border-[#ffa300]';
                    statusIcon = (
                      <AlertTriangle className="h-3 w-3 text-[#ffa300]" />
                    );
                  } else if (status === 'error') {
                    // Non-ignorable fields with exceptions show red
                    inputBorder = 'border-[#da1f2c]';
                    statusIcon = (
                      <AlertCircle className="h-3 w-3 text-[#da1f2c]" />
                    );
                  } else if (status === 'ignored') {
                    // Ignored fields show grayed out
                    inputBg = 'bg-[#f6f9fc]';
                    inputBorder = 'border-[#e2e6eb]';
                  }

                  return (
                    <div 
                      key={field.id} 
                      className={`content-stretch flex flex-col gap-[10px] min-h-[42px] items-start relative shrink-0 w-full transition-colors ${
                        hoveredRow === field.id ? 'bg-[#fafbfc]' : 'bg-white'
                      }`}
                      onMouseEnter={() => setHoveredRow(field.id)}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      <div className={`content-stretch flex min-h-[42px] items-stretch relative shrink-0 w-full transition-colors ${
                        hoveredRow === field.id ? 'bg-[#fafbfc]' : 'bg-white'
                      }`}>
                        <div aria-hidden="true" className="absolute border-[#c6ccd6] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
                        
                        {/* Empty spacing columns */}
                        <div className="box-border content-stretch flex gap-[10px] min-h-[38px] items-center justify-center px-0 py-[10px] shrink-0 w-[40px]" />
                        
                        {/* Field Name */}
                        <div className="box-border content-stretch flex gap-[10px] min-h-[38px] items-center pl-0 pr-[10px] py-[10px] relative shrink-0 w-[121px]">
                          <div className="flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3d3d3d] text-[12px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[normal] whitespace-pre">{field.fieldName}</p>
                          </div>
                        </div>
                        
                        {/* Expected Value */}
                        <div className="basis-0 grow min-h-[38px] min-w-px relative shrink-0">
                          <div aria-hidden="true" className="absolute border-[#e2e6eb] border-[0px_1px] border-solid inset-0 pointer-events-none" />
                          <div className="flex flex-row items-center justify-center h-full">
                            <div className="box-border content-stretch flex gap-[19px] min-h-[38px] items-center justify-center px-[8px] py-[4px] relative w-full">
                              <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0">
                                {field.additionalInfo ? (
                                  <div className="basis-0 content-stretch flex flex-col gap-[2px] grow items-start justify-center min-h-px min-w-px relative shrink-0">
                                    <div className="flex flex-col font-['Roboto:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[#3d3d3d] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                                      <p className="leading-[normal] whitespace-pre">{field.expectedValue}</p>
                                    </div>
                                    <div className="content-stretch flex gap-[4px] items-start leading-[0] relative shrink-0 text-[#3d3d3d] text-[10px] text-center text-nowrap w-full">
                                      <div className="flex flex-col font-['Roboto:Bold',sans-serif] font-bold justify-center relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
                                        <p className="leading-[normal] text-nowrap whitespace-pre">Range:</p>
                                      </div>
                                      <div className="flex flex-col font-['Roboto:Light',sans-serif] font-light justify-center relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
                                        <p className="leading-[normal] text-nowrap whitespace-pre">{field.additionalInfo.replace('Range: ', '')}</p>
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="basis-0 flex flex-col font-['Roboto:Light',sans-serif] font-light grow justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[#3d3d3d] text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                                    <p className="leading-[normal]">{field.expectedValue}</p>
                                  </div>
                                )}
                                
                                {showArrow && !field.isIgnored && (
                                  <button
                                    onClick={() => handleOverride(field.id)}
                                    disabled={isAnimating}
                                    className="bg-white relative rounded-[3px] shrink-0 size-[22px] transition-all hover:bg-[#e8f4fc] hover:shadow-sm active:scale-95"
                                  >
                                    <div className="overflow-clip relative rounded-[inherit] size-[22px]">
                                      <div className="absolute left-[4px] top-[11px] translate-y-[-50%]">
                                        <AnimatePresence>
                                          {isAnimating && animationStage === 'arrow' ? (
                                            <motion.div
                                              initial={{ x: 0, opacity: 1 }}
                                              animate={{ x: 10, opacity: 0 }}
                                              exit={{ opacity: 0 }}
                                              transition={{ duration: 0.3 }}
                                            >
                                              <ArrowRight className="h-3.5 w-3.5 text-[#2474bb]" />
                                            </motion.div>
                                          ) : !isAnimating ? (
                                            <ArrowRight className="h-3.5 w-3.5 text-[#2474bb]" />
                                          ) : null}
                                        </AnimatePresence>
                                      </div>
                                    </div>
                                    <div aria-hidden="true" className="absolute border-[#2474bb] border-[0.6px] border-solid inset-0 pointer-events-none rounded-[3px]" />
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Evaluated Value Input */}
                        <div className="basis-0 grow min-h-[38px] min-w-px relative shrink-0">
                          <div className="flex flex-row items-center h-full">
                            <div className="box-border content-stretch flex gap-[8px] min-h-[38px] items-center px-[8px] py-[4px] relative w-full">
                              <div className={`${inputBg} relative rounded-[4px] w-full transition-shadow ${inputShadow}`}>
                                <div aria-hidden="true" className={`absolute border ${inputBorder} border-solid inset-0 pointer-events-none rounded-[4px] transition-colors`} />
                                <div className="flex flex-row items-center size-full">
                                  <div className="box-border content-stretch flex gap-[8px] items-center px-[8px] py-[6px] relative w-full">
                                    {field.isIgnored && field.isIgnorable ? (
                                      <>
                                        {/* Ignored State - Show value as text */}
                                        <div className="flex-1 min-w-0 font-['Roboto:Regular',sans-serif] font-normal text-[#3d3d3d] text-[12px] leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>
                                          {field.evaluatedValue}
                                        </div>
                                        {/* Ignored Label */}
                                        <button className="bg-[#f6f9fc] box-border content-stretch cursor-pointer flex flex-col gap-[10px] h-[16px] items-center justify-center overflow-visible px-[4px] py-[2px] relative rounded-[2px] shrink-0">
                                          <div className="flex flex-col font-['Roboto:Black',sans-serif] font-black justify-center leading-[0] relative shrink-0 text-[#5a626f] text-[10px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                                            <p className="leading-[normal] whitespace-pre">Ignored</p>
                                          </div>
                                        </button>
                                        {/* Undo Icon Button */}
                                        <button 
                                          onClick={() => handleUndoIgnore(field.id)}
                                          className="flex items-center justify-center shrink-0 transition-all hover:scale-110 active:scale-95"
                                        >
                                          <Undo2 className="h-3 w-3 text-[#2474bb]" />
                                        </button>
                                      </>
                                    ) : (
                                      <>
                                        {/* Input Field */}
                                        <input
                                          type="text"
                                          value={field.evaluatedValue}
                                          onChange={(e) => handleInputChange(field.id, e.target.value)}
                                          onFocus={() => setFocusedField(field.id)}
                                          onBlur={() => setFocusedField(null)}
                                          placeholder=""
                                          className="flex-1 min-w-0 font-['Roboto:Regular',sans-serif] font-normal text-[#3d3d3d] text-[12px] leading-[normal] bg-transparent border-none outline-none"
                                          style={{ fontVariationSettings: "'wdth' 100" }}
                                        />
                                        
                                        {/* Ignore Button - Only for ignorable fields with exceptions */}
                                        {field.isIgnorable && !field.isIgnored && status === 'error' && (
                                          <button 
                                            onClick={() => handleIgnoreField(field.id)}
                                            className="bg-[#f6f9fc] box-border content-stretch cursor-pointer flex flex-col gap-[10px] h-[16px] items-center justify-center overflow-visible px-[4px] py-[2px] relative rounded-[2px] shrink-0 transition-all hover:bg-[#e8edf2] active:scale-95"
                                          >
                                            <div className="flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#5a626f] text-[10px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                                              <p className="leading-[normal] whitespace-pre">Ignore</p>
                                            </div>
                                          </button>
                                        )}
                                        
                                        {/* Calendar Icon - Only for date fields */}
                                        {(field.fieldType === 'date' || field.fieldType === 'datetime') && !field.isIgnored && !field.isIgnorable && (
                                          <Popover open={openDatePicker === field.id} onOpenChange={(open) => setOpenDatePicker(open ? field.id : null)}>
                                            <PopoverTrigger asChild>
                                              <button className="bg-[#f3f5f7] box-border content-stretch flex items-center justify-center p-[2px] relative rounded-[4px] shrink-0 transition-all hover:bg-[#e8edf2] active:scale-95">
                                                <Calendar className="h-3 w-3 text-[#5a626f]" />
                                              </button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="end">
                                              <CalendarComponent
                                                mode="single"
                                                selected={field.evaluatedValue ? new Date(field.evaluatedValue) : undefined}
                                                onSelect={(date) => {
                                                  if (date) {
                                                    const formattedDate = field.fieldType === 'datetime' 
                                                      ? format(date, 'yyyy-MM-dd HH:mm:ss')
                                                      : format(date, 'yyyy-MM-dd');
                                                    handleInputChange(field.id, formattedDate);
                                                    setOpenDatePicker(null);
                                                  }
                                                }}
                                                initialFocus
                                              />
                                            </PopoverContent>
                                          </Popover>
                                        )}
                                        
                                        {/* Status Icon */}
                                        {statusIcon && <div className="shrink-0">{statusIcon}</div>}
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          );
        })}
      </div>
      
      {/* Document Context Menu */}
      <DocumentContextMenu
        isOpen={contextMenu.isOpen}
        position={contextMenu.position}
        onClose={() => setContextMenu({ ...contextMenu, isOpen: false })}
        documentId={contextMenu.documentId}
        documentName={contextMenu.documentName}
        documentGroup={contextMenu.documentGroup}
        hasActiveHolds={hasActiveHolds(contextMenu.documentName)}
        canOverrideHold={canOverrideHold(contextMenu.documentName)}
        onPlaceHold={() =>
          setAddHoldDialog({ open: true, section: contextMenu.documentName })
        }
        onOverrideHold={() =>
          setOverrideHoldDialog({ open: true, section: contextMenu.documentName })
        }
        onAddHoldReason={() =>
          setAddHoldDialog({ open: true, section: contextMenu.documentName })
        }
      />

      <AddDocumentHoldDialog
        open={addHoldDialog.open}
        onOpenChange={(open) => setAddHoldDialog((prev) => ({ ...prev, open }))}
        documentSection={addHoldDialog.section}
        holdReasons={holdReasons}
        onSubmit={(entries) => onPlaceManualHolds?.(addHoldDialog.section, entries)}
      />

      <OverrideDocumentHoldDialog
        open={overrideHoldDialog.open}
        onOpenChange={(open) => setOverrideHoldDialog((prev) => ({ ...prev, open }))}
        documentSection={overrideHoldDialog.section}
        holds={getActiveHolds(overrideHoldDialog.section)}
        getReasonLabel={getReasonLabel}
        onOverride={(holdIds) => onOverrideHolds?.(overrideHoldDialog.section, holdIds)}
      />

      <OverriddenHoldsDialog
        open={overriddenHoldsDialog.open}
        onOpenChange={(open) => setOverriddenHoldsDialog((prev) => ({ ...prev, open }))}
        documentSection={overriddenHoldsDialog.section}
        holds={getRemovedHolds(overriddenHoldsDialog.section)}
        getReasonLabel={getReasonLabel}
      />
    </div>
  );
}