import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import {
  composeWithDevTools
} from 'redux-devtools-extension/logOnlyInProduction';
var {
  learningSpaceReducer,
  fetchingReducer,
  studentReducer,
  learningAgreementReducer,
  gradeReducer
} = require('reducers');

export var configure = (initialState = {}) => {
  var reducer = combineReducers({
    learningSpaces: learningSpaceReducer,
    students: studentReducer,
    isFetching: fetchingReducer,
    learningAgreements: learningAgreementReducer,
    grade: gradeReducer
  });
  var store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
  );

  return store;
};
