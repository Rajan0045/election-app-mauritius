import { useIsFocused } from '@react-navigation/native';
import { Icon } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Modal from 'react-native-modal';
import ProgressBar from 'react-native-progress/Bar';
import { useToast } from 'react-native-toast-notifications';
import AuthController from '../../apis/Controllers/AuthController';
import ImageController from '../../apis/Controllers/ImageController';
import { Colors } from '../../assets/styles/Colors';
import { Dimension } from '../../assets/styles/Dimension';
import { IconsName, IconsType } from '../../assets/styles/Icon';
import { dpBorderWidth, dpFont, dpHeight, dpImageHeight, dpImageWidth, dpSpacing, dpWidth } from '../../assets/styles/Sizes';
import Loader from './loader';
import { Font } from '../../assets/styles/FontsFamily';
import { useSelector } from 'react-redux';

const ImagePickerModal = props => {
    const apiStyleData = useSelector((state) => state.AppDynamicStyleReducer.styles);
    let apiColors = apiStyleData.colors ? apiStyleData.colors : null;

    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = React.useState(0);
    const [profileDelete, setProfileDelete] = useState(false);
    const toast = useToast();

    const isFocus = useIsFocused();
    useEffect(() => {
        if (isFocus) {
            setProgress(0);
        } else {
            setProgress(0);
        }
    }, [isFocus, props.show]);


    const options = {
        quality: 0.4,
        orientation: 'portrait',
        isVertical: true,
        rotation: 360,
        includeExtra: true,
        fixOrientation: true,
        includeBase64: true,
        mediaType: 'photo',
        maxWidth: 1200,
        maxHeight: 1200,
    };


    const camera = () => {
        setProgress(0);
        launchCamera(options, async response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                // uploadImage(response && response.assets[0]);
                props.response(response && response.assets[0].uri);
                props.close();
            }
        });
    };


    const gallery = () => {
        setProgress(0);
        launchImageLibrary(options, async response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                // uploadImage(response.assets[0]);
                props.response(response && response.assets[0].uri);
                props.close();
            }
        });
    };


    const uploadImage = async image => {
        // setLoading(true)
        setProgress(0.5);
        let callback = p => {
            setProgress(parseInt(p) >= 100 ? 100 : p);
        };
        let data = {
            image: image,
            folder: props.type ? props.type : 'user',
            callback,
        };

        let response = await ImageController.addImage(data)
        if (response && response.status) {
            setProgress(1);
            setLoading(false)
            props.response(response && response.path);
            props.close();
            toast.show(response.message, {
                type: "success",
                placement: 'top',
                duration: 4000,
                offset: 30,
                animationType: "slide-in",
                swipeEnabled: false
            });
        }
        else {
            setLoading(false)
            setProgress(1);
            props.close();
        }
    };


    const deleteImage = async (props) => {
        setLoading(true);
        setProfileDelete(true);
        let response = await ImageController.removeProfile();
        if (response && response.status) {
            props.response(null);
            setLoading(false);
            setProfileDelete(false);
            await AuthController.setUpLogin(response && response.user);
            toast.show(response.message, {
                type: "success",
                placement: 'top',
                duration: 4000,
                offset: 30,
                animationType: "slide-in",
                swipeEnabled: false
            });
            props.close();
        }
        else {
            setLoading(false);
            setProfileDelete(false);

        }
    };

    return (
        <Modal
            isVisible={props.show}
            style={styles.modal}
            backdropColor={Colors.black}
            backdropOpacity={0.85}
            statusBarTranslucent={true}
            onBackdropPress={() => props.close()}
            onBackButtonPress={() => props.close()}
            animationIn="slideInUp"
            animationInTiming={600}
            onSwipeComplete={() => props.close()}
            swipeDirection={['down']}
        >
            <View style={styles.maincontainer}>
                <View style={styles.cross}>
                    <TouchableOpacity onPress={() => props.close()}>
                        <View
                            style={{
                                height: dpHeight(0.6),
                                width: dpHeight(6),
                                borderRadius: dpHeight(5),
                                backgroundColor: apiColors?.primary || Colors.primary,

                            }} />
                    </TouchableOpacity>
                </View>
                {/* <Text style={styles.header}>{'Choose an option'}</Text> */}

                <View style={styles.list}>
                    {progress > 0 ? (<>
                        {/* <Text
                            style={[
                                styles.progressText,
                                { color: Colors.green },
                                // { color: loading ? Colors.red : Colors.green },
                            ]}>
                            {loading && progress != 1
                                ? 'Uploading please wait...'
                                : 'File uploaded successfully'}
                        </Text> */}
                        <View style={{ paddingHorizontal: dpHeight(5) }}>
                            <ProgressBar progress={progress} size={100} color={apiColors?.primary || Colors.primary} height={10} width={null} />
                        </View>
                    </>) : null}

                    {progress > 0 ? null : (
                        <>
                            {
                                props.type === 'image' || props.type === 'users' || props.type === 'products' ?
                                    <>
                                        <TouchableOpacity style={styles.row} onPress={() => camera(props)}>
                                            <View style={styles.left}>
                                                <Icon
                                                    type={IconsType.feather}
                                                    name={IconsName.camera}
                                                    color={Colors.black}
                                                    size={Dimension.large}
                                                />
                                            </View>
                                            <View style={styles.right}>
                                                <Text style={styles.title}>Take Picture</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.row} onPress={() => gallery(props)}>
                                            <View style={styles.left}>
                                                <Icon
                                                    type={IconsType.antDesign}
                                                    name={IconsName.picture}
                                                    color={Colors.black}
                                                    size={Dimension.large}
                                                />
                                            </View>
                                            <View style={styles.right}>
                                                <Text style={styles.title}>Add Picture From Gallery</Text>
                                            </View>
                                        </TouchableOpacity>
                                        {
                                            props && props.from
                                                ? null :
                                                <TouchableOpacity style={styles.row} onPress={() => deleteImage(props)}>
                                                    <View style={styles.left}>
                                                        <Icon
                                                            type={IconsType.antDesign}
                                                            name={IconsName.delete}
                                                            color={Colors.red}
                                                            size={Dimension.large}
                                                        />
                                                    </View>
                                                    <View style={styles.right}>
                                                        <Text style={[styles.title, { color: Colors.red }]}>Remove Current Profile Picture</Text>
                                                    </View>
                                                </TouchableOpacity>
                                        }
                                    </>
                                    :
                                    null
                            }
                        </>
                    )}
                </View>

                {(loading && profileDelete) ? <Loader loader={loading} /> : null}
            </View>
        </Modal>
    );
};
const styles = StyleSheet.create({
    modal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        margin: 0,
    },
    maincontainer: {
        backgroundColor: Colors.white,
        width: '100%',
        maxHeight: dpHeight(73),
        borderTopLeftRadius: dpHeight(5),
        borderTopRightRadius: dpHeight(5),
        overflow: 'hidden',
        paddingBottom: Platform.OS === 'ios' ? dpHeight(3) : dpHeight(1),
    },
    main: {
        maxHeight: dpHeight(50),
        marginHorizontal: dpWidth(2),
        backgroundColor: Colors.white,
        borderRadius: dpHeight(2),
        paddingTop: dpHeight(1),
        paddingBottom: Platform.OS === 'ios' ? dpHeight(3) : dpHeight(1),
        paddingHorizontal: dpHeight(2),
        overflow: 'hidden',
    },
    header: {
        textAlign: 'center',
        fontFamily: Font.semiBold,
        fontSize: dpFont(18),
        color: Colors.black,
        marginTop: dpHeight(1),
    },
    list: {
        marginTop: dpHeight(1),
    },
    row: {
        flexDirection: 'row',
        paddingVertical: dpHeight(1.5),
        paddingHorizontal: dpWidth(2),
        borderRadius: dpBorderWidth(10),
    },
    left: {
        flex: 0.20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        height: dpHeight(7),
        width: dpHeight(7),
        padding: dpHeight(2),
        justifyContent: 'center',
        alignItems: 'center',
    },

    right: {
        flex: 0.80,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    title: {
        fontFamily: Font.medium,
        fontSize: dpFont(17),
        color: Colors.black3
    },
    progress: {
        borderRadius: dpHeight(0.6),
        height: dpHeight(5),
        marginBottom: dpHeight(13),
    },
    progressText: {
        fontFamily: Font.medium,
        fontSize: dpFont(15),
        color: Colors.red,
        marginBottom: dpHeight(2),
        textAlign: 'center',
    },
    cross: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginHorizontal: dpSpacing(5),
        paddingTop: dpSpacing(2),
        paddingBottom: dpSpacing(4)
    },

    userImage: {
        width: dpImageWidth(60),
        height: dpImageHeight(60),
        overflow: 'hidden',
        borderRadius: dpFont(60),
        marginLeft: dpSpacing(9)
    },
    img: {
        width: '100%',
        height: '100%'
    }

});
export default ImagePickerModal;
