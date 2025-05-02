import React, { createContext, useState, useContext, ReactNode } from 'react';

// Mock data for law firms
const mockLawFirms = [
  { id: 'oakwood', name: 'Oakwood Law Firm', type: 'Corporate Law' },
  { id: 'johnson', name: 'Johnson & Partners', type: 'Family Law' },
  { id: 'legal-eagles', name: 'Legal Eagles LLC', type: 'Criminal Defense' },
  { id: 'smith', name: 'Smith & Associates', type: 'Intellectual Property' },
  { id: 'metro', name: 'Metro Legal Group', type: 'Real Estate Law' },
];

interface LawFirm {
  id: string;
  name: string;
  type: string;
}

interface FirmContextProps {
  selectedFirm: LawFirm | null;
  selectFirm: (firmId: string) => void;
  clearSelectedFirm: () => void;
  firms: LawFirm[];
  isFirmNavigationOpen: boolean;
  setFirmNavigationOpen: (open: boolean) => void;
}

const FirmContext = createContext<FirmContextProps | undefined>(undefined);

export const useFirm = () => {
  const context = useContext(FirmContext);
  if (!context) {
    throw new Error('useFirm must be used within a FirmProvider');
  }
  return context;
};

export const FirmProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedFirm, setSelectedFirm] = useState<LawFirm | null>(null);
  const [isFirmNavigationOpen, setFirmNavigationOpen] = useState(false);
  const [firms] = useState<LawFirm[]>(mockLawFirms);

  const selectFirm = (firmId: string) => {
    const firm = firms.find(f => f.id === firmId);
    if (firm) {
      setSelectedFirm(firm);
      setFirmNavigationOpen(true);
    }
  };

  const clearSelectedFirm = () => {
    setSelectedFirm(null);
    setFirmNavigationOpen(false);
  };

  return (
    <FirmContext.Provider 
      value={{ 
        selectedFirm, 
        selectFirm, 
        clearSelectedFirm, 
        firms,
        isFirmNavigationOpen,
        setFirmNavigationOpen
      }}
    >
      {children}
    </FirmContext.Provider>
  );
};