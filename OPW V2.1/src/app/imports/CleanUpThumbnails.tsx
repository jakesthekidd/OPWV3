import img from "figma:asset/be85076d4aa6618c5a040fae49b3537b1fbaffa2.png";

function Frame427322245() {
  return (
    <div className="absolute backdrop-blur-[0.5px] backdrop-filter bg-[rgba(0,0,0,0.39)] box-border content-stretch flex gap-[10px] items-center left-0 px-[8px] py-[4px] top-[91px] w-[79px]">
      <div className="flex flex-col font-['Roboto:Condensed_Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[10px] text-center text-nowrap text-white" style={{ fontVariationSettings: "'wdth' 75" }}>
        <p className="leading-[normal] whitespace-pre">Pg. 1</p>
      </div>
    </div>
  );
}

function Frame427322241() {
  return (
    <div className="h-[111px] relative rounded-[4px] shrink-0 w-full">
      <div className="h-[111px] overflow-clip relative rounded-[inherit] w-full">
        <div className="absolute h-[111px] left-0 pointer-events-none rounded-[1.817px] top-0 w-[79px]" data-name="Screenshot 2023-08-28 at 2.23 2">
          <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover rounded-[1.817px] size-full" src={img} />
          <div aria-hidden="true" className="absolute border-[1.817px] border-solid border-white inset-[-1.817px] rounded-[3.63412px]" />
        </div>
        <Frame427322245 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e2e6eb] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

export default function CleanUpThumbnails() {
  return (
    <div className="bg-[rgba(0,0,0,0.2)] relative rounded-[6px] size-full" data-name="Clean Up Thumbnails">
      <div className="flex flex-col items-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[4px] items-center p-[8px] relative size-full">
          <Frame427322241 />
        </div>
      </div>
    </div>
  );
}