export default {
    'post /getLocationCity': {
        "body":{
            cityNo:'51000',
            cityName:'德阳',
            childrens:[
                {"cityNo":'all',cityName:'全城'},
                {"cityNo":'cs',cityName:'双流'},
                {"cityNo":'tf',cityName:'天府'},
                {"cityNo":'gx',cityName:'高新'},
                {"cityNo":'wh',cityName:'武侯区'}
            ]
        },
        "pubResponse":{
            code:'0000',
            msg:'',
            version:'3.0',
            encryType:'3'
        }
    }
}
