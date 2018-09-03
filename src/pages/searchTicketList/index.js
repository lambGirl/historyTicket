import React from  'react';
import classNames from 'classnames';
import Styles from './index.less'
import Scroll from "../../components/demo/index"
import {connect} from 'dva'
import AttractionSingle from '../../components/indexAttractionSingle';
import router from "umi/router";
import { baseUtil } from "../../utils/util";

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

    componentDidMount(){
        //初始化数据
        this.clearVal();
    }
    UNSAFE_componentWillReceiveProps(nextProps){
       //console.log("nextProps",nextProps,this.refs.searchInput.value);
        //if(nextProps.)
        if(!nextProps.searchListState&&!this.refs.searchInput.value&&this.props.searchTicketList.ticketList.length){
            this.props.dispatch({
                type:'searchTicketList/fetch',
                payload:{
                    type:false, //默认赋值
                    postData:{
                        pageNum: 1,
                        key: "",

                    },
                    defaultData:true
                }
            });
        }
    }
    loadMoreData(){
        //实时加载数据
        let {currPage,totalPage} =  this.props.searchTicketList, {searchVal} =  this.state;
        currPage++;
        if(currPage>totalPage){
            return;
        }
        this.props.dispatch({
            type:'searchTicketList/fetch',
            payload:{
                type:true, //默认赋值
                postData:{
                    pageNum: currPage,
                    key:  searchVal
                }
            }
        });
    }
    getSearchVal(e){
        var _this =  this,value = e.target.value;
        //  return;
        //  当只存在的时候
        //  console.log("e1111111111", value);
        //  return;
        if(value){
            //alert(value);
            this.setState({
                "searchVal":value
            },()=>{
                this.throttle(this.changeSearchData(value),16);
            })
           // console.log("this.refs.indexScroll",indexScroll)
            return;
        }

       // console.log("value", value);
       //setTimeout(()=>{
        this.setState({
            "searchVal": value
        },()=>{
            this.props.dispatch({
                type:'searchTicketList/fetch',
                payload:{
                    type:false, //默认赋值
                    postData:{
                        pageNum: 1,
                        key:  value,
                    },
                    defaultData:true
                }
            });
        })
      // },300)
    }

    //修改查询数据
    changeSearchData(value){
        this.props.dispatch({
            type:'searchTicketList/fetch',
            payload:{
                type:false, //默认赋值
                postData:{
                    pageNum: 1,
                    key:  value
                }
            }
        });
    }

    //节流
    throttle(func, wait) {
        var timeout;
        return function () {
            var context = this;
            if(!timeout) {
                timeout = setTimeout(function(){
                    timeout = null;
                    func.call(context)
                }, wait);
            }
        }
    }
    chooseTicket(item){
        router.push(`/ticketDetail?point=${item.pointNo}`)
    }
    clearVal(){
        this.refs.searchInput.value = "";
        this.setState({
            "searchVal":''
        })
        this.props.dispatch({
            type:'searchTicketList/fetch',
            payload:{
                type:false, //默认赋值
                postData:{
                    pageNum: 1,
                    key: "",

                },
                defaultData:true
            }
        });
    }

    render(){
        let { ticketList, currPage, totalPage } =  this.props.searchTicketList;
       //console.log("ticketList",ticketList);
        return <div className={Styles["searchTicketList"]}>
           <div className={Styles['searchHeader']} ref='header'>
               <div className={Styles["search-left"]} onClick={()=>{router.push("/")}}>
                   <i className={Styles["headerleftIconBlack"]}></i>
               </div>
               <div className={Styles["search-input"]}>
                   <div className={Styles['search-icon']}>
                    <div className={Styles["icon"]}></div>
                   </div>
                    <input type="text" placeholder='景点名称' onChange={this.getSearchVal.bind(this)} ref='searchInput'/>
                   {
                       this.state.searchVal&&<div className={Styles['search-input-close']} onClick={this.clearVal.bind(this)}>
                            <i className="fa fa-times-circle" aria-hidden="true"></i>
                       </div>||''
                   }
               </div>
           </div>

                {ticketList.length &&  <div className={Styles["searchTicketList"]}><Scroll
                                              class={Styles["wrapper"]}
                                              ref='indexScroll'
                                              needMore={true}
                                              height="100%"
                                              currPage={currPage}
                                              totalPage={totalPage}
                                              loadMoreData={this.loadMoreData.bind(this)}>
                  {/*  <div className={classNames(Styles["wrapper_content"],Styles["defaultHeight"])}  >*/}
                        <ul className={classNames(Styles[ "orderList" ],Styles[ 'scroll-cotent-bottom' ])}>
                            {
                                ticketList.length&& ticketList.map((item,index)=>{
                                    return <AttractionSingle key={'ticketListSearch_'+index} item={item} clickItem={this.chooseTicket.bind(this)}></AttractionSingle>
                                })
                            }
                        </ul>
                   {/* </div>*/}
                </Scroll></div>||''

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
    }
}
