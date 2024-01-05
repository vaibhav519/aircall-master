import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import App from './App.jsx';

import './css/body.css';
import './css/app.css';
import './css/header.css';
import './css/footer.css';


ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('app'));