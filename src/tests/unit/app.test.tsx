import { render } from '@testing-library/react';
import App from '../../App';


describe('App', () => {
  it('renders headline', () => {
    // Wait 2 seconds for app to load
    setTimeout(() => {
      const wrapper = render(<App />)
      expect(wrapper).toBeTruthy()

      expect(wrapper).toBeTruthy()
      // Get by h1
      const h1 = wrapper.container.querySelector('h1')
      expect(h1?.textContent).toBe('Cost Ineffective Calculator')
    }, 2000)
    // check if App components renders headline
  });

  it('renders calculator', () => {
    // Wait 2 seconds for app to load
    setTimeout(() => {
      const wrapper = render(<App />)
      expect(wrapper).toBeTruthy()

      expect(wrapper).toBeTruthy()
      // Get by h1
      const calculator = wrapper.container.querySelector('.calculator')
      expect(calculator).toBeTruthy()
    }, 2000)
    // check if App components renders calculator
  });

  it('renders footer', () => {
    // Wait 2 seconds for app to load
    setTimeout(() => {
      const wrapper = render(<App />)
      expect(wrapper).toBeTruthy()

      expect(wrapper).toBeTruthy()
      // Get by h1
      const footer = wrapper.container.querySelector('footer')
      expect(footer).toBeTruthy()
    }, 2000)
    // check if App components renders footer
  });

  it('renders footer text', () => {
    // Wait 2 seconds for app to load
    setTimeout(() => {
      const wrapper = render(<App />)
      expect(wrapper).toBeTruthy()

      expect(wrapper).toBeTruthy()
      // Get by h1
      const footer = wrapper.container.querySelector('footer')
      expect(footer?.textContent).toBeTruthy()
    }, 2000)
    // check if App components renders footer text
  });

  it('renders calculator', () => {
    // Wait 2 seconds for app to load
    setTimeout(() => {
      const wrapper = render(<App />)
      expect(wrapper).toBeTruthy()

      expect(wrapper).toBeTruthy()
      // Get by h1
      const calculator = wrapper.container.querySelector('.calculator')
      expect(calculator).toBeTruthy()
    }, 2000)
    // check if App components renders calculator
  });
});