import type { DocumentHold, HoldAuditEvent, HoldReason, HoldRule } from '../types/documentHolds';

export const CURRENT_USER = 'JC';

export const DOCUMENT_SET_NAME = 'Load 123456789999';

export const initialHoldReasons: HoldReason[] = [
  { id: 'reason-missing-fuel-receipt', label: 'Missing Fuel Receipt', isRetired: false },
  { id: 'reason-pending-carrier', label: 'Pending Carrier Review', isRetired: false },
  { id: 'reason-duplicate', label: 'Duplicate Investigation', isRetired: false },
  { id: 'reason-rate-dispute', label: 'Rate Dispute', isRetired: false },
  { id: 'reason-compliance', label: 'Compliance Review Required', isRetired: false },
  { id: 'reason-customer-hold', label: 'Customer Requested Hold', isRetired: false },
  { id: 'reason-legacy', label: 'Legacy Hold Reason (Retired)', isRetired: true },
];

export const holdRules: HoldRule[] = [
  {
    id: 'rule-invoice-fuel-receipt',
    targetSection: 'Invoice',
    dependsOnDocumentType: 'Fuel Receipt',
    reasonId: 'reason-missing-fuel-receipt',
    type: 'automated_non_overridable',
    documentSet: DOCUMENT_SET_NAME,
    notes: 'Invoice cannot be approved until the fuel receipt is uploaded and classified.',
  },
];

const now = new Date();

export const initialHolds: DocumentHold[] = [
  {
    id: 'hold-1',
    documentSection: 'Invoice',
    reasonId: 'reason-missing-fuel-receipt',
    notes: 'Invoice cannot be approved until the fuel receipt is uploaded and classified.',
    type: 'automated_non_overridable',
    status: 'active',
    documentSet: DOCUMENT_SET_NAME,
    dependsOnDocumentType: 'Fuel Receipt',
    placedBy: 'System',
    placedAt: new Date(now.getTime() - 3600000),
  },
  {
    id: 'hold-2',
    documentSection: 'Invoice',
    reasonId: 'reason-pending-carrier',
    notes: 'Carrier rate confirmation pending from TMS.',
    type: 'automated_overridable',
    status: 'active',
    documentSet: DOCUMENT_SET_NAME,
    placedBy: 'System',
    placedAt: new Date(now.getTime() - 1800000),
  },
];

export const initialHoldAuditLog: HoldAuditEvent[] = [
  {
    id: 'audit-1',
    holdId: 'hold-1',
    documentSection: 'Invoice',
    reasonLabel: 'Missing Fuel Receipt',
    action: 'placed',
    actor: 'System',
    timestamp: new Date(now.getTime() - 3600000),
    details: 'Rule: missing related document (Fuel Receipt)',
  },
  {
    id: 'audit-2',
    holdId: 'hold-2',
    documentSection: 'Invoice',
    reasonLabel: 'Pending Carrier Review',
    action: 'placed',
    actor: 'System',
    timestamp: new Date(now.getTime() - 1800000),
    details: 'Rule: automated overridable hold',
  },
];
