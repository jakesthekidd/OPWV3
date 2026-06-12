import { motion } from 'motion/react';
import svgPaths from '../imports/svg-yp1i5y3a7m';

interface ExceptionTabHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  fieldExceptionCount: number;
  missingCount: number;
  unclassifiedCount: number;
  approvedCount: number;
}

// Icon Components
function FieldExceptionIcon() {
  return (
    <div className="content-stretch flex gap-[3px] items-center justify-center relative shrink-0">
      {null}
    </div>
  );
}

function MissingDocIcon() {
  return (
    <div className="content-stretch flex gap-[7.619px] items-center justify-center relative shrink-0 w-[16px]">
      <div className="h-[16px] relative shrink-0 w-[12.364px]">
        <div className="absolute inset-0" style={{ "--fill-0": "rgba(218, 31, 44, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 16">
            <g>
              <path d={svgPaths.p372a2070} fill="var(--fill-0, #DA1F2C)" />
              <path d={svgPaths.p1a044400} fill="var(--fill-0, #DA1F2C)" />
              <path clipRule="evenodd" d={svgPaths.p1e33da00} fill="var(--fill-0, #DA1F2C)" fillRule="evenodd" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function UnclassifiedIcon() {
  return (
    <div className="content-stretch flex gap-[7.619px] items-center justify-center relative shrink-0 w-[16px]">
      <div className="h-[16px] relative shrink-0 w-[12.26px]">
        <div className="absolute inset-0" style={{ "--fill-0": "rgba(151, 71, 255, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 16">
            <g>
              <path d={svgPaths.p1dbc9480} fill="var(--fill-0, #9747FF)" />
              <path d={svgPaths.p2f9aca00} fill="var(--fill-0, #9747FF)" />
              <path d={svgPaths.p3f26300} fill="var(--fill-0, #9747FF)" />
              <path d={svgPaths.p1553b740} fill="var(--fill-0, #9747FF)" />
              <path d={svgPaths.p3a8f5000} fill="var(--fill-0, #9747FF)" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function ApprovedIcon() {
  return (
    <div className="content-stretch flex gap-[7.619px] items-center justify-center relative shrink-0 size-[16px]">
      <div className="relative shrink-0 size-[13.714px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <path d={svgPaths.p1e889780} fill="var(--fill-0, #00BF30)" />
        </svg>
      </div>
    </div>
  );
}

interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  count: number;
  accentColor: string;
}

function TabButton({ isActive, onClick, icon, label, count, accentColor }: TabButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className="box-border content-stretch flex gap-[8px] items-center justify-center px-[20px] py-[14px] relative rounded-[6px] shrink-0 cursor-pointer w-full"
      initial={false}
      animate={{
        backgroundColor: isActive ? 'rgba(255, 255, 255, 1)' : 'rgba(247, 249, 251, 1)',
      }}
      whileHover={{
        backgroundColor: isActive ? 'rgba(255, 255, 255, 1)' : 'rgba(237, 242, 247, 1)',
        scale: 1.01,
      }}
      whileTap={{
        scale: 0.99,
      }}
      transition={{
        duration: 0.2,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      style={{
        position: 'relative',
      }}
    >
      {/* Border overlay with smooth animation */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-[6px]"
        initial={false}
        animate={{
          borderColor: isActive ? accentColor : '#e2e6eb',
          borderWidth: isActive ? '2px' : '1px',
          opacity: 1,
        }}
        whileHover={{
          borderColor: isActive ? accentColor : '#c6ccd6',
          borderWidth: isActive ? '2px' : '1px',
        }}
        transition={{
          duration: 0.25,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        style={{
          borderStyle: 'solid',
        }}
      />
      
      {/* Shadow for selected state */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-[6px]"
        initial={false}
        animate={{
          opacity: isActive ? 1 : 0,
        }}
        transition={{ 
          duration: 0.25,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        style={{
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.08)',
        }}
      />
      
      <motion.div
        className="flex items-center gap-[6px] relative z-[1]"
        initial={false}
        animate={{
          opacity: isActive ? 1 : 0.8,
        }}
        whileHover={{
          opacity: 1,
        }}
        transition={{ 
          duration: 0.2,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        <motion.div
          initial={false}
          animate={{
            scale: isActive ? 1 : 1,
          }}
          whileHover={{
            scale: 1.05,
          }}
          transition={{
            duration: 0.2,
            ease: [0.34, 1.56, 0.64, 1],
          }}
        >
          {icon}
        </motion.div>
        <div
          className="flex flex-col font-['Roboto:Medium',sans-serif] justify-center leading-[0] relative shrink-0 text-[#3d3d3d] text-[13px] text-nowrap"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          <p className="leading-[normal] whitespace-pre">{label}</p>
        </div>
        <motion.p
          className="font-['Roboto:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#3d3d3d] text-[13px] text-nowrap whitespace-pre"
          style={{ fontVariationSettings: "'wdth' 100" }}
          key={count}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.3,
            ease: [0.34, 1.56, 0.64, 1],
          }}
        >
          ({count})
        </motion.p>
      </motion.div>
    </motion.button>
  );
}

export default function ExceptionTabHeader({
  activeTab,
  onTabChange,
  fieldExceptionCount,
  missingCount,
  unclassifiedCount,
  approvedCount,
  hasUnsavedChanges = false,
}: ExceptionTabHeaderProps & { hasUnsavedChanges?: boolean }) {
  const totalCount = fieldExceptionCount + missingCount + unclassifiedCount;
  const totalDocuments = totalCount + approvedCount;
  const progressPercentage = totalDocuments > 0 ? (approvedCount / totalDocuments) * 100 : 0;

  return (
    <div
      className="bg-white box-border content-stretch flex flex-col items-center justify-center px-[16px] py-[16px] relative shrink-0 w-full rounded-t-[6px] border-b border-[#e2e6eb]"
      data-name="Header"
      data-tour="tabs"
    >
      {/* Tabs Row - Only Exceptions and Approved */}
      <motion.div
        className="content-stretch flex items-center relative shrink-0 w-full gap-[8px]"
        data-name="Exception tabs"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.5, 
          delay: 0.15, 
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        {/* Exceptions Tab - consolidated view */}
        {totalCount > 0 && (
          <div className="flex-1">
            <TabButton
              isActive={activeTab === 'exceptions'}
              onClick={() => onTabChange('exceptions')}
              icon={<FieldExceptionIcon />}
              label="Exceptions"
              count={totalCount}
              accentColor="#FF5C00"
            />
          </div>
        )}
        
        {/* Approved Tab */}
        {approvedCount > 0 && (
          <div className="flex-1">
            <TabButton
              isActive={activeTab === 'approved'}
              onClick={() => onTabChange('approved')}
              icon={<ApprovedIcon />}
              label="Approved"
              count={approvedCount}
              accentColor="#00BF30"
            />
          </div>
        )}
      </motion.div>
    </div>
  );
}