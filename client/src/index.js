import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter, Switch } from "react-router-dom";
import { Provider } from "react-redux"; //con el Provider los componentes se conectan a redux
import store from "./store/index.js";

//creo las actions
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <App />
      </Switch>
    </BrowserRouter>,
  </Provider>,

  document.getElementById("root")
);
