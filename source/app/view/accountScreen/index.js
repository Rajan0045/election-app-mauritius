import { useIsFocused } from '@react-navigation/native'
import { Icon, Input } from '@rneui/themed'
import React, { useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import ProfileController from '../../../apis/Controllers/profileController'
import { Colors } from '../../../assets/styles/Colors'
import { Dimension } from '../../../assets/styles/Dimension'
import { IconsName, IconsType } from '../../../assets/styles/Icon'
import Loader from '../../helpers/loader'
import Validation from '../../helpers/Validations'
import styles from './style'


const AccountScreen = (props) => {
    const defaultValues = {
        image: null,
        fullName: null,
        nickName: null,
        phoneNumber: null,
        constituency: null,
        pollingStation: null,
        address: null
    };

    const defaultErrors = {
        image: {
            rules: [''],
            isValid: true,
            message: ''
        },
        fullName: {
            rules: ['required'],
            isValid: true,
            message: ''
        },
        nickName: {
            rules: ['required'],
            isValid: true,
            message: ''
        },
        phoneNumber: {
            rules: ['required', 'min:10'],
            isValid: true,
            message: ''
        },
        constituency: {
            rules: ['required'],
            isValid: true,
            message: ''
        },
        pollingStation: {
            rules: ['required'],
            isValid: true,
            message: ''
        },
        address: {
            rules: ['required'],
            isValid: true,
            message: ''
        },
    };


    const [values, setValues] = useState(defaultValues);
    const [errors, setErrors] = useState(defaultErrors);
    const [loader, setLoader] = useState(false);
    const isFocus = useIsFocused();

    const handleChange = (fieldName, value) => {
        let validation = new Validation(errors);
        let node = validation.validateField(fieldName, value);
        setErrors({ ...errors, [fieldName]: node });
        setValues({ ...values, [fieldName]: value });
    };


    useEffect(() => {
        if (isFocus) {
            setValues({
                fullName: 'Anastasia',
                nickName: 'Ana',
                phoneNumber: '8754675665',
                constituency: 'Labour',
                pollingStation: 'AAP',
                address: 'Ludhiana, Punjab'
            })
        }
    }, [isFocus])

    return (
        <View style={styles.main}>
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={styles.viewCircle}>
                        <Text style={styles.text}>WF</Text>
                    </View>
                    <View style={styles.editIcon}>
                        <Icon
                            type={IconsType.feather}
                            name={IconsName.edit}
                            color={Colors.white}
                            size={Dimension.semimedium}
                        />
                    </View>
                </View>
                <View style={styles.formArea}>
                    <Input
                        label={'Full Name'}
                        placeholder={'Enter your full name'}
                        keyboardType='default'
                        autoCapitalize="words"
                        labelStyle={styles.labelStyle}
                        inputContainerStyle={styles.inputContainerStyle}
                        editable={false}
                        value={values && values.fullName}
                        onChangeText={(value) => handleChange("fullName", value)}
                        errorMessage={errors && errors.fullName && errors.fullName.message ? errors.fullName.message : null}
                    />
                    <Input
                        label={'Nickname'}
                        placeholder={'Enter your nickname'}
                        keyboardType='default'
                        autoCapitalize="words"
                        labelStyle={styles.labelStyle}
                        inputContainerStyle={styles.inputContainerStyle}
                        editable={false}
                        value={values && values.nickName}
                        onChangeText={(value) => handleChange("nickName", value)}
                        errorMessage={errors && errors.nickName && errors.nickName.message ? errors.nickName.message : null}
                    />
                    <Input
                        label={'Phone Number'}
                        placeholder={'Enter your phone number'}
                        keyboardType='number-pad'
                        autoCapitalize="none"
                        labelStyle={styles.labelStyle}
                        inputContainerStyle={styles.inputContainerStyle}
                        editable={false}
                        value={values && values.phoneNumber}
                        onChangeText={(value) => handleChange("phoneNumber", value)}
                        errorMessage={errors && errors.phoneNumber && errors.phoneNumber.message ? errors.phoneNumber.message : null}
                    />
                    <Input
                        label={'Name of Constituency'}
                        placeholder={'Enter name of constituency'}
                        keyboardType='default'
                        autoCapitalize="none"
                        labelStyle={styles.labelStyle}
                        inputContainerStyle={styles.inputContainerStyle}
                        editable={false}
                        value={values && values.constituency}
                        onChangeText={(value) => handleChange("constituency", value)}
                        errorMessage={errors && errors.constituency && errors.constituency.message ? errors.constituency.message : null}
                    />
                    <Input
                        label={'Polling Station'}
                        placeholder={'Enter your polling station'}
                        keyboardType='default'
                        autoCapitalize="none"
                        labelStyle={styles.labelStyle}
                        inputContainerStyle={styles.inputContainerStyle}
                        editable={false}
                        value={values && values.pollingStation}
                        onChangeText={(value) => handleChange("pollingStation", value)}
                        errorMessage={errors && errors.pollingStation && errors.pollingStation.message ? errors.pollingStation.message : null}
                    />
                    <Input
                        label={'Address'}
                        placeholder={'Enter your address'}
                        keyboardType='default'
                        autoCapitalize="none"
                        labelStyle={styles.labelStyle}
                        inputContainerStyle={styles.inputContainerStyle}
                        editable={false}
                        value={values && values.address}
                        onChangeText={(value) => handleChange("address", value)}
                        errorMessage={errors && errors.address && errors.address.message ? errors.address.message : null}
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

export default AccountScreen
