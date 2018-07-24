import React from 'react'
import classNames  from 'classnames'
import './index.less'
export default  class Header extends React.Component{
    static defaultProps = {
        prefixCls: 'am-navbar',
        mode: 'dark',
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
            ...restProps
        } = this.props;

        return (
            <div
                {...restProps}
                className={classNames(className, prefixCls, `${prefixCls}-${mode}`)}
            >
                <div
                    className={`${prefixCls}-left`}
                    role="button"
                    onClick={onLeftClick}
                >
                    {icon ? (
                        // tslint:disable-next-line:jsx-no-multiline-js
                        <span className={`${prefixCls}-left-icon`} aria-hidden="true">
              {icon}
            </span>
                    ) : null}
                    {leftContent}
                </div>
                <div className={`${prefixCls}-title`}>{children}</div>
                <div className={`${prefixCls}-right`}>{rightContent}</div>
            </div>
        );
    }
}
