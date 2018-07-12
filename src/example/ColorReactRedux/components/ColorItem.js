
import React, { Component } from 'react';
const ColorItem = ({ onClick, bgColor,index }) => (
  <div className="color-item" style={{background:bgColor}} onClick={() => onClick(index)}>{bgColor}</div>
);
export default ColorItem;


