import { motion, AnimatePresence } from 'motion/react';
import { Check, Save } from 'lucide-react';

interface BottomControlBarProps {
  isVisible: boolean;
  onSave: () => void;
  onSaveAndApprove: () => void;
  onCancel: () => void;
  hasChanges: boolean;
  canApprove?: boolean; // Whether there are documents ready to approve
  approveCount?: number; // Number of documents to approve
}

export default function BottomControlBar({
  isVisible,
  onSave,
  onSaveAndApprove,
  onCancel,
  hasChanges,
  canApprove = false,
  approveCount = 0,
}: BottomControlBarProps) {
  return (
    <AnimatePresence>
      {isVisible && hasChanges && (
        <motion.div
          data-tour="save-bar"
          className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#e2e6eb] z-[100]"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{
            duration: 0.3,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          <div className="flex items-center justify-end px-[16px] py-[12px] gap-[12px]">
            {/* Action buttons */}
            <div className="flex items-center gap-[8px]">
              {/* Revert Changes button */}
              <motion.button
                onClick={onCancel}
                className="box-border content-stretch flex items-center justify-center px-[16px] py-[8px] relative rounded-[4px] shrink-0 cursor-pointer border border-[#e2e6eb] bg-white hover:bg-[#f5f7f9] transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
              >
                <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[12px] text-nowrap text-[#3d3d3d] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
                  Revert Changes
                </p>
              </motion.button>

              {/* Save button - always shown */}
              <motion.button
                onClick={onSave}
                className="box-border content-stretch flex gap-[6px] items-center justify-center px-[16px] py-[8px] relative rounded-[4px] shrink-0 cursor-pointer bg-[#174a78] hover:bg-[#123b60] transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
              >
                <Save className="w-[12px] h-[12px] text-white" />
                <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[12px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
                  Save
                </p>
              </motion.button>

              {/* Save and Approve button - only shown when there are documents to approve */}
              {canApprove && (
                <motion.button
                  onClick={onSaveAndApprove}
                  className="box-border content-stretch flex gap-[6px] items-center justify-center px-[16px] py-[8px] relative rounded-[4px] shrink-0 cursor-pointer bg-[#00bf30] hover:bg-[#00a528] transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <Check className="w-[12px] h-[12px] text-white" />
                  <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[12px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
                    Save & Approve {approveCount > 0 && `(${approveCount})`}
                  </p>
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
