import svgPaths from "./svg-ltlf0ba6ij";

export default function Download() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center relative rounded-[2px] size-full" data-name="Download">
      <div className="h-[16px] relative shrink-0 w-[18px]" data-name="expand / open in new tab">
        <div className="absolute inset-0 rounded-[2px]" />
        <div className="absolute left-1/2 size-[16px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="arrow-up-right-from-square">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
            <path d={svgPaths.p150faf70} fill="var(--fill-0, #616161)" id="arrow-up-right-from-square" />
          </svg>
        </div>
      </div>
    </div>
  );
}