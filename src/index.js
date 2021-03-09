import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './component/App';
import Login from "./component/Auth/Login";
import Register from "./component/Auth/Register";
import reportWebVitals from './reportWebVitals';
import "semantic-ui-css/semantic.min.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from "react-router-dom";

import { createStore } from "redux";
import { Provider, connect } from "react-redux";
import rootReducer from "./reducers";
import { setUser,clearUser } from "./actions";
import firebase from "./firebase";
import Spinner from "./Spinner"
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const store = createStore(rootReducer);
window.store=store;

class Root extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user);
        this.props.setUser(user);
        this.props.history.push("/");
      } else {
        this.props.history.push("/login");
        this.props.clearUser();
      }
    });
  }

  render() {
    return this.props.isLoading ? (
      <Spinner />
    ) : (
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    );
  }
}
const mapStateFromProps = state => ({
  isLoading: state.user.isLoading
});

const RootWithAuth = withRouter(
  connect(mapStateFromProps,
    { setUser,clearUser }
  )(Root)
);

ReactDOM.render(
<Provider store={store}>
  <Router>
    <RootWithAuth />
  </Router>
</Provider>, document.getElementById("root"));
reportWebVitals();
