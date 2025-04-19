import { render, screen, fireEvent } from '@testing-library/react'
import { Navigation } from '../../navigation/Navigation'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'

describe('Navigation Component', () => {
  it('renders navigation items', () => {
    render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    )
    expect(screen.getByText('Features')).toBeInTheDocument()
  })

  it('handles scroll on anchor click', () => {
    // Create a mock element to query
    document.body.innerHTML = `
      <div id="features"></div>
    `
    
    render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    )

    const featuresButton = screen.getByText('Features')
    fireEvent.click(featuresButton)

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: expect.any(Number),
      behavior: 'smooth'
    })
  })
})
