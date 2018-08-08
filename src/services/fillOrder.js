import request from '../utils/request';

//获取景区门票列表
function queryFillOrder({payload}) {
    // console.log("payload111",payload);
    return request('/getPointProductDetail',{
        method: "post",
        body:JSON.stringify(payload)
    });
}

export {
    queryFillOrder
}
