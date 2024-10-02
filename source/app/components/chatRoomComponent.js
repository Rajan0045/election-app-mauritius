import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Colors } from '../../assets/styles/Colors'
import { Font } from '../../assets/styles/FontsFamily'
import globalStyles from '../../assets/styles/GlobalStyles'
import { Images } from '../../assets/styles/Images'
import { dpFont, dpHeight, dpImageHeight, dpImageWidth, dpSpacing, dpWidth } from '../../assets/styles/Sizes'
import { openWhatsApp } from '../helpers/Links/whatsappLink'
import { useToast } from 'react-native-toast-notifications'
import Constant from '../../apis/constant'

const ChatRoomComponent = (props) => {
    const { name, phoneNumber, image, constituency } = props;
    const toast = useToast();

    const handleWhatsApp = async () => {
        const result = await openWhatsApp(phoneNumber);
        if (!result.success) {
            toast.show(result.message, {
                type: "danger",
                placement: 'top',
                duration: 4000,
                offset: 30,
                animationType: "slide-in",
                swipeEnabled: false
            });
        } else;
    };

    return (
        <View style={styles.main}>
            <View style={styles.row}>
                <View style={styles.col1}>
                    <View style={styles.viewImg}>
                        <Image
                            source={image ? {uri : `${Constant.image}${image}`} : Images.dummyUser}
                            style={globalStyles.image}
                            resizeMode="cover"
                        />
                    </View>
                </View>
                <View style={styles.col2}>
                    <Text style={styles.name} numberOfLines={1}>{name ? name : ""}</Text>
                    <>
                        {constituency && constituency.length > 0 ?
                            constituency.map((data, i) => (
                                <Text style={styles.discription} key={i}>{data.title ? data.title : ''} </Text>
                            ))
                            :
                            null
                        }
                    </>
                    <TouchableOpacity style={styles.button} onPress={() => handleWhatsApp()}>
                        <View style={styles.whatsImg}>
                            <Image
                                source={Images.whatsapp}
                                style={globalStyles.image}
                                resizeMode="cover"
                            />
                        </View>
                        <Text style={styles.contact}>Contact</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: Colors.background,
        marginBottom: dpHeight(3.5),
    },
    row: {
        flexDirection: 'row',
        columnGap: dpHeight(2)
    },
    col1: {
        flex: 0.33
    },
    col2: {
        flex: 0.67
    },
    viewImg: {
        height: dpImageHeight(114),
        width: '100%',
        borderRadius: dpHeight(1.2),
        overflow: 'hidden',
    },
    whatsImg: {
        height: dpImageHeight(18),
        width: dpImageWidth((18)),
        overflow: 'hidden',
    },
    name: {
        fontSize: dpFont(16),
        color: Colors.black,
        fontFamily: Font.semiBold,
        paddingBottom: dpHeight(0.4)
    },
    discription: {
        fontSize: dpFont(13),
        color: Colors.lightGrey3,
        fontFamily: Font.regular,
        lineHeight: dpFont(24),
        letterSpacing: dpSpacing(0.1),
        paddingBottom: dpHeight(1)
    },
    button: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.lightGreen,
        paddingVertical: dpHeight(0.5),
        borderRadius: dpWidth(1.4),
        borderWidth: dpWidth(0.2),
        borderColor: Colors.green,
        width: dpWidth(28)
    },
    contact: {
        fontSize: dpFont(15),
        color: Colors.darkGreen,
        fontFamily: Font.regular,
        lineHeight: dpFont(22),
        paddingLeft: dpWidth(2)
    }
})

export default ChatRoomComponent
