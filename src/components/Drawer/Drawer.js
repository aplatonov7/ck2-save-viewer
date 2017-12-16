import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import './Drawer.css'

const Drawer = ({ opened, onClear }) => (
  <aside className={cn('Drawer', { Drawer__opened: opened })}>
    <div className="Drawer__row">
      Data is loaded
      <button
        className="Drawer__delete-btn"
        title="Delete current data so you can upload another file"
        onClick={onClear}
      >
        Delete data
      </button>
    </div>
  </aside>
)

Drawer.propTypes = {
  opened: PropTypes.bool.isRequired,
  onClear: PropTypes.func.isRequired,
}

export default Drawer
