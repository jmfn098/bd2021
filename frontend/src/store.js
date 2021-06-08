import { createStore, combineReducers } from "redux";
import authReducer from "./reducers/auth.reducer";

const initialState = "responsive";
const changeState = (state = initialState, action) => {
  switch (action.type) {
    case "set":
      return action.sidebarShow;
    default:
      return state;
  }
};
const rootReducer = combineReducers({
  sidebarShow: changeState,
  user: authReducer,
});

const store = createStore(rootReducer);
window.store = store;

export default store;
