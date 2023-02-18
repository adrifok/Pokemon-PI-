import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers";
import thunk from "redux-thunk"; //Thunk allows us to dispatch actions manually
import { composeWithDevTools } from "redux-devtools-extension";//lo instalo


//aca armo el reducer
//para exportar el reducer hay q crearlo en una variable
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

//exporto la variable reducer
export default store;
