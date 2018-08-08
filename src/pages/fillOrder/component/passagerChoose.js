import React from 'react'
import ClassNames from 'classnames'
import Styles from '../index.less'
export default  class PassagerChoose extends React.Component{
    render(){
        return   <div className={ClassNames(Styles['passageList'], Styles["mgBottom20"])}>
            <div className={Styles["centerLine"]}></div>
            <div className={Styles['passageList-single']}>
                <div>
                    <div className={Styles['passage-name']}>王小米</div>
                    <div className={Styles['passage-detail']}>
                        <span>身份证: 500231******12</span>
                        <span>电话: 18008100961</span>
                    </div>
                </div>
                <div>
                    <i className={Styles['reduce-passage-Icon']}></i>
                </div>
            </div>
            <div className={Styles['passageList-single']}>
                <div>
                    <div className={Styles['passage-name']}>王小米</div>
                    <div className={Styles['passage-detail']}>
                        <span>身份证: 500231******12</span>
                        <span>电话: 18008100961</span>
                    </div>
                </div>
                <div>
                    <i className={Styles['reduce-passage-Icon']}></i>
                </div>
            </div>
            <div className={Styles['passageList-single']}>
                <div>
                    <div className={Styles['passage-name']}>王小米</div>
                    <div className={Styles['passage-detail']}>
                        <span>身份证: 500231******12</span>
                        <span>电话: 18008100961</span>
                    </div>
                </div>
                <div>
                    <i className={Styles['reduce-passage-Icon']}></i>
                </div>
            </div>
            <div className={Styles['passageList-single']}>
                <div>
                    <div className={Styles['passage-name']}>王小米</div>
                    <div className={Styles['passage-detail']}>
                        <span>身份证: 500231******12</span>
                        <span>电话: 18008100961</span>
                    </div>
                </div>
                <div>
                    <i className={Styles['reduce-passage-Icon']}></i>
                </div>
            </div>
        </div>
    }
}
