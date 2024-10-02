import { Image, StyleSheet, Text, View } from 'react-native';
import { Images } from '../../assets/styles/Images';
import { dpFont, dpHeight, dpImageHeight, dpImageWidth, dpSpacing } from '../../assets/styles/Sizes';
import { Colors } from '../../assets/styles/Colors';
import { Font } from '../../assets/styles/FontsFamily';
import globalStyles from '../../assets/styles/GlobalStyles';


export default function EmptyStatesNotifications(props) {

    return (
        <View style={styles.main}>
            <View style={styles.viewImg}>
                <Image
                    source={Images.notification}
                    resizeMode='contain'
                    style={globalStyles.image}
                />
            </View>
            <Text style={styles.title}>
                {props && props.message ? props.message : 'No Notifications'}
            </Text>
            <Text style={styles.info}>We’ll let you know when there will be something to update you.</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: dpSpacing(8)
    },
    info: {
        color: Colors.grey,
        fontSize: dpFont(14),
        fontFamily: Font.regular,
        textAlign: 'center',
        lineHeight: dpFont(22),
        marginTop: dpHeight(1)
    },
    title: {
        color: Colors.black,
        fontSize: dpFont(18),
        fontFamily: Font.bold,
        marginTop: dpHeight(3)
    },
    viewImg: {
        width: dpImageWidth(60),
        height: dpImageHeight(60),
        overflow: 'hidden'
    }
})