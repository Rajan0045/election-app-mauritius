import { FlatList, RefreshControl, ScrollView, View } from 'react-native'
import { Icon, Input } from '@rneui/themed'
import { IconsName, IconsType } from '../../../assets/styles/Icon'
import { Dimension } from '../../../assets/styles/Dimension'
import styles from './styles'
import { Colors } from '../../../assets/styles/Colors'
import { useCallback, useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native'
import Loader from '../../helpers/loader'
import { ActivityIndicator } from 'react-native'
import { dpFont } from '../../../assets/styles/Sizes'
import { debounce } from 'lodash';
import CandidateAndBioComponent from '../../components/CandidatesandBio'
import EmptyStates from '../../components/EmptyStates'
import CandidateController from '../../../apis/Controllers/candidateController'
import { useSelector } from 'react-redux'
import ContentRenderModal from '../../components/modalComponent/contentRenderModal'


const CandidateAndBio = (props) => {
    const apiStyleData = useSelector((state) => state.AppDynamicStyleReducer.styles);
    let apiColors = apiStyleData.colors ? apiStyleData.colors : null;

    const [candidateList, setCandidateList] = useState([])
    const [loader, setLoader] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [searchLoader, setSearchLoader] = useState(false);
    const [pagination, setPagination] = useState(true);
    const [fetching, setFetching] = useState(false);
    const [bioDetailModal, setBioDetialModal] = useState(false);
    const [keyword, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [bioDetail, setBioDetail] = useState(null);
    const isFocus = useIsFocused(false);

    useEffect(() => {
        if (isFocus) {
            setLoader(true);
            getCandidateList();
        }
    }, [isFocus]);

    const getCandidateList = async (page, search) => {
        let post = {
            search: search ? search : '',
            page: page ? page : 1,
        }
        let response = await CandidateController.getCandidateList(post);
        if (response && response.status) {
            let list = response.bio ? response.bio : [];
            if (list.length > 0) {
                if (post.page === 1) {
                    setCandidateList(list);
                } else {
                    setCandidateList([...candidateList, ...list]);
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
                    setCandidateList([]);
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
            setCandidateList([])
        }
    };

    const handleInputChange = (e) => {
        setSearchLoader(true)
        setSearch(e);
        search(1, e);
    };

    const getMore = () => {
        if (pagination && !fetching) {
            setFetching(true);
            getCandidateList(page, keyword);
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
        getCandidateList(1);
    };


    const search = useCallback(debounce(getCandidateList, 1000), []);
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
                                color={Colors.navyBlue}
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
                data={candidateList}
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
                    <CandidateAndBioComponent
                        image={item.image ? item.image : ''}
                        name={item && item.name ? item.name : ''}
                        designation={item && item.designation ? item.designation : ""}
                        bio={item && item.bio ? item.bio : ""}
                        description={item && item.description ? item.description : ""}
                        onBioPress={(data) => (setBioDetail(data), setBioDetialModal(true))}
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
            {
                bioDetailModal ?
                    <ContentRenderModal
                        isopen={bioDetailModal}
                        close={() => setBioDetialModal(false)}
                        bioContent={bioDetail}
                    />
                    :
                    null
            }
        </View>
    )
};

export default CandidateAndBio
