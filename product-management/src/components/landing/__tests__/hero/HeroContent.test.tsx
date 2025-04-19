import { render, screen } from '@testing-library/react'
import { HeroContent } from '../../hero/HeroContent'
import { BrowserRouter } from 'react-router-dom'

describe('HeroContent', () => {
  it('renders heading with correct role and level', () => {
    render(
      <BrowserRouter>
        <HeroContent />
      </BrowserRouter>
    )
    
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('Manage Your Inventory Seamlessly')
  })

  it('renders CTA buttons', () => {
    render(
      <BrowserRouter>
        <HeroContent />
      </BrowserRouter>
    )
    
    expect(screen.getByText('Get Started')).toBeInTheDocument()
    expect(screen.getByText('Learn More')).toBeInTheDocument()
  })
})
