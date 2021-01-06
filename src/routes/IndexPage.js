import React from 'react';
import { connect } from 'dva';
import App from '../components/App'
import 'antd/dist/antd.css'

function IndexPage(props) {
  return (
    <div>
      <App  {...props} />
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
