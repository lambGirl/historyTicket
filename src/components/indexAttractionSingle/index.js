import React from 'react'
import classnames from 'classnames'
import styles from './index.less'
export default class AttractTionSingle extends React.Component{
    render (){
        return <div className={styles['ticketsList']}>
            <img src='https://p0.meituan.net/400.0/travel/9172c05e9077f176ccec489278c553a4149430.jpg'/>
            <div>
                <p>克罗地亚之海</p>
                <div>
                    <div>双流，距我79km</div>
                    <div>
                        <span className={classnames(styles["font20"], styles["color_F60"])}>¥</span>
                        <span className={classnames(styles["font40"], styles["color_F60"])}>9346</span>
                        <span className={classnames(styles["font20"], styles["color_fff"])}>起</span>
                    </div>
                </div>
            </div>
        </div>
    }
}
