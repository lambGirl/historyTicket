import request from '../utils/request';
import {getLocation} from "../utils/util";

//获取景区门票列表
function query({payload}) {
   // console.log("payload",payload);
  return request('/api?server=trip_getPoints',{
      method: "post",
      headers: {
          'Content-Type': 'application/json'
      },
      body:JSON.stringify(payload)
  });
}

//获取初始化城市
function getLocationCity(payload) {
     //console.log("payload",payload);
    return request('/api?server=trip_getLocationCity',{
        method: "post",
        body:JSON.stringify(payload)
    });
}

function queryM(){
    return request('/api?server=tz_visit',{
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({
            type:'1',
            openId: "sadfsdfd"
        })
    })
}
function location(){
    return getLocation()
}

export {
    query,
    queryM,
    location,
    getLocationCity
}
