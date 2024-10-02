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
import HomeController from '../../../apis/Controllers/HomeController';
import { useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const HomeFilterModal = props => {
    const apiStyleData = useSelector((state) => state.AppDynamicStyleReducer.styles);
    let apiColors = apiStyleData.colors ? apiStyleData.colors : null;
    const styles = createStyles(apiColors);

    const { partyList, setPartyList, constituencyList, setConstituencyList, pollingList, setPollingList, religionList, setReligionList } = props;

    const defaultValues = {
        party: null,
        religion: null,
        constituency: null,
        poll: null
    };
    const [values, setValues] = useState(defaultValues)
    const [dropdownParty, setDropdownParty] = useState(false)
    const [dropdownReligion, setDropdownReligion] = useState(false)
    const [dropdownConstituency, setDropdownConstituency] = useState(false)
    const [dropdownPolling, setDropdownPolling] = useState(false)
    const isFocus = useIsFocused();


    useEffect(() => {
        if (isFocus && props && props.filters) {
            setValues({
                ...values,
                party: props.filters.party ? props.filters.party : null,
                religion: props.filters.religion ? props.filters.religion : null,
                constituency: props.filters.constituency ? props.filters.constituency : null,
                poll: props.filters.polling ? props.filters.polling : null,
            })
        }
    }, [isFocus, props.filters])


    const handleChange = (fieldName, value) => {
        setValues({ ...values, [fieldName]: value })
    };

    const handleFilters = async () => {
        if ((values && values.constituency) || (values && values.poll) || (values && values.party) || (values && values.religion)) {
            let filters = {
                constituency: values && values.constituency ? values.constituency : null,
                polling: values && values.poll ? values.poll : null,
                party: values && values.party ? values.party : null,
                religion: values && values.religion ? values.religion : null
            };
            await HomeController.setVoterListFilter(filters);
            props.close();
        }
    };

    const handleRemove = async () => {
        let filters = {
            constituency: null,
            polling: null,
            party: null,
            religion: null
        };
        await HomeController.setVoterListFilter(filters);
        props.close();
    };

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
                        <Text style={styles.activityTxt}>Filter</Text>
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
                                label={"Constituency "}
                                list={constituencyList ? constituencyList : []}
                                placeholder='Select Constituency '
                                setOpen={() => setDropdownConstituency(true)}
                                setClose={() => setDropdownConstituency(false)}
                                isOpen={dropdownConstituency}
                                value={values && values.constituency}
                                handleChange={(value) => handleChange("constituency", value)}
                                setList={(list) => setConstituencyList(list)}
                                staticSearch={true}
                            // error={'This field is required'}
                            />
                            <SearchableDropdownCustom
                                label={"Polling Station"}
                                list={pollingList ? pollingList : []}
                                placeholder='Select Polling Station'
                                setOpen={() => setDropdownPolling(true)}
                                setClose={() => setDropdownPolling(false)}
                                isOpen={dropdownPolling}
                                value={values && values.poll}
                                handleChange={(value) => handleChange("poll", value)}
                                setList={(list) => setPollingList(list)}
                                staticSearch={true}
                            // error={'This field is required'}
                            />
                            <SearchableDropdownCustom
                                label={"Party"}
                                list={partyList ? partyList : []}
                                placeholder='Select Party'
                                setOpen={() => setDropdownParty(true)}
                                setClose={() => setDropdownParty(false)}
                                isOpen={dropdownParty}
                                value={values && values.party}
                                handleChange={(value) => handleChange("party", value)}
                                setList={(list) => setPartyList(list)}
                                staticSearch={true}
                            // error={'This field is required'}
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
                            // error={'This field is required'}
                            />
                            <View style={styles.viewBtn}>
                                <View style={styles.col1}>
                                    <Button
                                        title={'Clear All'}
                                        titleStyle={styles.titleStyle}
                                        buttonStyle={styles.btnStyle2}
                                        onPress={props.close}
                                        onPressIn={() => handleRemove()}
                                    />
                                </View>
                                <View style={styles.col2}>
                                    <Button
                                        title={'Submit'}
                                        buttonStyle={styles.btnStyle}
                                        onPress={() => handleFilters()}
                                    />
                                </View>
                            </View>
                            <View>
                            </View>
                        </View>
                    </ScrollView>
                </View>

            </KeyboardAvoidingView>
        </Modal>
    );
};

export default HomeFilterModal;

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
            flex: 1,
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
        }
    });
};

