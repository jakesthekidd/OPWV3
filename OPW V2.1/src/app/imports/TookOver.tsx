import svgPaths from "./svg-ykn36bvzs6";

function Circle() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[10px] items-center justify-center p-[10px] relative rounded-[29px] shrink-0 size-[32px]" data-name="circle">
      <div aria-hidden="true" className="absolute border-2 border-[#ffa300] border-solid inset-0 pointer-events-none rounded-[29px]" />
      <p className="font-['Roboto:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[#664100] text-[14px] text-center text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        JC
      </p>
    </div>
  );
}

function Frame427322071() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative rounded-[30px] shrink-0">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(255,163,0,0.25)] border-solid inset-[-2px] pointer-events-none rounded-[32px]" />
      <Circle />
    </div>
  );
}

function LastAcessed() {
  return (
    <div className="content-stretch flex gap-[8px] h-[32px] items-center opacity-0 relative shrink-0" data-name="Last acessed">
      <Frame427322071 />
    </div>
  );
}

function Frame427321993() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
      <p className="font-['Roboto:Bold',_sans-serif] font-bold leading-[normal] relative shrink-0 text-[32px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        LD-444444444
      </p>
      <LastAcessed />
    </div>
  );
}

function Frame290266() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0">
      <Frame427321993 />
    </div>
  );
}

function Frame290267() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start min-h-px min-w-px relative shrink-0">
      <Frame290266 />
    </div>
  );
}

function BlueDropDown() {
  return (
    <div className="bg-[#2474bb] box-border content-stretch flex gap-[8px] items-center px-[2px] py-[4px] relative rounded-[2px] shrink-0" data-name="Blue drop down">
      <p className="font-['Font_Awesome_6_Free:Solid',_sans-serif] leading-[normal] not-italic relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre">angle-down</p>
    </div>
  );
}

function Frame427321952() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <p className="font-['Font_Awesome_6_Free:Solid',_sans-serif] leading-[normal] not-italic relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre">arrow-left</p>
      <p className="font-['Roboto:Bold',_sans-serif] font-bold leading-[normal] relative shrink-0 text-[12px] text-nowrap text-right text-white whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Previous
      </p>
      <p className="font-['Roboto:Bold',_sans-serif] font-bold leading-[normal] relative shrink-0 text-[12px] text-nowrap text-right text-white whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        |
      </p>
      <BlueDropDown />
    </div>
  );
}

function PreviousButton() {
  return (
    <div className="bg-[#2474bb] box-border content-stretch flex flex-col gap-[10px] h-[32px] items-start justify-center p-[10px] relative rounded-bl-[4px] rounded-tl-[4px] shrink-0" data-name="Previous button">
      <div aria-hidden="true" className="absolute border-[1px_0px_1px_1px] border-solid border-white inset-0 pointer-events-none rounded-bl-[4px] rounded-tl-[4px]" />
      <Frame427321952 />
    </div>
  );
}

function WhiteDropDown() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[8px] items-center px-[2px] py-[4px] relative rounded-[2px] shrink-0" data-name="white drop-down">
      <p className="font-['Font_Awesome_6_Free:Solid',_sans-serif] leading-[normal] not-italic relative shrink-0 text-[#2474bb] text-[14px] text-nowrap whitespace-pre">angle-down</p>
    </div>
  );
}

function Frame427321953() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end relative shrink-0 w-full">
      <WhiteDropDown />
      <p className="font-['Roboto:Bold',_sans-serif] font-bold leading-[normal] relative shrink-0 text-[#c6ccd6] text-[12px] text-nowrap text-right whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        |
      </p>
      <p className="font-['Roboto:Bold',_sans-serif] font-bold leading-[normal] relative shrink-0 text-[#2474bb] text-[12px] text-nowrap text-right whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Next
      </p>
      <p className="font-['Font_Awesome_6_Free:Solid',_sans-serif] leading-[normal] not-italic relative shrink-0 text-[#2474bb] text-[14px] text-nowrap whitespace-pre">arrow-right</p>
    </div>
  );
}

function NextButton() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-[10px] h-[32px] items-start justify-center p-[10px] relative rounded-br-[4px] rounded-tr-[4px] shrink-0" data-name="Next button">
      <Frame427321953 />
    </div>
  );
}

function PreviousNextButton() {
  return (
    <div className="content-stretch flex items-center relative rounded-bl-[4px] rounded-tl-[4px] shrink-0 w-full" data-name="Previous-next Button">
      <PreviousButton />
      <NextButton />
    </div>
  );
}

function PreviousNextButton1() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[226px]" data-name="previous/next button">
      <PreviousNextButton />
    </div>
  );
}

function Frame290289() {
  return (
    <div className="content-stretch flex gap-[24px] h-[34px] items-center justify-end relative shrink-0">
      <PreviousNextButton1 />
      <p className="font-['Font_Awesome_6_Free:Solid',_sans-serif] leading-[normal] not-italic relative shrink-0 text-[32px] text-nowrap text-right text-white whitespace-pre">times-circle</p>
    </div>
  );
}

function Header1() {
  return (
    <div className="bg-[#2474bb] relative shrink-0 w-full z-[3]" data-name="Header 1">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="box-border content-stretch flex gap-[40px] items-center justify-end p-[16px] relative w-full">
          <Frame290267 />
          <Frame290289 />
        </div>
      </div>
    </div>
  );
}

function Frame427322102() {
  return (
    <div className="content-stretch flex gap-[8px] items-center leading-[normal] relative shrink-0 text-[12px] text-nowrap text-white whitespace-pre">
      <p className="font-['Font_Awesome_6_Free:Solid',_sans-serif] not-italic relative shrink-0 text-center">location-dot</p>
      <p className="font-['Roboto:Regular',_sans-serif] font-normal relative shrink-0 text-center" style={{ fontVariationSettings: "'wdth' 100" }}>
        Phoenix, AZ
      </p>
      <p className="font-['Font_Awesome_6_Free:Solid',_sans-serif] not-italic relative shrink-0 text-center">arrow-right</p>
      <p className="font-['Roboto:Regular',_sans-serif] font-normal relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        Nashville, TN
      </p>
    </div>
  );
}

function Frame427322115() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-center justify-center relative rounded-[2px] shrink-0 size-[19px]">
      <div className="flex flex-col font-['Font_Awesome_6_Free:Solid',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-nowrap text-white">
        <p className="leading-[normal] whitespace-pre">thumbtack</p>
      </div>
    </div>
  );
}

function Frame427321890() {
  return (
    <div className="content-stretch flex gap-[4px] items-center leading-[0] relative shrink-0 text-nowrap text-white">
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center opacity-70 relative shrink-0 text-[12px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] text-nowrap whitespace-pre">{`Invoice Date `}</p>
      </div>
      <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center relative shrink-0 text-[16px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] text-nowrap whitespace-pre">2025/04/05</p>
      </div>
    </div>
  );
}

function Frame427321889() {
  return (
    <div className="content-stretch flex gap-[4px] items-center leading-[0] relative shrink-0 text-nowrap text-white">
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center opacity-70 relative shrink-0 text-[12px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] text-nowrap whitespace-pre">Delivered Date</p>
      </div>
      <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center relative shrink-0 text-[16px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] text-nowrap whitespace-pre">2025/04/04</p>
      </div>
    </div>
  );
}

function Frame427321888() {
  return (
    <div className="content-stretch flex gap-[4px] items-center leading-[0] relative shrink-0 text-nowrap text-white">
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center opacity-70 relative shrink-0 text-[12px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] text-nowrap whitespace-pre">{`Shipment Status `}</p>
      </div>
      <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center relative shrink-0 text-[16px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] text-nowrap whitespace-pre">{`Delivered `}</p>
      </div>
    </div>
  );
}

