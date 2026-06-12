import { MessageSquare } from 'lucide-react';

function Frame() {
  return (
    <div className="absolute bg-[#da1f2c] box-border content-stretch flex flex-col gap-[10px] items-center justify-center left-[21px] p-[2px] rounded-[20px] size-[20px] top-[-15px]">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#eaf8fd] text-[16px] text-center text-nowrap whitespace-pre">1</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="relative shrink-0 size-[24px]">
      <MessageSquare className="absolute left-0 top-0 size-[24px] text-[#0e2e4b]" fill="#0e2e4b" strokeWidth={1} />
      <Frame />
    </div>
  );
}

export default function NotificationFabComponent() {
  return (
    <div className="bg-white relative rounded-[51px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] size-full" data-name="NotificationFabComponent">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[10px] items-center justify-center p-[10px] relative size-full">
          <Frame1 />
        </div>
      </div>
    </div>
  );
}
