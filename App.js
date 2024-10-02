import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '@rneui/themed';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Theme } from './source/assets/styles/theme';
import { Colors } from './source/assets/styles/Colors';
import React from 'react';
import StackScreens from './source/navigation/StackNavigator';
import { setFCMToken } from './source/redux/action/user';
import { ToastProvider } from 'react-native-toast-notifications';
import store from './source/redux/store';
import { Provider } from 'react-redux';


const navigationRef = React.createRef();

export function navigate(name, params, reset) {
  if (reset) {
    navigationRef.current?.reset({
      index: 0,
      routes: [{ name: name }],
    });
  } else {
    navigationRef.current?.navigate(name, params);
  }
};



// // For Frontend notification trigger
// messaging().onMessage(async remoteMessage => {
//   onDisplayNotification(remoteMessage);
//   console.log('FRONT NOTIFICATION===>', remoteMessage);
// });


// //For Background notification trigger
// messaging().setBackgroundMessageHandler(async remoteMessage => {
//   console.log('BAckground NOTIFICATION===>', remoteMessage);
// });


// export async function onDisplayNotification(item) {
//   Notifier.showNotification({
//     title: item.notification.title ? item.notification.title : '',
//     duration: 3000,
//     showAnimationDuration: 800,
//     showEasing: Easing.bounce,
//     onHidden: () => console.log('Hidden'),
//     Component: NotifierComponents.Notification,
//     componentProps: {
//       imageSource: Images.newLogo,
//     },
//     onPress: () => (localNotificationsHandle(item)),
//     hideOnPress: true,

//     translucentStatusBar: true,
//   });
// };

// export async function localNotificationsHandle(item) {
//     navigationRef.current?.reset({
//       index: 0,
//       routes: [{ name: 'AppStack' }],
//     })
// }


const App = () => {

  //   useEffect(() => {
  //     getFcmToken();
  //     requestUserPermission();
  // }, []);

  // useEffect(() => {
  //     messaging().onNotificationOpenedApp(remoteMessage => {
  //         notify(remoteMessage);
  //     });

  //     messaging()
  //         .getInitialNotification()
  //         .then(remoteMessage => {
  //             notify(remoteMessage);
  //         });

  //     requestUserPermission();
  //     return () => { };
  // }, []);



  // const notify = async item => {
  //   if (item) {
  //     let type = item && item.data && item.data.type;
  //     let itemId = item && item.data && item.data.rel_id;
  //     let notificationId = item.data && item.data.id;
  //     let language_id = item.data && item.data.language_id;

  //     if (type === 'news') {
  //       navigationRef.current?.reset({
  //         index: 0,
  //         routes: [{ name: 'AppStack' }],
  //       });
  //     } else {
  //       return;
  //     }
  //   }
  // };


  // const requestUserPermission = async () => {
  //     const authStatus = await messaging().requestPermission();
  //     const enabled =
  //         authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //         authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  //     if (enabled) {
  //         getFcmToken();
  //     }
  // };


  // const getFcmToken = async () => {
  //     await messaging().registerDeviceForRemoteMessages();
  //     const fcmToken = await messaging().getToken();
  //     if (fcmToken) {
  //         store.dispatch(setFCMToken(fcmToken));
  //     } else {
  //         console.log('Failed', 'No token received');
  //     }
  // };



  return (
    <ToastProvider>
      <Provider store={store}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <ThemeProvider theme={Theme}>
            <StatusBar
              backgroundColor={Colors.white}
              barStyle={'dark-content'}
              hidden={false}
            />
            <NavigationContainer ref={navigationRef}>
              <StackScreens />
            </NavigationContainer>
          </ThemeProvider>
        </GestureHandlerRootView>
      </Provider>
    </ToastProvider>
  )
};

export default App;