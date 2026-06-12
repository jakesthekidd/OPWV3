import img from "figma:asset/b5efbb63846ad7c52792fdb98aa8eaed4871162d.png";

function Frame290365() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col gap-[10px] items-center justify-center left-[38px] px-[2px] py-[4px] rounded-br-[2px] rounded-tl-[4px] top-[47px]">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#3a3a3a] text-[8px] text-nowrap text-right whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        2
      </p>
    </div>
  );
}

function Component133() {
  return (
    <div className="h-[65px] relative shrink-0 w-[48px]" data-name="Component 133">
      <div className="absolute h-[63px] left-px pointer-events-none rounded-[2px] top-px w-[46px]">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover rounded-[2px] size-full" src={img} />
        <div aria-hidden="true" className="absolute border border-[#8d9aae] border-solid inset-[-1px] rounded-[3px]" />
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

export default function Resting() {
  return (
    <div className="relative rounded-[4px] size-full" data-name="Resting">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[10px] items-center justify-center p-px relative size-full">
          <Frame427321876 />
        </div>
      </div>
    </div>
  );
}