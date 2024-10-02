import { createTheme } from '@rneui/themed';
import { Font } from './FontsFamily';
import { dpFont, dpHeight, dpWidth } from './Sizes';
import { Colors } from './Colors';

export const Theme = createTheme({
    components: {
        Input: {
            labelStyle: {
                color: Colors.black2,
                fontFamily: Font.medium,
                fontSize: dpFont(15),
                fontWeight: "500",
                marginBottom: dpHeight(1),
            },
            placeholderTextColor: Colors.placeholderColor,
            placeholder: {
                color: Colors.placeholderColor,
            },
            selectionColor: Colors.primary,
            containerStyle: {
                paddingRight: 0,
                paddingLeft: 0,
                marginBottom: dpHeight(-0.4)
            },
            inputContainerStyle: {
                height: dpHeight(6.5),
                borderRadius: dpHeight(1),
                borderWidth: dpFont(1),
                borderColor: Colors.borderColor,
                fontFamily: Font.regular,
                backgroundColor: Colors.white,
                paddingLeft: dpWidth(3),
                paddingRight: dpWidth(4),
                width: '100%',
            },
            errorStyle: {
                color: Colors.errorColor,
                fontFamily: Font.regular,
                fontSize: dpFont(13),
                marginTop: dpHeight(0.3),
                padding: 0,
            },
            fontFamily: Font.regular,
            fontSize: dpFont(15),
        },
        Button: {
            type: 'solid',
            titleStyle: {
                color: Colors.white,
                fontSize: dpFont(15),
                fontFamily: Font.medium,
                textAlign: 'center',
                alignItems: 'center',
                width: '100%',
            },
            buttonStyle: {
                borderRadius: dpHeight(4),
                paddingVertical: dpHeight(1.8),
                paddingHorizontal: dpWidth(5),
                backgroundColor: Colors.primary
            },
            containerStyle: {
                borderRadius: dpHeight(1),
            },
        },
    },
});
