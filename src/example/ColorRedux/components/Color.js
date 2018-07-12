
import './style.css';

import React, { Component } from 'react';
import ColorItem from './ColorItem';
import ColorResult from './ColorResult';

export default class Color extends Component{
  render(){
    const {
      onChangeColor,
      colors,
      curColor
    } = this.props;
    return (
      <div className="color">
        {colors.map((c,i)=>(<ColorItem bgColor={c} index={i} key={i} onChangeColor={onChangeColor}></ColorItem>))}
        <ColorResult bgColor={curColor}/>
      </div>
    )
  }
}