import Constant from "../constant";
import { mainWrapper } from "../main";


function getProfileData(params) {
    return mainWrapper.get(Constant.host + ``, params);
};

function updateProfile(params, id) {
    return mainWrapper.post(Constant.host + `voters/update/${id}`, params);
};

const ProfileServices = {
    getProfileData,
    updateProfile
};

export default ProfileServices;
