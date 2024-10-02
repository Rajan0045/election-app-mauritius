import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, StatusBar, View } from 'react-native';
import { Images } from '../../../../assets/styles/Images';
import styles from './styles';
import { Colors } from '../../../../assets/styles/Colors';
import LinearGradient from 'react-native-linear-gradient';
import { connect, useDispatch } from 'react-redux';
import AuthController from '../../../../apis/Controllers/AuthController';
import { setAppDynamicStyleData } from '../../../../redux/action/appDynamicStyle';
import Constant from '../../../../apis/constant';
import FastImage from 'react-native-fast-image';
import globalStyles from '../../../../assets/styles/GlobalStyles';

const SplashScreen = (props) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation();
    const [appLogo, setAppLogo] = useState(null);
    const [appBanner, setAppBanner] = useState(null);
    const [gifImage, setGifImage] = useState(null);

    // const isFocus = useIsFocused();
    const dispatch = useDispatch();

    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    };

    const convertImageToBase64 = async (url) => {
        try {
            // Fetch the image as a blob
            const response = await fetch(Constant.image + url);
            const blob = await response.blob();

            // Read the blob as a data URL (Base64)
            const reader = new FileReader();
            reader.onloadend = () => {
                let b = reader.result;
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'intro', params: { banner: b } }],
                });
            };
            reader.readAsDataURL(blob); // Convert blob to Base64
        } catch (error) {
            console.error('Error converting image to Base64:', error);
        }
    };

    useEffect(() => {
        AuthController.getLoginUser();
        fadeIn();
        const timer = setTimeout(() => {
            getInit()
        }, 300)
        return () => {
            clearTimeout(timer);
        };
    }, []);


    const getInit = async () => {
        let response = await AuthController.authInitialState();
        if (response && response.status) {
            console.log("resposne : ", response)
            let logo = response && response.logo ? response.logo : null
            setAppLogo(logo);
            dispatch(setAppDynamicStyleData(response));
            //use  setTimeout for Gif
            setTimeout(() => {
                setGifImage(true)
            }, 3000);
            let pinStatus = response.setup_pin == 0 ? 0 : 1
            console.log("pinStatus : ", pinStatus)
            handleNavigate(pinStatus, response && response.banner ? response.banner : null);
        } else {
            console.log(("AuthInitialState api Errpr : ", response));
        }
    };


    const handleNavigate = async (pinStatus, banner) => {
        const hasPassed = await AuthController.isGetStartedScreenPassed();
        if (!hasPassed) {
            setTimeout(() => {
                banner = convertImageToBase64(banner);
            }, 15000);
        }
        else if (pinStatus == 0) {
            setTimeout(() => {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'login' }],
                });
            }, 15000);
        }
        else {
            setTimeout(() => {
                navigation.reset({
                    index: 0,
                    routes: [
                        { name: 'set_pin_code', params: { unlock_pin: true } },
                    ],
                })
            }, 15000);
        }
    };


    console.log("appLogo : ", appLogo)
    return (
        <>
            <StatusBar
                backgroundColor={'transparent'}
                barStyle={'dark-content'}
                translucent={true}
            />
            <LinearGradient
                colors={[Colors.lightBlue3, Colors.white, Colors.white, Colors.white, Colors.lightBlue3]}
                locations={[0, 0.3, 0.5, 0.7, 1]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ flex: 1 }}>
                <View style={styles.main}>

                    {gifImage ?
                        <Animated.View style={[globalStyles.image, { opacity: fadeAnim }]}>
                            <FastImage
                                source={Images.splashGif}
                                style={styles.image}
                                resizeMode='cover'
                            />
                        </Animated.View>
                        :
                        <Animated.View style={[styles.logoImage, { opacity: fadeAnim }]}>
                            {
                                appLogo ?
                                    <Image
                                        source={appLogo ? { uri: appLogo } : Images.logo}
                                        resizeMode="contain"
                                        style={styles.image}
                                    />
                                    :
                                    null
                            }
                        </Animated.View>
                    }


                </View>
            </LinearGradient>
        </>
    )
};

const mapStateToProps = state => ({
    user: state.UserReducer.user,
});
export default connect(mapStateToProps)(SplashScreen);