import React, { useState, useEffect } from 'react';
import { Bug, Eye, RefreshCw, CheckCircle, XCircle } from 'lucide-react';

interface ImageDebugPanelProps {
  imagePaths: string[];
  title: string;
}

interface ImageStatus {
  path: string;
  exists: boolean;
  isValidImage: boolean;
  contentType: string | null;
  size: number | null;
  error?: string;
}

export const ImageDebugPanel: React.FC<ImageDebugPanelProps> = ({ imagePaths, title }) => {
  const [imageStatuses, setImageStatuses] = useState<ImageStatus[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const checkImageHealth = async (imagePath: string): Promise<ImageStatus> => {
    const result: ImageStatus = {
      path: imagePath,
      exists: false,
      isValidImage: false,
      contentType: null,
      size: null,
    };

    try {
      const base = (import.meta.env.BASE_URL ?? '/').replace(/\/+$/, '');
      const imgSrc = `${base}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
      
      // Try HEAD request first for efficiency
      let response: Response;
      try {
        response = await fetch(imgSrc, { method: 'HEAD' });
      } catch (headError) {
        // Fallback to GET if HEAD fails
        response = await fetch(imgSrc, { method: 'GET' });
      }

      result.exists = response.ok;
      
      if (response.ok) {
        const contentType = response.headers.get('content-type');
        const contentLength = response.headers.get('content-length');
        
        result.contentType = contentType;
        result.size = contentLength ? parseInt(contentLength, 10) : null;
        
        // Check if it's a valid image based on content type and file extension
        const hasImageContentType = contentType?.startsWith('image/') || false;
        const hasImageExtension = /\.(png|jpg|jpeg)$/i.test(imagePath);
        
        result.isValidImage = hasImageContentType && hasImageExtension;
        
        if (!result.isValidImage) {
          result.error = `Invalid image: ${contentType || 'unknown content type'}`;
        }
      } else {
        result.error = `HTTP ${response.status}: ${response.statusText}`;
      }
    } catch (error) {
      result.error = error instanceof Error ? error.message : 'Network error';
    }

    return result;
  };

  const checkAllImages = async () => {
    setIsChecking(true);
    const statuses: ImageStatus[] = [];

    for (const path of imagePaths) {
      const health = await checkImageHealth(path);
      statuses.push(health);
    }

    setImageStatuses(statuses);
    setIsChecking(false);
  };

  useEffect(() => {
    if (imagePaths.length > 0) {
      checkAllImages();
    }
  }, [imagePaths]);

  const validImages = imageStatuses.filter(s => s.isValidImage).length;
  const totalImages = imageStatuses.length;

  if (!isExpanded) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsExpanded(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-black/80 backdrop-blur-xl border border-[#FF0000]/20 text-white rounded-xl hover:bg-black/90 transition-all duration-300"
        >
          <Bug className="w-4 h-4 text-[#FF0000]" />
          <span className="text-sm">
            Images: {validImages}/{totalImages}
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 max-h-96 bg-black/90 backdrop-blur-xl border border-[#FF0000]/20 rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-[#FF0000]/20">
        <div className="flex items-center space-x-2">
          <Bug className="w-5 h-5 text-[#FF0000]" />
          <h3 className="text-white font-semibold">{title}</h3>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={checkAllImages}
            disabled={isChecking}
            className="p-1 text-[#FF0000] hover:text-white transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isChecking ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={() => setIsExpanded(false)}
            className="p-1 text-gray-400 hover:text-white transition-colors"
          >
            ×
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Summary */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-gray-900/50 rounded-lg p-3">
            <p className="text-gray-400">Valid Images</p>
            <p className="text-white font-bold">{validImages}/{totalImages}</p>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-3">
            <p className="text-gray-400">Total Paths</p>
            <p className="text-white font-bold">{totalImages}</p>
          </div>
        </div>

        {/* Image List */}
        <div className="max-h-48 overflow-y-auto space-y-2">
          {imageStatuses.map((status, index) => (
            <div
              key={index}
              className={`flex items-center space-x-3 p-2 rounded-lg ${
                status.isValidImage ? 'bg-green-900/20' : 'bg-red-900/20'
              }`}
            >
              {status.isValidImage ? (
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
              ) : (
                <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs truncate">{status.path.split('/').pop()}</p>
                {status.error && (
                  <p className="text-red-400 text-xs">{status.error}</p>
                )}
                {status.size && (
                  <p className="text-gray-400 text-xs">{Math.round(status.size / 1024)}KB</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <button
            onClick={checkAllImages}
            disabled={isChecking}
            className="flex-1 px-3 py-2 bg-gray-900/50 text-white rounded-lg hover:bg-gray-900/70 transition-colors text-sm"
          >
            Recheck All
          </button>
        </div>
      </div>
    </div>
  );
};