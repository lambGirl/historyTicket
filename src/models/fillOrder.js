import { queryFillOrder } from '../services/fillOrder'
import {baseUtil} from "../utils/util";
import { Toast } from 'antd-mobile';

var globalAct = {};
export default globalAct = {

    namespace: 'fillOrder',

    state: {
        fillOrderDetail:baseUtil.getSession("jcpm_fillOrder")||"",    //ticketDetail详情
    },

    subscriptions: {
        setup({ dispatch, history }) {

        },
    },

    effects: {
        *fetch({ payload }, { call, put }) {
           // console.log("initData",payload);
            let initData =  yield call(queryFillOrder, {payload});
            //console.log("initData",initData);
            yield put({
                type: 'save',
                data: initData
            });
        }

    },

    reducers: {
        save(state, action) {
           // console.log("action.data111",action.data.pubResponse.code == "0000");
            if(action.data.pubResponse.code === "0000"){
                state.fillOrderDetail = action.data.body;
                baseUtil.setSession("jcpm_fillOrder",action.data.body);
                return { ...state,fillOrderDetail:action.data.body};
            }
            //console.log("action.data",action.data);
            return { ...state};
        },
    },

};
