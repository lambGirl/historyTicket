import request from '../utils/request';
import {getLocation} from "../utils/util";

function query({payload}) {
   // console.log("payload",payload);
  return request('/ticketList',{
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
    location
}
