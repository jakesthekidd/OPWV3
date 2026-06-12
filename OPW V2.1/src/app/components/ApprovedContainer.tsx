import { useState } from 'react';
import { ValidationField } from './ValidationGrid';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import svgPathsArrow from '../imports/svg-nfl9brerhj';
import { motion, AnimatePresence } from 'motion/react';
import { CircleCheck, File, ArrowRight, Ban } from 'lucide-react';
import DocumentPanelContainer from './DocumentPanelContainer';

// Custom NotEqual icon component (≠ symbol)
function NotEqual({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <line x1="5" y1="9" x2="19" y2="9" />
      <line x1="5" y1="15" x2="19" y2="15" />
      <line x1="19" y1="5" x2="5" y2="19" />
    </svg>
  );
}

export interface ApprovedDocument {
  section: string;
  approvedAt: Date;
  fields: ValidationField[];
  pageCount: number;
}

interface ApprovedContainerProps {
  approvedDocuments: ApprovedDocument[];
  selectedDocumentId?: string;
}

// Approved Icon Component
function ApprovedIcon() {
  return <CircleCheck className="h-[13px] w-[13px] text-[#00bf30]" />;
}

export default function ApprovedContainer({ approvedDocuments, selectedDocumentId }: ApprovedContainerProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const toggleSection = (section: string) => {
    const newSet = new Set(expandedSections);
    if (newSet.has(section)) {
      newSet.delete(section);
    } else {
      newSet.add(section);
    }
    setExpandedSections(newSet);
  };

  return (
    <DocumentPanelContainer>
      <div className="bg-white content-stretch flex flex-col gap-[8px] items-start relative rounded-[4px] shrink-0 w-full pt-[8px]">
        <AnimatePresence mode="popLayout">
          {approvedDocuments.map((doc, index) => {
            const isExpanded = expandedSections.has(doc.section);
            
            return (
              <motion.div
                key={doc.section}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="w-full"
              >
                <Collapsible
                  open={isExpanded}
                  onOpenChange={() => toggleSection(doc.section)}
                >
                  <div className="bg-white relative w-full border-b border-[#e5e7eb]">
                
                    {/* Collapsible Header */}
                    <CollapsibleTrigger asChild>
                      <button className="w-full box-border content-stretch flex items-center justify-between px-[12px] py-[10px] relative cursor-pointer hover:bg-[#fafafa] transition-colors">
                        <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
                          <motion.div
                            animate={{ rotate: isExpanded ? 90 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="block overflow-visible relative shrink-0 size-[14px]"
                          >
                            <div className="absolute h-[14px] left-[calc(50%-0.492px)] top-[calc(50%-0.004px)] translate-x-[-50%] translate-y-[-50%] w-[8px]">
                              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 12">
                                <path d={svgPathsArrow.p3325b600} fill="var(--fill-0, #6b7280)" />
                              </svg>
                            </div>
                          </motion.div>
                          <CircleCheck className="h-4 w-4 text-[#00bf30]" />
                          <div className="flex flex-col font-['Roboto:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#1f2937] text-[13px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[normal] whitespace-pre">{doc.section}</p>
                          </div>
                          <div className="flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#6b7280] text-[12px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[normal] whitespace-pre">({doc.pageCount} {doc.pageCount === 1 ? 'page' : 'pages'})</p>
                          </div>
                        </div>
                      </button>
                    </CollapsibleTrigger>

                    {/* Collapsible Content */}
                    <CollapsibleContent>
                      <div className="px-[12px] pb-[12px]">
                        {doc.fields.length === 0 ? (
                          <div className="bg-[#fafafa] rounded-[6px] overflow-hidden p-[10px]">
                            <div className="flex items-center gap-[6px] justify-center">
                              <File className="h-3.5 w-3.5 text-[#9ca3af]" />
                              <div className="flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] text-[#6b7280] text-[11px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                                <p className="leading-[normal] whitespace-pre">No fields required to validate for this document type</p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="bg-white rounded-[4px] overflow-hidden relative">
                        
                            {/* Table Header */}
                            <div className="bg-[#fafafa] box-border content-stretch flex items-center pl-0 pr-px py-0 relative shrink-0 w-full border-b border-[#e5e7eb]">
                              {/* Expected Column Header */}
                              <div className="box-border content-stretch flex gap-[6px] h-[28px] items-center justify-start px-[10px] py-[6px] relative shrink-0 w-[140px]">
                                <p className="font-['Roboto:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[11px] text-[#374151] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
                                  Expected
                                </p>
                              </div>
                          
                              {/* Evaluated Column Header (with Action sub-column) */}
                              <div className="box-border content-stretch flex items-center relative shrink-0">
                                <div className="box-border content-stretch flex flex-col gap-[6px] h-[28px] items-center justify-center px-[6px] py-[6px] relative shrink-0 w-[28px] border-l border-[#e5e7eb]">
                                </div>
                                <div className="box-border content-stretch flex gap-[6px] h-[28px] items-center justify-start px-[10px] py-[6px] relative shrink-0 w-[140px]">
                                  <p className="font-['Roboto:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[11px] text-[#374151] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>Evaluated</p>
                                </div>
                              </div>
                          
                              {/* User Column Header */}
                              <div className="box-border content-stretch flex gap-[6px] h-[28px] items-center justify-start px-[10px] py-[6px] relative shrink-0 w-[100px] border-l border-[#e5e7eb]">
                                <p className="font-['Roboto:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[11px] text-[#374151] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>User</p>
                              </div>
                            </div>

                            {/* Table Rows */}
                            {doc.fields.map((field, idx) => {
                              // Determine status icon for Expected column
                              const isMatching = !field.isIgnored && field.expectedValue === field.evaluatedValue && field.evaluatedValue;
                              const expectedIcon = isMatching ? (
                                <CircleCheck className="h-3.5 w-3.5 text-[#00bf30]" />
                              ) : (
                                <NotEqual className="h-3.5 w-3.5 text-[#9ca3af]" />
                              );
                          
                              // Determine action icon for Evaluated column
                              let actionIcon = null;
                              if (field.wasOverridden) {
                                actionIcon = <ArrowRight className="h-3.5 w-3.5 text-[#2474BB]" />;
                              } else if (field.isIgnored) {
                                actionIcon = <NotEqual className="h-3.5 w-3.5 text-[#9ca3af]" />;
                              }
                          
                              // Determine user for User column
                              let userName = "System";
                              if (field.wasManuallyEdited || field.wasOverridden) {
                                userName = "Kriss Johnson";
                              } else if (field.isIgnored) {
                                userName = "---";
                              }
                          
                              return (
                                <div
                                  key={field.id}
                                  className="bg-white box-border content-stretch flex items-center pl-0 pr-px py-0 relative shrink-0 w-full hover:bg-[#fafafa] transition-colors border-b border-[#e5e7eb] last:border-b-0"
                                >
                                  {/* Expected Column */}
                                  <div className="box-border content-stretch flex gap-[8px] min-h-[44px] items-center px-[10px] py-[10px] relative shrink-0 w-[140px]">
                                    <div className="flex items-center justify-center shrink-0">
                                      {expectedIcon}
                                    </div>
                                    <div className="flex-1 content-stretch flex flex-col gap-[2px] items-start justify-center leading-[normal] min-w-0">
                                      <p className="font-['Roboto:Regular',sans-serif] font-normal w-full text-[#9ca3af] text-[10px] leading-[1.2]" style={{ fontVariationSettings: "'wdth' 100" }}>
                                        {field.fieldName}
                                      </p>
                                      <p className="font-['Roboto:Medium',sans-serif] font-medium w-full text-[#1f2937] text-[12px] leading-[1.2]" style={{ fontVariationSettings: "'wdth' 100" }}>
                                        {field.expectedValue || '---'}
                                      </p>
                                    </div>
                                  </div>
                              
                                  {/* Evaluated Column (with Action sub-column) */}
                                  <div className="box-border content-stretch flex min-h-[44px] items-center relative shrink-0 border-l border-[#e5e7eb]">
                                    {/* Action Sub-column */}
                                    <div className="box-border content-stretch flex items-center justify-center px-[8px] py-[10px] relative shrink-0 w-[36px]">
                                      {actionIcon}
                                    </div>
                                
                                    {/* Value Sub-column */}
                                    <div className="box-border content-stretch flex gap-[8px] min-h-[44px] items-center justify-start px-[10px] py-[10px] relative shrink-0 w-[132px]">
                                      <div className="flex-1 content-stretch flex flex-col gap-[2px] items-start justify-center leading-[normal] min-w-0">
                                        <p className="font-['Roboto:Regular',sans-serif] font-normal w-full text-[#9ca3af] text-[10px] leading-[1.2]" style={{ fontVariationSettings: "'wdth' 100" }}>
                                          {field.fieldName}
                                        </p>
                                        <p className={`font-['Roboto:Medium',sans-serif] font-medium w-full text-[12px] leading-[1.2] ${
                                          field.wasManuallyEdited ? 'text-[#ff5c00]' : 'text-[#1f2937]'
                                        }`} style={{ fontVariationSettings: "'wdth' 100" }}>
                                          {field.isIgnored ? '---' : (field.evaluatedValue || '---')}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                              
                                  {/* User Column */}
                                  <div className="box-border content-stretch flex items-center px-[10px] py-[10px] relative shrink-0 w-[120px] min-h-[44px] border-l border-[#e5e7eb]">
                                    <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.2] w-full text-[#6b7280] text-[12px] truncate" style={{ fontVariationSettings: "'wdth' 100" }}>
                                      {userName}
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </DocumentPanelContainer>
  );
}