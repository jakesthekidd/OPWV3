export type HoldType = 'automated_non_overridable' | 'automated_overridable' | 'manual';

export type HoldStatus = 'active' | 'cleared' | 'overridden';

export type HoldIndicatorVariant = 'none' | 'overridable' | 'locked';

export interface HoldReason {
  id: string;
  label: string;
  isRetired: boolean;
}

export interface DocumentHold {
  id: string;
  documentSection: string;
  reasonId: string;
  notes?: string;
  type: HoldType;
  status: HoldStatus;
  documentSet?: string;
  dependsOnDocumentType?: string;
  placedBy?: string;
  placedAt: Date;
  clearedBy?: string;
  clearedAt?: Date;
  overriddenBy?: string;
  overriddenAt?: Date;
}

export type HoldAuditAction = 'placed' | 'cleared' | 'overridden' | 'auto_cleared';

export interface HoldAuditEvent {
  id: string;
  holdId: string;
  documentSection: string;
  reasonLabel: string;
  action: HoldAuditAction;
  actor: string;
  timestamp: Date;
  details?: string;
}

export interface ManualHoldEntry {
  reasonId: string;
  notes?: string;
}

export interface MissingDocumentRef {
  id: string;
  name: string;
  isIgnored: boolean;
  isPendingRemoval?: boolean;
}

export interface DocumentRef {
  id: string;
  name: string;
  type: string;
  status: string;
}

export interface HoldRule {
  id: string;
  targetSection: string;
  dependsOnDocumentType: string;
  reasonId: string;
  type: HoldType;
  documentSet: string;
  notes?: string;
}
