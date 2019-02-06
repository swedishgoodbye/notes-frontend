import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { Reducer } from "./reducers";
import logger from "redux-logger";
import thunk from "redux-thunk";
//import { BrowserRouter as Router } from 'react-router-dom';
import "./index.css";
import App from "./App";

// Render method for React without Redux...

// ReactDOM.render(
//   <div className="MainApp">
//     <App />
//   </div>
// , document.getElementById('root'));

// Redux Dev Tools

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, logger));

// ================== END Redux Dev Tools

const store = createStore(Reducer, enhancer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
