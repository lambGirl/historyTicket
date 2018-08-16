import request from '../utils/request';

//获取日历的节假日
function queryHoliday({payload}) {
    // console.log("payload111",payload);
    return request('/api?server=tz_getHoliday',{
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(payload)
    });
}

//获取景区门票列表
function queryFillOrder({payload}) {
    // console.log("payload111",payload);
    return request('/api?server=trip_getPointProductDetail',{
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(payload)
    });
}


export {
    queryFillOrder,
    queryHoliday
}
