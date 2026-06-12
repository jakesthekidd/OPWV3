import { ReactNode } from 'react';

interface DocumentPanelContainerProps {
  children: ReactNode;
}

export default function DocumentPanelContainer({ 
  children
}: DocumentPanelContainerProps) {
  return (
    <div className="w-full">
      {children}
    </div>
  );
}
