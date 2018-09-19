import React from 'react'
import Router from 'umi/router'
import ClassNames  from 'classnames';
import { Carousel } from 'antd-mobile';
import Styles from './index.less'
import { connect } from 'dva'
import { baseUtil } from "../../utils/util";
@connect(({ticketDetail,loading})=>({
    ticketDetail,
    loading
}))

export default class ShowPhotos extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            slideIndex:2,
        }
    }
    componentDidMount(){
        let {index} =  Router.location.query;
        this.setState({
            "slideIndex": index
        })
    }

    reback(){
        window.history.go(-1);
    }

    render(){
        let _this =  this;
        let {images} =  this.props.ticketDetail.ticketDetail
        return <div className={Styles['photos_model']} onClick={this.reback.bind(this)}>
                <div className={Styles['photos_center_show']}>
                    <div className={Styles['photos_marks']}>{parseInt(this.state.slideIndex)+1}/{images.length}</div>
                    <Carousel
                        autoplay={false}
                        infinite={false}
                        dots={false}
                        className={Styles['photosCarousel']}
                        selectedIndex={this.state.slideIndex}
                        beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                        afterChange={index => {this.setState({"slideIndex": index})}}
                    >
                        {images.map((val, index) => (
                            <a
                                key={val + index}
                                href="javascript:;"
                                className={Styles['swiper-single-a']}
                                style={{ display: 'inline-block'}}
                            >
                                <img
                                    src={baseUtil.replaceImgUrl(val)}
                                    alt=""
                                    onLoad={() => {
                                        // fire window resize event to change height
                                    /*    window.dispatchEvent(new Event('resize'));*/
                                      /*  this.setState({ imgHeight: 'auto' });*/
                                    }}
                                   /* style={{    "maxHeight":"15.562rem",
                                        "width": "auto"}}*/
                                />
                            </a>
                        ))}
                    </Carousel>
                </div>
        </div>
    }
}
