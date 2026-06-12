import { motion } from 'motion/react';

interface ArrowButtonProps {
  onClick: () => void;
  isAnimating?: boolean;
  onAnimationComplete?: () => void;
}

export function ArrowButton({ onClick, isAnimating = false, onAnimationComplete }: ArrowButtonProps) {
  const handleClick = () => {
    if (!isAnimating) {
      onClick();
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="bg-white relative rounded-[2px] shrink-0 size-[18px] cursor-pointer hover:bg-[#f7f8f9] transition-colors overflow-hidden"
      data-name="Arrow"
      disabled={isAnimating}
    >
      <motion.div
        className="relative size-[18px] flex items-center justify-center"
        animate={isAnimating ? { x: 100 } : { x: 0 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        onAnimationComplete={onAnimationComplete}
      >
        <svg
          width="11"
          height="11"
          viewBox="0 0 11 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0"
        >
          <path
            d="M6.5 2L10 5.5L6.5 9M9.5 5.5H1"
            stroke="#2474bb"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
      <div aria-hidden="true" className="absolute border-[#2474bb] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[2px]" />
    </button>
  );
}
