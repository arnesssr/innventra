import { render, screen } from '@testing-library/react'
import { Logo } from '../Logo'

describe('Logo', () => {
  it('renders with default size', () => {
    render(<Logo />)
    const logoIcon = screen.getByTestId('logo-icon')
    expect(logoIcon).toHaveClass('w-8', 'h-8') // md size
  })

  it('renders with custom size', () => {
    render(<Logo size="lg" />)
    const logoIcon = screen.getByTestId('logo-icon')
    expect(logoIcon).toHaveClass('w-10', 'h-10')
  })
})
