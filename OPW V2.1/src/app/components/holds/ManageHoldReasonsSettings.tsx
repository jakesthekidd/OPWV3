import { useState } from 'react';
import { Plus, Pencil, Archive } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '../ui/dialog';
import { Input } from '../ui/input';
import type { HoldReason } from '../../types/documentHolds';

interface ManageHoldReasonsSettingsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  holdReasons: HoldReason[];
  onAdd: (label: string) => void;
  onUpdate: (id: string, label: string) => void;
  onRetire: (id: string) => void;
}

export default function ManageHoldReasonsSettings({
  open,
  onOpenChange,
  holdReasons,
  onAdd,
  onUpdate,
  onRetire,
}: ManageHoldReasonsSettingsProps) {
  const [newLabel, setNewLabel] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editLabel, setEditLabel] = useState('');

  const activeReasons = holdReasons.filter((r) => !r.isRetired);
  const retiredReasons = holdReasons.filter((r) => r.isRetired);

  const handleAdd = () => {
    if (!newLabel.trim()) return;
    onAdd(newLabel.trim());
    setNewLabel('');
  };

  const startEdit = (reason: HoldReason) => {
    setEditingId(reason.id);
    setEditLabel(reason.label);
  };

  const saveEdit = () => {
    if (editingId && editLabel.trim()) {
      onUpdate(editingId, editLabel.trim());
    }
    setEditingId(null);
    setEditLabel('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[560px] p-0 gap-0 overflow-hidden rounded-[8px] border border-[#e3e8ee]">
        <div className="h-[3px] w-full bg-gradient-to-r from-[#174a78] via-[#2474bb] to-[#72cdf4]" />
        <DialogTitle className="sr-only">Manage Hold Reasons</DialogTitle>
        <DialogDescription className="sr-only">
          Add, edit, and retire standardized hold reasons
        </DialogDescription>

        <div className="px-[20px] py-[14px] bg-[#f8fafc] border-b border-[#e9edf2]">
          <p className="font-['Roboto:SemiBold',sans-serif] font-semibold text-[14px] text-[#123b60]">
            Manage Hold Reasons
          </p>
          <p className="font-['Roboto:Regular',sans-serif] text-[11px] text-[#8d9aae] mt-[2px]">
            Standardized reasons used when placing or automating document holds
          </p>
        </div>

        <div className="px-[20px] py-[16px]">
          <div className="flex gap-[8px] mb-[16px]">
            <Input
              placeholder="New hold reason..."
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
              className="flex-1 h-[36px]"
            />
            <button
              type="button"
              onClick={handleAdd}
              disabled={!newLabel.trim()}
              className="flex items-center gap-[6px] px-[14px] py-[8px] text-[12px] text-white bg-[#2474bb] rounded-[4px] hover:bg-[#1e5f9a] disabled:opacity-50 transition-colors"
            >
              <Plus className="size-[14px]" />
              Add
            </button>
          </div>

          <div className="border border-[#e5e7eb] rounded-[6px] overflow-hidden">
            <div className="bg-[#fafafa] flex items-center px-[12px] py-[8px] border-b border-[#e5e7eb]">
              <p className="flex-1 font-['Roboto:SemiBold',sans-serif] font-semibold text-[11px] text-[#374151] uppercase tracking-wide">
                Active Reasons
              </p>
              <p className="w-[100px] font-['Roboto:SemiBold',sans-serif] font-semibold text-[11px] text-[#374151] uppercase tracking-wide text-right">
                Actions
              </p>
            </div>
            {activeReasons.length === 0 ? (
              <div className="px-[12px] py-[16px] text-[12px] text-[#8d9aae] text-center">
                No active hold reasons
              </div>
            ) : (
              activeReasons.map((reason) => (
                <div
                  key={reason.id}
                  className="flex items-center px-[12px] py-[10px] border-b border-[#f1f4f7] last:border-b-0 hover:bg-[#fafafa] transition-colors"
                >
                  {editingId === reason.id ? (
                    <div className="flex-1 flex gap-[8px]">
                      <Input
                        value={editLabel}
                        onChange={(e) => setEditLabel(e.target.value)}
                        className="h-[32px] text-[13px]"
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={saveEdit}
                        className="px-[10px] text-[12px] text-white bg-[#2474bb] rounded-[4px]"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        className="px-[10px] text-[12px] text-[#5a626f] border border-[#e2e6eb] rounded-[4px]"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <p className="flex-1 font-['Roboto:Regular',sans-serif] text-[13px] text-[#1f2937]">
                        {reason.label}
                      </p>
                      <div className="flex items-center gap-[4px] w-[100px] justify-end">
                        <button
                          type="button"
                          onClick={() => startEdit(reason)}
                          className="p-[6px] text-[#2474bb] hover:bg-[#eaf8fd] rounded-[4px] transition-colors"
                          aria-label={`Edit ${reason.label}`}
                        >
                          <Pencil className="size-[14px]" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onRetire(reason.id)}
                          className="p-[6px] text-[#8d9aae] hover:bg-[#f1f4f7] rounded-[4px] transition-colors"
                          aria-label={`Retire ${reason.label}`}
                        >
                          <Archive className="size-[14px]" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
          </div>

          {retiredReasons.length > 0 && (
            <div className="mt-[16px]">
              <p className="font-['Roboto:Medium',sans-serif] font-medium text-[10px] text-[#8d9aae] uppercase tracking-wide mb-[8px]">
                Retired ({retiredReasons.length})
              </p>
              <div className="border border-[#e5e7eb] rounded-[6px] overflow-hidden opacity-60">
                {retiredReasons.map((reason) => (
                  <div
                    key={reason.id}
                    className="flex items-center px-[12px] py-[8px] border-b border-[#f1f4f7] last:border-b-0"
                  >
                    <p className="flex-1 font-['Roboto:Regular',sans-serif] text-[12px] text-[#8d9aae] line-through">
                      {reason.label}
                    </p>
                    <span className="text-[10px] text-[#8d9aae] italic">Retired</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end px-[20px] py-[14px] border-t border-[#e2e6eb]">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="px-[20px] py-[8px] text-[13px] text-[#2474bb] border border-[#2474bb] rounded-[4px] hover:bg-[#f0f7fc] transition-colors"
          >
            Done
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
