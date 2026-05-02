import { Link } from 'react-router-dom';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const features = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    title: 'ATS Score Analysis',
    description:
      'Get a comprehensive ATS compatibility score with detailed breakdown of how your resume performs against industry standards.',
    color: 'text-primary bg-primary-50',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    ),
    title: 'Smart Suggestions',
    description:
      'AI-powered actionable recommendations to improve content, formatting, keywords, and overall resume structure.',
    color: 'text-info bg-info-light',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: 'Auto Improve',
    description:
      'One-click resume optimization that enhances your content with industry keywords, better phrasing, and ATS-friendly formatting.',
    color: 'text-warning bg-warning-light',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
    title: 'Download Ready',
    description:
      'Export your improved resume instantly in multiple formats, ready to submit to any job application or ATS platform.',
    color: 'text-success bg-success-light',
  },
];

const steps = [
  {
    number: '01',
    title: 'Upload Resume',
    description: 'Drag and drop your resume in PDF, DOC, or DOCX format.',
  },
  {
    number: '02',
    title: 'AI Analysis',
    description: 'Our AI scans your resume for ATS compatibility, keywords, and content quality.',
  },
  {
    number: '03',
    title: 'Get Hired',
    description: 'Download your optimized resume and land more interviews.',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-dark via-dark-light to-dark">
        {/* Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/10 mb-8 animate-fade-in-up">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm text-gray-300 font-medium">
                AI-Powered Resume Intelligence
              </span>
            </div>

            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6 animate-fade-in-up stagger-1"
              style={{ fontFamily: 'Poppins' }}
            >
              Land Your Dream Job with an{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">
                AI-Optimized
              </span>{' '}
              Resume
            </h1>

            <p className="text-lg md:text-xl text-gray-400 leading-relaxed mb-10 max-w-2xl mx-auto animate-fade-in-up stagger-2">
              ResuScan analyzes your resume against ATS systems, identifies
              weaknesses, and provides actionable improvements to boost your
              interview chances by up to 3×.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up stagger-3">
              <Link to="/upload">
                <Button size="lg" className="text-base">
                  Get Started Free
                  <svg className="ml-2 w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="outline" size="lg" className="text-base border-white/20 text-white hover:bg-white/10 hover:text-white">
                  See Demo Analysis
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 max-w-lg mx-auto animate-fade-in-up stagger-4">
              {[
                { value: '50K+', label: 'Resumes Analyzed' },
                { value: '89%', label: 'Interview Rate' },
                { value: '3×', label: 'More Callbacks' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white" style={{ fontFamily: 'Poppins' }}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 80h1440V40c-240 40-480-20-720 0s-480 40-720 0v40z"
              fill="#F8FAFC"
            />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-28 bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              Features
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold text-dark mt-3 mb-4"
              style={{ fontFamily: 'Poppins' }}
            >
              Everything You Need to Ace the ATS
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Our AI-powered platform provides comprehensive resume analysis and optimization tools trusted by thousands of job seekers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={feature.title}
                hover
                className={cn('animate-fade-in-up', `stagger-${index + 1}`)}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${feature.color}`}>
                  {feature.icon}
                </div>
                <h3
                  className="text-lg font-bold text-dark mb-2"
                  style={{ fontFamily: 'Poppins' }}
                >
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              How It Works
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold text-dark mt-3 mb-4"
              style={{ fontFamily: 'Poppins' }}
            >
              Three Simple Steps
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              From upload to interview-ready in under 2 minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`relative text-center animate-fade-in-up stagger-${index + 1}`}
              >
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-px bg-gradient-to-r from-primary/30 to-primary/5" />
                )}

                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary text-white text-2xl font-bold mb-6 shadow-lg shadow-primary/25" style={{ fontFamily: 'Poppins' }}>
                  {step.number}
                </div>
                <h3
                  className="text-xl font-bold text-dark mb-3"
                  style={{ fontFamily: 'Poppins' }}
                >
                  {step.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="bg-gradient-to-br from-dark to-dark-light border-0 !text-white" padding="lg">
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: 'Poppins' }}
            >
              Ready to Optimize Your Resume?
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Join 50,000+ professionals who have improved their resume and landed their dream jobs.
            </p>
            <Link to="/upload">
              <Button size="lg" className="text-base">
                Start Analyzing Now
                <svg className="ml-2 w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Button>
            </Link>
          </Card>
        </div>
      </section>
    </div>
  );
}

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ');
}
