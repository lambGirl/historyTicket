import request from '../utils/request';

//获取订单列表
function queryOrderList({postData}) {
    // console.log("payload111",payload);
    return request('/api?server=trip_getOrderList',{
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(postData)
    });
}
//获取订单列表
function deleteSinleOrder({postData}) {
    // console.log("payload111",payload);
    return request('/api?server=trip_deleteOrder',{
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(postData)
    });
}

export {
    queryOrderList,
    deleteSinleOrder
}
