import React from 'react'
import App from './App'

import Drawer from '../Drawer'
import Header from '../Header'
import UploadForm from '../UploadForm'

describe('App component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<App />)
  })

  it('should not have data loaded by default', () => {
    expect(wrapper.state().isDataLoaded).toBe(false)
  })

  it('should render Header', () => {
    expect(wrapper.find(Header).length).toEqual(1)
  })

  it('should render UploadForm with correct props', () => {
    const uploadForm = wrapper.find(UploadForm)
    expect(uploadForm.length).toEqual(1)
    expect(typeof uploadForm.props().onLoad).toBe('function')
    uploadForm.props().onLoad()
    expect(wrapper.state().isDataLoaded).toBe(true)
  })

  it('should not render UploadForm if data is loaded', () => {
    wrapper.setState({ isDataLoaded: true })
    expect(wrapper.find(UploadForm).length).toEqual(0)
  })

  it('should render Drawer with correct props', () => {
    let drawer = wrapper.find(Drawer)
    expect(drawer.length).toEqual(1)
    expect(drawer.props().opened).toBe(false)
    expect(typeof drawer.props().onClear).toBe('function')
    wrapper.setState({ isDataLoaded: true })
    drawer = wrapper.find(Drawer)
    expect(drawer.props().opened).toBe(true)
    drawer.props().onClear()
    expect(wrapper.state().isDataLoaded).toBe(false)
  })

  it('should match snapshot', () => {
    const tree = renderer.create(<App />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
