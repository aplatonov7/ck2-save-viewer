import React from 'react'
import Drawer from './Drawer'

describe('Drawer component', () => {
  let wrapper

  const props = {
    opened: false,
    onClear: jest.fn(),
  }

  beforeEach(() => {
    wrapper = shallow(<Drawer {...props} />)
  })

  it('should render a button that triggers onClear prop', () => {
    const btn = wrapper.find('.Drawer__delete-btn')
    expect(btn.length).toBe(1)
    btn.simulate('click')
    expect(props.onClear.mock.calls.length).toBe(1)
  })

  it('should add Drawer__opened class to root element when opened prop is true', () => {
    expect(wrapper.hasClass('Drawer__opened')).toBe(false)
    wrapper.setProps({ opened: true })
    expect(wrapper.hasClass('Drawer__opened')).toBe(true)
  })

  it('should match snapshot', () => {
    const tree = renderer.create(<Drawer {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
