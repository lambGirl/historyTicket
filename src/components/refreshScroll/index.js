import React from 'react'
import Styles from './index.less'
import Scroll from '../scroll'
import ClassNames from 'classnames'

export default  class ScrollRefresh extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        let { needMore,currPage,  totalPage} =  this.props;
        return <div className={ClassNames(Styles['scroll-content'],Styles["defaultHeight"])}>
            <Scroll
                class={Styles['wrapper']}
                pullUpLoad={this.props.needMore&&{
                    threshold: 0,
                    txt: {
                        more: '加载中...',
                        nomore: '没有更多了哦',
                    },
                }||false}
                currPage={currPage}
                totalPage={totalPage}
                pullUpLoadMoreData={this.props.needMore&&this.props.loadMoreData||null}
            >
                <div className={Styles['scroll-cotent-bottom']}>
                    {this.props.children}
                </div>
            </Scroll>
        </div>
    }
};
