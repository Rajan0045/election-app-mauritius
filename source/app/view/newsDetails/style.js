import { StyleSheet } from "react-native";
import { Colors } from "../../../assets/styles/Colors";
import { dpFont, dpHeight, dpImageHeight, dpSpacing, dpWidth } from "../../../assets/styles/Sizes";
import { Font } from "../../../assets/styles/FontsFamily";

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: Colors.white,
        paddingHorizontal: dpSpacing(5)
    },
    title: {
        fontSize: dpFont(16),
        color: Colors.black,
        fontFamily: Font.medium,
        paddingTop: dpHeight(2)
    },
    description: {
        fontSize: dpFont(14),
        color: Colors.darkGrey2,
        fontFamily: Font.regular,
        paddingTop: dpHeight(2),
        lineHeight: dpFont(20)
    },
    viewImg: {
        height: dpImageHeight(220),
        width: '100%',
        borderRadius: dpHeight(1.2),
        overflow: 'hidden',
        marginTop: dpHeight(1)
    },
    subBody: {
        flex: 1,
        paddingTop: dpHeight(1),
        marginBottom: dpHeight(7)
    },
    contentStyle: {
        p: {
            color: Colors.darkGrey2,
            fontFamily: Font.regular,
            fontSize: dpFont(15),
            marginBottom: dpHeight(0),
            lineHeight: dpFont(22),
        },
        b: {
            color: Colors.black2,
            fontFamily: Font.regular,
            fontSize: dpFont(15),
            marginTop: dpHeight(0),
            marginBottom: dpHeight(0)
        },
        h2: {
            color: Colors.black2,
            fontSize: dpFont(24),
            fontFamily: Font.regular,
            marginBottom: dpHeight(0),
            position: 'relative',
        },
        h1: {
            color: Colors.black2,
            fontSize: dpFont(28),
            fontFamily: Font.regular,
            marginBottom: dpHeight(0),
        },
        h3: {
            color: Colors.black2,
            fontSize: dpFont(20),
            fontFamily: Font.regular,
            marginBottom: dpHeight(0),
        },
        h4: {
            color: Colors.black2,
            fontSize: dpFont(18),
            fontFamily: Font.regular,
            marginBottom: dpHeight(0),
        },
        h5: {
            color: Colors.black2,
            fontSize: dpFont(17),
            fontFamily: Font.regular,
            marginBottom: dpHeight(0),
        },
        h6: {
            color: Colors.black2,
            fontSize: dpFont(16),
            fontFamily: Font.regular,
            marginBottom: dpHeight(0),
        },
        ul: {
            color: Colors.darkGrey2,
            fontSize: dpFont(15),
            fontFamily: Font.regular,
            marginBottom: dpHeight(0),
            lineHeight: dpFont(22),
            paddingLeft: dpWidth(2),
        },
        li: {
            color: Colors.darkGrey2,
            fontSize: dpFont(15),
            fontFamily: Font.regular,
            marginBottom: dpHeight(1),
            paddingLeft: dpWidth(0.4),
            marginTop: dpHeight(-0.2),
        },
    }
})
export default styles;