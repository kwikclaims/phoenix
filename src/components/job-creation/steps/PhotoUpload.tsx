import React, { useState, useRef } from 'react';
import { Upload, X, Eye, Trash2, Move, Camera, ChevronDown, ChevronRight } from 'lucide-react';
import { PhotoWithArrow } from '../../../types/Job';
import { generateId } from '../../../utils/storage';
import { uploadFile, deleteFile, generateFilePath, STORAGE_BUCKETS } from '../../../lib/supabase';

interface PhotoUploadProps {
  photos: PhotoWithArrow[];
  onChange: (photos: PhotoWithArrow[]) => void;
}

export const PhotoUpload: React.FC<PhotoUploadProps> = ({ photos, onChange }) => {
  const [activeSection, setActiveSection] = useState<'exterior' | 'interior'>('exterior');
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoWithArrow | null>(null);
  const [editingPhoto, setEditingPhoto] = useState<PhotoWithArrow | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const exteriorPhotos = photos.filter(photo => photo.category === 'exterior');
  const interiorPhotos = photos.filter(photo => photo.category === 'interior');

  const handleFileSelect = (files: FileList, category: 'exterior' | 'interior') => {
    const remainingSlots = 300 - photos.length;
    const filesToProcess = Array.from(files).slice(0, remainingSlots);

    // Process files one by one to avoid overwhelming the storage
    const processFiles = async () => {
      const newPhotos: PhotoWithArrow[] = [];
      
      for (const file of filesToProcess) {
        if (file.type.startsWith('image/')) {
          try {
            // Generate unique path for this photo
            const jobId = 'temp-' + Date.now(); // In real app, this would come from job context
            const storagePath = generateFilePath(jobId, file.name, category);
            
            // Upload to Supabase Storage
            const { url } = await uploadFile(file, STORAGE_BUCKETS.PHOTOS, storagePath);
            
            const photo: PhotoWithArrow = {
              id: generateId(),
              filename: file.name,
              url,
              storagePath,
              uploadedAt: new Date().toISOString(),
              size: file.size,
              category,
            };
            
            newPhotos.push(photo);
          } catch (error) {
            console.error('Failed to upload photo:', error);
            alert(`Failed to upload ${file.name}. Please try again.`);
          }
        }
      }
      
      if (newPhotos.length > 0) {
        onChange([...photos, ...newPhotos]);
      }
    };

    processFiles();
  };

  const handleDrop = (e: React.DragEvent, category: 'exterior' | 'interior') => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files, category);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files, activeSection);
    }
  };

  const removePhoto = async (photoId: string) => {
    const photoToRemove = photos.find(photo => photo.id === photoId);
    
    if (photoToRemove?.storagePath) {
      try {
        await deleteFile(STORAGE_BUCKETS.PHOTOS, photoToRemove.storagePath);
      } catch (error) {
        console.error('Failed to delete photo from storage:', error);
        // Continue with removal from state even if storage deletion fails
      }
    }
    
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

  const renderPhotoGrid = (sectionPhotos: PhotoWithArrow[]) => {
    if (sectionPhotos.length === 0) {
      return (
        <div className="text-center py-8">
          <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-400">No photos uploaded for this section</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {sectionPhotos.map((photo, index) => (
          <div
            key={photo.id}
            className="relative group bg-gray-900/50 rounded-xl overflow-hidden aspect-square border border-gray-700 hover:border-[#FF0000]/50 transition-all duration-300"
            style={{
              animationDelay: `${index * 50}ms`,
              animation: 'fadeInUp 0.5s ease-out forwards'
            }}
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
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  className="text-[#FF0000] drop-shadow-lg"
                  style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}
                >
                  <path
                    d="M10 30 L30 10 M30 10 L20 10 M30 10 L30 20"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </div>
            )}
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                <button
                  onClick={() => setSelectedPhoto(photo)}
                  className="p-2 bg-[#FF0000] rounded-full text-white hover:bg-[#FF0000]/80 transition-colors transform hover:scale-110"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setEditingPhoto(photo)}
                  className="p-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition-colors transform hover:scale-110"
                >
                  <Move className="w-4 h-4" />
                </button>
                <button
                  onClick={() => removePhoto(photo.id)}
                  className="p-2 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors transform hover:scale-110"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* File info */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white p-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-xs truncate">{photo.filename}</p>
              <p className="text-xs text-gray-300">{formatFileSize(photo.size)}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderUploadArea = (category: 'exterior' | 'interior') => (
    <div
      className="border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer border-gray-700 hover:border-[#FF0000]/50 bg-gray-900/30"
      onDrop={(e) => handleDrop(e, category)}
      onDragOver={handleDragOver}
      onClick={() => {
        setActiveSection(category);
        fileInputRef.current?.click();
      }}
    >
      <div className="w-16 h-16 bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <Upload className="w-8 h-8 text-[#FF0000]" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">
        Upload {category === 'exterior' ? 'Exterior' : 'Interior'} Photos
      </h3>
      <p className="text-gray-400 mb-4">
        Drag and drop your images here, or click to select files
      </p>
      <p className="text-sm text-[#FF0000] font-semibold">
        {category === 'exterior' ? exteriorPhotos.length : interiorPhotos.length} photos uploaded
      </p>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Camera className="w-8 h-8 text-[#FF0000]" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Photo Vault</h2>
        <p className="text-gray-400">Upload up to 300 photos with damage indicators</p>
        <p className="text-sm text-[#FF0000] font-semibold mt-2">
          {photos.length} / 300 total photos uploaded
        </p>
      </div>
      
      {/* Accordion/Tab Structure */}
      <div className="space-y-6">
        {/* Exterior Photos Section */}
        <div className="bg-black/60 backdrop-blur-xl rounded-2xl border border-[#FF0000]/20 overflow-hidden">
          <button
            onClick={() => setActiveSection(activeSection === 'exterior' ? 'interior' : 'exterior')}
            className="w-full flex items-center justify-between p-6 text-left hover:bg-[#FF0000]/5 transition-all duration-300"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🏠</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Exterior Photos</h3>
                <p className="text-gray-400 text-sm">{exteriorPhotos.length} photos uploaded</p>
              </div>
            </div>
            {activeSection === 'exterior' ? (
              <ChevronDown className="w-6 h-6 text-[#FF0000]" />
            ) : (
              <ChevronRight className="w-6 h-6 text-gray-400" />
            )}
          </button>
          
          {activeSection === 'exterior' && (
            <div className="p-6 border-t border-gray-700/50 space-y-6">
              {renderUploadArea('exterior')}
              {renderPhotoGrid(exteriorPhotos)}
            </div>
          )}
        </div>

        {/* Interior Photos Section */}
        <div className="bg-black/60 backdrop-blur-xl rounded-2xl border border-[#FF0000]/20 overflow-hidden">
          <button
            onClick={() => setActiveSection(activeSection === 'interior' ? 'exterior' : 'interior')}
            className="w-full flex items-center justify-between p-6 text-left hover:bg-[#FF0000]/5 transition-all duration-300"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🏡</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Interior Photos</h3>
                <p className="text-gray-400 text-sm">{interiorPhotos.length} photos uploaded</p>
              </div>
            </div>
            {activeSection === 'interior' ? (
              <ChevronDown className="w-6 h-6 text-[#FF0000]" />
            ) : (
              <ChevronRight className="w-6 h-6 text-gray-400" />
            )}
          </button>
          
          {activeSection === 'interior' && (
            <div className="p-6 border-t border-gray-700/50 space-y-6">
              {renderUploadArea('interior')}
              {renderPhotoGrid(interiorPhotos)}
            </div>
          )}
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* Photo Preview Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 p-3 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.filename}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            
            <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm text-white p-4 rounded-xl">
              <p className="font-semibold">{selectedPhoto.filename}</p>
              <p className="text-sm text-gray-300">
                {formatFileSize(selectedPhoto.size)} • {selectedPhoto.category} • Uploaded {new Date(selectedPhoto.uploadedAt).toLocaleDateString()}
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

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
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
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-black/80 backdrop-blur-xl rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-[#FF0000]/20">
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h3 className="text-xl font-semibold text-white">Edit Photo - Add Damage Arrow</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div
                className="relative border-2 border-gray-700 rounded-xl overflow-hidden cursor-crosshair hover:border-[#FF0000]/50 transition-colors"
                onClick={handleMouseClick}
              >
                <img
                  src={photo.url}
                  alt={photo.filename}
                  className="w-full h-auto max-h-96 object-contain"
                />
                
                {/* Vector Arrow */}
                <div
                  className="absolute pointer-events-none"
                  style={{
                    left: `${arrow.x}%`,
                    top: `${arrow.y}%`,
                    transform: `translate(-50%, -50%) rotate(${arrow.rotation}deg) scale(${arrow.scale})`,
                  }}
                >
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    className="text-[#FF0000] drop-shadow-lg"
                    style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}
                  >
                    <path
                      d="M10 30 L30 10 M30 10 L20 10 M30 10 L30 20"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-sm text-gray-400 mt-3 text-center">
                Click on the image to position the damage arrow
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#FF0000] mb-3">
                  Rotation: {arrow.rotation}°
                </label>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={arrow.rotation}
                  onChange={(e) => setArrow(prev => ({ ...prev, rotation: parseInt(e.target.value) }))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#FF0000] mb-3">
                  Size: {Math.round(arrow.scale * 100)}%
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="3"
                  step="0.1"
                  value={arrow.scale}
                  onChange={(e) => setArrow(prev => ({ ...prev, scale: parseFloat(e.target.value) }))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => onSave(arrow)}
                  className="w-full px-6 py-3 bg-gradient-to-r from-[#FF0000] to-[#C20F1F] text-white rounded-xl hover:shadow-lg hover:shadow-[#FF0000]/25 transition-all duration-300 font-semibold transform hover:scale-105"
                >
                  Save Arrow
                </button>
                <button
                  onClick={() => onSave(undefined)}
                  className="w-full px-6 py-3 bg-gray-900/50 border border-gray-700 text-white rounded-xl hover:border-red-500/50 hover:text-red-400 transition-all duration-300"
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