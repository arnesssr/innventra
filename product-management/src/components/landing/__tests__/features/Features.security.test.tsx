import { render, screen } from '@testing-library/react'
import { Features } from '../../features/Features'
import { BrowserRouter } from 'react-router-dom'

describe('Features Security', () => {
  it('validates all data inputs', () => {
    render(
      <BrowserRouter>
        <Features />
      </BrowserRouter>
    )

    // Check for XSS in product names
    const productElements = screen.getAllByText(/Product Management|Analytics Overview|Sales Dashboard/i)
    productElements.forEach(element => {
      expect(element.textContent).not.toMatch(/<script>|javascript:/i)
    })

    // Check stats are properly sanitized
    const stats = screen.getAllByText(/\$\d+(\.\d+)?[kK]?/i)
    stats.forEach(stat => {
      expect(stat.textContent).toMatch(/^\$[\d,.]+[kK]?$/)
    })
  })
})
