import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import reducers from "./reducers";

export default function configureStore() {
  const middlewares = [thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);

  const store = createStore(reducers, composedEnhancers);
  // if (process.env.NODE_ENV !== "production" && module.hot) {
  //   module.hot.accept("./reducers", () => store.replaceReducer(reducers));
  // }
  return store;
}
