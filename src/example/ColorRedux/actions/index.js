import * as actionType from '../actionTypes';

export const ChangeColor=index => {
  // console.log(index)
  return {
    type:actionType.CHANGE_COLOR,
    index
  }}