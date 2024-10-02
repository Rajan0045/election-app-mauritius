import { StyleSheet } from "react-native";
import { Colors } from "../../../../assets/styles/Colors";
import { dpFont, dpHeight, dpSpacing, dpWidth } from "../../../../assets/styles/Sizes";
import { Font } from "../../../../assets/styles/FontsFamily";


export const createStyles = (apiColors) => {
    return StyleSheet.create({
        main: {
            flex: 1,
            backgroundColor: Colors.white,
            paddingHorizontal: dpSpacing(5)
        },
        heading: {
            fontSize: dpFont(36),
            fontFamily: Font.extraBold,
            color: Colors.black2,
            paddingTop: dpHeight(10)
        },
        txt: {
            fontSize: dpFont(16),
            fontFamily: Font.medium,
            color: Colors.grey,
            paddingTop: dpHeight(0.5)
        },
        viewFiled: {
            marginTop: dpHeight(10)
        },
        viewBtn: {
            marginTop: dpHeight(3.5)
        },
        checkedRow: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: dpHeight(-0.5),
        },
        agreeText: {
            fontSize: dpFont(13),
            fontFamily: Font.medium,
            color: Colors.black2,
            marginLeft: dpWidth(2)
        },
        termstext: {
            fontSize: dpFont(13),
            fontFamily: Font.medium,
            color: Colors.blue,
        },
        checkIcon: {
            marginTop: dpHeight(0.4)
        },
        buttonStyle: {
            borderRadius: dpHeight(4),
            paddingVertical: dpHeight(1.8),
            paddingHorizontal: dpWidth(5),
            backgroundColor: apiColors?.primary || Colors.primary
        }
    });
};