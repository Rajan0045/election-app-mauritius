import { StyleSheet } from "react-native";
import { Colors } from "../../../../assets/styles/Colors";
import { dpBorderWidth, dpFont, dpHeight, dpSpacing, dpWidth } from "../../../../assets/styles/Sizes";
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
            paddingTop: dpHeight(8)
        },
        txt: {
            fontSize: dpFont(16),
            fontFamily: Font.medium,
            color: Colors.grey,
            paddingTop: dpHeight(0.5)
        },
        viewFiled: {
            marginTop: dpHeight(6)
        },
        viewBtn: {
            marginTop: dpHeight(18)
        },
        resendTxt: {
            fontFamily: Font.regular,
            color: Colors.grey,
            fontSize: dpFont(14),
            textAlign: 'center',
            paddingTop: dpHeight(1.5)
        },
        textInput: {
            width: dpHeight(9),
            height: dpHeight(6.8),
            borderWidth: dpBorderWidth(0.4),
            borderBottomWidth: dpBorderWidth(0.4),
            borderColor: Colors.lightGrey,
            borderRadius: dpHeight(1.2),
            color: Colors.black2,
            textAlign: 'center',
            paddingVertical: dpHeight(1),
            fontSize: dpFont(28),
            fontFamily: Font.regular
        },
        containerStyle: {
            // marginHorizontal: dpFont(15)
        },
        errorText: {
            color: Colors.errorColor,
            fontSize: dpFont(13),
            marginTop: dpHeight(0.5),
            marginLeft: dpWidth(1),
            fontFamily: Font.regular,
        },
        buttonStyle: {
            borderRadius: dpHeight(4),
            paddingVertical: dpHeight(1.8),
            paddingHorizontal: dpWidth(5),
            backgroundColor: apiColors?.primary || Colors.primary
        }
    })
}