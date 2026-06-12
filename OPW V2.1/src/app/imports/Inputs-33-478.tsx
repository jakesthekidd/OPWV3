function Calender() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center p-[2px] relative rounded-[2px] shrink-0 size-[16px]" data-name="Calender">
      <div className="flex flex-col font-['Font_Awesome_6_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a626f] text-[10px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">{`Calendar `}</p>
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
          <div className="flex flex-col font-['Font_Awesome_6_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a626f] text-[12px] text-nowrap">
            <p className="leading-[normal] whitespace-pre">Icons</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Calender1() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center p-[2px] relative rounded-[2px] shrink-0 size-[16px]" data-name="Calender">
      <div className="flex flex-col font-['Font_Awesome_6_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a626f] text-[10px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">{`Calendar `}</p>
      </div>
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#da1f2c] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center px-[8px] py-[6px] relative w-full">
          <div className="basis-0 flex flex-col font-['Roboto:Regular',sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[#3d3d3d] text-[12px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[normal]">{`$900 `}</p>
          </div>
          <Calender1 />
          <div className="flex flex-col font-['Font_Awesome_6_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#da1f2c] text-[12px] text-nowrap">
            <p className="leading-[normal] whitespace-pre">{`circle-exclamation `}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Calender2() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] h-[16px] items-center justify-center p-[2px] relative rounded-[2px] shrink-0" data-name="Calender">
      <div className="flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#5a626f] text-[10px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">Ignore</p>
      </div>
    </div>
  );
}

function Input2() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#ffa300] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center px-[8px] py-[6px] relative w-full">
          <div className="basis-0 flex flex-col font-['Roboto:Regular',sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[#3d3d3d] text-[12px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[normal]">{`$900 `}</p>
          </div>
          <Calender2 />
          <div className="flex flex-col font-['Font_Awesome_6_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#ffa300] text-[12px] text-nowrap">
            <p className="leading-[normal] whitespace-pre">triangle-exclamation</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Calender3() {
  return (
    <div className="bg-[#f6f9fc] box-border content-stretch flex flex-col gap-[10px] h-[16px] items-center justify-center p-[2px] relative rounded-[2px] shrink-0" data-name="Calender">
      <div className="flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#5a626f] text-[10px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">Undo</p>
      </div>
    </div>
  );
}

function Input3() {
  return (
    <div className="bg-[#f6f9fc] relative rounded-[4px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#e2e6eb] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center px-[8px] py-[6px] relative w-full">
          <div className="basis-0 flex flex-col font-['Roboto:Black',sans-serif] font-black grow justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[#5a626f] text-[10px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[normal]">Ignored</p>
          </div>
          <Calender3 />
          <div className="flex flex-col font-['Font_Awesome_6_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#2474bb] text-[12px] text-nowrap">
            <p className="leading-[normal] whitespace-pre">Undo</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Calender4() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center p-[2px] relative rounded-[2px] shrink-0 size-[16px]" data-name="Calender">
      <div className="flex flex-col font-['Font_Awesome_6_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a626f] text-[12px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">{`Calendar `}</p>
      </div>
    </div>
  );
}

function Calender5() {
  return (
    <div className="bg-[#f6f9fc] box-border content-stretch flex flex-col gap-[10px] h-[16px] items-center justify-center p-[2px] relative rounded-[2px] shrink-0" data-name="Calender">
      <div className="flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#5a626f] text-[10px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">Tag</p>
      </div>
    </div>
  );
}

function Input4() {
  return (
    <div className="bg-[#e5f9ea] relative rounded-[4px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#00bf30] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center px-[8px] py-[6px] relative w-full">
          <div className="basis-0 flex flex-col font-['Roboto:Regular',sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[#3d3d3d] text-[12px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[normal]">{`$900 `}</p>
          </div>
          <Calender4 />
          <Calender5 />
          <div className="flex flex-col font-['Font_Awesome_6_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#00bf30] text-[12px] text-nowrap">
            <p className="leading-[normal] whitespace-pre">circle-check</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Calender6() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center p-[2px] relative rounded-[2px] shrink-0 size-[16px]" data-name="Calender">
      <div className="flex flex-col font-['Font_Awesome_6_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a626f] text-[10px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">{`Calendar `}</p>
      </div>
    </div>
  );
}

