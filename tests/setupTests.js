// before upgarding whatwg-url, do:
// https://stackoverflow.com/questions/57712235/referenceerror-textencoder-is-not-defined-when-running-react-scripts-test
import 'whatwg-url'
import 'whatwg-fetch'
import '@testing-library/jest-dom'
import indexedDB from 'fake-indexeddb'
import { server } from '../src/test-server'

global.isInJestTest = true

// we stub this guy at all spots
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// @ts-expect-error Headless UI Dialog randomly gets ReferenceError: IntersectionObserver is not defined
global.IntersectionObserver = class FakeIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// @ts-expect-error ResizeObserver is not defined
global.ResizeObserver = class FakeResizeObserver {
  observe() {}
  disconnect() {}
  unobserve() {}
}

//window.URL = URL
window.indexedDB = indexedDB
window.scroll = function () {}
window.scrollTo = function () {}
window.HTMLElement.prototype.scrollIntoView = function () {}
window.HTMLElement.prototype.setPointerCapture = function () {}

window.__stripeKey = 'FAKE STRIPE KEY'

process.env.DEBUG_PRINT_LIMIT = process.env.DEBUG_PRINT_LIMIT ?? '15'

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' })
})
afterAll(() => {
  server.close()
})
