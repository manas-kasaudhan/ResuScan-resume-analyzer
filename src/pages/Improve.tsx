import { Link, useNavigate } from 'react-router-dom';
import { useResumeContext } from '@/hooks/ResumeContext';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import ProgressCircle from '@/components/ui/ProgressCircle';
import ComparisonView from '@/components/resume/ComparisonView';

export default function Improve() {
  const navigate = useNavigate();
  const { analysisResult, improveStatus, improveResume, analysisStatus } = useResumeContext();

  // If no analysis, show prompt
  if (analysisStatus === 'idle' || !analysisResult) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <Card className="max-w-md mx-4 text-center py-12 animate-fade-in-up">
          <div className="w-20 h-20 rounded-full bg-primary-50 flex items-center justify-center mx-auto mb-6">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FF7A59" strokeWidth="1.5" strokeLinecap="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-dark mb-2" style={{ fontFamily: 'Poppins' }}>
            No Resume to Improve
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Upload and analyze your resume first to access the improvement tool.
          </p>
          <Link to="/upload">
            <Button>Upload Resume</Button>
          </Link>
        </Card>
      </div>
    );
  }

  // Improving state
  if (improveStatus === 'improving') {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="w-24 h-24 mx-auto mb-8 relative">
            <div className="absolute inset-0 rounded-full border-4 border-gray-200" />
            <div className="absolute inset-0 rounded-full border-4 border-t-primary border-r-primary/30 border-b-primary/10 border-l-primary/5 animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FF7A59" strokeWidth="2" strokeLinecap="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>
          </div>
          <h2 className="text-xl font-bold text-dark mb-2" style={{ fontFamily: 'Poppins' }}>
            Optimizing Your Resume
          </h2>
          <p className="text-gray-500 text-sm max-w-xs mx-auto">
            Our AI is rewriting and optimizing your resume sections for maximum ATS compatibility...
          </p>
          <div className="mt-6 flex items-center justify-center gap-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-primary animate-pulse-soft"
                style={{ animationDelay: `${i * 0.3}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Not yet improved — show the improve button
  if (improveStatus === 'idle') {
    return (
      <div className="min-h-screen bg-bg">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="text-center animate-fade-in-up">
            <div className="w-20 h-20 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-6">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FF7A59" strokeWidth="1.5" strokeLinecap="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-dark mb-4" style={{ fontFamily: 'Poppins' }}>
              AI Resume Improvement
            </h1>
            <p className="text-gray-500 mb-10 max-w-md mx-auto">
              Our AI will rewrite and optimize your resume sections for maximum ATS compatibility and impact.
            </p>

            {/* Current score preview */}
            <Card className="inline-flex items-center gap-8 mb-10">
              <div className="text-center">
                <ProgressCircle value={analysisResult.atsScore} size={120} strokeWidth={10} />
                <p className="text-xs text-gray-500 mt-2 font-medium">Current Score</p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FF7A59" strokeWidth="2" strokeLinecap="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
                <span className="text-xs text-gray-400 font-medium">Improve</span>
              </div>
              <div className="text-center">
                <div className="w-[120px] h-[120px] rounded-full border-4 border-dashed border-gray-200 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-300" style={{ fontFamily: 'Poppins' }}>?</span>
                </div>
                <p className="text-xs text-gray-500 mt-2 font-medium">After</p>
              </div>
            </Card>

            <div className="block">
              <Button
                size="lg"
                onClick={() => {
                  improveResume();
                }}
              >
                <svg className="mr-2 w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
                Improve My Resume
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Improved state — show results
  const { atsScore, improvedAtsScore, diffSections } = analysisResult;

  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 animate-fade-in-up">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-dark" style={{ fontFamily: 'Poppins' }}>
              Resume Improvements
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              AI-optimized version of your resume is ready
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="success"
              onClick={() => alert('In production, this would download your improved resume as a PDF.')}
            >
              <svg className="mr-2 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download Improved
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                navigate('/upload');
              }}
            >
              Start Over
            </Button>
          </div>
        </div>

        {/* Score Comparison */}
        <Card className="mb-8 animate-fade-in-up stagger-1">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 py-6">
            {/* Before */}
            <div className="text-center">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Before
              </p>
              <ProgressCircle value={atsScore} size={140} strokeWidth={12} />
            </div>

            {/* Arrow */}
            <div className="flex flex-col items-center gap-2">
              <div className="hidden md:flex items-center gap-2">
                <div className="w-20 h-px bg-gray-200" />
                <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
                <div className="w-20 h-px bg-gray-200" />
              </div>
              <div className="md:hidden flex items-center">
                <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <polyline points="19 12 12 19 5 12" />
                  </svg>
                </div>
              </div>
              <div className="text-center">
                <span className="text-lg font-bold text-success" style={{ fontFamily: 'Poppins' }}>
                  +{improvedAtsScore - atsScore}%
                </span>
                <p className="text-[10px] text-gray-400">improvement</p>
              </div>
            </div>

            {/* After */}
            <div className="text-center">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                After
              </p>
              <ProgressCircle value={improvedAtsScore} size={140} strokeWidth={12} colorOverride="#22C55E" />
            </div>
          </div>
        </Card>

        {/* Section label */}
        <div className="mb-6 animate-fade-in-up stagger-2">
          <h2 className="text-xl font-bold text-dark" style={{ fontFamily: 'Poppins' }}>
            Detailed Comparison
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Review the AI-powered improvements section by section
          </p>
        </div>

        {/* Comparison View */}
        <ComparisonView sections={diffSections} />

        {/* Bottom Actions */}
        <div className="mt-10 text-center animate-fade-in-up stagger-4">
          <Card className="bg-gradient-to-r from-success-light to-green-50 border-green-100">
            <div className="py-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-dark">Your resume score improved by {improvedAtsScore - atsScore} points!</p>
                  <p className="text-xs text-gray-500">Download the optimized version to start applying</p>
                </div>
              </div>
              <Button
                variant="success"
                size="sm"
                onClick={() => alert('In production, this would download your improved resume as a PDF.')}
              >
                <svg className="mr-2 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download PDF
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