function Input5() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#5ba4c3] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center px-[8px] py-[6px] relative w-full">
          <div className="basis-0 flex flex-col font-['Roboto:Regular',sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[#3d3d3d] text-[12px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[normal]">{`$900 `}</p>
          </div>
          <Calender6 />
          <div className="flex flex-col font-['Font_Awesome_6_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a626f] text-[12px] text-nowrap">
            <p className="leading-[normal] whitespace-pre">Icons</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Calender7() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center p-[2px] relative rounded-[2px] shrink-0 size-[16px]" data-name="Calender">
      <div className="flex flex-col font-['Font_Awesome_6_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a626f] text-[10px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">{`Calendar `}</p>
      </div>
    </div>
  );
}

function Input6() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#ae1923] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center px-[8px] py-[6px] relative w-full">
          <div className="basis-0 flex flex-col font-['Roboto:Regular',sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[#3d3d3d] text-[12px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[normal]">{`$900 `}</p>
          </div>
          <Calender7 />
          <div className="flex flex-col font-['Font_Awesome_6_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#da1f2c] text-[12px] text-nowrap">
            <p className="leading-[normal] whitespace-pre">{`circle-exclamation `}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Calender8() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] h-[16px] items-center justify-center p-[2px] relative rounded-[2px] shrink-0" data-name="Calender">
      <div className="flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#5a626f] text-[10px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">Ignore</p>
      </div>
    </div>
  );
}

function Input7() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#cc8200] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center px-[8px] py-[6px] relative w-full">
          <div className="basis-0 flex flex-col font-['Roboto:Regular',sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[#3d3d3d] text-[12px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[normal]">{`$900 `}</p>
          </div>
          <Calender8 />
          <div className="flex flex-col font-['Font_Awesome_6_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#ffa300] text-[12px] text-nowrap">
            <p className="leading-[normal] whitespace-pre">triangle-exclamation</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Calender9() {
  return (
    <div className="bg-[#f6f9fc] box-border content-stretch flex flex-col gap-[10px] h-[16px] items-center justify-center p-[2px] relative rounded-[2px] shrink-0" data-name="Calender">
      <div className="flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#5a626f] text-[10px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">Undo</p>
      </div>
    </div>
  );
}

function Input8() {
  return (
    <div className="bg-[#f6f9fc] relative rounded-[4px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#c6ccd6] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center px-[8px] py-[6px] relative w-full">
          <div className="basis-0 flex flex-col font-['Roboto:Black',sans-serif] font-black grow justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[#5a626f] text-[10px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[normal]">Ignored</p>
          </div>
          <Calender9 />
          <div className="flex flex-col font-['Font_Awesome_6_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#2474bb] text-[12px] text-nowrap">
            <p className="leading-[normal] whitespace-pre">Undo</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Calender10() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center p-[2px] relative rounded-[2px] shrink-0 size-[16px]" data-name="Calender">
      <div className="flex flex-col font-['Font_Awesome_6_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a626f] text-[12px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">{`Calendar `}</p>
      </div>
    </div>
  );
}

function Calender11() {
  return (
    <div className="bg-[#f6f9fc] box-border content-stretch flex flex-col gap-[10px] h-[16px] items-center justify-center p-[2px] relative rounded-[2px] shrink-0" data-name="Calender">
      <div className="flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#5a626f] text-[10px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">Tag</p>
      </div>
    </div>
  );
}

function Input9() {
  return (
    <div className="bg-[#e5f9ea] relative rounded-[4px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#009926] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center px-[8px] py-[6px] relative w-full">
          <div className="basis-0 flex flex-col font-['Roboto:Regular',sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[#3d3d3d] text-[12px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[normal]">{`$900 `}</p>
          </div>
          <Calender10 />
          <Calender11 />
          <div className="flex flex-col font-['Font_Awesome_6_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#00bf30] text-[12px] text-nowrap">
            <p className="leading-[normal] whitespace-pre">circle-check</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Calender12() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center p-[2px] relative rounded-[2px] shrink-0 size-[16px]" data-name="Calender">
      <div className="flex flex-col font-['Font_Awesome_6_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a626f] text-[10px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">{`Calendar `}</p>
      </div>
    </div>
  );
}

