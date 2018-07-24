import request from '../../../utils/request';

function querySingle(){
    return request('/singer')
}
function query({id}) {
    return request('/api/users');
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
    query,
    queryM,
    querySingle
}