function Frame427321891() {
  return (
    <div className="content-stretch flex gap-[4px] items-center leading-[0] relative shrink-0 text-nowrap text-white">
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center opacity-70 relative shrink-0 text-[12px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] text-nowrap whitespace-pre">Title</p>
      </div>
      <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center relative shrink-0 text-[16px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] text-nowrap whitespace-pre">{`Value `}</p>
      </div>
    </div>
  );
}

function Frame427322101() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <Frame427322115 />
      <Frame427321890 />
      <div className="flex flex-row items-center self-stretch">
        <div className="flex h-full items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "19", "--transform-inner-height": "19" } as React.CSSProperties}>
          <div className="flex-none h-full rotate-[90deg]">
            <div className="h-full relative w-[19px]">
              <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 1">
                  <line id="Line 363" stroke="var(--stroke-0, white)" strokeLinecap="round" x1="0.5" x2="18.5" y1="0.5" y2="0.5" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Frame427321889 />
      <div className="flex flex-row items-center self-stretch">
        <div className="flex h-full items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "19", "--transform-inner-height": "19" } as React.CSSProperties}>
          <div className="flex-none h-full rotate-[90deg]">
            <div className="h-full relative w-[19px]">
              <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 1">
                  <line id="Line 363" stroke="var(--stroke-0, white)" strokeLinecap="round" x1="0.5" x2="18.5" y1="0.5" y2="0.5" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Frame427321888 />
      <div className="flex flex-row items-center self-stretch">
        <div className="flex h-full items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "19", "--transform-inner-height": "19" } as React.CSSProperties}>
          <div className="flex-none h-full rotate-[90deg]">
            <div className="h-full relative w-[19px]">
              <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 1">
                  <line id="Line 363" stroke="var(--stroke-0, white)" strokeLinecap="round" x1="0.5" x2="18.5" y1="0.5" y2="0.5" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Frame427321891 />
    </div>
  );
}

function Header2() {
  return (
    <div className="bg-[#1d5d96] box-border content-stretch flex items-center justify-between px-[16px] py-[8px] relative shrink-0 w-[1440px] z-[2]" data-name="Header 2">
      <Frame427322102 />
      <Frame427322101 />
    </div>
  );
}

function Tags() {
  return (
    <div className="bg-[#f8d2d5] box-border content-stretch flex gap-[4px] items-center justify-center px-[8px] py-[2px] relative rounded-[39px] shrink-0" data-name="Tags">
      <div aria-hidden="true" className="absolute border border-[#f0a5ab] border-solid inset-[-1px] pointer-events-none rounded-[40px]" />
      <div className="flex flex-col font-['Font_Awesome_6_Free:Solid',_sans-serif] h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#570c12] text-[12px] text-center w-[12px]">
        <p className="leading-[normal]">{`triangle-exclamation `}</p>
      </div>
      <p className="font-['Roboto:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[#570c12] text-[14px] text-center text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>{` Duplicate Review`}</p>
    </div>
  );
}

function Tags1() {
  return (
    <div className="bg-[#e3f5fd] box-border content-stretch flex gap-[4px] items-center justify-center px-[8px] py-[2px] relative rounded-[39px] shrink-0" data-name="Tags">
      <div aria-hidden="true" className="absolute border border-[#0087ff] border-solid inset-[-1px] pointer-events-none rounded-[40px]" />
      <p className="font-['Font_Awesome_6_Free:Solid',_sans-serif] leading-[normal] not-italic relative shrink-0 text-[#777777] text-[12px] text-center text-nowrap whitespace-pre">server</p>
      <p className="font-['Roboto:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[#777777] text-[14px] text-center text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        QuickPay
      </p>
    </div>
  );
}

function Frame427321987() {
  return (
    <div className="bg-[#174a78] box-border content-stretch flex gap-[8px] h-full items-center px-0 py-[4px] relative rounded-[4px] shrink-0">
      <div className="relative shrink-0 size-[16px]" data-name="Tag">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
          <path d={svgPaths.p12f86d70} fill="var(--fill-0, #FBFCFC)" id="Tag" />
        </svg>
      </div>
      <Tags />
      <Tags1 />
    </div>
  );
}

function Component184() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-center justify-center relative shrink-0 w-[16px]" data-name="Component 184">
      <p className="font-['Font_Awesome_6_Free:Solid',_sans-serif] leading-[normal] not-italic relative shrink-0 text-[14px] text-center text-white w-full">boxes-packing</p>
    </div>
  );
}

function Component187() {
  return (
    <div className="bg-[#174a78] box-border content-stretch flex gap-[2px] h-[24px] items-center justify-center px-[4px] py-0 relative rounded-[4px] shrink-0" data-name="Component 187">
      <Component184 />
    </div>
  );
}

function Layer1() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[16px]" data-name="Layer_1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Layer_1">
          <path d={svgPaths.pf79700} fill="var(--fill-0, white)" id="Vector" />
          <g id="Group">
            <path d={svgPaths.p17c77a00} fill="var(--fill-0, white)" id="Vector_2" />
            <path d={svgPaths.pb845a00} fill="var(--fill-0, white)" id="Vector_3" />
            <path d={svgPaths.p40e8c80} fill="var(--fill-0, white)" id="Vector_4" />
            <path d={svgPaths.padb7a40} fill="var(--fill-0, white)" id="Vector_5" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Group1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Group">
      <Layer1 />
    </div>
  );
}

function Component185() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center overflow-clip relative shrink-0" data-name="Component 184">
      <Group1 />
    </div>
  );
}

function Component188() {
  return (
    <div className="bg-[#174a78] box-border content-stretch flex gap-[2px] h-[24px] items-center justify-center px-[4px] py-0 relative rounded-[4px] shrink-0" data-name="Component 188">
      <Component185 />
    </div>
  );
}

function Component190() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-center justify-center relative shrink-0 w-[16px]" data-name="Component 184">
      <p className="font-['Font_Awesome_6_Free:Solid',_sans-serif] leading-[normal] not-italic relative shrink-0 text-[16px] text-center text-white w-full">database</p>
    </div>
  );
}

function Component186() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-center justify-center px-0 py-[4px] relative rounded-[4px] shrink-0 size-[24px]" data-name="Component 186">
      <Component190 />
    </div>
  );
}

function Layer2() {
  return (
    <div className="h-[16px] relative shrink-0 w-[13px]" data-name="Layer_1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 16">
        <g clipPath="url(#clip0_11_8452)" id="Layer_1">
          <path d={svgPaths.p103a0d80} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p2bc3400} fill="var(--fill-0, white)" id="Vector_2" />
          <path d={svgPaths.p1cef900} fill="var(--fill-0, white)" id="Vector_3" />
          <path d={svgPaths.pcad8580} fill="var(--fill-0, white)" id="Vector_4" />
          <path d={svgPaths.p3303e20} fill="var(--fill-0, white)" id="Vector_5" />
          <path d={svgPaths.p314cf880} fill="var(--fill-0, white)" id="Vector_6" />
        </g>
        <defs>
          <clipPath id="clip0_11_8452">
            <rect fill="white" height="16" width="13" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Component191() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-[16px]" data-name="Component 184">
      <Layer2 />
    </div>
  );
}

function Component189() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-center justify-center px-0 py-[4px] relative rounded-[4px] shrink-0 size-[24px]" data-name="Component 189">
      <Component191 />
    </div>
  );
}

function Frame427322104() {
  return (
    <div className="content-stretch flex gap-[8px] h-full items-center relative shrink-0">
      <Component187 />
      <div className="flex h-full items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "28", "--transform-inner-height": "28" } as React.CSSProperties}>
        <div className="flex-none h-full rotate-[90deg]">
          <div className="h-full relative w-[28px]">
            <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 1">
                <line id="Line 361" stroke="var(--stroke-0, white)" strokeLinecap="round" x1="0.5" x2="27.5" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Component188 />
      <Component186 />
      <Component189 />
    </div>
  );
}

function Frame427321967() {
  return (
    <div className="basis-0 content-stretch flex grow items-center justify-between min-h-px min-w-px relative shrink-0">
      <div className="flex flex-row items-center self-stretch">
        <Frame427321987 />
      </div>
      <div className="flex flex-row items-center self-stretch">
        <Frame427322104 />
      </div>
    </div>
  );
}

