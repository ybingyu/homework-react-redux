import React,{ Component } from 'react';
import { connect } from 'react-redux';

function ColorResult({
  bgColor
}){
  return (<div className="color-result" style={{backgroundColor:bgColor}}></div>)
}

const mapStateToProps = (state, props) => ({
  bgColor: state.colors[state.index] || 'none'
}
);

const mapDispatchToProps = (dispatch, props) => (
  {}
);


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ColorResult);