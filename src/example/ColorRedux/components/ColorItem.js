
import React, { Component } from 'react';
export default class ColorItem extends Component{
  handlerClick(e){
    this.props.onChangeColor(this.props.index)
  }
  render(){
    
    return (
      <div className="color-item" style={{background:this.props.bgColor}} key={this.props.index} onClick={this.handlerClick.bind(this)}>{this.props.bgColor}</div>
    )
  }
}