import { createContext, useContext } from 'react';

interface LibraryContextType {
  showLibrary: boolean;
  setShowLibrary: (show: boolean) => void;
}

export const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error('useLibrary must be used within LibraryProvider');
  }
  return context;
};
