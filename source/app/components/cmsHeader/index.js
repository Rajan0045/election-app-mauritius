import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import { Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../../assets/styles/Colors";
import { Dimension } from "../../../assets/styles/Dimension";
import { IconsName, IconsType } from "../../../assets/styles/Icon";
import styles from "./styles";
import { Image } from "react-native";
import { Images } from "../../../assets/styles/Images";
import globalStyles from "../../../assets/styles/GlobalStyles";


const CmsHeader = (props) => {
    const { title, onback, notification } = props;
    const navigation = useNavigation();

    return (
        <View style={styles.main}>
            <View style={styles.innerArea}>
                <View style={styles.iconTextSec}>
                    <View style={styles.col1}>
                        <TouchableOpacity style={styles.icon} onPress={() => onback ? onback() : navigation.goBack()}  >
                            <Icon
                                type={IconsType.antDesign}
                                name={IconsName.arrowleft}
                                size={Dimension.large2}
                                color={Colors.black2}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.col2}>
                        <Text style={styles.heading}>{title ? title : ''}</Text>
                    </View>
                    <View style={styles.col3}>
                        {notification ?
                            <TouchableOpacity style={styles.notiIcon} onPress={() => navigation.navigate('notifications')} >
                                <View style={styles.active} />
                                <View style={styles.viewImg}>
                                    <Image
                                        source={Images.bell}
                                        style={globalStyles.image}
                                        resizeMode="contain"
                                    />
                                </View>
                            </TouchableOpacity>
                            :
                            null
                        }
                    </View>
                </View>
            </View>
        </View>
    )
};

export default CmsHeader;