import blockedIcon from '../../../assets/holds/blocked.svg';
import blockedLockedIcon from '../../../assets/holds/blocked-1.svg';
import blockedCountIcon from '../../../assets/holds/blocked-2.svg';

type HoldIconVariant = 'overridable' | 'locked';

interface HoldIconProps {
  variant: HoldIconVariant;
  size?: number;
  count?: number;
  className?: string;
}

function getIconSrc(variant: HoldIconVariant, count: number): string {
  if (variant === 'locked') return blockedLockedIcon;
  if (count === 2) return blockedCountIcon;
  return blockedIcon;
}

function CountBadge({
  count,
  tone,
}: {
  count: number;
  tone: 'locked' | 'overridable';
}) {
  return (
    <span
      className={`absolute bottom-0 right-0 min-w-[10px] h-[10px] px-[2px] flex items-center justify-center rounded-full bg-white text-[8px] font-bold leading-none shadow-[0_1px_2px_rgba(0,0,0,0.25)] ${
        tone === 'locked' ? 'text-[#996200]' : 'text-black'
      }`}
      style={{ transform: 'translate(15%, 15%)' }}
    >
      {count}
    </span>
  );
}

export default function HoldIcon({
  variant,
  size = 24,
  count = 1,
  className = '',
}: HoldIconProps) {
  const src = getIconSrc(variant, count);
  const showCountBadge =
    count > 1 && (variant === 'locked' || count !== 2);

  return (
    <span
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <img
        src={src}
        alt=""
        className="block w-full h-full object-contain"
        draggable={false}
      />
      {showCountBadge && <CountBadge count={count} tone={variant} />}
    </span>
  );
}

export function HoldIconSmall({ className = '' }: { className?: string }) {
  return <HoldIcon variant="overridable" size={16} className={className} />;
}

export function PadlockIcon({ className = '' }: { className?: string }) {
  return (
    <img
      src={blockedLockedIcon}
      alt=""
      className={`size-[16px] object-contain ${className}`}
      draggable={false}
      aria-hidden="true"
    />
  );
}
