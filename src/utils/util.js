class Singer{
    constructor({id,name,mid}) {
        this.id=id;
        this.mid=mid;
        this.name=name;
        this.avatar = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${mid}.jpg?max_age=2592000`;
    }
}
//得到城市数据
const redetailSingleData = (list)=>{
    const HOT_NAME = '热门';
    const HOT_SINGER_LEN = 10;
    let map = {
        hot: {
            title: HOT_NAME,
            items: []
        },
        other: {
            title: '其他',
            items: []
        }
    };

    for (let [index,item] of Array.entries(list)) {
//                   热门
        if (index < HOT_SINGER_LEN) {
            map.hot.items.push(new Singer({
                id: item.Fsinger_id,
                name: item.Fsinger_name,
                mid: item.Fsinger_mid
            }));
        }
//                  a-z
        if (!map[item.Findex] && /[a-zA-Z]/.test(item.Findex)) {
            map[item.Findex] = {
                title: item.Findex,
                items: []
            }
        }
        if (/[a-zA-Z]/.test(item.Findex)) {
            map[item.Findex].items.push(new Singer({
                id: item.Fsinger_id,
                name: item.Fsinger_name,
                mid: item.Fsinger_mid
            }));
        } else {
            map.other.items.push(new Singer({
                id: item.Fsinger_id,
                name: item.Fsinger_name,
                mid: item.Fsinger_mid
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
    //console.log("redetailSingleData",map);
    return [map.hot, ...ret, map.other];
}

//得到大小写数据
const shortcutListData = (list)=>{
    return list.map(group => group.title.substr(0, 1))
}

export {
    redetailSingleData,
    shortcutListData
}
