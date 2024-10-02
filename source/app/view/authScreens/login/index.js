import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Button, Icon, Input } from '@rneui/themed'
import { Colors } from '../../../../assets/styles/Colors';
import { Dimension } from '../../../../assets/styles/Dimension';
import { IconsName, IconsType } from '../../../../assets/styles/Icon';
import Validation from '../../../helpers/Validations';
import { useToast } from 'react-native-toast-notifications';
import AuthController from '../../../../apis/Controllers/AuthController';
import Loader from '../../../helpers/loader';
import { dpHeight } from '../../../../assets/styles/Sizes';
import { createStyles } from './styles';
import { useSelector } from 'react-redux';


const Login = (props) => {
    const apiStyleData = useSelector((state) => state.AppDynamicStyleReducer.styles);
    let apiColors = apiStyleData.colors ? apiStyleData.colors : null
    const styles = createStyles(apiColors);

    const defaultValues = {
        phoneNumber: null,
    };

    const defaultErrors = {
        phoneNumber: {
            rules: ['required', "numeric", 'min:10', 'max:10'],
            isValid: true,
            message: ''
        }
    };

    const [values, setValues] = useState(defaultValues);
    const [errors, setErrors] = useState(defaultErrors);
    const [loader, setLoader] = useState(false);
    const [check, setCheck] = useState(false);
    const toast = useToast();

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
            if (check) {
                setLoader(true);
                let response = await AuthController.login(values);
                if (response && response.status) {
                    setLoader(false)
                    toast.show(response.message, {
                        type: "success",
                        placement: 'top',
                        duration: 4000,
                        offset: 30,
                        animationType: "slide-in",
                        swipeEnabled: false
                    });
                    console.log("otp : ", response.tempOtp)
                    props.navigation.navigate('otp_verification', { token: response && response.hash, phoneNumber: values && values.phoneNumber })
                } else {
                    setLoader(false)
                    toast.show(response.message, {
                        type: "danger",
                        placement: 'top',
                        duration: 4000,
                        offset: 30,
                        animationType: "slide-in",
                        swipeEnabled: false
                    });
                }
            } else {
                toast.show('Please agree to the terms & conditions', {
                    type: "danger",
                    placement: 'top',
                    duration: 4000,
                    offset: 30,
                    animationType: "slide-in",
                    swipeEnabled: false
                });
            }
        } else {
            setErrors({ ...isValid.errors });
        }
    };


    return (
        <View style={styles.main}>
            <Text style={styles.heading}>Login to your account.</Text>
            <Text style={styles.txt}>Please sign in to your account</Text>
            <View style={styles.viewFiled}>
                <Input
                    label={'Phone Number'}
                    placeholder={'Enter your phone number'}
                    keyboardType='phone-pad'
                    value={values && values.phoneNumber}
                    onChangeText={(value) => handleChange("phoneNumber", value)}
                    errorMessage={errors && errors.phoneNumber && errors.phoneNumber.message ? errors.phoneNumber.message : null}
                />
                <View style={[styles.checkedRow, errors && errors.phoneNumber && errors.phoneNumber.message ? { paddingTop: dpHeight(2) } : null]}>
                    <TouchableOpacity onPress={() => setCheck(!check)} style={styles.checkIcon}>
                        {
                            check ?
                                <Icon
                                    type={IconsType.antDesign}
                                    name={IconsName.checksquare}
                                    size={Dimension.medium}
                                    color={apiColors?.primary || Colors.primary}
                                    underlayColor={Colors.white}
                                />
                                :
                                <Icon
                                    type={IconsType.feather}
                                    name={IconsName.square}
                                    size={Dimension.medium}
                                    color={apiColors?.primary || Colors.darkGrey}
                                    underlayColor={Colors.white}
                                />
                        }
                    </TouchableOpacity>
                    <Text style={[styles.agreeText]}>I agree to the <Text style={styles.termstext} onPress={() => props.navigation.navigate("terms_and_conditions")}>Terms & Policy</Text></Text>
                </View>
                <View style={styles.viewBtn}>
                    <Button
                        title={'Sign In'}
                        onPress={() => handleSubmit()}
                        buttonStyle={styles.buttonStyle}
                    />
                </View>
            </View>
            {
                loader ?
                    <Loader loader={loader} />
                    : null
            }
        </View>
    )
};

export default Login
