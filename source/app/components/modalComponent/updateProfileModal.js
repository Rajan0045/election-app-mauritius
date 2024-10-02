import { Button, Icon, Input } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import Modal from "react-native-modal";
import { Colors } from '../../../assets/styles/Colors';
import { Dimension } from '../../../assets/styles/Dimension';
import { Font } from '../../../assets/styles/FontsFamily';
import { IconsName, IconsType } from '../../../assets/styles/Icon';
import { dpBorderWidth, dpFont, dpHeight, dpSpacing, dpWidth } from '../../../assets/styles/Sizes';
import SearchableDropdownCustom from '../searchableDropdown/searchableDropdown';
import Validation from '../../helpers/Validations';
import ProfileController from '../../../apis/Controllers/profileController';
import { useIsFocused } from '@react-navigation/native';
import Loader from '../../helpers/loader';
import { useToast } from 'react-native-toast-notifications';
import { useSelector } from 'react-redux';

const UpdateProfileModal = props => {
    const apiStyleData = useSelector((state) => state.AppDynamicStyleReducer.styles);
    let apiColors = apiStyleData.colors ? apiStyleData.colors : null;
    const styles = createStyles(apiColors);

    const { partyList, setPartyList, religionList, setReligionList, voterDetail, setProfileUpdated } = props;

    const defaultValues = {
        party: null,
        religion: null,
        identificationId: null,
        phoneNumber: null
    };

    const defaultErrors = {
        party: {
            rules: ['required'],
            isValid: true,
            message: ''
        },
        religion: {
            rules: [''],
            isValid: true,
            message: ''
        },
        identificationId: {
            rules: [''],
            isValid: true,
            message: ''
        },
        phoneNumber: {
            rules: ['max:10'],
            isValid: true,
            message: ''
        }
    };

    const [values, setValues] = useState(defaultValues);
    const [errors, setErrors] = useState(defaultErrors);
    const [dropdownParty, setDropdownParty] = useState(false);
    const [dropdownReligion, setDropdownReligion] = useState(false);
    const [updateCase, setUpdateCase] = useState(false);
    const [loader, setLoader] = useState(false);
    const isFocus = useIsFocused();
    const toast = useToast();

    const handleChange = (fieldName, value) => {
        let validation = new Validation(errors);
        let node = validation.validateField(fieldName, value);
        setErrors({ ...errors, [fieldName]: node });
        setValues({ ...values, [fieldName]: value });
    };

    useEffect(() => {
        if (isFocus) {
            setValues({
                ...values,
                party: voterDetail && voterDetail.party ?
                    {
                        id: voterDetail.party.trim(),
                        title: voterDetail.party
                    } : null,
                religion: voterDetail && voterDetail.religion ?
                    {
                        id: voterDetail.religion.trim(),
                        title: `${voterDetail.religion[0].toUpperCase()}${voterDetail.religion.slice(1)}`,
                        slug: voterDetail.religion
                    } : null,
                identificationId: voterDetail && voterDetail.identity_number ? voterDetail.identity_number : null,
                phoneNumber: voterDetail && voterDetail.phoneNumber ? voterDetail.phoneNumber : null,
            });

            setUpdateCase(voterDetail && voterDetail.party ? true : false);
        }
    }, [isFocus])



    const handleSubmit = async () => {
        let validation = new Validation(errors);
        let isValid = validation.isFormValid(values);
        if (isValid && !isValid.haveError) {
            setLoader(true);
            let response = await ProfileController.updateProfile(values, voterDetail && voterDetail.id);
            if (response && response.status) {
                setLoader(false)
                toast.show(response.message ? response.message : 'Profile updated succussfully', {
                    type: "success",
                    placement: 'top',
                    duration: 4000,
                    offset: 30,
                    animationType: "slide-in",
                    swipeEnabled: false
                });
                props.close()
                setProfileUpdated((preState) => !preState)
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
    console.log(props);

    return (
        <Modal
            isVisible={props.isopen}
            style={styles.modal}
            backdropColor={Colors.black}
            backdropOpacity={0.6}
            onBackdropPress={props.close}
            onBackButtonPress={props.close}
            animationIn="slideInUp" D
        >
            <KeyboardAvoidingView
                style={styles.maincontainer}
                behavior={Platform.OS === 'ios' ? 'padding' : null}
            >
                <View style={{ flex: 1 }}>
                    <View style={styles.titleRow}>
                        <Text style={styles.activityTxt}>Update Profile</Text>
                        <Icon
                            type={IconsType.antDesign}
                            name={IconsName.closecircleo}
                            color={apiColors?.primary || Colors.primary}
                            size={Dimension.large2}
                            onPress={props.close}
                        />
                    </View>
                    <View style={styles.line} />
                    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scroll} keyboardShouldPersistTaps={"handled"} >
                        <View style={styles.form}>
                            <SearchableDropdownCustom
                                label={"Party"}
                                requiredAsterisk={true}
                                list={partyList ? partyList : []}
                                placeholder='Select Party'
                                setOpen={() => setDropdownParty(true)}
                                setClose={() => setDropdownParty(false)}
                                isOpen={dropdownParty}
                                value={values && values.party}
                                handleChange={(value) => handleChange("party", value)}
                                setList={(list) => setPartyList(list)}
                                staticSearch={true}
                                error={errors && errors.party && errors.party.message ? errors.party.message : null}
                            />
                            <SearchableDropdownCustom
                                label={"Religion"}
                                list={religionList ? religionList : []}
                                placeholder='Select Religion'
                                setOpen={() => setDropdownReligion(true)}
                                setClose={() => setDropdownReligion(false)}
                                isOpen={dropdownReligion}
                                value={values && values.religion}
                                handleChange={(value) => handleChange("religion", value)}
                                setList={(list) => setReligionList(list)}
                                staticSearch={true}
                                error={errors && errors.religion && errors.religion.message ? errors.religion.message : null}
                            />
                            <Input
                                label={'Identification Number'}
                                placeholder={'Enter Number'}
                                keyboardType='phone-pad'
                                autoCapitalize="none"
                                labelStyle={styles.labelStyle}
                                containerStyle={styles.containerStyle}
                                value={values && values.identificationId}
                                onChangeText={(value) => handleChange("identificationId", value)}
                                errorMessage={errors && errors.identificationId && errors.identificationId.message ? errors.identificationId.message : null}
                            />
                            {
                                updateCase
                                ?
                                <Text style={styles.detailtxt}>For more details, check and update in dashboard</Text>
                                :
                                <Input
                                    label={'Phone Number'}
                                    placeholder={'Enter Phone Number'}
                                    keyboardType='phone-pad'
                                    autoCapitalize="none"
                                    labelStyle={styles.labelStyle}
                                    containerStyle={styles.containerStyle}
                                    value={values && values.phoneNumber}
                                    onChangeText={(value) => handleChange("phoneNumber", value)}
                                    errorMessage={errors && errors.phoneNumber && errors.phoneNumber.message ? errors.phoneNumber.message : null}
                                />
                            }
                            <View style={styles.viewBtn}>
                                <View style={styles.col1}>
                                    <Button
                                        title={'Cancel'}
                                        titleStyle={styles.titleStyle}
                                        buttonStyle={styles.btnStyle2}
                                        onPress={() => props.close()}
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
                            <View>

                            </View>
                        </View>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
            {
                loader ?
                    <Loader loader={loader} />
                    : null
            }
        </Modal>
    );
};

const createStyles = (apiColors) => {
    return StyleSheet.create({
        modal: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-end',
            margin: 0,
        },
        maincontainer: {
            backgroundColor: Colors.white,
            height: '80%',
            width: '100%',
            paddingVertical: dpHeight(1),
            borderTopLeftRadius: dpHeight(5),
            borderTopRightRadius: dpHeight(5),
            paddingHorizontal: dpSpacing(5)
        },
        activityTxt: {
            fontSize: dpFont(20),
            fontFamily: Font.semiBold,
            color: apiColors?.primary || Colors.primary,
            paddingVertical: dpHeight(1.5),
        },
        line: {
            width: '100%',
            height: dpHeight(0.1),
            backgroundColor: Colors.lightGrey,
            marginBottom: dpHeight(1)
        },
        titleRow: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        form: {
            marginTop: dpHeight(2)
        },
        labelStyle: {
            color: Colors.borderColor2,
            fontFamily: Font.medium,
            fontSize: dpFont(15),
            marginBottom: dpHeight(1)
        },
        containerStyle: {
            paddingLeft: dpSpacing(5),
            paddingRight: dpSpacing(5),
            backgroundColor: Colors.offWhite5,
            borderWidth: dpBorderWidth(0.4),
            borderRadius: dpHeight(1.4),
            borderColor: Colors.borderColor3,
            paddingTop: dpHeight(1.2),
            marginBottom: dpHeight(3)
        },
        viewBtn: {
            flexDirection: 'row',
            alignItems: 'center',
            columnGap: dpWidth(5),
            marginTop: dpHeight(1),
            paddingHorizontal: dpWidth(3)
        },
        col1: {
            flex: 0.5
        },
        col2: {
            flex: 0.5
        },
        btnStyle: {
            borderRadius: dpHeight(2.5),
            paddingVertical: dpHeight(1.5),
            paddingHorizontal: dpWidth(12),
            backgroundColor: apiColors?.primary || Colors.primary,
            borderWidth: dpBorderWidth(0.5),
            borderColor: apiColors?.primary || Colors.primary,
            width: '100%'
        },
        btnStyle2: {
            borderRadius: dpHeight(2.5),
            paddingVertical: dpHeight(1.5),
            backgroundColor: Colors.background,
            borderWidth: dpBorderWidth(0.5),
            borderColor: apiColors?.primary || Colors.primary,
            width: '100%'
        },
        titleStyle: {
            color: apiColors?.primary || Colors.primary,
            fontSize: dpFont(15),
            fontFamily: Font.medium,
        },
        scroll: {
            flexGrow: 1,
            paddingBottom: dpHeight(4)
        },
        detailtxt: {
            color: apiColors?.primary || Colors.primary,
            fontSize: dpFont(15),
            fontFamily: Font.regular,
            paddingBottom: dpHeight(3)
        }
    });
};

export default UpdateProfileModal;
