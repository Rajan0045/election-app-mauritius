import { StyleSheet } from "react-native";
import { Colors } from "../../../assets/styles/Colors";
import { dpBorderWidth, dpFont, dpHeight, dpImageHeight, dpImageWidth, dpSpacing, dpWidth } from "../../../assets/styles/Sizes";
import { Font } from "../../../assets/styles/FontsFamily";

export const createStyles = (apiColors) => {
    return StyleSheet.create({
        main: {
            flex: 1,
            backgroundColor: Colors.white,
            paddingHorizontal: dpSpacing(5)
        },
        viewSearch: {
            marginTop: dpHeight(2)
        },
        viewSearch: {
            flexDirection: 'row',
            marginTop: dpHeight(2),
            columnGap: dpSpacing(4)
        },
        searchCol: {
            flex: 0.7
        },
        filterCol: {
            flex: 0.3
        },
        filterBtn: {
            height: dpHeight(6.5),
            backgroundColor: Colors.offWhite,
            borderWidth: dpBorderWidth(0.6),
            borderColor: Colors.offWhite,
            paddingVertical: dpHeight(1.68),
            borderRadius: dpHeight(1.2),
            overflow: 'hidden',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
        filterActive: {
            backgroundColor: apiColors?.tabs || Colors.lightBlue3,
            borderWidth: dpBorderWidth(0.4),
            borderColor: apiColors?.tab_border || Colors.navyBlue,
            paddingVertical: dpHeight(1.68),
            borderRadius: dpHeight(1.2),
            overflow: 'hidden',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
        filterView: {
            height: dpImageHeight(18),
            width: dpImageWidth(18),
            overflow: 'hidden'
        },
        filterTxt: {
            fontSize: dpFont(15),
            color: Colors.black4,
            fontFamily: Font.regular,
            paddingLeft: dpWidth(2.4)
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
        },
        appliedFilterArea: {
            marginTop: dpHeight(-1),
            marginBottom: dpHeight(2),
        },
        row: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        appliedView: {
            backgroundColor: Colors.lightBlue3,
            paddingVertical: dpHeight(0.6),
            paddingHorizontal: dpWidth(2),
            borderRadius: dpWidth(1),
            flexDirection: 'row',
            alignItems: 'center',
        },
        apliedText: {
            fontSize: dpFont(13),
            color: Colors.grey2,
            fontFamily: Font.regular,
        },
        containerStyle: {
            flexGrow: 1,
            paddingBottom: dpHeight(2),
        },
        tabRow: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: dpHeight(2.5)
        },
        col1: {
            flex: 0.5,
        },
        col2: {
            flex: 0.5
        },
        leftTab: {
            height : dpHeight(6.5),
            flexDirection: 'row',
            justifyContent: 'center',
            paddingVertical: dpHeight(1.5),
            borderWidth: dpBorderWidth(0.4),
            borderColor: Colors.grey3,
            alignItems: "center",
            borderTopLeftRadius: dpHeight(1.4),
            borderBottomLeftRadius: dpHeight(1.4),
            backgroundColor: Colors.offWhite2
        },
        rightTab: {
            height : dpHeight(6.5),
            flexDirection: 'row',
            justifyContent: 'center',
            paddingVertical: dpHeight(1.5),
            borderWidth: dpBorderWidth(0.4),
            borderColor: Colors.grey3,
            alignItems: "center",
            borderTopRightRadius: dpHeight(1.4),
            borderBottomRightRadius: dpHeight(1.4),
            backgroundColor: Colors.offWhite2
        },
        tabTitle: {
            fontSize: dpFont(15),
            color: Colors.black,
            fontFamily: Font.semiBold,
            paddingLeft: dpWidth(2.5)
        },
        filterView: {
            height: dpImageHeight(18),
            width: dpImageWidth(18),
            overflow: 'hidden'
        },
        viewCate: {
            marginRight: dpHeight(2)
        },
        viewCateActive: {
            marginRight: dpHeight(2),
            borderBottomWidth: dpBorderWidth(0.6),
            borderColor: apiColors?.primary || Colors.primary,
            paddingBottom: dpHeight(0.5)
        },
        cateTxt: {
            fontSize: dpFont(16),
            color: Colors.darkGrey2,
            fontFamily: Font.medium
        },
    });
};
