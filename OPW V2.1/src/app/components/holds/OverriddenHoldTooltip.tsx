import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card';
import OverriddenHoldIcon from './OverriddenHoldIcon';
import {
  formatHoldRemovedDate,
  getRemovedHoldDetails,
  sortRemovedHolds,
} from './holdUtils';
import type { DocumentHold } from '../../types/documentHolds';

interface OverriddenHoldTooltipProps {
  holds: DocumentHold[];
  getReasonLabel: (reasonId: string) => string;
  onClick?: () => void;
}

function HoldRemovedContent({
  hold,
  getReasonLabel,
}: {
  hold: DocumentHold;
  getReasonLabel: (reasonId: string) => string;
}) {
  const details = getRemovedHoldDetails(hold);
  if (!details) return null;

  return (
    <>
      <p className="font-['Roboto:Bold',sans-serif] font-bold text-[12px] text-white leading-snug">
        {getReasonLabel(hold.reasonId)}
      </p>
      <p className="font-['Roboto:Regular',sans-serif] text-[11px] text-[#b0b0b0] mt-[6px] leading-snug">
        <span className="italic">Removed By:</span>{' '}
        <span className="font-bold not-italic text-white">{details.removedBy}</span>
      </p>
      <p className="font-['Roboto:Regular',sans-serif] text-[11px] text-[#999] mt-[4px]">
        {formatHoldRemovedDate(details.removedAt)}
      </p>
    </>
  );
}

export default function OverriddenHoldTooltip({
  holds,
  getReasonLabel,
  onClick,
}: OverriddenHoldTooltipProps) {
  const sortedHolds = sortRemovedHolds(holds).filter((h) => getRemovedHoldDetails(h));
  if (sortedHolds.length === 0) return null;

  const primaryHold = sortedHolds[0];
  const title =
    sortedHolds.length === 1 ? 'Hold Overridden' : 'Overridden Holds';
  const isClickable = sortedHolds.length > 1;

  return (
    <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>
        <button
          type="button"
          className={`relative shrink-0 flex items-center justify-center rounded-[2px] p-[2px] hover:bg-[#e8edf2] transition-colors ${
            isClickable ? 'cursor-pointer' : 'cursor-default'
          }`}
          onClick={(e) => {
            e.stopPropagation();
            if (isClickable) onClick?.();
          }}
          aria-label={`${sortedHolds.length} overridden hold${sortedHolds.length > 1 ? 's' : ''} on document`}
        >
          <OverriddenHoldIcon size={22} />
        </button>
      </HoverCardTrigger>
      <HoverCardContent
        side="bottom"
        align="start"
        className="w-[220px] p-0 border-0 bg-[#3d3d3d] text-white rounded-[6px] shadow-lg overflow-hidden"
      >
        <div className="px-[12px] py-[10px]">
          <p className="font-['Roboto:Bold',sans-serif] font-bold text-[13px] text-white leading-tight">
            {title}
          </p>
        </div>
        <div className="h-px bg-[#555555]" />
        <div className="px-[12px] py-[10px]">
          <HoldRemovedContent hold={primaryHold} getReasonLabel={getReasonLabel} />
          {sortedHolds.length > 1 && (
            <p className="font-['Roboto:Regular',sans-serif] text-[10px] text-[#999] mt-[8px] italic">
              +{sortedHolds.length - 1} more hold{sortedHolds.length > 2 ? 's' : ''}. Click to view all.
            </p>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
