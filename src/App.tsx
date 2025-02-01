import React, {useEffect, useState} from 'react';
import StorageInstace from './libs/storage/Storage';
import {
  setJSExceptionHandler,
  setNativeExceptionHandler,
} from 'react-native-exception-handler';
import CrashReporterInstance from '@/libs/crash-reporter/CrashReporter';
import DeviceInfo from 'react-native-device-info';
import {requestPermissions} from './components/Permission';
import RootNavigator, {navigationRef} from './libs/navigation/RootNavigation';
import {LogBox} from 'react-native';
import NetworkInfo from './components/NetInfo';
import {NativeBaseProvider} from 'native-base';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';
import AnalyticsWatcher from './libs/analytics';
import OneSignalWatcher from './libs/push-notification';
import {SheetProvider} from 'react-native-actions-sheet';
import LoggerInstance from './libs/Logger';
import LoadingScreen from './components/Loading';
import {persistor, store} from './redux/AppStore';
import Geolocation from '@react-native-community/geolocation';
import RootNavigation from './navigation/RootNavigation';
const getUser = async () => {
  const userSession: any = await StorageInstace.getItem('user');
  return JSON.parse(userSession);
};
const allowInDevMode = true;
/* Native  exception handling */
setNativeExceptionHandler(async (exceptionString) => {
  await setCrashanalyticsAttributes();
  console.log(' native excetion ', exceptionString);
  CrashReporterInstance.recordError(exceptionString);
});

const setCrashanalyticsAttributes = async () => {
  const userData = await getUser();
  if (userData) {
    CrashReporterInstance.setUserId(userData?.user_id),
      CrashReporterInstance.setAttribute('mobile', userData?.mobile_number);
  }
  CrashReporterInstance.setAttribute('deviceType', DeviceInfo.getDeviceType());
  DeviceInfo.getBaseOs().then((baseOs) => {
    CrashReporterInstance.setAttribute('OS', baseOs);
  });
  CrashReporterInstance.setAttribute(
    'OSVersion',
    DeviceInfo.getReadableVersion(),
  );
  CrashReporterInstance.setAttribute('appBuildNo', DeviceInfo.getBuildNumber());
};

/* JS error hadnling */
const exceptionhandler = async (error: any, _isFatal: boolean) => {
  setCrashanalyticsAttributes();
};
setJSExceptionHandler(exceptionhandler, allowInDevMode);
const App = () => {
  // const [isOpen, setIsOpen] = useState(false);
  let previousRouteName: string | undefined = '';
  useEffect(() => {
    Geolocation.requestAuthorization();
    const activeDate: Date = new Date();
    StorageInstace.setItem('activeTime', JSON.stringify(activeDate));
    requestPermissions(['camera', 'location']);
    getUser();
    return () => {
      RootNavigator.isReadyRef = false;
    };
  }, []);
  useEffect(() => {
    Geolocation.setRNConfiguration({
      skipPermissionRequests: false,
      authorizationLevel: 'always',
      locationProvider: 'android',
    });
  }, []);

  LogBox.ignoreAllLogs(true);
  return (
    <NetworkInfo>
      <NativeBaseProvider>
        <SheetProvider>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <NavigationContainer
                ref={navigationRef}
                onReady={() => {
                  RootNavigator.isReadyRef = true;
                  previousRouteName =
                    navigationRef.current?.getCurrentRoute()?.name;
                }}
                onStateChange={async () => {
                  const userData = await getUser();
                  const screenName =
                    navigationRef.current?.getCurrentRoute()?.name;
                  LoggerInstance.logScreen(
                    String(screenName),
                    String(screenName),
                    userData ? userData?.mobile_number : 'App Open',
                  );
                }}>
                <AnalyticsWatcher />
                <OneSignalWatcher />
                <RootNavigation />
                <LoadingScreen />
              </NavigationContainer>
            </PersistGate>
          </Provider>
          {/* {isOpen && <UpdateModal isOpen />} */}
        </SheetProvider>
      </NativeBaseProvider>
    </NetworkInfo>
  );
};

export default App;
