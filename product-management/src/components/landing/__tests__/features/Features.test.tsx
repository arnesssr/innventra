import { render, screen } from '@testing-library/react'
import { Features } from '../../features/Features'
import { BrowserRouter } from 'react-router-dom'

describe('Features Component', () => {
  it('shows correct flow steps', () => {
    render(
      <BrowserRouter>
        <Features />
      </BrowserRouter>
    )

    expect(screen.getByText('Create Store')).toBeInTheDocument()
    expect(screen.getByText('Upload Products')).toBeInTheDocument()
    expect(screen.getByText('Configure Settings')).toBeInTheDocument()
  })

  it('renders dashboard states', () => {
    render(
      <BrowserRouter>
        <Features />
      </BrowserRouter>
    )

    expect(screen.getByTestId('animate-presence')).toBeInTheDocument()
    // Use getAllByText instead of getByText since the text appears multiple times
    const productManagementElements = screen.getAllByText('Product Management')
    expect(productManagementElements.length).toBeGreaterThan(0)
  })
})
