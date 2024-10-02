import { ImageBackground, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import globalStyles from '../../../../assets/styles/GlobalStyles'
import { Images } from '../../../../assets/styles/Images'
import { IconsName, IconsType } from '../../../../assets/styles/Icon'
import { Colors } from '../../../../assets/styles/Colors'
import { Dimension } from '../../../../assets/styles/Dimension'
import { Icon } from '@rneui/themed'
import { useSelector } from 'react-redux'
import Constant from '../../../../apis/constant'
import AuthController from '../../../../apis/Controllers/AuthController'
import { createStyles } from './styles'


const IntroScreen = (props) => {
    const apiStyleData = useSelector((state) => state.AppDynamicStyleReducer.styles);
    let apiBanner = apiStyleData.banner ? apiStyleData.banner : null
    let apiTitle = apiStyleData.title ? apiStyleData.title : null
    let apiDisciption = apiStyleData.description ? apiStyleData.description : null
    let apiColors = apiStyleData.colors ? apiStyleData.colors : null
    const styles = createStyles(apiColors);
    const handleNext = async () => {
        await AuthController.setGetStartedScreenStatusPassed();
        props.navigation.reset({ index: 0, routes: [{ name: 'login' }] });
    };
    return (
        <>
            <StatusBar
                backgroundColor={'transparent'}
                barStyle={'dark-content'}
                translucent={true}
            />
            <View style={styles.main} >
                <ImageBackground
                    style={[globalStyles.image]}
                    source={{ uri: props.route.params && props.route.params.banner ? props.route.params.banner :  (apiBanner ?  `${Constant.image}${apiBanner}?v=`+Math.random() : Images.introImg)}}
                    resizeMode="cover"
                >
                    <View style={styles.viewMain}>
                        <View style={styles.container}>
                            <Text style={styles.heading} >
                                {apiTitle ? apiTitle : "Get Started"}
                            </Text>
                            <View style={styles.viewDesc}>
                                <Text style={styles.description} numberOfLines={6}>
                                    {apiDisciption ? apiDisciption : ""}
                                </Text>
                            </View>
                            <View style={styles.btnView}>
                                <View style={styles.btnCir2} >
                                </View>
                                <TouchableOpacity style={styles.btn} onPress={() => handleNext()}>
                                    <Icon
                                        type={IconsType.antDesign}
                                        name={IconsName.arrowRight}
                                        color={apiColors?.primary || Colors.primary}
                                        size={Dimension.Large}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ImageBackground >
            </View >
        </>
    )
};

export default IntroScreen
