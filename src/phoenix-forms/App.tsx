import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { FormProvider } from './contexts/FormContext';
import Home from './components/Home';
import FormPage from './components/FormPage';
import PreviewPage from './components/PreviewPage';
import './App.css';

interface AppProps {
  onNavigateToMainAppPage?: (page: string) => void;
}

function App({ onNavigateToMainAppPage }: AppProps) {
  return (
    <FormProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form/:type" element={<FormPage />} />
          <Route path="/preview/:type" element={<PreviewPage onNavigateToMainAppPage={onNavigateToMainAppPage} />} />
        </Routes>
    </FormProvider>
  );
}
export { App };

export default App