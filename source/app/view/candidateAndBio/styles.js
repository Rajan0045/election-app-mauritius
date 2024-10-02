import { StyleSheet } from "react-native";
import { Colors } from "../../../assets/styles/Colors";
import { dpFont, dpHeight, dpSpacing, dpWidth } from "../../../assets/styles/Sizes";
import { Font } from "../../../assets/styles/FontsFamily";


const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: Colors.background,
        paddingHorizontal: dpSpacing(5)
    },
    viewSearch: {
        marginTop: dpHeight(1)
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
    containerStyle: {
        flexGrow: 1,
        paddingBottom: dpHeight(2)
    }
})
export default styles;