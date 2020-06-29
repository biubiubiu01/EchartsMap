import { mount } from '@vue/test-utils'
import home from "@/views/home"
import Vue from 'vue'

const wrapper = mount(home)

describe('home.vue', () => {
  const div = wrapper.find('#Home')

  it('值是否正常挂载', () => {
    expect(div.text()).toBe('hello Home')
  })
})