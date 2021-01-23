import React, { Suspense } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import * as serviceWorker from "../serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducer from "../main_redux";
import thunk from "redux-thunk";
import App from "../App";
import "./i18n";

let store = createStore(reducer, applyMiddleware(thunk));

class Root extends React.Component {
  render() {
    return (
      <Suspense fallback={<div>Loading ~~~</div>}>
        <React.Fragment>
          <Provider store={store}>
            <BrowserRouter>
              <App
                current_user={this.props.currentUser}
                true_user={this.props.trueUser}
              />
            </BrowserRouter>
          </Provider>
        </React.Fragment>
      </Suspense>
    );
  }
}

Root.propTypes = {
  currentUser: PropTypes.object,
  trueUser: PropTypes.object,
};

serviceWorker.unregister();

export default Root;
