import Constant from "../constant";
import { mainWrapper } from "../main";


function authInitialState(params) {
    return mainWrapper.post(Constant.host + "auth/auth-state", params);
};

function setPinCode(params) {
    return mainWrapper.post(Constant.host + "auth/setup-pin", params);
};

function verifyPinCode(params) {
    return mainWrapper.post(Constant.host + "auth/enter-pin", params);
};

function login(params) {
    return mainWrapper.post(Constant.host + "auth/login", params);
};

function phoneVerificationOtp(params, token) {
    return mainWrapper.post(Constant.host + `auth/second-auth/${token}`, params);
};

function resendOTP(token) {
    return mainWrapper.post(Constant.host + `auth/resend-otp/${token}`, );
};

function logout() {
    return mainWrapper.post(Constant.host + ``);
};

function updateProfile(params) {
    return mainWrapper.post(Constant.host + `auth/update-profile`, params);
};

const AuthServices = {
    authInitialState,
    setPinCode,
    verifyPinCode,
    login,
    phoneVerificationOtp,
    resendOTP,
    logout,
    updateProfile
};



export default AuthServices;
