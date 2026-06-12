function Group289742() {
  return (
    <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative">
      <div className="[grid-area:1_/_1] bg-white h-[20px] ml-0 mt-0 relative rounded-[2px] w-[68px]">
        <div aria-hidden="true" className="absolute border border-[#f3f3f3] border-solid inset-0 pointer-events-none rounded-[2px]" />
      </div>
    </div>
  );
}

function Group289981() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Group289742 />
      <p className="[grid-area:1_/_1] font-['Inter:Medium',sans-serif] font-medium leading-[normal] ml-[33.625px] mt-[4px] not-italic relative text-[#afafaf] text-[10px] text-center translate-x-[-50%] w-[48.25px]">100%</p>
    </div>
  );
}

export default function ZoomPercentage() {
  return (
    <div className="content-stretch flex flex-col gap-[7px] items-center relative size-full" data-name="Zoom Percentage">
      <Group289981 />
    </div>
  );
}