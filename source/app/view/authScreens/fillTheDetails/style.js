import { StyleSheet } from "react-native";
import { Colors } from "../../../../assets/styles/Colors";
import { dpBorderWidth, dpFont, dpHeight, dpImageHeight, dpImageWidth, dpSpacing, dpWidth } from "../../../../assets/styles/Sizes";
import { Font } from "../../../../assets/styles/FontsFamily";

export const createStyles = (apiColors) => {
    return StyleSheet.create({
        main: {
            flex: 1,
            backgroundColor: Colors.white,
            paddingHorizontal: dpSpacing(5)
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
            height: dpHeight(6.5),
            borderRadius: dpHeight(1),
            borderWidth: dpFont(1),
            borderColor: Colors.borderColor2,
            fontFamily: Font.regular,
            backgroundColor: Colors.offWhite4,
            paddingLeft: dpWidth(3),
            paddingRight: dpWidth(4),
        },
        labelStyle: {
            color: Colors.darkGrey2,
            fontFamily: Font.medium,
            fontSize: dpFont(15),
            marginBottom: dpHeight(1)
        },
        requiredAsterisk: {
            color: Colors.red
        },
        container: {
            alignItems: 'center',
            marginTop: dpHeight(2)
        },
        viewCircle: {
            height: dpHeight(16),
            width: dpHeight(16),
            borderRadius: dpHeight(8),
            overflow: 'hidden',
            backgroundColor: Colors.lightRed2,
            alignItems: 'center',
            justifyContent: 'center'
        },
        userImage: {
            height: dpImageHeight(200),
            width: dpImageWidth(200),
            borderRadius: dpHeight(0),
            overflow: 'hidden',
            backgroundColor : Colors.background
        },
        roleTxt: {
            fontSize: dpFont(15),
            color: Colors.black2,
            fontFamily: Font.semiBold,
            paddingTop: dpHeight(0.6)
        },
        infoRow: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: dpHeight(0.6)
        },
        femaleTxt: {
            fontSize: dpFont(15),
            color: Colors.grey,
            fontFamily: Font.regular,
        },
        dot: {
            height: dpHeight(0.8),
            width: dpHeight(0.8),
            borderRadius: dpHeight(1),
            backgroundColor: Colors.lightGrey,
            marginHorizontal: dpHeight(1)
        },
        editIcon: {
            height: dpHeight(3.5),
            width: dpHeight(3.5),
            backgroundColor: Colors.voilet,
            borderRadius: dpHeight(0.5),
            overflow: 'hidden',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            bottom: '-5%',
            right: '35%'
        },
        viewBtn: {
            flexDirection: 'row',
            alignItems: 'center',
            columnGap: dpWidth(5),
            marginTop: dpHeight(2),
            paddingHorizontal: dpWidth(3)
        },
        col1: {
            flex: 0.5
        },
        col2: {
            flex: 0.5
        },
        col3: {
            flex: 0.5,
            marginLeft: dpWidth(5)
        },
        btnStyle: {
            borderRadius: dpHeight(2.5),
            backgroundColor: apiColors?.primary || Colors.primary,
            borderWidth: dpBorderWidth(0.5),
            borderColor: apiColors?.primary || Colors.primary,
            width: '100%'
        },
        btnStyle2: {
            borderRadius: dpHeight(2.5),
            backgroundColor: Colors.background,
            borderWidth: dpBorderWidth(0.5),
            borderColor: apiColors?.primary || Colors.primary,
            width: '100%'
        },
        titleStyle: {
            color: apiColors?.primary || Colors.primary,
            fontSize: dpFont(15),
            fontFamily: Font.medium,
        }
    })
}
