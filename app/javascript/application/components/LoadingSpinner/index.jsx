import React from "react"
import PropTypes from "prop-types"
import classNames from 'classnames'

import styles from "./styles.scss"
import box from "./box.gif"

const LoadingSpinner = ({ fullPage, hidden, zIndex }) => {
  const applicableStyles = {}
  applicableStyles[styles.loading] = true
  applicableStyles[styles.full] = fullPage
  applicableStyles[styles.hidden] = hidden

  const backgroundStyles = {
    backgroundImage: "url(" + box + ")"
  }
  if (zIndex) {
    backgroundStyles.zIndex = zIndex
  }

  return <div className={classNames(applicableStyles)} style={backgroundStyles} />
}

LoadingSpinner.propsTypes = {
  hidden: PropTypes.bool,
  fullPage: PropTypes.bool,
  zIndex: PropTypes.number,
};

export default LoadingSpinner
