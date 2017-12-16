import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import LoadingBar from '../LoadingBar'
import dataManager from '../../dataManager'

import './UploadForm.css'

class UploadForm extends Component {
  constructor(...props) {
    super(...props)

    this.state = {
      loading: false,
      progress: null,
      filepath: null,
    }
  }

  onProgress = progress => this.setState({ progress })

  readFile = e => {
    const file = e.target.files[0]
    if (!file) return

    const filepath = e.target.value.split('\\').slice(-1)
    this.setState(() => ({ loading: true, filepath }))

    const reader = new FileReader()
    reader.onload = this.handleLoad
    reader.readAsText(file)
  }

  handleLoad = e => {
    const content = e.target.result
    dataManager.loadData(content, this.onProgress).then(() => {
      this.setState(() => ({ loading: false, progress: null, filepath: null }))
      if (this.props.onLoad) this.props.onLoad()
    })
  }

  render() {
    const { loading, progress, filepath } = this.state
    return (
      <div className={cn('UploadForm__container', { 'UploadForm__container-loading': loading })}>
        {this.state.loading ? (
          [
            <div key="1" className="UploadForm__caption">
              Uploading and parsing {filepath}
            </div>,
            <small key="2" className="UploadForm__sub-caption">
              This might take quite a while (-_-) zzz
            </small>,
            <LoadingBar key="3" value={progress} />,
          ]
        ) : (
          <label className="UploadForm__label" htmlFor="saveInput">
            Click to upload your save file
            <input
              className="UploadForm__input"
              id="saveInput"
              type="file"
              onChange={this.readFile}
            />
          </label>
        )}
      </div>
    )
  }
}

UploadForm.propTypes = {
  onLoad: PropTypes.func.isRequired,
}

export default UploadForm
