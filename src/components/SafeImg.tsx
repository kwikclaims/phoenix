import React, { useEffect, useState } from 'react';

const base = (import.meta.env.BASE_URL ?? '/').replace(/\/+$/, '');
const FALLBACK = `${base}/images/_missing.png`;

interface SafeImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  srcPath: string;
}

export default function SafeImg({ srcPath, alt = '', onError, ...rest }: SafeImgProps) {
  const [src, setSrc] = useState(`${base}${srcPath.startsWith('/') ? '' : '/'}${srcPath}`);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const exactPath = `${base}${srcPath.startsWith('/') ? '' : '/'}${srcPath}`;
    setSrc(exactPath);
    setHasError(false);
    console.log(`[SafeImg] Loading exact path: ${exactPath}`);
  }, [srcPath]);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (!hasError) {
      console.warn(`[SafeImg] Failed to load image: ${src}`);
      console.warn(`[SafeImg] Falling back to: ${FALLBACK}`);
      setSrc(FALLBACK);
      setHasError(true);
    }
    if (onError) {
      onError(e);
    }
  };

  return (
    <img 
      {...rest} 
      alt={alt} 
      src={src} 
      onError={handleError}
      loading="lazy" 
      decoding="async" 
    />
  );
}