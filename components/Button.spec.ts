import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import Button from './Button.vue'

describe('Button', () => {
  it('renders slot content', async () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Click me!'
      }
    })
    expect(wrapper.text()).toBe('Click me!')
  })

  it('renders pending state', async () => {
    const wrapper = mount(Button, {
      props: {
        pending: true
      },
      attrs: {
        style: 'width: 100px'
      }
    })

    wrapper.vm.$nextTick(() => {
      const styles = getComputedStyle(wrapper.element)
      expect(styles.pointerEvents).toBe('none')
      expect(styles.opacity).toBe('0.5')
    })
  })

  it('emits click event', async () => {
    const wrapper = mount(Button)
    await wrapper.trigger('click')
    expect(wrapper.emitted().click).toBeTruthy()
  })

  it('truncates text when too long', async () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'This is a really long text that should be truncated'
      },
      attrs: {
        style: 'width: 50px'
      }
    })

    wrapper.vm.$nextTick(() => {
      expect(wrapper.text()).toContain('…')
    })
  })
})
