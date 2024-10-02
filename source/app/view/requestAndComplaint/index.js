import { useIsFocused } from '@react-navigation/native'
import { Button, Input } from '@rneui/themed'
import React, { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { useToast } from 'react-native-toast-notifications'
import { useSelector } from 'react-redux'
import CmsController from '../../../apis/Controllers/cmsController'
import { dpSpacing } from '../../../assets/styles/Sizes'
import SearchableDropdownCustom from '../../components/searchableDropdown/searchableDropdown'
import Loader from '../../helpers/loader'
import Validation from '../../helpers/Validations'
import { createStyles } from './style'


const RequestAndComplaint = (props) => {
    const apiStyleData = useSelector((state) => state.AppDynamicStyleReducer.styles);
    let apiColors = apiStyleData.colors ? apiStyleData.colors : null
    const styles = createStyles(apiColors);;

    const defaultValues = {
        fullName: null,
        phoneNumber: null,
        topic: null,
        subject: null,
        message: null,
        department: null
    };

    const defaultErrors = {
        fullName: {
            rules: ['required'],
            isValid: true,
            message: ''
        },
        phoneNumber: {
            rules: ['required', "numeric", 'min:10', 'max:10'],
            isValid: true,
            message: ''
        },
        department: {
            rules: ['required'],
            isValid: true,
            message: ''
        },
        topic: {
            rules: ['required'],
            isValid: true,
            message: ''
        },
        subject: {
            rules: ['required'],
            isValid: true,
            message: ''
        },
        message: {
            rules: ['required', 'max:100'],
            isValid: true,
            message: ''
        },
    };

    const [values, setValues] = useState(defaultValues);
    const [errors, setErrors] = useState(defaultErrors);
    const [dropdown, setDropdown] = useState(false);
    const [dropdown2, setDropdown2] = useState(false);
    const [loader, setLoader] = useState(false);
    const isFocus = useIsFocused();
    const toast = useToast();


    const [topicList, setTopicList] = useState([
        {
            id: 1,
            title: 'Complain',
            name: 'Complain',
        },
        {
            id: 2,
            title: 'Suggest',
            name: 'Suggest',
        },
        {
            id: 3,
            title: 'Contact Request',
            name: 'Contact Request',
        }
    ]);


    const [departmentList, setDepartmentList] = useState([
        {
            id: 1,
            title: 'MPs',
            name: 'MPs',
        },
        {
            id: 2,
            title: 'Communications',
            name: 'Communications',
        },
    ]);

    useEffect(() => {
        if (isFocus) {
            setValues(defaultValues)
            setErrors(defaultErrors)
        }
    }, [isFocus])


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
            let response = await CmsController.requestAndComplaint(values);
            if (response && response.status) {
                setLoader(false);
                toast.show(response.message ? response.message : 'Submited Successfully', {
                    type: "success",
                    placement: 'top',
                    duration: 2000,
                    offset: 30,
                    animationType: "slide-in",
                    swipeEnabled: false
                });
                setValues(defaultValues)
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
        } else {
            setErrors({ ...isValid.errors });
        }
    };


    return (
        <View style={styles.main}>
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll} keyboardShouldPersistTaps={'handled'} >
                <View style={styles.formArea}>
                    <View style={{ paddingHorizontal: dpSpacing(5) }}>
                        <Input
                            label={'Name'}
                            placeholder={'Enter your name'}
                            keyboardType='default'
                            autoCapitalize="words"
                            labelStyle={styles.labelStyle}
                            value={values && values.fullName}
                            onChangeText={(value) => handleChange("fullName", value)}
                            errorMessage={errors && errors.fullName && errors.fullName.message ? errors.fullName.message : null}
                        />
                        <Input
                            label={'Phone Number'}
                            placeholder={'Enter your phone number'}
                            keyboardType='number-pad'
                            autoCapitalize="none"
                            labelStyle={styles.labelStyle}
                            value={values && values.phoneNumber}
                            onChangeText={(value) => handleChange("phoneNumber", value)}
                            errorMessage={errors && errors.phoneNumber && errors.phoneNumber.message ? errors.phoneNumber.message : null}
                        />
                    </View>
                    <SearchableDropdownCustom
                        label={"Department"}
                        list={departmentList ? departmentList : []}
                        placeholder='Select department'
                        setOpen={() => setDropdown(true)}
                        setClose={() => setDropdown(false)}
                        isOpen={dropdown}
                        value={values && values.department}
                        handleChange={(value) => handleChange("department", value)}
                        setList={(list) => setDepartmentList(list)}
                        staticSearch={true}
                        withoutouterLayer={true}
                        error={errors && errors.department && errors.department.message ? errors.department.message : null}
                    />
                    <SearchableDropdownCustom
                        label={"Topic"}
                        list={topicList ? topicList : []}
                        placeholder='Select topic'
                        setOpen={() => setDropdown2(true)}
                        setClose={() => setDropdown2(false)}
                        isOpen={dropdown2}
                        value={values && values.topic}
                        handleChange={(value) => handleChange("topic", value)}
                        setList={(list) => setTopicList(list)}
                        staticSearch={true}
                        withoutouterLayer={true}
                        error={errors && errors.topic && errors.topic.message ? errors.topic.message : null}
                    />
                    <View style={{ paddingHorizontal: dpSpacing(5) }}>
                        <Input
                            label={'Subject'}
                            placeholder={'Enter subject'}
                            keyboardType='default'
                            autoCapitalize="none"
                            labelStyle={styles.labelStyle}
                            value={values && values.subject}
                            onChangeText={(value) => handleChange("subject", value)}
                            errorMessage={errors && errors.subject && errors.subject.message ? errors.subject.message : null}
                        />
                        <Input
                            label={'Message'}
                            placeholder={'Write your message  (100 words)'}
                            keyboardType='default'
                            autoCapitalize="none"
                            labelStyle={styles.labelStyle}
                            multiline={true}
                            inputContainerStyle={styles.inputContainerStyle}
                            value={values && values.message}
                            onChangeText={(value) => handleChange("message", value)}
                            errorMessage={errors && errors.message && errors.message.message ? errors.message.message : null}
                        />
                        <View style={styles.viewBtn}>
                            <View style={styles.col1}>
                                <Button
                                    title={'Cancel'}
                                    titleStyle={styles.titleStyle}
                                    buttonStyle={styles.btnStyle2}
                                    onPress={() => props.navigation.goBack()}
                                />
                            </View>
                            <View style={styles.col2}>
                                <Button
                                    title={'Submit'}
                                    buttonStyle={styles.btnStyle}
                                    onPress={() => handleSubmit()}
                                />
                            </View>
                        </View>
                    </View>
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

export default RequestAndComplaint
