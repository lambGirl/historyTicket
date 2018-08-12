import React from  'react';
import classNames from 'classnames';
import Styles from './index.less'
import Scroll from "../../components/demo/index"
import {connect} from 'dva'
import AttractionSingle from '../../components/indexAttractionSingle';

@connect(({searchTicketList,loading})=>({
    searchTicketList,
    searchListState: loading.effects['searchTicketList/fetch']
}))
export default class SearchTicketList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            searchVal:'',
        }
    }

    loadMoreData(){

    }
    getSearchVal(e){

      /*  this.setState({
            "searchVal": e.target.value
        });*/
     //   return;
        //当只存在的时候
        if(e.target.value){
            this.props.dispatch({
                type:'searchTicketList/fetch',
                payload:{
                    type:false, //默认赋值
                    postData:{
                        pageNum: 1,
                        key:  e.target.value
                    }
                }
            })
            this.setState({
                "searchVal": e.target.value
            });
            return;
        }
        // console.log("222222222", e.target.value);

        this.props.dispatch({
            type:'searchTicketList/fetch',
            payload:{
                type:false, //默认赋值
                postData:{
                    pageNum: 1,
                    key:  e.target.value,

                },
                defaultData:true
            }
        });

        this.setState({
            "searchVal": e.target.value
        });
    }

    chooseTicket(){

    }

    render(){
        let { ticketList, currPage, totalPage } =  this.props.searchTicketList;
       //console.log("ticketList",ticketList);
        return <div className={Styles["searchTicketList"]}>
           <div className={Styles['searchHeader']}>
               <div className={Styles["search-left"]}>
                   <i className="fa fa-angle-left fa-lg" style={{"color":'#3E3E3E'}}></i>
               </div>
               <div className={Styles["search-input"]}>
                   <div className={Styles['search-icon']}>
                    <i className="fa fa-search fa-lg"></i>
                   </div>
                    <input type="text" placeholder='景点名称' value={this.state.searchVal} onChange={this.getSearchVal.bind(this)}/>
               </div>
           </div>
            <div className={classNames(Styles['scroll-content'],Styles["defaultHeight"])}>
                {ticketList.length && <Scroll needMore={true}
                                              currPage={currPage}
                                              totalPage={totalPage}
                                              loadMoreData={this.loadMoreData.bind(this)}>
                    <ul className={Styles[ "orderList" ]}>
                        {
                            ticketList.length&& ticketList.map((item,index)=>{
                                return <AttractionSingle key={'ticketListSearch_'+index} item={item} clickItem={this.chooseTicket.bind(this)}></AttractionSingle>
                            })
                        }
                    </ul>
                </Scroll>||''
                }
                {
                    !ticketList.length && <div className={Styles['search-nothing-content']}>
                        <div
                        className={classNames(Styles["searchContentIcon"],{
                            [Styles["noData"]]:this.state.searchVal,
                            [Styles["noSearch"]]:!this.state.searchVal,
                        })}></div>
                        <div className={Styles['search-nothing-font']}>
                            {(this.state.searchVal&&this.props.searchListState||this.state.searchVal&&!this.props.searchListState)&&'未找到您要搜索的内容'||'搜索景点全称或拼音缩写'}
                        </div>
                    </div>
                }

            </div>
        </div>
    }
}
