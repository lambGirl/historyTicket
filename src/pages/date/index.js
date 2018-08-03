import React from 'react'
import Date from '../../components/date/date'
import Header from '../../components/header'
const state =  {
    preSellDays: 200,
    defaultDate: ["2018-08-03"],
    holidays:[{ date:"2018-08-03",
        id:3673,
        name:"国庆节",
        play:1,
        year:2018},
            {
                date:"2018-08-04",
                id:3673,
                name:"情人节",
                play:1,
                year:2018
            }
        ]
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
                     >
           <div style={{"textAlign":"center"}}>日期</div>
       </Header>
        <div style={{"position":"relative",height:"100%"}}>
            <Date
                refs="getDate"
                defaultDate={state.defaultDate || []}
                holidays={state.holidays}
                limitDate={state.preSellDays}
                chooseNumber="1"
                type="single"   //选择单个
                tips={null}
                model='jqmp' // 景区门票显示规则
                DateChange={this.getChangeDate.bind(this)}
                defineClass='defineDateClass'
            />
        </div>
    </div>
}

export default DateIndex;
