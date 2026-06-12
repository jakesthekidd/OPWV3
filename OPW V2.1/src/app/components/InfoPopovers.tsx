import { ScrollArea } from './ui/scroll-area';

/**
 * Shared presentation kit for the header "Source / Master Record" (TMS) popover
 * and the document viewer "Document Data" popover. One design language:
 * accent strip, titled header, uppercase section labels, hairline-divided
 * key-value rows, and status pills.
 */

function AccentStrip() {
  return <div className="h-[3px] w-full bg-gradient-to-r from-[#174a78] via-[#2474bb] to-[#72cdf4]" />;
}

function CardHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="px-[16px] py-[12px] bg-[#f8fafc] border-b border-[#e9edf2]">
      <p className="font-['Roboto:SemiBold',sans-serif] font-semibold text-[14px] text-[#123b60] leading-tight" style={{ fontVariationSettings: "'wdth' 100" }}>
        {title}
      </p>
      <p className="font-['Roboto:Regular',sans-serif] font-normal text-[11px] text-[#8d9aae] mt-[2px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        {subtitle}
      </p>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-[16px] pt-[14px] pb-[6px]">
      <p className="font-['Roboto:Medium',sans-serif] font-medium text-[10.5px] text-[#8d9aae] uppercase tracking-[0.07em]" style={{ fontVariationSettings: "'wdth' 100" }}>
        {children}
      </p>
    </div>
  );
}

