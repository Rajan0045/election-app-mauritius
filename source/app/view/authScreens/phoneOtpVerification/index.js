import { Button, Icon } from '@rneui/themed'
import React, { useEffect, useRef, useState } from 'react'
import { Text, View } from 'react-native'
import OTPTextInput from 'react-native-otp-textinput'
import { useToast } from 'react-native-toast-notifications'
import { useSelector } from 'react-redux'
import AuthController from '../../../../apis/Controllers/AuthController'
import { Colors } from '../../../../assets/styles/Colors'
import { Dimension } from '../../../../assets/styles/Dimension'
import { IconsName, IconsType } from '../../../../assets/styles/Icon'
import { formatSecToMin, maskNumber } from '../../../helpers/generals'
import Loader from '../../../helpers/loader'
import Validation from '../../../helpers/Validations'
import { createStyles } from './style'


const PhoneOtpVerification = (props) => {
    const apiStyleData = useSelector((state) => state.AppDynamicStyleReducer.styles);
    let apiColors = apiStyleData.colors ? apiStyleData.colors : null
    const styles = createStyles(apiColors);

    const phoneNumber = props && props.route && props.route.params && props.route.params.phoneNumber;
    const token = props && props.route && props.route.params && props.route.params.token;

    const defaultValues = {
        otp: ''
    };

    const defaultErrors = {
        otp: {
            rules: ['required'],
            isValid: true,
            message: ''
        },
    };

    const [values, setValues] = useState(defaultValues);
    const [errors, setErrors] = useState(defaultErrors);
    const [loader, setLoader] = useState(false);
    const [seconds, setSeconds] = useState(120);
    const [isRunning, setIsRunning] = useState(false);
    const toast = useToast();
    const countRef = useRef(null);

    const handleChange = (fieldName, value) => {
        let validation = new Validation(errors);
        let node = validation.validateField(fieldName, value);
        setErrors({ ...errors, [fieldName]: node });
        setValues({ ...values, [fieldName]: value });
    };

    const handleSubmit = async () => {
        let validation = new Validation(errors);
        let isValid = validation.isFormValid(values);
        if (isValid && !isValid.haveError) {
            if (values && values.otp && values.otp.length !== 4) {
                setErrors({
                    ...errors,
                    otp: {
                        ...errors.otp,
                        isValid: false,
                        message: 'Enter valid four digit OTP'
                    }
                });
            }
            else {
                setLoader(true);
                let response = await AuthController.phoneVerifyOtp(values, token);
                console.log("response : ", response)
                if (response && response.status) {
                    setLoader(false);
                    toast.show(response.message, {
                        type: "success",
                        placement: 'top',
                        duration: 2000,
                        offset: 30,
                        animationType: "slide-in",
                        swipeEnabled: false
                    });
                    clearInterval(countRef.current);
                    console.log("user data : ", response && response.user);
                    await AuthController.setUpLogin(response && response.user);
                    props.navigation.reset({
                        index: 1,
                        routes: [{ name: 'login' }, { name: 'set_pin_code', params: { from: 'otp', phoneNumber: phoneNumber } }]
                    })
                } else {
                    toast.show(response.message, {
                        type: "danger",
                        placement: 'top',
                        duration: 4000,
                        offset: 30,
                        animationType: "slide-in",
                        swipeEnabled: false
                    });
                    setLoader(false);
                }
            }
        } else {
            setErrors({ ...isValid.errors })
        }
    };

    const handleResendOTP = async () => {
        if (parseInt(seconds) === 0) {
            restartTimer()
            setLoader(true);
            let response = await AuthController.resendOTP(token);
            if (response && response.status) {
                console.log("resp", response)
                toast.show(response.message, {
                    type: "success",
                    placement: 'top',
                    duration: 2000,
                    offset: 30,
                    animationType: "slide-in",
                    swipeEnabled: false
                });
                setLoader(false);
            } else {
                setLoader(false);
            }
        } else {
            toast.show(`Please wait for the otp`, {
                type: "danger",
                placement: 'top',
                duration: 2000,
                offset: 30,
                animationType: "slide-in",
                swipeEnabled: false
            });
        }
    };

    useEffect(() => {
        if (seconds > 0) {
            countRef.current = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds - 1);
            }, 1000);
            return () => clearInterval(countRef.current);
        }
    }, [seconds, isRunning]);

    const restartTimer = () => {
        setSeconds(120);
        setIsRunning(true);
    };

    return (
        <View style={styles.main}>
            <Text style={styles.heading}>Phone verification</Text>
            <Text style={styles.txt}>Enter the verification code we send you on : {maskNumber(phoneNumber)}</Text>
            <View style={styles.viewFiled}>
                <OTPTextInput
                    ref={e => (otpInput = e)}
                    inputCount={4}
                    textInputStyle={styles.textInput}
                    offTintColor={Colors.lightGrey}
                    tintColor={apiColors?.primary || Colors.primary}
                    containerStyle={styles.containerStyle}
                    defaultValue={values.otp}
                    handleTextChange={(e) => handleChange("otp", e)}
                />
            </View>
            {errors && errors.otp && errors.otp.message ?
                <Text style={styles.errorText}>{errors.otp.message}</Text>
                : null}
            <Text style={styles.resendTxt}>Didn’t receive code? <Text style={styles.subtxt} onPress={() => handleResendOTP()} >Resend</Text></Text>
            <View style={styles.timerRow}>
                <Icon
                    type={IconsType.feather}
                    name={IconsName.clock}
                    color={Colors.grey}
                    size={Dimension.small}
                />
                <Text style={styles.timerTxt}>{seconds == 0 ? '00:00' : formatSecToMin(seconds)}</Text>
            </View>
            <View style={styles.viewBtn}>
                <Button
                    title={'Continue'}
                    buttonStyle={styles.buttonStyle}
                    onPress={() => handleSubmit()}
                />
            </View>
            {
                loader ?
                    <Loader loader={loader} />
                    : null
            }
        </View>
    )
};

export default PhoneOtpVerification
