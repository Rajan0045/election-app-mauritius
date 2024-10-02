import { StyleSheet } from "react-native";
import { Colors } from "../../../assets/styles/Colors";
import { dpHeight, dpSpacing } from "../../../assets/styles/Sizes";

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    containerStyle: {
        flexGrow: 1,
        paddingTop: dpHeight(2),
        paddingBottom: dpHeight(2)
    },
})
export default styles;