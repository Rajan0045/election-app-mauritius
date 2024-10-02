import Constant from "../constant";
import { mainWrapper } from "../main";


function termsAndConditions(params) {
    return mainWrapper.get(Constant.host + `page/terms-conditions`, params);
};

function privacyPolicy(params) {
    return mainWrapper.get(Constant.host + `page/privacy-policy`, params);
};

function aboutUs(params) {
    return mainWrapper.get(Constant.host + `page/about-us`, params);
};

function allianceMeasures(params) {
    return mainWrapper.get(Constant.host + `page/alliance-measures`, params);
};

function requestAndComplaint(params) {
    return mainWrapper.get(Constant.host + `page/request-complaints`, params);
};

const CmsServices = {
    termsAndConditions,
    privacyPolicy,
    aboutUs,
    allianceMeasures,
    requestAndComplaint
};

export default CmsServices;
