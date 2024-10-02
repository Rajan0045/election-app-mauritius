import { StyleSheet } from "react-native";
import { Colors } from "../../../../assets/styles/Colors";
import { dpFont, dpHeight, dpImageHeight, dpImageWidth, dpSpacing, dpWidth } from "../../../../assets/styles/Sizes";
import { Font } from "../../../../assets/styles/FontsFamily";


const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: Colors.background
    },
    ScrollView: {
        flexGrow: 1,
    },
    contentContainerStyle: {
        flexGrow: 1,
        paddingBottom: dpHeight(4)
    },
    subBody: {
        paddingHorizontal: dpSpacing(6),
        flex: 1,
        paddingTop: dpHeight(1),
        marginBottom:dpHeight(7)
    },
    logosView: {
        position: "absolute",
        bottom: 0,
        right: dpSpacing(5),
        left: dpSpacing(5),
    },
    logoImage: {
        height: dpImageHeight(54),
        width: dpImageWidth(54),
        shadowColor: Colors.black3,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        
        elevation: 7,
    },
    contentStyle: {
        p: {
            color: Colors.cmsText,
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
            color: Colors.cmsText,
            fontSize: dpFont(15),
            fontFamily: Font.regular,
            marginBottom: dpHeight(0),
            lineHeight: dpFont(22),
            paddingLeft: dpWidth(2),
        },
        li: {
            color: Colors.cmsText,
            fontSize: dpFont(15),
            fontFamily: Font.regular,
            marginBottom: dpHeight(1),
            paddingLeft: dpWidth(0.4),
            marginTop: dpHeight(-0.2),
        },
    }
});
export default styles;