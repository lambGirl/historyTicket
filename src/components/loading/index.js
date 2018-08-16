import React from 'react'
import Styles from './index.less'
import classNames from 'classnames'

export  default  class Loading extends React.Component{

    render(){
        return <div className={classNames(Styles["loading"])}>
            <div className={classNames(Styles['loadingIcon'])}></div>
        </div>
    }
}
