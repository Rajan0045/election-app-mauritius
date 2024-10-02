import { StyleSheet } from "react-native";
import { Colors } from "../../../assets/styles/Colors";
import { dpFont, dpHeight, dpSpacing, dpWidth } from "../../../assets/styles/Sizes";
import { Font } from "../../../assets/styles/FontsFamily";

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: Colors.white,
        paddingHorizontal: dpSpacing(5)
    },
    containerStyle: {
        flexGrow: 1,
        paddingTop: dpHeight(4),
        paddingBottom: dpHeight(4),
    },
    formArea: {
        paddingTop: dpHeight(3)
    },
    inputContainerStyle: {
        height: dpHeight(6.5),
        borderRadius: dpHeight(1),
        borderWidth: dpFont(1),
        borderColor: Colors.borderColor2,
        fontFamily: Font.regular,
        backgroundColor: Colors.offWhite4,
        paddingLeft: dpWidth(3),
        paddingRight: dpWidth(4),
    },
    labelStyle: {
        color: Colors.borderColor2,
        fontFamily: Font.medium,
        fontSize: dpFont(15),
        marginBottom: dpHeight(1)
    },
    container: {
        alignItems: 'center',
        marginTop: dpHeight(2)
    },
    viewCircle: {
        height: dpHeight(16),
        width: dpHeight(16),
        borderRadius: dpHeight(8),
        overflow: 'hidden',
        backgroundColor: Colors.lightRed2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: dpFont(45),
        color: Colors.white,
        fontFamily: Font.medium
    },
    roleTxt: {
        fontSize: dpFont(15),
        color: Colors.black2,
        fontFamily: Font.semiBold,
        paddingTop: dpHeight(0.6)
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: dpHeight(0.6)
    },
    femaleTxt: {
        fontSize: dpFont(15),
        color: Colors.grey,
        fontFamily: Font.regular,
    },
    dot: {
        height: dpHeight(0.8),
        width: dpHeight(0.8),
        borderRadius: dpHeight(1),
        backgroundColor: Colors.lightGrey,
        marginHorizontal: dpHeight(1)
    },
    editIcon: {
        height: dpHeight(3.5),
        width: dpHeight(3.5),
        backgroundColor: Colors.voilet,
        borderRadius: dpHeight(0.5),
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: '-5%',
        right: '35%'
    }
})
export default styles;