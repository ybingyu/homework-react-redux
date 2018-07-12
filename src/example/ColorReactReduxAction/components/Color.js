
import './style.css';

import React, { Component } from 'react';
import ColorResult from '../containers/ColorResult';
import ColorItemList from '../containers/ColorItemList';

export default class Color extends Component{
  render(){
    return (
      <div className="color">        
        <ColorItemList />
        <ColorResult />
      </div>
    )
  }
}