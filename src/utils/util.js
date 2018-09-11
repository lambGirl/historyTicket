import AMap from 'AMap'

Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "H+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    }

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};
Date.prototype.addMilliseconds = function (value) {
    this.setMilliseconds(this.getMilliseconds() + value);
    return this;
};
Date.prototype.add = function (value) { return this.addMilliseconds(value * 86400000); };
Date.prototype.addDays = Date.prototype.add;
Date.parseTimeStr = function (datestr) {//ios 专用
    datestr = datestr.replace(/-/g, "/");
    return new Date(datestr);
}
Date.prototype.getweek = function(){
    if (this.format('yyyy/MM/dd') == new Date().format('yyyy/MM/dd')){
        return '今天'
    }
    if (this.format('yyyy/MM/dd') == new Date((new Date() / 1000 + 86400) * 1000).format('yyyy/MM/dd')){
        return '明天'
    }
    return ' 周' + '日一二三四五六'.charAt(this.getDay());
};
Date.prototype.week = function () {
    if(this.format('yyyy/MM/dd')==new Date().format('yyyy/MM/dd')){
        return '今天'
    }
    if(this.format('yyyy/MM/dd')==new Date((new Date()/1000+86400)*1000).format('yyyy/MM/dd')){
        return '明天'
    }
    return ' 星期' + '日一二三四五六'.charAt(this.getDay());
};

Date.prototype.getUnixTimeStamp=function(){
    return Math.round(this.getTime()/1000);
}
Date.parse1=Date.parseTimeStr;

class Singer{
    constructor({cityNo,cityName,parentRegionName,childrens,shortName}) {
        this.cityNo = cityNo;
        this.cityName = cityName,
        this.shortName = shortName,
        this.parentRegionName = parentRegionName,
        this.childrens = childrens||[]
    }
}
//按照汉字排序
var localeCompare =  function(a,b){
    if(!a&&!b){
        return;
    }
    return a.shortName.localeCompare(b.shortName);
}

//得到城市数据
const redetailSingleData = (list)=>{


    let map = {
        other: {
            title: '其他',
            items: []
        }
    };
    for (let [index,item] of Array.entries(list)) {
        var first =  item.shortName.substr(0,1).toLocaleUpperCase()
        if (!map[first]) {
            map[first] = {
                title: first,
                items: []
            }
        }
        if (/[a-zA-Z]/.test(first)) {
            map[first].items.push(new Singer({
                cityNo: item.cityNo,
                cityName: item.cityName,
                shortName:item.shortName,
                parentRegionName: item.parentRegionName,
                childrens:item.childrens||[]
            }));
        } else {
            map.other.items.push(new Singer({
                cityNo: item.cityNo,
                cityName: item.cityName,
                shortName:item.shortName,
                parentRegionName: item.parentRegionName,
                childrens:item.childrens||[]
            }))
        }
    }
    let ret = [];
    for (let key in map) {
        let val = map[key];
        if (val.title.match(/[a-zA-Z]/)) {
            val.items.sort(localeCompare);
           // console.log("item", val.items);
            ret.push(val)
        }
    }

    ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
    });
   // ret.sort().sort().sort()
    return [...ret];
}

//得到大小写数据
const shortcutListData = (list)=>{
    let List = ["定位"];
    let ListArry = list.map(group => {return group.title.substr(0,1)});
 //   console.log("ListArry",ListArry);
    return List.concat(ListArry);
}

const getData = (el,name,val)=>{
    const prefix = 'data-'
    if (val){
        return el.setAttribute(prefix + name,val)
    }
    return el.getAttribute(prefix + name)
}
const gdPosition = ()=>{
    var mapObj = new AMap.Map('iCenter'),geolocation='', promise='';
    return promise =  new Promise ((resolve,reject)=>{
        mapObj.plugin('AMap.Geolocation', function () {
            geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,//是否使用高精度定位，默认:true
                timeout: 1000,          //超过10秒后停止定位，默认：无穷大
                maximumAge: 0,           //定位结果缓存0毫秒，默认：0
                convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                showButton: true,        //显示定位按钮，默认：true
                buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
                buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
                showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
                panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
                zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            });

            mapObj.addControl(geolocation);
            // console.log("geolocation", geolocation.getCurrentPosition);

            geolocation.getCurrentPosition();
            AMap.event.addListener(geolocation, 'complete', (success)=>{
                // console.log("success------",success);
                resolve({
                    code:1,
                    data: {
                        lng:success.position.lng,
                        lat: success.position.lat
                    }
                });
            });//返回定位信息
            AMap.event.addListener(geolocation, 'error', (error)=>{
                reject({
                    code:0,
                    data:"0004"
                })
            });
        });
    });
}

