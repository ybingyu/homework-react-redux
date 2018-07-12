
import './style.css';

import React, { Component } from 'react';
import ColorItem from './ColorItem';
import ColorResult from './ColorResult';

export default class Color extends Component{
  constructor() {
    super();
    this.state = {
      curColor:  'none'
    }
  }
  componentDidMount() {
    this.setState({
      curColor: this.props.bgColors[0] || 'none'
    })
  }
  
  changeColor(color) {
    console.log(color)
    this.setState({
      curColor:color
    })
  }
  render(){
    return (
      <div className="color">
        {this.props.bgColors.map((c,i)=>(<ColorItem bgColor={c} key={i} changeColor={this.changeColor.bind(this)}></ColorItem>))}
        <ColorResult bgColor={this.state.curColor}/>
      </div>
    )
  }
}