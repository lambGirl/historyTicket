import { query, queryM,location,getLocationCity,queryGlobalConfig,getHomeFocusImg} from '../services/global'
import {baseUtil} from "../utils/util";
import { Toast } from 'antd-mobile';
import Router from 'umi/router'

var globalAct = {};
if(Router.location.pathname === "/"){
    baseUtil.removeSession("homeFocusImg");
    baseUtil.removeSession("jqmp_IndexInit");
    baseUtil.removeSession("jpmp_dates");
    baseUtil.removeSession("jcpm_ticketDetail");
    baseUtil.removeSession("jcpm_fillOrder");
    baseUtil.removeSession("jcpm_canBuy");
    baseUtil.removeSession("jqmp_CurrentCity");
    /*baseUtil.removeSession("locationPoint");*/
}
export default globalAct = {

  namespace: 'globalAct',

  state: {
      text:"第一",
      homeFocusImg:baseUtil.getSession("homeFocusImg")||"",
      point:baseUtil.getSession("locationPoint")||'',   //当前定位的坐标,默认为空
      currentCity:baseUtil.getSession("jqmp_CurrentCity")||"",   //默认城市
      doorList:'' , //首页门票的列表
      currPage:1,   //门票的分页初始页
      pageNum:20,   //每一页20条数据
      totalPage:10,  //门票分页的总页数
      SelectBarData:baseUtil.getSession("jqmp_IndexInit")||{
          cityName:'',
          cityNo:'',
          control:false,
          "all":{
              activeIndex:0,
              parentIndex: false,
              data:[{"cityName":"全城","cityNo":'all'}]
          },
          'zlpx':{
              activeIndex:0,
              parentIndex: false,
              data:[
                  {cityNo:'1', cityName:'智能排序'},
                  {cityNo:'2', cityName:'由近到远'},
              ]
          }
      }
  },

  subscriptions: {
    setup({ dispatch, history }) {

        //既然要刷新。 就清楚所有的东西
        history.listen(location => {
            if(location.pathname === "/"){
                let { from,openId } = location.query;
                if(from){
                    baseUtil.setSession("cdqcp_channel",from);
                    openId = openId||''
                    baseUtil.set("cdqcp_opid",openId);
                }
            }

            //全局配置
            let globalConfig =  baseUtil.getSession('globalConfig')
            if(!globalConfig){
                dispatch({
                    type:'getGlobalConfig',
                })
            }
            //获取首页的图片列表
            let IndexHeaderImgs =  baseUtil.getSession('homeFocusImg')
            if(!IndexHeaderImgs){
                dispatch({
                    type:'getIndexHeaderImgs',
                })
            }

            if(location.pathname === "/"){
               dispatch({
                    type:'getInit',
                });
            }

        });
    },
  },

  effects: {
      //获取首页的header的图片背景
    *getIndexHeaderImgs({payload}, {call, put}){
        let initData =  yield call(getHomeFocusImg);
        //console.log("initData",initData);
        yield put({
            type: 'saveIndexHeaderImgs',
            data: initData.data
        });
    },

    //全局配置
    *getGlobalConfig({payload}, {call, put}){
        let initData =  yield call(queryGlobalConfig);
        //console.log("initData",initData);
        baseUtil.setSession("globalConfig", initData.data.body.config);
    },

    *fetch({ payload }, { call, put }) {
        let initData =  yield call(queryM, payload);
        //console.log("initData",initData);
        yield put({
            type: 'save',
            data: initData.data
        });
    },
    //获取所有的门票景点
    *getPoints({payload}, {call,put, select}){
      /**
       *1.首次定位，会根据定位的情况去获取对应的城市编码，并设置编码 current， status为false初始化数据， true，表示已经根据定位修改过了
       */
      const {SelectBarData} = yield select(_=>_.globalAct);

      //type:表示是否执行数据的累加操作
      let {postData, type} =  payload;

      /**
       *请求的参数
       */
    //  postData = Object.assign({},postData,{cityNo:SelectBarData.cityNo});
      postData.cityNo = postData.cityNo === "all"&&SelectBarData.cityNo||  postData.cityNo;
      var data =  yield  call(query,{payload:postData});

       // console.log("data",data);
     /* if(data.pubResponse.code === '0000') {
        Toast.info('ok', 2);*/
        yield put({
          type:'setDoorList',
          data:{
              type: type,
              initData:data.data}
        })
     /* } else {
        Toast.info('error', 2);
      }*/

    },
    *getLocation({ payload }, { call, put, select }){
        //全局默认开启定位
        var getLocation = "", {SelectBarData} =  yield select(_=>_.globalAct)
        try {
            getLocation =  yield call(location);//获取坐标定位之后
        }catch (err){
            getLocation={
                code:0,
                data:"0004"
            }
        }
        if(!getLocation||!getLocation.code){
            Toast.info("定位失败");
            return;
        }

        yield put({
            type:'setPoint',
            data: getLocation
        });

        let lng =  getLocation&&getLocation.data["lng"],
            lat =  getLocation&&getLocation.data["lat"];        //设置对应的城市
        var getLocationCityData = yield call(getLocationCity,{longitude:lng,latitude:lat});
        Toast.info("已为你重新定位");
        //初始化定位的城市
        yield  put({
            type:'setCurrentCity',
            data: getLocationCityData.data
        });
        //这里就要判断是够已经初始化过， 如果用户已经点击过了 就不在去初始化select的情况及定位的情况
        if(!SelectBarData.control){
            var allChild=getLocationCityData.data.body.childrens;
            //console.log("getLocationCityData",getLocationCityData);
            SelectBarData["all"].data =allChild.length&&[{cityName: "全城", cityNo: "all"}].concat(allChild);
            SelectBarData["cityName"] = getLocationCityData.data.body.cityName;
            SelectBarData["cityNo"] = getLocationCityData.data.body.cityNo;
            //初始化对应的首页默认数据
            yield  put({
                type:'setIndexInit',
                data:{
                    type:false,
                    data:getLocationCityData.data
                }
            });
        }

    },

    *getInit({payload}, { call, put, select}){
        //初始化首页数据
        /**
         * 首先要验证定位，是否存在已经定位的数据,
         * 1、先处理定期成功
         *      定位成功则去获取对应的城市编码(城市编码存在一个初始值，默认为成都。没有改变过)
         *      得到对应的城市城市编码，去获取对应的景区门票列表
         */
        let {point,currentCity,pageNum,currPage,SelectBarData,totalPage} = yield select(_=>_.globalAct),getLocation;
        //console.log("currPoint",currPoint,currentCity,  SelectBarData)
        currPage = 1,totalPage=10;  //进来都去初始化一次数据
       // console.log("argument", point);
        if(!point){
            try {
                getLocation =  yield call(location);//获取坐标定位之后
            }catch (err){
                getLocation={
                    code:0,
                    data:"0004"
                }
            }

            point = Object.assign({}, getLocation);
            //如果初始化进来，就直接去设置point
            yield put({
                type:'setPoint',
                data: point
            })
        }

        //得到了对应的坐标，就去获取对应的城市,判断是否设置过，如果设置过，则就不需要在去初始化。直接取值，否则就需要去设置城市
        if(!currentCity){
          //  console.log("currentCity",currentCity);
            let lng =  getLocation&&getLocation.data["lng"],
                lat =  getLocation&&getLocation.data["lat"];
            //设置对应的城市
            var getLocationCityData = yield call(getLocationCity,{longitude:lng,latitude:lat}),
            allChild=getLocationCityData.data.body.childrens;
            //console.log("getLocationCityData",getLocationCityData);
            SelectBarData["all"].data =allChild.length&&[{cityName: "全城", cityNo: "all"}].concat(allChild);
            SelectBarData["cityName"] = getLocationCityData.data.body.cityName;
            SelectBarData["cityNo"] = getLocationCityData.data.body.cityNo;
            //初始化对应的首页默认数据
            yield  put({
                type:'setIndexInit',
                data:{
                    type:false,
                    data:getLocationCityData.data
                }
            });

            //初始化定位的城市
            yield  put({
                type:'setCurrentCity',
                data: getLocationCityData.data
            });
        }

        console.log("currentCity",currentCity);
        let  {data, activeIndex} = SelectBarData["zlpx"];
        let  allData = SelectBarData["all"]["data"],allActiveIndex = SelectBarData["all"]["activeIndex"];
      //  return;
        yield  put({
            type:'getPoints',
            payload: {
                type:false,
                postData:{
                    sortType: data[activeIndex].cityNo,
                    longitude: point.data&&point.data.lng||"",
                    latitude: point.data&&point.data.lat||"",
                    key:'',
                    pageNum: currPage,
                    pageSize:pageNum,
                    cityNo:allData[allActiveIndex].cityNo    //这里到时候要改
                }
            },
        })
    },

    *getSelectBarData({payload},{call, put, select}){
        let {SelectBarData,type} = payload;//得到改变的参数
        if(type){
            let {point} = yield select(_=>_.globalAct)
            let  {data, activeIndex} = SelectBarData["zlpx"];
            let  allData = SelectBarData["all"]["data"],allActiveIndex = SelectBarData["all"]["activeIndex"];
            yield  put({
                type:'getPoints',
                payload: {
                    type:false,
                    postData:{
                        sortType: data[activeIndex].cityNo,
                        longitude: point.data&&point.data.lng||"",
                        latitude: point.data&&point.data.lat||"",
                        key:'',
                        pageNum: 1,
                        pageSize:20,
                        cityNo: allData[allActiveIndex].cityNo   //这里到时候要改
                    }
                },
            })
        }

      //  console.log(currPoint);
      //  return;

        yield put({
            type:'setIndexInit',
            data:{
                type:true,
                data:SelectBarData
            }
        })
    }

  },

  reducers: {
      saveIndexHeaderImgs(state, action) {
          //console.log("actions", action);
          baseUtil.setSession("homeFocusImg",  action.data.body.data);
        return {
            ...state,
            homeFocusImg: action.data.body.data
        };
    },

    save(state, action) {
      return { ...state};
    },
      //设置当前的定位点
    setPoint(state,action){
        baseUtil.setSession("locationPoint", action.data);
        return  {
            ...state,
            point: action.data
        }
    },
    //设置定位到的城市
    setCurrentCity(state, action){
        //设置对应的城市
        baseUtil.setSession("jqmp_CurrentCity", action.data.body);
        return {
            ...state,
            currentCity:action.data.body
        }
    } ,
    //设置首页初始化数据
    setIndexInit(state, action){
        //console.log("action---------",action);
        //接口回来的数据设置
        if(!action.data.type){
            let allChild = action.data.data.body.childrens;
            state.SelectBarData["all"].data = allChild.length&&[{"cityName":"全城","cityNo":'all'}].concat(allChild);
            state.SelectBarData["cityName"] = action.data.data.body.cityName;
            state.SelectBarData["cityNo"] = action.data.data.body.cityNo;
            baseUtil.setSession("jqmp_IndexInit",state.SelectBarData);
            return  {
                ...state
            }
        }

        //主动设置SelectBarData
        state.SelectBarData = action.data.data;
        baseUtil.setSession("jqmp_IndexInit",state.SelectBarData);
        return  {
            ...state
        }
    },

    setDoorList(state, action){
      // console.log(action);
        let {initData, type} =  action.data;
        //这里需要验证doorList是否存在，如果存在了就需要push数据
       if(initData.pubResponse.code == "0000"){
           //这里执行分页查询的操作
           if(type){
               state.doorList = state.doorList.concat(initData.body.list);

           }else{
               state.doorList = initData.body.list
           }

           return {
               ...state,
               currPage:initData.body.pageNum,   //门票的分页初始页
               totalPage:initData.body.pages,  //门票分页的总页数
           }
       }

       Toast.info(action.data.pubResponse.msg);
       return {
           ...state
       }
    }
  },

};
