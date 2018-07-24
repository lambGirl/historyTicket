import React from 'react';
import withRouter from 'umi/withRouter';
import { connect } from 'dva';
import { TransitionGroup, CSSTransition } from "react-transition-group";
/*import { IntlProvider } from 'react-intl';*/

/*const app = ({globalAct,children,location})=>{
    return
}*/

class App extends React.Component{

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
           // console.log("我来过了", this.props.location, prevProps.location)
            window.scrollTo(0, 0);  //路由切换都初始化刚刚那个路由的顶部
        }
    }

    render(){
        let {globalAct, location, children} = this.props;
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
export default withRouter(connect(({globalAct})=>({globalAct}))(App));
