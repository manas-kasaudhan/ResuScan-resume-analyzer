import { createContext, useContext, type ReactNode } from 'react';
import {
  useResume,
  type ResumeContextType,
} from '@/hooks/useResume';

const ResumeContext = createContext<ResumeContextType | null>(null);

export function ResumeProvider({ children }: { children: ReactNode }) {
  const resumeState = useResume();
  return (
    <ResumeContext.Provider value={resumeState}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResumeContext(): ResumeContextType {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResumeContext must be used within a ResumeProvider');
  }
  return context;
}
