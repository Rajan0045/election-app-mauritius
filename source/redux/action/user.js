import { SET_API_TOKEN, SET_FCM_TOKEN, SET_INTERNET, SET_IN_APP_NOTIFICATION, SET_LOCATION, SET_LOCATION_STATUS, SET_NOTIFY, SET_PUBLIC_KEY, SET_USER_DATA } from "../constant/ReduxConstant";

export const setUserData = param => {
  return {
    type: SET_USER_DATA,
    payload: param,
  };
};

export const setAPIToken = param => {
  return {
    type: SET_API_TOKEN,
    payload: param,
  };
};

export const setFCMToken = param => {
  return {
    type: SET_FCM_TOKEN,
    payload: param,
  };
};

export const setNotification = param => {
  return {
    type: SET_NOTIFY,
    payload: param,
  };
};

export const setLocation = param => {
  return {
    type: SET_LOCATION,
    payload: param,
  };
};

export const setLocationStatus = param => {
  return {
    type: SET_LOCATION_STATUS,
    payload: param,
  };
};

export const setInternet = param => {
  return {
    type: SET_INTERNET,
    payload: param,
  };
};

export const setInAppNotification = param => {
  return {
    type: SET_IN_APP_NOTIFICATION,
    payload: param,
  };
};


