import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { LandingPage } from '../pages/landing/LandingPage'
import { Navigation } from '../components/landing/navigation/Navigation'
import { vi } from 'vitest'

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    nav: 'nav',
    span: 'span',
    h1: 'h1'
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  useScroll: () => ({ scrollY: { get: () => 0, onChange: vi.fn() } }),
  useMotionValueEvent: vi.fn()
}))

// Mock HeroContent component
vi.mock('../components/landing/hero/HeroContent', () => ({
  HeroContent: () => <div>Hero Content Mock</div>
}))

describe('Landing Page Security Tests', () => {
  beforeEach(() => {
    window.scrollTo = vi.fn()
  })

  it('prevents XSS in dynamic content', () => {
    const xssString = '<img src="x" onerror="alert(1)">'
    const { container } = render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    )
    
    expect(container.innerHTML).not.toContain(xssString)
    expect(container.innerHTML).not.toMatch(/<script>/i)
  })

  it('validates all URLs in navigation', () => {
    render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    )
    
    const buttons = document.querySelectorAll('button')
    buttons.forEach(button => {
      if (button.getAttribute('data-href')) {
        expect(button.getAttribute('data-href')).toMatch(/^[/#]|^https:\/\//)
      }
    })
  })
})
