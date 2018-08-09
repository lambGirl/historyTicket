import request from '../utils/request';

//获取订单详情
function queryOrderDetail({payload}) {
    // console.log("payload111",payload);
    return request('/api?server=trip_getOrderDetail',{
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(payload)
    });
}

//获取订单状态
function queryOrderStatus({payload}) {
    // console.log("payload111",payload);
    return request('/api?server=trip_getOrderState',{
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(payload)
    });
}

export {
    queryOrderDetail,
    queryOrderStatus
}
