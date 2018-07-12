import React,{Component} from 'react';

export default class ColorReault extends Component{
  render(){
    return (<div className="color-result" style={{background:this.props.bgColor}}></div>)
  }
}