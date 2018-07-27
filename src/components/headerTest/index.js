import React from 'react'
import classNames  from 'classnames'
import Styles from './index.less'
export default  class Header extends React.Component{
    static defaultProps = {
        prefixCls: 'am-navbar',
        mode: '',
        onLeftClick: () => {},
    };
    render(){
        const {
            prefixCls,
            className,
            children,
            mode,
            icon,
            onLeftClick,
            leftContent,
            rightContent,
            classModel,
            ...restProps
        } = this.props;
       // console.log("classNameModel",classModel);
        return (
            <div
                {...restProps}
                className={classNames(Styles[prefixCls],Styles[`${prefixCls}-${mode}`],classModel)}
            >
                <div
                    className={Styles[`${prefixCls}-left`]}
                    role="button"
                    onClick={onLeftClick}
                >
                   {leftContent}
                </div>
                <div className={Styles[`${prefixCls}-title`]}>{children}</div>
                <div className={Styles[`${prefixCls}-right`]}>{rightContent}</div>
            </div>
        );
    }
}
