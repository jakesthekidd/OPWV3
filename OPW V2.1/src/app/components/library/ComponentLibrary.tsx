import { X } from 'lucide-react';
import { useLibrary } from '../../context/LibraryContext';
import { useEffect } from 'react';

export default function ComponentLibrary() {
  const { setShowLibrary } = useLibrary();

  // ESC key to close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowLibrary(false);
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [setShowLibrary]);

  return (
    <div className="h-screen w-full bg-[#F7F8FA] flex flex-col overflow-hidden">
      {/* Figma-style Toolbar */}
      <div className="h-12 bg-white border-b border-[#E5E7EB] flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-3">
          <h1 className="text-sm font-semibold text-[#1A1F36]">Component Library</h1>
          <span className="text-xs text-[#64748B]">Document Processing System</span>
        </div>
        <button
          onClick={() => setShowLibrary(false)}
          className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-[#F5F7FA] transition-colors text-[#64748B] hover:text-[#1A1F36]"
          title="Close library (ESC)"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-60 bg-white border-r border-[#E5E7EB] overflow-y-auto shrink-0">
          <div className="p-4 space-y-1">
            <SidebarSection title="Design Tokens">
              <SidebarLink>Colors</SidebarLink>
              <SidebarLink>Typography</SidebarLink>
              <SidebarLink>Spacing</SidebarLink>
              <SidebarLink>Shadows</SidebarLink>
            </SidebarSection>

            <SidebarSection title="Components">
              <SidebarLink>Buttons</SidebarLink>
              <SidebarLink>Inputs</SidebarLink>
              <SidebarLink>Tables</SidebarLink>
              <SidebarLink>Cards</SidebarLink>
              <SidebarLink>Headers</SidebarLink>
              <SidebarLink>Tags</SidebarLink>
              <SidebarLink>Tabs</SidebarLink>
              <SidebarLink>Modals</SidebarLink>
            </SidebarSection>

            <SidebarSection title="Patterns">
              <SidebarLink>Validation Row</SidebarLink>
              <SidebarLink>Document Card</SidebarLink>
              <SidebarLink>Tab Interface</SidebarLink>
            </SidebarSection>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Welcome Section */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#E5E7EB]">
              <h2 className="text-2xl font-semibold text-[#1A1F36] mb-3">
                Welcome to the Component Library
              </h2>
              <p className="text-[#64748B] leading-relaxed mb-4">
                This is a living component library documenting every design element and state 
                in the Document Processing application. It's built to mirror Figma's design 
                system presentation with interactive, real components.
              </p>
              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-[#64748B]">All components live & interactive</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                  <span className="text-[#64748B]">Copy-paste code examples</span>
                </div>
              </div>
            </div>

            {/* Color Tokens Section */}
            <ComponentFrame title="Color Tokens" description="Brand and semantic color scales">
              <div className="space-y-6">
                {/* Primary Blue */}
                <div>
                  <div className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-3">
                    Primary Blue
                  </div>
                  <div className="grid grid-cols-10 gap-2">
                    {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => {
                      const colors = {
                        50: '#EFF6FF',
                        100: '#DBEAFE',
                        200: '#BFDBFE',
                        300: '#93C5FD',
                        400: '#60A5FA',
                        500: '#3B82F6',
                        600: '#2563EB',
                        700: '#1D4ED8',
                        800: '#1E40AF',
                        900: '#1E3A8A'
                      };
                      return (
                        <div key={shade} className="text-center">
                          <div 
                            className="h-16 rounded-lg mb-2 ring-1 ring-black/10"
                            style={{ backgroundColor: colors[shade as keyof typeof colors] }}
                          />
                          <div className="text-xs font-mono text-[#64748B]">{shade}</div>
                          <div className="text-[10px] font-mono text-[#94A3B8]">
                            {colors[shade as keyof typeof colors]}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Grays */}
                <div>
                  <div className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-3">
                    Neutral Gray
                  </div>
                  <div className="grid grid-cols-10 gap-2">
                    {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => {
                      const colors = {
                        50: '#F9FAFB',
                        100: '#F5F7FA',
                        200: '#E5E7EB',
                        300: '#D1D5DB',
                        400: '#9CA3AF',
                        500: '#6B7280',
                        600: '#475467',
                        700: '#374151',
                        800: '#1F2937',
                        900: '#111827'
                      };
                      return (
                        <div key={shade} className="text-center">
                          <div 
                            className="h-16 rounded-lg mb-2 ring-1 ring-black/10"
                            style={{ backgroundColor: colors[shade as keyof typeof colors] }}
                          />
                          <div className="text-xs font-mono text-[#64748B]">{shade}</div>
                          <div className="text-[10px] font-mono text-[#94A3B8]">
                            {colors[shade as keyof typeof colors]}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Semantic Colors */}
                <div>
                  <div className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-3">
                    Semantic Colors
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <SemanticColor name="Success" hex="#10B981" bg="#ECFDF5" />
                    <SemanticColor name="Error" hex="#EF4444" bg="#FEF2F2" />
                    <SemanticColor name="Warning" hex="#F59E0B" bg="#FEF3C7" />
                    <SemanticColor name="Info" hex="#3B82F6" bg="#EFF6FF" />
                  </div>
                </div>
              </div>
            </ComponentFrame>

            {/* More sections coming soon */}
            <div className="bg-white/50 rounded-2xl p-12 text-center border-2 border-dashed border-[#E5E7EB]">
              <div className="text-4xl mb-3">🚧</div>
              <h3 className="text-lg font-semibold text-[#1A1F36] mb-2">
                Component sections in progress
              </h3>
              <p className="text-sm text-[#64748B]">
                More component documentation coming soon: Buttons, Inputs, Tables, and more...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Utility Components
function SidebarSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <div className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-2 px-2">
        {title}
      </div>
      <div className="space-y-0.5">{children}</div>
    </div>
  );
}

function SidebarLink({ children }: { children: React.ReactNode }) {
  return (
    <button className="w-full text-left px-2 py-1.5 text-sm text-[#475467] hover:bg-[#F5F7FA] rounded-md transition-colors">
      {children}
    </button>
  );
}

function ComponentFrame({ title, description, children }: { 
  title: string; 
  description?: string; 
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] overflow-hidden">
      <div className="px-8 py-6 border-b border-[#E5E7EB]">
        <h3 className="text-lg font-semibold text-[#1A1F36] mb-1">{title}</h3>
        {description && (
          <p className="text-sm text-[#64748B]">{description}</p>
        )}
      </div>
      <div className="p-8">
        {children}
      </div>
    </div>
  );
}

function SemanticColor({ name, hex, bg }: { name: string; hex: string; bg: string }) {
  return (
    <div>
      <div className="h-24 rounded-lg mb-3 flex items-center justify-center ring-1 ring-black/5" style={{ backgroundColor: bg }}>
        <div className="h-10 w-10 rounded-full shadow-lg ring-2 ring-white" style={{ backgroundColor: hex }} />
      </div>
      <div className="text-sm font-medium text-[#1A1F36] mb-1">{name}</div>
      <div className="text-xs font-mono text-[#64748B]">{hex}</div>
      <div className="text-xs font-mono text-[#94A3B8]">BG: {bg}</div>
    </div>
  );
}