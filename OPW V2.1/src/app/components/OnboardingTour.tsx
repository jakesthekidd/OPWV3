import { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, X, ArrowLeft, ArrowRight, Check, Sparkles } from 'lucide-react';

/**
 * OnboardingTour
 * A lightweight, dependency-free spotlight tour.
 * - Auto-launches once per browser (remembered via localStorage).
 * - Re-openable anytime via the floating Help button.
 * - Highlights real UI elements tagged with `data-tour="<id>"`.
 * - Falls back to a centered card when a target isn't on screen.
 */

const STORAGE_KEY = 'opw-onboarding-v2';
const CARD_W = 348;
const TOUR_START_EVENT = 'opw-tour-start';
const TOUR_READY_ANCHORS = ['tabs', 'doc-sidebar', 'field-exceptions'];

function hasCompletedTour(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'done';
  } catch {
    return false;
  }
}

function waitForTourAnchors(maxMs = 4000): Promise<void> {
  return new Promise((resolve) => {
    const started = Date.now();

    const check = () => {
      const ready = TOUR_READY_ANCHORS.every((id) => {
        const el = document.querySelector(`[data-tour="${id}"]`) as HTMLElement | null;
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
      });

      if (ready || Date.now() - started >= maxMs) {
        resolve();
        return;
      }

      requestAnimationFrame(check);
    };

    requestAnimationFrame(check);
  });
}

interface Step {
  selector?: string; // matches [data-tour="..."]; omit for a centered step
  getRect?: () => Rect; // fixed screen region (used instead of a DOM anchor)
  title: string;
  body: string;
}

const STEPS: Step[] = [
  {
    title: 'Welcome to your workspace',
    body: "This is where documents captured in the field land for review. Our AI reads each one and flags anything that needs a human eye — your job is to clear those flags and approve the load.\n\nThis quick tour takes about a minute. You can **skip** anytime.",
  },
  {
    // The header is a layered Figma export, so we spotlight the fixed top band
    // (the app pins its content at top-[118px]) instead of a DOM node.
    getRect: () => ({ top: 0, left: 0, width: window.innerWidth, height: 118 }),
    title: 'The load you’re working on',
    body: "Up here you’ll see the load’s ID, route, dates, and shipment status. **Tags** like “Duplicate Review” call out things worth a closer look before you approve.",
  },
  {
    selector: 'tabs',
    title: 'Your work queue',
    body: "Everything is organized into two tabs. **Exceptions** holds whatever still needs attention. **Approved** shows what you’ve already cleared. The number on each tab is how many items are inside.",
  },
  {
    selector: 'unclassified',
    title: 'Unclassified documents',
    body: "Sometimes the AI can’t tell what a document is. Those land here. Open one to take a look, then use **Change Type** to file it as the right kind of document.",
  },
  {
    selector: 'missing',
    title: 'Missing documents',
    body: "Documents we expected for this load but didn’t receive show up here. If one isn’t actually needed, click **Ignore** to set it aside.",
  },
  {
    selector: 'field-exceptions',
    title: 'Field exceptions — the heart of the review',
    body: "Here we compare each field two ways: **Expected** is the value from your system, and **Evaluated** is what the AI read from the scan.\n\nTo fix a mismatch, you can **type** the correct value, click the **→ arrow** to accept the Expected value, or **Ignore** it if it doesn’t matter. A field turns green once it’s good.",
  },
  {
    selector: 'viewer-toolbar',
    title: 'Read the actual document',
    body: "The scanned document opens on the right. Use these controls to **flip pages, zoom, and rotate** so you can confirm every value against the real paperwork.",
  },
  {
    selector: 'doc-sidebar',
    title: 'Every page at a glance',
    body: "All the pages in this load live here as thumbnails. You can **upload** new files, **drag a page** to re-file it under the right document, or drop it onto **Approve / Reject**.",
  },
  {
    selector: 'save-bar',
    getRect: () => {
      const el = document.querySelector('[data-tour="save-bar"]') as HTMLElement | null;
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          return { top: rect.top, left: rect.left, width: rect.width, height: rect.height };
        }
      }
      return {
        top: window.innerHeight - 56,
        left: 0,
        width: window.innerWidth,
        height: 56,
      };
    },
    title: 'Save & approve',
    body: "When a document’s fields are all clean, it’s ready. A bar appears at the bottom with **Save** (keep your progress) and **Save & Approve** (clear the document and send it onward).\n\nThat’s the whole loop — you’re ready to go! 🎉",
  },
];

interface Rect { top: number; left: number; width: number; height: number; }

/** Renders text with **bold** segments and preserves blank-line breaks. */
function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split('\n').map((line, li) => (
        <span key={li} style={{ display: 'block', minHeight: line === '' ? '0.6em' : undefined }}>
          {line.split(/(\*\*[^*]+\*\*)/g).map((part, pi) =>
            part.startsWith('**') && part.endsWith('**') ? (
              <strong key={pi} className="font-semibold text-[#123b60]">{part.slice(2, -2)}</strong>
            ) : (
              <span key={pi}>{part}</span>
            )
          )}
        </span>
      ))}
    </>
  );
}

