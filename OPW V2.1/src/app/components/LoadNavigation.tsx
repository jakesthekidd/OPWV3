import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, ArrowLeft, ArrowRight } from 'lucide-react';

/**
 * Load navigation for the header.
 * - "Next" advances to the next load in the queue (no caret, per design).
 * - "Previous" goes back to the most recently visited load.
 * - The caret on Previous opens a RECENT dropdown of visit history,
 *   letting the user jump straight back to any earlier load.
 * Demo prototype: switching loads only updates the load ID shown in the
 * header — the workspace content is mock data for a single load.
 */

const LOADS = [
  'LD-444444444',
  'LD-444444445',
  'LD-444444446',
  'LD-444444447',
  'LD-444444448',
];

const HISTORY_LIMIT = 8;

interface LoadContextValue {
  currentLoadId: string;
  history: string[];
  goNext: () => void;
  goBack: () => void;
  goToLoad: (id: string) => void;
}

const LoadContext = createContext<LoadContextValue | null>(null);

export function useLoad() {
  const ctx = useContext(LoadContext);
  if (!ctx) throw new Error('useLoad must be used within LoadProvider');
  return ctx;
}

export function LoadProvider({ children }: { children: React.ReactNode }) {
  const [currentLoadId, setCurrentLoadId] = useState(LOADS[0]);
  const [history, setHistory] = useState<string[]>([]); // most recent first

  const goNext = () => {
    const next = LOADS[(LOADS.indexOf(currentLoadId) + 1) % LOADS.length];
    setHistory([currentLoadId, ...history].slice(0, HISTORY_LIMIT));
    setCurrentLoadId(next);
  };

  const goBack = () => {
    if (history.length === 0) return;
    const [target, ...rest] = history;
    setCurrentLoadId(target);
    setHistory(rest);
  };

  const goToLoad = (id: string) => {
    const idx = history.indexOf(id);
    if (idx === -1) return;
    setCurrentLoadId(id);
    // Jumping back discards this entry and everything visited after it.
    setHistory(history.slice(idx + 1));
  };

  return (
    <LoadContext.Provider value={{ currentLoadId, history, goNext, goBack, goToLoad }}>
      {children}
    </LoadContext.Provider>
  );
}

