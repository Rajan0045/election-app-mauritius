import { StyleSheet } from "react-native";
import { Colors } from "../../../assets/styles/Colors";
import { Font } from "../../../assets/styles/FontsFamily";
import { dpFont, dpHeight, dpImageHeight, dpSpacing, dpWidth } from "../../../assets/styles/Sizes";

export const createStyles = (apiColors) => {
    return StyleSheet.create({
        main: {
            flex: 1,
            backgroundColor: Colors.white
        },
        scroll: {
            flexGrow: 1
        },
        subMain: {
            flex: 1,
            paddingHorizontal: dpSpacing(5)
        },
        viewImg: {
            height: dpImageHeight(220),
            width: '100%',
            borderRadius: dpHeight(1.2),
            overflow: 'hidden',
            marginTop: dpHeight(1),
        },
        row: {
            flexDirection: "row",
            alignItems: 'center',
            marginTop: dpHeight(2)
        },
        col1: {
            flex: 0.7
        },
        col2: {
            flex: 0.3,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end'
        },
        userName: {
            fontSize: dpFont(16),
            fontFamily: Font.semiBold,
            color: Colors.black3
        },
        ptrButton: {
            paddingVertical: dpSpacing(0.6),
            paddingHorizontal: dpWidth(3),
            borderRadius: dpWidth(1),
            borderWidth: dpWidth(0.4),
            borderColor: apiColors?.primary || Colors.primary,
            fontFamily: Font.medium,
            fontSize: dpFont(12),
            color: apiColors?.primary || Colors.primary,
            backgroundColor: Colors.offWhite3
        },
        votedButton: {
            paddingVertical: dpSpacing(0.6),
            paddingHorizontal: dpWidth(3),
            borderRadius: dpWidth(1),
            borderWidth: dpWidth(0.4),
            borderColor: Colors.green2,
            fontFamily: Font.medium,
            fontSize: dpFont(12),
            color: Colors.green2,
            marginLeft: dpWidth(2),
            backgroundColor: Colors.offWhite3
        },
        vSpace: {
            marginVertical: dpHeight(1),
        },
        idTxt: {
            fontSize: dpFont(14),
            fontFamily: Font.regular,
            color: Colors.secondary
        },
        idNumber: {
            fontSize: dpFont(15),
            fontFamily: Font.medium,
            color: Colors.black3,
            paddingTop: dpHeight(1)
        },
        phoneNumber: {
            fontSize: dpFont(14),
            fontFamily: Font.medium,
            color: Colors.grey2,
            paddingBottom: dpHeight(2),
            paddingTop: dpHeight(0.5),
        },
        activityMain: {
            flex: 1,
            borderTopLeftRadius: dpHeight(3.5),
            borderTopRightRadius: dpHeight(3.5),
            marginTop: dpHeight(2),
            backgroundColor: Colors.lightGrey4,
            paddingBottom: dpHeight(4)
        },
        activityTxt: {
            fontSize: dpFont(17),
            fontFamily: Font.medium,
            color: apiColors?.primary || Colors.primary,
            paddingVertical: dpHeight(1.5),
            paddingHorizontal: dpSpacing(5)
        },
        activityView: {
            marginVertical: dpHeight(1),
            paddingHorizontal: dpSpacing(5)
        },
        activity: {
            fontSize: dpFont(15),
            fontFamily: Font.medium,
            color: Colors.black3,
        },
        timeTxt: {
            fontSize: dpFont(14),
            fontFamily: Font.regular,
            color: Colors.grey2,
            paddingTop: dpHeight(0.5)
        },
        line: {
            width: '100%',
            height: dpHeight(0.1),
            backgroundColor: Colors.lightGrey,
            marginBottom: dpHeight(1)
        }

    });
}