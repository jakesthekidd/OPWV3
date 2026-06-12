import { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { motion } from 'motion/react';
import svgPathsMissing from '../imports/svg-wstg1m9hty';
import svgPathsArrow from '../imports/svg-nfl9brerhj';
import { RotateCcw } from 'lucide-react';
import DocumentPanelContainer from './DocumentPanelContainer';

export interface MissingDocument {
  id: string;
  name: string;
  isIgnored: boolean;
  isPendingRemoval?: boolean;
}

interface MissingDocumentsContainerProps {
  missingDocuments: MissingDocument[];
  onToggleIgnore: (documentId: string) => void;
  selectedDocumentId?: string;
  onDocumentSelect?: (documentId: string) => void;
}

// Missing Document Icon Component
function MissingIcon() {
  return (
    <div className="h-[17px] relative shrink-0 w-[13px]">
      <div className="absolute content-stretch flex gap-[8px] items-start left-0 top-0">
        <div className="h-[17px] relative shrink-0 w-[13px]">
          <div className="absolute inset-0" style={{ "--fill-0": "rgba(218, 31, 44, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 21">
              <g>
                <path d={svgPathsMissing.p31f9270} fill="var(--fill-0, #DA1F2C)" />
                <path d={svgPathsMissing.p136cce80} fill="var(--fill-0, #DA1F2C)" />
                <path clipRule="evenodd" d={svgPathsMissing.p296a4100} fill="var(--fill-0, #DA1F2C)" fillRule="evenodd" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

interface MissingDocItemProps {
  document: MissingDocument;
  onToggleIgnore: (documentId: string) => void;
}

function MissingDocItem({ document, onToggleIgnore }: MissingDocItemProps) {
  return (
    <div 
      className={`relative rounded-[4px] w-full transition-colors ${
        document.isIgnored ? 'bg-[#f6f9fc]' : 'bg-white'
      }`}
      data-name="Missing doc"
    >
      <div 
        aria-hidden="true" 
        className="absolute border border-[#eff2f4] border-solid inset-0 pointer-events-none rounded-[4px]"
      />
      <div className="flex flex-row items-center w-full">
        <div className="box-border content-stretch flex gap-[8px] h-[44px] items-center pl-0 pr-[16px] py-0 relative w-full">
          <div className="basis-0 grow h-[38px] min-h-px min-w-px relative shrink-0">
            <div className="flex flex-row items-center size-full">
              <div className="box-border content-stretch flex gap-[10px] h-[38px] items-center pl-[16px] pr-[10px] py-[10px] relative w-full">
                <MissingIcon />
                <div className="flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3d3d3d] text-[16px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                  <p className="leading-[normal] whitespace-pre">{document.name}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex items-start relative shrink-0" data-name="Doc type buttons/ status">
            {document.isIgnored ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleIgnore(document.id);
                }}
                className="bg-[#f3f5f7] box-border content-stretch flex gap-[10px] h-[28px] items-center px-[16px] py-[4px] relative rounded-[24px] shrink-0 cursor-pointer hover:bg-[#e2e6eb] transition-colors"
                data-name="Component 173"
              >
                <div aria-hidden="true" className="absolute border border-[#e2e6eb] border-solid inset-0 pointer-events-none rounded-[24px]" />
                <div className="flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#5a636f] text-[12px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                  <p className="leading-[normal] whitespace-pre">Ignored</p>
                </div>
                <RotateCcw className="h-[12px] w-[12px] text-[#2474bb]" />
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleIgnore(document.id);
                }}
                className="bg-white box-border content-stretch flex gap-[10px] h-[28px] items-center px-[16px] py-[4px] relative rounded-[24px] shrink-0 cursor-pointer hover:bg-[#f7f8f9] transition-colors"
                data-name="Component 174"
              >
                <div aria-hidden="true" className="absolute border border-[#8d9aae] border-solid inset-0 pointer-events-none rounded-[24px]" />
                <div className="flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3d3d3d] text-[12px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                  <p className="leading-[normal] whitespace-pre">Ignore</p>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MissingDocumentsContainer({ 
  missingDocuments, 
  onToggleIgnore, 
  selectedDocumentId, 
  onDocumentSelect 
}: MissingDocumentsContainerProps) {
  // Don't render the container if there are no missing documents
  if (missingDocuments.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-[4px] w-full pt-[8px] pr-[16px] pb-[0px] pl-[16px]">
      {missingDocuments.map((doc) => (
        <MissingDocItem
          key={doc.id}
          document={doc}
          onToggleIgnore={onToggleIgnore}
        />
      ))}
    </div>
  );
}