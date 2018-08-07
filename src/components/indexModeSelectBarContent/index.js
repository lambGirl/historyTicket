import React from 'react'
import classnames from 'classnames'
import Styles from './index.less'

export  default class IndexModelSelectBar extends React.Component{
    componentDidMounted(){
        let {barClick} =  this.props;
     //   console.log("----------------------",barClick );
    }
    selectItem(item,e){
        e.preventDefault();
        e.stopPropagation();
        let {selectBarData, barClick} =  this.props;
       if(item){
           // console.log("parentType", item);
            selectBarData[item.parentType].activeIndex = item.index
            barClick(selectBarData);
        }
        barClick();
    }

    render(){
        let {selectBarData, barClick} =  this.props,
        parentType = "";
        Object.keys(selectBarData).forEach((item)=>{
            if(selectBarData[item].parentIndex){
                parentType = item;
            }
        });
      //  console.log("parentType",selectBarData[parentType]);
       // return <div></div>

        return <div className={Styles['selectModelContent']} >
            <div className={Styles['selectModelListArr']} onClick={this.selectItem.bind(this)}>
                {/*<div className={classnames(Styles['selectModelList-single'],{
                    [Styles["active"]]:true
                })}>
                    <div>全城</div>
                    <div>√</div>
                </div>
                <div className={classnames(Styles['selectModelList-single'],{
                    [Styles["active"]]:false
                })}>
                    <div>武侯区</div>
                    <div>√</div>
                </div>*/}
                {
                    selectBarData[parentType].data.map((item,index)=>{
                        return (<div className={classnames(Styles['selectModelList-single'],{
                            [Styles["active"]]:selectBarData[parentType].activeIndex == index
                        })} key={index} onClick={this.selectItem.bind(this, {index, parentType})}>
                            <div >{item.cityName}</div>
                            {selectBarData[parentType].activeIndex == index&&<div>√</div>}
                        </div>)
                    })
                }
            </div>
        </div>
    }
};