function Header3() {
  return (
    <div className="box-border content-stretch flex gap-[10px] h-[154px] items-start px-[16px] py-[8px] relative shrink-0 w-[1440px] z-[1]" data-name="Header 3" style={{ backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%), linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%), linear-gradient(90deg, rgb(36, 116, 187) 0%, rgb(36, 116, 187) 100%)" }}>
      <Frame427321967 />
    </div>
  );
}

function Headers() {
  return (
    <div className="content-stretch flex flex-col isolate items-start relative shrink-0 w-full z-[2]" data-name="Headers">
      <Header1 />
      <Header2 />
      <Header3 />
    </div>
  );
}

function Upload() {
  return (
    <div className="absolute content-stretch flex flex-col h-[1024px] isolate items-start left-0 top-0 w-[1440px]" data-name="Upload">
      <Headers />
      <div className="basis-0 flex grow items-center justify-center min-h-px min-w-px relative shrink-0 w-full z-[1]">
        <div className="flex-none scale-y-[-100%] size-full">
          <div className="bg-[#f2f2f2] size-full" data-name="Client Block" />
        </div>
      </div>
    </div>
  );
}

function Component80FinalIcons() {
  return (
    <div className="absolute h-[16px] left-0 top-0 w-[12.364px]" data-name="8.0 Final Icons">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 16">
        <g id="8.0 Final Icons ">
          <g id="Union">
            <path d={svgPaths.p372a2070} fill="var(--fill-0, #DA1F2C)" />
            <path d={svgPaths.p1a044400} fill="var(--fill-0, #DA1F2C)" />
            <path clipRule="evenodd" d={svgPaths.p1e33da00} fill="var(--fill-0, #DA1F2C)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function ExceptionIconsDocIcons() {
  return (
    <div className="h-[16px] relative shrink-0 w-[12.26px]" data-name="Exception Icons  & Doc Icons">
      <Component80FinalIcons />
    </div>
  );
}

function Frame427322099() {
  return (
    <div className="basis-0 content-stretch flex gap-[7px] grow items-center min-h-px min-w-px relative shrink-0">
      <ExceptionIconsDocIcons />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3d3d3d] text-[12px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">Missing Documents</p>
      </div>
      <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#3d3d3d] text-[13px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">1</p>
      </div>
    </div>
  );
}

function ExceptionIconsDocIcons1() {
  return (
    <div className="h-[16px] relative shrink-0 w-[12.26px]" data-name="Exception Icons  & Doc Icons">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 16">
        <g id="Exception Icons  & Doc Icons ">
          <g id="Unclassified ">
            <path d={svgPaths.p1dbc9480} fill="var(--fill-0, #9747FF)" />
            <path d={svgPaths.p2f9aca00} fill="var(--fill-0, #9747FF)" />
            <path d={svgPaths.p3f26300} fill="var(--fill-0, #9747FF)" />
            <path d={svgPaths.p1553b740} fill="var(--fill-0, #9747FF)" />
            <path d={svgPaths.p3a8f5000} fill="var(--fill-0, #9747FF)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame427322097() {
  return (
    <div className="basis-0 content-stretch flex gap-[7px] grow items-center min-h-px min-w-px relative shrink-0">
      <ExceptionIconsDocIcons1 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3d3d3d] text-[12px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">Unclassified documents</p>
      </div>
      <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#3d3d3d] text-[13px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">1</p>
      </div>
    </div>
  );
}

function ExceptionIconsDocIcons2() {
  return (
    <div className="h-[16px] relative shrink-0 w-[15.334px]" data-name="Exception Icons  & Doc Icons">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Exception Icons  & Doc Icons ">
          <g id="Correct">
            <path d={svgPaths.p2cf56c00} fill="var(--fill-0, #FF5C00)" />
            <path d={svgPaths.p30c9700} fill="var(--fill-0, #FF5C00)" />
            <path d={svgPaths.p37ed0900} fill="var(--fill-0, #FF5C00)" />
            <path d={svgPaths.pb9a1d80} fill="var(--fill-0, #FF5C00)" />
            <path clipRule="evenodd" d={svgPaths.p305b4e00} fill="var(--fill-0, #FF5C00)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.pfe41d00} fill="var(--fill-0, #FF5C00)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p16219cc0} fill="var(--fill-0, #FF5C00)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame427322098() {
  return (
    <div className="basis-0 content-stretch flex gap-[7px] grow items-center min-h-px min-w-px relative shrink-0">
      <ExceptionIconsDocIcons2 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3d3d3d] text-[12px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">{`Field Exceptions `}</p>
      </div>
      <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#3d3d3d] text-[13px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">3</p>
      </div>
    </div>
  );
}

function ExceptionSummery() {
  return (
    <div className="bg-[#fbfcfc] h-[40px] relative shrink-0 w-full z-[19]" data-name="Exception Summery">
      <div aria-hidden="true" className="absolute border-[#eff2f4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-px h-[40px] items-center px-[8px] py-[4px] relative w-full">
          <Frame427322099 />
          <Frame427322097 />
          <Frame427322098 />
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none shadow-[0px_-2px_2px_0px_inset_rgba(0,0,0,0.06)]" />
    </div>
  );
}

function RadioButtnAndCheckBox16() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Radio Buttn and Check Box  16">
      <div className="bg-white relative rounded-[1px] shrink-0 size-[16px]">
        <div aria-hidden="true" className="absolute border border-[#e2e6eb] border-solid inset-0 pointer-events-none rounded-[1px]" />
      </div>
    </div>
  );
}

function RadioButtnAndCheckBox17() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Radio Buttn and Check Box  16">
      <RadioButtnAndCheckBox16 />
    </div>
  );
}

function Frame427321634() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <RadioButtnAndCheckBox17 />
    </div>
  );
}

function Frame427321822() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-px h-full items-center justify-center mr-[-1px] px-[8px] py-[4px] relative shrink-0 w-[67px] z-[6]">
      <div aria-hidden="true" className="absolute border-[#eff2f4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Frame427321634 />
    </div>
  );
}

function Frame427321825() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[10px] h-full items-center mr-[-1px] pl-0 pr-[10px] py-[4px] relative shrink-0 w-[121px] z-[5]">
      <div aria-hidden="true" className="absolute border-[#eff2f4] border-[0px_1px_1px_0px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Roboto:SemiBold',_sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#123b60] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">{`Fields `}</p>
      </div>
    </div>
  );
}

function Frame427321820() {
  return (
    <div className="basis-0 bg-white grow h-full min-h-px min-w-px mr-[-1px] relative shrink-0 z-[4]">
      <div aria-hidden="true" className="absolute border-[#eff2f4] border-[0px_1px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[19px] items-center justify-center px-[8px] py-[4px] relative size-full">
          <div className="flex flex-col font-['Roboto:SemiBold',_sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#123b60] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[normal] whitespace-pre">{`Expected `}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame427321819() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0">
      <div className="flex flex-col font-['Roboto:SemiBold',_sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#123b60] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">{`Evaluated `}</p>
      </div>
    </div>
  );
}

function Frame427321823() {
  return (
    <div className="basis-0 bg-white grow h-full min-h-px min-w-px mr-[-1px] relative shrink-0 z-[1]">
      <div aria-hidden="true" className="absolute border-[#eff2f4] border-[0px_0px_1px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[19px] items-center justify-center px-[8px] py-[4px] relative size-full">
          <Frame427321819 />
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="box-border content-stretch flex h-[40px] isolate items-center pl-0 pr-px py-0 relative shrink-0 w-full z-[13]" data-name="Header">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-black border-solid inset-0 pointer-events-none" />
      <Frame427321822 />
      <Frame427321825 />
      <Frame427321820 />
      <Frame427321823 />
    </div>
  );
}

