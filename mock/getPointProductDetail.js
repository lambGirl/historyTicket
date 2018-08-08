export default {
    'post /getPointProductDetail': {
        "body":{
            pointNo:'001',
            productDatePrices:[
                {"sellDate":"2018-08-08",sellPrice:"18.00"},
                {"sellDate":"2018-08-09",sellPrice:"18.00"},
                {"sellDate":"2018-08-10",sellPrice:"18.00"},
                {"sellDate":"2018-08-11",sellPrice:"18.00"},
                {"sellDate":"2018-08-12",sellPrice:"18.00"},
                {"sellDate":"2018-08-13",sellPrice:"18.00"},
                {"sellDate":"2018-08-14",sellPrice:"18.00"},
                {"sellDate":"2018-08-15",sellPrice:"18.00"},
                {"sellDate":"2018-08-16",sellPrice:"18.00"},
                {"sellDate":"2018-08-17",sellPrice:"18.00"},
                {"sellDate":"2018-08-18",sellPrice:"18.00"},
                {"sellDate":"2018-08-19",sellPrice:"18.00"},
            ],
            productDetail: {
                    productNo:'001',
                    productName:'姥爷博物馆',
                    showPrice:'10.00',
                    onlineTime:'2018-01-01',
                    offlineTime:'2019-02-03',
                    bookType:'0', //预定模式：0 有效期模式；1 预约模式
                    costIncludeNote:'费用包含说明',
                    costExcludeNote:'费用不包含说明',
                    provideInvoice:'0', //是否提供发票：0 不提供；1：提供
                    productItemDetails:{
                        "itemName":'项目名称',
                        "num":1,
                        unit:'次',
                        price:'21',
                        availableTime:'2'
                    },
                    canUseAll:'0 ' ,//产品游玩项目是否全部可用：0 不是全部可用；1 全部可用
                    allAvailable:'100000', //产品游玩项目可用总量
                    usable:'0', //产品游玩项目可用数量，当canUseAll=0时usable不为空，用来表示从allAvailable中可以选择使用usable项
                    productBookRule:{
                            aheadTimeType:'0', //提前预约时间类型： 1 任意时刻可购买,此时aheadMinutes=0 2 需要提前aheadMinutes分钟购买
                            aheadMinutes:'10',//提前预约分钟数
                            aheadNote:'及时到',   //提前预约补充说明
                            returnVoucher:'0',   //是否有凭证码：0 不需要返回凭证码；1 需要返回凭证码
                            contactInfoType:'1', //是否需要联系人：1 不需要联系人信息；2 需要联系人信息
                            visitorInfoType:'1',  //游玩人信息类型：1 不需要游玩人信息；2 只需要一位游玩人信息；3 需要每一位游玩人信息； 4 每visitorInfoGroupSize个人需要一
                            visitorInfoGroupSize:'1',    //每visitorInfoGroupSize个人需要一位游玩人信息，当visitorInfoType=4时非空。例如visitorInfoType=4，
                            ignoreVoucherText:'',    //returnVoucher = 0 不需要返回凭证码时显示的文案
                            idcardLimitDays:'',  //每个身份证idcardLimitDays天内最多可购买idcardLimitCount个产品， idcardLimitDays=-1表示不限制。
                        }
                    ,
                    productUseRule:{
                        needTicket:'0',  //换纸质门票：0 不需要；1 需要。
                        ticketGetAddress:[  // 取票地址
                            "北门",
                            "南门",
                            "动门",
                        ],
                        getInAddress:[  //入园地址
                            "北门",
                            "南门",
                            "动门",
                        ],
                        voucherTimes:{beginTime:'09:00',endTime:"18:00"},
                        otherNote:'sdaf',    //其他注意事项
                        validWeekRule:'1101000',
                    },
                    productRefundRule:{
                        refundType:1,
                        stairsRefund:1,
                        partlyRefund:0,
                        refundTimeType:'',
                        refundFeeMode:'10',
                        refundFee:'1',
                        refundLimitMinutes:20
                    }
                },
        },
        "pubResponse":{
            code:'0000',
            msg:'',
            version:'3.0',
            encryType:'3'
        }
    }
}
