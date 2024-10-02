import { useIsFocused } from '@react-navigation/native'
import { Icon, Input } from '@rneui/themed'
import { debounce } from 'lodash'
import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { RefreshControl } from 'react-native-gesture-handler'
import { useToast } from 'react-native-toast-notifications'
import { connect, useSelector } from 'react-redux'
import HomeController from '../../../apis/Controllers/HomeController'
import { Colors } from '../../../assets/styles/Colors'
import { Dimension } from '../../../assets/styles/Dimension'
import globalStyles from '../../../assets/styles/GlobalStyles'
import { IconsName, IconsType } from '../../../assets/styles/Icon'
import { Images } from '../../../assets/styles/Images'
import { dpFont, dpWidth } from '../../../assets/styles/Sizes'
import EmptyStates from '../../components/EmptyStates'
import Header from '../../components/Header'
import HomeComponent from '../../components/homeComponent'
import HomeFilterModal from '../../components/modalComponent/filterModal'
import UpdateProfileModal from '../../components/modalComponent/updateProfileModal'
import { countValidValues, fullDateTime } from '../../helpers/generals'
import Loader from '../../helpers/loader'
import { createStyles } from './style'


const Home = (props) => {
    const apiStyleData = useSelector((state) => state.AppDynamicStyleReducer.styles);
    let apiColors = apiStyleData.colors ? apiStyleData.colors : null
    const styles = createStyles(apiColors);

    const [userList, setUserList] = useState([]);
    const [loader, setLoader] = useState(false);
    const [keyword, setSearch] = useState(null);
    const [SearchLoader, setSearchLoader] = useState(false);
    const [pagination, setPagination] = useState(true);
    const [fetching, setFetching] = useState(false);
    const [page, setPage] = useState(1);
    const [refreshing, setRefreshing] = useState(false);
    const [voterDetail, setVoterDetail] = useState(null);
    const [electionDate, setElectionDate] = useState(null);
    const isFocus = useIsFocused();
    const [superAgent, setSuperAgent] = useState(false);
    const [tab, setTab] = useState('pending');
    const toast = useToast();

    //------------filter states------------>
    const [filterModal, setFilterModal] = useState(false);
    const [constituencyList, setConstituencyList] = useState([]);
    const [pollingList, setPollingList] = useState([]);
    const [partyList, setPartyList] = useState([]);
    const [religionList, setReligionList] = useState([]);

    //------------update profile modal state------------>
    const [profileModal, setProfileModal] = useState(false);
    const [partyList2, setPartyList2] = useState([]);
    const [religionList2, setReligionList2] = useState([]);
    const [profileUpdated, setProfileUpdated] = useState(false);


    useEffect(() => {
        if (isFocus) {
            setPage(1);
            setSearch('');
            setLoader(true);
            getHomeList('', 1, props.filters);
        }
    }, [isFocus, profileUpdated, props.filters]);

    useEffect(() => {
        setTab(tab);
        onRefresh();
    }, [tab])


    const getHomeList = async (search, page, filters) => {
        let post = {
            search: search ? search : '',
            page: page ? page : 1,
            constituency_id: filters && filters.constituency && filters.constituency.id ? filters.constituency.id : null,
            polling_station_id: filters && filters.polling && filters.polling.id ? filters.polling.id : null,
            party: filters && filters.party && filters.party.title ? filters.party.title : null,
            religion: filters && filters.religion && filters.religion.slug ? filters.religion.slug : null,
            tab: tab
        };
        let response = await HomeController.getVoterList(post);
        if (response && response.status) {
            setElectionDate(response.election_date)
            setSuperAgent(response.superagent);
            let list = response.listing ? response.listing : [];
            if (list.length > 0) {
                if (post.page === 1) {
                    setUserList(list);
                } else {
                    setUserList([...userList, ...list]);
                }
                if (list.length < 10) {
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
                    setUserList([]);
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
        setPage(1);
        setSearch('');
        setRefreshing(true);
        getHomeList("", 1, props.filters);
    };


    const getMore = () => {
        if (pagination && !fetching) {
            setFetching(true);
            getHomeList(keyword, page, props.filters);
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

    //-------remove all filters------------->
    const handleRemove = async () => {
        let filters = {
            constituency: null,
            polling: null,
            party: null,
            religion: null
        };
        await HomeController.setVoterListFilter(filters);
    };

    useEffect(() => {
        if (isFocus) {
            setLoader(true)
            getFilterData();
            getUpdateProfileData();
        }
    }, [isFocus]);


    const getFilterData = async () => {
        let response = await HomeController.getFilterData();
        if (response) {
            setConstituencyList(response.constituency ? response.constituency : []);
            setPollingList(response.polling_stations ? response.polling_stations : []);
            setPartyList(response.parties ? response.parties : []);
            let list = response.religions ? response.religions : [];
            for (let i in list) {
                list[i]['id'] = list[i].slug.trim();
            }
            setReligionList(list)
        } else {
            setConstituencyList([])
            setPollingList([])
            setPartyList([])
            setReligionList([])
        }
    };

    //-------get update profile dropdown data----------------------------->
    const getUpdateProfileData = async () => {
        let response = await HomeController.getUpdateProfleData();
        if (response) {
            let religionData = response.religions ? response.religions : [];
            let partiesData = response.parties ? response.parties : [];
            for (let i in partiesData) {
                partiesData[i]['id'] = partiesData[i].title.trim();
            }
            for (let i in religionData) {
                religionData[i]['id'] = religionData[i].slug.trim();
            }
            setPartyList2(partiesData);
            setReligionList2(religionData)
        } else {
            setPartyList2([])
            setReligionList2([])
        }
    };

    //----------change vote status-------------------------------> 
    const handleSubmitVote = async (item) => {
        if (item) {
            let response = await HomeController.updateVoteStatus(item.id);
            if (response && response.status) {
                let list = [...userList];
                item.vote_status = 1;
                setUserList(list)
                toast.show(response.message, {
                    type: "success",
                    placement: 'top',
                    duration: 4000,
                    offset: 30,
                    animationType: "slide-in",
                    swipeEnabled: false
                });
            }
        }
    };


    const search = useCallback(debounce(getHomeList, 1000), []);
    return (
        <>
            <Header user={true} notification={true} drawer={true} />
            <View style={styles.main}>
                <View style={styles.viewSearch}>
                    <View style={styles.searchCol}>
                        <Input
                            placeholder={'Search'}
                            keyboardType='default'
                            inputContainerStyle={styles.inputContainerStyle}
                            placeholderTextColor={Colors.black4}
                            rightIcon={
                                SearchLoader ? (
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
                                        color={Colors.grey2}
                                        underlayColor={Colors.white}
                                    />
                            }
                            value={keyword}
                            onChangeText={e => {
                                search(e, 1, props.filters);
                                setSearch(e);
                                setSearchLoader(true);
                            }}
                        />
                    </View>
                    <View style={styles.filterCol}>
                        <TouchableOpacity style={(props.filters && props.filters.constituency) || (props.filters && props.filters.polling) ||
                            (props.filters && props.filters.party) || (props.filters && props.filters.religion)
                            ? styles.filterActive : styles.filterBtn} onPress={() => setFilterModal(true)} >
                            <View style={styles.filterView}>
                                <Image
                                    source={Images.filter}
                                    style={globalStyles.image}
                                    resizeMode="contain"
                                />
                            </View>
                            <Text style={styles.filterTxt}>Filter</Text>
                        </TouchableOpacity>

                    </View>
                </View>
                {props && props.filters && countValidValues(props.filters) !== 0 ?
                    <View style={styles.appliedFilterArea}>
                        <View style={styles.row}>
                            <View style={styles.appliedView}>
                                <Text style={styles.apliedText}>{countValidValues(props.filters)} Selected</Text>
                                <Icon
                                    type={IconsType.materialIcons}
                                    name={IconsName.close}
                                    color={Colors.grey}
                                    size={dpWidth(3)}
                                    style={{ marginLeft: dpWidth(2) }}
                                    onPress={() => handleRemove()}
                                />
                            </View>
                        </View>
                    </View>
                    : null}
                {
                    superAgent
                    &&
                <View style={styles.tabRow} >
                    <View style={styles.col1} >
                        <TouchableOpacity onPress={() => setTab('pending')} style={tab === 'pending' ? [styles.leftTab, { borderColor: apiColors?.tab_border || Colors.navyBlue, backgroundColor: apiColors?.tabs || Colors.lightBlue3 }] : styles.leftTab}>
                            <View style={styles.viewImg}>
                                <Image
                                    source={Images.newsIcon}
                                    style={globalStyles.image}
                                    resizeMode="contain"
                                />
                            </View>
                            <Text style={styles.tabTitle}>Pending</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.col2} >
                        <TouchableOpacity onPress={() => setTab('completed')} style={tab === 'completed' ? [styles.rightTab, { borderColor: apiColors?.tab_border || Colors.navyBlue, backgroundColor: apiColors?.tabs || Colors.lightBlue3 }] : styles.rightTab}>
                            <View style={styles.viewImg}>
                                <Image
                                    source={Images.newsIcon}
                                    style={globalStyles.image}
                                    resizeMode="contain"
                                />
                            </View>
                            <Text style={styles.tabTitle}>Completed</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                }
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
                    data={userList ? userList : []}
                    onEndReached={getMore}
                    ListFooterComponent={renderFooter}
                    onEndReachedThreshold={0.1}
                    keyExtractor={(item, index) => (item, index)}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps={'handled'}
                    renderItem={({ item, index }) => (
                        <HomeComponent
                            name={`${item.forename} ` + `${item.surname}`}
                            religion={item && item.religion ? item.religion : null}
                            identificationNo={item && item.identity_number ? item.identity_number : null}
                            nameOfConstituency={item && item.constituency_title ? item.constituency_title : null}
                            voteStatus={item && item.vote_status ? item.vote_status : null}
                            date={item && item.last_update_at ? fullDateTime(item.last_update_at) : null}
                            party={item && item.party ? item.party : null}
                            tab={tab}
                            navigation={props.navigation}
                            onClickUpdateProfile={() => (setVoterDetail(item), setProfileModal(true))}
                            setVoterDetail={setVoterDetail}
                            electionDate={electionDate}
                            handleSubmitVote={() => handleSubmitVote(item)}
                        />
                    )}
                    ListEmptyComponent={<EmptyStates message={"No Voters Found"} />}
                />
                {profileModal ?
                    <UpdateProfileModal
                        isopen={profileModal}
                        close={() => setProfileModal(false)}
                        partyList={partyList2}
                        setPartyList={setPartyList2}
                        religionList={religionList2}
                        setReligionList={setReligionList2}
                        voterDetail={voterDetail}
                        setProfileUpdated={setProfileUpdated}
                    />
                    : null}
                {filterModal ?
                    <HomeFilterModal
                        isopen={filterModal}
                        close={() => setFilterModal(false)}
                        filters={props && props.filters}
                        partyList={partyList}
                        setPartyList={setPartyList}
                        constituencyList={constituencyList}
                        setConstituencyList={setConstituencyList}
                        religionList={religionList}
                        setReligionList={setReligionList}
                        pollingList={pollingList}
                        setPollingList={setPollingList}
                    />
                    : null}
                {
                    loader ?
                        <Loader loader={loader} />
                        : null
                }
            </View>
        </>
    )
};

const mapStateToProps = state => ({
    filters: state.VoterFilterReducer.filters,
});
export default connect(mapStateToProps)(Home);
