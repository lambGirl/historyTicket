import React from 'react';
import withRouter from 'umi/withRouter';
import { connect } from 'dva';
import createLoading from 'dva-loading';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import '@babel/polyfill';
import {baseUtil} from "../utils/util";

/*import { IntlProvider } from 'react-intl';*/

class App extends React.Component{

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
           // console.log("我来过了", this.props.location, prevProps.location)
            window.scrollTo(0, 0);  //路由切换都初始化刚刚那个路由的顶部
        }
    }
    componentDidMount(){
       // console.log("------------globalAct---------------", this.props.globalAct);
        /**
         * 处理定位
         */
       /* if(!baseUtil.getSession("locationPoint")){
            this.props.dispatch({
                type:'globalAct/getLocation'
            })
        }*/
        this.props.dispatch({
            type:'globalAct/getInit',
        });
    }

    render(){
        let {globalAct, location, children} = this.props;
        //console.log("定位结果",globalAct.point);
        return <div style={{height:"100%"}}>
               {/* <TransitionGroup>
                    <CSSTransition key={location.key}
                                   classNames="fade"
                                   transitionEnterTimeout={500}
                                   transitionLeaveTimeout={300}
                                   timeout={100}
                                   transitionAppear={true}
                                   transitionAppearTimeout={500}
                    >
                    { children }
                    </CSSTransition>
                </TransitionGroup>*/}
                { children }
            </div>
    }
}
export default withRouter(connect(({globalAct,loading})=>({globalAct,loading}))(App));
