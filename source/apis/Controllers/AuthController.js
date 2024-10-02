import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { setFCMToken, setUserData } from "../../redux/action/user";
import store from "../../redux/store";
import AuthServices from "../Services/AuthServices";
import { navigate } from "../../../App";


const authInitialState = async (token) => {
    let response = await AuthServices.authInitialState(token);
    if (response && response.status) {
        return response;
    } else {
        return response;
    }
};


const setPinCode = async (data) => {
    let post = {
        pin: data && data.pinCode ? data.pinCode : null,
        confirm_pin: data && data.pinCode ? data.pinCode : null,
    };
    let response = await AuthServices.setPinCode(post);
    if (response && response.status) {
        return response;
    } else {
        return response;
    }
};

const verifyPinCode = async (data) => {
    let post = {
        pin: data && data.pinCode ? data.pinCode : null,
    };
    let response = await AuthServices.verifyPinCode(post);
    if (response && response.status) {
        return response;
    } else {
        return response;
    }
};

const login = async (data) => {
    let post = {
        phonenumber: data && data.phoneNumber ? data.phoneNumber : null,
    };
    let response = await AuthServices.login(post);
    if (response && response.status) {
        return response;
    } else {
        return response;
    }
};

const phoneVerifyOtp = async (data, token) => {
    let post = {
        otp: data && data.otp ? data.otp : null,
        device_id: '1234',
        device_type: 'android',
        fcm_token: null,
    };
    let response = await AuthServices.phoneVerificationOtp(post, token);
    if (response && response.status) {
        return response;
    } else {
        return response;
    }
};

const resendOTP = async (token) => {
    let response = await AuthServices.resendOTP(token);
    if (response && response.status) {
        return response;
    } else {
        return response;
    }
};


const setUpLogin = async (user) => {
    await store.dispatch(setUserData(user));
    await AsyncStorage.setItem('SET_USER_DATA', JSON.stringify(user));
    return user;
};

const setGetStartedScreenStatusPassed = async () => {
    await AsyncStorage.setItem('GET_STARTED_SCREEN_PASSED', JSON.stringify({ status: true }));
};


const setGetStartedScreenStatusPassedRemove = async () => {
    await  await AsyncStorage.removeItem('GET_STARTED_SCREEN_PASSED');
};

const isGetStartedScreenPassed = async () => {
    try {
        const value = await AsyncStorage.getItem('GET_STARTED_SCREEN_PASSED');
        if (value !== null) {
            const parsedValue = JSON.parse(value);
            return parsedValue.status === true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error checking AsyncStorage key:', error);
        return false;
    }
};

const getLoginUser = async () => {
    let user = await AsyncStorage.getItem('SET_USER_DATA');
    if (user) {
        user = user ? JSON.parse(user) : {};
        store.dispatch(setUserData(user));
        return user && user !== null;
    } else {
        return null;
    }
};

const updateProfile = async (data) => {
    let post = {
        nickname: data && data.nickname ? data.nickname : null,
    };
    let response = await AuthServices.updateProfile(post);
    if (response && response.status) {
        return response
    }
    else {
        return null
    }
};

const logout = async () => {
    await store.dispatch(setUserData({}));
    await store.dispatch(setFCMToken(''));
    await AsyncStorage.removeItem('SET_USER_DATA');
    navigate('login', null, null);
};


const AuthController = {
    authInitialState,
    setPinCode,
    verifyPinCode,
    login,
    phoneVerifyOtp,
    resendOTP,
    logout,
    getLoginUser,
    setUpLogin,
    updateProfile,
    setGetStartedScreenStatusPassed,
    setGetStartedScreenStatusPassedRemove,
    isGetStartedScreenPassed
};

export default AuthController;
