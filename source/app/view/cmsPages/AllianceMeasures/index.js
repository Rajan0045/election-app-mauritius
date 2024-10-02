import React, { useEffect, useState } from 'react';
import { Image, RefreshControl, ScrollView, useWindowDimensions, View } from 'react-native';
import HTML from 'react-native-render-html';
import styles from './styles';
import { Font } from '../../../../assets/styles/FontsFamily';
import CmsController from '../../../../apis/Controllers/cmsController';
import { useIsFocused } from '@react-navigation/native';
import Loader from '../../../helpers/loader';
import CmsHeader from '../../../components/cmsHeader';
import { useSelector } from 'react-redux';
import { Colors } from '../../../../assets/styles/Colors';


const AllianceMeasures = (props) => {
    const apiStyleData = useSelector((state) => state.AppDynamicStyleReducer.styles);
    let apiColors = apiStyleData.colors ? apiStyleData.colors : null

    const contentWidth = useWindowDimensions().width;
    const systemFonts = [Font.bold, Font.thin, Font.regular];
    const [loader, setLoader] = useState(false);
    const [allianceMeasuresData, setAllianceMeasuresData] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const isFocus = useIsFocused(false);

    useEffect(() => {
        if (isFocus) {
            setLoader(true);
            getAllianceMeasuresData();
        }
    }, [isFocus]);

    const getAllianceMeasuresData = async () => {
        let response = await CmsController.allianceMeasures();
        if (response && response.status) {
            setAllianceMeasuresData(response.page);
            setLoader(false);
            setRefreshing(false);
        }
        else {
            setLoader(false);
            setRefreshing(false);
            setAllianceMeasuresData(null);
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        getAllianceMeasuresData();
    };

    return (
        <>
            <CmsHeader
                title={allianceMeasuresData && allianceMeasuresData.title ? allianceMeasuresData.title : 'Alliance Measures'}
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
                            source={{ html: allianceMeasuresData && allianceMeasuresData.description }}
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

export default AllianceMeasures;