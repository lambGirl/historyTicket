import React, { Component } from 'react'
import Styles from './loading.css'
class Loading extends Component {

  render () {
    return (
      <div className={Styles["loading-container"]}>
        <img src="./loading.gif" alt="loading" />
      </div>
    )
  }
}

export default Loading
