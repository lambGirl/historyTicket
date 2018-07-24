import { query, queryM } from '../services/global'
export default {

  namespace: 'globalAct',

  state: {
      text:"第一"
  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
        let initData =  yield call(queryM, payload);
        //console.log("initData",initData);
        yield put({
            type: 'save',
            data: initData.data
        });
    },
  },

  reducers: {
    save(state, action) {
       // console.log("action",action);
      return { ...state};
    },
  },

};
