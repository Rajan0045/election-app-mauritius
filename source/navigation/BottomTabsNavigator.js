import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "../assets/styles/Colors";
import { IconsName, IconsType } from "../assets/styles/Icon";
import { dpFont, dpHeight, dpImageHeight, dpImageWidth, dpWidth } from "../assets/styles/Sizes";
import Home from "../app/view/home";
import { Icon } from "@rneui/themed";
import { Dimension } from "../assets/styles/Dimension";
import { Font } from "../assets/styles/FontsFamily";
import VideoScreen from "../app/view/videoScreen";
import { Images } from "../assets/styles/Images";
import globalStyles from "../assets/styles/GlobalStyles";
import NewsList from "../app/view/newsList";
import Header from "../app/components/Header";
import MyGallery from "../app/view/gallery";
import store from "../redux/store";

const BottomTabBar = createBottomTabNavigator();

const BottomTabs = (props) => {
    const user = store.getState().UserReducer.user

    return (
        <View style={[{ flex: 1, overflow: 'hidden' }]}>
            <BottomTabBar.Navigator
                initialRouteName='home'
                screenOptions={({ route, navigation }) => {
                    return {
                        tabBarStyle: {
                            backgroundColor: Colors.white,
                            height: dpHeight(10),
                            paddingHorizontal: dpWidth(2),
                            borderTopWidth: 0,
                            paddingTop: dpHeight(1),
                            elevation: 0,
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 4,
                            },
                            shadowOpacity: 0,
                            shadowRadius: 4.65,
                            elevation: 15,
                        },
                        tabBarActiveTintColor: Colors.black3,
                        tabBarInactiveTintColor: Colors.secondary,
                        tabBarLabel: '',
                        tabBarHideOnKeyboard: true,
                    }
                }}
            >
                {
                    user && user.agenttype ?
                        <BottomTabBar.Screen
                            name="home"
                            component={Home}
                            options={{
                                tabBarIcon: ({ focused, color, size }) => (
                                    <View>
                                        <Icon
                                            type={IconsType.antDesign}
                                            name={IconsName.home}
                                            size={Dimension.large}
                                            color={focused ? Colors.black3 : Colors.secondary}
                                        />
                                        <Text style={focused ? styles.titleActive : styles.title}>Home</Text>
                                    </View>
                                ),
                                headerShown: false
                            }}
                        />
                        :
                        null

                }
                < BottomTabBar.Screen
                    name="news"
                    component={NewsList}
                    options={{
                        tabBarIcon: ({ focused, color, size }) => (
                            <View style={{ alignItems: 'center' }}>
                                <View style={styles.viewImg}>
                                    <Image
                                        source={focused ? Images.newsActive : Images.news}
                                        style={globalStyles.image}
                                        resizeMode="contain"
                                    />
                                </View>
                                <Text style={focused ? styles.titleActive : styles.title}>News</Text>
                            </View>
                        ),
                        headerShown: true,
                        header: ({ navigation, route, options }) => (
                            <Header
                                user={true}
                                notification={true}
                                drawer={true}
                            />
                        ),
                    }}
                />

                <BottomTabBar.Screen
                    name="videos"
                    component={VideoScreen}
                    options={{
                        tabBarIcon: ({ focused, color, size }) => (
                            <View>
                                <Icon
                                    type={IconsType.feather}
                                    name={IconsName.video}
                                    size={Dimension.large}
                                    color={focused ? Colors.black3 : Colors.secondary}
                                />
                                <Text style={focused ? styles.titleActive : styles.title}>Videos</Text>
                            </View>
                        ),
                        headerShown: true,
                        header: ({ navigation, route, options }) => (
                            <Header
                                user={true}
                                notification={true}
                                drawer={true}
                            />
                        ),
                    }}
                />
                < BottomTabBar.Screen
                    name="my_gallery"
                    component={MyGallery}
                    options={{
                        tabBarIcon: ({ focused, color, size }) => (
                            <View>
                                <Icon
                                    type={IconsType.antDesign}
                                    name={IconsName.picture}
                                    size={Dimension.large}
                                    color={focused ? Colors.black3 : Colors.secondary}
                                />
                                <Text style={focused ? styles.titleActive : styles.title}>Gallery</Text>
                            </View>
                        ),
                        headerShown: true,
                        header: ({ navigation, route, options }) => (
                            <Header
                                user={true}
                                notification={true}
                                drawer={true}
                            />
                        ),
                    }}
                />
            </BottomTabBar.Navigator >
        </View >
    );
}
const styles = StyleSheet.create({
    title: {
        fontSize: dpFont(14),
        fontFamily: Font.semiBold,
        color: Colors.secondary,
        paddingTop: dpHeight(0.3)
    },
    titleActive: {
        fontSize: dpFont(14),
        fontFamily: Font.semiBold,
        color: Colors.black3,
        paddingTop: dpHeight(0.3)
    },
    viewImg: {
        height: dpImageHeight(18),
        width: dpImageWidth(18),
        overflow: 'hidden'
    }
});
export default BottomTabs