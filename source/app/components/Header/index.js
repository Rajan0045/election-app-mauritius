import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { Colors } from "../../../assets/styles/Colors";
import { Dimension } from "../../../assets/styles/Dimension";
import globalStyles from "../../../assets/styles/GlobalStyles";
import { IconsName, IconsType } from "../../../assets/styles/Icon";
import { Images } from "../../../assets/styles/Images";
import { dpWidth } from "../../../assets/styles/Sizes";
import styles from "./styles";
import { renderImage } from "../../helpers/renderImage";


const Header = (props) => {
    const { title, onback, user, notification, drawer, left } = props;
    const navigation = useNavigation();

    return (
        <View style={styles.main}>
            <View style={styles.innerArea}>
                <View style={styles.iconTextSec}>
                    <View style={styles.col1}>
                        {left === 'back' ?
                            <TouchableOpacity style={styles.icon}
                                onPress={() => onback ? onback() : navigation.goBack()}
                            >
                                <Icon
                                    type={IconsType.antDesign}
                                    name={IconsName.left}
                                    size={Dimension.medium}
                                    color={Colors.black2}
                                />
                            </TouchableOpacity>
                            :
                            <View style={styles.userRow}>
                                <View style={styles.userImg}>
                                    <Image
                                        source={user && user.image ? renderImage(user.image) : Images.dummyUser}
                                        style={globalStyles.image}
                                        resizeMode="cover"
                                    />
                                </View>
                                <View style={{ marginLeft: dpWidth(2.4) }}>
                                    <Text style={styles.gmTxt}>Hello!</Text>
                                    <Text style={styles.userTxt} >{user && user.first_name ? user.first_name : ''}</Text>
                                </View>
                            </View>
                        }
                    </View>
                    <View style={styles.col2}>
                        <Text style={styles.heading}>{title ? title : ''}</Text>
                    </View>
                    <View style={styles.col3}>
                        {notification ?
                            <TouchableOpacity style={styles.notiIcon} onPress={() => navigation.navigate('notifications')}>
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
                        {drawer ?
                            <TouchableOpacity style={styles.notiIcon} onPress={() => navigation.openDrawer()}>
                                <View style={styles.viewImg}>
                                    <Image
                                        source={Images.sideBar}
                                        style={globalStyles.image}
                                        resizeMode="contain"
                                    />
                                </View>
                            </TouchableOpacity>
                            : null}
                    </View>
                </View>
            </View>
        </View>
    )
};

const mapStateToProps = state => ({
    user: state.UserReducer.user,
});
export default connect(mapStateToProps)(Header);