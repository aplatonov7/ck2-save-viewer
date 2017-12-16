import React, { Component } from 'react'
import cn from 'classnames'

import Drawer from '../Drawer'
import Header from '../Header'
import UploadForm from '../UploadForm'

import './App.css'

class App extends Component {
  constructor(...props) {
    super(...props)

    this.state = {
      isDataLoaded: false,
    }
  }

  onDataLoad = () => {
    this.setState(() => ({ isDataLoaded: true }))
  }

  onDataClear = () => {
    this.setState(() => ({ isDataLoaded: false }))
  }

  render() {
    const { isDataLoaded } = this.state

    return (
      <div className={cn('App', { 'App__data-loaded': isDataLoaded })}>
        <Header />
        <main className="App__container">
          <Drawer opened={isDataLoaded} onClear={this.onDataClear} />
          {isDataLoaded ? <div>Data is loaded</div> : <UploadForm onLoad={this.onDataLoad} />}
        </main>
      </div>
    )
  }
}

export default App
