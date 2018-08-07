export default {
    'post /ticketList': {
            "body":{
                "data": [
                    {
                        "pointNo": "001", //景点编号
                        "name": '谁东方闪电',  //景点名称
                        "address":'谁东方闪电',//景点地址
                        "distance":'11', //距离
                        "startPrice":'1212', //起始价格
                        "showImage":'https://p0.meituan.net/400.0/travel/9172c05e9077f176ccec489278c553a4149430.jpg', //图片地址
                        "longitude":'132', //经度
                        "latitude":'23123'//纬度
                    },
                    {
                        "pointNo": "002", //景点编号
                        "name": '谁东方闪电',  //景点名称
                        "address":'谁东方闪电',//景点地址
                        "distance":'11', //距离
                        "startPrice":'1212', //起始价格
                        "showImage":'https://p0.meituan.net/400.0/travel/9172c05e9077f176ccec489278c553a4149430.jpg', //图片地址
                        "longitude":'132', //经度
                        "latitude":'23123'//纬度
                    },

                ],
                "pageNum": 1,               //页码
                "pageSize": 552503,         //每页显示条数
                "startRow": 5526,           //起始行
                "endRow":"1",               //末行
                "total":'1190910',          //总条数
                "pages":1,                 //总页数
            },
            "pubResponse":{
                code:'0000',
                msg:'',
                version:'3.0',
                encryType:'3'
            }
        }
}