export default function OnboardingTour() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [targetRect, setTargetRect] = useState<Rect | null>(null);
  const [cardPos, setCardPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const total = STEPS.length;
  const current = STEPS[step];
  const isLast = step === total - 1;

  const measure = useCallback(() => {
    const def = STEPS[step];
    if (def?.getRect) { setTargetRect(def.getRect()); return; }
    const sel = def?.selector;
    if (!sel) { setTargetRect(null); return; }
    const el = document.querySelector(`[data-tour="${sel}"]`) as HTMLElement | null;
    if (!el) { setTargetRect(null); return; }
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) { setTargetRect(null); return; }
    setTargetRect({ top: r.top, left: r.left, width: r.width, height: r.height });
  }, [step]);

  const openTour = useCallback((fromAutoLaunch = false) => {
    setStep(0);
    setIsOpen(true);
    if (fromAutoLaunch) {
      window.dispatchEvent(new CustomEvent(TOUR_START_EVENT));
    }
  }, []);

  const finish = useCallback(() => {
    setIsOpen(false);
    try { localStorage.setItem(STORAGE_KEY, 'done'); } catch { /* ignore */ }
  }, []);

  const start = useCallback(() => {
    openTour(false);
  }, [openTour]);

  // Auto-launch on first visit once the workspace UI is painted.
  useEffect(() => {
    if (hasCompletedTour()) return;

    let cancelled = false;

    const launch = async () => {
      await waitForTourAnchors();
      if (cancelled || hasCompletedTour()) return;
      openTour(true);
    };

    launch();

    return () => {
      cancelled = true;
    };
  }, [openTour]);

  // On step change: scroll the target into view, then measure (re-measure to catch scroll/expand animations).
  useEffect(() => {
    if (!isOpen) return;
    const def = STEPS[step];
    if (def?.selector && !def.getRect) {
      const el = document.querySelector(`[data-tour="${def.selector}"]`) as HTMLElement | null;
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    measure();
    const t1 = setTimeout(measure, 220);
    const t2 = setTimeout(measure, 480);
    const t3 = setTimeout(measure, 900);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [isOpen, step, measure]);

  // Initial measure when the tour opens so the welcome card is positioned immediately.
  useEffect(() => {
    if (!isOpen) return;
    measure();
    const t = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(t);
  }, [isOpen, measure]);

  // Keep aligned on resize / scroll.
  useEffect(() => {
    if (!isOpen) return;
    const onChange = () => measure();
    window.addEventListener('resize', onChange);
    window.addEventListener('scroll', onChange, true);
    return () => {
      window.removeEventListener('resize', onChange);
      window.removeEventListener('scroll', onChange, true);
    };
  }, [isOpen, measure]);

  // Keyboard: Esc to skip, arrows to navigate.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') finish();
      else if (e.key === 'ArrowRight') setStep(s => Math.min(s + 1, total - 1));
      else if (e.key === 'ArrowLeft') setStep(s => Math.max(s - 1, 0));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, finish, total]);

  // Position the card relative to the target (or center it).
  useLayoutEffect(() => {
    if (!isOpen) return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const cardH = cardRef.current?.offsetHeight ?? 220;
    const cardW = CARD_W;
    const gap = 16;
    const margin = 16;

    if (!targetRect) {
      setCardPos({ top: (vh - cardH) / 2, left: (vw - cardW) / 2 });
      return;
    }

    const r = targetRect;
    const spaceBelow = vh - (r.top + r.height);
    const spaceAbove = r.top;
    const spaceRight = vw - (r.left + r.width);
    const spaceLeft = r.left;

    // Center the card under wide targets; align to the left edge of narrow ones.
    const alignedLeft = r.width > cardW ? r.left + (r.width - cardW) / 2 : r.left;

    let top: number;
    let left: number;
    if (spaceBelow >= cardH + gap) { top = r.top + r.height + gap; left = alignedLeft; }
    else if (spaceAbove >= cardH + gap) { top = r.top - cardH - gap; left = alignedLeft; }
    else if (spaceRight >= cardW + gap) { left = r.left + r.width + gap; top = r.top; }
    else if (spaceLeft >= cardW + gap) { left = r.left - cardW - gap; top = r.top; }
    else { left = (vw - cardW) / 2; top = (vh - cardH) / 2; }

    left = Math.min(Math.max(left, margin), vw - cardW - margin);
    top = Math.min(Math.max(top, margin), vh - cardH - margin);
    setCardPos({ top, left });
  }, [isOpen, targetRect, step]);

  const pad = 8;
  const spot = targetRect
    ? {
        top: targetRect.top - pad,
        left: targetRect.left - pad,
        width: targetRect.width + pad * 2,
        height: targetRect.height + pad * 2,
      }
    : null;

  return createPortal(
    <>
      {/* Floating Help button (visible when the tour is closed). */}
      {!isOpen && (
        <motion.button
          onClick={start}
          title="Take a tour"
          aria-label="Take a tour"
          className="fixed bottom-[72px] right-[24px] z-[60] flex items-center justify-center size-[38px] rounded-full bg-white border border-[#2474bb] text-[#2474bb] shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:bg-[#eaf4fc] transition-colors"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
        >
          <HelpCircle className="size-[20px]" />
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="tour"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Click blocker — keeps the underlying UI from being interacted with mid-tour. */}
            <div className="fixed inset-0 z-[9998]" onClick={() => { /* swallow */ }} />

            {/* Dimmer + spotlight */}
            {spot ? (
              <motion.div
                className="fixed z-[9998] rounded-[10px] pointer-events-none"
                initial={false}
                animate={{ top: spot.top, left: spot.left, width: spot.width, height: spot.height }}
                transition={{ type: 'spring', stiffness: 320, damping: 34 }}
                style={{ boxShadow: '0 0 0 9999px rgba(15,23,42,0.58)' }}
              >
                <div className="absolute inset-0 rounded-[10px] ring-2 ring-white/95 shadow-[0_0_0_2px_rgba(36,116,187,0.6)]" />
              </motion.div>
            ) : (
              <div className="fixed inset-0 z-[9998] bg-[rgba(15,23,42,0.58)] pointer-events-none" />
            )}

            {/* Tooltip card */}
            <motion.div
              ref={cardRef}
              className="fixed z-[9999] bg-white rounded-[14px] shadow-[0_12px_40px_rgba(0,0,0,0.22)] overflow-hidden"
              style={{ top: cardPos.top, left: cardPos.left, width: CARD_W }}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.18 }}
            >
              {/* Accent strip */}
              <div className="h-[4px] w-full bg-gradient-to-r from-[#2474bb] to-[#00bf30]" />

              <div className="px-[20px] pt-[16px] pb-[18px]">
                {/* Top row: step counter + close */}
                <div className="flex items-center justify-between mb-[10px]">
                  <div className="flex items-center gap-[6px] text-[#2474bb]">
                    <Sparkles className="size-[14px]" />
                    <span className="text-[12px] font-semibold tracking-wide">
                      Step {step + 1} of {total}
                    </span>
                  </div>
                  <button
                    onClick={finish}
                    aria-label="Close tour"
                    className="flex items-center justify-center size-[24px] rounded-[6px] text-[#8d9aae] hover:bg-[#f1f4f7] hover:text-[#3d3d3d] transition-colors"
                  >
                    <X className="size-[16px]" />
                  </button>
                </div>

                {/* Title */}
                <h3 className="text-[17px] font-semibold text-[#123b60] leading-snug mb-[8px]">
                  {current.title}
                </h3>

                {/* Body */}
                <div className="text-[13.5px] leading-[1.55] text-[#3d3d3d]">
                  <RichText text={current.body} />
                </div>

                {/* Progress dots */}
                <div className="flex items-center gap-[5px] mt-[16px] mb-[14px]">
                  {STEPS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setStep(i)}
                      aria-label={`Go to step ${i + 1}`}
                      className="rounded-full transition-all"
                      style={{
                        width: i === step ? 18 : 7,
                        height: 7,
                        backgroundColor: i === step ? '#2474bb' : i < step ? '#9cc3e0' : '#dde3ea',
                      }}
                    />
                  ))}
                </div>

                {/* Footer actions */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={finish}
                    className="text-[13px] text-[#8d9aae] hover:text-[#3d3d3d] transition-colors"
                  >
                    Skip tour
                  </button>

                  <div className="flex items-center gap-[8px]">
                    {step > 0 && (
                      <button
                        onClick={() => setStep(s => Math.max(s - 1, 0))}
                        className="flex items-center gap-[5px] px-[12px] py-[7px] rounded-[7px] border border-[#e2e6eb] text-[13px] text-[#3d3d3d] hover:bg-[#f5f7f9] transition-colors"
                      >
                        <ArrowLeft className="size-[14px]" />
                        Back
                      </button>
                    )}
                    {isLast ? (
                      <button
                        onClick={finish}
                        className="flex items-center gap-[5px] px-[14px] py-[7px] rounded-[7px] bg-[#00bf30] hover:bg-[#00a528] text-white text-[13px] font-medium transition-colors"
                      >
                        <Check className="size-[14px]" />
                        Done
                      </button>
                    ) : (
                      <button
                        onClick={() => setStep(s => Math.min(s + 1, total - 1))}
                        className="flex items-center gap-[5px] px-[14px] py-[7px] rounded-[7px] bg-[#174a78] hover:bg-[#123b60] text-white text-[13px] font-medium transition-colors"
                      >
                        Next
                        <ArrowRight className="size-[14px]" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>,
    document.body
  );
}
