@@ .. @@
+export interface ImageCheckResult {
+  exists: boolean;
+  isValidImage: boolean;
+  contentType: string | null;
+  size: number | null;
+  error?: string;
+}
+
+// Check image health by attempting to fetch it
+export async function checkImageHealth(imagePath: string): Promise<ImageCheckResult> {
+  const result: ImageCheckResult = {
+    exists: false,
+    isValidImage: false,
+    contentType: null,
+    size: null,
+  };
+
+  try {
+    const imgSrc = toImgSrc(imagePath);
+    
+    // Try HEAD request first for efficiency
+    let response: Response;
+    try {
+      response = await fetch(imgSrc, { method: 'HEAD' });
+    } catch (headError) {
+      // Fallback to GET if HEAD fails
+      response = await fetch(imgSrc, { method: 'GET' });
+    }
+
+    result.exists = response.ok;
+    
+    if (response.ok) {
+      const contentType = response.headers.get('content-type');
+      const contentLength = response.headers.get('content-length');
+      
+      result.contentType = contentType;
+      result.size = contentLength ? parseInt(contentLength, 10) : null;
+      
+      // Check if it's a valid image based on content type and file extension
+      const hasImageContentType = contentType?.startsWith('image/') || false;
+      const hasImageExtension = isLikelyImageFile(imagePath);
+      
+      result.isValidImage = hasImageContentType && hasImageExtension;
+      
+      if (!result.isValidImage) {
+        result.error = `Invalid image: ${contentType || 'unknown content type'}`;
+      }
+    } else {
+      result.error = `HTTP ${response.status}: ${response.statusText}`;
+    }
+  } catch (error) {
+    result.error = error instanceof Error ? error.message : 'Network error';
+  }
+
+  return result;
+}
+
 // Default export (handy if the panel imports default)
 export default {
   normalizeToPublicPath,
   isLikelyImageFile,
   toImgSrc,
   explainValidation,
+  checkImageHealth,
 };