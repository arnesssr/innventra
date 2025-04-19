export interface ImageWithPreview {
  file: File;
  previewUrl: string;
}

export class ImageHandler {
  static async createPreview(file: File): Promise<string> {
    return new Promise((resolve) => {
      const url = URL.createObjectURL(file)
      resolve(url)
    })
  }

  static revokePreview(url: string) {
    URL.revokeObjectURL(url)
  }

  static validateImage(file: File): boolean {
    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!validTypes.includes(file.type)) return false

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024 // 5MB in bytes
    if (file.size > maxSize) return false

    return true
  }
}
