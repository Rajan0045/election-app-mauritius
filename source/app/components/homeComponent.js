import { Button, Icon } from '@rneui/themed'
import { StyleSheet, Text, View } from 'react-native'
import { Colors } from '../../assets/styles/Colors'
import { Font } from '../../assets/styles/FontsFamily'
import globalStyles from '../../assets/styles/GlobalStyles'
import { IconsName, IconsType } from '../../assets/styles/Icon'
import { dpFont, dpHeight, dpSpacing, dpWidth } from '../../assets/styles/Sizes'
import { isNotFutureDate } from '../helpers/generals'
import { useSelector } from 'react-redux'


const HomeComponent = (props) => {
    const apiStyleData = useSelector((state) => state.AppDynamicStyleReducer.styles);
    let apiColors = apiStyleData.colors ? apiStyleData.colors : null;
    const styles = createStyles(apiColors);

    const {
        party,
        date,
        name,
        religion,
        identificationNo,
        nameOfConstituency,
        onClickUpdateProfile,
        navigation,
        voteStatus,
        electionDate,
        handleSubmitVote,
        tab
    } = props;


    return (
        <View style={styles.main}>
            <View style={styles.topRow}>
                <View style={styles.col6}>
                    <Text style={styles.name} onPress={() => navigation.navigate('voter_details')}>{name}</Text>
                </View>
                <View style={styles.col6FlexEnd}>
                    <Text onPress={() => party ? null : onClickUpdateProfile()}
                        style={party ? styles.ptrButton : styles.updateprofile}>
                        {party ? party : "Update Profile"}
                    </Text>
                    
                    {
                        party ?
                            <View style={globalStyles.Row}>
                                {date ? <Icon
                                    type={IconsType.feather}
                                    name={IconsName.clock}
                                    color={apiColors?.primary || Colors.primary}
                                    size={dpWidth(3)}
                                    style={{ paddingTop: dpHeight(0.2) }}
                                /> : null}
                                <Text style={styles.created}>{date}</Text>
                            </View>
                            :
                            null
                    }
                    {
                        tab == 'completed'
                        &&
                        <Text onPress={() => onClickUpdateProfile()}
                            style={[styles.updateprofile, {marginTop: dpHeight(1)}]}>
                            {"Update Profile"}
                        </Text>
                    }
                </View>
            </View>
            <View style={styles.body}>
                <Text style={styles.subTitle}>Religion</Text>
                <Text style={styles.subDiscription}>{religion}</Text>
            </View>
            <View style={styles.body}>
                <Text style={styles.subTitle}>Identification Number</Text>
                <Text style={styles.subDiscription}>{identificationNo}</Text>
            </View>
            <View style={styles.body}>
                <Text style={styles.subTitle}>Name of Constituency</Text>
                <Text style={styles.subDiscription}>{nameOfConstituency}</Text>
            </View>
            {
                electionDate && isNotFutureDate(electionDate) ?
                    <View style={styles.button}>
                        <Button
                            title={parseInt(voteStatus) === 1 ? 'Voted' : 'Vote'}
                            buttonStyle={parseInt(voteStatus) === 1 ? styles.buttonStyle : styles.buttonStyle2}
                            titleStyle={parseInt(voteStatus) === 1 ? styles.titleStyle : styles.titleStyle2}
                            onPress={() => parseInt(voteStatus) === 1 ? null : handleSubmitVote()}
                        />
                    </View>
                    : null
            }
        </View>
    )
};

const createStyles = (apiColors) => {
    return StyleSheet.create({
        main: {
            flex: 1,
            backgroundColor: Colors.background,
            marginBottom: dpHeight(3),
            borderWidth: dpSpacing(0.3),
            borderRadius: dpWidth(4),
            borderColor: Colors.border,
            paddingVertical: dpWidth(3),
            paddingHorizontal: dpWidth(3)
        },
        topRow: {
            flexDirection: "row",
            alignItems: 'center',
            borderColor: Colors.grey3,
            borderBottomWidth: dpWidth(0.3),
            paddingBottom: dpHeight(1.2)
        },
        col6: {
            flex: 0.5
        },
        col6FlexEnd: {
            alignItems: "flex-end",
            flex: 0.5
        },
        name: {
            fontFamily: Font.semiBold,
            fontSize: dpFont(16),
            color: Colors.black3
        },
        updateprofile: {
            paddingVertical: dpSpacing(1),
            paddingHorizontal: dpWidth(3),
            borderRadius: dpWidth(1),
            borderWidth: dpWidth(0.3),
            borderColor: Colors.blue,
            fontFamily: Font.medium,
            fontSize: dpFont(12),
            color: Colors.blue
        },
        ptrButton: {
            paddingVertical: dpSpacing(0.5),
            paddingHorizontal: dpWidth(2.5),
            borderRadius: dpWidth(1),
            borderWidth: dpSpacing(0.4),
            borderColor: apiColors?.primary || Colors.primary,
            fontFamily: Font.medium,
            fontSize: dpFont(12),
            color: apiColors?.primary || Colors.primary,
            backgroundColor: Colors.offWhite,
            marginBottom: dpHeight(0.4)
        },
        body: {
            paddingTop: dpHeight(1),
            paddingBottom: dpHeight(0.5)
        },
        subTitle: {
            fontFamily: Font.regular,
            fontSize: dpFont(14),
            color: Colors.secondary
        },
        subDiscription: {
            fontFamily: Font.medium,
            fontSize: dpFont(14),
            color: Colors.black3
        },
        button: {
            marginTop: dpHeight(1)
        },
        buttonStyle: {
            borderRadius: dpHeight(1),
            paddingVertical: dpHeight(1.5),
            paddingHorizontal: dpWidth(5),
            backgroundColor: apiColors?.primary || Colors.primary
        },
        buttonStyle2: {
            borderRadius: dpHeight(1),
            paddingVertical: dpHeight(1.5),
            paddingHorizontal: dpWidth(5),
            backgroundColor: Colors.grey2
        },
        titleStyle2: {
            color: Colors.white,
            fontSize: dpFont(16),
            fontFamily: Font.medium,
            textAlign: 'center',
            alignItems: 'center',
            width: '100%',
        },
        titleStyle: {
            color: Colors.white,
            fontSize: dpFont(16),
            fontFamily: Font.medium,
            textAlign: 'center',
            alignItems: 'center',
            width: '100%',
        },
        created: {
            fontFamily: Font.medium,
            fontSize: dpFont(10),
            color: Colors.grey2,
            marginLeft: dpSpacing(1)
        }
    });
};

export default HomeComponent
