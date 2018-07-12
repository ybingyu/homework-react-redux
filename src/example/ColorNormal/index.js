import React from 'react';
import ReactDOM from 'react-dom';
import Color from './Color';

const DOM = document.getElementById('app');

ReactDOM.render(<Color bgColors={['#ff0000','#00ff00','#0000ff'] }/>, DOM);