function Input10() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#72cdf4] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center px-[8px] py-[6px] relative w-full">
          <div className="basis-0 flex flex-col font-['Roboto:Regular',sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[#3d3d3d] text-[12px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[normal]">{`$900| `}</p>
          </div>
          <Calender12 />
          <div className="flex flex-col font-['Font_Awesome_6_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a626f] text-[12px] text-nowrap">
            <p className="leading-[normal] whitespace-pre">Icons</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Calender13() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center p-[2px] relative rounded-[2px] shrink-0 size-[16px]" data-name="Calender">
      <div className="flex flex-col font-['Font_Awesome_6_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a626f] text-[10px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">{`Calendar `}</p>
      </div>
    </div>
  );
}

function Input11() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#da1f2c] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center px-[8px] py-[6px] relative w-full">
          <div className="basis-0 flex flex-col font-['Roboto:Regular',sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[#3d3d3d] text-[12px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[normal]">{`$900| `}</p>
          </div>
          <Calender13 />
          <div className="flex flex-col font-['Font_Awesome_6_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#da1f2c] text-[12px] text-nowrap">
            <p className="leading-[normal] whitespace-pre">{`circle-exclamation `}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Calender14() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] h-[16px] items-center justify-center p-[2px] relative rounded-[2px] shrink-0" data-name="Calender">
      <div className="flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#5a626f] text-[10px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">Ignore</p>
      </div>
    </div>
  );
}

function Input12() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#ffa300] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center px-[8px] py-[6px] relative w-full">
          <div className="basis-0 flex flex-col font-['Roboto:Regular',sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[#3d3d3d] text-[12px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[normal]">{`$900| `}</p>
          </div>
          <Calender14 />
          <div className="flex flex-col font-['Font_Awesome_6_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#ffa300] text-[12px] text-nowrap">
            <p className="leading-[normal] whitespace-pre">triangle-exclamation</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Calender15() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center p-[2px] relative rounded-[2px] shrink-0 size-[16px]" data-name="Calender">
      <div className="flex flex-col font-['Font_Awesome_6_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a626f] text-[12px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">{`Calendar `}</p>
      </div>
    </div>
  );
}

function Calender16() {
  return (
    <div className="bg-[#f6f9fc] box-border content-stretch flex flex-col gap-[10px] h-[16px] items-center justify-center p-[2px] relative rounded-[2px] shrink-0" data-name="Calender">
      <div className="flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#5a626f] text-[10px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">Tag</p>
      </div>
    </div>
  );
}

