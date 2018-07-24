import { querySingle } from '../services/index'
import { redetailSingleData,shortcutListData } from '../../../utils/util'
export default {

    namespace: 'city',

    state: {
        singers:[],
        shortcutList:[],
    },

    subscriptions: {
        setup({ dispatch, history }) {

        },
    },

    effects: {
        //获取所有的singles
        *fetch({ payload }, { call, put }) {
            let initData =  yield call(querySingle, payload);
           //console.log("initData------------",initData);
            yield put({
                type: 'save',
                data: initData.data.result.data.list
            });
        },
    },

    reducers: {
        save(state,{data}) {
            //设置城市
            state.singers = redetailSingleData(data);
            //设置右边的悬浮条
            state.shortcutList =  shortcutListData(state.singers);

            return { ...state};
        },
    },

};
