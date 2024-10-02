import { StyleSheet } from "react-native";
import { Colors } from "../../../assets/styles/Colors";
import { dpFont, dpHeight, dpSpacing } from "../../../assets/styles/Sizes";
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
    heading: {
        fontSize: dpFont(18),
        fontFamily: Font.bold,
        color: Colors.black2,
        textAlign: 'center'
    },
})
export default styles;