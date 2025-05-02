/**
 * Date formatting utilities
 */

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(date)
}

export function getRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const formatter = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
  const diff = date.getTime() - Date.now()
  const diffInDays = Math.round(diff / (1000 * 60 * 60 * 24))
  
  if (Math.abs(diffInDays) < 1) {
    const diffInHours = Math.round(diff / (1000 * 60 * 60))
    return formatter.format(diffInHours, 'hour')
  }
  return formatter.format(diffInDays, 'day')
}