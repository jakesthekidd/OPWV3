function Frame427322006() {
  return (
    <div className="content-stretch flex flex-col items-start leading-[0] relative shrink-0 w-[64px]">
      <div className="flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center relative shrink-0 text-[#717b8b] text-[10px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal]">{`Approved by `}</p>
      </div>
      <div className="flex flex-col font-['Roboto:Bold',sans-serif] font-bold justify-center relative shrink-0 text-[#3d3d3d] text-[12px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal]">{`Kross, John `}</p>
      </div>
    </div>
  );
}

function Frame427322005() {
  return (
    <div className="content-stretch flex flex-col items-start leading-[0] relative shrink-0">
      <div className="flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center min-w-full relative shrink-0 text-[#717b8b] text-[10px] w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal]">{`Date & Time `}</p>
      </div>
      <div className="flex flex-col font-['Roboto:Bold',sans-serif] font-bold justify-center relative shrink-0 text-[#3d3d3d] text-[12px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">03/04/2025 (12:30pm)</p>
      </div>
    </div>
  );
}

export default function Frame427322007() {
  return (
    <div className="relative rounded-[4px] size-full">
      <div aria-hidden="true" className="absolute border border-[#eff2f4] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
          <Frame427322006 />
          <div className="flex flex-row items-center self-stretch">
            <div className="flex h-full items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "26", "--transform-inner-height": "39.5" } as React.CSSProperties}>
              <div className="flex-none h-full rotate-[90deg]">
                <div className="h-full relative w-[26px]">
                  <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 1">
                      <line id="Line 359" stroke="var(--stroke-0, #EFF2F4)" x2="26" y1="0.5" y2="0.5" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Frame427322005 />
        </div>
      </div>
    </div>
  );
}