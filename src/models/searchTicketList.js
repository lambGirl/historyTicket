import { query } from '../services/searchTicketList'
import {baseUtil} from "../utils/util";
import { Toast } from 'antd-mobile';

var searchTicketList = {};
export default searchTicketList = {

    namespace: 'searchTicketList',

    state: {
        ticketList:[],    //ticketDetail详情
        currPage:1,
        totalPage:10
    },

    subscriptions: {
        setup({ dispatch, history }) {

        },
    },

    effects: {
        *fetch({ payload }, { call, put }) {
             console.log("initData",payload);
            let postData = {
                        sortType: '1',
                        longitude: "",
                        latitude: "",
                        key:payload.postData.key,
                        pageNum: payload.postData.pageNum,
                        pageSize:20,
                        cityNo:""    //这里到时候要改
                    }, initData="";
           // console.log(payload);
            if(!payload.defaultData){
                initData =  yield call(query, {payload:postData});
            }

            //console.log("initData",initData);
            yield put({
                type: 'save',
                data: {
                    type: payload.type,
                    initData: initData&&initData.data||'',
                    defaultData:  payload.defaultData
                }
            });
        },
    },

    reducers: {
        save(state, action) {
           //console.log("action", action.data.defaultData);
            if(action.data.defaultData){
                return {
                    ...state,
                    ticketList:[],
                    currPage:1,
                    totalPage:10
                }
            }
            //console.log("action", action.data);
            if(action.data.initData.pubResponse.code === "0000"){
                let list = action.data.initData.body.list,
                    currPage =  action.data.initData.body.pageNum,
                    totalPage =  action.data.initData.body.pages;
                if(action.data.type){
                    state.ticketList = list.length&&state.ticketList.concat(list)||list;
                    //console.log("state.ticketList",state.ticketList.length);
                    return { ...state,
                        currPage:currPage,
                        totalPage:totalPage
                    };
                }
                else{
                    return { ...state,
                        ticketList: list,
                        currPage,
                        totalPage
                    };
                }
            }
            Toast.info(action.data.pubResponse.msg);
            return { ...state};
        },
    },

};
