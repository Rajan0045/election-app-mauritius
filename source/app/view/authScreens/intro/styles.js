import { StyleSheet } from "react-native";
import { Colors } from "../../../../assets/styles/Colors";
import { dpBorderWidth, dpFont, dpHeight, dpSpacing } from "../../../../assets/styles/Sizes";
import { Font } from "../../../../assets/styles/FontsFamily";


export const createStyles = (apiColors) => {
    return StyleSheet.create({
        main: {
            flex: 1,
            backgroundColor: Colors.white,
        },
        viewMain: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingHorizontal: dpSpacing(8)
        },
        container: {
            height: dpHeight(52),
            width: '100%',
            backgroundColor: apiColors?.primary || Colors.primary,
            marginBottom: dpHeight(4),
            borderRadius: dpHeight(7),
        },
        heading: {
            fontSize: dpFont(38),
            color: Colors.white,
            fontFamily: Font.extraBold,
            textAlign: 'center',
            paddingTop: dpHeight(4),
        },
        description: {
            fontSize: dpFont(15),
            color: Colors.white,
            fontFamily: Font.regular,
            textAlign: 'center',
            lineHeight: dpFont(22)
        },
        viewDesc: {
            marginTop: dpHeight(1),
            paddingHorizontal: dpSpacing(8)
        },
        btnView: {
            position: 'absolute',
            bottom: 0,
            height: "48%",
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
        },
        btnCirb: {
            height: dpHeight(14),
            width: dpHeight(14),
            borderRadius: dpHeight(7),
            borderWidth: dpBorderWidth(1),
            borderColor: Colors.yellow,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute'
        },
        btnCir: {
            height: dpHeight(14),
            width: dpHeight(14),
            borderRadius: dpHeight(7),
            borderWidth: dpBorderWidth(1),
            borderTopColor: Colors.lightRed,
            borderLeftColor: Colors.lightRed,
            borderBottomColor: Colors.lightRed,
            borderRightColor: Colors.yellow,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            transform: [{ rotate: '-45deg' }],
        },
        btnCir1: {
            height: dpHeight(14),
            width: dpHeight(14),
            borderRadius: dpHeight(7),
            borderWidth: dpBorderWidth(1),
            alignItems: 'center',
            justifyContent: 'center',
            borderTopColor: Colors.lightRed,
            borderLeftColor: Colors.lightRed,
            borderBottomColor: Colors.yellow,
            borderRightColor: Colors.yellow,
            position: 'absolute',
            transform: [{ rotate: '-45deg' }],
        },
        btnCir2: {
            height: dpHeight(14),
            width: dpHeight(14),
            borderRadius: dpHeight(7),
            borderWidth: dpBorderWidth(1),
            alignItems: 'center',
            justifyContent: 'center',
            borderTopColor: Colors.lightRed,
            borderLeftColor: Colors.yellow,
            borderBottomColor: Colors.yellow,
            borderRightColor: Colors.yellow,
            position: 'absolute',
            transform: [{ rotate: '-45deg' }],
        },
        btn: {
            height: dpHeight(9),
            width: dpHeight(9),
            borderRadius: dpHeight(5),
            backgroundColor: apiColors?.splash_screen_button || Colors.voilet,
            alignItems: 'center',
            justifyContent: 'center'
        }
    });
};