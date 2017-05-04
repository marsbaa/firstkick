import React from 'react';
import ReactDOM from 'react-dom';
import router from 'app/router';
var {Provider} = require('react-redux');
var store = require('configureStore').configure();

ReactDOM.render(
  <Provider store={store}>
    {router}
  </Provider>,
  document.getElementById('app')
);
