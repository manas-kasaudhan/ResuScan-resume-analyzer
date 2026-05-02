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

const MOCK_ANALYSIS: AnalysisResult = {
  atsScore: 58,
  improvedAtsScore: 92,
  strengths: [
    'Clear and professional contact information section',
    'Quantifiable achievements in previous work experience',
    'Consistent date formatting used throughout the document',
    'Strong action verbs used in most bullet points',
    'Well-organized education section with relevant details',
  ],
  weaknesses: [
    'Missing critical industry keywords for ATS optimization',
    'Professional summary is too generic and unfocused',
    'Skills section lacks technical specificity and modern tools',
    'No quantified metrics or outcomes in recent roles',
    'Inconsistent bullet point formatting across sections',
    'Missing certifications and relevant training section',
  ],
  suggestions: [
    {
      id: '1',
      category: 'keywords',
      text: 'Add missing high-impact keywords: Agile, Scrum, Stakeholder Management, Cross-functional Leadership, Data-Driven Decision Making',
      priority: 'high',
    },
    {
      id: '2',
      category: 'content',
      text: 'Replace generic summary with a targeted professional summary highlighting key qualifications and career objectives',
      priority: 'high',
      original: 'Experienced professional with a track record of success in various roles seeking new opportunities.',
      improved: 'Results-driven Senior Project Manager with 8+ years of experience leading cross-functional teams, delivering $2M+ projects on time, and driving operational efficiency improvements of up to 35%.',
    },
    {
      id: '3',
      category: 'content',
      text: 'Add quantified metrics to at least 3 bullet points in your work experience section',
      priority: 'high',
      original: 'Managed team projects and delivered results.',
      improved: 'Led a cross-functional team of 12 members, delivering 15+ projects on schedule with a 98% client satisfaction rate, contributing to $3.2M in annual revenue.',
    },
    {
      id: '4',
      category: 'formatting',
      text: 'Standardize bullet point format: use consistent verb tense (past for old roles, present for current)',
      priority: 'medium',
    },
    {
      id: '5',
      category: 'structure',
      text: 'Add a dedicated "Technical Skills" section with categorized subgroups (Programming, Tools, Methodologies)',
      priority: 'medium',
    },
    {
      id: '6',
      category: 'content',
      text: 'Include relevant certifications section - PMP, AWS, or industry-specific credentials',
      priority: 'medium',
      original: 'No certifications section present.',
      improved: 'Certifications: PMP® - Project Management Institute | AWS Certified Solutions Architect | Certified Scrum Master (CSM)',
    },
    {
      id: '7',
      category: 'keywords',
      text: 'Incorporate soft skill keywords that ATS systems scan for: Leadership, Communication, Problem-solving, Strategic Planning',
      priority: 'low',
    },
    {
      id: '8',
      category: 'formatting',
      text: 'Optimize section headers to match ATS-friendly standard names (e.g., "Work Experience" instead of "Career History")',
      priority: 'low',
    },
  ],
  keywords: {
    found: ['Leadership', 'Communication', 'Project Management', 'Team Building', 'Strategic Planning'],
    missing: ['Agile', 'Scrum', 'Stakeholder Management', 'Data Analysis', 'Cross-functional', 'ROI', 'KPI', 'Budget Management'],
  },
  diffSections: [
    {
      id: 's1',
      title: 'Professional Summary',
      original: 'Experienced professional with a track record of success in various roles seeking new opportunities to grow and contribute to organizational goals.',
      improved: 'Results-driven Senior Project Manager with 8+ years of experience leading cross-functional teams, delivering $2M+ projects on time and under budget. Proven expertise in Agile methodologies, stakeholder management, and data-driven decision making. Passionate about building high-performing teams and driving operational excellence.',
    },
    {
      id: 's2',
      title: 'Work Experience - Senior Project Manager',
      original: 'Managed team projects and delivered results. Coordinated with stakeholders and maintained project timelines. Led a team of developers.',
      improved: 'Led cross-functional team of 12 members across 3 departments, delivering 15+ enterprise projects ($2M+ budget) on schedule with 98% client satisfaction. Implemented Agile/Scrum methodologies, reducing project delivery time by 25%. Managed stakeholder communications and executive reporting for C-suite visibility.',
    },
    {
      id: 's3',
      title: 'Skills Section',
      original: 'Microsoft Office, Project Management, Communication, Teamwork, Problem Solving',
      improved: 'Project Management (Agile, Scrum, Waterfall) | Data Analysis & Visualization (SQL, Tableau, Power BI) | Stakeholder Management & Communication | Cross-functional Leadership | Budget & Resource Planning | Strategic Planning & Execution | Jira, Asana, Monday.com',
    },
    {
      id: 's4',
      title: 'Education Section Enhancement',
      original: 'Bachelor of Business Administration, State University, 2015',
      improved: 'Bachelor of Business Administration — State University (Magna Cum Laude, GPA: 3.8/4.0) | Graduated 2015 | Relevant Coursework: Strategic Management, Data Analytics, Organizational Leadership',
    },
  ],
};

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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

    try {
      await delay(1500);
      setUploadStatus('success');
    } catch {
      setUploadStatus('error');
      setErrorMessage('Failed to upload file. Please try again.');
    }
  }, []);

  const analyzeResume = useCallback(async () => {
    if (!file) return;
    setErrorMessage(null);
    setAnalysisStatus('analyzing');

    try {
      await delay(2500);
      setAnalysisResult(MOCK_ANALYSIS);
      setAnalysisStatus('complete');
    } catch {
      setAnalysisStatus('error');
      setErrorMessage('Analysis failed. Please try again.');
    }
  }, [file]);

  const improveResume = useCallback(async () => {
    setErrorMessage(null);
    setImproveStatus('improving');

    try {
      await delay(3000);
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
