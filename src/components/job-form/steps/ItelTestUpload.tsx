import React, { useRef } from 'react';
import { Upload, FileText, X } from 'lucide-react';

interface ItelTestUploadProps {
  itelTestFile?: {
    filename: string;
    url: string;
  };
  onChange: (file: { filename: string; url: string } | undefined) => void;
}

export const ItelTestUpload: React.FC<ItelTestUploadProps> = ({
  itelTestFile,
  onChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onload = (e) => {
        onChange({
          filename: file.name,
          url: e.target?.result as string,
        });
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a PDF file.');
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const removeFile = () => {
    onChange(undefined);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">ITEL Test Upload</h2>
      
      {!itelTestFile ? (
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Upload ITEL Test PDF
          </h3>
          <p className="text-gray-600 mb-4">
            Drag and drop your ITEL test PDF here, or click to select file
          </p>
          <p className="text-sm text-gray-500">
            Only PDF files are accepted
          </p>
          
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileInputChange}
            className="hidden"
          />
        </div>
      ) : (
        <div className="border border-gray-300 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="w-8 h-8 text-red-500" />
              <div>
                <p className="font-medium text-gray-900">{itelTestFile.filename}</p>
                <p className="text-sm text-gray-500">PDF Document</p>
              </div>
            </div>
            <button
              onClick={removeFile}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="mt-4 flex space-x-3">
            <a
              href={itelTestFile.url}
              download={itelTestFile.filename}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Download PDF
            </a>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Replace File
            </button>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileInputChange}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
};