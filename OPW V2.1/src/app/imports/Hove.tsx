import img from "figma:asset/0d2ee5dc2626ae4a2a8b65ae8c825f9311a6d730.png";

function Frame290365() {
  return (
    <div className="absolute bg-[#2474bb] box-border content-stretch flex flex-col gap-[10px] items-center justify-center left-[39px] px-[2px] py-[4px] rounded-br-[2px] rounded-tl-[4px] top-[47px]">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[8px] text-nowrap text-right text-white whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        1
      </p>
    </div>
  );
}

function Component133() {
  return (
    <div className="h-[65px] relative shrink-0 w-[48px]" data-name="Component 133">
      <div className="absolute h-[63px] left-px pointer-events-none rounded-[2px] top-px w-[46px]">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover rounded-[2px] size-full" src={img} />
        <div aria-hidden="true" className="absolute border border-[#2474bb] border-solid inset-[-1px] rounded-[3px]" />
      </div>
      <div className="absolute backdrop-blur-[1.5px] backdrop-filter bg-[#3a3a3a] box-border content-stretch flex flex-col gap-[10px] items-center justify-center left-[38px] p-[2px] rounded-[2px] top-[3px]" data-name="context">
        <div className="flex flex-col font-['Font_Awesome_6_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#e9f1f8] text-[12px] text-center w-full">
          <p className="leading-[normal]">ellipsis-vertical</p>
        </div>
      </div>
      <Frame290365 />
    </div>
  );
}

function Frame427321876() {
  return (
    <div className="content-stretch flex gap-[8px] items-start justify-end relative shrink-0">
      <Component133 />
    </div>
  );
}

export default function Hove() {
  return (
    <div className="relative rounded-[4px] size-full" data-name="Hove">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[10px] items-center p-[4px] relative size-full">
          <Frame427321876 />
        </div>
      </div>
    </div>
  );
}