import imgScreenshot20230828At2232 from "figma:asset/be85076d4aa6618c5a040fae49b3537b1fbaffa2.png";

function Frame427322245() {
  return (
    <div className="absolute backdrop-blur-[0.5px] backdrop-filter bg-[rgba(0,0,0,0.49)] bottom-0 box-border content-stretch flex gap-[10px] items-center left-0 px-[8px] py-[4px] right-0">
      <div className="flex flex-col font-['Roboto:Condensed_Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[10px] text-center text-nowrap text-white" style={{ fontVariationSettings: "'wdth' 75" }}>
        <p className="leading-[normal] whitespace-pre">Pg. 1</p>
      </div>
    </div>
  );
}

function Frame427322241() {
  return (
    <div className="aspect-[79/111] relative rounded-[4px] shrink-0 w-full">
      <div className="aspect-[79/111] overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute aspect-[79/111] bottom-[-6px] left-1/2 pointer-events-none rounded-[1.817px] top-[-6px] translate-x-[-50%]" data-name="Screenshot 2023-08-28 at 2.23 2">
          <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover rounded-[1.817px] size-full" src={imgScreenshot20230828At2232} />
          <div aria-hidden="true" className="absolute border-[1.817px] border-solid border-white inset-[-1.817px] rounded-[3.63412px]" />
        </div>
        <Frame427322245 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e2e6eb] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

export default function Hover() {
  return (
    <div className="bg-[rgba(0,0,0,0.05)] relative rounded-[6px] size-full" data-name="Hover">
      <div className="flex flex-col items-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[4px] items-center p-[8px] relative size-full">
          <Frame427322241 />
        </div>
      </div>
    </div>
  );
}