import svgPaths from "./svg-vnyhshm0i9";

function RadioButtnAndCheckBox16() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Radio Buttn and Check Box  16">
      <div className="bg-white relative rounded-[1px] shrink-0 size-[16px]">
        <div aria-hidden="true" className="absolute border border-[#8d9aae] border-solid inset-0 pointer-events-none rounded-[1px]" />
      </div>
    </div>
  );
}

function Frame427321822() {
  return (
    <div className="basis-0 grow h-[38px] min-h-px min-w-px relative shrink-0">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[10px] h-[38px] items-center pl-0 pr-[10px] py-[10px] relative w-full">
          <div className="flex flex-col font-['Roboto:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#2474bb] text-[16px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="[text-underline-position:from-font] decoration-solid leading-[normal] underline whitespace-pre">{`Invoice `}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame427322114() {
  return (
    <div className="basis-0 content-stretch flex grow h-full items-center min-h-px min-w-px relative shrink-0">
      <div className="box-border content-stretch flex gap-[10px] h-full items-center justify-center px-0 py-[10px] relative shrink-0 w-[67px]" data-name="Start">
        <div aria-hidden="true" className="absolute border-[#72cdf4] border-[0px_0px_0px_4px] border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex items-start relative shrink-0" data-name="Radio Buttn and Check Box  16">
          <RadioButtnAndCheckBox16 />
        </div>
      </div>
      <Frame427321822 />
    </div>
  );
}

export default function Selected() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative size-full" data-name="Selected">
      <div className="bg-[#eaf8fd] h-[44px] relative shrink-0 w-full" data-name="Document Title">
        <div aria-hidden="true" className="absolute border-[#c6ccd6] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="box-border content-stretch flex gap-[8px] h-[44px] items-center pl-0 pr-[16px] py-0 relative w-full">
            <Frame427322114 />
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
                2
              </p>
            </div>
            <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center p-[2px] relative rounded-[2px] shrink-0" data-name="context">
              <div className="flex flex-col font-['Font_Awesome_6_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#2068a8] text-[16px] text-center w-full">
                <p className="leading-[normal]">ellipsis-vertical</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}