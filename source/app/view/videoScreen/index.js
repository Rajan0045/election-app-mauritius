import { Icon, Input } from '@rneui/themed'
import { debounce } from 'lodash'
import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native'
import { RefreshControl } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import VideoController from '../../../apis/Controllers/videosController'
import { Colors } from '../../../assets/styles/Colors'
import { Dimension } from '../../../assets/styles/Dimension'
import { IconsName, IconsType } from '../../../assets/styles/Icon'
import { dpFont } from '../../../assets/styles/Sizes'
import EmptyStates from '../../components/EmptyStates'
import VideoListComponent from '../../components/videoListComponent'
import Loader from '../../helpers/loader'
import { createStyles } from './style'
import store from '../../../redux/store'


const VideoScreen = (props) => {
    const apiStyleData = useSelector((state) => state.AppDynamicStyleReducer.styles);
    let apiColors = apiStyleData.colors ? apiStyleData.colors : null
    const styles = createStyles(apiColors);


    const [tab, setTab] = useState('party');
    const [videoList, setVideoList] = useState([]);
    const [loader, setLoader] = useState(false);
    const [keyword, setSearch] = useState(null);
    const [SearchLoader, setSearchLoader] = useState(false);
    const [pagination, setPagination] = useState(true);
    const [fetching, setFetching] = useState(false);
    const [page, setPage] = useState(1);
    const [refreshing, setRefreshing] = useState(false);
    const user = store.getState().UserReducer.user

    useEffect(() => {
        setLoader(true);
        getList(1);
    }, []);


    const getList = async (page, search, tab) => {
        let post = {
            search: search ? search : '',
            page: page ? page : 1,
            tab: tab && tab == "alliance" ? tab : ''
        };
        let response = await VideoController.getVideoList(post);
        if (response && response.status) {
            let list = response.listing ? response.listing : [];
            if (list.length > 0) {
                if (post.page === 1) {
                    setVideoList(list);
                } else {
                    setVideoList([...videoList, ...list]);
                }
                if (list.length < 20) {
                    setPagination(false);
                }
                else {
                    setPagination(true);
                }
                setPage(post.page + 1);
                setRefreshing(false);
            } else {
                setPagination(false);
                if (post.page === 1) {
                    setVideoList([]);
                }
                setRefreshing(false);
            }
        }
        setFetching(false);
        setLoader(false);
        setRefreshing(false);
        setSearchLoader(false);
    };


    const onRefresh = () => {
        setSearch('');
        setRefreshing(true);
        getList(1, "", tab);
    };


    const getMore = () => {
        if (pagination && !fetching) {
            setFetching(true);
            getList(page, keyword, tab);
        }
    };


    const renderFooter = () => {
        if (fetching && !loader) {
            return (
                <>
                    {fetching ? (
                        <ActivityIndicator
                            color={apiColors?.primary || Colors.primary}
                            size={'large'}
                            style={{ alignSelf: 'center', marginBottom: dpFont(20) }}
                        />
                    ) : null}
                </>
            );
        }
        else {
            return <View style={{ height: dpFont(25) }} />;
        }
    };


    const hadnleTabChange = (val) => {
        if (val == "alliance") {
            setLoader(true);
            setSearch('');
            getList(1, "", "alliance");
        }
        else {
            setLoader(true);
            setSearch('');
            getList(1, "", "");
        }
    };


    const search = useCallback(debounce(getList, 1000), []);
    return (
        <View style={styles.main}>
            <View style={styles.viewSearch}>
                <Input
                    placeholder={'Search'}
                    keyboardType='default'
                    inputContainerStyle={styles.inputContainerStyle}
                    placeholderTextColor={Colors.black4}
                    rightIcon={
                        SearchLoader ? (
                            <ActivityIndicator
                                color={apiColors?.primary || Colors.primary}
                                size={'small'}
                                style={{ alignSelf: 'center' }}
                            />
                        ) :
                            <Icon
                                type={IconsType.feather}
                                name={IconsName.search}
                                size={Dimension.large3}
                                color={Colors.grey2}
                                underlayColor={Colors.white}
                            />
                    }
                    value={keyword}
                    onChangeText={e => {
                        search(1, e, tab);
                        setSearch(e);
                        setSearchLoader(true);
                    }}
                />
            </View>
            {
                user && user.agenttype ?
                    <View style={styles.tabRow} >
                        <View style={styles.col1} >
                            <TouchableOpacity
                                onPress={() => (setTab('party'), hadnleTabChange("party"))}
                                style={tab === 'party'
                                    ? [styles.leftTab, { borderColor: apiColors?.tab_border || Colors.navyBlue, backgroundColor: apiColors?.tabs || Colors.lightBlue3 }]
                                    : styles.leftTab}
                            >
                                <Icon
                                    type={IconsType.feather}
                                    name={IconsName.video}
                                    size={Dimension.medium}
                                    color={Colors.black}
                                />
                                <Text style={styles.tabTitle}>Public Videos</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.col2} >
                            <TouchableOpacity
                                onPress={() => (setTab('alliance'), hadnleTabChange("alliance"))}
                                style={tab === 'alliance'
                                    ? [styles.rightTab, { borderColor: apiColors?.tab_border || Colors.navyBlue, backgroundColor: apiColors?.tabs || Colors.lightBlue3 }]
                                    : styles.rightTab}
                            >
                                <Icon
                                    type={IconsType.feather}
                                    name={IconsName.video}
                                    size={Dimension.medium}
                                    color={Colors.black}
                                />
                                <Text style={styles.tabTitle}>Alliance Videos</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    :
                    null
            }
            <FlatList
                style={{ flex: 1 }}
                contentContainerStyle={  user && user.agenttype ? styles.containerStyle :styles.containerStyle1}
                data={videoList}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={[apiColors?.primary || Colors.primary]}
                    />
                }
                onEndReached={getMore}
                ListFooterComponent={renderFooter}
                onEndReachedThreshold={0.8}
                keyExtractor={(item, index) => (item, index)}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps={'handled'}
                renderItem={({ item, index }) => (
                    <VideoListComponent
                        index={index}
                        url={item && item.url}
                        title={item && item.title ? item.title : ''}
                        description={item.description ? item.description : ""}
                        length={item && item.length}
                        created={item && item.created ? item.created : ''}
                    />
                )}
                ListEmptyComponent={<EmptyStates message={""} />}
            />
            {loader && <Loader loader={loader} />}
        </View>
    )
};

export default VideoScreen
