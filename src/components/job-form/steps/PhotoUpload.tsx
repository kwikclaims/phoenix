import React, { useState, useRef } from 'react';
import { Upload, X, Eye, Trash2, RotateCw, Move, ZoomIn, ZoomOut } from 'lucide-react';
import { PhotoWithArrow } from '../../../types/Job';
import { generateId } from '../../../utils/storage';

interface PhotoUploadProps {
  photos: PhotoWithArrow[];
  onChange: (photos: PhotoWithArrow[]) => void;
}

export const PhotoUpload: React.FC<PhotoUploadProps> = ({ photos, onChange }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoWithArrow | null>(null);
  const [editingPhoto, setEditingPhoto] = useState<PhotoWithArrow | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (files: FileList) => {
    const remainingSlots = 300 - photos.length;
    const filesToProcess = Array.from(files).slice(0, remainingSlots);

    const newPhotos: PhotoWithArrow[] = [];

    filesToProcess.forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const photo: PhotoWithArrow = {
            id: generateId(),
            filename: file.name,
            url: e.target?.result as string,
            uploadedAt: new Date().toISOString(),
            size: file.size,
          };
          newPhotos.push(photo);
          
          if (newPhotos.length === filesToProcess.length) {
            onChange([...photos, ...newPhotos]);
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files);
    }
  };

  const removePhoto = (photoId: string) => {
    onChange(photos.filter(photo => photo.id !== photoId));
  };

  const updatePhotoArrow = (photoId: string, arrow: PhotoWithArrow['arrow']) => {
    onChange(photos.map(photo => 
      photo.id === photoId ? { ...photo, arrow } : photo
    ));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Photo Upload</h2>
      
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
          isDragging
            ? 'border-blue-400 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Upload Photos
        </h3>
        <p className="text-gray-600 mb-4">
          Drag and drop your images here, or click to select files
        </p>
        <p className="text-sm text-gray-500">
          {photos.length} / 300 photos uploaded
        </p>
        
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
        />
      </div>

      {/* Photos Grid */}
      {photos.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="relative group bg-gray-100 rounded-lg overflow-hidden aspect-square"
            >
              <img
                src={photo.url}
                alt={photo.filename}
                className="w-full h-full object-cover"
              />
              
              {/* Arrow Overlay */}
              {photo.arrow && (
                <div
                  className="absolute pointer-events-none"
                  style={{
                    left: `${photo.arrow.x}%`,
                    top: `${photo.arrow.y}%`,
                    transform: `translate(-50%, -50%) rotate(${photo.arrow.rotation}deg) scale(${photo.arrow.scale})`,
                  }}
                >
                  <div className="w-8 h-8 text-red-500">
                    ↗
                  </div>
                </div>
              )}
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
                  <button
                    onClick={() => setSelectedPhoto(photo)}
                    className="p-2 bg-white rounded-full text-gray-800 hover:bg-gray-100 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setEditingPhoto(photo)}
                    className="p-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition-colors"
                  >
                    <Move className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => removePhoto(photo.id)}
                    className="p-2 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* File info */}
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-200">
                <p className="text-xs truncate">{photo.filename}</p>
                <p className="text-xs text-gray-300">{formatFileSize(photo.size)}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Photo Preview Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full text-gray-800 hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.filename}
              className="max-w-full max-h-full object-contain"
            />
            
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 text-white p-3 rounded-lg">
              <p className="font-medium">{selectedPhoto.filename}</p>
              <p className="text-sm text-gray-300">
                {formatFileSize(selectedPhoto.size)} • Uploaded {new Date(selectedPhoto.uploadedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Photo Editor Modal */}
      {editingPhoto && (
        <PhotoEditor
          photo={editingPhoto}
          onSave={(arrow) => {
            updatePhotoArrow(editingPhoto.id, arrow);
            setEditingPhoto(null);
          }}
          onClose={() => setEditingPhoto(null)}
        />
      )}
    </div>
  );
};

interface PhotoEditorProps {
  photo: PhotoWithArrow;
  onSave: (arrow: PhotoWithArrow['arrow']) => void;
  onClose: () => void;
}

const PhotoEditor: React.FC<PhotoEditorProps> = ({ photo, onSave, onClose }) => {
  const [arrow, setArrow] = useState(photo.arrow || { x: 50, y: 50, rotation: 0, scale: 1 });

  const handleMouseClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setArrow(prev => ({ ...prev, x, y }));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">Edit Photo - Add Arrow</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div
                className="relative border border-gray-300 rounded-lg overflow-hidden cursor-crosshair"
                onClick={handleMouseClick}
              >
                <img
                  src={photo.url}
                  alt={photo.filename}
                  className="w-full h-auto max-h-96 object-contain"
                />
                
                {/* Arrow */}
                <div
                  className="absolute pointer-events-none text-red-500 text-2xl font-bold"
                  style={{
                    left: `${arrow.x}%`,
                    top: `${arrow.y}%`,
                    transform: `translate(-50%, -50%) rotate(${arrow.rotation}deg) scale(${arrow.scale})`,
                  }}
                >
                  ↗
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Click on the image to position the arrow
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rotation: {arrow.rotation}°
                </label>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={arrow.rotation}
                  onChange={(e) => setArrow(prev => ({ ...prev, rotation: parseInt(e.target.value) }))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Size: {Math.round(arrow.scale * 100)}%
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="3"
                  step="0.1"
                  value={arrow.scale}
                  onChange={(e) => setArrow(prev => ({ ...prev, scale: parseFloat(e.target.value) }))}
                  className="w-full"
                />
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => onSave(arrow)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save Arrow
                </button>
                <button
                  onClick={() => onSave(undefined)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Remove Arrow
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};