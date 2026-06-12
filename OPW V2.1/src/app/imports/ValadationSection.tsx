import svgPaths from "./svg-4l626pvwdn";
import svgPathsUnclassified from "./svg-ihyejnn69p";
import ValidationGrid, { ValidationField } from "../components/ValidationGrid";
import { Document, DocumentType } from "../App";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../components/ui/collapsible";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import ApprovedContainer, { ApprovedDocument } from "../components/ApprovedContainer";
import MissingDocumentsContainer, { MissingDocument } from "../components/MissingDocumentsContainer";
import svgPathsArrow from "./svg-nfl9brerhj";
import { motion } from "motion/react";
import { MoreVertical, CheckCircle } from 'lucide-react';
import DocumentContextMenu from "../components/DocumentContextMenu";
import DocumentPanelContainer from "../components/DocumentPanelContainer";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";
import ExceptionTabHeader from "../components/ExceptionTabHeader";
import BottomControlBar from "../components/BottomControlBar";
import ConsolidatedExceptionsView from "../components/ConsolidatedExceptionsView";

interface ValadationSectionProps {
  validationData: ValidationField[];
  onFieldUpdate: (id: string, updates: Partial<ValidationField>) => void;
  onApprove: () => void;
  parseRangeFromAdditionalInfo: (additionalInfo: string) => { min: number; max: number } | null;
  isValueInRange: (value: string, range: { min: number; max: number } | null) => boolean;
  hasChanges: boolean;
  onRevertChanges: () => void;
  onSave?: () => void;
  documents: Document[];
  onDocumentClassification: (documentId: string, newType: DocumentType) => void;
  selectedSections: Set<string>;
  onSelectedSectionsChange: (sections: Set<string>) => void;
  approvedDocuments: ApprovedDocument[];
  missingDocuments: MissingDocument[];
  onToggleMissingDocIgnore: (documentId: string) => void;
  selectedDocumentId: string;
  onDocumentSelect: (documentId: string) => void;
  onActiveTabChange?: (tab: string) => void;
}

const DOCUMENT_TYPES: DocumentType[] = [
  'Invoice',
  'Bill of Lading',
  'Proof of Delivery',
  'Fuel Receipt',
  'Driver Log'
];

function Component80FinalIcons() {
  return (
    <div className="absolute h-[13px] left-0 top-0 w-[10px]" data-name="8.0 Final Icons">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 16">
        <g id="8.0 Final Icons ">
          <g id="Union">
            <path d={svgPaths.p372a2070} fill="var(--fill-0, #DA1F2C)" />
            <path d={svgPaths.p1a044400} fill="var(--fill-0, #DA1F2C)" />
            <path clipRule="evenodd" d={svgPaths.p1e33da00} fill="var(--fill-0, #DA1F2C)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function ExceptionIconsDocIcons() {
  return (
    <div className="h-[13px] relative shrink-0 w-[10px]" data-name="Exception Icons  & Doc Icons">
      <Component80FinalIcons />
    </div>
  );
}

interface Frame427322099Props {
  count: number;
}

function Frame427322099({ count }: Frame427322099Props) {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0">
      <ExceptionIconsDocIcons />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3d3d3d] text-[10px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">Missing Documents</p>
      </div>
      <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#3d3d3d] text-[10px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">{count}</p>
      </div>
    </div>
  );
}

function ExceptionIconsDocIcons1() {
  return (
    <div className="h-[13px] relative shrink-0 w-[10px]" data-name="Exception Icons  & Doc Icons">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 16">
        <g id="Exception Icons  & Doc Icons ">
          <g id="Unclassified ">
            <path d={svgPaths.p1dbc9480} fill="var(--fill-0, #9747FF)" />
            <path d={svgPaths.p2f9aca00} fill="var(--fill-0, #9747FF)" />
            <path d={svgPaths.p3f26300} fill="var(--fill-0, #9747FF)" />
            <path d={svgPaths.p1553b740} fill="var(--fill-0, #9747FF)" />
            <path d={svgPaths.p3a8f5000} fill="var(--fill-0, #9747FF)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

interface Frame427322097Props {
  count: number;
}

function Frame427322097({ count }: Frame427322097Props) {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0">
      <ExceptionIconsDocIcons1 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3d3d3d] text-[10px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">Unclassified documents</p>
      </div>
      <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#3d3d3d] text-[10px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">{count}</p>
      </div>
    </div>
  );
}

function ExceptionIconsDocIcons2() {
  return (
    <div className="h-[13px] relative shrink-0 w-[12px]" data-name="Exception Icons  & Doc Icons">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Exception Icons  & Doc Icons ">
          <g id="Correct">
            <path d={svgPaths.p2cf56c00} fill="var(--fill-0, #FF5C00)" />
            <path d={svgPaths.p30c9700} fill="var(--fill-0, #FF5C00)" />
            <path d={svgPaths.p37ed0900} fill="var(--fill-0, #FF5C00)" />
            <path d={svgPaths.pb9a1d80} fill="var(--fill-0, #FF5C00)" />
            <path clipRule="evenodd" d={svgPaths.p305b4e00} fill="var(--fill-0, #FF5C00)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.pfe41d00} fill="var(--fill-0, #FF5C00)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p16219cc0} fill="var(--fill-0, #FF5C00)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

interface Frame427322098Props {
  count: number;
}

function Frame427322098({ count }: Frame427322098Props) {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0">
      <ExceptionIconsDocIcons2 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3d3d3d] text-[10px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">{`Field Exceptions `}</p>
      </div>
      <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#3d3d3d] text-[10px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">{count}</p>
      </div>
    </div>
  );
}

interface ExceptionSummeryProps {
  missingCount: number;
  unclassifiedCount: number;
  fieldExceptionCount: number;
}

function ExceptionSummery({ missingCount, unclassifiedCount, fieldExceptionCount }: ExceptionSummeryProps) {
  return (
    <div className="bg-[#fbfcfc] h-[40px] relative shrink-0 w-full z-[19]" data-name="Exception Summery">
      <div aria-hidden="true" className="absolute border-[#eff2f4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[40px] items-center px-[12px] py-[8px] relative w-full">
          <Frame427322099 count={missingCount} />
          <Frame427322097 count={unclassifiedCount} />
          <Frame427322098 count={fieldExceptionCount} />
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none shadow-[0px_-2px_2px_0px_inset_rgba(0,0,0,0.06)]" />
    </div>
  );
}

function RadioButtnAndCheckBox16() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Radio Buttn and Check Box  16">
      <div className="bg-white relative rounded-[1px] shrink-0 size-[13px]">
        <div aria-hidden="true" className="absolute border border-[#e2e6eb] border-solid inset-0 pointer-events-none rounded-[1px]" />
      </div>
    </div>
  );
}

function RadioButtnAndCheckBox17() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Radio Buttn and Check Box  16">
      <RadioButtnAndCheckBox16 />
    </div>
  );
}

