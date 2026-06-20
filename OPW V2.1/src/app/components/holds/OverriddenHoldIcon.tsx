import overriddenIcon from '../../../assets/holds/overridden.svg';

interface OverriddenHoldIconProps {
  size?: number;
  className?: string;
}

export default function OverriddenHoldIcon({
  size = 22,
  className = '',
}: OverriddenHoldIconProps) {
  return (
    <img
      src={overriddenIcon}
      alt=""
      className={`block object-contain shrink-0 ${className}`}
      style={{ width: size, height: size }}
      draggable={false}
      aria-hidden="true"
    />
  );
}
