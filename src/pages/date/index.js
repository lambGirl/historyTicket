import React from 'react'
import { Date } from 'tz_mobile'
import Header from 'tz_mobile/lib/header'
const state =  {
    preSellDays: 200,
    defaultDate: [],
    holidays:[]
}
const DateIndex =  ()=>{

    this.getChangeDate = (date)=>{
        console.log("arguments", arguments);
    }
    this.rightClick = ()=>{
        console.log("rightClick 被点击")
    }
    return <div style={{height:"100%"}}>
        {/*<Header   />*/}
       <Header      mode="light"
                     leftContent={<i className="fa fa-angle-left fa-lg"></i>}
                     onLeftClick={() => window.history.go(-1)}
                     >日期</Header>
        <div style={{"position":"relative",height:"100%"}}>
            <Date
                refs="getDate"
                defaultDate={state.defaultDate || []}
                holidays={state.holidays}
                limitDate={state.preSellDays}
                chooseNumber="1"
                type="single"   //选择单个
                tips={null}
                DateChange={this.getChangeDate.bind(this)}
                defineClass='defineDateClass'
            />
        </div>
    </div>
}

export default DateIndex;
