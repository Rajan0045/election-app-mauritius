import { StyleSheet } from "react-native";
import { Colors } from "../../../assets/styles/Colors";
import { Font } from "../../../assets/styles/FontsFamily";
import { dpBorderWidth, dpFont, dpHeight, dpWidth } from "../../../assets/styles/Sizes";

export const createStyles = (apiColors) => {
    return StyleSheet.create({
        main: {
            flex: 1,
            backgroundColor: Colors.white
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
            height: dpHeight(16),
            borderRadius: dpHeight(1.2),
            borderWidth: dpFont(1),
            borderColor: Colors.borderColor,
            fontFamily: Font.regular,
            backgroundColor: Colors.white,
            paddingLeft: dpWidth(3),
            paddingRight: dpWidth(4),
            alignItems: 'flex-start'
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
        input: {
            height: dpHeight(15),
            alignItems: 'flex-start'
        },
        viewBtn: {
            flexDirection: 'row',
            alignItems: 'center',
            columnGap: dpWidth(5),
            marginTop: dpHeight(1),
            paddingHorizontal: dpWidth(3)
        },
        col1: {
            flex: 0.5
        },
        col2: {
            flex: 0.5
        },
        btnStyle: {
            borderRadius: dpHeight(2),
            paddingVertical: dpHeight(1.8),
            paddingHorizontal: dpWidth(12),
            backgroundColor: apiColors?.primary || Colors.primary,
            borderWidth: dpBorderWidth(0.5),
            borderColor: apiColors?.primary || Colors.primary,
            width: '100%'
        },
        btnStyle2: {
            borderRadius: dpHeight(2),
            paddingVertical: dpHeight(1.8),
            paddingHorizontal: dpWidth(12),
            backgroundColor: Colors.background,
            borderWidth: dpBorderWidth(0.5),
            borderColor: apiColors?.primary || Colors.primary,
            width: '100%'
        },
        titleStyle: {
            color: apiColors?.primary || Colors.primary,
            fontSize: dpFont(15),
            fontFamily: Font.medium,
        },
        scroll: {
            flexGrow: 1,
            paddingBottom: dpHeight(4)
        }
    });
};