import { VOTER_LIST_FILTER } from "../constant/ReduxConstant";

const initialState = {
    filters: {
        constituency: null,
        polling: null,
        party: null,
        religion: null
    },
};

const VoterFilterReducer = (state = initialState, action) => {
    switch (action.type) {
        case VOTER_LIST_FILTER:
            return Object.assign({}, state, {
                filters: action.payload,
            });
        default:
            return state;
    }
}

export default VoterFilterReducer;