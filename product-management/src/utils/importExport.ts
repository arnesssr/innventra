/**
 * Global utility functions for importing and exporting data
 * Can be used across different features, not just products
 */

import { Product } from '../types/productTypes'

export const exportToCsv = (
  data: any[],
  headers: string[],
  filename: string
) => {
  const csvData = [
    headers.join(','),
    ...data.map(item => 
      headers.map(header => {
        const value = item[header.toLowerCase().replace(/\s+/g, '')]
        return typeof value === 'string' && value.includes(',') ? 
          `"${value}"` : value
      }).join(',')
    )
  ].join('\n')

  const blob = new Blob([csvData], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${filename}-${new Date().toISOString().split('T')[0]}.csv`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export const parseImportedCsv = async <T>(
  file: File, 
  typeValidators?: Record<string, (value: any) => any>
): Promise<Partial<T>[]> => {
  const text = await file.text()
  const rows = text.split('\n')
  const headers = rows[0].split(',')

  return rows.slice(1).map(row => {
    const values = row.split(',')
    return headers.reduce((obj, header, index) => {
      const key = header.toLowerCase().replace(/\s+/g, '')
      let value = values[index]
      
      // Apply type validation if provided
      if (typeValidators?.[key]) {
        value = typeValidators[key](value)
      }
      
      return { ...obj, [key]: value }
    }, {})
  })
}
