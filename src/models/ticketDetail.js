import { queryTicketDetail } from '../services/ticketDetail'
import {baseUtil} from "../utils/util";
import { Toast } from 'antd-mobile';

var globalAct = {};
export default globalAct = {

    namespace: 'ticketDetail',

    state: {
        ticketDetail:baseUtil.getSession("jcpm_ticketDetail")||"",    //ticketDetail详情
    },

    subscriptions: {
        setup({ dispatch, history }) {

        },
    },

    effects: {
        *fetch({ payload }, { call, put }) {
           // console.log("initData",payload);
            let initData =  yield call(queryTicketDetail, {payload});
           //console.log("initData",initData);
            yield put({
                type: 'save',
                data: initData.data
            });
        }

    },

    reducers: {
        save(state, action) {
            if(action.data.pubResponse.code === "0000"){
                state.ticketDetail = action.data.body;
                baseUtil.setSession("jcpm_ticketDetail",action.data.body);
                return { ...state,ticketDetail:action.data.body};
            }
            Toast.info(action.data.pubResponse.msg);
            return { ...state};
        },
    },

};
