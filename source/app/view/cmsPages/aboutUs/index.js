import React, { useEffect, useState } from 'react';
import { Image, RefreshControl, ScrollView, useWindowDimensions, View } from 'react-native';
import HTML from 'react-native-render-html';
import styles from './styles';
import { Font } from '../../../../assets/styles/FontsFamily';
import globalStyles from '../../../../assets/styles/GlobalStyles';
import { Images } from '../../../../assets/styles/Images';
import CmsController from '../../../../apis/Controllers/cmsController';
import { useIsFocused } from '@react-navigation/native';
import Loader from '../../../helpers/loader';
import CmsHeader from '../../../components/cmsHeader';
import { Colors } from '../../../../assets/styles/Colors';
import { useSelector } from 'react-redux';


const AboutUs = (props) => {
    const apiStyleData = useSelector((state) => state.AppDynamicStyleReducer.styles);
    let apiColors = apiStyleData.colors ? apiStyleData.colors : null

    const contentWidth = useWindowDimensions().width;
    const systemFonts = [Font.bold, Font.thin, Font.regular];
    const [loader, setLoader] = useState(false);
    const [aboutUsData, setAboutUsData] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const isFocus = useIsFocused(false);

    useEffect(() => {
        if (isFocus) {
            setLoader(true);
            getAboutUsData();
        }
    }, [isFocus]);

    const getAboutUsData = async () => {
        let response = await CmsController.aboutUs();
        if (response && response.status) {
            setAboutUsData(response.page);
            setLoader(false);
            setRefreshing(false);
        }
        else {
            setLoader(false);
            setRefreshing(false);
            setAboutUsData(null);
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        getAboutUsData();
    };

    return (
        <>
            <CmsHeader
                title={aboutUsData && aboutUsData.title ? aboutUsData.title : 'About Us'}
            />
            <View style={styles.main}>
                <ScrollView
                    style={styles.ScrollView}
                    contentContainerStyle={styles.contentContainerStyle}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={[apiColors?.primary || Colors.primary]}
                        />
                    }
                >
                    <View style={styles.subBody}>
                        <HTML
                            source={{ html: aboutUsData && aboutUsData.description }}
                            contentWidth={contentWidth}
                            tagsStyles={styles.contentStyle}
                            systemFonts={systemFonts}
                        />
                    </View>
                    <View style={styles.logosView}>
                        <View style={globalStyles.Row}>
                            <View style={styles.logoImage}>
                                <Image
                                    source={Images.facebookLogo}
                                    style={globalStyles.image}
                                    resizeMode="cover"
                                />
                            </View>
                            <View style={styles.logoImage}>
                                <Image
                                    source={Images.whatsappLogo}
                                    style={globalStyles.image}
                                    resizeMode="cover"
                                />
                            </View>
                            <View style={styles.logoImage}>
                                <Image
                                    source={Images.xLogo}
                                    style={globalStyles.image}
                                    resizeMode="cover"
                                />
                            </View>
                            <View style={styles.logoImage}>
                                <Image
                                    source={Images.instagrmLogo}
                                    style={globalStyles.image}
                                    resizeMode="cover"
                                />
                            </View>
                            <View style={styles.logoImage}>
                                <Image
                                    source={Images.telegramLogo}
                                    style={globalStyles.image}
                                    resizeMode="cover"
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
                {
                    loader ?
                        <Loader loader={loader} />
                        : null
                }
            </View>
        </>
    )
};

export default AboutUs;