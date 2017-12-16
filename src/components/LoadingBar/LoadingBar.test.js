import React from 'react'
import LoadingBar from './LoadingBar'

describe('LoadingBar component', () => {
  let wrapper

  const props = {
    value: 0,
  }

  beforeEach(() => {
    wrapper = shallow(<LoadingBar {...props} />)
  })

  it('should set indicator styles according to the value prop', () => {
    expect(wrapper.find('.LoadingBar__indicator').props().style).toEqual({
      transform: `translateX(${-100 + 0 * 100}%)`,
    })
    wrapper.setProps({ value: 0.5 })
    expect(wrapper.find('.LoadingBar__indicator').props().style).toEqual({
      transform: `translateX(${-100 + 0.5 * 100}%)`,
    })
    wrapper.setProps({ value: 1 })
    expect(wrapper.find('.LoadingBar__indicator').props().style).toEqual({
      transform: `translateX(${-100 + 1 * 100}%)`,
    })
  })

  it('should match snapshot', () => {
    const tree = renderer.create(<LoadingBar />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
