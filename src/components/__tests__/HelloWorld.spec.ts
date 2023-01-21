/**
 * @vitest-environment jsdom
 */

import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import CoinCheckVue from '../coin-check.vue'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(CoinCheckVue,{
      propsData: {
      coin:{
        name: "test",
        money: 1000,
        formated: "1,000"
    }}
  })
    expect(wrapper.text()).toContain('test1,000')
  })
})