export default function LoadNavigation() {
  const { history, goNext, goBack, goToLoad } = useLoad();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState<{ top: number; left: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const hasHistory = history.length > 0;

  const toggleDropdown = () => {
    if (isDropdownOpen) {
      setIsDropdownOpen(false);
      return;
    }
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) setDropdownPos({ top: rect.bottom + 4, left: rect.left });
    setIsDropdownOpen(true);
  };

  // Close the dropdown on outside click (it renders in a portal, so check both).
  useEffect(() => {
    if (!isDropdownOpen) return;
    const onMouseDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (containerRef.current?.contains(target) || dropdownRef.current?.contains(target)) return;
      setIsDropdownOpen(false);
    };
    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, [isDropdownOpen]);

  return (
    <div ref={containerRef} className="relative shrink-0" data-name="previous/next button">
      <div className="content-stretch flex items-center relative rounded-bl-[3px] rounded-tl-[3px] shrink-0" data-name="Previous-next Button">
        {/* Previous segment (blue) */}
        <div
          className="bg-[#2474bb] box-border content-stretch flex h-[26px] items-center justify-center px-[8px] relative rounded-bl-[3px] rounded-tl-[3px] shrink-0"
          data-name="Previous button"
        >
          <div aria-hidden="true" className="absolute border-[1px_0px_1px_1px] border-solid border-white inset-0 pointer-events-none rounded-bl-[3px] rounded-tl-[3px]" />
          <div className="content-stretch flex gap-[6px] items-center relative shrink-0">
            <button
              onClick={goBack}
              disabled={!hasHistory}
              className={`content-stretch flex gap-[6px] items-center shrink-0 bg-transparent border-none p-0 transition-opacity ${
                hasHistory ? 'cursor-pointer hover:opacity-80' : 'cursor-default opacity-50'
              }`}
              aria-label="Go to previous load"
            >
              <ArrowLeft className="h-[11px] w-[11px] text-white" />
              <p className="font-['Roboto:Bold',_sans-serif] font-bold leading-[normal] relative shrink-0 text-[10px] text-nowrap text-right text-white whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
                Previous
              </p>
            </button>
            <p className="font-['Roboto:Bold',_sans-serif] font-bold leading-[normal] relative shrink-0 text-[10px] text-nowrap text-right text-white whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
              |
            </p>
            <button
              onClick={toggleDropdown}
              className="bg-[#2474bb] box-border content-stretch flex gap-[6px] items-center px-[2px] py-[3px] relative rounded-[2px] shrink-0 cursor-pointer border-none transition-colors hover:bg-[#1d5f99]"
              data-name="Blue drop down"
              aria-label="Show recent loads"
              aria-expanded={isDropdownOpen}
            >
              <ChevronDown className={`h-[11px] w-[11px] text-white transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {/* Next segment (white, no caret) */}
        <button
          onClick={goNext}
          className="bg-white box-border content-stretch flex h-[26px] items-center justify-center px-[8px] relative rounded-br-[3px] rounded-tr-[3px] shrink-0 cursor-pointer border-none transition-colors hover:bg-[#eaf4fc]"
          data-name="Next button"
          aria-label="Go to next load"
        >
          <div className="content-stretch flex gap-[6px] items-center justify-end relative shrink-0">
            <p className="font-['Roboto:Bold',_sans-serif] font-bold leading-[normal] relative shrink-0 text-[#2474bb] text-[10px] text-nowrap text-right whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
              Next
            </p>
            <ArrowRight className="h-[11px] w-[11px] text-[#2474bb]" />
          </div>
        </button>
      </div>

      {/* RECENT history dropdown — rendered in a portal so it isn't trapped
          beneath the main content's stacking context. */}
      {isDropdownOpen && dropdownPos && createPortal(
        <div
          ref={dropdownRef}
          className="fixed bg-white border border-[#e3e8ee] border-solid content-stretch flex flex-col items-start overflow-clip rounded-[6px] shadow-[0px_12px_32px_rgba(15,23,42,0.16)] w-[168px] z-[300]"
          style={{ top: dropdownPos.top, left: dropdownPos.left }}
          data-name="Previous Drop down"
        >
          <div className="border-[#eff2f4] border-b border-solid content-stretch flex items-center p-[8px] relative shrink-0 w-full">
            <p className="font-['Roboto:Medium',_sans-serif] font-medium leading-[normal] relative shrink-0 text-[#8d9aae] text-[12px] uppercase whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
              Recent
            </p>
          </div>
          {hasHistory ? (
            history.map((id, i) => (
              <button
                key={`${id}-${i}`}
                onClick={() => { goToLoad(id); setIsDropdownOpen(false); }}
                className="bg-white content-stretch flex h-[30px] items-center p-[8px] relative shrink-0 w-full cursor-pointer border-none text-left transition-colors hover:bg-[#e1f2fb]"
                data-name="Back Selection"
              >
                <p className="font-['Roboto:Medium',_sans-serif] font-medium leading-[normal] relative shrink-0 text-[#3a3a3a] text-[12px] uppercase whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
                  {id}
                </p>
              </button>
            ))
          ) : (
            <div className="bg-white content-stretch flex h-[30px] items-center p-[8px] relative shrink-0 w-full">
              <p className="font-['Roboto:Medium',_sans-serif] font-medium leading-[normal] relative shrink-0 text-[#c6ccd6] text-[12px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
                No recent loads
              </p>
            </div>
          )}
        </div>,
        document.body
      )}
    </div>
  );
}
