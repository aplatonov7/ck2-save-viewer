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
      dataLoaded: true,
    }
  }

  onDataLoaded = () => {
    this.setState(() => ({ dataLoaded: true }))
  }

  clearData = () => {
    this.setState(() => ({ dataLoaded: false }))
  }

  render() {
    const { dataLoaded } = this.state

    return (
      <div className={cn('App', { 'App__data-loaded': dataLoaded })}>
        <Header />
        <main className="App__container">
          <Drawer opened={dataLoaded} clearData={this.clearData} />
          {dataLoaded ? (
            <div>Data is loaded</div>
          ) : (
            <UploadForm onLoad={this.onDataLoaded} />
          )}
        </main>
      </div>
    )
  }
}

export default App
