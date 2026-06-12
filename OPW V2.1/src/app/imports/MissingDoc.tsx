function Frame427321822() {
  return (
    <div className="basis-0 grow h-[38px] min-h-px min-w-px relative shrink-0">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[10px] h-[38px] items-center pl-[16px] pr-[10px] py-[10px] relative w-full">
          <div className="flex flex-col font-['Roboto:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#3d3d3d] text-[16px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[normal] whitespace-pre">{`Lumper `}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableComponents() {
  return (
    <div className="bg-white h-[44px] relative rounded-[4px] shrink-0 w-full" data-name="Table components">
      <div aria-hidden="true" className="absolute border border-[#eff2f4] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[44px] items-center pl-0 pr-[16px] py-0 relative w-full">
          <Frame427321822 />
          <div className="content-stretch flex items-start opacity-0 relative shrink-0" data-name="Doc type buttons/ status">
            <div className="bg-[#f3f5f7] box-border content-stretch flex gap-[10px] h-[28px] items-center px-[16px] py-[4px] relative rounded-[24px] shrink-0" data-name="Component 173">
              <div aria-hidden="true" className="absolute border border-[#e2e6eb] border-solid inset-0 pointer-events-none rounded-[24px]" />
              <div className="flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#5a636f] text-[12px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                <p className="leading-[normal] whitespace-pre">{`Ignored `}</p>
              </div>
              <div className="flex flex-col font-['Font_Awesome_6_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#2474bb] text-[12px] text-nowrap">
                <p className="leading-[normal] whitespace-pre">undo</p>
              </div>
            </div>
          </div>
          <div className="content-stretch flex items-start relative shrink-0" data-name="Doc type buttons">
            <div className="bg-white box-border content-stretch flex gap-[10px] items-center p-[8px] relative rounded-[4px] shrink-0" data-name="Component 174">
              <div aria-hidden="true" className="absolute border border-[#8d9aae] border-solid inset-0 pointer-events-none rounded-[4px]" />
              <div className="flex flex-col font-['Font_Awesome_6_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#da1f2c] text-[12px] text-nowrap">
                <p className="leading-[normal] whitespace-pre">not-equal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MissingDoc() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative rounded-[8px] size-full" data-name="Missing doc">
      <TableComponents />
    </div>
  );
}