import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension/logOnlyInProduction'
var {learningSpaceReducer} = require('reducers');

export var configure = (initialState = {}) => {
  var reducer = combineReducers({
    learningSpace: learningSpaceReducer});
    var store = createStore(reducer, initialState, composeWithDevTools(
      applyMiddleware(thunk)
    ));

    return store;
  };
