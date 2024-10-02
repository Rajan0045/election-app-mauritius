import { setVoterListFilters } from "../../redux/action/votertListFilters";
import store from "../../redux/store";
import HomeServices from "../Services/HomeServices";


const getVoterList = async (data) => {
    let response = await HomeServices.getVoterListing(data);
    if (response && response.status) {
        return response
    }
    else {
        return null
    }
};

const getFilterData = async (data) => {
    let response = await HomeServices.getFilterData(data);
    if (response && response) {
        return response
    }
    else {
        return null
    }
};

const getUpdateProfleData = async (data) => {
    let response = await HomeServices.getUpdateProfleData(data);
    if (response && response) {
        return response
    }
    else {
        return null
    }
};

const updateVoteStatus = async (id) => {
    let post = {
        vote: 1
    }
    let response = await HomeServices.updateVoteStatus(post, id);
    if (response && response) {
        return response
    }
    else {
        return null
    }
};

const setVoterListFilter = async (data) => {
    await store.dispatch(setVoterListFilters(data));
};


const HomeController = {
    getVoterList,
    setVoterListFilter,
    getFilterData,
    getUpdateProfleData,
    updateVoteStatus
};

export default HomeController;