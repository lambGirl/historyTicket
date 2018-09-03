import { queryAllCitys } from '../services/index'
import { redetailSingleData,shortcutListData, baseUtil} from '../../../utils/util'
export default {

    namespace: 'city',
    state: {
        cityListInit: baseUtil.getSession("cityListInit")||[],    //没有加工过的数据列表
        cityList:[],    //加工后的数据列表
        shortcutList:[],    //city层面显示的右边的shortKey
    },

    subscriptions: {
        setup({ dispatch, history }) {

        },
    },

    effects: {
        //获取所有的singles
        *fetchCity({ payload }, { call, put,select }) {
            let {cityListInit} =  yield select(_=>_.city),initData;
          //  console.log("cityListInit",cityListInit);
            if(!cityListInit.length){
                initData =  yield call(queryAllCitys, payload);
            }
            //initData =  yield call(queryAllCitys, payload);
            //console.log("initData",initData);
            yield put({
                type: 'save',
                data: !cityListInit.length&&initData.data.body.citys||cityListInit
            });
        },
    },

    reducers: {
        save(state,{data}) {
            //设置城市
            state.cityList = redetailSingleData(data);
            //设置右边的悬浮条
            state.shortcutList =  shortcutListData(state.cityList);
            //console.log("cityList", state.cityList);
            baseUtil.setSession("cityListInit",data);
            return {
                ...state,
                cityListInit: data
            };
        },
    },

};
