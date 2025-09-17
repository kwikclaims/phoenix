import { Routes, Route } from 'react-router-dom';
import { FormProvider } from './contexts/FormContext';
import Home from './components/Home';
import './App.css';

interface AppProps {
  onNavigateToMainAppPage?: (page: string) => void;
}

function App({ onNavigateToMainAppPage }: AppProps) {
  return (
    <FormProvider>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </FormProvider>
  );
}

export { App };

export default App;