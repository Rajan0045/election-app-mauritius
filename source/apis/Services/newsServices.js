import Constant from "../constant";
import { mainWrapper } from "../main";


function getNewsList(params) {
    return mainWrapper.get(Constant.host + `blogs`, params);
};

function getNewsDetail(params) {
    return mainWrapper.get(Constant.host + ``, params);
};

function getCategoryListing(params) {
    return mainWrapper.get(Constant.host + `blogs/filters`, params);
};


const NewsServices = {
    getNewsList,
    getNewsDetail,
    getCategoryListing
};

export default NewsServices;
