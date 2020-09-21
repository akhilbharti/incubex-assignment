import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/App";
import * as serviceWorker from "./serviceWorker";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import configureStore from "./store";

import theme from "./utils/theme";
import GlobalStyle from "./utils/globals";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <React.StrictMode>
        <>
          <App />
          <GlobalStyle />
        </>
      </React.StrictMode>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
