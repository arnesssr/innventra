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
    const img = new Image()
    const objectUrl = URL.createObjectURL(file)

    img.onload = () => {
      URL.revokeObjectURL(objectUrl)
      resolve(true)
    }

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl)
      resolve(false)
    }

    img.src = objectUrl
  })
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
