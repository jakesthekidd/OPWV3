import svgPaths from "./svg-nfl9brerhj";

function Frame427321944() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
      <button className="block cursor-pointer overflow-visible relative shrink-0 size-[12px]" data-name="Dropdown Indacator">
        <div className="absolute h-[11.992px] left-[calc(50%-0.492px)] top-[calc(50%-0.004px)] translate-x-[-50%] translate-y-[-50%] w-[7.016px]" data-name="angle-right">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 12">
            <path d={svgPaths.p3325b600} fill="var(--fill-0, #3D3D3D)" id="angle-right" />
          </svg>
        </div>
      </button>
      <div className="flex flex-col font-['Font_Awesome_6_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#00bf30] text-[16px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">circle-check</p>
      </div>
    </div>
  );
}

function Frame427321951() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
      <Frame427321944 />
      <div className="flex flex-col font-['Roboto:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#3d3d3d] text-[16px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">Approved</p>
      </div>
      <div className="flex flex-col font-['Roboto:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[#8d9aae] text-[16px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">(1)</p>
      </div>
    </div>
  );
}

export default function Appproved() {
  return (
    <div className="bg-[#f1fafe] relative rounded-[8px] size-full" data-name="Appproved">
      <div aria-hidden="true" className="absolute border border-[#72cdf4] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center justify-between p-[16px] relative size-full">
          <Frame427321951 />
          <div className="flex flex-col font-['Font_Awesome_6_Free:Solid',sans-serif] justify-center leading-[0] not-italic opacity-0 relative shrink-0 text-[#2474bb] text-[16px] text-center text-nowrap">
            <p className="leading-[normal] whitespace-pre">ellipsis-vertical</p>
          </div>
        </div>
      </div>
    </div>
  );
}