/**
 * Utility functions for PDF generation with image pre-loading
 */

export interface ImageLoadResult {
  src: string;
  loaded: boolean;
  error?: string;
}

/**
 * Pre-loads all images within a given element to ensure they're ready for PDF generation
 */
export const preloadImagesInElement = async (element: HTMLElement): Promise<ImageLoadResult[]> => {
  const images = element.querySelectorAll('img');
  const imagePromises: Promise<ImageLoadResult>[] = [];

  images.forEach((img) => {
    const promise = new Promise<ImageLoadResult>((resolve) => {
      // If image is already loaded
      if (img.complete && img.naturalHeight !== 0) {
        resolve({
          src: img.src,
          loaded: true
        });
        return;
      }

      // Create a new image to test loading
      const testImg = new Image();
      testImg.crossOrigin = 'anonymous'; // Handle CORS if needed
      
      testImg.onload = () => {
        resolve({
          src: img.src,
          loaded: true
        });
      };

      testImg.onerror = () => {
        resolve({
          src: img.src,
          loaded: false,
          error: 'Failed to load image'
        });
      };

      // Set a timeout to avoid hanging indefinitely
      setTimeout(() => {
        resolve({
          src: img.src,
          loaded: false,
          error: 'Image load timeout'
        });
      }, 10000); // 10 second timeout

      testImg.src = img.src;
    });

    imagePromises.push(promise);
  });

  return Promise.all(imagePromises);
};

/**
 * Generates PDF with image pre-loading
 */
export const generatePdfWithImagePreload = async (
  elementId: string,
  filename: string,
  options: any = {},
  onProgress?: (message: string) => void
): Promise<void> => {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element with ID '${elementId}' not found`);
  }

  // Step 1: Pre-load all images
  onProgress?.('Preparing images for PDF generation...');
  const imageResults = await preloadImagesInElement(element);
  
  // Log results
  const loadedImages = imageResults.filter(result => result.loaded);
  const failedImages = imageResults.filter(result => !result.loaded);
  
  console.log(`[PDF Generation] ${loadedImages.length} images loaded successfully`);
  if (failedImages.length > 0) {
    console.warn(`[PDF Generation] ${failedImages.length} images failed to load:`, failedImages);
  }

  // Step 2: Wait a brief moment for DOM to settle
  onProgress?.('Finalizing document layout...');
  await new Promise(resolve => setTimeout(resolve, 500));

  // Step 3: Generate PDF
  onProgress?.('Generating PDF...');
  
  const defaultOptions = {
    margin: [15, 15, 15, 15],
    filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 2, 
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false, // Reduce console noise
      imageTimeout: 15000, // 15 second timeout for images
      removeContainer: true
    },
    jsPDF: { 
      unit: 'mm', 
      format: 'letter', 
      orientation: 'portrait' 
    },
    pagebreak: { mode: ['css', 'legacy'] },
  };

  const finalOptions = { ...defaultOptions, ...options };

  // Import html2pdf dynamically to ensure it's available
  const html2pdf = (await import('html2pdf.js')).default;
  
  await html2pdf()
    .set(finalOptions)
    .from(element)
    .save();

  return;
};