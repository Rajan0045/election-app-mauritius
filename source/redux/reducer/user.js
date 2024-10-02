import { SET_USER_DATA } from "../constant/ReduxConstant";

const initialState = {
  user: {},
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return Object.assign({}, state, {
        user: action.payload,
      });
    default:
      return state;
  }
}

export default UserReducer;