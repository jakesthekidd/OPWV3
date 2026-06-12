import svgPaths from "./svg-uyt0705i7x";

export default function HoverZoom() {
  return (
    <div className="relative size-full" data-name="Hover zoom">
      <div className="absolute inset-0 rounded-[2px]" />
      <div className="absolute inset-[6.25%_11.11%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <path d={svgPaths.p1c90f80} fill="var(--fill-0, #616161)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[23.36%] flex items-center justify-center left-[31.88%] right-0 top-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%] size-[12.262px]">
          <div className="relative size-full" data-name="">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
              <path d={svgPaths.p2ab31680} fill="var(--fill-0, #616161)" id="ï" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}