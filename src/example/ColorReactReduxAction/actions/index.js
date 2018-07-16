import * as actionType from '../actionTypes';
import { createAction, createActions } from "redux-actions";

export const ChangeColor = createAction(actionType.CHANGE_COLOR,index=>index)