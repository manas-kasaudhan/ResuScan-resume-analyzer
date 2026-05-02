import { Link, useNavigate } from 'react-router-dom';
import { useResumeContext } from '@/hooks/ResumeContext';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import ProgressCircle from '@/components/ui/ProgressCircle';
import Badge from '@/components/ui/Badge';
import SuggestionsList from '@/components/resume/SuggestionsList';

export default function Dashboard() {
  const navigate = useNavigate();
  const { analysisResult, analysisStatus, file, improveResume, improveStatus } = useResumeContext();

  // If no analysis, show a prompt to upload
  if (analysisStatus === 'idle' || !analysisResult) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <Card className="max-w-md mx-4 text-center py-12 animate-fade-in-up">
          <div className="w-20 h-20 rounded-full bg-primary-50 flex items-center justify-center mx-auto mb-6">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FF7A59" strokeWidth="1.5" strokeLinecap="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-dark mb-2" style={{ fontFamily: 'Poppins' }}>
            No Resume Analyzed Yet
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Upload your resume first to see the AI-powered analysis dashboard.
          </p>
          <Link to="/upload">
            <Button>Upload Resume</Button>
          </Link>
        </Card>
      </div>
    );
  }

  // Loading state
  if (analysisStatus === 'analyzing') {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="w-20 h-20 rounded-full border-4 border-gray-200 border-t-primary animate-spin mx-auto mb-6" />
          <h2 className="text-xl font-bold text-dark mb-2" style={{ fontFamily: 'Poppins' }}>
            Analyzing Your Resume
          </h2>
          <p className="text-gray-500 text-sm">
            Our AI is scanning your resume for ATS compatibility...
          </p>
        </div>
      </div>
    );
  }

  const { atsScore, strengths, weaknesses, suggestions, keywords } = analysisResult;

  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 animate-fade-in-up">
          <div>
            <h1
              className="text-2xl md:text-3xl font-bold text-dark"
              style={{ fontFamily: 'Poppins' }}
            >
              Analysis Dashboard
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {file ? `Results for ${file.name}` : 'Resume analysis results'}
              {' '} • {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
          <Button
            variant="primary"
            onClick={() => {
              improveResume();
              navigate('/improve');
            }}
            isLoading={improveStatus === 'improving'}
          >
            <svg className="mr-2 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            Improve My Resume
          </Button>
        </div>

        {/* Score + Summary Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* ATS Score */}
          <Card className="flex flex-col items-center justify-center py-8 animate-fade-in-up stagger-1">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">
              ATS Compatibility Score
            </h3>
            <ProgressCircle value={atsScore} size={180} strokeWidth={14} />
          </Card>

          {/* Strengths */}
          <Card className="animate-fade-in-up stagger-2">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-success-light flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-dark" style={{ fontFamily: 'Poppins' }}>
                Strengths
              </h3>
              <Badge variant="success" className="ml-auto">{strengths.length}</Badge>
            </div>
            <ul className="space-y-3">
              {strengths.map((strength, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-success/10 text-success text-[10px] font-bold flex items-center justify-center mt-0.5">
                    ✓
                  </span>
                  <span className="text-sm text-gray-700 leading-relaxed">{strength}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Weaknesses */}
          <Card className="animate-fade-in-up stagger-3">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-error-light flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-dark" style={{ fontFamily: 'Poppins' }}>
                Weaknesses
              </h3>
              <Badge variant="error" className="ml-auto">{weaknesses.length}</Badge>
            </div>
            <ul className="space-y-3">
              {weaknesses.map((weakness, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-error/10 text-error text-[10px] font-bold flex items-center justify-center mt-0.5">
                    !
                  </span>
                  <span className="text-sm text-gray-700 leading-relaxed">{weakness}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Keywords Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="animate-fade-in-up stagger-4">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-sm font-semibold text-dark" style={{ fontFamily: 'Poppins' }}>
                Keywords Found
              </h3>
              <Badge variant="success" dot>{keywords.found.length}</Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              {keywords.found.map((kw) => (
                <Badge key={kw} variant="success">{kw}</Badge>
              ))}
            </div>
          </Card>

          <Card className="animate-fade-in-up stagger-5">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-sm font-semibold text-dark" style={{ fontFamily: 'Poppins' }}>
                Missing Keywords
              </h3>
              <Badge variant="error" dot>{keywords.missing.length}</Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              {keywords.missing.map((kw) => (
                <Badge key={kw} variant="error">{kw}</Badge>
              ))}
            </div>
          </Card>
        </div>

        {/* Suggestions */}
        <div className="animate-fade-in-up stagger-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2
                className="text-xl font-bold text-dark"
                style={{ fontFamily: 'Poppins' }}
              >
                Improvement Suggestions
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {suggestions.length} actionable recommendations found
              </p>
            </div>
            <div className="flex items-center gap-2">
              {['high', 'medium', 'low'].map((p) => (
                <Badge
                  key={p}
                  variant={p === 'high' ? 'error' : p === 'medium' ? 'warning' : 'info'}
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </Badge>
              ))}
            </div>
          </div>
          <SuggestionsList suggestions={suggestions} />
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 text-center animate-fade-in-up">
          <Card className="bg-gradient-to-r from-primary-50 to-primary-100/50 border-primary-100">
            <div className="py-4">
              <h3 className="text-lg font-bold text-dark mb-2" style={{ fontFamily: 'Poppins' }}>
                Ready to improve your resume?
              </h3>
              <p className="text-sm text-gray-600 mb-5">
                Let our AI automatically optimize your resume based on these suggestions.
              </p>
              <Button
                onClick={() => {
                  improveResume();
                  navigate('/improve');
                }}
                isLoading={improveStatus === 'improving'}
              >
                <svg className="mr-2 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
                Auto-Improve Resume
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
