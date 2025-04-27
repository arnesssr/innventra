export async function validateImage(file: File): Promise<boolean> {
  // Check MIME type
  if (!file.type.startsWith('image/')) {
    return false
  }

  // Check file size (5MB limit)
  if (file.size > 5 * 1024 * 1024) {
    return false
  }

  // Validate image contents
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = reader.result as string;
    };
    reader.onerror = () => resolve(false);
    reader.readAsDataURL(file);
  });
}

export function createSafeObjectURL(file: File): string | null {
  try {
    if (!file.type.startsWith('image/')) {
      return null
    }
    return URL.createObjectURL(file)
  } catch (error) {
    console.error('Error creating object URL:', error)
    return null
  }
}
