import { queryFillOrder,queryHoliday } from '../services/fillOrder'
import {baseUtil,Date} from "../utils/util";
import { Toast } from 'antd-mobile';

var globalAct = {};
export default globalAct = {

    namespace: 'fillOrder',

    state: {
        fillOrderDetail:baseUtil.getSession("jcpm_fillOrder")||"",    //ticketDetail详情
        canBuy:baseUtil.getSession("jcpm_canBuy")||0,
        holidays:[],
        chooseInsurance:{       //是否选择保险
            flag: false,
            index:0,
        },

        actionDate:baseUtil.getSession("jpmp_dates")||{
            index:0,
            flag: false,
            date:[]
        }
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
                data: initData.data
            });
            //这里去初始化日历的选择, 这里是初始化设置
            yield put({
                type: 'setDate',
                data: {
                    type :1,
                    initData:initData.data
                }
            });
        },

        *getHoliday({payload},{call, put}){
            let initData =  yield call(queryHoliday, {payload});
            //这里初始化日历的选择, 这里是初始化设置
            yield put({
                type: 'setHoliday',
                data: {
                    initData:initData.data
                }
            });
        },
        *canBuy({payload},{call,put}){
            //console.log("payload",payload);
            yield put({
                type: 'setCanBuy',
                data: payload
            });
        },
        *setactionDate({payload}, {call, put}){
            yield put({
                type: 'setDate',
                data: {
                    type :0,
                    initData:payload
                }
            });
        }

    },

    reducers: {
        setHoliday(state, action){

            return{
                ...state,
                holidays: action.data.body
            }
        },
        save(state, action) {
           //console.log("action.data111",action.data.body["productDetail"]);
            if(action.data.pubResponse.code === "0000"){
                let  productDetail = action.data.body["productDetail"],
                    minBuyCount =  productDetail["productBookRule"].minBuyCount;
                state.fillOrderDetail = action.data.body;
                state.canBuy = minBuyCount == -1?0:parseInt(minBuyCount);
                baseUtil.setSession("jcpm_canBuy",state.canBuy);
                baseUtil.setSession("jcpm_fillOrder",action.data.body);
                return { ...state,fillOrderDetail:action.data.body};
            }
            //console.log("action.data",action.data);
            return { ...state};
        },
        setDate(state, action){
            if(action.data.type==1){
                if(action.data.initData.pubResponse.code !== "0000") {
                    return {...state}
                }

                let day =  new Date().format("yyyy-MM-dd"),
                    tomorror =  new Date().add(1).format("yyyy-MM-dd"),i=0,allowDateList = action.data.initData.body.productDatePrices;
                let actionDate = {
                    index:0,
                    flag: false,
                    date:[
                        {date:day,price:0,use:false},
                        {date:tomorror,price:0,use:false}
                    ]
                };
                /**
                 * date,可以用的日期范围
                 */
                //必要需要今天，明天，最近的一天，
                /**
                 * 先要验证，今天，或者明天，或者同时是否存在于可选择的范围内，
                 * 如果存在，某一个就选中，否则就选择第一个,
                 * 还要一个标识判断用户是否主动选择过，如果选择过了，
                 * 日期就用用户选择的日期
                 */
                allowDateList.map(function(item){
                    if(item.sellDate === day){
                        actionDate.date[0].date = item.sellDate;
                        actionDate.date[0].price = item.sellPrice;
                        actionDate.date[0].use = true;
                        i++;
                    }
                    if(item.tomorror === day){
                        actionDate.date[1].date = item.sellDate;
                        actionDate.date[1].price = item.sellPrice;
                        actionDate.date[1].use = true;
                        i++;
                    }
                });
                actionDate.date.push({
                    date:allowDateList[i].sellDate,price:allowDateList[i].sellPrice,use:true
                });

                for(var i = 0; i< actionDate.date.length; i++){
                    if(actionDate.date[i].use){
                        actionDate.index = i;
                        break;
                    }
                }
                /*actionDate.date.map(function(item,index){
                    if(item.use){

                        return;
                    }
                });*/

                baseUtil.setSession("jpmp_dates", actionDate);
                return {
                    ...state,
                    actionDate: actionDate
                }
            }

            baseUtil.setSession("jpmp_dates", action.data.initData);
            return {
                ...state,
                actionDate: action.data.initData
            }

        },
        setCanBuy(state, action){
            state.canBuy = parseFloat(state.canBuy)+action.data;
            baseUtil.setSession("jcpm_canBuy",state.canBuy);
            //console.log("action.data",state);
            return { ...state};
        }
    },

};