function Frame427321634() {
  return (
    <div className="content-stretch flex gap-[3px] items-center relative shrink-0">
      <RadioButtnAndCheckBox17 />
    </div>
  );
}

function Frame427321822() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-px h-full items-center justify-center mr-[-1px] px-[6px] py-[3px] relative shrink-0 w-[54px] z-[6]">
      <div aria-hidden="true" className="absolute border-[#eff2f4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Frame427321634 />
    </div>
  );
}

function Frame427321825() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[8px] h-full items-center mr-[-1px] pl-0 pr-[8px] py-[3px] relative shrink-0 w-[97px] z-[5]">
      <div aria-hidden="true" className="absolute border-[#eff2f4] border-[0px_1px_1px_0px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Roboto:SemiBold',_sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#123b60] text-[11px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">{`Fields `}</p>
      </div>
    </div>
  );
}

function Frame427321820() {
  return (
    <div className="basis-0 bg-white grow h-full min-h-px min-w-px mr-[-1px] relative shrink-0 z-[4]">
      <div aria-hidden="true" className="absolute border-[#eff2f4] border-[0px_1px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[15px] items-center justify-center px-[6px] py-[3px] relative size-full">
          <div className="flex flex-col font-['Roboto:SemiBold',_sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#123b60] text-[11px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[normal] whitespace-pre">{`Expected `}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame427321819() {
  return (
    <div className="content-stretch flex flex-col gap-[3px] items-start justify-center relative shrink-0">
      <div className="flex flex-col font-['Roboto:SemiBold',_sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#123b60] text-[11px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">{`Evaluated `}</p>
      </div>
    </div>
  );
}

function Frame427321823() {
  return (
    <div className="basis-0 bg-white grow h-full min-h-px min-w-px mr-[-1px] relative shrink-0 z-[1]">
      <div aria-hidden="true" className="absolute border-[#eff2f4] border-[0px_0px_1px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[15px] items-center justify-center px-[6px] py-[3px] relative size-full">
          <Frame427321819 />
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="box-border content-stretch flex h-[40px] isolate items-center pl-0 pr-px py-0 relative shrink-0 w-full z-[13]" data-name="Header">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-black border-solid inset-0 pointer-events-none" />
      <Frame427321822 />
      <Frame427321825 />
      <Frame427321820 />
      <Frame427321823 />
    </div>
  );
}

function RadioButtnAndCheckBox18() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Radio Buttn and Check Box  16">
      <div className="bg-white relative rounded-[1px] shrink-0 size-[13px]">
        <div aria-hidden="true" className="absolute border border-[#8d9aae] border-solid inset-0 pointer-events-none rounded-[1px]" />
      </div>
    </div>
  );
}

function RadioButtnAndCheckBox19() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Radio Buttn and Check Box  16">
      <RadioButtnAndCheckBox18 />
    </div>
  );
}

function Start() {
  return (
    <div className="box-border content-stretch flex gap-[8px] h-full items-center justify-center px-0 py-[8px] relative shrink-0 w-[54px]" data-name="Start">
      <div aria-hidden="true" className="absolute border-[#72cdf4] border-[0px_0px_0px_3px] border-solid inset-0 pointer-events-none" />
      <RadioButtnAndCheckBox19 />
    </div>
  );
}

function Frame427321824() {
  return (
    <div className="basis-0 grow h-[30px] min-h-px min-w-px relative shrink-0">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[30px] items-center pl-0 pr-[8px] py-[8px] relative w-full">
          <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#174a78] text-[13px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[normal] whitespace-pre">{`Invoice `}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Context() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[8px] items-center justify-center p-[2px] relative rounded-[2px] shrink-0" data-name="context">
      <div className="flex flex-col font-['Font_Awesome_6_Free:Solid',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#2068a8] text-[13px] text-center w-full">
        <p className="leading-[normal]">ellipsis-vertical</p>
      </div>
    </div>
  );
}

function DocumentHeader() {
  return (
    <div className="bg-[#f7f8f9] h-[44px] relative shrink-0 w-full z-[12]" data-name="Document Header">
      <div aria-hidden="true" className="absolute border-[#c6ccd6] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[44px] items-center pl-0 pr-[16px] py-0 relative w-full">
          <Start />
          <Frame427321824 />
          <Context />
        </div>
      </div>
    </div>
  );
}

function Frame427321826() {
  return <div className="box-border content-stretch flex gap-[8px] h-[30px] items-center justify-center px-0 py-[8px] shrink-0 w-[54px]" />;
}

function Frame427321827() {
  return (
    <div className="box-border content-stretch flex gap-[8px] h-[30px] items-center pl-0 pr-[8px] py-[8px] relative shrink-0 w-[97px]">
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3d3d3d] text-[10px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">{`Total `}</p>
      </div>
    </div>
  );
}

function Frame427321958() {
  const { fields } = useValidation();
  const field = fields.find(f => f.id === 'total');
  if (!field?.expectedRange) return null;
  
  return (
    <div className="content-stretch flex gap-[3px] items-start leading-[0] relative shrink-0 text-[#3d3d3d] text-[8px] text-center text-nowrap w-full">
      <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] text-nowrap whitespace-pre">Range:</p>
      </div>
      <div className="flex flex-col font-['Roboto:Light',_sans-serif] font-light justify-center relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] text-nowrap whitespace-pre">{field.expectedRange}</p>
      </div>
    </div>
  );
}

function Frame427321957() {
  const { fields } = useValidation();
  const field = fields.find(f => f.id === 'total');
  if (!field) return null;
  
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[2px] grow items-start justify-center min-h-px min-w-px relative shrink-0">
      <div className="flex flex-col font-['Roboto:Light',_sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[#3d3d3d] text-[11px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">{field.expected}</p>
      </div>
      <Frame427321958 />
    </div>
  );
}

