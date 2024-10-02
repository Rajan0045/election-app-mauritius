import React from 'react';
import { Platform } from 'react-native';
import CmsHeader from '../app/components/cmsHeader';
import Header from '../app/components/Header';
import SingleTitleHeader from '../app/components/SingleTitleHeader';
import IntroScreen from '../app/view/authScreens/intro';
import Login from '../app/view/authScreens/login';
import PhoneOtpVerification from '../app/view/authScreens/phoneOtpVerification';
import SetPinCode from '../app/view/authScreens/setPinCode';
import SplashScreen from '../app/view/authScreens/splash';
import TermsAndCondition from '../app/view/cmsPages/termsAndConditions';
import FillDetailsScreen from '../app/view/authScreens/fillTheDetails';
import NewsDetails from '../app/view/newsDetails';
import Notifications from '../app/view/notifications';
import VoterDetails from '../app/view/voterDetails';
import AppDrawer from './DrawerNavigator';
import GalleryGridScreen from '../app/view/gallery/galleryGridScreen';

const { createStackNavigator, TransitionPresets } = require("@react-navigation/stack");
const Stack = createStackNavigator();

const screenFadeTransition = {
  cardStyleInterpolator: ({ current, next, layouts }) => {
    return {
      cardStyle: {
        opacity: current.progress,
      },
      overlayStyle: {
        opacity: current.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0.5],
          extrapolate: "clamp",
        }),
      },
    };
  },
};

const StackScreens = ({ navigation, redirect }) => {
  return (
    <Stack.Navigator
      initialRouteName={'splash'}
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        presentation: Platform.OS === 'android' ? 'modal' : null,
        cardStyleInterpolator: screenFadeTransition.cardStyleInterpolator,
      }}
    >
      <Stack.Screen
        name="splash"
        component={SplashScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="intro"
        component={IntroScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="login"
        component={Login}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="otp_verification"
        component={PhoneOtpVerification}
        options={{
          header: ({ navigation, route, options }) => (
            <Header
              title={'OTP'}
              navigation={navigation}
              left={'back'}
            />
          )
        }}
      />
      <Stack.Screen
        name="set_pin_code"
        component={SetPinCode}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="AppStack"
        component={AppDrawer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="news_details"
        component={NewsDetails}
        options={{
          header: ({ navigation, route, options }) => (
            <CmsHeader
              navigation={navigation}
            />
          )
        }}
      />
      <Stack.Screen
        name="notifications"
        component={Notifications}
        options={{
          header: ({ navigation, route, options }) => (
            <CmsHeader
              title={'Notifications'}
              navigation={navigation}
            />
          )
        }}
      />
      <Stack.Screen
        name="voter_details"
        component={VoterDetails}
        options={{
          header: ({ navigation, route, options }) => (
            <CmsHeader
              title={`Voter's Details`}
              navigation={navigation}
            />
          )
        }}
      />
      <Stack.Screen
        name="terms_and_conditions"
        component={TermsAndCondition}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="fill_the_details"
        component={FillDetailsScreen}
        options={{
          header: ({ navigation, route, options }) => (
            <SingleTitleHeader
              title={'Fill the Details'}
            />
          ),
        }}
      />
      <Stack.Screen
        name="gallery_grid"
        component={GalleryGridScreen}
        options={{
          header: ({ navigation, route, options }) => (
            <CmsHeader
              title={` `}
              navigation={navigation}
            />
          )
        }}
      />
    </Stack.Navigator>
  );
};
export default StackScreens;
