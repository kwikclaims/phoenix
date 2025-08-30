import React, { createContext, useContext, useState, ReactNode } from 'react';
import { FormData } from '../lib/formSchemas';

interface FormContextType {
  formData: FormData | null;
  signatureDataURL: string | null;
  setFormData: (data: FormData) => void;
  setSignatureDataURL: (dataURL: string) => void;
  clearFormData: () => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [signatureDataURL, setSignatureDataURL] = useState<string | null>(null);

  const clearFormData = () => {
    setFormData(null);
    setSignatureDataURL(null);
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        signatureDataURL,
        setFormData,
        setSignatureDataURL,
        clearFormData,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
}