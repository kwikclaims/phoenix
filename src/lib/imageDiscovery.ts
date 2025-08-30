// Simple image cache for the debug panel
class ImageCache {
  private cache = new Map<string, boolean>();

  has(path: string): boolean {
    return this.cache.has(path);
  }

  get(path: string): boolean | undefined {
    return this.cache.get(path);
  }

  set(path: string, exists: boolean): void {
    this.cache.set(path, exists);
  }

  clearCache(): void {
    this.cache.clear();
  }

  getCacheStats() {
    return {
      size: this.cache.size,
      entries: Array.from(this.cache.entries())
    };
  }
}

export const imageCache = new ImageCache();