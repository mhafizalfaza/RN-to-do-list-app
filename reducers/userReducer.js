import { SET_USER, LOGOUT } from './constants';

export const initialUserState = null;

export const userReducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        ...action.payload
      }
    case LOGOUT:
      return null
  }
};
