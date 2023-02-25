import { createStore, applyMiddleware } from "redux";//createStore deprecated
import rootReducer from "../reducers/index";
import thunk from "redux-thunk"; //Thunk allows us to dispatch actions manually
import { composeWithDevTools } from "redux-devtools-extension";//lo instalo


//aca armo el reducer
//para exportar el reducer hay q crearlo en una variable
const store = createStore(   //createStore is deprecated
  rootReducer, 
  //window.__REDUX_DEVTOOLS_EXTENSION__&& window.__REDUX_DEVTOOLS_EXTENSION__(),
  composeWithDevTools(applyMiddleware(thunk))
);

//exporto la variable reducer
export default store;
