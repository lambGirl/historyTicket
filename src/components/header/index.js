import React from 'react';
import classnames from 'classnames';
import styles from "./index.less";
class Header extends  React.Component{

  //右击
  rightClick(){
        let { rightClick } =  this.props;
        if(rightClick){
            rightClick();
            return;
        }
        return false;
  }
  //左击
  leftClick(){
      let { leftClick } =  this.props;
      if(leftClick){
          leftClick();
          return;
      }
      return false;
  }

  centerClick(){
       if(!this.props.centerClick){
           return;
       }
      this.props.centerClick();
  }

  render(){
    let {parentOutClass,positionType,mode,leftContent, rightContent,centerContentType,ref} =  this.props;
    return  <div ref={ref} className={classnames(styles["header-parent"],{
      [styles["positionAbolute"]]:positionType === 'positionAbolute',
      [styles["positionFixed"]]:positionType === 'positionFixed'
    },parentOutClass)}>
      <div className={classnames(styles['header-common'],{
        [styles["transparent"]]: mode==="transparent"||false,
        [styles["light"]]: mode === 'light',
        [styles["colorE6e6e6"]]: mode === 'colorE6e6e6',
        [styles["common"]]:(mode === 'common'||!mode)||false,
        [styles["none"]]:mode === 'none'
      })}>
        <div  className={styles['left-header']} onClick={this.leftClick.bind(this)}>
         {/* <i className="fa fa-angle-left fa-lg" style={{"color":"#fff"}}></i>*/}
          {leftContent}
        </div>
        <div className={styles['center-header']} onClick={this.centerClick.bind(this)}>
          {
            centerContentType == '1'&&<div className={styles['search-input']}>
              <i className="fa fa-search fa-lg"></i>
              <input type="text" className={styles["searchInputText"]} name='searchAll' placeholder='景点名称'/>
            </div>
          }
          {
            (!centerContentType||!parseInt(centerContentType))&&this.props.children
          }
        </div>
        <div className={styles['right-header']} onClick={this.rightClick.bind(this)}>
         {/* <i className="fa fa-angle-right fa-lg" style={{"color":"#fff"}}></i>*/}
          {rightContent}
        </div>
      </div>
    </div>
  }
}

export default Header;
