import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Products from './components/Products'
import ProductsEdit from './components/ProductsEdit'
import Login from './components/Login'

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/Login" exact component={Login} />
        {/* <Route path="/" exact component={IndexPage} /> */}
        <IndexPage path='/' component={IndexPage}>
          <Route path="/Products" exact component={Products} />
          <Route path="/ProductsEdit" exact component={ProductsEdit} />
          <Route path="/ProductsTags" exact component={ProductsEdit} />
        </IndexPage>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