function Frame427321821() {
  return (
    <div className="basis-0 content-stretch flex gap-[3px] grow items-center justify-center min-h-px min-w-px relative shrink-0">
      <Frame427321957 />
    </div>
  );
}

function Frame427321828() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0">
      <div aria-hidden="true" className="absolute border-[#e2e6eb] border-[0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[16px] items-center justify-center px-[12px] py-[8px] relative w-full">
          <Frame427321821 />
        </div>
      </div>
    </div>
  );
}

function Inputs() {
  const { fields, updateEvaluated } = useValidation();
  const field = fields.find(f => f.id === 'total');
  if (!field) return null;
  
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Inputs">
      <ValidationInput 
        value={field.evaluated} 
        expectedValue={field.expected}
        onChange={(value) => updateEvaluated(field.id, value)}
      />
    </div>
  );
}

function Frame427321829() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center px-[12px] py-[6px] relative size-full">
          <Inputs />
        </div>
      </div>
    </div>
  );
}

function TableComponents() {
  return (
    <div className="bg-white content-stretch flex h-[40px] items-center relative shrink-0 w-full z-[11]" data-name="Table components">
      <div aria-hidden="true" className="absolute border-[#c6ccd6] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Frame427321826 />
      <Frame427321827 />
      <Frame427321828 />
      <Frame427321829 />
    </div>
  );
}

function Frame427321830() {
  return <div className="box-border content-stretch flex gap-[8px] h-[30px] items-center justify-center px-0 py-[8px] shrink-0 w-[54px]" />;
}

function Frame427321831() {
  return (
    <div className="box-border content-stretch flex gap-[8px] h-[30px] items-center pl-0 pr-[8px] py-[8px] relative shrink-0 w-[97px]">
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3d3d3d] text-[10px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">Carrier</p>
      </div>
    </div>
  );
}

function Frame427321832() {
  const { fields } = useValidation();
  const field = fields.find(f => f.id === 'carrier');
  if (!field) return null;
  
  return (
    <div className="basis-0 content-stretch flex gap-[3px] grow items-center min-h-px min-w-px relative shrink-0">
      <div className="basis-0 flex flex-col font-['Roboto:Light',_sans-serif] font-light grow justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[#3d3d3d] text-[11px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal]">{field.expected}</p>
      </div>
    </div>
  );
}

function Frame427321833() {
  return (
    <div className="basis-0 grow h-[30px] min-h-px min-w-px relative shrink-0">
      <div aria-hidden="true" className="absolute border-[#e2e6eb] border-[0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[15px] h-[30px] items-center px-[6px] py-[3px] relative w-full">
          <Frame427321832 />
        </div>
      </div>
    </div>
  );
}

function Inputs1() {
  const { fields, updateEvaluated } = useValidation();
  const field = fields.find(f => f.id === 'carrier');
  if (!field) return null;
  
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Inputs">
      <ValidationInput 
        value={field.evaluated} 
        expectedValue={field.expected}
        onChange={(value) => updateEvaluated(field.id, value)}
      />
    </div>
  );
}

function Frame427321834() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center px-[12px] py-[6px] relative w-full">
          <Inputs1 />
        </div>
      </div>
    </div>
  );
}

function TableComponents1() {
  return (
    <div className="bg-white content-stretch flex h-[40px] items-center relative shrink-0 w-full z-10" data-name="Table components">
      <div aria-hidden="true" className="absolute border-[#c6ccd6] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Frame427321830 />
      <Frame427321831 />
      <Frame427321833 />
      <Frame427321834 />
    </div>
  );
}

function Frame427321835() {
  return <div className="box-border content-stretch flex gap-[8px] h-[30px] items-center justify-center px-0 py-[8px] shrink-0 w-[54px]" />;
}

function Frame427321836() {
  return (
    <div className="box-border content-stretch flex gap-[8px] h-[30px] items-center pl-0 pr-[8px] py-[8px] relative shrink-0 w-[97px]">
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3d3d3d] text-[10px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">{`Invoice number `}</p>
      </div>
    </div>
  );
}

function Frame427321837() {
  const { fields, copyExpectedToEvaluated, startAnimation, completeAnimation } = useValidation();
  const field = fields.find(f => f.id === 'invoice-number');
  if (!field) return null;
  
  const handleArrowClick = () => {
    startAnimation(field.id);
    copyExpectedToEvaluated(field.id);
  };
  
  return (
    <div className="basis-0 content-stretch flex gap-[3px] grow items-center min-h-px min-w-px relative shrink-0">
      <div className="basis-0 flex flex-col font-['Roboto:Light',_sans-serif] font-light grow justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[#3d3d3d] text-[11px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal]">{field.expected}</p>
      </div>
      {field.hasArrow && (
        <ArrowButton 
          onClick={handleArrowClick}
          isAnimating={field.isAnimating}
          onAnimationComplete={() => completeAnimation(field.id)}
        />
      )}
    </div>
  );
}

function Frame427321838() {
  return (
    <div className="basis-0 grow h-[30px] min-h-px min-w-px relative shrink-0">
      <div aria-hidden="true" className="absolute border-[#e2e6eb] border-[0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[15px] h-[30px] items-center px-[6px] py-[3px] relative w-full">
          <Frame427321837 />
        </div>
      </div>
    </div>
  );
}

function Inputs2() {
  const { fields, updateEvaluated } = useValidation();
  const field = fields.find(f => f.id === 'invoice-number');
  if (!field) return null;
  
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Inputs">
      <ValidationInput 
        value={field.evaluated} 
        expectedValue={field.expected}
        onChange={(value) => updateEvaluated(field.id, value)}
      />
    </div>
  );
}

function Frame427321839() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center px-[12px] py-[6px] relative w-full">
          <Inputs2 />
        </div>
      </div>
    </div>
  );
}

function TableComponents2() {
  return (
    <div className="bg-white content-stretch flex h-[40px] items-center relative shrink-0 w-full z-[9]" data-name="Table components">
      <div aria-hidden="true" className="absolute border-[#c6ccd6] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Frame427321835 />
      <Frame427321836 />
      <Frame427321838 />
      <Frame427321839 />
    </div>
  );
}

