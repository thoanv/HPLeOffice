import { combineReducers } from "redux";
import numberNotify from './numberNotifyReducer';

const reducers = combineReducers({
    numberNotify: numberNotify
});

export default (state, action) => reducers(state, action);