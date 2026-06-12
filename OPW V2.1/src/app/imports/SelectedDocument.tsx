import img from "figma:asset/0d2ee5dc2626ae4a2a8b65ae8c825f9311a6d730.png";
import img1 from "figma:asset/b5efbb63846ad7c52792fdb98aa8eaed4871162d.png";

function Frame290365() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col gap-[10px] items-center justify-center left-[38px] px-[2px] py-[4px] rounded-br-[2px] rounded-tl-[4px] top-[47px]">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#3a3a3a] text-[8px] text-nowrap text-right whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
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

function Frame290366() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col gap-[10px] items-center justify-center left-[38px] px-[2px] py-[4px] rounded-br-[2px] rounded-tl-[4px] top-[47px]">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#3a3a3a] text-[8px] text-nowrap text-right whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        2
      </p>
    </div>
  );
}

function Component134() {
  return (
    <div className="h-[65px] relative shrink-0 w-[48px]" data-name="Component 133">
      <div className="absolute h-[63px] left-px pointer-events-none rounded-[2px] top-px w-[46px]">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover rounded-[2px] size-full" src={img1} />
        <div aria-hidden="true" className="absolute border border-[#8d9aae] border-solid inset-[-1px] rounded-[3px]" />
      </div>
      <Frame290366 />
    </div>
  );
}

function Frame427321877() {
  return (
    <div className="content-stretch flex gap-[8px] items-start justify-end relative shrink-0">
      <Component134 />
    </div>
  );
}

function SelectedDocThumbnails() {
  return (
    <div className="relative rounded-bl-[4px] rounded-br-[4px] shrink-0 w-full" data-name="Selected doc thumbnails">
      <div className="flex flex-col items-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-center p-[8px] relative w-full">
          <div className="box-border content-stretch flex gap-[10px] h-[73px] items-center justify-center p-px relative rounded-[4px] shrink-0 w-[56px]" data-name="Selected">
            <Frame427321876 />
          </div>
          <div className="box-border content-stretch flex gap-[10px] h-[73px] items-center justify-center p-px relative rounded-[4px] shrink-0 w-[56px]" data-name="Component 164">
            <Frame427321877 />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SelectedDocument() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="Selected Document">
      <div className="bg-[#eff2f4] h-[23px] min-w-[69px] relative shrink-0 w-full" data-name="Document type">
        <div className="flex flex-row items-center min-w-inherit size-full">
          <div className="box-border content-stretch flex h-[23px] items-center justify-between min-w-inherit pb-[5px] pt-[4px] px-[8px] relative w-full">
            <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#3d3d3d] text-[12px] text-center text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>{`Fuel Receipt `}</p>
            <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center p-[2px] relative rounded-[2px] shrink-0" data-name="context">
              <div className="flex flex-col font-['Font_Awesome_6_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#2068a8] text-[12px] text-center w-full">
                <p className="leading-[normal]">ellipsis-vertical</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SelectedDocThumbnails />
    </div>
  );
}