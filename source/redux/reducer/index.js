import { combineReducers } from "redux";
import UserReducer from "./user";
import FcmTokenReducer from "./fcm";
import NotifyReducer from "./notify";
import VoterFilterReducer from "./voterListFilter";
import AppDynamicStyleReducer from "./appDynamicStyleReducer";


const appReducer = combineReducers({
  AppDynamicStyleReducer,
  UserReducer,
  FcmTokenReducer,
  NotifyReducer,
  VoterFilterReducer
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;