function Frame427321840() {
  return <div className="box-border content-stretch flex gap-[8px] h-[30px] items-center justify-center px-0 py-[8px] shrink-0 w-[54px]" />;
}

function Frame427321841() {
  return (
    <div className="box-border content-stretch flex gap-[8px] h-[30px] items-center pl-0 pr-[8px] py-[8px] relative shrink-0 w-[97px]">
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3d3d3d] text-[10px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">{`Invoice Date `}</p>
      </div>
    </div>
  );
}

function Frame427321842() {
  const { fields, copyExpectedToEvaluated, startAnimation, completeAnimation } = useValidation();
  const field = fields.find(f => f.id === 'invoice-date');
  if (!field) return null;
  
  const handleArrowClick = () => {
    startAnimation(field.id);
    copyExpectedToEvaluated(field.id);
  };
  
  return (
    <div className="basis-0 content-stretch flex gap-[3px] grow items-center min-h-px min-w-px relative shrink-0">
      <div className="basis-0 flex flex-col font-['Roboto:Light',_sans-serif] font-light grow justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[#3d3d3d] text-[11px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal]">{field.expected}</p>
      </div>
      {field.hasArrow && (
        <ArrowButton 
          onClick={handleArrowClick}
          isAnimating={field.isAnimating}
          onAnimationComplete={() => completeAnimation(field.id)}
        />
      )}
    </div>
  );
}

function Frame427321843() {
  return (
    <div className="basis-0 grow h-[30px] min-h-px min-w-px relative shrink-0">
      <div aria-hidden="true" className="absolute border-[#e2e6eb] border-[0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[15px] h-[30px] items-center px-[6px] py-[3px] relative w-full">
          <Frame427321842 />
        </div>
      </div>
    </div>
  );
}

function Inputs3() {
  const { fields, updateEvaluated } = useValidation();
  const field = fields.find(f => f.id === 'invoice-date');
  if (!field) return null;
  
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Inputs">
      <ValidationInput 
        value={field.evaluated} 
        expectedValue={field.expected}
        onChange={(value) => updateEvaluated(field.id, value)}
        showCalendar
        placeholder="MM/DD/YYYY"
      />
    </div>
  );
}

function Frame427321844() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center px-[12px] py-[6px] relative w-full">
          <Inputs3 />
        </div>
      </div>
    </div>
  );
}

function TableComponents3() {
  return (
    <div className="bg-white content-stretch flex h-[40px] items-center relative shrink-0 w-full z-[8]" data-name="Table components">
      <div aria-hidden="true" className="absolute border-[#c6ccd6] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Frame427321840 />
      <Frame427321841 />
      <Frame427321843 />
      <Frame427321844 />
    </div>
  );
}

function Frame289463() {
  return (
    <div className="bg-[#f3f5f7] h-full relative rounded-[3px] shrink-0">
      <div aria-hidden="true" className="absolute border border-[#e2e6eb] border-solid inset-0 pointer-events-none rounded-[3px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[6px] h-full items-center justify-center leading-[normal] px-[13px] py-[11px] relative text-[#5a626f] text-[10px] text-nowrap whitespace-pre">
          <p className="font-['Font_Awesome_6_Free:Solid',_sans-serif] not-italic relative shrink-0">not-equal</p>
          <p className="font-['Roboto:Regular',_sans-serif] font-normal relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            Ignore All
          </p>
        </div>
      </div>
    </div>
  );
}

function Square14() {
  return (
    <div className="content-stretch flex h-[18px] items-center relative shrink-0" data-name="Square  14">
      <Frame289463 />
    </div>
  );
}

function Frame427321845() {
  return (
    <div className="basis-0 grow h-[30px] min-h-px min-w-px relative shrink-0 z-[1]">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="box-border content-stretch flex gap-[6px] h-[30px] items-center justify-end px-[6px] py-[3px] relative w-full">
          <Square14 />
        </div>
      </div>
    </div>
  );
}

function TableComponents4() {
  return (
    <div className="bg-white content-stretch flex h-[34px] isolate items-center justify-end relative shrink-0 w-full z-[7]" data-name="Table components">
      <div aria-hidden="true" className="absolute border-[#c6ccd6] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))] z-[2]" style={{ "--transform-inner-width": "31", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[90deg]">
          <div className="h-0 relative w-[31px]">
            <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31 1">
                <line id="Line 360" stroke="var(--stroke-0, #E2E6EB)" x2="31" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Frame427321845 />
    </div>
  );
}

function RadioButtnAndCheckBox28() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Radio Buttn and Check Box  16">
      <div className="bg-white relative rounded-[1px] shrink-0 size-[13px]">
        <div aria-hidden="true" className="absolute border border-[#8d9aae] border-solid inset-0 pointer-events-none rounded-[1px]" />
      </div>
    </div>
  );
}

function RadioButtnAndCheckBox29() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Radio Buttn and Check Box  16">
      <RadioButtnAndCheckBox28 />
    </div>
  );
}

function Start1() {
  return (
    <div className="box-border content-stretch flex gap-[8px] h-full items-center justify-center px-0 py-[8px] relative shrink-0 w-[54px]" data-name="Start">
      <RadioButtnAndCheckBox29 />
    </div>
  );
}

function Frame427321846() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center pl-0 pr-[8px] py-[8px] relative size-full">
          <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#174a78] text-[13px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[normal] whitespace-pre">POD</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Context1() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[8px] items-center justify-center p-[2px] relative rounded-[2px] shrink-0" data-name="context">
      <div className="flex flex-col font-['Font_Awesome_6_Free:Solid',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#2068a8] text-[13px] text-center w-full">
        <p className="leading-[normal]">ellipsis-vertical</p>
      </div>
    </div>
  );
}

function TableComponents5() {
  return (
    <div className="bg-[#f7f8f9] h-[35px] relative shrink-0 w-full z-[6]" data-name="Table components">
      <div aria-hidden="true" className="absolute border-[#c6ccd6] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[6px] h-[35px] items-center pl-0 pr-[13px] py-0 relative w-full">
          <Start1 />
          <Frame427321846 />
          <Context1 />
        </div>
      </div>
    </div>
  );
}

function Frame427321847() {
  return <div className="box-border content-stretch flex gap-[8px] h-[30px] items-center justify-center px-0 py-[8px] shrink-0 w-[54px]" />;
}

