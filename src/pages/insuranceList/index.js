import React from 'react'
import ClassNames from 'classnames'
import Styles from './index.less'
import Header from '../../components/header'
import Scroll from '../../components/scroll'

export default class InsuranceList extends React.Component{

    render(){
        return <div className={Styles['insuranceList-main']}>
            <Header
                mode="light"
                leftContent={ <i className="fa fa-angle-left fa-lg" style={{"color":"#3E3E3E"}}></i>}
                rightContent={<span className={ClassNames(Styles['font30'],Styles['color_3e'])}>确认</span>}
            >
                <div style={{"textAlign":'center','color':'#3E3E3E'}} >选择游园保障</div>
            </Header>
            <div className={ClassNames(Styles['scroll-content'],Styles["defaultHeight"])}>
                <Scroll class={Styles['wrapper']}>
                    <div className={Styles['scroll-cotent-bottom']}>
                        <div className={Styles['insurceList']}>
                            <div className={Styles['insurceList-single']}>
                                <div className={Styles['insurceList-single-content']}>
                                    <div>
                                        <div>
                                            <span>实惠型</span>
                                            <span>￥20元/份</span>
                                            <i className={Styles["insurceList-warning"]}></i>
                                        </div>
                                        <div>投保年龄: 1-70周岁，最高赔付10万</div>
                                    </div>
                                    <div>
                                        <i className={ClassNames(Styles['insurceList-warning'],{
                                            [Styles["active"]]:false,
                                            [Styles["default"]]:true
                                        })}></i>
                                    </div>
                                </div>
                                <div className={Styles['insurceList-single-content']}>
                                    <div>
                                        <div>
                                            <span>实惠型</span>
                                            <span>￥20元/份</span>
                                            <i className={Styles["insurceList-warning"]}></i>
                                        </div>
                                        <div>投保年龄: 1-70周岁，最高赔付10万</div>
                                    </div>
                                    <div>
                                        <i className={ClassNames(Styles['insurceList-warning'],{
                                            [Styles["active"]]:false,
                                            [Styles["default"]]:true
                                        })}></i>
                                    </div>
                                </div>
                                <div className={Styles['insurceList-single-content']}>
                                    <div>
                                        <div>
                                            <span>实惠型</span>
                                            <span>￥20元/份</span>
                                            <i className={Styles["insurceList-warning"]}></i>
                                        </div>
                                        <div>投保年龄: 1-70周岁，最高赔付10万</div>
                                    </div>
                                    <div>
                                        <i className={ClassNames(Styles['insurceList-warning'],{
                                            [Styles["active"]]:false,
                                            [Styles["default"]]:true
                                        })}></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Scroll>
            </div>
        </div>

    }
}
