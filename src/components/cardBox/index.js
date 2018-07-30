import React from 'react'
import Styles from  './index.less'
import ClassNames from 'classnames'

export default class CardBox extends React.Component{
    render(){
        let { content, cardTitleIcon, cardTitle,cardCenterBottom,disabled } =  this.props;
        return <div className={Styles['card']}>
            <div className={ClassNames(Styles['card-Title'],{
                [Styles["borderBottom"]]:cardCenterBottom,
                [Styles['disabled']]:disabled
            })}>
                {cardTitleIcon&&<span className={Styles['card-title-leftIcon']}></span>}
                {cardTitle}
            </div>
            <div className={Styles['card-content']}>
                {content}
            </div>
        </div>
    }
}
