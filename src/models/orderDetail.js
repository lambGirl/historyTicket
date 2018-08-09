import { queryOrderDetail, queryOrderStatus} from '../services/orderDetail'
import {baseUtil} from "../utils/util";
import { Toast } from 'antd-mobile';

var orderDetail = {};
export default orderDetail = {

    namespace: 'orderDetail',

    state: {
        "orderDetail":"",
    },

    subscriptions: {

    },

    effects: {
        *fetch({ payload }, { call, put }) {
            let initData =  yield call(queryOrderDetail,{payload});
            //console.log("initData",initData);
            /**
             * 这里来验证此时的订单是什么状态，
             * 如果此时booking的状态则就轮训知道不是booking状态为止
             */

            yield put({
                type: 'save',
                data: initData.data
            });
        },
        *getOrderStatus({payload}, {put, call}){
            let initData =  yield call(queryOrderStatus,{payload});
        }

    },

    reducers: {
        save(state, action) {
            //console.log("action", action);
           if(action.data.pubResponse.code === '0000'){
               return{
                   ...state,
                   orderDetail:action.data.body
               }
           }
            return { ...state};
        },
    },

};
