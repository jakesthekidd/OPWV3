import { Dialog, DialogContent, DialogDescription, DialogTitle } from '../ui/dialog';
import OverriddenHoldIcon from './OverriddenHoldIcon';
import {
  formatHoldRemovedDate,
  getRemovedHoldDetails,
  sortRemovedHolds,
} from './holdUtils';
import type { DocumentHold } from '../../types/documentHolds';

interface OverriddenHoldsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  documentSection: string;
  holds: DocumentHold[];
  getReasonLabel: (reasonId: string) => string;
}

export default function OverriddenHoldsDialog({
  open,
  onOpenChange,
  documentSection,
  holds,
  getReasonLabel,
}: OverriddenHoldsDialogProps) {
  const sortedHolds = sortRemovedHolds(holds).filter((h) => getRemovedHoldDetails(h));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[520px] p-0 gap-0 overflow-hidden rounded-[8px] border border-[#e3e8ee]">
        <DialogTitle className="sr-only">Overridden Holds</DialogTitle>
        <DialogDescription className="sr-only">
          Previously removed holds on {documentSection}
        </DialogDescription>

        <div className="px-[24px] pt-[24px] pb-[16px]">
          <div className="flex items-center gap-[10px] mb-[12px]">
            <OverriddenHoldIcon size={28} />
            <h2 className="font-['Roboto:Bold',sans-serif] font-bold text-[18px] text-[#3d3d3d]">
              Overridden Holds
            </h2>
          </div>
          <p className="font-['Roboto:Regular',sans-serif] text-[13px] text-[#3d3d3d] leading-relaxed mb-[20px]">
            The following holds were removed from {documentSection}.
          </p>

          <div className="flex flex-col gap-[12px] max-h-[360px] overflow-y-auto">
            {sortedHolds.map((hold) => {
              const details = getRemovedHoldDetails(hold);
              if (!details) return null;

              return (
                <div
                  key={hold.id}
                  className="border border-[#c6ccd6] rounded-[6px] p-[14px] bg-[#f7f8f9]"
                >
                  <p className="font-['Roboto:Bold',sans-serif] font-bold text-[14px] text-[#3d3d3d]">
                    {getReasonLabel(hold.reasonId)}
                  </p>
                  {hold.notes && (
                    <p className="font-['Roboto:Regular',sans-serif] text-[12px] text-[#5a626f] mt-[4px]">
                      {hold.notes}
                    </p>
                  )}
                  <div className="mt-[10px] flex flex-col gap-[4px]">
                    <p className="font-['Roboto:Regular',sans-serif] text-[12px] text-[#5a626f]">
                      <span className="italic">Removed By:</span>{' '}
                      <span className="font-bold not-italic text-[#3d3d3d]">
                        {details.removedBy}
                      </span>
                    </p>
                    <p className="font-['Roboto:Regular',sans-serif] text-[12px] text-[#8d9aae]">
                      {formatHoldRemovedDate(details.removedAt)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="px-[24px] py-[16px] border-t border-[#e2e6eb] flex justify-end">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="px-[20px] py-[8px] text-[13px] text-white bg-[#2474bb] rounded-[4px] hover:bg-[#1e5f9a] transition-colors"
          >
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
