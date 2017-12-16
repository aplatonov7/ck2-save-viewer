import React from 'react'
import Header from './Header'

describe('Header component', () => {
  it('should match snapshot', () => {
    const tree = renderer.create(<Header />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
