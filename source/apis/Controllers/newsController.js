import NewsServices from "../Services/newsServices";


const getNewsList = async (data) => {
    let response = await NewsServices.getNewsList(data);
    if (response && response.status) {
        return response
    }
    else {
        return null
    }
};


const getNewsDetail = async () => {
    let response = await NewsServices.getNewsDetail();
    if (response && response.status) {
        return response
    }
    else {
        return null
    }
};


const getCategoryListing = async () => {
    let response = await NewsServices.getCategoryListing();
    if (response) {
        return response
    }
    else {
        return null
    }
};


const NewsController = {
    getNewsList,
    getNewsDetail,
    getCategoryListing
};

export default NewsController;