import { StyleSheet } from "react-native";
import { dpImageHeight, dpImageWidth } from "../../../../assets/styles/Sizes";


const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoImage: {
        width: dpImageWidth(210),
        height: dpImageHeight(190)
    },
    image: {
        height: "100%",
        width: '100%',
    }
})
export default styles;