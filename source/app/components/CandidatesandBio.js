import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Colors } from '../../assets/styles/Colors'
import { Font } from '../../assets/styles/FontsFamily'
import globalStyles from '../../assets/styles/GlobalStyles'
import { dpFont, dpHeight, dpImageHeight, dpImageWidth } from '../../assets/styles/Sizes'
import { Images } from '../../assets/styles/Images'
import Constant from '../../apis/constant'


const CandidateAndBioComponent = (props) => {
    const { name, bio, image, designation, onBioPress, description } = props;

    return (
        <TouchableOpacity onPress={()=> onBioPress(description)}>
        <View style={styles.main}>
            <View style={styles.row}>
                <View style={styles.col1}>
                    <View style={styles.viewImg}>
                        <Image
                            source={image ? { uri: `${Constant.image}${image}` } : Images.dummyUser}
                            style={globalStyles.image}
                            resizeMode="cover"
                            onPress={()=> onBioPress(bio)}
                        />
                    </View>
                </View>
                <View style={styles.col2}>
                    <Text style={styles.name} numberOfLines={1}>{name ? name : ""}</Text>
                    <Text style={styles.designation} numberOfLines={1}>{designation ? designation : ""}</Text>
                    <Text style={styles.discription} numberOfLines={3}>{bio ? bio : ""}</Text>
                </View>
            </View>
        </View>
        </TouchableOpacity>
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
        color: Colors.darkGrey,
        fontFamily: Font.semiBold,
        paddingBottom: dpHeight(0.4)
    },
    designation: {
        fontSize: dpFont(14),
        color: Colors.grey,
        fontFamily: Font.medium,
        paddingBottom: dpHeight(0.4)
    },
    discription: {
        fontSize: dpFont(13),
        color: Colors.lightGrey3,
        fontFamily: Font.regular,
        lineHeight: dpFont(24),
        paddingBottom: dpHeight(1)
    },
})

export default CandidateAndBioComponent
