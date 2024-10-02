import { DrawerContentScrollView, DrawerItem, useDrawerStatus } from '@react-navigation/drawer';
import { Button, Icon } from '@rneui/themed';
import { Alert, Image, Linking, StatusBar, Text, View } from 'react-native';
import { Colors } from '../../assets/styles/Colors';
import { Dimension } from '../../assets/styles/Dimension';
import globalStyles from '../../assets/styles/GlobalStyles';
import { IconsName, IconsType } from '../../assets/styles/Icon';
import { Images } from '../../assets/styles/Images';
import { dpFont, dpWidth } from '../../assets/styles/Sizes';
import { createStyles } from './styles';
import { useSelector } from 'react-redux';
import AuthController from '../../apis/Controllers/AuthController';
import store from '../../redux/store';
import { renderImage } from '../../app/helpers/renderImage';
import { useToast } from 'react-native-toast-notifications'
import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';

export const DrawerContent = (props) => {
    const apiStyleData = useSelector((state) => state.AppDynamicStyleReducer.styles);
    let apiColors = apiStyleData.colors ? apiStyleData.colors : null
    const styles = createStyles(apiColors);
    const user = store.getState().UserReducer.user
    const { activeScreen } = props;
    const toast = useToast();
    const listScreen = [
        {
            title: 'About Us',
            action: () => props.navigation.navigate('about_us'),
            icon: IconsName.info,
            type: IconsType.feather,
            size: dpFont(20),
            name: 'about_us'
        },
        {
            title: 'Candidate & Biography',
            action: () => props.navigation.navigate('candidate_and_biography'),
            image: Images.bio,
            name: 'candidate_and_biography'
        },
        {
            title: 'Chatroom',
            action: () => props.navigation.navigate('chat_room'),
            image: Images.chatBox,
            size: dpFont(20),
            name: 'chat_room'
        },
        {
            title: 'Alliance Measures',
            action: () => props.navigation.navigate('alliance_measures'),
            image: Images.party,
            name: 'party_mesures'
        },
        {
            title: 'Requests & Complaints',
            action: () => props.navigation.navigate('request_and_complaint'),
            icon: IconsName.file1,
            type: IconsType.antDesign,
            size: dpFont(19),
            name: 'requests_complaints'
        },

        {
            title: 'Terms & Conditions',
            action: () => props.navigation.navigate('terms_and_conditions'),
            image: Images.shield,
            name: 'terms_and_conditions'
        },
        {
            title: 'Privacy Policy',
            action: () => props.navigation.navigate('privacy_policy'),
            icon: IconsName.lock,
            type: IconsType.materialIcons,
            size: dpFont(21),
            name: 'privacy_policy'
        },
        {
            title: 'Facbook',
            action: () => openLink('https://www.facebook.com/lestravaillistes?mibextid=ZbWKwL'),
            image: Images.facebook,
            size: dpFont(20),
            name: 'facbook',
            social: true
        },
        {
            title: 'Instagram',
            action: () => openLink('https://www.instagram.com/ramgoolamgennext/?igsh=MXZ3YXFrM2xjYzVzeQ%3D%3D'),
            image: Images.instagram,
            size: dpFont(20),
            name: 'instagram',
            social: true
        },
        {
            title: 'Youtube',
            action: () => openLink('https://www.youtube.com/@PartiTravailliste'),
            icon: IconsName.youtube,
            type: IconsType.antDesign,
            color: apiColors?.primary || Colors.primary,
            size: dpFont(20),
            name: 'twitter',
            social: true
        },
        {
            title: 'TikTok',
            action: () => openLink('https://www.tiktok.com/@ncrmru?_t=8ppcDQOrwY9&_r=1'),
            image: Images.tiktok,
            size: dpFont(20),
            name: 'telegram',
            social: true
        }
    ];

    const [ItemList, setItemList] = useState(listScreen)

    let isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused && user) {
            if (!user.agenttype) {
                let filterlist = listScreen.filter((data) => data.name !== "chat_room");
                setItemList(filterlist);
            }
            else{
                setItemList(listScreen);
            }
        }
    }, [isFocused, user]);

    const isDrawerOpen = useDrawerStatus() === 'open';


    const handleLogout = async () => {
        await AuthController.logout();
    };


    const openLink = async (url) => {
        if (url) {
            const canOpen = await Linking.canOpenURL(url);
            if (canOpen) {
                await Linking.openURL(url);
            } else {
                toast.show('The URL cannot be opened', {
                    type: "danger",
                    placement: 'top',
                    duration: 4000,
                    offset: 30,
                    animationType: "slide-in",
                    swipeEnabled: false
                });
            }
        }
    };


    return (
        <View style={styles.container}>
            {
                isDrawerOpen ?
                    <StatusBar
                        backgroundColor={Colors.background}
                        barStyle="dark-content"
                    />
                    :
                    null
            }
            <View style={styles.body}>
                <View style={styles.drawerHeader}>
                    <View style={styles.userCol}>
                        <View style={styles.userImg}>
                            <Image
                                source={user && user.image ? renderImage(user.image) : Images.dummyUser}
                                style={globalStyles.image}
                                resizeMode="cover"
                            />
                        </View>
                        <View style={{ marginLeft: dpWidth(2.4) }}>
                            <Text style={styles.gmTxt}>Hello!</Text>
                            <Text style={styles.userTxt} >{user && user.first_name ? user.first_name : null}</Text>
                        </View>
                    </View>
                    <View style={styles.closeCol}>
                        <Icon
                            type={IconsType.antDesign}
                            name={IconsName.closecircleo}
                            color={Colors.red2}
                            size={Dimension.large3}
                            onPress={() => props.navigation.closeDrawer()}
                        />
                    </View>
                </View>
                <DrawerContentScrollView
                    {...props}
                    contentContainerStyle={styles.scroll}
                    keyboardShouldPersistTaps={'handled'}
                    showsVerticalScrollIndicator={false}>
                    <View style={styles.content}>
                        {ItemList.map((item, index) => (
                            < >
                                <DrawerItem
                                    style={styles.drawerItemStyle}
                                    key={index}
                                    label={() => (
                                        <View style={styles.labelView}>
                                            <Text style={styles.labelStyle}>{item.title}</Text>
                                            {item && item.social ?
                                                <Icon
                                                    type={IconsType.antDesign}
                                                    name={IconsName.right}
                                                    color={Colors.secondary}
                                                    size={Dimension.extraSmall}
                                                /> : null}
                                        </View>
                                    )}
                                    labelStyle={styles.labelStyle}
                                    icon={({ focused, color, size }) =>
                                    (
                                        item.icon ?
                                            <View style={activeScreen === item.name ? styles.iconMain : styles.iconMain2}>
                                                <Icon
                                                    type={item.type}
                                                    name={item.icon}
                                                    color={item.color ? item.color : Colors.black}
                                                    size={item.size ? item.size : Dimension.large2}
                                                />
                                            </View>
                                            :
                                            <View style={activeScreen === item.name ? styles.iconMain : styles.iconMain2}>
                                                <View style={styles.imageMain}>
                                                    <Image
                                                        style={globalStyles.image}
                                                        source={item.image}
                                                        resizeMode="contain"
                                                    />
                                                </View>
                                            </View>
                                    )}
                                    onPress={() => {
                                        if (item.action != null) {
                                            item.action();
                                        }
                                    }}
                                />
                                {item && (item.name === 'requests_complaints') || (item.name === 'privacy_policy') || (item.name === 'telegram') ?
                                    <View style={styles.line} />
                                    : null}
                            </>
                        ))}
                        <View style={styles.viewBtn}>
                            <Button
                                title={'Log Out'}
                                buttonStyle={styles.btnStyle}
                                icon={
                                    <Icon
                                        type={IconsType.materialIcons}
                                        name={IconsName.logout}
                                        color={Colors.white}
                                        size={Dimension.large}
                                    />
                                }
                                onPress={() => handleLogout()}
                            />
                        </View>
                    </View>
                </DrawerContentScrollView>
            </View>
        </View >
    );
};