function RadioButtnAndCheckBox18() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Radio Buttn and Check Box  16">
      <div className="bg-white relative rounded-[1px] shrink-0 size-[16px]">
        <div aria-hidden="true" className="absolute border border-[#8d9aae] border-solid inset-0 pointer-events-none rounded-[1px]" />
      </div>
    </div>
  );
}

function RadioButtnAndCheckBox19() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Radio Buttn and Check Box  16">
      <RadioButtnAndCheckBox18 />
    </div>
  );
}

function Start() {
  return (
    <div className="box-border content-stretch flex gap-[10px] h-full items-center justify-center px-0 py-[10px] relative shrink-0 w-[67px]" data-name="Start">
      <div aria-hidden="true" className="absolute border-[#72cdf4] border-[0px_0px_0px_4px] border-solid inset-0 pointer-events-none" />
      <RadioButtnAndCheckBox19 />
    </div>
  );
}

function Frame427321824() {
  return (
    <div className="basis-0 grow h-[38px] min-h-px min-w-px relative shrink-0">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[10px] h-[38px] items-center pl-0 pr-[10px] py-[10px] relative w-full">
          <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#174a78] text-[16px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[normal] whitespace-pre">{`Invoice `}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Context() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center p-[2px] relative rounded-[2px] shrink-0" data-name="context">
      <div className="flex flex-col font-['Font_Awesome_6_Free:Solid',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#2068a8] text-[16px] text-center w-full">
        <p className="leading-[normal]">ellipsis-vertical</p>
      </div>
    </div>
  );
}

function DocumentHeader() {
  return (
    <div className="bg-[#f7f8f9] h-[44px] relative shrink-0 w-full z-[12]" data-name="Document Header">
      <div aria-hidden="true" className="absolute border-[#c6ccd6] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[44px] items-center pl-0 pr-[16px] py-0 relative w-full">
          <Start />
          <Frame427321824 />
          <Context />
        </div>
      </div>
    </div>
  );
}

function Frame427321826() {
  return <div className="box-border content-stretch flex gap-[10px] h-[38px] items-center justify-center px-0 py-[10px] shrink-0 w-[67px]" />;
}

function Frame427321827() {
  return (
    <div className="box-border content-stretch flex gap-[10px] h-[38px] items-center pl-0 pr-[10px] py-[10px] relative shrink-0 w-[121px]">
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3d3d3d] text-[12px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">{`Total `}</p>
      </div>
    </div>
  );
}

function Frame427321958() {
  return (
    <div className="content-stretch flex gap-[4px] items-start leading-[0] relative shrink-0 text-[#3d3d3d] text-[10px] text-center text-nowrap w-full">
      <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] text-nowrap whitespace-pre">Range:</p>
      </div>
      <div className="flex flex-col font-['Roboto:Light',_sans-serif] font-light justify-center relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] text-nowrap whitespace-pre">$800 -$900</p>
      </div>
    </div>
  );
}

function Frame427321957() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[2px] grow items-start justify-center min-h-px min-w-px relative shrink-0">
      <div className="flex flex-col font-['Roboto:Light',_sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[#3d3d3d] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">$900</p>
      </div>
      <Frame427321958 />
    </div>
  );
}

function Frame427321821() {
  return (
    <div className="basis-0 content-stretch flex gap-[4px] grow items-center justify-center min-h-px min-w-px relative shrink-0">
      <Frame427321957 />
    </div>
  );
}

function Frame427321828() {
  return (
    <div className="basis-0 grow h-[38px] min-h-px min-w-px relative shrink-0">
      <div aria-hidden="true" className="absolute border-[#e2e6eb] border-[0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[19px] h-[38px] items-center justify-center px-[8px] py-[4px] relative w-full">
          <Frame427321821 />
        </div>
      </div>
    </div>
  );
}

function Inputs() {
  return (
    <div className="basis-0 bg-[#e5f9ea] grow min-h-px min-w-px relative rounded-[4px] shrink-0" data-name="Inputs">
      <div aria-hidden="true" className="absolute border border-[#00bf30] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[10px] items-center leading-[0] px-[8px] py-[4px] relative text-[12px] w-full">
          <div className="basis-0 flex flex-col font-['Roboto:Regular',_sans-serif] font-normal grow justify-center min-h-px min-w-px relative shrink-0 text-[#3d3d3d]" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[normal]">$900</p>
          </div>
          <div className="flex flex-col font-['Font_Awesome_6_Free:Solid',_sans-serif] justify-center not-italic relative shrink-0 text-[#00bf30] text-nowrap">
            <p className="leading-[normal] whitespace-pre">circle-check</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame427321829() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center px-[8px] py-[4px] relative size-full">
          <Inputs />
        </div>
      </div>
    </div>
  );
}

function TableComponents() {
  return (
    <div className="bg-white content-stretch flex h-[42px] items-center relative shrink-0 w-full z-[11]" data-name="Table components">
      <div aria-hidden="true" className="absolute border-[#c6ccd6] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Frame427321826 />
      <Frame427321827 />
      <Frame427321828 />
      <Frame427321829 />
    </div>
  );
}

function Frame427321830() {
  return <div className="box-border content-stretch flex gap-[10px] h-[38px] items-center justify-center px-0 py-[10px] shrink-0 w-[67px]" />;
}

function Frame427321831() {
  return (
    <div className="box-border content-stretch flex gap-[10px] h-[38px] items-center pl-0 pr-[10px] py-[10px] relative shrink-0 w-[121px]">
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3d3d3d] text-[12px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">Carrier</p>
      </div>
    </div>
  );
}

function Frame427321832() {
  return (
    <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0">
      <div className="basis-0 flex flex-col font-['Roboto:Light',_sans-serif] font-light grow justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[#3d3d3d] text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal]">{`Swift `}</p>
      </div>
    </div>
  );
}

function Frame427321833() {
  return (
    <div className="basis-0 grow h-[38px] min-h-px min-w-px relative shrink-0">
      <div aria-hidden="true" className="absolute border-[#e2e6eb] border-[0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[19px] h-[38px] items-center px-[8px] py-[4px] relative w-full">
          <Frame427321832 />
        </div>
      </div>
    </div>
  );
}

