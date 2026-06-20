import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';
import { HoldIconSmall } from './HoldIcon';
import type { HoldReason, ManualHoldEntry } from '../../types/documentHolds';

interface AddDocumentHoldDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  documentSection: string;
  holdReasons: HoldReason[];
  onSubmit: (entries: ManualHoldEntry[]) => void;
}

interface HoldRow {
  id: string;
  reasonId: string;
  notes: string;
}

export default function AddDocumentHoldDialog({
  open,
  onOpenChange,
  documentSection,
  holdReasons,
  onSubmit,
}: AddDocumentHoldDialogProps) {
  const [rows, setRows] = useState<HoldRow[]>([{ id: 'row-1', reasonId: '', notes: '' }]);

  const activeReasons = holdReasons.filter((r) => !r.isRetired);

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      setRows([{ id: 'row-1', reasonId: '', notes: '' }]);
    }
    onOpenChange(isOpen);
  };

  const handleAddRow = () => {
    setRows((prev) => [...prev, { id: `row-${Date.now()}`, reasonId: '', notes: '' }]);
  };

  const handleSubmit = () => {
    const entries = rows
      .filter((r) => r.reasonId)
      .map((r) => ({ reasonId: r.reasonId, notes: r.notes || undefined }));
    if (entries.length === 0) return;
    onSubmit(entries);
    handleClose(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-[480px] p-0 gap-0 overflow-hidden rounded-[8px] border border-[#e3e8ee]">
        <div className="h-[4px] w-full bg-[#2474bb]" />
        <DialogTitle className="sr-only">Add Document Hold</DialogTitle>
        <DialogDescription className="sr-only">
          Place {documentSection} on hold with a standardized reason
        </DialogDescription>

        <div className="px-[24px] pt-[20px] pb-[16px]">
          <div className="flex items-center gap-[10px] mb-[12px]">
            <HoldIconSmall />
            <h2 className="font-['Roboto:Bold',sans-serif] font-bold text-[18px] text-[#3d3d3d]">
              Add Document Hold
            </h2>
          </div>
          <p className="font-['Roboto:Bold',sans-serif] font-bold text-[13px] text-[#3d3d3d] mb-[16px]">
            You&apos;re about to place this document on hold. Please provide a hold reason.
          </p>

          <div className="flex flex-col gap-[16px]">
            {rows.map((row, index) => (
              <div key={row.id}>
                {index > 0 && (
                  <div className="flex items-center gap-[8px] mb-[16px]">
                    <div className="flex-1 h-px bg-[#e2e6eb]" />
                    <HoldIconSmall />
                    <div className="flex-1 h-px bg-[#e2e6eb]" />
                  </div>
                )}
                <div className="flex flex-col gap-[10px]">
                  <Select
                    value={row.reasonId}
                    onValueChange={(value) =>
                      setRows((prev) =>
                        prev.map((r) => (r.id === row.id ? { ...r, reasonId: value } : r))
                      )
                    }
                  >
                    <SelectTrigger className="w-full h-[40px] border-[#c6ccd6] text-[#3d3d3d]">
                      <SelectValue placeholder="Select Hold Reason" />
                    </SelectTrigger>
                    <SelectContent>
                      {activeReasons.map((reason) => (
                        <SelectItem key={reason.id} value={reason.id}>
                          {reason.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Add Notes"
                    value={row.notes}
                    onChange={(e) =>
                      setRows((prev) =>
                        prev.map((r) => (r.id === row.id ? { ...r, notes: e.target.value } : r))
                      )
                    }
                    className="h-[40px] border-[#c6ccd6]"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="relative flex items-center justify-center my-[20px]">
            <div className="absolute inset-x-0 h-px bg-[#e2e6eb]" />
            <button
              type="button"
              onClick={handleAddRow}
              className="relative flex items-center gap-[6px] px-[16px] py-[6px] bg-[#eaf8fd] border border-[#72cdf4] rounded-full text-[#2474bb] text-[12px] font-['Roboto:Regular',sans-serif] hover:bg-[#d4f0fc] transition-colors"
            >
              <Plus className="size-[14px]" />
              Add Hold Reason
            </button>
          </div>
        </div>

        <div className="flex items-center justify-end gap-[10px] px-[24px] py-[16px] border-t border-[#e2e6eb]">
          <button
            type="button"
            onClick={() => handleClose(false)}
            className="px-[20px] py-[8px] text-[13px] text-[#2474bb] border border-[#2474bb] rounded-[4px] hover:bg-[#f0f7fc] transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!rows.some((r) => r.reasonId)}
            className="px-[20px] py-[8px] text-[13px] text-white bg-[#2474bb] rounded-[4px] hover:bg-[#1e5f9a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add Hold
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
