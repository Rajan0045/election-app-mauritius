import { Button, Icon, Input } from '@rneui/themed';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Modal from "react-native-modal";
import { Colors } from '../../../assets/styles/Colors';
import { Dimension } from '../../../assets/styles/Dimension';
import { Font } from '../../../assets/styles/FontsFamily';
import { IconsName, IconsType } from '../../../assets/styles/Icon';
import { dpBorderWidth, dpFont, dpHeight, dpSpacing, dpWidth } from '../../../assets/styles/Sizes';
import Loader from '../../helpers/loader';
import { useSelector } from 'react-redux';
import HTML from 'react-native-render-html';


const ContentRenderModal = props => {
    const apiStyleData = useSelector((state) => state.AppDynamicStyleReducer.styles);
    let apiColors = apiStyleData.colors ? apiStyleData.colors : null;
    const styles = createStyles(apiColors);
    const contentWidth = useWindowDimensions().width;
    const systemFonts = [Font.bold, Font.thin, Font.regular];
    const { bioContent } = props;
    console.log(bioContent);

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
                        <Text style={styles.activityTxt}>Bio</Text>
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
                        
                        <View style={styles.subBody}>
                            <HTML
                                source={{ html: bioContent ? bioContent : `` }}
                                contentWidth={contentWidth}
                                tagsStyles={styles.contentStyle}
                                systemFonts={systemFonts}
                            />
                        </View>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
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
            height: '70%',
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
        bio: {
            color: Colors.darkGrey,
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
        },
        subBody: {
            paddingHorizontal: dpSpacing(6),
            flex: 1,
            paddingTop: dpHeight(1)
        },
        contentStyle: {
            p: {
                color: Colors.cmsText,
                fontFamily: Font.regular,
                fontSize: dpFont(15),
                marginBottom: dpHeight(0)
            },
            b: {
                color: Colors.black2,
                fontFamily: Font.regular,
                fontSize: dpFont(15),
                marginTop: dpHeight(0),
                marginBottom: dpHeight(0)
            },
            h2: {
                color: Colors.black2,
                fontSize: dpFont(24),
                fontFamily: Font.regular,
                marginBottom: dpHeight(0),
                position: 'relative',
            },
            h1: {
                color: Colors.black2,
                fontSize: dpFont(28),
                fontFamily: Font.regular,
                marginBottom: dpHeight(0),
            },
            h3: {
                color: Colors.black2,
                fontSize: dpFont(20),
                fontFamily: Font.regular,
                marginBottom: dpHeight(0),
            },
            h4: {
                color: Colors.black2,
                fontSize: dpFont(18),
                fontFamily: Font.regular,
                marginBottom: dpHeight(0),
            },
            h5: {
                color: Colors.black2,
                fontSize: dpFont(17),
                fontFamily: Font.regular,
                marginBottom: dpHeight(0),
            },
            h6: {
                color: Colors.black2,
                fontSize: dpFont(16),
                fontFamily: Font.regular,
                marginBottom: dpHeight(0),
            },
            ul: {
                color: Colors.black2,
                fontSize: dpFont(18),
                fontFamily: Font.regular,
                marginBottom: dpHeight(0),
                paddingLeft: dpWidth(5),
            },
            li: {
                color: Colors.black2,
                fontSize: dpFont(15),
                fontFamily: Font.regular,
                marginBottom: dpHeight(1),
                paddingLeft: dpWidth(0.4),
                marginTop: dpHeight(-0.2),
            },
        }
    });
};

export default ContentRenderModal;
