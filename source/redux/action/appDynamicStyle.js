import { SET_APP_STYLE_DATA } from "../constant/ReduxConstant";


export const setAppDynamicStyleData = param => {
    return {
        type: SET_APP_STYLE_DATA,
        payload: param,
    };
};