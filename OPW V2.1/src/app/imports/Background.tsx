import svgPaths from "./svg-rzy4efxklv";
import BoxesPacking from "./BoxesPacking";
import { ChevronDown, ArrowLeft, ArrowRight, XCircle, MapPin, Pin, AlertTriangle, Server, Database } from 'lucide-react';
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '../components/ui/dialog';
import { TmsDataPopover } from '../components/InfoPopovers';
import { AuditLogDialog } from '../components/AuditLogDialog';
import { useLibrary } from '../context/LibraryContext';
import LoadNavigation, { LoadProvider, useLoad } from '../components/LoadNavigation';

function Circle() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[8px] items-center justify-center p-[8px] relative rounded-[23px] shrink-0 size-[26px]" data-name="circle">
      <div aria-hidden="true" className="absolute border-2 border-[#ffa300] border-solid inset-0 pointer-events-none rounded-[23px]" />
      <p className="font-['Roboto:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[#664100] text-[11px] text-center text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        JC
      </p>
    </div>
  );
}

function Frame427322071() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative rounded-[24px] shrink-0">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(255,163,0,0.25)] border-solid inset-[-2px] pointer-events-none rounded-[26px]" />
      <Circle />
    </div>
  );
}

function LastAcessed() {
  return (
    <div className="content-stretch flex gap-[6px] h-[26px] items-center opacity-0 relative shrink-0" data-name="Last acessed">
      <Frame427322071 />
    </div>
  );
}

function Frame427321993() {
  const { setShowLibrary } = useLibrary();
  const { currentLoadId } = useLoad();

  const handleTripleClick = () => {
    setShowLibrary(true);
  };

  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
      <p
        className="font-['Roboto:Semibold',_sans-serif] font-semibold leading-[normal] relative shrink-0 text-[25px] text-nowrap text-white whitespace-pre select-none"
        style={{ fontVariationSettings: "'wdth' 100" }}
        onMouseDown={(e) => {
          if (e.detail === 3) {
            handleTripleClick();
          }
        }}
      >
        {currentLoadId}
      </p>
      <LastAcessed />
    </div>
  );
}

function Frame290266() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start justify-center relative shrink-0">
      <Frame427321993 />
    </div>
  );
}

function Frame290267() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[6px] grow items-start min-h-px min-w-px relative shrink-0">
      <Frame290266 />
    </div>
  );
}

function Frame290289() {
  return (
    <div className="content-stretch flex gap-[19px] h-[27px] items-center justify-end relative shrink-0">
      <LoadNavigation />
      <XCircle className="h-[25px] w-[25px] text-white" />
    </div>
  );
}

function Header1() {
  return (
    <div className="bg-[#2474bb] relative shrink-0 w-full z-[3]" data-name="Header 1">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="box-border content-stretch flex gap-[32px] items-center justify-end p-[13px] relative w-full">
          <Frame290267 />
          <Frame290289 />
        </div>
      </div>
    </div>
  );
}

function Frame427322102() {
  return (
    <div className="content-stretch flex gap-[6px] items-center leading-[normal] relative shrink-0 text-[10px] text-nowrap text-white whitespace-pre">
      <MapPin className="h-[10px] w-[10px] text-white" />
      <p className="font-['Roboto:Regular',_sans-serif] font-normal relative shrink-0 text-center" style={{ fontVariationSettings: "'wdth' 100" }}>
        Phoenix, AZ
      </p>
      <ArrowRight className="h-[10px] w-[10px] text-white" />
      <p className="font-['Roboto:Regular',_sans-serif] font-normal relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        Nashville, TN
      </p>
    </div>
  );
}

function Frame427322115() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center justify-center relative rounded-[2px] shrink-0 size-[15px]">
      <Pin className="h-[10px] w-[10px] text-white" />
    </div>
  );
}

function Frame427321890() {
  return (
    <div className="content-stretch flex gap-[3px] items-center leading-[0] relative shrink-0 text-nowrap text-white">
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center relative shrink-0 text-[10px]" style={{ fontVariationSettings: "'wdth' 100", opacity: 0.9 }}>
        <p className="leading-[normal] text-nowrap whitespace-pre">{`Invoice Date `}</p>
      </div>
      <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center relative shrink-0 text-[13px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] text-nowrap whitespace-pre">2025/04/05</p>
      </div>
    </div>
  );
}

function Frame427321889() {
  return (
    <div className="content-stretch flex gap-[3px] items-center leading-[0] relative shrink-0 text-nowrap text-white">
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center relative shrink-0 text-[10px]" style={{ fontVariationSettings: "'wdth' 100", opacity: 0.9 }}>
        <p className="leading-[normal] text-nowrap whitespace-pre">Delivered Date</p>
      </div>
      <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center relative shrink-0 text-[13px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] text-nowrap whitespace-pre">2025/04/04</p>
      </div>
    </div>
  );
}

