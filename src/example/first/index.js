import './index.scss';
import React, { Component } from "react";
import { render } from "react-dom";
const DOM = document.getElementById("app");

class Hello extends React.Component{
  render(){
    return (<div>
      <p>hello,{this.props.target}</p>
    </div>)
  }
}
const P = () => (
  <div>
    <p>pppp</p>
  </div>
)
const renderDOM = () => {
  render( 
    <div>
      <Hello target="bindy"/>
    </div>
    , DOM);
};

if (module.hot) {
  module.hot.accept([], () => {
    renderDOM()
  });
}
renderDOM();