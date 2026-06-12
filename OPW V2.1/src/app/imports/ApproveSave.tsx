interface Frame289463Props {
  selectedCount: number;
  onClick: () => void;
  disabled?: boolean;
}

function Frame289463({ selectedCount, onClick, disabled }: Frame289463Props) {
  return (
    <button 
      className="bg-[#00bf30] box-border content-stretch flex gap-[8px] items-center justify-center px-[16px] py-[8px] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[#00a528] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={onClick}
      disabled={disabled}
    >
      <div aria-hidden="true" className="absolute border border-[#00bf30] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="font-['Font_Awesome_6_Free:Solid',sans-serif] leading-[normal] not-italic relative shrink-0 text-[12px] text-nowrap text-white whitespace-pre">check</p>
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[12px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>{`Approve Selected `}</p>
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[12px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        ({selectedCount})
      </p>
    </button>
  );
}

interface Square14Props {
  selectedCount: number;
  onClick: () => void;
  disabled?: boolean;
}

function Square14({ selectedCount, onClick, disabled }: Square14Props) {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Square  14">
      <Frame289463 selectedCount={selectedCount} onClick={onClick} disabled={disabled} />
    </div>
  );
}

interface ApproveSaveProps {
  selectedCount: number;
  onClick: () => void;
  disabled?: boolean;
}

export default function ApproveSave({ selectedCount, onClick, disabled }: ApproveSaveProps) {
  return (
    <div className="content-stretch flex items-start relative size-full" data-name="Approve /save">
      <Square14 selectedCount={selectedCount} onClick={onClick} disabled={disabled || selectedCount === 0} />
    </div>
  );
}