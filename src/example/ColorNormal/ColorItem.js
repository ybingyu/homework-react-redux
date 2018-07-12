
import React, { Component } from 'react';
export default class ColorItem extends Component{
  static id = 0;
  handlerClick(e){
    this.props.changeColor(this.props.bgColor)
  }
  render(){
    ColorItem.id++;
    return (
      <div className="color-item" style={{background:this.props.bgColor}} key={ColorItem.id} onClick={this.handlerClick.bind(this)}>{this.props.bgColor}</div>
    )
  }
}