import request from '../utils/request';

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
export {
    query
}
