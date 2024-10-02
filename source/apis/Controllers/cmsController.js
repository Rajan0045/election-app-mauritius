import CmsServices from "../Services/cmsServices";


const termsAndConditions = async (data) => {
    let response = await CmsServices.termsAndConditions(data);
    if (response && response.status) {
        return response
    }
    else {
        return null
    }
};

const privacyPolicy = async (data) => {
    let response = await CmsServices.privacyPolicy(data);
    if (response && response.status) {
        return response
    }
    else {
        return null
    }
};

const aboutUs = async (data) => {
    let response = await CmsServices.aboutUs(data);
    if (response && response.status) {
        return response
    }
    else {
        return null
    }
};

const allianceMeasures = async (data) => {
    let response = await CmsServices.allianceMeasures(data);
    if (response && response.status) {
        return response
    }
    else {
        return null
    }
};

const requestAndComplaint = async (data) => {
    let post = {
        name: data && data.fullName ? data.fullName.trim() : null,
        phonenumber: data && data.phoneNumber ? data.phoneNumber : null,
        topic: data && data.topic && data.topic.title ? data.topic.title.trim() : null,
        department: data && data.department.title ? data.department.title.trim() : null,
        subject: data && data.subject ? data.subject.trim() : null,
        message: data && data.message ? data.message : null
    }
    let response = await CmsServices.requestAndComplaint(post);
    if (response && response.status) {
        return response
    }
    else {
        return response
    }
};


const CmsController = {
    termsAndConditions,
    privacyPolicy,
    aboutUs,
    allianceMeasures,
    requestAndComplaint
};

export default CmsController;
