import { VOTER_LIST_FILTER } from "../constant/ReduxConstant";

export const setVoterListFilters = param => {
    return {
        type: VOTER_LIST_FILTER,
        payload: param,
    };
};