const wxPosition = ()=>{
    var mapObj = new AMap.Map('iCenter'),geolocation='', promise='';
    return promise =  new Promise ((resolve,reject)=>{
        if(typeof wx !== "undefined"){
            var wx =  wx;
            wx.ready(function () {
                wx.getLocation({
                    type: "wgs84",
                    success: function (res) {
                        // console.log("res", res);
                        var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                        var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                        resolve({
                            code:1,
                            data: {
                                lng:longitude,
                                lat:latitude
                            }
                        });
                    },
                    fail: function () {
                        reject({
                            code:0,
                            data:"0004"
                        })
                    },
                    cancel: function () {
                        reject({
                            code:0,
                            data:"0004"
                        })
                    }
                });
            });
        }

    });


}
const getLocation  =  ()=>{
    if(!baseUtil.isWX()){
        return gdPosition();
    }
    if(typeof  wx === "undefined"){
        return gdPosition();
    }

    return wxPosition()


}
const baseUtil = {
    isWX : function () {
        var ua = navigator.userAgent||'',uk = "MicroMessenger/";
        return ua.indexOf(uk) > -1;
    },
    get: function (prop, needTime, notneedFrom) {
        var  val = localStorage.getItem(prop);
        val = (val == "null" || val == "undefined" || val == "none") ? '' : val ? val : "";

        if((val[0]=="{"&&val[val.length-1]=="}")||(val[0]=="["&&val[val.length-1]=="]")){
            return JSON.parse(val);
        }

        return val;
    },
    set: function (prop, value, timeout) {
        var key2 = prop;
        if (typeof (value) == "object") {
            localStorage.removeItem(key2);
            localStorage.setItem(key2, JSON.stringify(value));
        } else {
            localStorage.removeItem(key2);
            localStorage.setItem(key2, value);
        }
        if (timeout) {
            localStorage.setItem(key2 + "_OutTime", Date.today().addMilliseconds(timeout).localTimeStr());
        }
    },
    getSession:function(prop,needTime,notneedFrom){
        var key1 = prop ,val = sessionStorage.getItem(key1);
        val = (val == "null" || val == "undefined" || val == "none") ? '' : val ? val : "";

        if ((val[0] == "{" && val[val.length - 1] == "}") || (val[0] == "[" && val[val.length - 1] == "]")){
            return JSON.parse(val);
        }
        return val;
    },
    setSession:function(prop,value,timeout,notneedFrom){
        var key2 = prop;
        if (typeof (value) == "object"){
            sessionStorage.removeItem(key2);
            sessionStorage.setItem(key2,JSON.stringify(value));
        } else {
            sessionStorage.removeItem(key2);
            sessionStorage.setItem(key2,value);
        }
    },
    removeSession(key){
        sessionStorage.removeItem(key);
    },
    formatNameStr:function(numLength,v){
        // console.log(v)
        return v.length<=numLength-1?v:(v.substring(0, numLength-1) + "...")
    },

    //格式化数值
    formatNumber(numStr){
        numStr=Number(numStr)+"";
        if(/\.\d{3,}$/.test(numStr)){
            numStr=Number(numStr).toFixed(2)
        }
        return numStr
    },
    formatDateArray(date, num){
        /**
         * 得到date， date值加num
         */
       // console.log("num", date, typeof num, num);
        var newDate = Date.parse1(date), dateArray = [];
        for (var i = 0 ; i < Number(num); i++){
            let dateFlag =  newDate.addDays(i);
            dateArray.push(dateFlag.format("yyyy年MM月dd日"))
        }
        return dateArray;
    },
   ConfigFind:function(name){
        let globalConfig = baseUtil.getSession('globalConfig');
        if (!globalConfig){
          //  console.error('没有访问首页--缓存配置项目');
            return '';
        } else {
            for(let i = 0; i < globalConfig.length; i++) {
                if (globalConfig[i].name === name){
                    return globalConfig[i].value;
                }
            }
        }
    },
    getHours(num){
        /**
         * 设置多少小时可以用
         */
        var hour =  parseInt(num/60); //多少小时
        var min =  num-hour*60; //分钟
        return `${hour&&hour+"小时"||""}${min&&min+"分钟"||''}`
    },
    productRefundRule(tag){
        let val = "";
        //console.log("val",tag);
        switch (tag){
            case "1":val='随时可退';
                    break;
            case "2":val='随时可退';
                break;
            case "3":val='购买后不可退票';
                break;
            case "4":val='退票条件以景区实际情况为准';
                break;
        }

        return val;
    },
    entryParkMethods(tag){
        let val = "";
        //console.log("val",tag);
        switch (tag){
            case "2":val='商家短信';
                break;
            case "3":val='商家邮件';
                break;
            case "4":val='商家电子码';
                break;
            case "5":val='二维码';
                break;
            case "6":val='身份证';
                break;
            case "7":val='商家订单号';
                break;
            case "8":val='手机号';
                break;
            case "-1":val='其他';
                break;
        }
        return val;
    },
    orderDetailStatus(status){
        var detail = ""
        switch(status){
            case "booking":detail = {
                singleLine:true,
                mangLine: false,
                statusColor:'#3E3E3E',
                status:'下单中',
                doubleBtn:false,
                singleBtn:false,
                statusContent:"",
                pz:false,   //凭证模块是否显示
                refundMoney:false,
                icon:'paying',
                orderListGroupBtn:{
                    show:false,
                    btnList:{
                        pay: false,
                        delete: false
                    }
                }
            };break;
            case "book_succeed":detail = {
                status:'待支付',
                singleLine:false,
                statusColor:'#FF6137',
                mangLine: true,
                doubleBtn:true,
                statusContent:"",
                pz:false,   //凭证模块是否显示
                refundMoney:false,
                icon:'paying',
                orderListGroupBtn:{
                    show:true,
                    btnList:{
                        pay: true,
                        delete: false
                    }
                }
            };break;
            case "selling":detail = {
                status:'购票中',
                singleLine:false,
                statusColor:'#3E3E3E',
                mangLine: true,
                doubleBtn:false,
                singleBtn:false,
                statusContent:"请耐心等待，抢到票后会第一时间告诉你",
                pz:false,   //凭证模块是否显示
                refundMoney:false,
                icon:'paying',
                orderListGroupBtn:{
                    show:false,
                    btnList:{
                        pay: false,
                        delete: false
                    }
                }
            };break;
            case "sell_failed":detail = {
                status:'购票失败',
                singleLine:false,
                statusColor:'#ACACAC',
                mangLine: true,
                singleBtn:true,
                doubleBtn:false,
                statusContent:"",
                pz:false,   //凭证模块是否显示
                refundMoney:false,
                icon:'retired',
                orderListGroupBtn:{
                    show:false,
                    btnList:{
                        pay: false,
                        delete: false
                    }
                }

            };break;
            case "sell_succeed":detail = {
                status:'待使用',
                singleLine:true,
                statusColor:'#3E3E3E',
                mangLine: false,
                singleBtn:false,
                doubleBtn:false,
                pz:true,   //凭证模块是否显示
                pzDisable: false, //凭证模块是否颜色禁用
                statusContent:"",
                refundMoney:true,
                icon:'paying',
                orderListGroupBtn:{
                    show:false,
                    btnList:{
                        pay: false,
                        delete: true
                    }
                }
            };break;
            case "consume_succeed":detail = {
                status:'已使用',
                singleLine:true,
                statusColor:'#ACACAC',
                mangLine: false,
                singleBtn:false,
                doubleBtn:false,
                pz:true,   //凭证模块是否显示
                pzDisable: true, //凭证模块是否颜色禁用
                pzClass:'used',
                statusContent:"",
                refundMoney:false,
                icon:'used',
                orderListGroupBtn:{
                    show:true,
                    btnList:{
                        pay: false,
                        delete: true
                    }
                }
            };break;
            case "backed":detail = {
                status:'已退款',
                singleLine:false,
                mangLine: true,
                statusColor:'#ACACAC',
                singleBtn:false,
                doubleBtn:false,
                statusContent:"7个工作日内退款返还至您的账户，请耐心等待~",
                pz:true,   //凭证模块是否显示
                pzDisable: true, //凭证模块是否颜色禁用
                pzClass:'backed',
                refundMoney:false,
                icon:'retired',
                orderListGroupBtn:{
                    show:true,
                    btnList:{
                        payment: false, delete:true
                    }
                }
            };break;
            case "backing":detail = {
                status:'退票中',
                singleLine:false,
                statusColor:'#3E3E3E',
                mangLine: true,
                singleBtn:false,
                doubleBtn:false,
                statusContent:"请耐心等待，正在为您退票",
                pz:true,   //凭证模块是否显示
                pzDisable: true, //凭证模块是否颜色禁用
                pzClass:'backing',
                refundMoney:false,
                icon:'paying',
                orderListGroupBtn:{
                    show:false,
                    btnList:{
                        pay: false,
                        delete: false
                    }
                }
            };break;
            case "sell_fail":detail = {
                status:'退票失败',
                singleLine:true,
                mangLine: false,
                singleBtn:true,
                doubleBtn:false,
                statusColor:'#3E3E3E',
                statusContent:"",
                pz:true,   //凭证模块是否显示
                pzDisable: false, //凭证模块是否颜色禁用
                refundMoney:false,
                icon:'retired',
                orderListGroupBtn:{
                    show:false,
                    btnList:{
                        pay: false,
                        delete: false
                    }
                }
            };break;
            case "cancelled":detail = {
                status:'已取消',
                singleLine:true,
                mangLine: false,
                singleBtn:false,
                doubleBtn:false,
                statusColor:'#ACACAC',
                statusContent:"",
                refundMoney:false,
                icon:'retired',
                pz:false,   //凭证模块是否显示
                pzDisable: false, //凭证模块是否颜色禁用
                orderListGroupBtn:{
                    show:false,
                    btnList:{
                        pay: false,
                        delete: false
                    }
                }
            };break;
        }
        return detail;
    },
    formatTime(val){
        var vals =  val.split(":");

        vals[0] = vals[0]<10&&vals[0].length==1?'0'+vals[0]:vals[0];
        vals[1] = vals[1]<10&&vals[1].length==1?'0'+vals[1]:vals[1];
       // console.log("vals",vals.join(":"));
        return vals.join(":")
    },
    numFixed:function(v,n){
        return n=n||2,n=Math.pow(10,n),Math.round(v*n)/n;
    },
    numFixed1:function(v){
        var newv=this.numFixed(v,1);
        return parseInt(newv)==newv?newv+".0":newv;
    },
    getValidate(bookType,travelDate,validDays){
        /**
         * bookType: 预定模式：0 有效期模式；1 预约模式
         */
        var date =  Date.parse1(travelDate);
        if(bookType == 0){
            return date.addDays(1).format("yyyy年MM月dd日")+'之前有效'
        }

        if(validDays == 1){
            return `仅${date.format('yyyy年MM月dd日')}当天有效`;
        }
        var endDate =  new Date(date).addDays(validDays-1);
        return `${date.format('yyyy年MM月dd日')}-${endDate.format('yyyy年MM月dd日')}有效`
    },
    str4Join(str){
        /**
         * 字符串以每四个就加一个空格
         */
        var Str="";
        for(var i = 1; i<=str.length; i++){
            //console.log("i", str[i]);
            if(i%4 === 0){
                Str+=str[i-1]+" "
                continue;
            }
            Str+=str[i-1];
        }
        return Str;
    },
    splitNull(str){
        return str?str.replace(/\s*/g,""):'';
    },
    contrastArray(val){
        return val instanceof Array
    }

}

export {
    redetailSingleData,
    shortcutListData,
    getData,
    getLocation,
    baseUtil,
    Date
}
