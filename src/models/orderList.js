import { queryOrderList,deleteSinleOrder } from '../services/orderList'
import {baseUtil} from "../utils/util";
import { Toast } from 'antd-mobile';

var orderList = {};
export default orderList = {

    namespace: 'orderList',

    state: {
        orderList:[],
        pageNum:1,
        pages: 10,
    },

    subscriptions: {
        setup({ dispatch, history }) {
            baseUtil.setSession("jqmp_activeIndex","0");
            history.listen(location => {

                 if(location.pathname.indexOf("/orderList") != -1){
                     //获取token
                     let  userToken = baseUtil.get("cdqcp_opid");
                     let activeIndex =  baseUtil.getSession("jqmp_activeIndex")?parseInt(baseUtil.getSession("jqmp_activeIndex")):0,
                         state_Session =  activeIndex === 1 ? "sell_succeed":activeIndex===2&&"consume_succeed"||"";
                     //默认初始化为全部
                     dispatch({
                         type:'fetch',
                         payload:{
                             tag: false,
                             postData:{
                                 userToken:userToken,
                                 state:state_Session,
                                 pageNum:"1",
                                 pageSize:"10"
                             }
                         }
                     })
                 }

            });
        },
    },

    effects: {
        *fetch({ payload }, { call, put }) {
            //先要判断一下来的是不是切换的数据。 如果是就需要把初始化的page设置为可以滚动的形式
            //console.log("initData",payload);
            let postData = payload.postData
            let initData =  yield call(queryOrderList, {postData});
           // console.log("initData",initData);
            if(initData.data.pubResponse.code === "0000"&&!payload.tag){
                yield put({
                    type: 'initPage'
                });
            }
            yield put({
                type: 'save',
                data: {
                    tag: payload.tag,
                    saveData:initData.data}
            });
        },
        *deleteSinleOrder({ payload }, { call, put }){

            let postData = payload.postData;
            let state =  payload.state;
            let initData =  yield call(deleteSinleOrder, {postData});

           // console.log("postData", postData);
            if(initData.data.pubResponse.code === "0000"){
                Toast.info("删除成功");
                yield put({
                    type:'fetch',
                    payload:{
                        tag: false,
                        postData:{
                            userToken:postData.userToken,
                            state:state,
                            pageNum:"1",
                            pageSize:"10"
                        }
                    }
                })
            }else{
                Toast.info(initData.data.pubResponse.msg);
            }
        }
    },

    reducers: {
        initPage(state, action){
           //console.log("action",action);
            return {
                ...state,
                orderList:[],
                pageNum:1,
                pages: 10,
            }
        },
        save(state, action) {
          //  console.log('1111111111')
            let {saveData, tag} = action.data;
           // console.log("saveData",saveData, tag);
            if(saveData.pubResponse.code === "0000"&&!tag){
                state.pageNum = saveData.body.pageNum;
                state.pages =  saveData.body.pages;
                return { ...state,orderList:saveData.body.list};
            }
            if(saveData.pubResponse.code === "0000"&&tag){
                state.pageNum = saveData.body.pageNum;
                state.pages =  saveData.body.pages;
                state.orderList = state.orderList.concat(saveData.body.list);
               // console.log("saveData",state, tag);
                return { ...state};
            }
            Toast.info(saveData.pubResponse.msg);
            return { ...state};
        },
    },

};
