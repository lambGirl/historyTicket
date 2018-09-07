import React from 'react'
import Styles from  './index.less'
import ClassNames from 'classnames'

export default class CardBox extends React.Component{
    render(){
        let { content, cardTitleIcon, cardTitle,cardCenterBottom,disabled ,CardBoxDefault} =  this.props;
        return <div className={Styles['card']}>
            <div className={ClassNames(Styles['card-Title'],{
                [Styles["borderBottom"]]:cardCenterBottom,
                [Styles["CardBoxDefault"]]: CardBoxDefault
            })}>
               {/* {cardTitleIcon&&<div className={Styles['card-title-leftIcon']}></div>}*/}
                <div className={ClassNames(Styles["name"],{
                    [Styles["border_left"]]:cardTitleIcon,
                    [Styles['disabled']]:disabled
                })}><span>{cardTitle}</span></div>
            </div>
            <div className={ClassNames(Styles['card-content'],{
                    [Styles["noPadding"]]:this.props.noPadding}
                )}>
                {content}
            </div>
        </div>
    }
}
