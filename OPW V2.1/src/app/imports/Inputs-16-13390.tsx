function Calender() {
  return (
    <div className="bg-[#f3f5f7] box-border content-stretch flex flex-col gap-[10px] items-center justify-center p-[2px] relative rounded-[4px] shrink-0" data-name="Calender">
      <div className="flex flex-col font-['Font_Awesome_6_Free:Solid',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a626f] text-[12px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">{`Calendar `}</p>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#72cdf4] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[10px] items-center px-[8px] py-[4px] relative w-full">
          <div className="basis-0 flex flex-col font-['Roboto:Regular',_sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[#3d3d3d] text-[12px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[normal]">{`$900 `}</p>
          </div>
          <Calender />
          <div className="flex flex-col font-['Font_Awesome_6_Free:Solid',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a626f] text-[12px] text-nowrap">
            <p className="leading-[normal] whitespace-pre">Icons</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BaseInputComponent() {
  return (
    <div className="box-border content-stretch flex flex-col items-start relative rounded-[4px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.2)] shrink-0 w-[222px]" data-name="Base Input Component">
      <Input />
    </div>
  );
}

export default function Inputs() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="Inputs">
      <BaseInputComponent />
    </div>
  );
}