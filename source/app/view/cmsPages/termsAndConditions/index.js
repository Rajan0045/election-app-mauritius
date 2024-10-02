import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, useWindowDimensions, View } from 'react-native';
import HTML from 'react-native-render-html';
import CmsController from '../../../../apis/Controllers/cmsController';
import { Colors } from '../../../../assets/styles/Colors';
import { Font } from '../../../../assets/styles/FontsFamily';
import CmsHeader from '../../../components/cmsHeader';
import Loader from '../../../helpers/loader';
import styles from './styles';
import { useSelector } from 'react-redux';


const TermsAndCondition = (props) => {
    const apiStyleData = useSelector((state) => state.AppDynamicStyleReducer.styles);
    let apiColors = apiStyleData.colors ? apiStyleData.colors : null;

    const contentWidth = useWindowDimensions().width;
    const systemFonts = [Font.bold, Font.thin, Font.regular];
    const [loader, setLoader] = useState(false);
    const [termsData, setTermsData] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const isFocus = useIsFocused(false);


    useEffect(() => {
        if (isFocus) {
            setLoader(true);
            getTermsConditions();
        }
    }, [isFocus]);


    const getTermsConditions = async () => {
        let response = await CmsController.termsAndConditions();
        if (response && response.status) {
            setTermsData(response.page);
            setLoader(false);
            setRefreshing(false);
        }
        else {
            setLoader(false);
            setRefreshing(false);
            setTermsData(null);
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        getTermsConditions();
    };


    return (
        <>
            <CmsHeader
                title={termsData && termsData.title ? termsData.title : 'Terms And Condition'}
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
                            source={{ html: termsData && termsData.description }}
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

export default TermsAndCondition;