function Inputs1() {
  return (
    <div className="basis-0 bg-[#e5f9ea] grow min-h-px min-w-px relative rounded-[4px] shrink-0" data-name="Inputs">
      <div aria-hidden="true" className="absolute border border-[#00bf30] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[10px] items-center leading-[0] px-[8px] py-[4px] relative text-[12px] w-full">
          <div className="basis-0 flex flex-col font-['Roboto:Regular',_sans-serif] font-normal grow justify-center min-h-px min-w-px relative shrink-0 text-[#3d3d3d]" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[normal]">{`Swift `}</p>
          </div>
          <div className="flex flex-col font-['Font_Awesome_6_Free:Solid',_sans-serif] justify-center not-italic relative shrink-0 text-[#00bf30] text-nowrap">
            <p className="leading-[normal] whitespace-pre">circle-check</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame427321834() {
  return (
    <div className="basis-0 grow h-[38px] min-h-px min-w-px relative shrink-0">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[38px] items-center px-[8px] py-[4px] relative w-full">
          <Inputs1 />
        </div>
      </div>
    </div>
  );
}

function TableComponents1() {
  return (
    <div className="bg-white content-stretch flex h-[42px] items-center relative shrink-0 w-full z-10" data-name="Table components">
      <div aria-hidden="true" className="absolute border-[#c6ccd6] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Frame427321830 />
      <Frame427321831 />
      <Frame427321833 />
      <Frame427321834 />
    </div>
  );
}

function Frame427321835() {
  return <div className="box-border content-stretch flex gap-[10px] h-[38px] items-center justify-center px-0 py-[10px] shrink-0 w-[67px]" />;
}

function Frame427321836() {
  return (
    <div className="box-border content-stretch flex gap-[10px] h-[38px] items-center pl-0 pr-[10px] py-[10px] relative shrink-0 w-[121px]">
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3d3d3d] text-[12px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">{`Invoice number `}</p>
      </div>
    </div>
  );
}

function Arrow() {
  return (
    <div className="bg-white relative rounded-[3px] shrink-0 size-[22px]" data-name="Arrow">
      <div className="overflow-clip relative rounded-[inherit] size-[22px]">
        <div className="absolute flex flex-col font-['Font_Awesome_6_Free:Solid',_sans-serif] justify-center leading-[0] left-[4px] not-italic text-[#2474bb] text-[14px] top-[11px] translate-y-[-50%] w-[14px]">
          <p className="leading-[normal]">arrow-right</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#2474bb] border-[0.6px] border-solid inset-0 pointer-events-none rounded-[3px]" />
    </div>
  );
}

function Frame427321837() {
  return (
    <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0">
      <div className="basis-0 flex flex-col font-['Roboto:Light',_sans-serif] font-light grow justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[#3d3d3d] text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal]">1234567</p>
      </div>
      <Arrow />
    </div>
  );
}

function Frame427321838() {
  return (
    <div className="basis-0 grow h-[38px] min-h-px min-w-px relative shrink-0">
      <div aria-hidden="true" className="absolute border-[#e2e6eb] border-[0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[19px] h-[38px] items-center px-[8px] py-[4px] relative w-full">
          <Frame427321837 />
        </div>
      </div>
    </div>
  );
}

function Inputs2() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[4px] shrink-0" data-name="Inputs">
      <div aria-hidden="true" className="absolute border border-[#da1f2c] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[10px] items-center leading-[0] px-[8px] py-[4px] relative text-[12px] w-full">
          <div className="basis-0 flex flex-col font-['Roboto:Regular',_sans-serif] font-normal grow justify-center min-h-px min-w-px relative shrink-0 text-[#3d3d3d]" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[normal]">{`Swift `}</p>
          </div>
          <div className="flex flex-col font-['Font_Awesome_6_Free:Solid',_sans-serif] justify-center not-italic relative shrink-0 text-[#da1f2c] text-nowrap">
            <p className="leading-[normal] whitespace-pre">{`circle-exclamation `}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame427321839() {
  return (
    <div className="basis-0 grow h-[38px] min-h-px min-w-px relative shrink-0">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[38px] items-center px-[8px] py-[4px] relative w-full">
          <Inputs2 />
        </div>
      </div>
    </div>
  );
}

function TableComponents2() {
  return (
    <div className="bg-white content-stretch flex h-[42px] items-center relative shrink-0 w-full z-[9]" data-name="Table components">
      <div aria-hidden="true" className="absolute border-[#c6ccd6] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Frame427321835 />
      <Frame427321836 />
      <Frame427321838 />
      <Frame427321839 />
    </div>
  );
}

function Frame427321840() {
  return <div className="box-border content-stretch flex gap-[10px] h-[38px] items-center justify-center px-0 py-[10px] shrink-0 w-[67px]" />;
}

function Frame427321841() {
  return (
    <div className="box-border content-stretch flex gap-[10px] h-[38px] items-center pl-0 pr-[10px] py-[10px] relative shrink-0 w-[121px]">
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3d3d3d] text-[12px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">{`Invoice Date `}</p>
      </div>
    </div>
  );
}

function Arrow1() {
  return (
    <div className="bg-white relative rounded-[3px] shrink-0 size-[22px]" data-name="Arrow">
      <div className="overflow-clip relative rounded-[inherit] size-[22px]">
        <div className="absolute flex flex-col font-['Font_Awesome_6_Free:Solid',_sans-serif] justify-center leading-[0] left-[4px] not-italic text-[#2474bb] text-[14px] top-[11px] translate-y-[-50%] w-[14px]">
          <p className="leading-[normal]">arrow-right</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#2474bb] border-[0.6px] border-solid inset-0 pointer-events-none rounded-[3px]" />
    </div>
  );
}

function Frame427321842() {
  return (
    <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0">
      <div className="basis-0 flex flex-col font-['Roboto:Light',_sans-serif] font-light grow justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[#3d3d3d] text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal]">03/31/2025</p>
      </div>
      <Arrow1 />
    </div>
  );
}

function Frame427321843() {
  return (
    <div className="basis-0 grow h-[38px] min-h-px min-w-px relative shrink-0">
      <div aria-hidden="true" className="absolute border-[#e2e6eb] border-[0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[19px] h-[38px] items-center px-[8px] py-[4px] relative w-full">
          <Frame427321842 />
        </div>
      </div>
    </div>
  );
}

function Frame427322060() {
  return (
    <div className="bg-[#f3f5f7] box-border content-stretch flex flex-col gap-[10px] items-center justify-center p-[2px] relative rounded-[4px] shrink-0">
      <div className="flex flex-col font-['Font_Awesome_6_Free:Solid',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a626f] text-[12px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">{`Calendar `}</p>
      </div>
    </div>
  );
}

function Inputs3() {
  return (
    <div className="basis-0 bg-white grow h-[22px] min-h-px min-w-px relative rounded-[4px] shrink-0" data-name="Inputs">
      <div aria-hidden="true" className="absolute border border-[#da1f2c] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[10px] h-[22px] items-center px-[8px] py-[4px] relative w-full">
          <div className="basis-0 flex flex-col font-['Roboto:Regular',_sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[#3d3d3d] text-[12px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[normal]">&nbsp;</p>
          </div>
          <Frame427322060 />
          <div className="flex flex-col font-['Font_Awesome_6_Free:Solid',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#da1f2c] text-[12px] text-nowrap">
            <p className="leading-[normal] whitespace-pre">{`circle-exclamation `}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame427321844() {
  return (
    <div className="basis-0 grow h-[38px] min-h-px min-w-px relative shrink-0">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[38px] items-center px-[8px] py-[4px] relative w-full">
          <Inputs3 />
        </div>
      </div>
    </div>
  );
}

function TableComponents3() {
  return (
    <div className="bg-white content-stretch flex h-[42px] items-center relative shrink-0 w-full z-[8]" data-name="Table components">
      <div aria-hidden="true" className="absolute border-[#c6ccd6] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Frame427321840 />
      <Frame427321841 />
      <Frame427321843 />
      <Frame427321844 />
    </div>
  );
}

function Frame289463() {
  return (
    <div className="bg-[#f3f5f7] h-full relative rounded-[4px] shrink-0">
      <div aria-hidden="true" className="absolute border border-[#e2e6eb] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-full items-center justify-center leading-[normal] px-[16px] py-[14px] relative text-[#5a626f] text-[12px] text-nowrap whitespace-pre">
          <p className="font-['Font_Awesome_6_Free:Solid',_sans-serif] not-italic relative shrink-0">not-equal</p>
          <p className="font-['Roboto:Regular',_sans-serif] font-normal relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            Ignore All
          </p>
        </div>
      </div>
    </div>
  );
}

function Square14() {
  return (
    <div className="content-stretch flex h-[22px] items-center relative shrink-0" data-name="Square  14">
      <Frame289463 />
    </div>
  );
}

function Frame427321845() {
  return (
    <div className="basis-0 grow h-[38px] min-h-px min-w-px relative shrink-0 z-[1]">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[38px] items-center justify-end px-[8px] py-[4px] relative w-full">
          <Square14 />
        </div>
      </div>
    </div>
  );
}

function TableComponents4() {
  return (
    <div className="bg-white content-stretch flex h-[42px] isolate items-center justify-end relative shrink-0 w-full z-[7]" data-name="Table components">
      <div aria-hidden="true" className="absolute border-[#c6ccd6] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))] z-[2]" style={{ "--transform-inner-width": "39", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[90deg]">
          <div className="h-0 relative w-[39px]">
            <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 39 1">
                <line id="Line 360" stroke="var(--stroke-0, #E2E6EB)" x2="39" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Frame427321845 />
    </div>
  );
}

function RadioButtnAndCheckBox28() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Radio Buttn and Check Box  16">
      <div className="bg-white relative rounded-[1px] shrink-0 size-[16px]">
        <div aria-hidden="true" className="absolute border border-[#8d9aae] border-solid inset-0 pointer-events-none rounded-[1px]" />
      </div>
    </div>
  );
}

function RadioButtnAndCheckBox29() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Radio Buttn and Check Box  16">
      <RadioButtnAndCheckBox28 />
    </div>
  );
}

function Start1() {
  return (
    <div className="box-border content-stretch flex gap-[10px] h-full items-center justify-center px-0 py-[10px] relative shrink-0 w-[67px]" data-name="Start">
      <RadioButtnAndCheckBox29 />
    </div>
  );
}

function Frame427321846() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[10px] items-center pl-0 pr-[10px] py-[10px] relative size-full">
          <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#174a78] text-[16px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[normal] whitespace-pre">POD</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Context1() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center p-[2px] relative rounded-[2px] shrink-0" data-name="context">
      <div className="flex flex-col font-['Font_Awesome_6_Free:Solid',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#2068a8] text-[16px] text-center w-full">
        <p className="leading-[normal]">ellipsis-vertical</p>
      </div>
    </div>
  );
}

