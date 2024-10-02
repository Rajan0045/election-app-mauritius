import { useIsFocused } from '@react-navigation/native'
import { Icon, Input } from '@rneui/themed'
import { debounce } from 'lodash'
import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import { RefreshControl } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import NewsController from '../../../apis/Controllers/newsController'
import { Colors } from '../../../assets/styles/Colors'
import { Dimension } from '../../../assets/styles/Dimension'
import globalStyles from '../../../assets/styles/GlobalStyles'
import { IconsName, IconsType } from '../../../assets/styles/Icon'
import { Images } from '../../../assets/styles/Images'
import { dpFont } from '../../../assets/styles/Sizes'
import EmptyStates from '../../components/EmptyStates'
import NewsListComponent from '../../components/newsListComponent'
import Loader from '../../helpers/loader'
import { createStyles } from './style'
import store from '../../../redux/store'


const NewsList = (props) => {
    const apiStyleData = useSelector((state) => state.AppDynamicStyleReducer.styles);
    let apiColors = apiStyleData.colors ? apiStyleData.colors : null
    const styles = createStyles(apiColors);

    const [tab, setTab] = useState('public');
    const [newsList, setNewsList] = useState([]);
    const [loader, setLoader] = useState(false);
    const [keyword, setSearch] = useState(null);
    const [SearchLoader, setSearchLoader] = useState(false);
    const [pagination, setPagination] = useState(true);
    const [fetching, setFetching] = useState(false);
    const [page, setPage] = useState(1);
    const [refreshing, setRefreshing] = useState(false);
    const isFocus = useIsFocused();

    const [newsCategoryList, setNewsCategoryList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const user = store.getState().UserReducer.user

    useEffect(() => {
        if (isFocus) {
            setTab('public')
            setLoader(true)
            setPage(1)
            getCategoriesData();
            setSelectedCategory(null);
            getNewsList('', 1);
        }
    }, [isFocus]);


    const getNewsList = async (search, page, tab, category) => {
        let post = {
            search: search ? search : '',
            page: page ? page : 1,
            tab: tab && tab === 'alliance' ? tab : null,
            category_id: category && category.id ? category.id : null
        };
        let response = await NewsController.getNewsList(post);
        if (response && response.status) {
            let list = response.listing;
            if (list.length > 0) {
                if (post.page === 1) {
                    setNewsList(list);
                } else {
                    setNewsList([...newsList, ...list]);
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
                    setNewsList([]);
                }
                setRefreshing(false);
            }
        }
        setFetching(false);
        setLoader(false);
        setRefreshing(false);
        setSearchLoader(false);
    };


    const handleSelectTab = (item) => {
        if (item) {
            setTab(item)
            setSelectedCategory(null)
            if (item === 'alliance') {
                setSearch('')
                getNewsList('', 1, item)
            } else {
                setSearch('')
                getNewsList('', 1)
            }
        }
    };


    const handleSelectCategory = (item) => {
        if (item) {
            setSearch('');
            setSelectedCategory(item);
            getNewsList('', 1, tab, item);
        }
    };


    const onRefresh = () => {
        setPage(1);
        setSearch('');
        setRefreshing(true);
        getNewsList("", 1, tab, selectedCategory);
    };


    const getMore = () => {
        if (pagination && !fetching) {
            setFetching(true);
            getNewsList(keyword, page);
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


    const getCategoriesData = async () => {
        let response = await NewsController.getCategoryListing();
        if (response) {
            setNewsCategoryList(response.categories)
            setLoader(false)
        } else {
            setLoader(false)
            setNewsCategoryList([])
        }
    };

console.log("newsCategoryList : ", newsCategoryList)
    const search = useCallback(debounce(getNewsList, 1000), []);
    return (
        <>
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
                            search(e, 1, tab, selectedCategory);
                            setSearch(e);
                            setSearchLoader(true);
                        }}
                    />
                </View>
                {
                    user && user.agenttype ?
                        <View style={styles.tabRow} >
                            <View style={styles.col1} >
                                <TouchableOpacity onPress={() => handleSelectTab('public')} style={tab === 'public' ? [styles.leftTab, { borderColor: apiColors?.tab_border || Colors.navyBlue, backgroundColor: apiColors?.tabs || Colors.lightBlue3 }] : styles.leftTab}>
                                    <View style={styles.viewImg}>
                                        <Image
                                            source={Images.newsIcon}
                                            style={globalStyles.image}
                                            resizeMode="contain"
                                        />
                                    </View>
                                    <Text style={styles.tabTitle}>Public  News</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.col2} >
                                <TouchableOpacity onPress={() => handleSelectTab('alliance')} style={tab === 'alliance' ? [styles.rightTab, { borderColor: apiColors?.tab_border || Colors.navyBlue, backgroundColor: apiColors?.tabs || Colors.lightBlue3 }] : styles.rightTab}>
                                    <View style={styles.viewImg}>
                                        <Image
                                            source={Images.newsIcon}
                                            style={globalStyles.image}
                                            resizeMode="contain"
                                        />
                                    </View>
                                    <Text style={styles.tabTitle}>Alliance News</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        :
                        null
                }

                <View style={user && user.agenttype ? styles.categoryView : styles.categoryView2}>
                    <FlatList
                        style={{ flex: 1 }}
                        horizontal={true}
                        contentContainerStyle={user && user.agenttype ? styles.containerStyle : styles.containerStyle2}
                        data={newsCategoryList ? newsCategoryList : []}
                        keyExtractor={(item, index) => (item, index)}
                        showsHorizontalScrollIndicator={false}
                        keyboardShouldPersistTaps={'handled'}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity style={selectedCategory && parseInt(selectedCategory.id) === parseInt(item.id) ? styles.viewCateActive : styles.viewCate} onPress={() => handleSelectCategory(item)}>
                                <Text style={selectedCategory && parseInt(selectedCategory.id) === parseInt(item.id) ? styles.cateTxtAction : styles.cateTxt} >
                                    {item && item.title}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>

                <FlatList
                    style={{ flex: 1 }}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={[apiColors?.primary || Colors.primary]}
                        />
                    }
                    contentContainerStyle={styles.containerStyle2}
                    data={newsList ? newsList : []}
                    keyExtractor={(item, index) => (item, index)}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps={'handled'}
                    onEndReached={getMore}
                    ListFooterComponent={renderFooter}
                    onEndReachedThreshold={0.1}
                    renderItem={({ item, index }) => (
                        <NewsListComponent
                            title={item && item.title}
                            category={item && item.blog_category_title}
                            created={item && item.created}
                            image={item && item.image}
                            thumbnail={item && item.thumbnail}
                            show_banner={item && item.show_banner}
                            item={item}
                            index={index}
                            navigation={props.navigation}
                        />
                    )}
                    ListEmptyComponent={<EmptyStates message={"No News Found"} />}
                />
                {loader ?
                    <Loader loader={loader} />
                    : null
                }
            </View>
        </>
    )
};

export default NewsList
