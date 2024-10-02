import { StyleSheet } from "react-native";
import { Colors } from "../../../assets/styles/Colors";
import { dpBorderWidth, dpFont, dpHeight, dpImageHeight, dpSpacing, dpWidth } from "../../../assets/styles/Sizes";
import { Font } from "../../../assets/styles/FontsFamily";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    currentImg: {
        fontSize: dpFont(16),
        color: Colors.white,
        marginVertical: 20,
        textAlign: 'center',
    },
    grid: {
        height: dpImageHeight(120),
        borderWidth: dpBorderWidth(0.5),
        borderColor: Colors.white
    },
    containerStyle: {
        flexGrow: 1,
        paddingBottom: dpHeight(2),
        paddingHorizontal: dpSpacing(5)
    },
    Row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: dpSpacing(5),
        marginTop: dpHeight(2)
    },
    col: {
        flex: 0.3333
    },
    title: {
        fontSize: dpFont(15),
        color: Colors.white,
        fontFamily: Font.regular,
        textAlign: 'center'
    },
    ScrollView: {
        flex: 1
    },
    contentContainerStyle: {
        flexGrow: 1,
        paddingBottom: dpHeight(4)
    },
    viewSearch: {
        marginTop: dpHeight(1),
        paddingHorizontal: dpSpacing(5)
    },
    inputContainerStyle: {
        height: dpHeight(6.5),
        borderRadius: dpHeight(1.2),
        borderWidth: dpFont(1),
        borderColor: Colors.offWhite,
        fontFamily: Font.regular,
        backgroundColor: Colors.offWhite,
        paddingLeft: dpWidth(5),
        paddingRight: dpWidth(5),
        width: '100%',
        fontSize: dpFont(12)
    },
});

export default styles