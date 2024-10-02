import { SET_FCM_TOKEN } from "../constant/ReduxConstant";

const initialState = {
  fcmtoken: '',
};

const FcmTokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FCM_TOKEN:
      return Object.assign('', state, {
        fcmtoken: action.payload,
      });
    default:
      return state;
  }
};
export default FcmTokenReducer;
