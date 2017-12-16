import React from 'react'
import UploadForm from './UploadForm'

import LoadingBar from '../LoadingBar'

describe('UploadForm component', () => {
  let wrapper

  const props = {
    onLoad: jest.fn(),
  }

  beforeEach(() => {
    wrapper = shallow(<UploadForm {...props} />)
  })

  it('should have proper initial state', () => {
    expect(wrapper.state()).toEqual({ loading: false, filepath: null, progress: null })
  })

  it('should only render input with type=file when state.loading is false', () => {
    wrapper.setState({ loading: false })
    expect(wrapper.find('#saveInput').length).toEqual(1)
    wrapper.setState({ loading: true })
    expect(wrapper.find('#saveInput').length).toEqual(0)
  })

  it('should only render LoadingBar when state.loading is true', () => {
    wrapper.setState({ loading: false })
    expect(wrapper.find(LoadingBar).length).toEqual(0)
    wrapper.setState({ loading: true })
    expect(wrapper.find(LoadingBar).length).toEqual(1)
  })

  it('should match snapshot', () => {
    const tree = renderer.create(<UploadForm {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
