import React from 'react'
import Router from 'umi/router'
import ClassNames  from 'classnames';
import { Carousel } from 'antd-mobile';
import Styles from './index.less'
export default class ShowPhotos extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            slideIndex:2,
            data:[]
        }
    }
    componentDidMount(){
        setTimeout(() => {
            this.setState({
                data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
            });
        }, 100);
    }

    reback(){
        window.history.go(-1);
    }

    render(){
        let _this =  this;
        return <div className={Styles['photos_model']} onClick={this.reback.bind(this)}>
                <div className={Styles['photos_center_show']}>
                    <div className={Styles['photos_marks']}>{parseInt(this.state.slideIndex)+1}/{this.state.data.length}</div>
                    <Carousel
                        autoplay={false}
                        infinite
                        dots={false}
                        className={Styles['photosCarousel']}
                        selectedIndex={this.state.slideIndex}
                        beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                        afterChange={index => {this.setState({"slideIndex": index})}}
                    >
                        {this.state.data.map((val, index) => (
                            <a
                                key={val + index}
                                href="javascript:;"
                                className={Styles['swiper-single-a']}
                            >
                                <img
                                    src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                                    alt=""
                                    onLoad={() => {
                                        // fire window resize event to change height
                                        window.dispatchEvent(new Event('resize'));
                                        this.setState({ imgHeight: 'auto' });
                                    }}
                                />
                            </a>
                        ))}
                    </Carousel>
                </div>
        </div>
    }
}
