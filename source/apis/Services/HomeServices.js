import Constant from "../constant";
import { mainWrapper } from "../main";


function getVoterListing(params) {
    return mainWrapper.get(Constant.host + `voters`, params);
};

function getFilterData(params) {
    return mainWrapper.get(Constant.host + `voters/filters`, params);
};

function getUpdateProfleData(params) {
    return mainWrapper.get(Constant.host + `voters/modal-data`, params);
};

function updateVoteStatus(params, id) {
    return mainWrapper.post(Constant.host + `voters/vote/${id}`, params);
};


const HomeServices = {
    getVoterListing,
    getFilterData,
    getUpdateProfleData,
    updateVoteStatus
};

export default HomeServices;
