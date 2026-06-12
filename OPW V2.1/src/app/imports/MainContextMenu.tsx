function ListItem() {
  return (
    <div className="bg-[#fbfcfc] relative shrink-0 w-full" data-name="List Item">
      <div aria-hidden="true" className="absolute border-[#eff2f4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[10px] items-center px-[10px] py-[4px] relative w-full">
          <p className="basis-0 font-['Roboto:Regular',sans-serif] font-normal grow h-full leading-[normal] min-h-px min-w-px relative shrink-0 text-[#8d9aae] text-[15px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Existing Documents
          </p>
        </div>
      </div>
    </div>
  );
}

function ListItem1() {
  return (
    <div className="bg-[#fbfcfc] relative shrink-0 w-full" data-name="List Item">
      <div aria-hidden="true" className="absolute border-[#eff2f4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[10px] items-center leading-[normal] px-[10px] py-[4px] relative text-[#8d9aae] w-full">
          <p className="font-['Font_Awesome_6_Free:Solid',sans-serif] not-italic relative shrink-0 text-[16px] text-nowrap whitespace-pre">plus</p>
          <p className="basis-0 font-['Roboto:Regular',sans-serif] font-normal grow h-full min-h-px min-w-px relative shrink-0 text-[15px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            New Document
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-px items-start overflow-x-clip overflow-y-auto relative shrink-0 w-full">
      <ListItem />
      <ListItem2 />
      <ListItem3 />
      <ListItem4 />
      <ListItem5 />
      <ListItem1 />
      <ListItem6 />
      <ListItem7 />
      <ListItem8 />
      <ListItem9 />
      <ListItem10 />
      <ListItem11 />
    </div>
  );
}

/**
 * @figmaAssetKey b782f5cac47602eff82c8ed0ca0dd66332287396
 */
export default function MainContextMenu() {
  return (
    <div className="bg-[#fbfcfc] box-border content-stretch flex flex-col gap-[10px] items-start px-0 py-[16px] relative rounded-[4px] size-full" data-name="Main Context Menu">
      <div aria-hidden="true" className="absolute border-[#72cdf4] border-[4px_0px_0px] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25),2px_5px_10px_0px_rgba(0,0,0,0.24)]" />
      <Frame />
    </div>
  );
}