function Frame427321848() {
  return (
    <div className="box-border content-stretch flex gap-[8px] h-[30px] items-center pl-0 pr-[8px] py-[8px] relative shrink-0 w-[97px]">
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3d3d3d] text-[10px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">BOL #</p>
      </div>
    </div>
  );
}

function Frame427321849() {
  const { fields, copyExpectedToEvaluated, startAnimation, completeAnimation } = useValidation();
  const field = fields.find(f => f.id === 'location');
  if (!field) return null;
  
  const handleArrowClick = () => {
    startAnimation(field.id);
    copyExpectedToEvaluated(field.id);
  };
  
  return (
    <div className="basis-0 content-stretch flex gap-[3px] grow items-center min-h-px min-w-px relative shrink-0">
      <div className="basis-0 flex flex-col font-['Roboto:Light',_sans-serif] font-light grow justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[#3d3d3d] text-[11px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal]">{field.expected}</p>
      </div>
      {field.hasArrow && (
        <ArrowButton 
          onClick={handleArrowClick}
          isAnimating={field.isAnimating}
          onAnimationComplete={() => completeAnimation(field.id)}
        />
      )}
    </div>
  );
}

function Frame427321850() {
  return (
    <div className="basis-0 grow h-[30px] min-h-px min-w-px relative shrink-0">
      <div aria-hidden="true" className="absolute border-[#e2e6eb] border-[0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[15px] h-[30px] items-center px-[6px] py-[3px] relative w-full">
          <Frame427321849 />
        </div>
      </div>
    </div>
  );
}

function Inputs4() {
  const { fields, updateEvaluated } = useValidation();
  const field = fields.find(f => f.id === 'location');
  if (!field) return null;
  
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Inputs">
      <ValidationInput 
        value={field.evaluated} 
        expectedValue={field.expected}
        onChange={(value) => updateEvaluated(field.id, value)}
        placeholder="Enter BOL #"
      />
    </div>
  );
}

function Frame427321851() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center px-[12px] py-[6px] relative w-full">
          <Inputs4 />
        </div>
      </div>
    </div>
  );
}

function TableComponents6() {
  return (
    <div className="bg-white content-stretch flex h-[40px] items-center relative shrink-0 w-full z-[5]" data-name="Table components">
      <div aria-hidden="true" className="absolute border-[#c6ccd6] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Frame427321847 />
      <Frame427321848 />
      <Frame427321850 />
      <Frame427321851 />
    </div>
  );
}

function RadioButtnAndCheckBox32() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Radio Buttn and Check Box  16">
      <div className="bg-white relative rounded-[1px] shrink-0 size-[13px]">
        <div aria-hidden="true" className="absolute border border-[#8d9aae] border-solid inset-0 pointer-events-none rounded-[1px]" />
      </div>
    </div>
  );
}

function RadioButtnAndCheckBox33() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Radio Buttn and Check Box  16">
      <RadioButtnAndCheckBox32 />
    </div>
  );
}

function Start2() {
  return (
    <div className="box-border content-stretch flex gap-[8px] h-full items-center justify-center px-0 py-[8px] relative shrink-0 w-[54px]" data-name="Start">
      <RadioButtnAndCheckBox33 />
    </div>
  );
}

function Frame427321852() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center pl-0 pr-[8px] py-[8px] relative size-full">
          <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#174a78] text-[13px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[normal] whitespace-pre">{`Fuel Recipet `}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Context2() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[8px] items-center justify-center p-[2px] relative rounded-[2px] shrink-0" data-name="context">
      <div className="flex flex-col font-['Font_Awesome_6_Free:Solid',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#2068a8] text-[13px] text-center w-full">
        <p className="leading-[normal]">ellipsis-vertical</p>
      </div>
    </div>
  );
}

function TableComponents7() {
  return (
    <div className="bg-[#f7f8f9] h-[35px] relative shrink-0 w-full z-[4]" data-name="Table components">
      <div aria-hidden="true" className="absolute border-[#c6ccd6] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[6px] h-[35px] items-center pl-0 pr-[13px] py-0 relative w-full">
          <Start2 />
          <Frame427321852 />
          <Context2 />
        </div>
      </div>
    </div>
  );
}

function Frame427321853() {
  return <div className="box-border content-stretch flex gap-[8px] h-[30px] items-center justify-center px-0 py-[8px] shrink-0 w-[54px]" />;
}

function Frame427321854() {
  return (
    <div className="box-border content-stretch flex gap-[8px] h-[30px] items-center pl-0 pr-[8px] py-[8px] relative shrink-0 w-[97px]">
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3d3d3d] text-[10px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">{`Amount `}</p>
      </div>
    </div>
  );
}

function Frame427321855() {
  const { fields, copyExpectedToEvaluated, startAnimation, completeAnimation } = useValidation();
  const field = fields.find(f => f.id === 'amount');
  if (!field) return null;
  
  const handleArrowClick = () => {
    startAnimation(field.id);
    copyExpectedToEvaluated(field.id);
  };
  
  return (
    <div className="basis-0 content-stretch flex gap-[3px] grow items-center min-h-px min-w-px relative shrink-0">
      <div className="basis-0 flex flex-col font-['Roboto:Light',_sans-serif] font-light grow justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[#3d3d3d] text-[11px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal]">{field.expected}</p>
      </div>
      {field.hasArrow && (
        <ArrowButton 
          onClick={handleArrowClick}
          isAnimating={field.isAnimating}
          onAnimationComplete={() => completeAnimation(field.id)}
        />
      )}
    </div>
  );
}

function Frame427321856() {
  return (
    <div className="basis-0 grow h-[30px] min-h-px min-w-px relative shrink-0">
      <div aria-hidden="true" className="absolute border-[#e2e6eb] border-[0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[15px] h-[30px] items-center px-[6px] py-[3px] relative w-full">
          <Frame427321855 />
        </div>
      </div>
    </div>
  );
}

function Inputs5() {
  const { fields, updateEvaluated } = useValidation();
  const field = fields.find(f => f.id === 'amount');
  if (!field) return null;
  
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Inputs">
      <ValidationInput 
        value={field.evaluated} 
        expectedValue={field.expected}
        onChange={(value) => updateEvaluated(field.id, value)}
        placeholder="Enter amount"
      />
    </div>
  );
}

function Frame427321857() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center px-[12px] py-[6px] relative w-full">
          <Inputs5 />
        </div>
      </div>
    </div>
  );
}

