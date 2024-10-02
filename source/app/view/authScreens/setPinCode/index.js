import { useIsFocused } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import React, { useEffect, useRef, useState } from 'react';
import { Text, Touchable, TouchableOpacity, View } from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';
import { useToast } from 'react-native-toast-notifications';
import { useSelector } from 'react-redux';
import AuthController from '../../../../apis/Controllers/AuthController';
import { Colors } from '../../../../assets/styles/Colors';
import Validation from '../../../helpers/Validations';
import Loader from '../../../helpers/loader';
import { createStyles } from './style';


const SetPinCode = (props) => {
    const apiStyleData = useSelector((state) => state.AppDynamicStyleReducer.styles);
    let apiColors = apiStyleData.colors ? apiStyleData.colors : null;
    const styles = createStyles(apiColors);

    const phoneNumber = props && props.route && props.route.params && props.route.params.phoneNumber;
    let params = props && props.route && props.route.params
    console.log("params : ", params)
    const defaultValues = {
        pinCode: ""
    };

    const defaultErrors = {
        pinCode: {
            rules: ['required'],
            isValid: true,
            message: ''
        },
    };

    const [values, setValues] = useState(defaultValues);
    const [errors, setErrors] = useState(defaultErrors);
    const [loader, setLoader] = useState(false);
    const [unlockPin, setUnlockPin] = useState(true);
    const isFocus = useIsFocused();
    let pinInput = useRef(null);
    const toast = useToast();

    useEffect(() => {
        if (isFocus) {
            if (params && params.unlock_pin) {
                setUnlockPin(false);
            }
            else {
                setUnlockPin(true);
            }
            setValues({ pinCode: '' })
        }
    }, [isFocus]);


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
            if (values && values.pinCode && values.pinCode.length !== 4) {
                setErrors({
                    ...errors,
                    pinCode: {
                        ...errors.pinCode,
                        isValid: false,
                        message: 'Enter valid four digit pin code'
                    }
                });
            }
            else {
                if (unlockPin) {
                    setLoader(true);
                    let response = await AuthController.setPinCode(values);
                    console.log("response : ", response);
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
                        setUnlockPin(!unlockPin)
                        setValues({ pinCode: "" })
                        if (pinInput && pinInput.current) {
                            pinInput.current.clear();
                        }
                        await AuthController.setUpLogin(response && response.user);
                        if(response.user && response.user.first_name)
                            props.navigation.reset({ index: 0, routes: [{ name: 'AppStack' }] })
                        else
                            props.navigation.reset({
                                index: 1,
                                routes: [
                                    { name: 'login' }, 
                                    { name: 'fill_the_details', params: { phoneNumber: phoneNumber } }
                                ]
                            });
                    } else {
                        setLoader(false);
                        toast.show(response.message, {
                            type: "danger",
                            placement: 'top',
                            duration: 4000,
                            offset: 30,
                            animationType: "slide-in",
                            swipeEnabled: false
                        });
                    }
                }
                else {
                    setLoader(true);
                    let response = await AuthController.verifyPinCode(values);
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
                        props.navigation.reset({ index: 0, routes: [{ name: 'AppStack' }] })
                    } else {
                        setLoader(false);
                        toast.show(response.message, {
                            type: "danger",
                            placement: 'top',
                            duration: 4000,
                            offset: 30,
                            animationType: "slide-in",
                            swipeEnabled: false
                        });
                    }
                }
            }
        } else {
            setErrors({ ...isValid.errors })
        }
    };


    return (
        <View style={styles.main}>
            <Text style={styles.heading}>{!unlockPin ? 'Unlock Using Pin' : 'Set a Pin Code'}</Text>
            <Text style={styles.txt}>{!unlockPin ? 'Unlock your device quickly and securely using a personalized PIN.' :
                'Generate a secure PIN code for enhanced protection.'}</Text>
            <View style={styles.viewFiled}>
                <OTPTextInput
                    ref={pinInput}
                    secureTextEntry={true}
                    inputCount={4}
                    textInputStyle={styles.textInput}
                    offTintColor={Colors.lightGrey}
                    tintColor={apiColors?.primary || Colors.primary}
                    containerStyle={styles.containerStyle}
                    defaultValue={values && values.pinCode}
                    handleTextChange={(e) => handleChange("pinCode", e)}
                />
            </View>
            {errors && errors.pinCode && errors.pinCode.message ?
                <Text style={styles.errorText}>{errors.pinCode.message}</Text>
                : null}
            {
                !unlockPin
                &&
                <TouchableOpacity
                    style={{alignSelf: 'flex-end', marginTop: '5%'}}
                    onPress={() => {
                        props.navigation.reset({ index: 0, routes: [{ name: 'login' }] });
                    }}
                >
                    <Text>Forgot Your Pin?</Text>
                </TouchableOpacity>
            }
            <View style={styles.viewBtn}>
                <Button
                    title={'Continue'}
                    onPress={() => handleSubmit()}
                    buttonStyle={styles.buttonStyle}
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

export default SetPinCode
