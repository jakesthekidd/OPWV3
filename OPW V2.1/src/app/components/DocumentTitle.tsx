import { useState } from 'react';
import { Check, MoreVertical } from 'lucide-react';
import svgPathsResting from '../imports/svg-egjw0lyglk';
import svgPathsHover from '../imports/svg-hinwqmnjjh';
import svgPathsSelected from '../imports/svg-vnyhshm0i9';

interface DocumentTitleProps {
  documentName: string;
  exceptionCount: number;
  isSelected: boolean;
  isChecked: boolean;
  isComplete: boolean;
  onSelect: () => void;
  onCheckboxToggle?: (e: React.MouseEvent) => void;
  isCheckboxDisabled?: boolean;
  onContextMenu?: (e: React.MouseEvent) => void;
  pageCount?: number; // Add page count prop
}

function RadioButtnAndCheckBox16({ isChecked, isDisabled, onClick }: { 
  isChecked: boolean; 
  isDisabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`content-stretch flex gap-[8px] items-center relative shrink-0 ${
        isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
      }`}
    >
      <div className={`relative rounded-[1px] shrink-0 size-[16px] ${
        isChecked ? 'bg-[#00bf30]' : 'bg-white'
      }`}>
        <div aria-hidden="true" className={`absolute border border-solid inset-0 pointer-events-none rounded-[1px] ${
          isChecked ? 'border-[#00bf30]' : 'border-[#8d9aae]'
        }`} />
        {isChecked && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Check className="h-3 w-3 text-white" strokeWidth={3} />
          </div>
        )}
      </div>
    </button>
  );
}

function Frame427321822({ documentName, isSelected, pageCount }: { documentName: string; isSelected: boolean; pageCount?: number }) {
  return (
    <div className="basis-0 grow h-[38px] min-h-px min-w-px relative shrink-0">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[38px] items-center pl-0 pr-[10px] py-[10px] relative w-full">
          <div 
            className={`flex flex-col font-['Roboto:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[16px] text-nowrap ${
              isSelected ? 'text-[#2474bb] [text-underline-position:from-font] decoration-solid underline' : 'text-[#174a78]'
            }`} 
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            <p className={`leading-[normal] whitespace-pre ${isSelected ? 'underline' : ''}`}>{documentName}</p>
          </div>
          {pageCount && pageCount > 0 && (
            <div className="font-['Roboto:Regular',sans-serif] font-normal text-[14px] text-[#6b7280]" style={{ fontVariationSettings: "'wdth' 100" }}>
              ({pageCount} {pageCount === 1 ? 'page' : 'pages'})
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Frame427322113({ 
  documentName, 
  isSelected, 
  isChecked, 
  isCheckboxDisabled, 
  onCheckboxClick,
  pageCount
}: { 
  documentName: string; 
  isSelected: boolean; 
  isChecked: boolean;
  isCheckboxDisabled?: boolean;
  onCheckboxClick?: (e: React.MouseEvent) => void;
  pageCount?: number;
}) {
  return (
    <div className="basis-0 content-stretch flex grow h-full items-center min-h-px min-w-px relative shrink-0">
      <div className="box-border content-stretch flex gap-[10px] h-full items-center justify-center px-0 py-[10px] relative shrink-0 w-[67px]" data-name="Start">
        {isSelected && (
          <div aria-hidden="true" className="absolute border-[#72cdf4] border-[0px_0px_0px_4px] border-solid inset-0 pointer-events-none" />
        )}
        <div className="content-stretch flex items-start relative shrink-0" data-name="Radio Buttn and Check Box  16">
          <RadioButtnAndCheckBox16 
            isChecked={isChecked} 
            isDisabled={isCheckboxDisabled}
            onClick={onCheckboxClick}
          />
        </div>
      </div>
      <Frame427321822 documentName={documentName} isSelected={isSelected} pageCount={pageCount} />
    </div>
  );
}

export default function DocumentTitle({
  documentName,
  exceptionCount,
  isSelected,
  isChecked,
  isComplete,
  onSelect,
  onCheckboxToggle,
  isCheckboxDisabled,
  onContextMenu,
  pageCount
}: DocumentTitleProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Choose the appropriate SVG paths based on state
  const svgPaths = isSelected ? svgPathsSelected : (isHovered ? svgPathsHover : svgPathsResting);
  
  // Choose background color
  const bgColor = isSelected || isHovered ? 'bg-[#eaf8fd]' : 'bg-[#f7f8f9]';

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the row selection
    if (onCheckboxToggle && !isCheckboxDisabled) {
      onCheckboxToggle(e);
    }
  };

  return (
    <div 
      className="content-stretch flex flex-col gap-[10px] items-start relative size-full cursor-pointer" 
      data-name={isSelected ? "Selected" : (isHovered ? "Hover" : "Resting")}
      onClick={onSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`${bgColor} h-[44px] relative shrink-0 w-full transition-colors`} data-name="Document Title">
        <div aria-hidden="true" className="absolute border-[#c6ccd6] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="box-border content-stretch flex gap-[8px] h-[44px] items-center pl-0 pr-[16px] py-0 relative w-full">
            <Frame427322113 
              documentName={documentName}
              isSelected={isSelected}
              isChecked={isChecked}
              isCheckboxDisabled={isCheckboxDisabled}
              onCheckboxClick={handleCheckboxClick}
              pageCount={pageCount}
            />
            {/* Exception Status - only show if not complete and has exceptions */}
            {!isComplete && exceptionCount > 0 && (
              <div className="content-stretch flex gap-[2px] items-start relative shrink-0" data-name="Exception Status">
                <div className="h-[16px] relative shrink-0 w-[15.334px]" data-name="Exception Icons  & Doc Icons">
                  <div className="absolute h-[16px] left-0 top-0 w-[15.334px]" data-name="Correct">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                      <g id="Correct">
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
                </div>
                <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[normal] relative self-stretch shrink-0 text-[#3d3d3d] text-[12px] w-[8px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                  {exceptionCount}
                </p>
              </div>
            )}
            
            {/* Complete Badge */}
            {isComplete && (
              <div className="bg-[#ccf2d6] box-border content-stretch flex gap-[10px] items-center justify-center px-[8px] py-[4px] relative rounded-[37px] shrink-0">
                <div aria-hidden="true" className="absolute border border-[#99e5ac] border-solid inset-0 pointer-events-none rounded-[37px]" />
                <div className="flex flex-col font-['Roboto:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#004c13] text-[12px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                  <p className="leading-[normal] whitespace-pre">Complete </p>
                </div>
              </div>
            )}
            <div 
              className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center p-[2px] relative rounded-[2px] shrink-0" 
              data-name="context"
              onClick={(e) => {
                e.stopPropagation();
                if (onContextMenu) {
                  onContextMenu(e);
                }
              }}
            >
              <MoreVertical className="h-4 w-4 text-[#2068a8]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}