function Row({ label, children, stacked = false }: { label: string; children: React.ReactNode; stacked?: boolean }) {
  if (stacked) {
    return (
      <div className="px-[16px] py-[7px] border-b border-[#f1f4f7] last:border-b-0">
        <p className="font-['Roboto:Regular',sans-serif] font-normal text-[11px] text-[#6b7280] mb-[3px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          {label}
        </p>
        <div className="font-['Roboto:Medium',sans-serif] font-medium text-[12px] text-[#1f2937] leading-[1.5]" style={{ fontVariationSettings: "'wdth' 100" }}>
          {children}
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-baseline justify-between gap-[16px] px-[16px] py-[7px] border-b border-[#f1f4f7] last:border-b-0">
      <p className="font-['Roboto:Regular',sans-serif] font-normal text-[11px] text-[#6b7280] shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        {label}
      </p>
      <div className="font-['Roboto:Medium',sans-serif] font-medium text-[12px] text-[#1f2937] text-right leading-[1.45]" style={{ fontVariationSettings: "'wdth' 100" }}>
        {children}
      </div>
    </div>
  );
}

type PillTone = 'blue' | 'green' | 'orange' | 'gray';

const PILL_TONES: Record<PillTone, string> = {
  blue: 'bg-[#e1f2fb] text-[#174a78]',
  green: 'bg-[#e5f9ea] text-[#008020]',
  orange: 'bg-[#fff1dd] text-[#a36800]',
  gray: 'bg-[#f1f4f7] text-[#5a626f]',
};

function Pill({ tone, children }: { tone: PillTone; children: React.ReactNode }) {
  return (
    <span className={`inline-block px-[8px] py-[2px] rounded-full text-[11px] font-medium leading-[1.4] ${PILL_TONES[tone]}`}>
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Document Data — shown from the viewer toolbar                       */
/* ------------------------------------------------------------------ */

export function DocumentDataPopover() {
  return (
    <div className="bg-white" data-name="Document data popover">
      <AccentStrip />
      <CardHeader title="Document Data" subtitle="Import and extraction details for this document" />
      <ScrollArea className="max-h-[55vh]">
        <div className="pb-[10px]">
          <SectionLabel>Import Information</SectionLabel>
          <Row label="Import Date">2025/01/25</Row>
          <Row label="Submitting Driver ID">JDOE</Row>
          <Row label="Submission ID">124235256</Row>

          <SectionLabel>Metadata</SectionLabel>
          <Row label="Doc Mod">15051</Row>
          <Row label="MC#">13210100</Row>
          <Row label="Original Doc ID">545040405</Row>

          <SectionLabel>Extracted Data</SectionLabel>
          <Row label="Trip Number">15916971</Row>
          <Row label="Weight">14,168</Row>
          <Row label="Weight UOM">LBS</Row>
          <Row label="Trailer Type">Van</Row>
          <Row label="Expense Amount">$7.95</Row>
          <Row label="Transaction Date">2025/01/23</Row>
        </div>
      </ScrollArea>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Source / Master Record — shown from the header TMS button           */
/* ------------------------------------------------------------------ */

interface CarrierInfo {
  name: string;
  code: string;
  flags: string[];
  remitTo: string;
  rate: string;
  advance: string;
  totalPaid: string;
  payStatus: 'Paid' | 'Pending';
}

const CARRIERS: CarrierInfo[] = [
  {
    name: 'Yellow Freight Inc.',
    code: 'YF001',
    flags: ['MC: 998877', 'DOT: 445566', 'SCAC: YELL'],
    remitTo: 'Some Bank, 123 Place, Houston, TX 77008',
    rate: '$1,000.00',
    advance: '$400.00',
    totalPaid: '$1,000.00',
    payStatus: 'Paid',
  },
  {
    name: 'Swift Transport LLC',
    code: 'SW123',
    flags: ['Hold', 'MC: 112244', 'DOT: 778899', 'SCAC: SWFT'],
    remitTo: 'Express Funding, 150 Finance Blvd, Suite 200, Dallas, TX 75201',
    rate: '$3,250.00',
    advance: '$500.00',
    totalPaid: '$1,750.00',
    payStatus: 'Pending',
  },
];

function CarrierBlock({ carrier, index }: { carrier: CarrierInfo; index: number }) {
  return (
    <div className="mx-[16px] mb-[8px] rounded-[6px] border border-[#e9edf2] overflow-hidden">
      <div className="flex items-center justify-between gap-[8px] px-[10px] py-[6px] bg-[#f8fafc] border-b border-[#e9edf2]">
        <p className="font-['Roboto:Medium',sans-serif] font-medium text-[12px] text-[#123b60]" style={{ fontVariationSettings: "'wdth' 100" }}>
          {index + 1}. {carrier.name} ({carrier.code})
        </p>
        <Pill tone={carrier.payStatus === 'Paid' ? 'green' : 'orange'}>{carrier.payStatus}</Pill>
      </div>
      <div className="px-[10px] py-[6px]">
        <p className="text-[11px] text-[#6b7280] leading-[1.5]">{carrier.flags.join('  ·  ')}</p>
        <p className="text-[11px] text-[#6b7280] leading-[1.5] mt-[2px]">
          <span className="text-[#8d9aae]">Remit to:</span> {carrier.remitTo}
        </p>
        <div className="flex gap-[16px] mt-[6px]">
          <div>
            <p className="text-[10px] text-[#8d9aae] uppercase tracking-wide">Rate</p>
            <p className="text-[12px] font-medium text-[#1f2937]">{carrier.rate}</p>
          </div>
          <div>
            <p className="text-[10px] text-[#8d9aae] uppercase tracking-wide">Advance</p>
            <p className="text-[12px] font-medium text-[#1f2937]">{carrier.advance}</p>
          </div>
          <div>
            <p className="text-[10px] text-[#8d9aae] uppercase tracking-wide">Total Paid</p>
            <p className="text-[12px] font-medium text-[#1f2937]">{carrier.totalPaid}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TmsDataPopover() {
  return (
    <div className="bg-white" data-name="TMS data popover">
      <AccentStrip />
      <CardHeader title="Source / Master Record" subtitle="Load master record from the TMS integration" />
      <ScrollArea className="max-h-[60vh]">
        <div className="pb-[10px]">
          <SectionLabel>Load</SectionLabel>
          <Row label="Load Number">897654321</Row>
          <Row label="Load Status"><Pill tone="blue">In Transit</Pill></Row>
          <Row label="Cargo Claim">No</Row>
          <Row label="Ship Date">2025/05/08</Row>
          <Row label="Delivery Date">2025/05/13</Row>

          <SectionLabel>Contacts</SectionLabel>
          <Row label="Dispatcher">Jane Doe<br /><span className="text-[11px] font-normal text-[#6b7280]">jane.doe@logisticsco.com</span></Row>
          <Row label="Operations">Tom Smith<br /><span className="text-[11px] font-normal text-[#6b7280]">tom.smith@logisticsco.com</span></Row>

          <SectionLabel>Route</SectionLabel>
          <Row label="Origin">123 Start Ave, Suite 100, Chicago, IL 60601</Row>
          <Row label="Stops" stacked>
            <ol className="list-decimal list-inside space-y-[2px]">
              <li>Pilot Station, 789 Fuel Rd, Resttown, OH 43001</li>
              <li>Highway Check, 22 Route 9, Middletown, IN 46201</li>
            </ol>
          </Row>
          <Row label="Destination">456 End St, Building C, Atlanta, GA 30303</Row>

          <SectionLabel>Billing</SectionLabel>
          <Row label="Bill To">ACME Logistics (UID-112233) <Pill tone="orange">Hold</Pill></Row>

          <SectionLabel>Carriers</SectionLabel>
          {CARRIERS.map((carrier, i) => (
            <CarrierBlock key={carrier.code} carrier={carrier} index={i} />
          ))}

          <SectionLabel>Reference Numbers</SectionLabel>
          <Row label="priority_load">true</Row>
          <Row label="quick_pay">yes</Row>
          <Row label="BOLNum">45678083</Row>
          <Row label="ManNum">463211001145</Row>
        </div>
      </ScrollArea>
    </div>
  );
}
