import { Button, Input } from '@rneui/themed'
import React, { useState } from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import { useToast } from 'react-native-toast-notifications'
import { useSelector } from 'react-redux'
import AuthController from '../../../../apis/Controllers/AuthController'
import globalStyles from '../../../../assets/styles/GlobalStyles'
import { Images } from '../../../../assets/styles/Images'
import Loader from '../../../helpers/loader'
import Validation from '../../../helpers/Validations'
import { createStyles } from './style'


const FillDetailsScreen = (props) => {
    const phoneNumber = props && props.route && props.route.params && props.route.params.phoneNumber;
    const apiStyleData = useSelector((state) => state.AppDynamicStyleReducer.styles);
    const styles = createStyles(apiColors);
    let apiColors = apiStyleData.colors ? apiStyleData.colors : null
    let apiLogo = apiStyleData.logo ? apiStyleData.logo : null

    const defaultValues = {
        nickname: null,
        phoneNumber: phoneNumber ? phoneNumber : null,
    };

    const defaultErrors = {
        nickname: {
            rules: ['required', "alphabetic"],
            isValid: true,
            message: ''
        },
        phoneNumber: {
            rules: [''],
            isValid: true,
            message: ''
        },
    };

    const [values, setValues] = useState(defaultValues);
    const [errors, setErrors] = useState(defaultErrors);
    const [loader, setLoader] = useState(false);
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
            setLoader(true);
            let response = await AuthController.updateProfile(values);
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
                props.navigation.reset({ index: 0, routes: [{ name: 'AppStack' }] })
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
            setErrors({ ...isValid.errors });
        }
    };


    return (
        <View style={styles.main}>
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={styles.userImage}>
                        <Image
                            source={apiLogo ? { uri: apiLogo } : Images.noImg}
                            style={globalStyles.image}
                        />
                    </View>
                </View>
                <View style={styles.formArea}>
                    <Input
                        label={<Text style={styles.labelStyle}>Nickname<Text style={styles.requiredAsterisk}>*</Text></Text>}
                        placeholder={'Enter nickname'}
                        keyboardType='default'
                        autoCapitalize="words"
                        labelStyle={styles.labelStyle}
                        value={values && values.nickname}
                        onChangeText={(value) => handleChange("nickname", value)}
                        errorMessage={errors && errors.nickname && errors.nickname.message ? errors.nickname.message : null}
                    />
                    <Input
                        disabled
                        label={<Text style={styles.labelStyle}>Phone Number<Text style={styles.requiredAsterisk}>*</Text></Text>}
                        placeholder={'Enter your phone number'}
                        keyboardType='number-pad'
                        autoCapitalize="none"
                        labelStyle={styles.labelStyle}
                        value={phoneNumber ? phoneNumber : ''}
                        onChangeText={(value) => handleChange("phoneNumber", value)}
                        errorMessage={errors && errors.phoneNumber && errors.phoneNumber.message ? errors.phoneNumber.message : null}
                    />
                </View>
                <View style={styles.viewBtn}>
                    <Button
                        title={'Submit'}
                        buttonStyle={styles.btnStyle}
                        onPress={() => handleSubmit()}
                    />
                </View>
            </ScrollView>
            {
                loader ?
                    <Loader loader={loader} />
                    : null
            }
        </View>
    )
};

export default FillDetailsScreen
