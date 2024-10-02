import { StyleSheet } from "react-native";
import { Colors } from "../../../assets/styles/Colors";
import { dpBorderWidth, dpFont, dpHeight, dpImageHeight, dpImageWidth, dpSpacing } from "../../../assets/styles/Sizes";
import { Font } from "../../../assets/styles/FontsFamily";

const styles = StyleSheet.create({
    main: {
        backgroundColor: Colors.white,
    },
    innerArea: {
        paddingTop: dpHeight(2),
        paddingHorizontal: dpSpacing(5),
        paddingBottom: dpHeight(1)
    },
    iconTextSec: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    col1: {
        flex: 0.20
    },
    col2: {
        flex: 0.60
    },
    col3: {
        flex: 0.20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        columnGap: dpHeight(1.4)
    },
    icon: {
        width: dpHeight(4.8),
        height: dpHeight(4.8),
        borderRadius: dpHeight(3),
        backgroundColor: Colors.offWhite,
        borderWidth: dpBorderWidth(0.4),
        borderColor: Colors.offWhite,
        alignItems: 'center',
        justifyContent: 'center'
    },
    notiIcon: {
        width: dpHeight(5.5),
        height: dpHeight(5.5),
        borderRadius: dpHeight(3),
        backgroundColor: Colors.white,
        borderWidth: dpBorderWidth(0.4),
        borderColor: Colors.lightGrey2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    heading: {
        fontSize: dpFont(18),
        fontFamily: Font.bold,
        color: Colors.black2,
        textAlign: 'center'
    },
    userRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    userImg: {
        height: dpImageHeight(48),
        width: dpImageWidth(48),
        borderRadius: dpImageHeight(30),
        overflow: 'hidden'
    },
    gmTxt: {
        fontSize: dpFont(14),
        color: Colors.grey2,
        fontFamily: Font.regular
    },
    userTxt: {
        fontSize: dpFont(14),
        color: Colors.black2,
        fontFamily: Font.bold
    },
    active: {
        height: dpHeight(0.8),
        width: dpHeight(0.8),
        borderRadius: dpHeight(1),
        backgroundColor: Colors.red,
        position: 'absolute',
        top: '22%',
        right: '32%',
        zIndex: 9
    },
    viewImg: {
        height: dpImageHeight(22),
        width: dpImageWidth(22),
        overflow: 'hidden'
    }
})
export default styles;