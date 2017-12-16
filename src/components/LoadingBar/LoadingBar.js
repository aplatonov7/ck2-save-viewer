import React from 'react'
import PropTypes from 'prop-types'

import './LoadingBar.css'

const LoadingBar = ({ value }) => (
  <div className="LoadingBar__container">
    <div
      className="LoadingBar__indicator"
      style={{ transform: `translateX(${-100 + (value * 100)}%)` }}
    />
  </div>
)

LoadingBar.propTypes = {
  value: PropTypes.number,
}

LoadingBar.defaultProps = {
  value: 0,
}

export default LoadingBar
