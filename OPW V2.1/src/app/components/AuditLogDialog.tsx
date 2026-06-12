import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { ScrollArea } from './ui/scroll-area';
import { CircleCheck, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import svgPathsArrow from '../imports/svg-nfl9brerhj';
import svgPathsException from '../imports/svg-0ir5gwhpdc';

// Custom NotEqual icon component (≠ symbol) — same as ApprovedContainer
function NotEqual({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="9" x2="19" y2="9" />
      <line x1="5" y1="15" x2="19" y2="15" />
      <line x1="19" y1="5" x2="5" y2="19" />
    </svg>
  );
}

interface AuditField {
  label: string;
  expectedValue: string;
  evaluatedValue: string;
  user: string;
  action: 'match' | 'override' | 'ignored';
}

// Collapsible Document Panel — styled to match the Approved tab (ApprovedContainer)
function DocumentPanel({
  documentType,
  isApproved,
  approvedBy,
  dateTime,
  fields,
}: {
  documentType: string;
  isApproved: boolean;
  approvedBy?: string;
  dateTime?: string;
  fields: AuditField[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white relative w-full border-b border-[#e5e7eb]">
      {/* Panel Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full box-border content-stretch flex items-center justify-between px-[12px] py-[10px] relative cursor-pointer hover:bg-[#fafafa] transition-colors"
      >
        <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
            className="block overflow-visible relative shrink-0 size-[14px]"
          >
            <div className="absolute h-[14px] left-[calc(50%-0.492px)] top-[calc(50%-0.004px)] translate-x-[-50%] translate-y-[-50%] w-[8px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 12">
                <path d={svgPathsArrow.p3325b600} fill="var(--fill-0, #6b7280)" />
              </svg>
            </div>
          </motion.div>
          {isApproved ? (
            <CircleCheck className="h-4 w-4 text-[#00bf30]" />
          ) : (
            <div className="size-[16px] shrink-0">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
                <path d={svgPathsException.p173e2e081} fill="var(--fill-0, #FF5C00)" />
                <path d={svgPathsException.p173e2e082} fill="var(--fill-1, white)" />
              </svg>
            </div>
          )}
          <div className="flex flex-col font-['Roboto:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#1f2937] text-[13px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[normal] whitespace-pre">{documentType}</p>
          </div>
        </div>

        {/* Approval metadata (only for approved documents) */}
        {isApproved && approvedBy && dateTime && (
          <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
            <div className="content-stretch flex flex-col gap-[2px] items-start justify-center leading-[normal] text-left">
              <p className="font-['Roboto:Regular',sans-serif] font-normal text-[#9ca3af] text-[10px] leading-[1.2]" style={{ fontVariationSettings: "'wdth' 100" }}>
                Approved by
              </p>
              <p className="font-['Roboto:Medium',sans-serif] font-medium text-[#1f2937] text-[12px] leading-[1.2]" style={{ fontVariationSettings: "'wdth' 100" }}>
                {approvedBy}
              </p>
            </div>
            <div className="h-[24px] w-[1px] bg-[#e5e7eb]" />
            <div className="content-stretch flex flex-col gap-[2px] items-start justify-center leading-[normal] text-left">
              <p className="font-['Roboto:Regular',sans-serif] font-normal text-[#9ca3af] text-[10px] leading-[1.2]" style={{ fontVariationSettings: "'wdth' 100" }}>
                Date & Time
              </p>
              <p className="font-['Roboto:Medium',sans-serif] font-medium text-[#1f2937] text-[12px] leading-[1.2] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
                {dateTime}
              </p>
            </div>
          </div>
        )}
      </button>

      {/* Audit Table (collapsible) — same table language as the Approved tab */}
      {isOpen && (
        <div className="px-[12px] pb-[12px]">
          <div className="bg-white rounded-[4px] overflow-hidden relative border border-[#e5e7eb]">
            {/* Table Header */}
            <div className="bg-[#fafafa] box-border content-stretch flex items-center relative shrink-0 w-full border-b border-[#e5e7eb]">
              <div className="box-border content-stretch flex gap-[6px] h-[28px] items-center justify-start px-[10px] py-[6px] relative shrink-0 flex-1">
                <p className="font-['Roboto:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[11px] text-[#374151] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
                  Expected
                </p>
              </div>
              <div className="box-border content-stretch flex h-[28px] items-center justify-center relative shrink-0 w-[36px] border-l border-[#e5e7eb]" />
              <div className="box-border content-stretch flex gap-[6px] h-[28px] items-center justify-start px-[10px] py-[6px] relative shrink-0 flex-1">
                <p className="font-['Roboto:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[11px] text-[#374151] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
                  Evaluated
                </p>
              </div>
              <div className="box-border content-stretch flex gap-[6px] h-[28px] items-center justify-start px-[10px] py-[6px] relative shrink-0 w-[120px] border-l border-[#e5e7eb]">
                <p className="font-['Roboto:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[11px] text-[#374151] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
                  User
                </p>
              </div>
            </div>

            {/* Table Rows */}
            {fields.map((field, index) => {
              const expectedIcon = field.action === 'match' ? (
                <CircleCheck className="h-3.5 w-3.5 text-[#00bf30]" />
              ) : (
                <NotEqual className="h-3.5 w-3.5 text-[#9ca3af]" />
              );

              let actionIcon = null;
              if (field.action === 'override') {
                actionIcon = <ArrowRight className="h-3.5 w-3.5 text-[#2474BB]" />;
              } else if (field.action === 'ignored') {
                actionIcon = <NotEqual className="h-3.5 w-3.5 text-[#9ca3af]" />;
              }

              return (
                <div
                  key={index}
                  className="bg-white box-border content-stretch flex items-center relative shrink-0 w-full hover:bg-[#fafafa] transition-colors border-b border-[#e5e7eb] last:border-b-0"
                >
                  {/* Expected Column */}
                  <div className="box-border content-stretch flex gap-[8px] min-h-[44px] items-center px-[10px] py-[10px] relative shrink-0 flex-1">
                    <div className="flex items-center justify-center shrink-0">{expectedIcon}</div>
                    <div className="flex-1 content-stretch flex flex-col gap-[2px] items-start justify-center leading-[normal] min-w-0">
                      <p className="font-['Roboto:Regular',sans-serif] font-normal w-full text-[#9ca3af] text-[10px] leading-[1.2]" style={{ fontVariationSettings: "'wdth' 100" }}>
                        {field.label}
                      </p>
                      <p className="font-['Roboto:Medium',sans-serif] font-medium w-full text-[#1f2937] text-[12px] leading-[1.2]" style={{ fontVariationSettings: "'wdth' 100" }}>
                        {field.expectedValue || '---'}
                      </p>
                    </div>
                  </div>

                  {/* Action Sub-column */}
                  <div className="box-border content-stretch flex items-center justify-center min-h-[44px] px-[8px] py-[10px] relative shrink-0 w-[36px] border-l border-[#e5e7eb]">
                    {actionIcon}
                  </div>

                  {/* Evaluated Column */}
                  <div className="box-border content-stretch flex gap-[8px] min-h-[44px] items-center justify-start px-[10px] py-[10px] relative shrink-0 flex-1">
                    <div className="flex-1 content-stretch flex flex-col gap-[2px] items-start justify-center leading-[normal] min-w-0">
                      <p className="font-['Roboto:Regular',sans-serif] font-normal w-full text-[#9ca3af] text-[10px] leading-[1.2]" style={{ fontVariationSettings: "'wdth' 100" }}>
                        {field.label}
                      </p>
                      <p className="font-['Roboto:Medium',sans-serif] font-medium w-full text-[#1f2937] text-[12px] leading-[1.2]" style={{ fontVariationSettings: "'wdth' 100" }}>
                        {field.action === 'ignored' ? '---' : (field.evaluatedValue || '---')}
                      </p>
                    </div>
                  </div>

                  {/* User Column */}
                  <div className="box-border content-stretch flex items-center px-[10px] py-[10px] relative shrink-0 w-[120px] min-h-[44px] border-l border-[#e5e7eb]">
                    <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.2] w-full text-[#6b7280] text-[12px] truncate" style={{ fontVariationSettings: "'wdth' 100" }}>
                      {field.user}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// Main Audit Log Dialog Component
export function AuditLogDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  // Mock data matching the current screen state
  const auditDocuments = [
    {
      documentType: "Lumper",
      isApproved: true,
      approvedBy: "Kross, John",
      dateTime: "03/04/2025 (12:30pm)",
      fields: [
        {
          label: "Date",
          expectedValue: "2025/04/23",
          evaluatedValue: "2025/04/23",
          user: "Kriss Johnson",
          action: 'override' as const
        },
        {
          label: "Total",
          expectedValue: "$900",
          evaluatedValue: "---",
          user: "---",
          action: 'ignored' as const
        },
        {
          label: "Location",
          expectedValue: "TA 184",
          evaluatedValue: "TA 184",
          user: "System",
          action: 'match' as const
        }
      ]
    },
    {
      documentType: "Scale Ticket",
      isApproved: false,
      fields: [
        {
          label: "Weight",
          expectedValue: "45,000 lbs",
          evaluatedValue: "45,200 lbs",
          user: "Kriss Johnson",
          action: 'override' as const
        },
        {
          label: "Date",
          expectedValue: "2025/04/23",
          evaluatedValue: "2025/04/23",
          user: "System",
          action: 'match' as const
        },
        {
          label: "Location",
          expectedValue: "Scale #12",
          evaluatedValue: "---",
          user: "---",
          action: 'ignored' as const
        }
      ]
    },
    {
      documentType: "Fuel Receipt",
      isApproved: true,
      approvedBy: "System",
      dateTime: "03/04/2025 (11:45am)",
      fields: [
        {
          label: "Gallons",
          expectedValue: "120.5",
          evaluatedValue: "120.5",
          user: "System",
          action: 'match' as const
        },
        {
          label: "Price",
          expectedValue: "$3.45",
          evaluatedValue: "$3.45",
          user: "System",
          action: 'match' as const
        },
        {
          label: "Location",
          expectedValue: "Pilot #458",
          evaluatedValue: "Pilot #458",
          user: "System",
          action: 'match' as const
        }
      ]
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[560px] max-h-[80vh] p-0 gap-0 overflow-hidden rounded-[10px] border border-[#e3e8ee] shadow-[0px_12px_32px_rgba(15,23,42,0.16)]">
        <DialogTitle className="sr-only">Audit Log</DialogTitle>
        <DialogDescription className="sr-only">
          Complete history of all documents and actions taken on this load
        </DialogDescription>

        {/* Header — matches the shared info-card treatment */}
        <div className="h-[3px] w-full bg-gradient-to-r from-[#174a78] via-[#2474bb] to-[#72cdf4]" />
        <div className="px-[16px] py-[12px] bg-[#f8fafc] border-b border-[#e9edf2]">
          <p className="font-['Roboto:SemiBold',sans-serif] font-semibold text-[14px] text-[#123b60] leading-tight" style={{ fontVariationSettings: "'wdth' 100" }}>
            Audit Log
          </p>
          <p className="font-['Roboto:Regular',sans-serif] font-normal text-[11px] text-[#8d9aae] mt-[2px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Complete history of all documents and actions taken on this load
          </p>
        </div>

        <ScrollArea className="max-h-[calc(80vh-80px)]">
          <div className="flex flex-col">
            {auditDocuments.map((doc, index) => (
              <DocumentPanel key={index} {...doc} />
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
