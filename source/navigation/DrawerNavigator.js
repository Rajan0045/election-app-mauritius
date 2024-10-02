import { createDrawerNavigator } from "@react-navigation/drawer";
import { Colors } from "../assets/styles/Colors";
import BottomTabs from "./BottomTabsNavigator";
import { DrawerContent } from "./drawerContent";
import TermsAndCondition from "../app/view/cmsPages/termsAndConditions";
import PrivacyPolicy from "../app/view/cmsPages/privacyPolicy";
import CmsHeader from "../app/components/cmsHeader";
import AboutUs from "../app/view/cmsPages/aboutUs";
import ChatRoom from "../app/view/chatroom";
import RequestAndComplaint from "../app/view/requestAndComplaint";
import AllianceMeasures from "../app/view/cmsPages/AllianceMeasures";
import CandidateAndBio from "../app/view/candidateAndBio";
const Drawer = createDrawerNavigator();


const AppDrawer = (props) => {
    let activeScreen = ''

    return (
        <Drawer.Navigator
            initialRouteName="bottomTab"
            backBehavior="history"
            screenOptions={({ route, navigation }) => {
                let index = navigation && navigation.getState ? navigation.getState().index : ''
                let currentScreenName = navigation && navigation.getState ? navigation.getState().routeNames[index] : ''
                activeScreen = currentScreenName ? currentScreenName : ''
                return {
                    overlayColor: 'rgba(52, 52, 52, 0.75)',
                    drawerType: 'front',
                    drawerPosition: 'right',
                    drawerStyle: {
                        width: '80%',
                    },
                    drawerStyles: {
                        backgroundColor: Colors.background
                    },
                    contentContainerStyle: {
                        backgroundColor: Colors.background,
                    },
                    sceneContainerStyle: {
                        backgroundColor: Colors.background
                    }
                }
            }}
            drawerContent={(props) => <DrawerContent {...props} activeScreen={activeScreen} />}
        >
            <Drawer.Screen
                name="bottomTab"
                component={BottomTabs}
                options={{
                    headerShown: false,
                }}
            />
            <Drawer.Screen
                name="terms_and_conditions"
                component={TermsAndCondition}
                options={{
                    headerShown: false,
                }}
            />
            <Drawer.Screen
                name="privacy_policy"
                component={PrivacyPolicy}
                options={{
                    headerShown: false,
                }}
            />
            <Drawer.Screen
                name="about_us"
                component={AboutUs}
                options={{
                    headerShown: false,
                }}
            />
            <Drawer.Screen
                name="chat_room"
                component={ChatRoom}
                options={{
                    header: ({ navigation, route, options }) => (
                        <CmsHeader
                            title={'Chat Room'}
                            notification={true}
                            navigation={navigation}
                        />
                    ),
                }}
            />
            <Drawer.Screen
                name="request_and_complaint"
                component={RequestAndComplaint}
                options={{
                    header: ({ navigation, route, options }) => (
                        <CmsHeader
                            title={'Requests & Complaint'}
                            navigation={navigation}
                        />
                    ),
                }}
            />
            <Drawer.Screen
                name="alliance_measures"
                component={AllianceMeasures}
                options={{
                    headerShown: false,
                }}
            />
            <Drawer.Screen
                name="candidate_and_biography"
                component={CandidateAndBio}
                options={{
                    header: ({ navigation, route, options }) => (
                        <CmsHeader
                            title={'Candidate & Biography'}
                            navigation={navigation}
                        />
                    ),
                }}
            />
        </Drawer.Navigator>
    );
};


export default AppDrawer;