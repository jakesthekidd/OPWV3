import { createContext, useContext } from 'react';
import type { HoldAuditEvent } from '../types/documentHolds';

interface DocumentHoldsContextValue {
  holdAuditLog: HoldAuditEvent[];
  onOpenHoldReasonsSettings: () => void;
}

export const DocumentHoldsContext = createContext<DocumentHoldsContextValue | null>(null);

export function useDocumentHoldsContext() {
  const ctx = useContext(DocumentHoldsContext);
  return ctx;
}
