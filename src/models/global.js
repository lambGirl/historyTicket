import { query, queryM,location } from '../services/global'
import {baseUtil} from "../utils/util";
var _this =  this;
export default {

  namespace: 'globalAct',

  state: {
      text:"第一",
      point:baseUtil.getSession("locationPoint")||'',   //当前定位的坐标
      currentCity:{status: false, cityNo:'51000', cityName:"成都"},
      doorList:'' , //首页门票的列表
      currPage:1,   //门票的分页初始页
      totalPage:10,  //门票分页的总页数
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
    //获取所有的门票景点
    *getPoints({payload}, {call,put}){
        /**
         *1.首次定位，会根据定位的情况去获取对应的城市编码，并设置编码 current， status为false初始化数据， true，表示已经根据定位修改过了
         */
        let {currentCity, postData} =  payload;
        if(!currentCity.status){
            //根据坐标去请求获取城市编码,无论是否获取成功都去设置一下为true
            currentCity.status =  true;
            //在验证定位是否成功，如果定位成功在去获取城市，否则不需要执行
        }
        //根据当前的城市去得到对应的景区门票的列表
        /**
         *请求的参数
         */
        postData = Object.assign({},postData,{cityNo:currentCity.cityNo})
       // console.log("--------postData---------",postData);
         var pointes =  yield  call(query,{payload:postData});
       //  console.log("pointes",pointes);
        yield put({
            type:'setDoorList',
            data: pointes.data
        })
    },
    *getLocation({ payload }, { call, put }){
        //全局默认开启定位
        var getLocation =  yield call(location);//获取坐标定位之后
        yield put({
            type:'setPoint',
            data: getLocation
        })
    },

  },

  reducers: {
    save(state, action) {
       // console.log("action",action);
      return { ...state};
    },
    setPoint(state,action){
       // console.log("state", state, action);
        baseUtil.setSession("locationPoint", action.data)
        return {
            ...state,
            point: action.data
        }
    },
    setDoorList(state, action){
        console.log("action",action);
        /**
         * action
         */
        return {
            ...state,
            doorList: action.data.body,
            currPage:action.data.body.pageNum,   //门票的分页初始页
            totalPage:action.data.body.pages,  //门票分页的总页数
        }
    }
  },

};
