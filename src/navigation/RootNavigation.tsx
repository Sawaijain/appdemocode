import CustomHeader from '@/components/CustomHeader';
import HomeProfileContainer from '@/features/auth/HomeProfileContainer';
import SignInContainer from '@/features/auth/SignInContainer';
import SignUpContainer from '@/features/auth/SignUpContainer';
import VerifyOtpContainer from '@/features/auth/VerifyOtpContainer';

import AboutUsContainer from '@/features/main/common-pages/AboutUsContainer';
import CommisionTableContainer from '@/features/main/common-pages/CommisionTable';
import CommonWebViewContainer from '@/features/main/common-pages/CommonWebViewContainer';
import DChart from '@/features/main/common-pages/DChart';
import InTransitInvoiceListPayments from '@/features/main/common-pages/InTransitInvoiceListPayments';
import ShowInvoiceInTransit from '@/features/main/common-pages/ShowInvoiceInTransit';
import MyProfileContainer from '@/features/main/kyc/MyProfileContainer';
import UserKycContainer from '@/features/main/kyc/UserKycContainer';
import UserKycPaymentContainer from '@/features/main/kyc/UserKycPaymentContainer';
import UserKycTdsContainer from '@/features/main/kyc/UserKycTdsContainer';
import PaymentBill from '@/features/main/loads/PaymentBill';
import ViewPodContainer from '@/features/main/loads/ViewPod';
import AddTruckContainer from '@/features/main/truck/Screens/AddTruckContainer';
import {setToken} from '@/libs';
import {APPCOLORS} from '@/libs/customStyles/ShipperStyle';
import OneSignalControllerInstance from '@/libs/push-notification/OneSignal';
import {RootState, appDispatch} from '@/redux/AppStore';
import {updateNotificationId} from '@/redux/actions/NotificationAction';
import {getUserDetail} from '@/redux/actions/UserAction';
import {carrierLoading} from '@/redux/reducers/loadingSlice';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import OneSignal from 'react-native-onesignal';
import {useSelector} from 'react-redux';
import AppBottomTab from './AppBottomTab';
import OrderDetailContainer from '@/features/main/matched-loads/screen/OrderDetailContainer';
import BookTruckContainer from '@/features/main/matched-loads/screen/BookTruckContainer';
import PaymentDetailContainer from '@/features/main/payment/PaymentDetailContainer';
import LoadOrderDetailContainer from '@/features/main/order/LoadOrderDetailContainer';
import ViewInvoiceContainer from '@/features/main/Invoices/ViewInvoiceContainer';
import DriverHomeContainer from '@/features/main/driver/driver-home/screens/DriverHomeContainer';
import DriverLoadContainer from '@/features/main/driver/driver-load/screens/DriverLoadContainer';
import ViewDriverLoadContainer from '@/features/main/driver/driver-load/screens/ViewDriverLoadContainer';
import KycDetailContainer from '@/features/main/kyc/KycDetailContainer';
const RootStack = createNativeStackNavigator();
const RootNavigation = () => {
  const [osId, setOsId] = useState<string | undefined>('');
  const {token, loggedIn, userDetails, isFromRegister}: any = useSelector(
    (state: RootState) => state.auth,
  );
  useEffect(() => {
    OneSignal.setNotificationWillShowInForegroundHandler(
      notificationWillShowInForegroundHandler,
    );
    OneSignal.setNotificationOpenedHandler(notificationOpenedHandler);
  }, []);
  const notificationWillShowInForegroundHandler = (notification: any) => {
    const _notification = notification?.getNotification();
    OneSignalControllerInstance.showNotification(notification);
    if (
      _notification &&
      _notification?.additionalData &&
      _notification?.additionalData?.user_id
    ) {
      getUserDetail(_notification?.additionalData?.user_id);
    }
  };
  const notificationOpenedHandler = (notification: any) => {
    OneSignalControllerInstance.showNotification(notification);
  };

  useEffect(() => {
    if (loggedIn && token) {
      getUserDetail(userDetails?.user_id);
      getId();
      StatusBar.setBarStyle('light-content', true);
      StatusBar.setBackgroundColor(APPCOLORS.darkBlack, true);
      setToken(token);
    } else {
      StatusBar.setBarStyle('light-content', true);
      StatusBar.setBackgroundColor(APPCOLORS.darkBlack, true);
    }
  }, [loggedIn, token]);

  useEffect(() => {
    if (osId && userDetails?.user_id) {
      updateNotificationId({
        userId: userDetails?.user_id,
        notification_id: osId,
      });
    }
  }, [userDetails?.user_id, osId]);
  const getId = async () => {
    try {
      const osState = await OneSignal.getDeviceState();
      setOsId(osState?.userId);
    } catch (error) {
      console.log('error', error);
    }
  };
  useEffect(() => {
    appDispatch(carrierLoading(false));
  }, []);
  return (
    <RootStack.Navigator
      initialRouteName={
        loggedIn && isFromRegister
          ? UserKycContainer.SCREEN_NAME
          : loggedIn && userDetails?.profileType == 'driver'
          ? DriverHomeContainer.SCREEN_NAME
          : loggedIn && !isFromRegister
          ? AppBottomTab.SCREEN_NAME
          : !loggedIn && !isFromRegister
          ? SignInContainer.SCREEN_NAME
          : SignInContainer.SCREEN_NAME
      }>
      {token && loggedIn ? (
        <React.Fragment>
          {userDetails?.profileType == 'driver' ? (
            <React.Fragment>
              <RootStack.Screen
                name={DriverHomeContainer.SCREEN_NAME}
                component={DriverHomeContainer}
                options={DriverHomeContainer.navigationOptions}
              />
              <RootStack.Screen
                name={DriverLoadContainer.SCREEN_NAME}
                component={DriverLoadContainer}
                options={DriverLoadContainer.navigationOptions}
              />
              <RootStack.Screen
                name={ViewDriverLoadContainer.SCREEN_NAME}
                //@ts-ignore
                component={ViewDriverLoadContainer}
                options={ViewDriverLoadContainer.navigationOptions}
              />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <RootStack.Screen
                name={UserKycContainer.SCREEN_NAME}
                component={UserKycContainer}
                options={UserKycContainer.navigationOptions}
              />
              <RootStack.Screen
                name={UserKycPaymentContainer.SCREEN_NAME}
                component={UserKycPaymentContainer}
                options={UserKycPaymentContainer.navigationOptions}
              />
              <RootStack.Screen
                name={UserKycTdsContainer.SCREEN_NAME}
                component={UserKycTdsContainer}
                options={UserKycTdsContainer.navigationOptions}
              />

              <RootStack.Screen
                name={AppBottomTab.SCREEN_NAME}
                component={AppBottomTab}
                options={AppBottomTab.navigationOptions}
              />

              <RootStack.Screen
                name={CommisionTableContainer.SCREEN_NAME}
                component={CommisionTableContainer}
                options={{
                  header: ({navigation}) => (
                    <CustomHeader navigation={navigation} loggedIn={loggedIn} />
                  ),
                }}
              />
              <RootStack.Screen
                name={AboutUsContainer.SCREEN_NAME}
                component={AboutUsContainer}
                options={{
                  header: ({navigation}) => (
                    <CustomHeader navigation={navigation} loggedIn={loggedIn} />
                  ),
                }}
              />
              <RootStack.Screen
                name={CommonWebViewContainer.SCREEN_NAME}
                component={CommonWebViewContainer}
                options={{
                  header: ({navigation}) => (
                    <CustomHeader
                      isBack={true}
                      navigation={navigation}
                      loggedIn={loggedIn}
                    />
                  ),
                }}
              />
              <RootStack.Screen
                name={MyProfileContainer.SCREEN_NAME}
                component={MyProfileContainer}
                options={{
                  headerShown: false,
                }}
              />
              <RootStack.Screen
                name={AddTruckContainer.SCREEN_NAME}
                component={AddTruckContainer}
                options={{
                  headerShown: false,
                }}
              />
              <RootStack.Screen
                name={InTransitInvoiceListPayments.SCREEN_NAME}
                component={InTransitInvoiceListPayments}
                options={{
                  header: ({navigation}) => (
                    <CustomHeader navigation={navigation} loggedIn={loggedIn} />
                  ),
                }}
              />
              <RootStack.Screen
                name={ShowInvoiceInTransit.SCREEN_NAME}
                component={ShowInvoiceInTransit}
                options={ShowInvoiceInTransit.navigationOptions}
              />
              <RootStack.Screen
                name={PaymentBill.SCREEN_NAME}
                component={PaymentBill}
                options={{headerShown: false}}
              />
              <RootStack.Screen
                name={LoadOrderDetailContainer.SCREEN_NAME}
                //@ts-ignore
                component={LoadOrderDetailContainer}
                options={{
                  headerShown: false,
                }}
              />
              <RootStack.Screen
                //@ts-ignore
                name={ViewPodContainer.SCREEN_NAME}
                //@ts-ignore
                component={ViewPodContainer}
                options={{
                  header: ({navigation}) => (
                    <CustomHeader
                      navigation={navigation}
                      isBack
                      loggedIn={loggedIn}
                    />
                  ),
                }}
              />

              <RootStack.Screen
                name={DChart.SCREEN_NAME}
                component={DChart}
                options={{
                  header: ({navigation}) => (
                    <CustomHeader isBack navigation={navigation} />
                  ),
                }}
              />
              <RootStack.Screen
                name={OrderDetailContainer.SCREEN_NAME}
                //@ts-ignore
                component={OrderDetailContainer}
                options={OrderDetailContainer.navigationOptions}
              />
              <RootStack.Screen
                name={BookTruckContainer.SCREEN_NAME}
                //@ts-ignore
                component={BookTruckContainer}
                options={BookTruckContainer.navigationOptions}
              />
              <RootStack.Screen
                name={PaymentDetailContainer.SCREEN_NAME}
                //@ts-ignore
                component={PaymentDetailContainer}
                options={PaymentDetailContainer.navigationOptions}
              />
              <RootStack.Screen
                name={ViewInvoiceContainer.SCREEN_NAME}
                //@ts-ignore
                component={ViewInvoiceContainer}
                options={ViewInvoiceContainer.navigationOptions}
              />
              <RootStack.Screen
                name={KycDetailContainer.SCREEN_NAME}
                component={KycDetailContainer}
                options={KycDetailContainer.navigationOptions}
              />
            </React.Fragment>
          )}
        </React.Fragment>
      ) : (
        <React.Fragment>
          <RootStack.Screen
            name={SignInContainer.SCREEN_NAME}
            component={SignInContainer}
            options={SignInContainer.navigationOptions}
          />
          <RootStack.Screen
            name={VerifyOtpContainer.SCREEN_NAME}
            component={VerifyOtpContainer}
            options={VerifyOtpContainer.navigationOptions}
          />
          <RootStack.Screen
            name={HomeProfileContainer.SCREEN_NAME}
            component={HomeProfileContainer}
            options={HomeProfileContainer.navigationOptions}
          />
          <RootStack.Screen
            name={SignUpContainer.SCREEN_NAME}
            component={SignUpContainer}
            options={SignUpContainer.navigationOptions}
          />
          <RootStack.Screen
            name={UserKycContainer.SCREEN_NAME}
            component={UserKycContainer}
            options={UserKycContainer.navigationOptions}
          />
          <RootStack.Screen
            name={UserKycPaymentContainer.SCREEN_NAME}
            component={UserKycPaymentContainer}
            options={UserKycPaymentContainer.navigationOptions}
          />
          <RootStack.Screen
            name={UserKycTdsContainer.SCREEN_NAME}
            component={UserKycTdsContainer}
            options={UserKycTdsContainer.navigationOptions}
          />
        </React.Fragment>
      )}
    </RootStack.Navigator>
  );
};

export default RootNavigation;
