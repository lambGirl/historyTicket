import request from '../utils/request';

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
    queryFillOrder
}
