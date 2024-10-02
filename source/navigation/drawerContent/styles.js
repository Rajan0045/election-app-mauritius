
import { Platform, StyleSheet } from 'react-native'
import { Colors } from '../../assets/styles/Colors';
import { dpFont, dpHeight, dpImageHeight, dpImageWidth, dpSpacing, dpWidth } from '../../assets/styles/Sizes';
import { Font } from '../../assets/styles/FontsFamily';

export const createStyles = (apiColors) => {
    return StyleSheet.create({
        container: {
            height: '100%',
            width: '100%',
            backgroundColor: Colors.background
        },
        scroll: {
            flexGrow: 1,
            paddingTop: dpHeight(0.5)
        },
        scrollCont: {
            flexGrow: 1,
            paddingBottom: dpHeight(10)
        },
        body: {
            flexGrow: 1,
            paddingHorizontal: dpSpacing(3)
        },
        labelStyle: {
            marginLeft: dpWidth(-5),
            fontSize: dpFont(14),
            color: Colors.black,
            fontFamily: Font.medium,
            lineHeight: dpFont(15)
        },
        itemMain: {
            marginTop: Platform.OS === 'ios' ? dpHeight(4) : dpHeight(4),
        },
        itemMain2: {
            marginTop: Platform.OS === 'ios' ? dpHeight(3) : dpHeight(3),
        },
        row: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: dpHeight(1.2),
        },
        rowFlex1: {
            flexDirection: 'row',
            paddingVertical: dpHeight(0.3),
            paddingHorizontal: dpHeight(1),
            alignItems: 'center',
        },
        logoutCon: {
            flexDirection: 'row',
            // paddingVertical: dpHeight(1),
            paddingBottom: dpHeight(2),
            paddingLeft: dpHeight(9),
            alignItems: 'center'
        },
        drawerHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: dpHeight(2),
            marginBottom: dpHeight(3),
            paddingHorizontal: dpSpacing(2)
        },
        imageMain: {
            height: dpImageHeight(20),
            width: dpImageWidth(20),
            overflow: 'hidden'
        },
        leftArea: {
            flex: .15
        },
        rightArea: {
            flex: 0.85
        },
        iconMain: {
        },
        iconMain2: {
        },
        content: {
            flex: 1,
            marginLeft: dpHeight(-1),
            marginRight: dpHeight(-5)
        },
        image: {
            height: '100%',
            width: '100%',
        },
        userCol: {
            flex: 0.75,
            flexDirection: 'row',
            alignItems: 'center',
        },
        closeCol: {
            flex: 0.25,
            alignItems: 'flex-end'
        },
        userImg: {
            height: dpImageHeight(40),
            width: dpImageWidth(40),
            borderRadius: dpImageHeight(20),
            overflow: 'hidden'
        },
        gmTxt: {
            fontSize: dpFont(13),
            color: Colors.grey2,
            fontFamily: Font.regular
        },
        userTxt: {
            fontSize: dpFont(13),
            color: Colors.black2,
            fontFamily: Font.bold
        },
        line: {
            width: '100%',
            height: dpHeight(0.1),
            backgroundColor: Colors.lightGrey2,
            marginVertical: dpHeight(2)
        },
        viewBtn: {
            position: 'absolute',
            bottom: '8%',
            left: dpSpacing(6),
        },
        btnStyle: {
            borderRadius: dpHeight(1.8),
            paddingVertical: dpHeight(1.4),
            paddingHorizontal: dpWidth(12),
            backgroundColor: apiColors?.primary || Colors.primary,
            width: dpWidth(40)
        },
        labelView: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        drawerItemStyle: {
            height: dpHeight(5.3),
            justifyContent: 'center',
            marginTop: dpHeight(0.1),
            marginBottom: dpHeight(0.1)
        }
    });
}