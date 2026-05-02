import { HashRouter } from 'react-router-dom';
import { ResumeProvider } from '@/hooks/ResumeContext';
import AppRoutes from '@/routes/AppRoutes';

export default function App() {
  return (
    <HashRouter>
      <ResumeProvider>
        <AppRoutes />
      </ResumeProvider>
    </HashRouter>
  );
}
