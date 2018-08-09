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
Date.parse1=Date.parseTimeStr;

class Singer{
    constructor({cityNo,cityName,parentRegion,chidrens}) {
        this.cityNo = cityNo;
        this.cityName = cityName,
        this.parentRegion = parentRegion,
        this.chidrens = chidrens||[]
    }
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
                parentRegion: item.parentRegion,
                chidrens:item.chidrens||[]
            }));
        } else {
            map.other.items.push(new Singer({
                cityNo: item.cityNo,
                cityName: item.cityName,
                parentRegion: item.parentRegion,
                chidrens:item.chidrens||[]
            }))
        }
    }
    let ret = [];
    for (let key in map) {
        let val = map[key];
        if (val.title.match(/[a-zA-Z]/)) {
            ret.push(val)
        }
    }
    ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
    });
    return [...ret];
}

//得到大小写数据
const shortcutListData = (list)=>{
    let List = ["定"];
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
const getLocation  =  ()=>{
    var mapObj = new AMap.Map('iCenter'),geolocation='', promise='';
    return promise =  new Promise ((resolve,reject)=>{
            mapObj.plugin('AMap.Geolocation', function () {
                geolocation = new AMap.Geolocation({
                    enableHighAccuracy: true,//是否使用高精度定位，默认:true
                    timeout: 5000,          //超过10秒后停止定位，默认：无穷大
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
const baseUtil = {
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
    getHours(num){
        /**
         * 设置多少小时可以用
         */
        var hour =  parseInt(num/60); //多少小时
        var min =  num-hour*60; //分钟
        return `${hour&&hour+"小时"||""}${min&&min+"分钟"}`
    },
    productRefundRule(tag){
        let val = "";
        //console.log("val",tag);
        switch (tag){
            case "1":val='随时可退，过期自动退';
                    break;
            case "2":val='退票收取手续费';
                break;
            case "3":val='购买后不可退票';
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
                status:'下单中',
                doubleBtn:false,
                singleBtn:false,
                statusContent:"",
                refundMoney:false,
                icon:'paying'
            };break;
            case "book_succeed":detail = {
                status:'待支付',
                singleLine:false,
                mangLine: true,
                doubleBtn:true,
                statusContent:"",
                refundMoney:false,
                icon:'paying'
            };break;
            case "selling":detail = {
                status:'购票中',
                singleLine:false,
                mangLine: true,
                doubleBtn:false,
                singleBtn:false,
                statusContent:"请耐心等待，抢到票后会第一时间告诉你",
                refundMoney:false,
                icon:'paying'
            };break;
            case "sell_succeed":detail = {
                status:'待使用',
                singleLine:true,
                mangLine: false,
                singleBtn:false,
                doubleBtn:false,
                statusContent:"",
                refundMoney:true,
                icon:'paying'
            };break;
            case "consume_succeed":detail = {
                status:'已使用',
                singleLine:true,
                mangLine: false,
                singleBtn:false,
                doubleBtn:false,
                statusContent:"",
                refundMoney:false,
                icon:'useing'
            };break;
            case "backed":detail = {
                status:'已退票',
                singleLine:true,
                mangLine: false,
                singleBtn:false,
                doubleBtn:false,
                statusContent:"",
                refundMoney:false,
                icon:'used',
            };break;
            case "backing":detail = {
                status:'退票中',
                singleLine:true,
                mangLine: false,
                singleBtn:false,
                doubleBtn:false,
                statusContent:"",
                refundMoney:false,
                icon:'paying'
            };break;
            case "sell_fail":detail = {
                status:'退票失败',
                singleLine:true,
                mangLine: false,
                singleBtn:true,
                doubleBtn:false,
                statusContent:"",
                refundMoney:false,
                icon:'retired'
            };break;
            case "cancelled":detail = {
                status:'已取消',
                singleLine:true,
                mangLine: false,
                singleBtn:false,
                doubleBtn:false,
                statusContent:"",
                refundMoney:false,
                icon:'retired'
            };break;
        }
        return detail;
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
