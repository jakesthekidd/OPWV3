import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';
import {
  CURRENT_USER,
  DOCUMENT_SET_NAME,
  holdRules,
  initialHoldAuditLog,
  initialHoldReasons,
  initialHolds,
} from '../mock/holdData';
import type {
  DocumentHold,
  DocumentRef,
  HoldAuditEvent,
  HoldIndicatorVariant,
  HoldReason,
  ManualHoldEntry,
  MissingDocumentRef,
} from '../types/documentHolds';

const FAST_POLL_MS = 5000;
const SLOW_POLL_MS = 30000;

function createId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function isDocumentTypePresent(
  documentType: string,
  documents: DocumentRef[],
  missingDocuments: MissingDocumentRef[]
): boolean {
  const hasClassifiedDoc = documents.some(
    (doc) => doc.type === documentType && doc.type !== 'Unclassified'
  );
  const isStillMissing = missingDocuments.some(
    (doc) => doc.name === documentType && !doc.isIgnored && !doc.isPendingRemoval
  );
  return hasClassifiedDoc && !isStillMissing;
}

export interface UseDocumentHoldsOptions {
  documents: DocumentRef[];
  missingDocuments: MissingDocumentRef[];
}

export function useDocumentHolds({ documents, missingDocuments }: UseDocumentHoldsOptions) {
  const [holds, setHolds] = useState<DocumentHold[]>(initialHolds);
  const [holdReasons, setHoldReasons] = useState<HoldReason[]>(initialHoldReasons);
  const [holdAuditLog, setHoldAuditLog] = useState<HoldAuditEvent[]>(initialHoldAuditLog);

  const appendAudit = useCallback(
    (event: Omit<HoldAuditEvent, 'id' | 'timestamp'> & { timestamp?: Date }) => {
      setHoldAuditLog((prev) => [
        {
          ...event,
          id: createId('audit'),
          timestamp: event.timestamp ?? new Date(),
        },
        ...prev,
      ]);
    },
    []
  );

  const getReasonLabel = useCallback(
    (reasonId: string) => holdReasons.find((r) => r.id === reasonId)?.label ?? reasonId,
    [holdReasons]
  );

  const getActiveHolds = useCallback(
    (section: string) =>
      holds.filter((h) => h.documentSection === section && h.status === 'active'),
    [holds]
  );

  const getRemovedHolds = useCallback(
    (section: string) =>
      holds.filter(
        (h) =>
          h.documentSection === section &&
          (h.status === 'overridden' || h.status === 'cleared')
      ),
    [holds]
  );

  const hasActiveHolds = useCallback(
    (section: string) => getActiveHolds(section).length > 0,
    [getActiveHolds]
  );

  const getHoldIndicatorVariant = useCallback(
    (section: string): HoldIndicatorVariant => {
      const active = getActiveHolds(section);
      if (active.length === 0) return 'none';
      if (active.some((h) => h.type === 'automated_non_overridable')) return 'locked';
      return 'overridable';
    },
    [getActiveHolds]
  );

  const canOverride = useCallback(
    (section: string) =>
      getActiveHolds(section).some((h) => h.type !== 'automated_non_overridable'),
    [getActiveHolds]
  );

  const activeReasons = useMemo(
    () => holdReasons.filter((r) => !r.isRetired),
    [holdReasons]
  );

  const evaluateRules = useCallback(
    (docs: DocumentRef[], missing: MissingDocumentRef[]) => {
      setHolds((prev) => {
        let next = [...prev];
        let changed = false;

        for (const rule of holdRules) {
          if (!rule.dependsOnDocumentType) continue;

          const conditionMet = isDocumentTypePresent(
            rule.dependsOnDocumentType,
            docs,
            missing
          );
          const existingIdx = next.findIndex(
            (h) =>
              h.documentSection === rule.targetSection &&
              h.reasonId === rule.reasonId &&
              h.dependsOnDocumentType === rule.dependsOnDocumentType
          );

          if (!conditionMet) {
            if (existingIdx === -1) {
              const newHold: DocumentHold = {
                id: createId('hold'),
                documentSection: rule.targetSection,
                reasonId: rule.reasonId,
                notes: rule.notes,
                type: rule.type,
                status: 'active',
                documentSet: rule.documentSet,
                dependsOnDocumentType: rule.dependsOnDocumentType,
                placedBy: 'System',
                placedAt: new Date(),
              };
              next.push(newHold);
              changed = true;
              appendAudit({
                holdId: newHold.id,
                documentSection: rule.targetSection,
                reasonLabel: getReasonLabel(rule.reasonId),
                action: 'placed',
                actor: 'System',
                details: `Rule: missing related document (${rule.dependsOnDocumentType})`,
              });
            } else if (next[existingIdx].status !== 'active') {
              next[existingIdx] = {
                ...next[existingIdx],
                status: 'active',
                placedAt: new Date(),
                placedBy: 'System',
                clearedBy: undefined,
                clearedAt: undefined,
                overriddenBy: undefined,
                overriddenAt: undefined,
              };
              changed = true;
            }
          } else if (existingIdx !== -1 && next[existingIdx].status === 'active') {
            const hold = next[existingIdx];
            next[existingIdx] = {
              ...hold,
              status: 'cleared',
              clearedBy: 'System',
              clearedAt: new Date(),
            };
            changed = true;
            appendAudit({
              holdId: hold.id,
              documentSection: hold.documentSection,
              reasonLabel: getReasonLabel(hold.reasonId),
              action: 'auto_cleared',
              actor: 'System',
              details: `${rule.dependsOnDocumentType} is now present and classified`,
            });
            toast.success(
              `Hold cleared: ${getReasonLabel(hold.reasonId)} — ${rule.dependsOnDocumentType} received`
            );
          }
        }

        return changed ? next : prev;
      });
    },
    [appendAudit, getReasonLabel]
  );

  const placeManualHolds = useCallback(
    (section: string, entries: ManualHoldEntry[]) => {
      const validEntries = entries.filter((e) => e.reasonId);
      if (validEntries.length === 0) return;

      const newHolds: DocumentHold[] = validEntries.map((entry) => ({
        id: createId('hold'),
        documentSection: section,
        reasonId: entry.reasonId,
        notes: entry.notes,
        type: 'manual',
        status: 'active',
        documentSet: DOCUMENT_SET_NAME,
        placedBy: CURRENT_USER,
        placedAt: new Date(),
      }));

      setHolds((prev) => [...prev, ...newHolds]);

      newHolds.forEach((hold) => {
        appendAudit({
          holdId: hold.id,
          documentSection: section,
          reasonLabel: getReasonLabel(hold.reasonId),
          action: 'placed',
          actor: CURRENT_USER,
          details: hold.notes,
        });
      });

      toast.success(
        `${validEntries.length} hold${validEntries.length > 1 ? 's' : ''} placed on ${section}`
      );
    },
    [appendAudit, getReasonLabel]
  );

  const overrideHolds = useCallback(
    (section: string, holdIds: string[]) => {
      const now = new Date();
      setHolds((prev) => {
        const updated = prev.map((h) => {
          if (h.documentSection !== section || h.status !== 'active') return h;
          if (!holdIds.includes(h.id)) return h;
          if (h.type === 'automated_non_overridable') return h;
          appendAudit({
            holdId: h.id,
            documentSection: section,
            reasonLabel: getReasonLabel(h.reasonId),
            action: 'overridden',
            actor: CURRENT_USER,
            details: h.notes,
          });
          return {
            ...h,
            status: 'overridden' as const,
            overriddenBy: CURRENT_USER,
            overriddenAt: now,
          };
        });

        const remaining = updated.filter(
          (h) => h.documentSection === section && h.status === 'active'
        );

        if (remaining.length === 0) {
          toast.success(`All overridable holds cleared on ${section}`);
        } else {
          toast.info(
            `${remaining.length} hold${remaining.length > 1 ? 's' : ''} still blocking ${section}`
          );
        }

        return updated;
      });
    },
    [appendAudit, getReasonLabel]
  );

  const addHoldReason = useCallback((label: string) => {
    const reason: HoldReason = { id: createId('reason'), label, isRetired: false };
    setHoldReasons((prev) => [...prev, reason]);
    return reason;
  }, []);

  const updateHoldReason = useCallback((id: string, label: string) => {
    setHoldReasons((prev) => prev.map((r) => (r.id === id ? { ...r, label } : r)));
  }, []);

  const retireHoldReason = useCallback((id: string) => {
    setHoldReasons((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isRetired: true } : r))
    );
  }, []);

  const needsFastPolling = useMemo(
    () =>
      holds.some(
        (h) =>
          h.status === 'active' &&
          h.dependsOnDocumentType &&
          !isDocumentTypePresent(h.dependsOnDocumentType, documents, missingDocuments)
      ),
    [holds, documents, missingDocuments]
  );

  const evaluateRef = useRef(evaluateRules);
  evaluateRef.current = evaluateRules;

  useEffect(() => {
    evaluateRef.current(documents, missingDocuments);
  }, [documents, missingDocuments]);

  useEffect(() => {
    const intervalMs = needsFastPolling ? FAST_POLL_MS : SLOW_POLL_MS;
    const id = window.setInterval(() => {
      evaluateRef.current(documents, missingDocuments);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [needsFastPolling, documents, missingDocuments]);

  return {
    holds,
    holdReasons,
    holdAuditLog,
    activeReasons,
    getActiveHolds,
    getRemovedHolds,
    hasActiveHolds,
    getHoldIndicatorVariant,
    canOverride,
    getReasonLabel,
    placeManualHolds,
    overrideHolds,
    evaluateRules,
    addHoldReason,
    updateHoldReason,
    retireHoldReason,
    needsFastPolling,
  };
}
