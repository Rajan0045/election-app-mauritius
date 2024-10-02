import React, { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, useWindowDimensions, View } from 'react-native';
import HTML from 'react-native-render-html';
import styles from './styles';
import { Font } from '../../../../assets/styles/FontsFamily';
import { useIsFocused } from '@react-navigation/native';
import CmsController from '../../../../apis/Controllers/cmsController';
import Loader from '../../../helpers/loader';
import CmsHeader from '../../../components/cmsHeader';
import { useSelector } from 'react-redux';
import { Colors } from '../../../../assets/styles/Colors';


const PrivacyPolicy = (props) => {
    const apiStyleData = useSelector((state) => state.AppDynamicStyleReducer.styles);
    let apiColors = apiStyleData.colors ? apiStyleData.colors : null;
    const contentWidth = useWindowDimensions().width;
    const systemFonts = [Font.bold, Font.thin, Font.regular];
    const [loader, setLoader] = useState(false);
    const [privacyData, setPrivacyData] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const isFocus = useIsFocused(false);

    useEffect(() => {
        if (isFocus) {
            setLoader(true);
            getPrivacyPolicyData();
        }
    }, [isFocus]);

    const getPrivacyPolicyData = async () => {
        let response = await CmsController.privacyPolicy();
        if (response && response.status) {
            setPrivacyData(response.page);
            setLoader(false);
            setRefreshing(false);
        }
        else {
            setLoader(false);
            setRefreshing(false);
            setPrivacyData(null);
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        getPrivacyPolicyData();
    };


    return (
        <>
            <CmsHeader
                title={privacyData && privacyData.title ? privacyData.title : 'Privacy Policy'}
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
                            colors={[apiColors?.primary || Colors.primary]} />
                    }
                >
                    <View style={styles.subBody}>
                        <HTML
                            source={{ html: privacyData && privacyData.description }}
                            contentWidth={contentWidth}
                            tagsStyles={styles.contentStyle}
                            systemFonts={systemFonts}
                        />
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

export default PrivacyPolicy;