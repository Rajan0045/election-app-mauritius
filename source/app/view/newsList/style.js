import { StyleSheet } from "react-native";
import { Colors } from "../../../assets/styles/Colors";
import { dpBorderWidth, dpFont, dpHeight, dpImageHeight, dpImageWidth, dpSpacing, dpWidth } from "../../../assets/styles/Sizes";
import { Font } from "../../../assets/styles/FontsFamily";

export const createStyles = (apiColors) => {
    return StyleSheet.create({
        main: {
            flex: 1,
            backgroundColor: Colors.white
        },
        viewSearch: {
            flexDirection: 'row',
            paddingHorizontal: dpSpacing(5),
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
            backgroundColor: Colors.lightBlue3,
            borderWidth: dpBorderWidth(0.6),
            borderColor: Colors.navyBlue,
            paddingVertical: dpHeight(1.68),
            borderRadius: dpHeight(1.2),
            overflow: 'hidden',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
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
        tabRow: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: dpSpacing(5),
            marginTop: dpHeight(-0.5)
        },
        col1: {
            flex: 0.5,
        },
        col2: {
            flex: 0.5
        },
        leftTab: {
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
        containerStyle: {
            flexGrow: 1,
            paddingLeft: dpSpacing(5),
            marginTop: dpHeight(2),
            marginBottom: dpHeight(1)
        },
        cateTxtAction: {
            fontSize: dpFont(16),
            color: Colors.black,
            fontFamily: Font.medium
        },
        containerStyle2: {
            flexGrow: 1,
            // paddingTop: dpHeight(2),
            paddingHorizontal: dpSpacing(5),
            // paddingBottom: dpHeight(2)
        },
        viewImg: {
            height: dpImageHeight(16),
            width: dpImageWidth(16),
            overflow: 'hidden'
        },
        categoryView: {
            height: dpHeight(7)
        },
        categoryView2 : {
            height: dpHeight(4),
            marginTop:dpHeight(-1),
            marginBottom:dpHeight(1)
        }
    });
};