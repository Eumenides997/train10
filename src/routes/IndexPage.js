import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import App from '../components/App'
import 'antd/dist/antd.css'

function IndexPage() {
  return (
    <App />
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
