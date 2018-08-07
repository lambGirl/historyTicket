import request from '../../../utils/request';

function queryAllCitys(){
    return request('/getAllCitys',{method:'post'})
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

export {
    queryM,
    queryAllCitys
}
