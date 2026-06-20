import { format } from 'date-fns';
import type { DocumentHold } from '../../types/documentHolds';

export interface RemovedHoldDetails {
  removedBy: string;
  removedAt: Date;
}

export function getRemovedHoldDetails(hold: DocumentHold): RemovedHoldDetails | null {
  if (hold.status === 'overridden' && hold.overriddenAt && hold.overriddenBy) {
    return { removedBy: hold.overriddenBy, removedAt: hold.overriddenAt };
  }
  if (hold.status === 'cleared' && hold.clearedAt && hold.clearedBy) {
    return { removedBy: hold.clearedBy, removedAt: hold.clearedAt };
  }
  return null;
}

export function formatHoldRemovedDate(date: Date): string {
  return format(date, 'dd/MM/yyyy');
}

export function sortRemovedHolds(holds: DocumentHold[]): DocumentHold[] {
  return [...holds].sort((a, b) => {
    const aDate = getRemovedHoldDetails(a)?.removedAt.getTime() ?? 0;
    const bDate = getRemovedHoldDetails(b)?.removedAt.getTime() ?? 0;
    return bDate - aDate;
  });
}
