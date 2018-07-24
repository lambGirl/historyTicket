import React from 'react';
import { connect } from 'dva';
import router from 'umi/router'
import styles from './index.css';
import {Helmet} from "react-helmet";    //用于修改页面的title

const IndexPage = ({globalAct, dispatch})=> {
  //  console.log("argument", arguments);
  return (
    <div className={styles.normal}>
      <Helmet>
          <meta charSet="utf-8" />
          <title>首页</title>
          {/*<link rel="canonical" href="http://mysite.com/example" />*/}
      </Helmet>
      <h1 className={styles.title} onClick={()=>{router.push("/city")}}>
         Yay! Welcome to dva!111111111111
      </h1>
      <div className={styles.welcome} />
      <ul className={styles.list}>
            <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
          <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
          <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
          <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
          <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
          <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
          <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
          <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
          <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
          <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
          <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
          <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
          <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
          <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
          <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
          {/*<li  onClick={()=>{dispatch({
              type:"globalAct/fetch",
              payload:{
                  id:"1"
              }
          })}}>Getting Started</li>*/}
      </ul>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect(({globalAct,dispatch})=>({globalAct,dispatch}))(IndexPage);
