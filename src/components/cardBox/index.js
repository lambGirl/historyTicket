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
                {cardTitleIcon&&<div className={Styles['card-title-leftIcon']}></div>}
                <div style={{"verticalAlign":"middle"}}>{cardTitle}</div>
            </div>
            <div className={ClassNames(Styles['card-content'],{
                    [Styles["noPadding"]]:this.props.noPadding}
                )}>
                {content}
            </div>
        </div>
    }
}
