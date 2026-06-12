import { createContext, useContext, useState, ReactNode } from 'react';

export interface ValidationField {
  id: string;
  fieldName: string;
  expected: string;
  evaluated: string;
  hasArrow: boolean;
  isAnimating?: boolean;
  expectedRange?: string;
}

interface ValidationContextType {
  fields: ValidationField[];
  updateEvaluated: (id: string, value: string) => void;
  copyExpectedToEvaluated: (id: string) => void;
  startAnimation: (id: string) => void;
  completeAnimation: (id: string) => void;
}

const ValidationContext = createContext<ValidationContextType | undefined>(undefined);

export function useValidation() {
  const context = useContext(ValidationContext);
  if (!context) {
    throw new Error('useValidation must be used within ValidationProvider');
  }
  return context;
}

interface ValidationProviderProps {
  children: ReactNode;
}

export function ValidationProvider({ children }: ValidationProviderProps) {
  const [fields, setFields] = useState<ValidationField[]>([
    {
      id: 'total',
      fieldName: 'Total',
      expected: '$900',
      evaluated: '$900',
      hasArrow: false,
      expectedRange: '$800 -$900',
    },
    {
      id: 'carrier',
      fieldName: 'Carrier',
      expected: 'Swift',
      evaluated: 'Swift',
      hasArrow: false,
    },
    {
      id: 'invoice-number',
      fieldName: 'Invoice number',
      expected: '1234567',
      evaluated: 'Swift',
      hasArrow: true,
    },
    {
      id: 'invoice-date',
      fieldName: 'Invoice date',
      expected: '11/25/2024',
      evaluated: '11/25/2024',
      hasArrow: false,
    },
    {
      id: 'location',
      fieldName: 'Location',
      expected: '987654321',
      evaluated: '',
      hasArrow: true,
    },
    {
      id: 'po-number',
      fieldName: 'PO number',
      expected: '98765',
      evaluated: '',
      hasArrow: true,
    },
    {
      id: 'amount',
      fieldName: 'Amount',
      expected: '$100',
      evaluated: '',
      hasArrow: true,
    },
  ]);

  const updateEvaluated = (id: string, value: string) => {
    setFields(prev =>
      prev.map(field => {
        if (field.id === id) {
          // Show arrow again if value doesn't match expected
          const shouldShowArrow = value !== field.expected;
          return { ...field, evaluated: value, hasArrow: shouldShowArrow, isAnimating: false };
        }
        return field;
      })
    );
  };

  const copyExpectedToEvaluated = (id: string) => {
    setFields(prev =>
      prev.map(field =>
        field.id === id ? { ...field, evaluated: field.expected } : field
      )
    );
  };

  const startAnimation = (id: string) => {
    setFields(prev =>
      prev.map(field =>
        field.id === id ? { ...field, isAnimating: true } : field
      )
    );
  };

  const completeAnimation = (id: string) => {
    setFields(prev =>
      prev.map(field =>
        field.id === id ? { ...field, isAnimating: false, hasArrow: false } : field
      )
    );
  };

  return (
    <ValidationContext.Provider value={{ fields, updateEvaluated, copyExpectedToEvaluated, startAnimation, completeAnimation }}>
      {children}
    </ValidationContext.Provider>
  );
}
