import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { Container } from 'reactstrap';

import store from "./redux/store";
import Landing from "./components/Landing";
import ProductsList from "./containers/ProductsList";
import ProductDetails from "./containers/ProductDetails";
import Header from "./containers/Header";

const App = () =>
  <Router>
    <Provider store={store}>
      <div className="app">
        <Header />
        <Container fluid className="m-3">
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/:category" component={props => <ProductsList {...props} />} />
          <Route path="/products/:id" component={props => <ProductDetails {...props} />} />
          <Route render={() => <h1>Page not Found</h1>} />
        </Switch>
        </Container>
      </div>
    </Provider>
  </Router>;

export default App;
