import { useIsFocused } from '@react-navigation/native';
import { Icon, Input } from '@rneui/themed';
import { debounce } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, View } from 'react-native';
import { useSelector } from 'react-redux';
import GalleryController from '../../../apis/Controllers/galleryController';
import { Colors } from '../../../assets/styles/Colors';
import { Dimension } from '../../../assets/styles/Dimension';
import { IconsName, IconsType } from '../../../assets/styles/Icon';
import { dpFont } from '../../../assets/styles/Sizes';
import EmptyStates from '../../components/EmptyStates';
import GalleryListComponent from '../../components/galleryListComponent';
import Loader from '../../helpers/loader';
import styles from './style';


const MyGallery = (props) => {
    const apiStyleData = useSelector((state) => state.AppDynamicStyleReducer.styles);
    let apiColors = apiStyleData.colors ? apiStyleData.colors : null

    const [galleryList, setGalleryList] = useState([]);
    const [page, setPage] = useState(1);
    const [refreshing, setRefreshing] = useState(false);
    const [searchLoader, setSearchLoader] = useState(false);
    const [pagination, setPagination] = useState(true);
    const [fetching, setFetching] = useState(false);
    const [keyword, setSearch] = useState('');
    const [loader, setLoader] = useState(false);
    const isFocus = useIsFocused(false);


    useEffect(() => {
        if (isFocus) {
            setLoader(true);
            getGalleryData('', 1);
        }
    }, [isFocus]);


    const getGalleryData = async (search, page) => {
        let post = {
            search: search ? search : '',
            page: page ? page : 1,
        }
        let response = await GalleryController.getGalleryList(post);
        if (response && response.status) {
            let list = response.listing ? response.listing : [];
            if (list.length > 0) {
                if (post.page === 1) {
                    setGalleryList(list);
                } else {
                    setGalleryList([...galleryList, ...list]);
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
                    setGalleryList([]);
                }
            }
            setFetching(false);
            setLoader(false);
            setRefreshing(false);
            setSearchLoader(false);
        }
        else {
            setFetching(false);
            setLoader(false);
            setRefreshing(false);
            setSearchLoader(false);
            setGalleryList([]);
        }
    }

    const handleInputChange = (e) => {
        setSearchLoader(true);
        setSearch(e);
        search(e, 1);
    };

    const getMore = () => {
        if (pagination && !fetching) {
            setFetching(true);
            getGalleryData(keyword, page);
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

    const onRefresh = () => {
        setSearch('');
        setRefreshing(true);
        getGalleryData('', 1);
    };

    const search = useCallback(debounce(getGalleryData, 1000), []);

    return (
        <View style={styles.container}>
            <View style={styles.viewSearch}>
                <Input
                    placeholder={'Search'}
                    keyboardType='default'
                    inputContainerStyle={styles.inputContainerStyle}
                    placeholderTextColor={Colors.black4}
                    rightIcon={
                        searchLoader ? (
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
                                color={Colors.grey}
                                underlayColor={Colors.white}
                            />
                    }
                    value={keyword}
                    onChangeText={(value) => handleInputChange(value)}
                />
            </View>
            <FlatList
                style={{ flex: 1 }}
                contentContainerStyle={styles.containerStyle}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={[apiColors?.primary || Colors.primary]}
                    />
                }
                data={galleryList ? galleryList : []}
                keyExtractor={(item, index) => (item, index)}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps={'handled'}
                numColumns={1}
                renderItem={({ item, index }) => (
                    <GalleryListComponent
                        index={index}
                        title={item && item.title ? item.title : ''}
                        description={item.description ? item.description : ""}
                        created={item && item.created ? item.created : ''}
                        images={item && item.image && item.image.length > 0 ? item.image.slice(0, 4) : []}
                        imageArray={item && item.image && item.image.length > 0 ? item.image : []}
                        navigation={props.navigation}
                    />
                )}
                onEndReached={getMore}
                ListFooterComponent={renderFooter}
                onEndReachedThreshold={0.1}
                ListEmptyComponent={<EmptyStates message={""} />}
            />
            {
                loader ?
                    <Loader loader={loader} />
                    : null
            }
        </View>
    );
};

export default MyGallery;
