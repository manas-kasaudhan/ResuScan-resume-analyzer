import { useNavigate } from 'react-router-dom';
import { useResumeContext } from '@/hooks/ResumeContext';
import UploadBox from '@/components/resume/UploadBox';
import ResumePreview from '@/components/resume/ResumePreview';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function Upload() {
  const navigate = useNavigate();
  const {
    file,
    uploadStatus,
    analysisStatus,
    uploadFile,
    analyzeResume,
    setFile,
    setUploadStatus,
  } = useResumeContext();

  const handleFileSelect = (selectedFile: File) => {
    uploadFile(selectedFile);
  };

  const handleRemove = () => {
    setFile(null);
    setUploadStatus('idle');
  };

  const handleAnalyze = async () => {
    await analyzeResume();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in-up">
          <h1
            className="text-3xl md:text-4xl font-bold text-dark mb-3"
            style={{ fontFamily: 'Poppins' }}
          >
            Upload Your Resume
          </h1>
          <p className="text-gray-500 max-w-md mx-auto">
            Drop your resume file here to get started with AI-powered analysis
            and optimization.
          </p>
        </div>

        {/* Upload area */}
        <div className="animate-fade-in-up stagger-1">
          <UploadBox
            onFileSelect={handleFileSelect}
            isUploading={uploadStatus === 'uploading'}
          />
        </div>

        {/* File preview */}
        {file && uploadStatus === 'success' && (
          <div className="mt-6 animate-fade-in-up stagger-2">
            <ResumePreview
              fileName={file.name}
              fileSize={file.size}
              fileType={file.type}
              onRemove={handleRemove}
            />
          </div>
        )}

        {/* Upload success + analyze */}
        {uploadStatus === 'success' && (
          <div className="mt-8 animate-fade-in-up stagger-3">
            <Card className="bg-gradient-to-r from-success-light to-green-50 border-green-100">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-dark">Upload Successful!</p>
                    <p className="text-xs text-gray-500">Ready for AI analysis</p>
                  </div>
                </div>
                <Button
                  onClick={handleAnalyze}
                  isLoading={analysisStatus === 'analyzing'}
                  variant="success"
                  size="sm"
                >
                  <svg className="mr-2 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  Analyze Resume
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Tips */}
        <div className="mt-10 animate-fade-in-up stagger-4">
          <Card>
            <h3
              className="text-sm font-semibold text-dark mb-4"
              style={{ fontFamily: 'Poppins' }}
            >
              Tips for Best Results
            </h3>
            <div className="space-y-3">
              {[
                'Use a standard resume format (chronological or functional)',
                'Include measurable achievements with numbers and metrics',
                'Tailor your resume to the target job description',
                'Use standard section headers (Experience, Education, Skills)',
                'Avoid tables, images, or complex formatting',
              ].map((tip, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-50 text-primary text-xs font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-sm text-gray-600">{tip}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
