/**
 * Utility functions for PDF generation with image pre-loading
 */
import jsPDF from 'jspdf';

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
 * Loads an image and converts it to base64 data URL
 */
const loadImageAsBase64 = async (imagePath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }
      
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      try {
        const dataURL = canvas.toDataURL('image/png');
        resolve(dataURL);
      } catch (error) {
        reject(error);
      }
    };
    
    img.onerror = () => {
      reject(new Error(`Failed to load image: ${imagePath}`));
    };
    
    img.src = imagePath;
  });
};

/**
 * Adds logo overlay to PDF after generation
 */
const addLogoOverlayToPdf = async (pdf: jsPDF, logoPath: string): Promise<void> => {
  try {
    const logoBase64 = await loadImageAsBase64(logoPath);
    
    // Get PDF dimensions
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    // Logo dimensions and position (centered at top)
    const logoWidth = 30; // mm
    const logoHeight = 20; // mm
    const logoX = (pageWidth - logoWidth) / 2;
    const logoY = 20; // 20mm from top
    
    // Add logo to first page
    pdf.addImage(logoBase64, 'PNG', logoX, logoY, logoWidth, logoHeight);
    
    console.log('[PDF Generation] Logo overlay added successfully');
  } catch (error) {
    console.warn('[PDF Generation] Failed to add logo overlay:', error);
    // Don't throw - continue with PDF generation without logo
  }
};

/**
 * Generates PDF with image pre-loading
 */
export const generatePdfWithImagePreloadAndLogo = async (
  elementId: string,
  filename: string,
  options: any = {},
  onProgress?: (message: string) => void,
  logoPath?: string
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
  
  // Step 4: Generate PDF and add logo overlay if provided
  if (logoPath) {
    onProgress?.('Adding logo overlay...');
    
    // Generate PDF as blob first
    const pdfBlob = await html2pdf()
      .set(finalOptions)
      .from(element)
      .outputPdf('blob');
    
    // Load the PDF into jsPDF for logo overlay
    const pdf = new jsPDF(finalOptions.jsPDF);
    
    // Convert blob to array buffer and load into jsPDF
    const arrayBuffer = await pdfBlob.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    
    // Create new PDF with original content
    const originalPdf = await html2pdf()
      .set(finalOptions)
      .from(element)
      .output('jspdf');
    
    // Add logo overlay
    await addLogoOverlayToPdf(originalPdf, logoPath);
    
    // Save the PDF with logo
    originalPdf.save(filename);
  } else {
    // Generate PDF normally without logo overlay
    await html2pdf()
      .set(finalOptions)
      .from(element)
      .save();
  }

  return;
};

// Keep the original function for backward compatibility
export const generatePdfWithImagePreload = generatePdfWithImagePreloadAndLogo;