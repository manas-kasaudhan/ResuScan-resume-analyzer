import { useState, useCallback } from 'react';

export interface Suggestion {
  id: string;
  category: 'content' | 'formatting' | 'keywords' | 'structure';
  text: string;
  priority: 'high' | 'medium' | 'low';
  original?: string;
  improved?: string;
}

export interface AnalysisResult {
  atsScore: number;
  improvedAtsScore: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: Suggestion[];
  keywords: {
    found: string[];
    missing: string[];
  };
  diffSections: {
    id: string;
    title: string;
    original: string;
    improved: string;
  }[];
}

export type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';
export type AnalysisStatus = 'idle' | 'analyzing' | 'complete' | 'error';
export type ImproveStatus = 'idle' | 'improving' | 'complete' | 'error';

// MOCK_ANALYSIS is no longer needed here as it comes from the server.
// function delay(ms: number) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

export function useResume() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle');
  const [analysisStatus, setAnalysisStatus] = useState<AnalysisStatus>('idle');
  const [improveStatus, setImproveStatus] = useState<ImproveStatus>('idle');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const uploadFile = useCallback(async (selectedFile: File) => {
    setErrorMessage(null);
    setUploadStatus('uploading');
    setFile(selectedFile);

    // Keep it fast on the frontend since it's just selecting the file.
    // We upload it to the backend when analyzeResume is called.
    setTimeout(() => {
      setUploadStatus('success');
    }, 500);
  }, []);

  const analyzeResume = useCallback(async () => {
    if (!file) return;
    setErrorMessage(null);
    setAnalysisStatus('analyzing');

    try {
      const formData = new FormData();
      formData.append('resume', file);

      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Server returned an error');
      }

      const data = await response.json();
      setAnalysisResult(data);
      setAnalysisStatus('complete');
    } catch (error) {
      setAnalysisStatus('error');
      setErrorMessage('Analysis failed. Please ensure the backend is running and try again.');
    }
  }, [file]);

  const improveResume = useCallback(async () => {
    setErrorMessage(null);
    setImproveStatus('improving');

    try {
      const response = await fetch('/api/improve', { method: 'POST' });
      if (!response.ok) throw new Error();
      setImproveStatus('complete');
    } catch {
      setImproveStatus('error');
      setErrorMessage('Improvement failed. Please try again.');
    }
  }, []);

  const reset = useCallback(() => {
    setFile(null);
    setUploadStatus('idle');
    setAnalysisStatus('idle');
    setImproveStatus('idle');
    setAnalysisResult(null);
    setErrorMessage(null);
  }, []);

  return {
    file,
    uploadStatus,
    analysisStatus,
    improveStatus,
    analysisResult,
    errorMessage,
    uploadFile,
    analyzeResume,
    improveResume,
    reset,
    setFile,
    setUploadStatus,
    setAnalysisStatus,
    setImproveStatus,
    setAnalysisResult,
    setErrorMessage,
  };
}

export type ResumeContextType = ReturnType<typeof useResume>;
