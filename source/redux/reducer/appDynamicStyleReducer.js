import { SET_APP_STYLE_DATA } from "../constant/ReduxConstant";

const initialState = {
   styles : null
};

const AppDynamicStyleReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_APP_STYLE_DATA:
            return Object.assign({}, state, {
                styles: action.payload,
            });
        default:
            return state;
    }
}

export default AppDynamicStyleReducer;