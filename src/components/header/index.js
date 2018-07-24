import React from 'react'
import { NavBar, Icon } from 'antd-mobile';

const Header =  ()=>{

    return (
        <NavBar
            mode="light"
            icon={<Icon type="left" />}
            onLeftClick={() => console.log('onLeftClick')}
            rightContent={[
                <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
            ]}
        >NavBar</NavBar>
    )
}

export default Header;
