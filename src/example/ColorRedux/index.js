import React from 'react';
import ReactDOM from 'react-dom';
import Color from './components/Color';
import { createStore } from 'redux';
import { ChangeColor } from './actions';
import reducers from './reducers';



const store = createStore(reducers);
const DOM = document.getElementById('app');

console.log(store.getState())

// 监听 store 变化
const unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)

const render = () => {
  const state = store.getState();
  ReactDOM.render(
    <Color
    curColor={state.colors[state.index]}
      colors={state.colors}
      onChangeColor={index => store.dispatch(ChangeColor(index))}
    />,
    DOM
  );
};

render();
store.subscribe(render);