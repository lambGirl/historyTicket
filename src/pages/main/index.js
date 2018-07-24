import React from 'react';
import { connect } from 'dva';
import styles from '../index.css';
import Router from 'umi/router';
import {Helmet} from "react-helmet";    //用于修改页面的title
function IndexPage() {
    return (
        <div className={styles.normal}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>我是第二个页面</title>
            </Helmet>
            <h1 className={styles.title} onClick={()=>{Router.push("/")}}>Hello, Demo</h1>
        </div>
    );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
