import { useState } from 'react';
import { CheckCircle2, AlertCircle, Calendar } from 'lucide-react';

type ValidationState = 'default' | 'success' | 'error';

interface ValidationInputProps {
  value: string;
  expectedValue?: string; // If provided, will auto-determine state
  onChange?: (value: string) => void;
  state?: ValidationState;
  showCalendar?: boolean;
  showIcon?: boolean;
  iconType?: 'check' | 'exclamation' | 'none';
  placeholder?: string;
  readOnly?: boolean;
}

export function ValidationInput({
  value,
  expectedValue,
  onChange,
  state: propState,
  showCalendar = false,
  showIcon = true,
  iconType,
  placeholder,
  readOnly = false,
}: ValidationInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange?.(newValue);
  };

  // Auto-determine state based on expectedValue if provided
  const state = propState || (expectedValue 
    ? (value === expectedValue ? 'success' : 'error')
    : 'default');

  // Determine styles based on state
  const getBorderColor = () => {
    if (state === 'success') return '#00bf30';
    if (state === 'error') return '#da1f2c';
    if (isFocused) return '#72cdf4';
    return '#e2e6eb';
  };

  const getBackgroundColor = () => {
    if (state === 'success') return '#e5f9ea';
    return 'white';
  };

  const getIcon = () => {
    if (!showIcon) return null;
    
    // Auto-determine icon based on state if not explicitly provided
    const icon = iconType || (state === 'success' ? 'check' : state === 'error' ? 'exclamation' : 'none');
    
    if (icon === 'check') {
      return (
        <CheckCircle2 className="h-2.5 w-2.5 text-[#00bf30]" />
      );
    }
    
    if (icon === 'exclamation') {
      return (
        <AlertCircle className="h-2.5 w-2.5 text-[#da1f2c]" />
      );
    }
    
    return null;
  };

  return (
    <div className="relative w-full">
      {/* Focus ring - using standard Prime focus ring with --ring token */}
      {isFocused && (
        <div 
          aria-hidden="true" 
          className="absolute inset-0 rounded-[4px] pointer-events-none z-20"
          style={{
            boxShadow: '0 0 0 3px var(--ring)',
            opacity: 0.5,
          }}
        />
      )}
      
      <div 
        className={`
          validation-input-container
          ${state === 'success' ? 'validation-input-success' : ''}
          ${state === 'error' ? 'validation-input-error' : ''}
          relative rounded-[4px] w-full
        `}
        style={{ backgroundColor: getBackgroundColor() }}
      >
        {/* Border */}
        <div 
          aria-hidden="true" 
          className="absolute border border-solid inset-0 pointer-events-none rounded-[4px] z-[1]"
          style={{ borderColor: getBorderColor() }}
        />
        
        {/* Content */}
        <div className="flex flex-row items-center w-full relative z-[2]">
          <div className="flex gap-[8px] items-center px-[8px] py-[6px] w-full">
            <input
              type="text"
              value={value}
              onChange={handleChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              readOnly={readOnly}
              disabled={readOnly}
              placeholder={placeholder}
              className="flex-1 min-w-0 border-none outline-none bg-transparent p-0 m-0 font-['Roboto:Regular',_sans-serif] text-[12px] text-[#3d3d3d] disabled:cursor-default"
              style={{
                fontWeight: 'normal',
                fontVariationSettings: "'wdth' 100",
                lineHeight: '16px',
              }}
            />
            
            {showCalendar && (
              <button 
                type="button"
                className="bg-[#f3f5f7] flex items-center justify-center p-[4px] rounded-[2px] shrink-0 cursor-pointer hover:bg-[#e8ecf0] transition-colors"
                tabIndex={-1}
              >
                <Calendar className="h-2.5 w-2.5 text-[#5a626f]" />
              </button>
            )}
            
            {getIcon()}
          </div>
        </div>
      </div>
    </div>
  );
}