function TableComponents5() {
  return (
    <div className="bg-[#f7f8f9] h-[44px] relative shrink-0 w-full z-[6]" data-name="Table components">
      <div aria-hidden="true" className="absolute border-[#c6ccd6] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[44px] items-center pl-0 pr-[16px] py-0 relative w-full">
          <Start1 />
          <Frame427321846 />
          <Context1 />
        </div>
      </div>
    </div>
  );
}

function Frame427321847() {
  return <div className="box-border content-stretch flex gap-[10px] h-[38px] items-center justify-center px-0 py-[10px] shrink-0 w-[67px]" />;
}

function Frame427321848() {
  return (
    <div className="box-border content-stretch flex gap-[10px] h-[38px] items-center pl-0 pr-[10px] py-[10px] relative shrink-0 w-[121px]">
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3d3d3d] text-[12px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">BOL #</p>
      </div>
    </div>
  );
}

function Arrow2() {
  return (
    <div className="bg-white relative rounded-[3px] shrink-0 size-[22px]" data-name="Arrow">
      <div className="overflow-clip relative rounded-[inherit] size-[22px]">
        <div className="absolute flex flex-col font-['Font_Awesome_6_Free:Solid',_sans-serif] justify-center leading-[0] left-[4px] not-italic text-[#2474bb] text-[14px] top-[11px] translate-y-[-50%] w-[14px]">
          <p className="leading-[normal]">arrow-right</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#2474bb] border-[0.6px] border-solid inset-0 pointer-events-none rounded-[3px]" />
    </div>
  );
}

function Frame427321849() {
  return (
    <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0">
      <div className="basis-0 flex flex-col font-['Roboto:Light',_sans-serif] font-light grow justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[#3d3d3d] text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal]">987654321</p>
      </div>
      <Arrow2 />
    </div>
  );
}

function Frame427321850() {
  return (
    <div className="basis-0 grow h-[38px] min-h-px min-w-px relative shrink-0">
      <div aria-hidden="true" className="absolute border-[#e2e6eb] border-[0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[19px] h-[38px] items-center px-[8px] py-[4px] relative w-full">
          <Frame427321849 />
        </div>
      </div>
    </div>
  );
}

function Inputs4() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[4px] shrink-0" data-name="Inputs">
      <div aria-hidden="true" className="absolute border border-[#da1f2c] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[10px] items-center leading-[0] px-[8px] py-[4px] relative text-[12px] w-full">
          <div className="basis-0 flex flex-col font-['Roboto:Regular',_sans-serif] font-normal grow justify-center min-h-px min-w-px relative shrink-0 text-[#3d3d3d]" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[normal]"> </p>
          </div>
          <div className="flex flex-col font-['Font_Awesome_6_Free:Solid',_sans-serif] justify-center not-italic relative shrink-0 text-[#da1f2c] text-nowrap">
            <p className="leading-[normal] whitespace-pre">{`circle-exclamation `}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame427321851() {
  return (
    <div className="basis-0 grow h-[38px] min-h-px min-w-px relative shrink-0">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[38px] items-center px-[8px] py-[4px] relative w-full">
          <Inputs4 />
        </div>
      </div>
    </div>
  );
}

function TableComponents6() {
  return (
    <div className="bg-white content-stretch flex h-[42px] items-center relative shrink-0 w-full z-[5]" data-name="Table components">
      <div aria-hidden="true" className="absolute border-[#c6ccd6] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Frame427321847 />
      <Frame427321848 />
      <Frame427321850 />
      <Frame427321851 />
    </div>
  );
}

function RadioButtnAndCheckBox32() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Radio Buttn and Check Box  16">
      <div className="bg-white relative rounded-[1px] shrink-0 size-[16px]">
        <div aria-hidden="true" className="absolute border border-[#8d9aae] border-solid inset-0 pointer-events-none rounded-[1px]" />
      </div>
    </div>
  );
}

function RadioButtnAndCheckBox33() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Radio Buttn and Check Box  16">
      <RadioButtnAndCheckBox32 />
    </div>
  );
}

function Start2() {
  return (
    <div className="box-border content-stretch flex gap-[10px] h-full items-center justify-center px-0 py-[10px] relative shrink-0 w-[67px]" data-name="Start">
      <RadioButtnAndCheckBox33 />
    </div>
  );
}

function Frame427321852() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[10px] items-center pl-0 pr-[10px] py-[10px] relative size-full">
          <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#174a78] text-[16px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[normal] whitespace-pre">{`Fuel Recipet `}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Context2() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center p-[2px] relative rounded-[2px] shrink-0" data-name="context">
      <div className="flex flex-col font-['Font_Awesome_6_Free:Solid',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#2068a8] text-[16px] text-center w-full">
        <p className="leading-[normal]">ellipsis-vertical</p>
      </div>
    </div>
  );
}

function TableComponents7() {
  return (
    <div className="bg-[#f7f8f9] h-[44px] relative shrink-0 w-full z-[4]" data-name="Table components">
      <div aria-hidden="true" className="absolute border-[#c6ccd6] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[44px] items-center pl-0 pr-[16px] py-0 relative w-full">
          <Start2 />
          <Frame427321852 />
          <Context2 />
        </div>
      </div>
    </div>
  );
}

function Frame427321853() {
  return <div className="box-border content-stretch flex gap-[10px] h-[38px] items-center justify-center px-0 py-[10px] shrink-0 w-[67px]" />;
}

function Frame427321854() {
  return (
    <div className="box-border content-stretch flex gap-[10px] h-[38px] items-center pl-0 pr-[10px] py-[10px] relative shrink-0 w-[121px]">
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3d3d3d] text-[12px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">{`Amount `}</p>
      </div>
    </div>
  );
}

function Arrow3() {
  return (
    <div className="bg-white relative rounded-[3px] shrink-0 size-[22px]" data-name="Arrow">
      <div className="overflow-clip relative rounded-[inherit] size-[22px]">
        <div className="absolute flex flex-col font-['Font_Awesome_6_Free:Solid',_sans-serif] justify-center leading-[0] left-[4px] not-italic text-[#2474bb] text-[14px] top-[11px] translate-y-[-50%] w-[14px]">
          <p className="leading-[normal]">arrow-right</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#2474bb] border-[0.6px] border-solid inset-0 pointer-events-none rounded-[3px]" />
    </div>
  );
}

function Frame427321855() {
  return (
    <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0">
      <div className="basis-0 flex flex-col font-['Roboto:Light',_sans-serif] font-light grow justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[#3d3d3d] text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal]">$100</p>
      </div>
      <Arrow3 />
    </div>
  );
}

function Frame427321856() {
  return (
    <div className="basis-0 grow h-[38px] min-h-px min-w-px relative shrink-0">
      <div aria-hidden="true" className="absolute border-[#e2e6eb] border-[0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[19px] h-[38px] items-center px-[8px] py-[4px] relative w-full">
          <Frame427321855 />
        </div>
      </div>
    </div>
  );
}

