function Frame427322072() {
  return (
    <div className="content-stretch flex gap-[4px] items-center leading-[0] relative shrink-0 text-[#3a3a3a] text-[16px] text-nowrap">
      <div className="flex flex-col font-['Roboto:Bold',sans-serif] font-bold justify-center relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] text-nowrap whitespace-pre">Unclassified #1</p>
      </div>
      <div className="flex flex-col font-['Roboto:Light',sans-serif] font-light justify-center opacity-0 relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] text-nowrap whitespace-pre">(Reason)</p>
      </div>
    </div>
  );
}

export default function DocumentInDropDown() {
  return (
    <div className="bg-white relative rounded-[4px] size-full" data-name="Document in drop down">
      <div aria-hidden="true" className="absolute border border-[#e2e6eb] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center pl-0 pr-[16px] py-0 relative size-full">
          <div className="basis-0 grow h-full min-h-px min-w-px relative rounded-bl-[4px] rounded-tl-[4px] shrink-0" data-name="Doc name">
            <div className="flex flex-row items-center size-full">
              <div className="box-border content-stretch flex gap-[10px] items-center pl-[16px] pr-[10px] py-[10px] relative size-full">
                <Frame427322072 />
              </div>
            </div>
          </div>
          <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[4px] shrink-0" data-name="Dropdown doc type">
            <div aria-hidden="true" className="absolute border border-[#8d9aae] border-solid inset-0 pointer-events-none rounded-[4px]" />
            <div className="flex flex-row items-center size-full">
              <div className="box-border content-stretch flex gap-[10px] items-center leading-[0] px-[8px] py-[6px] relative text-[12px] w-full">
                <div className="basis-0 flex flex-col font-['Roboto:Regular',sans-serif] font-normal grow justify-center min-h-px min-w-px relative shrink-0 text-[#3d3d3d]" style={{ fontVariationSettings: "'wdth' 100" }}>
                  <p className="leading-[normal]">{`Unclassified `}</p>
                </div>
                <button className="[white-space-collapse:collapse] cursor-pointer flex flex-col font-['Font_Awesome_6_Free:Solid',sans-serif] justify-center not-italic relative shrink-0 text-[#8d9aae] text-nowrap">
                  <p className="leading-[normal] whitespace-pre">angle-down</p>
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col font-['Font_Awesome_6_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#2474bb] text-[16px] text-center text-nowrap">
            <p className="leading-[normal] whitespace-pre">ellipsis-vertical</p>
          </div>
        </div>
      </div>
    </div>
  );
}