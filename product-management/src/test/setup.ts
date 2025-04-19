import '@testing-library/jest-dom'
import { expect, afterEach, vi, beforeEach, beforeAll } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'
import { createElement } from 'react'

expect.extend(matchers)

// Mock Framer Motion
vi.mock('framer-motion', () => {
  const createComponent = (tag: string) => {
    return ({ children, ...props }: { children?: any }) => 
      createElement(tag, props, children)
  }

  return {
    motion: {
      nav: createComponent('nav'),
      div: createComponent('div'),
      span: createComponent('span'),
      h1: createComponent('h1'),
      p: createComponent('p')
    },
    AnimatePresence: ({ children, mode }: { children: any, mode?: string }) => 
      createElement('div', { 'data-testid': 'animate-presence', mode }, children),
    useScroll: () => ({
      scrollY: {
        get: () => 0,
        onChange: vi.fn(),
        current: 0
      }
    }),
    useMotionValueEvent: vi.fn(),
    useInView: () => true,
    animate: vi.fn()
  }
})

// Mock getBoundingClientRect and pageYOffset before tests
beforeAll(() => {
  Element.prototype.getBoundingClientRect = vi.fn(() => ({
    x: 0,
    y: 0,
    top: 100,
    left: 0,
    right: 0,
    bottom: 0,
    width: 0,
    height: 0,
    toJSON: () => ({}),
  } as DOMRect))
  
  Object.defineProperty(window, 'pageYOffset', {
    writable: true,
    value: 0
  })
})

// Set up window.scrollTo spy
beforeEach(() => {
  // Reset scrollTo mock before each test
  window.scrollTo = vi.fn()
  window.matchMedia = vi.fn().mockImplementation(() => ({
    matches: false,
    addListener: vi.fn(),
    removeListener: vi.fn()
  }))
})

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})
