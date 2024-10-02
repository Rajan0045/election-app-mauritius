import { Platform, StyleSheet } from "react-native";
import { dpBorderWidth, dpFont, dpHeight, dpSpacing, dpWidth } from "../../../assets/styles/Sizes";
import { Colors } from "../../../assets/styles/Colors";
import { Font } from "../../../assets/styles/FontsFamily";


export const styles = StyleSheet.create({
    searchableDropMain: {
        flexGrow: 1,
        backgroundColor: 'transparent',
        borderRadius: dpHeight(2),
        maxHeight: dpHeight(30),
    },
    containerStyle: {

    },
    lbltxt: {
        color: Colors.borderColor2,
        fontFamily: Font.medium,
        fontSize: dpFont(15),
        marginBottom: dpHeight(1)
    },
    inputStyleOpen: {
        height: dpHeight(6.5),
        borderRadius: dpHeight(1),
        borderWidth: dpFont(1),
        borderColor: Colors.borderColor,
        fontFamily: Font.regular,
        backgroundColor: Colors.white,
        paddingLeft: dpWidth(3),
        paddingRight: dpWidth(10),
        width: '100%',
        color: Colors.placeholderColor
    },
    activeInput: {
        borderColor: Colors.borderColor,
    },
    inputStyleClose: {
        height: dpHeight(6.5),
        borderRadius: dpHeight(1),
        borderWidth: dpFont(1),
        borderColor: Colors.borderColor,
        fontFamily: Font.regular,
        backgroundColor: Colors.white,
        paddingLeft: dpWidth(3),
        paddingRight: dpWidth(10),
        width: '100%',
        color: Colors.placeholderColor
    },
    itemContainer: {
        backgroundColor: Colors.white,
        borderRadius: dpHeight(1),
        marginTop: dpHeight(0.5),
        overflow: 'hidden',
        // borderWidth: dpFont(1),
        // borderColor: Colors.borderColor,
    },
    listArea: {
        overflow: 'hidden',
        borderRadius: dpHeight(1)
    },
    listItemMain: {
        paddingHorizontal: dpWidth(5),
        paddingVertical: dpHeight(0.5),
    },
    listItemselected: {
        paddingHorizontal: dpWidth(5),
        paddingVertical: dpHeight(0.5),
        backgroundColor: Colors.lightBlue3,
    },
    nomain: {
        marginTop: dpHeight(1.5),
        alignItems: 'center',
        paddingTop: dpHeight(1),
        paddingBottom: dpHeight(3)
    },
    title: {
        fontSize: dpFont(14),
        fontFamily: Font.medium,
        color: Colors.black3,
        paddingVertical: dpHeight(0.5),
    },
    title2: {
        paddingVertical: dpHeight(0.5),
        fontSize: dpFont(14),
        fontFamily: Font.semiBold,
        color: Colors.navyBlue
    },
    iconStyle1: {
        position: 'absolute',
        zIndex: 1,
        top: dpHeight(1.7),
        right: dpWidth(3),
    },
    iconStyle2: {
        position: 'absolute',
        zIndex: 1,
        top: dpHeight(2.2),
        right: dpWidth(4),
        height: dpHeight(3),
        width: dpHeight(3),
    },
    image: {
        height: '100%',
        width: '100%'
    },
    errorText: {
        marginTop: Platform.OS === 'ios' ? dpFont(5) : dpFont(2),
        color: Colors.errorColor,
        fontFamily: Font.regular,
        fontSize: dpFont(13),
        marginLeft: dpHeight(0.6),
        marginBottom: dpHeight(-2)
    },
    borderError: {
        borderColor: Colors.red
    },
    requiredAsterisk: {
        color: Colors.red
    },
    line: {
        width: '100%',
        height: dpFont(0.5),
        backgroundColor: Colors.lightGrey
    },
    mainCintainer2: {
        marginBottom: dpHeight(3),
        paddingLeft: dpSpacing(5),
        paddingRight: dpSpacing(5),
    },
    mainCintainer: {
        paddingLeft: dpSpacing(5),
        paddingRight: dpSpacing(5),
        backgroundColor: Colors.offWhite5,
        borderWidth: dpBorderWidth(0.4),
        borderRadius: dpHeight(1.4),
        borderColor: Colors.borderColor3,
        paddingTop: dpHeight(1.2),
        paddingBottom: dpHeight(3.2),
        marginBottom: dpHeight(3)
    }
})