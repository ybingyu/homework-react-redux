
import React,{ Component } from 'react';
import { connect } from 'react-redux';
import {ChangeColor} from '../actions';
import ColorItem from '../components/ColorItem';

function ColorItemList({
  onChangeColor,
  colors
}){
  return (
    <div>
      {colors.map((c,i)=>(<ColorItem bgColor={c} index={i} key={i} onClick={onChangeColor}></ColorItem>))}
    </div>
    )
}

const mapStateToProps = (state, props) => ({
  colors: state.colors
});

const mapDispatchToProps = (dispatch, props) => (
   {
    onChangeColor: (index) => {
      console.log(index);
      dispatch(ChangeColor(index))
    }
  }
);


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ColorItemList);