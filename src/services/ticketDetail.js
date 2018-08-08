import request from '../utils/request';

//获取景区门票列表
function queryTicketDetail({payload}) {
    // console.log("payload111",payload);
    return request('/api?server=trip_getPointProducts',{
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(payload)
    });
}

export {
    queryTicketDetail
}
