import Enzyme from 'enzyme'
import { configure } from '@testing-library/react'
import EnzymeAdapter from 'enzyme-adapter-react-16'
// Setup enzyme's react adapter
Enzyme.configure({ adapter: new EnzymeAdapter() })
configure({ testIdAttribute: 'data-test' })

  // Mock IntersectionObserver
  class IntersectionObserver {
    observe = jest.fn()

    unobserve = jest.fn()
  }

  Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: IntersectionObserver,
  })
  Object.defineProperty(global, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: IntersectionObserver,
  })

