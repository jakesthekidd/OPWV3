function Calender() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center p-[2px] relative rounded-[2px] shrink-0 size-[16px]" data-name="Calender">
      <div className="flex flex-col font-['Font_Awesome_6_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a626f] text-[10px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">{`Calendar `}</p>
      </div>
    </div>
  );
}

function Calender1() {
  return (
    <div className="bg-[#f6f9fc] box-border content-stretch flex flex-col gap-[10px] h-[16px] items-center justify-center p-[2px] relative rounded-[2px] shrink-0" data-name="Calender">
      <div className="flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#5a626f] text-[10px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">Tag</p>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#e2e6eb] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center px-[8px] py-[6px] relative w-full">
          <div className="basis-0 flex flex-col font-['Roboto:Regular',sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[#3d3d3d] text-[12px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[normal]">{`$900 `}</p>
          </div>
          <Calender />
          <Calender1 />
          <div className="flex flex-col font-['Font_Awesome_6_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a626f] text-[12px] text-nowrap">
            <p className="leading-[normal] whitespace-pre">Icons</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExceptionInputs() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="Exception Inputs">
      <div className="content-stretch flex flex-col items-start relative rounded-[4px] shrink-0 w-[222px]" data-name="Base Input Component Selected">
        <Input />
      </div>
    </div>
  );
}