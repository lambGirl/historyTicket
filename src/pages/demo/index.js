import React, { Component } from 'react'
import Scroll from '../../components/demo/index'

import Styles from  './index.less'

const Data = []
let NEWDATAINDEX = 1
for (let i = 0; i < 10; i++) {
    Data.push(i)
}

class VerticalScrollPage extends Component {
    constructor (props, context) {
        super(props, context)
        this.state = {
            listData: Data,
            childData: 666,
            currPage:0,
            totalPage:10
        }
    }

    componentWillMount () {
        NEWDATAINDEX = 1
    }

    componentDidMount () {
    }

    loadMoreData = () => {
        // 更新数据
        return new Promise( resolve => {
            console.log('pulling up and load data')
            setTimeout(() => {
                if (Math.random() > 0) {
                    // 如果有新数据
                    let newPage = []
                    for (let i = 0; i < 2; i++) {
                        newPage.push(`我是新数据${NEWDATAINDEX++}`)
                    }
                    this.setState({
                        listData: [
                            ...this.state.listData,
                            ...newPage
                        ],
                    })
                }
                resolve()
            }, 1000)
        })
    }

    clickItem (item) {
        console.log('clickEvent', item)
    }

    render () {
        return (
            <div>
                <div className={Styles["container"]}>
                    <Scroll
                        needMore={true}
                        currPage={this.state.currPage}
                        totalPage={this.state.totalPage}
                        loadMoreData={this.loadMoreData.bind(this)}
                    >
                        <ul className={Styles["content"]}>
                            {this.state.listData.map((item, index) =>
                                (<li className= {Styles["content-item"]}
                                     key={index}
                                     onClick={this.clickItem.bind(this, item)}
                                >
                                    item:{item}
                                </li>),
                            )}
                        </ul>
                    </Scroll>
                </div>
            </div>
        )
    }
}

export default VerticalScrollPage
