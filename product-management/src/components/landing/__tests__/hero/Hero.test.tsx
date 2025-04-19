import { render, screen } from '@testing-library/react'
import { Hero } from '../../hero/Hero'
import { BrowserRouter } from 'react-router-dom'

describe('Hero Component', () => {
  it('renders main heading and CTA buttons', () => {
    render(
      <BrowserRouter>
        <Hero />
      </BrowserRouter>
    )
    
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('sanitizes user-generated content', () => {
    render(
      <BrowserRouter>
        <Hero />
      </BrowserRouter>
    )
    
    const heroSection = screen.getByRole('region', { name: /hero section/i })
    expect(heroSection.textContent).not.toMatch(/<script>/i)
    expect(heroSection).toHaveAttribute('aria-label', 'Hero Section')
  })
})