function Frame427321888() {
  return (
    <div className="content-stretch flex gap-[3px] items-center leading-[0] relative shrink-0 text-nowrap text-white">
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center relative shrink-0 text-[10px]" style={{ fontVariationSettings: "'wdth' 100", opacity: 0.9 }}>
        <p className="leading-[normal] text-nowrap whitespace-pre">{`Shipment Status `}</p>
      </div>
      <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center relative shrink-0 text-[13px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] text-nowrap whitespace-pre">{`Delivered `}</p>
      </div>
    </div>
  );
}

function Frame427321891() {
  return (
    <div className="content-stretch flex gap-[3px] items-center leading-[0] relative shrink-0 text-nowrap text-white">
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center relative shrink-0 text-[10px]" style={{ fontVariationSettings: "'wdth' 100", opacity: 0.9 }}>
        <p className="leading-[normal] text-nowrap whitespace-pre">Shipper</p>
      </div>
      <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center relative shrink-0 text-[13px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] text-nowrap whitespace-pre">{`Swift Transportation`}</p>
      </div>
    </div>
  );
}

function Frame427322101() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0">
      <Frame427322115 />
      <Frame427321890 />
      <div className="flex flex-row items-center self-stretch">
        <div className="flex h-full items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "15", "--transform-inner-height": "15" } as React.CSSProperties}>
          <div className="flex-none h-full rotate-[90deg]">
            <div className="h-full relative w-[15px]">
              <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 1">
                  <line id="Line 363" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="0.1" x1="0.5" x2="14.5" y1="0.5" y2="0.5" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Frame427321889 />
      <div className="flex flex-row items-center self-stretch">
        <div className="flex h-full items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "15", "--transform-inner-height": "15" } as React.CSSProperties}>
          <div className="flex-none h-full rotate-[90deg]">
            <div className="h-full relative w-[15px]">
              <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 1">
                  <line id="Line 363" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="0.1" x1="0.5" x2="14.5" y1="0.5" y2="0.5" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Frame427321888 />
      <div className="flex flex-row items-center self-stretch">
        <div className="flex h-full items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "15", "--transform-inner-height": "15" } as React.CSSProperties}>
          <div className="flex-none h-full rotate-[90deg]">
            <div className="h-full relative w-[15px]">
              <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 1">
                  <line id="Line 363" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="0.1" x1="0.5" x2="14.5" y1="0.5" y2="0.5" />
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
    <div className="bg-[#1d5d96] relative shrink-0 w-full z-[2]" data-name="Header 2">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center justify-between px-[13px] py-[6px] relative w-full">
          <Frame427322102 />
          <Frame427322101 />
        </div>
      </div>
    </div>
  );
}

function Tags() {
  return (
    <div className="bg-[#f8d2d5] box-border content-stretch flex gap-[3px] items-center justify-center px-[6px] py-[2px] relative rounded-[31px] shrink-0" data-name="Tags">
      <div aria-hidden="true" className="absolute border border-[#f0a5ab] border-solid inset-[-1px] pointer-events-none rounded-[32px]" />
      <AlertTriangle className="h-[10px] w-[10px] text-[#570c12]" />
      <p className="font-['Roboto:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[#570c12] text-[11px] text-center text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>{` Duplicate Review`}</p>
    </div>
  );
}

function Tags1() {
  return (
    <div className="bg-[#e3f5fd] box-border content-stretch flex gap-[3px] items-center justify-center px-[6px] py-[2px] relative rounded-[31px] shrink-0" data-name="Tags">
      <div aria-hidden="true" className="absolute border border-[#0087ff] border-solid inset-[-1px] pointer-events-none rounded-[32px]" />
      <Server className="h-[10px] w-[10px] text-[#777777]" />
      <p className="font-['Roboto:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[#777777] text-[11px] text-center text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        QuickPay
      </p>
    </div>
  );
}

function Tags2() {
  return (
    <div className="bg-[#174a78] box-border content-stretch flex gap-[6px] h-full items-center px-0 py-[3px] relative rounded-[3px] shrink-0" data-name="Tags">
      <div className="relative shrink-0 size-[13px]" data-name="Tag">
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
    <div className="content-stretch flex flex-col gap-[8px] items-center justify-center relative shrink-0 w-[13px]" data-name="Component 184">
      <BoxesPacking />
    </div>
  );
}

function LoadAssoseation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-[#174a78] box-border content-stretch flex gap-[2px] h-[19px] items-center justify-center px-[3px] py-0 relative rounded-[3px] shrink-0 cursor-pointer border-none hover:bg-[#123b60] transition-colors"
        data-name="Load Assoseation"
        aria-label="Load Association"
      >
        <Component184 />
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogTitle>Load Association</DialogTitle>
          <DialogDescription>
            This feature is currently under development.
          </DialogDescription>
          <div className="flex items-center justify-center py-8">
            <p className="text-[24px] text-[#0e2e4b]">Coming Soon</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function Layer1() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[13px]" data-name="Layer_1">
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
    <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip relative shrink-0" data-name="Component 184">
      <Group1 />
    </div>
  );
}



