import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Color from './components/Color';
import { createStore } from 'redux';
// import { ChangeColor } from './actions';
import reducers from './reducers';



const store = createStore(reducers);
const DOM = document.getElementById('app');




const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Color/>
    </Provider>,
    DOM
  );
};
render();
