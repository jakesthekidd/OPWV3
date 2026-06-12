import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, Download, Plus } from 'lucide-react';
import { toast } from 'sonner';

interface DocumentContextMenuProps {
  isOpen: boolean;
  onClose: () => void;
  position: { x: number; y: number };
  documentGroup: 'active' | 'approved' | 'rejected' | 'unclassified' | 'validation';
  documentId: string;
  documentName: string;
  onChangeDocumentType?: (newType: string) => void;
  onDownload?: () => void;
  onMoveToLoadId?: (loadId: string) => void;
  onReject?: (reason: string) => void;
  existingDocumentTypes?: string[]; // Document types currently in the load
}

export default function DocumentContextMenu({
  isOpen,
  onClose,
  position,
  documentGroup,
  documentId,
  documentName,
  onChangeDocumentType,
  onDownload,
  onMoveToLoadId,
  onReject,
  existingDocumentTypes,
}: DocumentContextMenuProps) {
  const [activeSubmenu, setActiveSubmenu] = useState<'type' | 'reject' | null>(null);
  const [loadIdSearch, setLoadIdSearch] = useState('');
  const [menuPosition, setMenuPosition] = useState({ x: position.x, y: position.y });
  const [submenuPosition, setSubmenuPosition] = useState<'right' | 'left'>('right');
  const menuRef = useRef<HTMLDivElement>(null);

  // Sample Load IDs for search
  const loadIds = ['2', '2AB_FieldErrors_001', '211345', '252633'];
  const filteredLoadIds = loadIds.filter(id => 
    id.toLowerCase().includes(loadIdSearch.toLowerCase())
  );

  // Document types for submenu
  const existingTypes = existingDocumentTypes || ['Invoice', 'Bill of Lading', 'Proof of Delivery', 'Driver Log'];
  
  // All possible document types
  const allDocumentTypes = [
    'Invoice',
    'Bill of Lading', 
    'Proof of Delivery',
    'Fuel Receipt',
    'Driver Log',
    'Lumper',
    'ACH',
    'Toll Receipt',
    'Permit Copy',
    'Check',
    'Citation'
  ];
  
  // New document types that don't exist in the load yet
  const newTypes = allDocumentTypes.filter(type => !existingTypes.includes(type));
  
  // Rejection reasons for submenu
  const rejectionReasons = ['Duplicate', 'Illegible', 'Other'];

  // Conditional visibility
  const showChangeDocumentType = documentGroup !== 'approved';
  const showMoveToLoadId = documentGroup !== 'approved';
  const showReject = documentGroup !== 'approved' && documentGroup !== 'rejected';

  // Handler functions
  const handleChangeDocumentType = (type: string) => {
    console.log('=== CONTEXT MENU: Change Document Type ===');
    console.log('Selected Type:', type);
    console.log('Document ID:', documentId);
    console.log('Document Name:', documentName);
    console.log('Calling onChangeDocumentType callback...');
    
    onChangeDocumentType?.(type);
    toast.success(`Changed document type to ${type}`);
    onClose();
  };

  const handleDownload = () => {
    onDownload?.();
    toast.success(`Downloading ${documentName}`);
    onClose();
  };

  const handleMoveToLoadId = (loadId: string) => {
    onMoveToLoadId?.(loadId);
    toast.success(`Moved document to Load ID ${loadId}`);
    onClose();
  };

  const handleReject = (reason: string) => {
    onReject?.(reason);
    toast.success(`Document rejected: ${reason}`);
    onClose();
  };

  // Smart positioning logic
  useEffect(() => {
    if (!isOpen || !menuRef.current) return;

    const menuWidth = 240;
    const menuHeight = menuRef.current.offsetHeight;
    const submenuWidth = 200;
    const viewportPadding = 8;

    let x = position.x + 8; // 8px to the right of icon by default
    let y = position.y;

    // Check if menu would overflow right edge
    if (x + menuWidth > window.innerWidth - viewportPadding) {
      x = position.x - menuWidth - 8; // 8px to the left instead
    }

    // Check if menu would overflow bottom edge
    if (y + menuHeight > window.innerHeight - viewportPadding) {
      y = window.innerHeight - menuHeight - viewportPadding;
    }

    // Check if menu would overflow top edge
    if (y < viewportPadding) {
      y = viewportPadding;
    }

    // Check if menu would overflow left edge
    if (x < viewportPadding) {
      x = viewportPadding;
    }

    setMenuPosition({ x, y });

    // Determine submenu position
    if (x + menuWidth + submenuWidth + 8 > window.innerWidth - viewportPadding) {
      setSubmenuPosition('left');
    } else {
      setSubmenuPosition('right');
    }
  }, [isOpen, position]);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  // Close on ESC key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Reset state when menu closes
  useEffect(() => {
    if (!isOpen) {
      setActiveSubmenu(null);
      setLoadIdSearch('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const menu = (
    <div
      ref={menuRef}
      className="fixed w-[240px] bg-white rounded-lg border border-[#E5E7EB] shadow-lg overflow-hidden"
      style={{
        left: `${menuPosition.x}px`,
        top: `${menuPosition.y}px`,
        zIndex: 99999,
        boxShadow: '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="py-1">
        {/* Change Document Type */}
        {showChangeDocumentType && (
          <div className="relative">
            <button
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors ${
                activeSubmenu === 'type' 
                  ? 'bg-[#F5F7FA] text-[#1A1F36]' 
                  : 'text-[#475467] hover:bg-[#F5F7FA] hover:text-[#1A1F36]'
              }`}
              onMouseEnter={() => setActiveSubmenu('type')}
              onClick={() => setActiveSubmenu(activeSubmenu === 'type' ? null : 'type')}
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Change Document Type</span>
            </button>

            {/* Change Document Type Submenu */}
            {activeSubmenu === 'type' && (
              <div
                className={`absolute top-0 w-[200px] bg-white rounded-lg border border-[#E5E7EB] shadow-lg overflow-hidden max-h-[320px] overflow-y-auto ${
                  submenuPosition === 'right' ? 'left-[248px]' : 'right-[248px]'
                }`}
                style={{
                  boxShadow: '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  zIndex: 100000,
                }}
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                <div className="py-1">
                  {/* Section Header: Existing Documents */}
                  <div className="px-3 py-1.5 bg-[#F9FAFB]">
                    <p className="text-[11px] font-medium text-[#64748B] uppercase tracking-wide">
                      Existing Documents
                    </p>
                  </div>
                  
                  {/* Existing Document Types */}
                  {existingTypes.map((type) => (
                    <button
                      key={type}
                      className="w-full text-left px-3 py-2 text-sm text-[#475467] hover:bg-[#F5F7FA] hover:text-[#1A1F36] transition-colors"
                      onClick={() => handleChangeDocumentType(type)}
                    >
                      {type}
                    </button>
                  ))}
                  
                  {/* Divider */}
                  {newTypes.length > 0 && (
                    <div className="my-1 border-t border-[#E5E7EB]" />
                  )}
                  
                  {/* Section Header: New Document */}
                  {newTypes.length > 0 && (
                    <div className="px-3 py-1.5 bg-[#F9FAFB] flex items-center gap-2">
                      <Plus className="h-3.5 w-3.5 text-[#64748B]" />
                      <p className="text-[11px] font-medium text-[#64748B] uppercase tracking-wide">
                        New Document
                      </p>
                    </div>
                  )}
                  
                  {/* New Document Types */}
                  {newTypes.map((type) => (
                    <button
                      key={type}
                      className="w-full text-left px-3 py-2 text-sm text-[#475467] hover:bg-[#F5F7FA] hover:text-[#1A1F36] transition-colors"
                      onClick={() => handleChangeDocumentType(type)}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Download Documents */}
        <button
          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[#475467] hover:bg-[#F5F7FA] hover:text-[#1A1F36] transition-colors"
          onClick={handleDownload}
        >
          <Download className="h-4 w-4 text-[#3B82F6]" />
          <span>Download Documents</span>
        </button>

        {/* Divider */}
        {showMoveToLoadId && (
          <div className="my-1 border-t border-[#E5E7EB]" />
        )}

        {/* Move Document to Load ID */}
        {showMoveToLoadId && (
          <div className="px-3 py-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Move Document to Load ID"
                value={loadIdSearch}
                onChange={(e) => setLoadIdSearch(e.target.value)}
                className="w-full h-9 px-3 text-sm text-[#1A1F36] placeholder:text-[#94A3B8] border border-[#3B82F6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-0 transition-shadow"
                onClick={(e) => e.stopPropagation()}
              />

              {/* Load ID Dropdown */}
              {loadIdSearch && filteredLoadIds.length > 0 && (
                <div 
                  className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E5E7EB] rounded-lg shadow-lg max-h-[128px] overflow-y-auto"
                  style={{ zIndex: 100001 }}
                >
                  <div className="py-1">
                    {filteredLoadIds.map((loadId) => (
                      <button
                        key={loadId}
                        className="w-full text-left px-3 py-2 text-sm text-[#475467] hover:bg-[#F5F7FA] hover:text-[#1A1F36] transition-colors"
                        onClick={() => handleMoveToLoadId(loadId)}
                      >
                        {loadId}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Divider */}
        {showReject && (
          <div className="my-1 border-t border-[#E5E7EB]" />
        )}

        {/* Reject */}
        {showReject && (
          <div className="relative">
            <button
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors ${
                activeSubmenu === 'reject' 
                  ? 'bg-[#FEF2F2] text-[#DC2626]' 
                  : 'text-[#DC2626] hover:bg-[#FEF2F2]'
              }`}
              onMouseEnter={() => setActiveSubmenu('reject')}
              onClick={() => setActiveSubmenu(activeSubmenu === 'reject' ? null : 'reject')}
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Reject</span>
            </button>

            {/* Reject Submenu */}
            {activeSubmenu === 'reject' && (
              <div
                className={`absolute bottom-0 w-[180px] bg-white rounded-lg border border-[#E5E7EB] shadow-lg overflow-hidden ${
                  submenuPosition === 'right' ? 'left-[248px]' : 'right-[248px]'
                }`}
                style={{
                  boxShadow: '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  zIndex: 100000,
                }}
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                <div className="py-1">
                  {rejectionReasons.map((reason) => (
                    <button
                      key={reason}
                      className="w-full text-left px-3 py-2 text-sm text-[#DC2626] hover:bg-[#FEF2F2] transition-colors"
                      onClick={() => handleReject(reason)}
                    >
                      {reason}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  // Use portal to render outside the overflow-hidden container
  return createPortal(menu, document.body);
}