function Input13() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#00bf30] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center px-[8px] py-[6px] relative w-full">
          <div className="basis-0 flex flex-col font-['Roboto:Regular',sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[#3d3d3d] text-[12px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[normal]">{`$900| `}</p>
          </div>
          <Calender15 />
          <Calender16 />
          <div className="flex flex-col font-['Font_Awesome_6_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#00bf30] text-[12px] text-nowrap">
            <p className="leading-[normal] whitespace-pre">circle-check</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Inputs() {
  return (
    <div className="bg-white relative size-full" data-name="Inputs">
      <div className="absolute content-stretch flex flex-col items-start left-[20px] top-[20px]" data-name="Exception Inputs">
        <div className="content-stretch flex flex-col items-start relative rounded-[4px] shrink-0 w-[222px]" data-name="Base Input Component Selected">
          <Input />
        </div>
      </div>
      <div className="absolute content-stretch flex flex-col items-start left-[260px] top-[20px]" data-name="Exception Inputs">
        <div className="content-stretch flex flex-col items-start relative rounded-[4px] shrink-0 w-[222px]" data-name="Base Input Component Selected">
          <Input1 />
        </div>
      </div>
      <div className="absolute content-stretch flex flex-col items-start left-[502px] top-[20px]" data-name="Exception Inputs">
        <div className="content-stretch flex flex-col items-start relative rounded-[4px] shrink-0 w-[222px]" data-name="Base Input Component Selected">
          <Input2 />
        </div>
      </div>
      <div className="absolute content-stretch flex flex-col items-start left-[742px] top-[20px]" data-name="Exception Inputs">
        <div className="content-stretch flex flex-col items-start relative rounded-[4px] shrink-0 w-[222px]" data-name="Base Input Component Selected">
          <Input3 />
        </div>
      </div>
      <div className="absolute content-stretch flex flex-col items-start left-[992px] top-[20px]" data-name="Exception Inputs">
        <div className="content-stretch flex flex-col items-start relative rounded-[4px] shrink-0 w-[222px]" data-name="Base Input Component Selected">
          <Input4 />
        </div>
      </div>
      <div className="absolute box-border content-stretch flex flex-col items-start left-[20px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.15)] top-[63px]" data-name="Exception Inputs">
        <div className="content-stretch flex flex-col items-start relative rounded-[4px] shrink-0 w-[222px]" data-name="Base Input Component Selected">
          <Input5 />
        </div>
      </div>
      <div className="absolute box-border content-stretch flex flex-col items-start left-[260px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.15)] top-[63px]" data-name="Exception Inputs">
        <div className="content-stretch flex flex-col items-start relative rounded-[4px] shrink-0 w-[222px]" data-name="Base Input Component Selected">
          <Input6 />
        </div>
      </div>
      <div className="absolute box-border content-stretch flex flex-col items-start left-[502px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.15)] top-[63px]" data-name="Exception Inputs">
        <div className="content-stretch flex flex-col items-start relative rounded-[4px] shrink-0 w-[222px]" data-name="Base Input Component Selected">
          <Input7 />
        </div>
      </div>
      <div className="absolute box-border content-stretch flex flex-col items-start left-[742px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.15)] top-[63px]" data-name="Exception Inputs">
        <div className="content-stretch flex flex-col items-start relative rounded-[4px] shrink-0 w-[222px]" data-name="Base Input Component Selected">
          <Input8 />
        </div>
      </div>
      <div className="absolute box-border content-stretch flex flex-col items-start left-[992px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.15)] top-[63px]" data-name="Exception Inputs">
        <div className="content-stretch flex flex-col items-start relative rounded-[4px] shrink-0 w-[222px]" data-name="Base Input Component Selected">
          <Input9 />
        </div>
      </div>
      <div className="absolute content-stretch flex flex-col items-start left-[20px] top-[105px]" data-name="Exception Inputs">
        <div className="content-stretch flex flex-col items-start relative rounded-[4px] shrink-0 w-[222px]" data-name="Base Input Component Selected">
          <div aria-hidden="true" className="absolute border-2 border-[#e2e6eb] border-solid inset-[-2px] pointer-events-none rounded-[6px]" />
          <Input10 />
        </div>
      </div>
      <div className="absolute content-stretch flex flex-col items-start left-[260px] top-[105px]" data-name="Exception Inputs">
        <div className="content-stretch flex flex-col items-start relative rounded-[4px] shrink-0 w-[222px]" data-name="Base Input Component Selected">
          <div aria-hidden="true" className="absolute border-2 border-[#e2e6eb] border-solid inset-[-2px] pointer-events-none rounded-[6px]" />
          <Input11 />
        </div>
      </div>
      <div className="absolute content-stretch flex flex-col items-start left-[502px] top-[105px]" data-name="Exception Inputs">
        <div className="content-stretch flex flex-col items-start relative rounded-[4px] shrink-0 w-[222px]" data-name="Base Input Component Selected">
          <div aria-hidden="true" className="absolute border-2 border-[#e2e6eb] border-solid inset-[-2px] pointer-events-none rounded-[6px]" />
          <Input12 />
        </div>
      </div>
      <div className="absolute content-stretch flex flex-col items-start left-[992px] top-[105px]" data-name="Exception Inputs">
        <div className="content-stretch flex flex-col items-start relative rounded-[4px] shrink-0 w-[222px]" data-name="Base Input Component Selected">
          <div aria-hidden="true" className="absolute border-2 border-[#e2e6eb] border-solid inset-[-2px] pointer-events-none rounded-[6px]" />
          <Input13 />
        </div>
      </div>
    </div>
  );
}