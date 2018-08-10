import React from  'react'
import Styles from './index.less'
import classnames from 'classnames'
import Scroll from '../scroll'

export default class LightTab extends React.Component {
    constructor(){
        super();
        this.state = {
            activeIndex:0,
        }
    }

    componentWillMount(){
        if (typeof this.props.activeIndex != "undefined"){
            this.setState({activeIndex:this.props.activeIndex})
        }
    }

    render(){
        var me = this,i = 0;
        let { defaultClass } =  this.props;

        return <div className={classnames(Styles["tabContent"],defaultClass)}>
            {this.renderHeader()}
            <div className={Styles["tabs"]}>
                {
                    me.renderTab(me.state.activeIndex)
                }
            </div>
        </div>
    }

    renderHeader(){
        var me = this;
        return <div className={Styles["buttons-tab"]}>
            {
                this.props.headers.map(function(item,index){
                  //  console.log("i", i,  me.state.activeIndex);
                    return <div  key={"light_tab"+index} onClick={me.headerClick.bind(me,index)}
                              className={classnames(Styles["tab-link"],{
                                  [Styles["active"]]: index == me.props.activeIndex
                              })}>
                        <span>{item}</span>
                    </div>
                })
            }
        </div>
    }

    renderTab(index){
        var me = this,active = index == this.props.activeIndex ? "tab active" : "tab";

        return  this.props.renderTab(index);


        return <div key={"light_tab_main" + index} className={active}>
          {/*  {me.props.renderTab(index)}*/}
            <div className={classnames(Styles['scroll-content'],Styles["defaultHeight"])}>
                <Scroll class={Styles['wrapper']}>
                    <div className={Styles['scroll-cotent-bottom']}>
                        <div>12123123123{index}</div>
                        <div>sdfserwer</div>
                        <div>sdfserwer</div>
                        <div>sdfserwer</div>
                        <div>sdfserwer</div>
                        <div>sdfserwer</div>
                        <div>sdfserwer</div>
                        <div>sdfserwer</div>
                        <div>sdfserwer</div>
                        <div>sdfserwer</div>
                        <div>sdfserwer</div>
                        <div>sdfserwer</div>
                        <div>sdfserwer</div>
                        <div>sdfserwer</div>
                        <div>sdfserwer</div>
                        <div>sdfserwer</div>
                        <div>sdfserwer</div>
                        <div>sdfserwer</div>
                        <div>sdfserwer</div>
                        <div>sdfserwer</div>
                        <div>sdfserwer</div>
                        <div>sdfserwer</div>
                        <div>sdfserwer</div>
                        <div>sdfserwer</div>
                        <div>sdfserwer</div>
                        <div>sdfserwer</div>
                        <div>sdfserwer</div>
                        <div>sdfserwer</div>
                        <div>sdfserwer</div>
                        <div>sdfserwer</div>
                        <div>sdfserwer</div>
                        <div>sdfserwer</div>
                        <div>111111111111111111111</div>
                        <div>111111111111111111111</div>
                        <div>111111111111111111111</div>
                        <div>111111111111111111111</div>
                    </div>
                </Scroll>
            </div>
        </div>
    }

    headerClick(index){
        this.props.changeTab(index)
       /* if (this.props.beforeTabJump){
            if (this.props.beforeTabJump(index)){
                this.setState({
                    activeIndex:index
                });
            }
        }
        else
            this.setState({
                activeIndex:index
            },()=>{

            });*/
    }
}
