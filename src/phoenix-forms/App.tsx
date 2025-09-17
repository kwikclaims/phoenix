import { Routes, Route } from 'react-router-dom';
import { FormProvider } from './contexts/FormContext';
import Home from './components/Home';
import { ArrowLeft } from 'lucide-react';
import './App.css';

interface AppProps {
  onNavigateToMainAppPage?: (page: string) => void;
}

function App({ onNavigateToMainAppPage }: AppProps) {
  const handleBackToPortal = () => {
    if (onNavigateToMainAppPage) {
      onNavigateToMainAppPage('portal');
    }
  };

  return (
    <div>
      {/* Back Button */}
      <button
        onClick={handleBackToPortal}
        className="flex items-center space-x-2 px-4 py-2 text-gray-400 hover:text-white transition-colors m-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Portal</span>
      </button>

    <FormProvider>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </FormProvider>
    </div>
  );
}

export { App };

export default App;