import React from 'react';
import classnames from 'classnames';
import styles from "./index.less";
class Header extends  React.Component{
  render(){
    let {parentOutClass,positionType,mode,leftContent, rightContent,centerContentType} =  this.props;
    return  <div className={classnames(styles["header-parent"],{
      [styles["positionAbolute"]]:positionType == 'positionAbolute'
    },parentOutClass)}>
      <div className={classnames(styles['header-common'],{
        [styles["transparent"]]: mode=="transparent"||false,
        [styles["light"]]: mode == 'light',
        [styles["common"]]:(mode == 'common'||!mode)||false,
        [styles["none"]]:mode == 'none'
      })}>
        <div  className={styles['left-header']}>
         {/* <i className="fa fa-angle-left fa-lg" style={{"color":"#fff"}}></i>*/}
          {leftContent}
        </div>
        <div className={styles['center-header']}>
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
        <div className={styles['right-header']}>
         {/* <i className="fa fa-angle-right fa-lg" style={{"color":"#fff"}}></i>*/}
          {rightContent}
        </div>
      </div>
    </div>
  }
}

export default Header;
