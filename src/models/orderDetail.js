import { queryOrderDetail, queryOrderStatus,obsoleteOrder,refundTicket} from '../services/orderDetail'
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

        //作废订单
        *obsoleteOrder({ payload }, { call, put }) {

            let initData =  yield call(obsoleteOrder,{payload});
           // console.log("initData",initData);
            /**
             * 这里来验证此时的订单是什么状态，
             * 如果此时booking的状态则就轮训知道不是booking状态为止
             */
            /**
             * 这里验证作废成功与失败
             */
            if(initData.data.pubResponse.code === "0000"){
                Toast.info("订单作废成功");
                yield put({
                    type: 'fetch',
                    payload: payload
                });
                return;
            }
            Toast.info(initData.data.pubResponse.msg);

            /*yield put({
                type: 'save',
                data: initData.data
            });*/
        },
        //申请退票
        *refundTicket({ payload }, { call, put }){
            let initData =  yield call(refundTicket,{payload});
            // console.log("initData",initData);
            /**
             * 这里来验证此时的订单是什么状态，
             * 如果此时booking的状态则就轮训知道不是booking状态为止
             */
            /**
             * 这里验证作废成功与失败
             */
           /* Toast.info("提交退票申请成功");*/
           /* yield put({
                type: 'fetch',
                payload: payload
            });*/
            if(initData.data.pubResponse.code === "0000"){
               /* Toast.info("提交退票申请成功");*/
                yield put({
                    type: 'fetch',
                    payload: payload
                });
                return;
            }
            Toast.info(initData.data.pubResponse.msg);
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
           Toast.info(action.data.pubResponse.msg,2);
            return { ...state};
        },
    },

};
