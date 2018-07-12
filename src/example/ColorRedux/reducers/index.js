import * as actionType from '../actionTypes';
const initState = {
  colors: ['#ff0000', '#00ff00', '#0000ff'],
  index:0
};

export default function (state = initState, action) {
  switch (action.type) {
    case actionType.CHANGE_COLOR:
      return Object.assign({}, state, {
        index: action.index
      })

    default:
      return state;
  }
}