function Inputs5() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[4px] shrink-0" data-name="Inputs">
      <div aria-hidden="true" className="absolute border border-[#da1f2c] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[10px] items-center leading-[0] px-[8px] py-[4px] relative text-[12px] w-full">
          <div className="basis-0 flex flex-col font-['Roboto:Regular',_sans-serif] font-normal grow justify-center min-h-px min-w-px relative shrink-0 text-[#3d3d3d]" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[normal]"> </p>
          </div>
          <div className="flex flex-col font-['Font_Awesome_6_Free:Solid',_sans-serif] justify-center not-italic relative shrink-0 text-[#da1f2c] text-nowrap">
            <p className="leading-[normal] whitespace-pre">{`circle-exclamation `}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame427321857() {
  return (
    <div className="basis-0 grow h-[38px] min-h-px min-w-px relative shrink-0">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[38px] items-center px-[8px] py-[4px] relative w-full">
          <Inputs5 />
        </div>
      </div>
    </div>
  );
}

function TableComponents8() {
  return (
    <div className="bg-white content-stretch flex h-[42px] items-center relative shrink-0 w-full z-[3]" data-name="Table components">
      <div aria-hidden="true" className="absolute border-[#c6ccd6] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Frame427321853 />
      <Frame427321854 />
      <Frame427321856 />
      <Frame427321857 />
    </div>
  );
}

function AuditValadationSection() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative rounded-[8px] shrink-0 w-full z-[3]" data-name="Audit/valadation Section">
      <div className="content-stretch flex flex-col isolate items-start overflow-clip relative rounded-[inherit] size-full">
        <ExceptionSummery />
        <Header />
        <DocumentHeader />
        <TableComponents />
        <TableComponents1 />
        <TableComponents2 />
        <TableComponents3 />
        <TableComponents4 />
        <TableComponents5 />
        <TableComponents6 />
        <TableComponents7 />
        <TableComponents8 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e2e6eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function DropdownIndacator() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Dropdown Indacator">
      <div className="absolute bottom-0 left-0 right-[-0.13%] top-0">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 12">
          <g id="Dropdown Indacator ">
            <path d={svgPaths.p2d735880} fill="var(--fill-0, #3D3D3D)" id="Angle-down" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function ExceptionIconsDocIcons3() {
  return (
    <div className="h-[16px] relative shrink-0 w-[12.26px]" data-name="Exception Icons  & Doc Icons">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 16">
        <g id="Exception Icons  & Doc Icons ">
          <g id="Unclassified ">
            <path d={svgPaths.p1113c880} fill="var(--fill-0, #9747FF)" />
            <path d={svgPaths.p1fc7f200} fill="var(--fill-0, #9747FF)" />
            <path d={svgPaths.p2d20ef80} fill="var(--fill-0, #9747FF)" />
            <path d={svgPaths.p8bc7300} fill="var(--fill-0, #9747FF)" />
            <path d={svgPaths.p3496bff0} fill="var(--fill-0, #9747FF)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame427321944() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
      <DropdownIndacator />
      <ExceptionIconsDocIcons3 />
    </div>
  );
}

function Frame427321951() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
      <Frame427321944 />
      <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#3d3d3d] text-[16px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">{`Unclassified `}</p>
      </div>
      <div className="flex flex-col font-['Roboto:Light',_sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[#8d9aae] text-[16px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">(2)</p>
      </div>
    </div>
  );
}

function Frame427322048() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full z-[4]">
      <Frame427321951 />
      <div className="flex flex-col font-['Font_Awesome_6_Free:Solid',_sans-serif] justify-center leading-[0] not-italic opacity-0 relative shrink-0 text-[#2474bb] text-[16px] text-center text-nowrap">
        <p className="leading-[normal] whitespace-pre">ellipsis-vertical</p>
      </div>
    </div>
  );
}

function Frame427322072() {
  return (
    <div className="content-stretch flex gap-[4px] items-center leading-[0] relative shrink-0 text-[#3a3a3a] text-[16px] text-nowrap">
      <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] text-nowrap whitespace-pre">Unclassified #1</p>
      </div>
      <div className="flex flex-col font-['Roboto:Light',_sans-serif] font-light justify-center opacity-0 relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] text-nowrap whitespace-pre">(Reason)</p>
      </div>
    </div>
  );
}

function DocName() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative rounded-bl-[4px] rounded-tl-[4px] shrink-0" data-name="Doc name">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[10px] items-center pl-[16px] pr-[10px] py-[10px] relative size-full">
          <Frame427322072 />
        </div>
      </div>
    </div>
  );
}

function DropdownDocType() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[4px] shrink-0" data-name="Dropdown doc type">
      <div aria-hidden="true" className="absolute border border-[#8d9aae] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[10px] items-center leading-[0] px-[8px] py-[6px] relative text-[12px] w-full">
          <div className="basis-0 flex flex-col font-['Roboto:Regular',_sans-serif] font-normal grow justify-center min-h-px min-w-px relative shrink-0 text-[#3d3d3d]" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[normal]">{`Unclassified `}</p>
          </div>
          <div className="flex flex-col font-['Font_Awesome_6_Free:Solid',_sans-serif] justify-center not-italic relative shrink-0 text-[#8d9aae] text-nowrap">
            <p className="leading-[normal] whitespace-pre">angle-down</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DocumentInDropDown() {
  return (
    <div className="bg-white h-[44px] relative rounded-[4px] shrink-0 w-full z-[2]" data-name="Document in drop down">
      <div aria-hidden="true" className="absolute border border-[#e2e6eb] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[44px] items-center pl-0 pr-[16px] py-0 relative w-full">
          <DocName />
          <DropdownDocType />
          <div className="flex flex-col font-['Font_Awesome_6_Free:Solid',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#2474bb] text-[16px] text-center text-nowrap">
            <p className="leading-[normal] whitespace-pre">ellipsis-vertical</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame427322073() {
  return (
    <div className="content-stretch flex gap-[4px] items-center leading-[0] relative shrink-0 text-[#3a3a3a] text-[16px] text-nowrap">
      <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] text-nowrap whitespace-pre">Unclassified #2</p>
      </div>
      <div className="flex flex-col font-['Roboto:Light',_sans-serif] font-light justify-center opacity-0 relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] text-nowrap whitespace-pre">(Reason)</p>
      </div>
    </div>
  );
}

function DocName1() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative rounded-bl-[4px] rounded-tl-[4px] shrink-0" data-name="Doc name">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[10px] items-center pl-[16px] pr-[10px] py-[10px] relative size-full">
          <Frame427322073 />
        </div>
      </div>
    </div>
  );
}

function DropdownDocType1() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[4px] shrink-0" data-name="Dropdown doc type">
      <div aria-hidden="true" className="absolute border border-[#8d9aae] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[10px] items-center leading-[0] px-[8px] py-[6px] relative text-[12px] w-full">
          <div className="basis-0 flex flex-col font-['Roboto:Regular',_sans-serif] font-normal grow justify-center min-h-px min-w-px relative shrink-0 text-[#3d3d3d]" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[normal]">{`Unclassified `}</p>
          </div>
          <div className="flex flex-col font-['Font_Awesome_6_Free:Solid',_sans-serif] justify-center not-italic relative shrink-0 text-[#8d9aae] text-nowrap">
            <p className="leading-[normal] whitespace-pre">angle-down</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DocumentInDropDown1() {
  return (
    <div className="bg-white h-[44px] relative rounded-[4px] shrink-0 w-full z-[1]" data-name="Document in drop down">
      <div aria-hidden="true" className="absolute border border-[#e2e6eb] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[44px] items-center pl-0 pr-[16px] py-0 relative w-full">
          <DocName1 />
          <DropdownDocType1 />
          <div className="flex flex-col font-['Font_Awesome_6_Free:Solid',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#2474bb] text-[16px] text-center text-nowrap">
            <p className="leading-[normal] whitespace-pre">ellipsis-vertical</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Unclassified() {
  return (
    <div className="bg-[#fbfcfc] relative rounded-[8px] shrink-0 w-full" data-name="Unclassified">
      <div aria-hidden="true" className="absolute border border-[#e2e6eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-col justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] isolate items-start justify-center p-[16px] relative w-full">
          <Frame427322048 />
          <div className="h-0 relative shrink-0 w-full z-[3]">
            <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 541 1">
                <line id="Line 358" stroke="var(--stroke-0, #F3F5F7)" x2="541" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
          <DocumentInDropDown />
          <DocumentInDropDown1 />
        </div>
      </div>
    </div>
  );
}

function DropdownIndacator1() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Dropdown Indacator">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Dropdown Indacator ">
          <path d={svgPaths.p10fa7370} fill="var(--fill-0, #3D3D3D)" id="angle-right" />
        </g>
      </svg>
    </div>
  );
}

