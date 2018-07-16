import * as actionType from '../actionTypes';
import { handleActions } from 'redux-actions';

const initState = {
  colors: ['#ff0000', '#00ff00', '#0000ff'],
  index: 0
};


export default handleActions(
  {
    [actionType.CHANGE_COLOR]: (state, action) => {
      return Object.assign({}, state, {
        index: action.payload
      })
    }
  },
  initState
)