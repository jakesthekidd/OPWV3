import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card';
import HoldIcon from './HoldIcon';
import type { DocumentHold, HoldIndicatorVariant, HoldReason } from '../../types/documentHolds';

interface DocumentHoldTooltipProps {
  variant: HoldIndicatorVariant;
  holds: DocumentHold[];
  holdReasons: HoldReason[];
  getReasonLabel: (reasonId: string) => string;
  onClick?: () => void;
  children?: React.ReactNode;
}

export default function DocumentHoldTooltip({
  variant,
  holds,
  holdReasons,
  getReasonLabel,
  onClick,
  children,
}: DocumentHoldTooltipProps) {
  if (variant === 'none' || holds.length === 0) return null;

  const primaryHold = holds[0];
  const title = variant === 'locked' ? 'Document Locked' : 'Override Document Hold';
  const reasonLabel = getReasonLabel(primaryHold.reasonId);

  return (
    <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>
        <button
          type="button"
          className="relative shrink-0 flex items-center justify-center rounded-[2px] p-[2px] hover:bg-[#e8edf2] transition-colors cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onClick?.();
          }}
          aria-label={`${holds.length} active hold${holds.length > 1 ? 's' : ''} on document. Open hold details.`}
        >
          {children ?? (
            <HoldIcon
              variant={variant === 'locked' ? 'locked' : 'overridable'}
              size={22}
              count={holds.length}
            />
          )}
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
          <p className="font-['Roboto:Regular',sans-serif] text-[12px] text-white leading-snug">
            {reasonLabel}
          </p>
          {primaryHold.notes && (
            <p className="font-['Roboto:Regular',sans-serif] text-[11px] text-[#b0b0b0] mt-[4px] leading-snug">
              {primaryHold.notes}
            </p>
          )}
          {holds.length > 1 && (
            <p className="font-['Roboto:Regular',sans-serif] text-[10px] text-[#999] mt-[6px]">
              +{holds.length - 1} more hold{holds.length > 2 ? 's' : ''}
            </p>
          )}
        </div>
        <div className="h-px bg-[#555555]" />
        <div className="px-[12px] py-[8px]">
          <p className="font-['Roboto:Regular',sans-serif] text-[10px] text-[#999] italic">
            Document Set:{' '}
            <span className="font-bold not-italic text-white">
              {primaryHold.documentSet ?? 'Name'}
            </span>
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
