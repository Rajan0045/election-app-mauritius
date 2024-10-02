import { FlatList, RefreshControl, ScrollView, View } from 'react-native'
import { Icon, Input } from '@rneui/themed'
import { IconsName, IconsType } from '../../../assets/styles/Icon'
import { Dimension } from '../../../assets/styles/Dimension'
import styles from './styles'
import ChatRoomComponent from '../../components/chatRoomComponent'
import { Colors } from '../../../assets/styles/Colors'
import { useCallback, useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native'
import ChatController from '../../../apis/Controllers/chatController'
import Loader from '../../helpers/loader'
import { ActivityIndicator } from 'react-native'
import { dpFont } from '../../../assets/styles/Sizes'
import { debounce } from 'lodash';
import EmptyStates from '../../components/EmptyStates'
import { useSelector } from 'react-redux'


const ChatRoom = (props) => {
    const apiStyleData = useSelector((state) => state.AppDynamicStyleReducer.styles);
    let apiColors = apiStyleData.colors ? apiStyleData.colors : null

    const [chatList, setChatList] = useState([]);
    const [loader, setLoader] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [searchLoader, setSearchLoader] = useState(false);
    const [pagination, setPagination] = useState(true);
    const [fetching, setFetching] = useState(false);
    const [keyword, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const isFocus = useIsFocused(false);

    useEffect(() => {
        if (isFocus) {
            setLoader(true);
            gettChatList(1);
        }
    }, [isFocus]);


    const gettChatList = async (page, search) => {
        let post = {
            search: search ? search : '',
            page: page ? page : 1,
        }
        let response = await ChatController.getChatList(post);
        if (response && response.status) {
            let list = response.listing ? response.listing : [];
            if (list.length > 0) {
                if (post.page === 1) {
                    setChatList(list);
                } else {
                    setChatList([...chatList, ...list]);
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
                    setChatList([]);
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
            setChatList([]);
        }
    };

    const handleInputChange = (e) => {
        setSearchLoader(true);
        setSearch(e);
        search(1, e);
    };

    const getMore = () => {
        if (pagination && !fetching) {
            setFetching(true);
            gettChatList(page, keyword);
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
        gettChatList(1);
    };


    const search = useCallback(debounce(gettChatList, 1000), []);
    return (
        <View style={styles.main}>
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
                data={chatList}
                keyExtractor={(item, index) => (item, index)}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps={'handled'}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={[apiColors?.primary || Colors.primary]}
                    />
                }
                renderItem={({ item, index }) => (
                    <ChatRoomComponent
                        image={item.image ? item.image : ""}
                        name={item.first_name ? item.first_name : ""}
                        constituency={item.constituency ? item.constituency : []}
                        phoneNumber={item.phonenumber ? item.phonenumber : ""}
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
    )
};

export default ChatRoom