function Component186() {
  const [isTmsDataOpen, setIsTmsDataOpen] = useState(false);
  
  return (
    <Popover open={isTmsDataOpen} onOpenChange={setIsTmsDataOpen}>
      <PopoverTrigger asChild>
        <button 
          className="content-stretch flex flex-col gap-[8px] items-center justify-center relative shrink-0 w-[13px] cursor-pointer bg-transparent border-none p-0" 
          data-name="Component 184"
          aria-label="TMS Data"
        >
          <Database className="h-[13px] w-[13px] text-white" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[480px] p-0 overflow-hidden rounded-[10px] border border-[#e3e8ee] shadow-[0px_12px_32px_rgba(15,23,42,0.16)]"
        align="start"
        side="bottom"
        sideOffset={8}
      >
        <TmsDataPopover />
      </PopoverContent>
    </Popover>
  );
}

function LoadData() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center justify-center px-0 py-[3px] relative rounded-[3px] shrink-0 size-[19px]" data-name="Load data">
      <Component186 />
    </div>
  );
}

function Layer2() {
  return (
    <div className="h-[13px] relative shrink-0 w-[10px]" data-name="Layer_1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 16">
        <g clipPath="url(#clip0_1_1914)" id="Layer_1">
          <path d={svgPaths.p103a0d80} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p2bc3400} fill="var(--fill-0, white)" id="Vector_2" />
          <path d={svgPaths.p1cef900} fill="var(--fill-0, white)" id="Vector_3" />
          <path d={svgPaths.pcad8580} fill="var(--fill-0, white)" id="Vector_4" />
          <path d={svgPaths.p3303e20} fill="var(--fill-0, white)" id="Vector_5" />
          <path d={svgPaths.p314cf880} fill="var(--fill-0, white)" id="Vector_6" />
        </g>
        <defs>
          <clipPath id="clip0_1_1914">
            <rect fill="white" height="16" width="13" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Component187() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-[13px]" data-name="Component 184">
      <Layer2 />
    </div>
  );
}

function FileData() {
  const [auditLogOpen, setAuditLogOpen] = useState(false);

  return (
    <>
      <div 
        className="box-border content-stretch flex gap-[8px] items-center justify-center px-0 py-[3px] relative rounded-[3px] shrink-0 size-[19px] cursor-pointer hover:bg-[#f0f0f0] transition-colors" 
        data-name="File data"
        onClick={() => setAuditLogOpen(true)}
      >
        <Component187 />
      </div>
      <AuditLogDialog open={auditLogOpen} onOpenChange={setAuditLogOpen} />
    </>
  );
}

function ActionButton() {
  return (
    <div className="content-stretch flex gap-[6px] h-full items-center relative shrink-0" data-name="Action button">
      <LoadAssoseation />
      <div className="flex h-full items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "22", "--transform-inner-height": "22" } as React.CSSProperties}>
        <div className="flex-none h-full rotate-[90deg]">
          <div className="h-full relative w-[22px]">
            <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 1">
                <line id="Line 361" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="0.1" x1="0.5" x2="21.5" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <LoadData />
      <FileData />
    </div>
  );
}

function Actions() {
  return (
    <div className="basis-0 content-stretch flex grow items-center justify-between min-h-px min-w-px relative shrink-0" data-name="Actions">
      <div className="flex flex-row items-center self-stretch">
        <Tags2 />
      </div>
      <div className="flex flex-row items-center self-stretch">
        <ActionButton />
      </div>
    </div>
  );
}

function Header3() {
  return (
    <div className="h-[123px] relative shrink-0 w-full z-[1]" data-name="Header 3" style={{ backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%), linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%), linear-gradient(90deg, rgb(36, 116, 187) 0%, rgb(36, 116, 187) 100%)" }}>
      <div className="size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[123px] items-start px-[13px] py-[6px] relative w-full">
          <Actions />
        </div>
      </div>
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
    <div className="content-stretch flex flex-col h-screen isolate items-start relative shrink-0 w-full" data-name="Upload">
      <Headers />
      <div className="basis-0 flex grow items-center justify-center min-h-px min-w-px relative shrink-0 w-full z-[1]">
        <div className="flex-none scale-y-[-100%] size-full">
          <div className="bg-[#f2f2f2] size-full" data-name="Client Block" />
        </div>
      </div>
    </div>
  );
}

export default function Background() {
  return (
    <LoadProvider>
      <div className="content-stretch flex flex-col items-start relative h-screen w-full overflow-hidden" data-name="Background">
        <Upload />
      </div>
    </LoadProvider>
  );
}