function Frame427321945() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
      <DropdownIndacator1 />
      <div className="flex flex-col font-['Font_Awesome_6_Free:Solid',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#00bf30] text-[16px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">circle-check</p>
      </div>
    </div>
  );
}

function Frame427321954() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
      <Frame427321945 />
      <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#3d3d3d] text-[16px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">Approved</p>
      </div>
      <div className="flex flex-col font-['Roboto:Light',_sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[#8d9aae] text-[16px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">(1)</p>
      </div>
    </div>
  );
}

function Appproved() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Appproved">
      <div aria-hidden="true" className="absolute border border-[#e2e6eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center justify-between p-[16px] relative w-full">
          <Frame427321954 />
          <div className="flex flex-col font-['Font_Awesome_6_Free:Solid',_sans-serif] justify-center leading-[0] not-italic opacity-0 relative shrink-0 text-[#2474bb] text-[16px] text-center text-nowrap">
            <p className="leading-[normal] whitespace-pre">ellipsis-vertical</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DropdownIndacator2() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Dropdown Indacator">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Dropdown Indacator ">
          <path d={svgPaths.p10fa7370} fill="var(--fill-0, #3D3D3D)" id="angle-right" />
        </g>
      </svg>
    </div>
  );
}

function Frame427321946() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
      <DropdownIndacator2 />
      <div className="flex flex-col font-['Font_Awesome_6_Free:Solid',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#8d9aae] text-[16px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">trash</p>
      </div>
    </div>
  );
}

function Frame427321955() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
      <Frame427321946 />
      <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#3d3d3d] text-[16px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">Rejected</p>
      </div>
      <div className="flex flex-col font-['Roboto:Light',_sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[#8d9aae] text-[16px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">(1)</p>
      </div>
    </div>
  );
}

function Frame427322047() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <Frame427321955 />
      <div className="flex flex-col font-['Font_Awesome_6_Free:Solid',_sans-serif] justify-center leading-[0] not-italic opacity-0 relative shrink-0 text-[#2474bb] text-[16px] text-center text-nowrap">
        <p className="leading-[normal] whitespace-pre">ellipsis-vertical</p>
      </div>
    </div>
  );
}

function Deleted() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Deleted">
      <div aria-hidden="true" className="absolute border border-[#e2e6eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-col justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start justify-center p-[16px] relative w-full">
          <Frame427322047 />
        </div>
      </div>
    </div>
  );
}

function DocumentPannels() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full z-[1]" data-name="Document pannels">
      <Unclassified />
      <Appproved />
      <Deleted />
    </div>
  );
}

function AuditSection() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full" data-name="Audit section">
      <div className="flex flex-col items-end size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] isolate items-end pb-0 pt-px px-[16px] relative size-full">
          <AuditValadationSection />
          <DocumentPannels />
        </div>
      </div>
    </div>
  );
}

function Frame289464() {
  return (
    <div className="bg-[#fbfcfc] box-border content-stretch flex gap-[8px] h-full items-center justify-center px-[16px] py-[14px] relative rounded-[4px] shrink-0">
      <div aria-hidden="true" className="absolute border border-[#8d9aae] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="font-['Font_Awesome_6_Free:Solid',_sans-serif] leading-[normal] not-italic relative shrink-0 text-[#5a626f] text-[14px] text-nowrap whitespace-pre">undo</p>
      <p className="font-['Roboto:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[#5a626f] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Revert Changes
      </p>
    </div>
  );
}

function Square15() {
  return (
    <div className="content-stretch flex h-[30px] items-center relative shrink-0" data-name="Square  14">
      <Frame289464 />
    </div>
  );
}

function RevertChanges() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Revert changes">
      <Square15 />
    </div>
  );
}

function Frame289465() {
  return (
    <div className="bg-[#dcf2fc] box-border content-stretch flex gap-[16px] h-full items-center justify-center px-[16px] py-[14px] relative rounded-[4px] shrink-0">
      <div aria-hidden="true" className="absolute border border-[#95d9f7] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="font-['Roboto:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[#2474bb] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Save
      </p>
    </div>
  );
}

function Square16() {
  return (
    <div className="content-stretch flex h-[30px] items-center relative shrink-0" data-name="Square  14">
      <Frame289465 />
    </div>
  );
}

function ApproveSave() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Approve /save">
      <Square16 />
    </div>
  );
}

function Frame289466() {
  return (
    <div className="bg-[#00bf30] box-border content-stretch flex gap-[8px] items-center justify-center px-[16px] py-[8px] relative rounded-[4px] shrink-0">
      <div aria-hidden="true" className="absolute border border-[#00bf30] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="font-['Font_Awesome_6_Free:Solid',_sans-serif] leading-[normal] not-italic relative shrink-0 text-[12px] text-nowrap text-white whitespace-pre">check</p>
      <p className="font-['Roboto:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[12px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Approve Selected (2)
      </p>
    </div>
  );
}

function Square17() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Square  14">
      <Frame289466 />
    </div>
  );
}

function ApproveSave1() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Approve /save">
      <Square17 />
    </div>
  );
}

function Frame427322033() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
      <ApproveSave />
      <ApproveSave1 />
    </div>
  );
}

function BotomActions() {
  return (
    <div className="backdrop-blur-[2px] backdrop-filter bg-gradient-to-r from-[rgba(255,255,255,0.5)] relative rounded-bl-[10px] rounded-br-[10px] shrink-0 to-[rgba(255,255,255,0.3)] w-full" data-name="Botom actions">
      <div aria-hidden="true" className="absolute border-[#e2e6eb] border-[1px_0px_0px] border-solid inset-0 pointer-events-none rounded-bl-[10px] rounded-br-[10px] shadow-[0px_-1px_4px_0px_rgba(0,0,0,0.12)]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center justify-between p-[16px] relative w-full">
          <RevertChanges />
          <Frame427322033 />
        </div>
      </div>
    </div>
  );
}

function ValadationSection() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-[16px] h-[861px] items-center justify-end pb-0 pt-[16px] px-0 relative rounded-[8px] shrink-0 w-[605px]" data-name="Valadation section">
      <AuditSection />
      <BotomActions />
    </div>
  );
}

function DocumentViewer() {
  return (
    <div className="basis-0 bg-[#f1fafe] grow h-[861px] min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Document Viewer">
      <div aria-hidden="true" className="absolute border border-[#72cdf4] border-solid inset-[-1px] pointer-events-none rounded-[9px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[19px] h-[861px] items-start pb-0 pl-[16px] pr-0 pt-[16px] w-full" />
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute box-border content-stretch flex gap-[16px] items-center left-0 pb-[16px] pt-0 px-[16px] top-[148px] w-[1440px]">
      <ValadationSection />
      <DocumentViewer />
    </div>
  );
}

function MainPage() {
  return (
    <div className="absolute h-[1024px] left-0 top-0 w-[1440px]" data-name="Main Page">
      <Upload />
      <Frame1 />
    </div>
  );
}

export default function TookOver() {
  return (
    <div className="relative size-full" data-name="Took Over">
      <MainPage />
    </div>
  );
}