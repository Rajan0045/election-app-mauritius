import ProfileServices from "../Services/profileServices";


const getProfileData = async () => {
    let response = await ProfileServices.getProfileData();
    if (response && response.status) {
        return response
    }
    else {
        return null
    }
};

const updateProfile = async (data, id) => {
    let post = {
        party: data && data.party && data.party.title ? data.party.title : null,
        religion: data && data.religion && data.religion.slug ? data.religion.slug : null,
        identity_number: data && data.identificationId ? data.identificationId : null,
        phonenumber: data && data.phoneNumber ? data.phoneNumber : null,
    };
    let response = await ProfileServices.updateProfile(post, id);
    if (response && response.status) {
        return response
    }
    else {
        return null
    }
};

const ProfileController = {
    getProfileData,
    updateProfile
};

export default ProfileController;