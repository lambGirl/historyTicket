import React from 'react'
import Styles from './index.less'
import Scroll from '../scroll'
import ClassNames from 'classnames'

export default  class ScrollRefresh extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            items:["item1","item1", "item3", "item4"]
        }
    }

    onPullingUp() {
        // 更新数据
       // console.log('pulling up and load data');
        setTimeout(() => {
            if (this._isDestroyed) {
                return;
            }
            if (Math.random() > 0.5) {
                let temp = this.state.items;
                temp.push('这是新数据' + +new Date());
                // 如果有新数据
                this.setState({
                    items: temp
                });
            } else {
                // 如果没有新数据
                this.refs.scroll.forceUpdate();
            }
        }, 2000);
    }


    render(){
        let { needMore,currPage,  totalPage} =  this.props;
        let pullUpLoad = {
            threshold: 0,
            txt: {
                more: '加载中...',
                nomore: '没有更多了哦',
            },
        }
        return <div className={ClassNames(Styles['scroll-content'],Styles["defaultHeight"])}>
            <Scroll
                ref='scroll'
                class={Styles['wrapper']}
                pullUpLoad= { pullUpLoad }
                currPage={currPage}
                totalPage={totalPage}
                pullingUp = {this.onPullingUp.bind(this)}
                //data={this.state.items}
            >
                <div className={Styles['scroll-cotent-bottom']}>
                    {this.props.children}
                    {
                        this.state.items.map((item,index)=>{
                            return <div key={index}>{item}</div>
                        })
                    }
                </div>
            </Scroll>
        </div>
    }
};
