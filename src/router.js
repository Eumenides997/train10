import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Products from './components/Products'
import ProductsEdit from './components/ProductsEdit'

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        {/* <Route path="/" exact component={IndexPage} /> */}
        <IndexPage path='/' component={IndexPage}>
          <Route path="/Products" exact component={Products} />
          <Route path="/ProductsEdit" exact component={ProductsEdit} />
        </IndexPage>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
