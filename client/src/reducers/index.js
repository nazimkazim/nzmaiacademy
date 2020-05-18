import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import dialogue from "./dialogue";

export default combineReducers({ alert, auth, profile,dialogue });