function TableComponents8() {
  return (
    <div className="bg-white content-stretch flex h-[40px] items-center relative shrink-0 w-full z-[3]" data-name="Table components">
      <div aria-hidden="true" className="absolute border-[#c6ccd6] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Frame427321853 />
      <Frame427321854 />
      <Frame427321856 />
      <Frame427321857 />
    </div>
  );
}

function AuditValadationSection({ 
  validationData, 
  onFieldUpdate, 
  onApprove,
  parseRangeFromAdditionalInfo,
  isValueInRange,
  selectedSections,
  onSelectedSectionsChange,
  approvedDocuments,
  missingDocuments,
  documents,
  selectedDocumentId,
  onDocumentSelect
}: ValadationSectionProps) {
  // Calculate exception counts
  const unclassifiedCount = documents.filter(doc => doc.type === 'Unclassified').length;
  const fieldExceptionCount = validationData.filter(field => 
    !field.isResolved && 
    !field.isIgnored && 
    field.expectedValue !== field.evaluatedValue
  ).length;
  const missingCount = missingDocuments.filter(doc => !doc.isIgnored).length;

  return (
    <div className="basis-0 grow min-h-px min-w-px relative rounded-[6px] shrink-0 w-full z-[3]" data-name="Audit/valadation Section">
      <div className="content-stretch flex flex-col isolate items-start overflow-clip relative rounded-[inherit] size-full">
        <ExceptionSummery 
          missingCount={missingCount}
          unclassifiedCount={unclassifiedCount}
          fieldExceptionCount={fieldExceptionCount}
        />
        <ValidationGrid 
          data={validationData}
          onFieldUpdate={onFieldUpdate}
          onApprove={onApprove}
          parseRangeFromAdditionalInfo={parseRangeFromAdditionalInfo}
          isValueInRange={isValueInRange}
          selectedSections={selectedSections}
          onSelectedSectionsChange={onSelectedSectionsChange}
          approvedDocuments={approvedDocuments}
          selectedDocumentId={selectedDocumentId}
          onDocumentSelect={onDocumentSelect}
        />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e2e6eb] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function DropdownIndacator() {
  return (
    <div className="relative shrink-0 size-[10px]" data-name="Dropdown Indacator">
      <div className="absolute bottom-0 left-0 right-[-0.13%] top-0">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 12">
          <g id="Dropdown Indacator ">
            <path d={svgPaths.p2d735880} fill="var(--fill-0, #3D3D3D)" id="Angle-down" />
          </g>
        </svg>
      </div>
    </div>
  );
}

// Unclassified Icon Component  
function UnclassifiedIcon() {
  return (
    <div className="h-[13px] relative shrink-0 w-[10px]">
      <div className="absolute content-stretch flex gap-[8px] items-start left-0 top-0">
        <div className="h-[13px] relative shrink-0 w-[10px]">
          <div className="absolute inset-0" style={{ "--fill-0": "rgba(151, 71, 255, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 16">
              <g>
                <path d={svgPathsUnclassified.p1113c880} fill="var(--fill-0, #9747FF)" />
                <path d={svgPathsUnclassified.p1fc7f200} fill="var(--fill-0, #9747FF)" />
                <path d={svgPathsUnclassified.p2d20ef80} fill="var(--fill-0, #9747FF)" />
                <path d={svgPathsUnclassified.p8bc7300} fill="var(--fill-0, #9747FF)" />
                <path d={svgPathsUnclassified.p3496bff0} fill="var(--fill-0, #9747FF)" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function DropdownIndicatorUnclassified({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="relative shrink-0 size-[10px]" data-name="Dropdown Indacator">
      {isOpen ? (
        <div className="absolute h-[5.744px] left-[calc(50%+0.007px)] top-[calc(50%+0.408px)] translate-x-[-50%] translate-y-[-50%] w-[9.876px]" data-name="Angle-down">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 7">
            <path d={svgPathsUnclassified.p2e2e7a00} fill="var(--fill-0, #3D3D3D)" id="Angle-down" />
          </svg>
        </div>
      ) : (
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
          <g id="Dropdown Indacator ">
            <path d={svgPaths.p10fa7370} fill="var(--fill-0, #3D3D3D)" id="angle-right" />
          </g>
        </svg>
      )}
    </div>
  );
}

function Frame427321944({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <DropdownIndicatorUnclassified isOpen={isOpen} />
      <ExceptionIconsDocIcons3 />
    </div>
  );
}

function Frame427321951({ count, isOpen }: { count: number; isOpen: boolean }) {
  return (
    <div className="content-stretch flex gap-[13px] items-center relative shrink-0">
      <Frame427321944 isOpen={isOpen} />
      <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#3d3d3d] text-[13px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">{`Unclassified `}</p>
      </div>
      <div className="flex flex-col font-['Roboto:Light',_sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[#8d9aae] text-[13px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">({count})</p>
      </div>
    </div>
  );
}





interface DocumentInDropDownProps {
  document: Document;
  index: number;
  onClassificationChange: (documentId: string, newType: DocumentType) => void;
  onContextMenu?: (e: React.MouseEvent) => void;
  isSelected?: boolean;
  onSelect?: () => void;
}

function DocumentInDropDown({ document, index, onClassificationChange, onContextMenu, isSelected, onSelect }: DocumentInDropDownProps) {
  return (
    <div 
      className={`relative rounded-[4px] w-full cursor-pointer transition-colors ${
        isSelected ? 'bg-[#e1f2fb]' : 'bg-white'
      }`}
      data-name="Document in drop down"
      onClick={onSelect}
    >
      <div 
        aria-hidden="true" 
        className={`absolute border border-solid inset-0 pointer-events-none rounded-[4px] ${
          isSelected ? 'border-[#72cdf4]' : 'border-[#e2e6eb]'
        }`} 
      />
      {isSelected && (
        <div 
          aria-hidden="true" 
          className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#72cdf4] rounded-tl-[4px] rounded-bl-[4px]"
        />
      )}
      <div className="flex flex-row items-center w-full">
        <div className="box-border content-stretch flex gap-[6px] items-center pl-0 pr-[13px] py-[6px] relative w-full">
          <div className="basis-0 grow min-h-px min-w-px relative rounded-bl-[3px] rounded-tl-[3px] shrink-0" data-name="Doc name">
            <div className="flex flex-row items-center h-full">
              <div className="box-border content-stretch flex gap-[8px] items-center pl-[13px] pr-[8px] py-[8px] relative w-full">
                <div className="content-stretch flex gap-[3px] items-center leading-[0] relative shrink-0 text-[#3a3a3a] text-[13px] text-nowrap">
                  <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
                    <p className="leading-[normal] text-nowrap whitespace-pre">Unclassified #{index}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[3px] shrink-0" data-name="Dropdown doc type">
            <div aria-hidden="true" className="absolute border border-[#8d9aae] border-solid inset-0 pointer-events-none rounded-[3px]" />
            <Select 
              value={document.type === 'Unclassified' ? undefined : document.type} 
              onValueChange={(value) => onClassificationChange(document.id, value as DocumentType)}
            >
              <SelectTrigger className="h-auto border-0 rounded-[3px] px-[6px] py-[5px] leading-[0] text-[10px] font-['Roboto:Regular',_sans-serif] font-normal text-[#3d3d3d] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
                <SelectValue placeholder="Unclassified" />
              </SelectTrigger>
              <SelectContent>
                {DOCUMENT_TYPES.map((type) => (
                  <SelectItem key={type} value={type} className="text-[10px]">
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div 
            className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center p-[2px] relative rounded-[2px] shrink-0" 
            data-name="context"
            onClick={(e) => {
              e.stopPropagation();
              if (onContextMenu) {
                onContextMenu(e);
              }
            }}
          >
            <MoreVertical className="h-4 w-4 text-[#2474bb]" />
          </div>
        </div>
      </div>
    </div>
  );
}



interface UnclassifiedProps {
  documents: Document[];
  onDocumentClassification: (documentId: string, newType: DocumentType) => void;
  selectedDocumentId?: string;
  onDocumentSelect?: (documentId: string) => void;
}

function Unclassified({ documents, onDocumentClassification, selectedDocumentId, onDocumentSelect }: UnclassifiedProps) {
  const [contextMenu, setContextMenu] = useState<{
    isOpen: boolean;
    position: { x: number; y: number };
    documentId: string;
    documentName: string;
  }>({
    isOpen: false,
    position: { x: 0, y: 0 },
    documentId: '',
    documentName: '',
  });
  const unclassifiedDocs = documents.filter(doc => doc.type === 'Unclassified');

  // Don't render the container if there are no unclassified documents
  if (unclassifiedDocs.length === 0) {
    return null;
  }

  return (
    <>
      <DocumentPanelContainer>
        <div className="bg-white content-stretch flex flex-col gap-[4px] items-start relative rounded-[4px] shrink-0 w-full pt-[8px]">
          {unclassifiedDocs.map((doc, index) => (
            <DocumentInDropDown 
              key={doc.id}
              document={doc}
              index={index + 1}
              onClassificationChange={onDocumentClassification}
              isSelected={selectedDocumentId === doc.id}
              onSelect={() => onDocumentSelect?.(doc.id)}
              onContextMenu={(e) => {
                e.stopPropagation();
                const rect = e.currentTarget.getBoundingClientRect();
                const menuWidth = 210;
                setContextMenu({
                  isOpen: true,
                  position: { x: rect.right - menuWidth, y: rect.top },
                  documentId: doc.id,
                  documentName: doc.name,
                });
              }}
            />
          ))}
        </div>
      </DocumentPanelContainer>

      {/* Document Context Menu */}
      <DocumentContextMenu
        isOpen={contextMenu.isOpen}
        position={contextMenu.position}
        onClose={() => setContextMenu({ ...contextMenu, isOpen: false })}
        documentId={contextMenu.documentId}
        documentName={contextMenu.documentName}
        documentGroup="unclassified"
        onChangeDocumentType={(newType) => {
          onDocumentClassification(contextMenu.documentId, newType as DocumentType);
          setContextMenu({ ...contextMenu, isOpen: false });
        }}
      />
    </>
  );
}

function DropdownIndacator1() {
  return (
    <div className="relative shrink-0 size-[10px]" data-name="Dropdown Indacator">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Dropdown Indacator ">
          <path d={svgPaths.p10fa7370} fill="var(--fill-0, #3D3D3D)" id="angle-right" />
        </g>
      </svg>
    </div>
  );
}

function Frame427321945() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <DropdownIndacator1 />
      <div className="flex flex-col font-['Font_Awesome_6_Free:Solid',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#00bf30] text-[13px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">circle-check</p>
      </div>
    </div>
  );
}

function Frame427321952() {
  return (
    <div className="content-stretch flex gap-[13px] items-center relative shrink-0">
      <Frame427321945 />
      <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#3d3d3d] text-[13px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">Approved</p>
      </div>
      <div className="flex flex-col font-['Roboto:Light',_sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[#8d9aae] text-[13px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">(1)</p>
      </div>
    </div>
  );
}

interface ApprovedProps {
  approvedDocuments: ApprovedDocument[];
  selectedDocumentId?: string;
}

// ApprovedContainer is already imported at the top and handles the full approved documents display
function Appproved({ approvedDocuments, selectedDocumentId }: ApprovedProps) {
  // Don't render if no approved documents
  if (approvedDocuments.length === 0) {
    return null;
  }
  
  return <ApprovedContainer approvedDocuments={approvedDocuments} selectedDocumentId={selectedDocumentId} />;
}

function DropdownIndacator2() {
  return (
    <div className="relative shrink-0 size-[10px]" data-name="Dropdown Indacator">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Dropdown Indacator ">
          <path d={svgPaths.p10fa7370} fill="var(--fill-0, #3D3D3D)" id="angle-right" />
        </g>
      </svg>
    </div>
  );
}

function Frame427321946() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <DropdownIndacator2 />
      <div className="flex flex-col font-['Font_Awesome_6_Free:Solid',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#8d9aae] text-[13px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">trash</p>
      </div>
    </div>
  );
}

function Frame427321953() {
  return (
    <div className="content-stretch flex gap-[13px] items-center relative shrink-0">
      <Frame427321946 />
      <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#3d3d3d] text-[13px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">Rejected</p>
      </div>
      <div className="flex flex-col font-['Roboto:Light',_sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[#8d9aae] text-[13px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">(1)</p>
      </div>
    </div>
  );
}

function Frame427322047() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <Frame427321953 />
      <div className="flex flex-col font-['Font_Awesome_6_Free:Solid',_sans-serif] justify-center leading-[0] not-italic opacity-0 relative shrink-0 text-[#2474bb] text-[13px] text-center text-nowrap">
        <p className="leading-[normal] whitespace-pre">ellipsis-vertical</p>
      </div>
    </div>
  );
}

function Deleted() {
  return (
    <div className="bg-white relative rounded-[6px] shrink-0 w-full" data-name="Deleted">
      <div aria-hidden="true" className="absolute border border-[#e2e6eb] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-col justify-center size-full">

      </div>
    </div>
  );
}

interface DocumentPannelsProps {
  documents: Document[];
  onDocumentClassification: (documentId: string, newType: DocumentType) => void;
  approvedDocuments: ApprovedDocument[];
  missingDocuments: MissingDocument[];
  onToggleMissingDocIgnore: (documentId: string) => void;
  selectedDocumentId?: string;
  onDocumentSelect?: (documentId: string) => void;
}

function DocumentPannels({ 
  documents, 
  onDocumentClassification, 
  approvedDocuments, 
  missingDocuments,
  onToggleMissingDocIgnore,
  selectedDocumentId, 
  onDocumentSelect 
}: DocumentPannelsProps) {
  return (
    <div className="content-stretch flex flex-col gap-[13px] items-start relative shrink-0 w-full z-[1] max-h-[40vh] overflow-y-auto" data-name="Document pannels">
      <Unclassified 
        documents={documents} 
        onDocumentClassification={onDocumentClassification}
        selectedDocumentId={selectedDocumentId}
        onDocumentSelect={onDocumentSelect}
      />
      <MissingDocumentsContainer
        missingDocuments={missingDocuments}
        onToggleIgnore={onToggleMissingDocIgnore}
        selectedDocumentId={selectedDocumentId}
        onDocumentSelect={onDocumentSelect}
      />
      <Appproved approvedDocuments={approvedDocuments} selectedDocumentId={selectedDocumentId} />
      <Deleted />
    </div>
  );
}

function AuditSection(props: ValadationSectionProps) {
  const [activeTab, setActiveTab] = useState("exceptions");
  
  // Calculate exception counts
  const unclassifiedCount = props.documents.filter(doc => doc.type === 'Unclassified').length;
  const fieldExceptionCount = props.validationData.filter(field => 
    !field.isResolved && 
    !field.isIgnored && 
    field.expectedValue !== field.evaluatedValue
  ).length;
  const missingCount = props.missingDocuments.filter(doc => !doc.isIgnored && !doc.isPendingRemoval).length;
  const approvedCount = props.approvedDocuments.length;

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (props.onActiveTabChange) {
      props.onActiveTabChange(tab);
    }
  };

  const handleSave = () => {
    // Call the optional onSave callback if provided
    if (props.onSave) {
      props.onSave();
    }
    // Show success toast
    console.log('Changes saved successfully');
  };

  const handleSaveAndApprove = () => {
    // Save changes first, then approve
    if (props.onSave) {
      props.onSave();
    }
    props.onApprove();
  };

  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full" data-name="Audit section">
      <div className="flex flex-col items-end size-full">
        <div className="box-border content-stretch flex flex-col isolate items-end pb-0 pt-0 px-0 relative size-full">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="basis-0 grow min-h-px min-w-px relative rounded-[6px] shrink-0 w-full z-[3]">
            {/* Enhanced Tab Header with Full Visual Hierarchy */}
            <ExceptionTabHeader
              activeTab={activeTab}
              onTabChange={handleTabChange}
              fieldExceptionCount={fieldExceptionCount}
              missingCount={missingCount}
              unclassifiedCount={unclassifiedCount}
              approvedCount={approvedCount}
              hasUnsavedChanges={props.hasChanges}
            />

            {/* Tab Contents */}
            <TabsContent value="exceptions" className="flex-1 mt-0 overflow-y-auto overflow-x-hidden pb-[80px] scroll-smooth">
              <div className="pt-[16px] p-[0px] pr-[0px] pb-[0px] pl-[0px]">
                <ConsolidatedExceptionsView
                  validationData={props.validationData}
                  onFieldUpdate={props.onFieldUpdate}
                  onApprove={props.onApprove}
                  parseRangeFromAdditionalInfo={props.parseRangeFromAdditionalInfo}
                  isValueInRange={props.isValueInRange}
                  selectedSections={props.selectedSections}
                  onSelectedSectionsChange={props.onSelectedSectionsChange}
                  approvedDocuments={props.approvedDocuments}
                  selectedDocumentId={props.selectedDocumentId}
                  onDocumentSelect={props.onDocumentSelect}
                  missingDocuments={props.missingDocuments}
                  onToggleMissingDocIgnore={props.onToggleMissingDocIgnore}
                  documents={props.documents}
                  onDocumentClassification={props.onDocumentClassification}
                />
              </div>
            </TabsContent>

            <TabsContent value="approved" className="flex-1 mt-0 overflow-auto px-[16px] pt-[16px] pb-[80px]">
              <div className="content-stretch flex flex-col gap-[13px] items-start relative shrink-0 w-full h-full overflow-y-auto">
                {approvedCount > 0 ? (
                  <Appproved approvedDocuments={props.approvedDocuments} selectedDocumentId={props.selectedDocumentId} />
                ) : (
                  <div className="flex flex-col items-center justify-center w-full p-8 text-[#8d9aae] text-[13px] gap-[8px]">
                    <CheckCircle className="h-[32px] w-[32px] text-[#00bf30]" />
                    <p>No documents approved yet</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>

          {/* Bottom Control Bar */}
          <BottomControlBar
            isVisible={true}
            onSave={handleSave}
            onSaveAndApprove={handleSaveAndApprove}
            onCancel={props.onRevertChanges}
            hasChanges={props.hasChanges}
            canApprove={props.selectedSections.size > 0}
            approveCount={props.selectedSections.size}
          />
        </div>
      </div>
    </div>
  );
}

export default function ValadationSection(props: ValadationSectionProps) {
  return (
    <div className="bg-white box-border content-stretch flex flex-col items-center justify-end p-[0px] px-0 relative rounded-[6px] size-full" data-name="Valadation section">
      <AuditSection {...props} />
    </div>
  );
}
