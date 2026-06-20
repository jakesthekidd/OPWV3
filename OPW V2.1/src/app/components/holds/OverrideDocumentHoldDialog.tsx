import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '../ui/dialog';
import { HoldIconSmall } from './HoldIcon';
import HoldIcon from './HoldIcon';
import type { DocumentHold } from '../../types/documentHolds';

interface OverrideDocumentHoldDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  documentSection: string;
  holds: DocumentHold[];
  getReasonLabel: (reasonId: string) => string;
  onOverride: (holdIds: string[]) => void;
}

export default function OverrideDocumentHoldDialog({
  open,
  onOpenChange,
  documentSection,
  holds,
  getReasonLabel,
  onOverride,
}: OverrideDocumentHoldDialogProps) {
  const [acknowledged, setAcknowledged] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!open) setAcknowledged(new Set());
  }, [open]);

  const overridableHolds = holds.filter((h) => h.type !== 'automated_non_overridable');
  const lockedHolds = holds.filter((h) => h.type === 'automated_non_overridable');
  const allOverridableAcknowledged =
    overridableHolds.length === 0 ||
    overridableHolds.every((h) => acknowledged.has(h.id));

  const handleOverride = () => {
    onOverride(Array.from(acknowledged));
    onOpenChange(false);
  };

  const toggleAcknowledge = (holdId: string) => {
    setAcknowledged((prev) => {
      const next = new Set(prev);
      if (next.has(holdId)) next.delete(holdId);
      else next.add(holdId);
      return next;
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[520px] p-0 gap-0 overflow-hidden rounded-[8px] border border-[#e3e8ee]">
        <DialogTitle className="sr-only">Override Document Hold</DialogTitle>
        <DialogDescription className="sr-only">
          Override processing holds on {documentSection}
        </DialogDescription>

        <div className="px-[24px] pt-[24px] pb-[16px]">
          <div className="flex items-center gap-[10px] mb-[12px]">
            <HoldIcon variant="overridable" size={28} />
            <h2 className="font-['Roboto:Bold',sans-serif] font-bold text-[18px] text-[#3d3d3d]">
              Override Document Hold
            </h2>
          </div>
          <p className="font-['Roboto:Regular',sans-serif] text-[13px] text-[#3d3d3d] leading-relaxed mb-[20px]">
            You are about to override a processing hold on this document. Overriding allows the
            document to continue processing even if the issue has not been resolved.
          </p>

          <div className="flex flex-col gap-[12px]">
            {overridableHolds.map((hold) => (
              <div
                key={hold.id}
                className="border-2 border-[#2474bb] rounded-[6px] p-[14px] bg-white"
              >
                <div className="flex items-start justify-between gap-[12px]">
                  <div className="flex-1 min-w-0">
                    <p className="font-['Roboto:Bold',sans-serif] font-bold text-[14px] text-[#3d3d3d]">
                      {getReasonLabel(hold.reasonId)}
                    </p>
                    {hold.notes && (
                      <p className="font-['Roboto:Regular',sans-serif] text-[12px] text-[#5a626f] mt-[4px]">
                        {hold.notes}
                      </p>
                    )}
                    <span className="inline-block mt-[8px] px-[8px] py-[2px] bg-[#eaf8fd] text-[#2474bb] text-[10px] rounded-full font-['Roboto:Regular',sans-serif]">
                      User: {hold.placedBy ?? 'Username'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleAcknowledge(hold.id)}
                    className={`flex items-center gap-[6px] shrink-0 px-[12px] py-[6px] rounded-[4px] border-2 transition-colors ${
                      acknowledged.has(hold.id)
                        ? 'border-[#2474bb] bg-[#2474bb] text-white'
                        : 'border-[#2474bb] bg-white text-[#2474bb] hover:bg-[#f0f7fc]'
                    }`}
                  >
                    {acknowledged.has(hold.id) && <Check className="size-[14px]" />}
                    <span className="font-['Roboto:Regular',sans-serif] text-[12px] whitespace-nowrap">
                      I Acknowledge
                    </span>
                  </button>
                </div>
              </div>
            ))}

            {lockedHolds.map((hold) => (
              <div
                key={hold.id}
                className="border border-[#e8c547] rounded-[6px] p-[14px] bg-[#fffbeb]"
              >
                <div className="flex items-start justify-between gap-[12px]">
                  <div className="flex-1 min-w-0">
                    <p className="font-['Roboto:Bold',sans-serif] font-bold text-[14px] text-[#3d3d3d]">
                      {getReasonLabel(hold.reasonId)}
                    </p>
                    {hold.notes && (
                      <p className="font-['Roboto:Regular',sans-serif] text-[12px] text-[#5a626f] mt-[4px]">
                        {hold.notes}
                      </p>
                    )}
                    <span className="inline-block mt-[8px] px-[8px] py-[2px] bg-[#f1f4f7] text-[#5a626f] text-[10px] rounded-full font-['Roboto:Regular',sans-serif]">
                      Document Set: {hold.documentSet ?? '{Doc Set}'}
                    </span>
                  </div>
                  <div className="flex items-center gap-[6px] shrink-0 px-[10px] py-[6px] border border-[#B8860B] rounded-[4px] bg-white">
                    <HoldIcon variant="locked" size={18} count={1} />
                    <span className="font-['Roboto:Regular',sans-serif] text-[11px] text-[#B8860B] whitespace-nowrap">
                      Cannot Override
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-[24px] py-[16px] border-t border-[#e2e6eb]">
          <div className="flex items-center justify-end gap-[10px] mb-[8px]">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="px-[20px] py-[8px] text-[13px] text-[#2474bb] border border-[#2474bb] rounded-[4px] hover:bg-[#f0f7fc] transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleOverride}
              disabled={!allOverridableAcknowledged || overridableHolds.length === 0}
              className="px-[20px] py-[8px] text-[13px] text-white bg-[#2474bb] rounded-[4px] hover:bg-[#1e5f9a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Override Hold
            </button>
          </div>
          <p className="font-['Roboto:Regular',sans-serif] text-[11px] text-[#8d9aae] italic text-right">
            Overridden holds are logged for audit purposes.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
