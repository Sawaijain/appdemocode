import {View, Image, Linking} from 'react-native';
import React, {useEffect, useState} from 'react';
import RootNavigator, {navigationRef} from '@/libs/navigation/RootNavigation';
import {RootNavigationParam} from '../base/interfaces/interfaces';
import {useSignInStyle} from './styles/useSignInStyle';
import GuestKeyboardBaseScreen from '../base/screens/GuestKeyboardBaseScreen';
import {AppText} from '@/components/AppText';
import IMAGE_URL from '@/theme/ImageUrl';
import AppButton from '@/components/AppButton';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {showAlert} from '@/components/Alert';
import {setToken} from '@/libs';
import LoggerInstance from '@/libs/Logger';
import AnalyticsFunction from '@/libs/analytics/AnalyticsService';
import StorageInstace from '@/libs/storage/Storage';
import Toaster from '@/libs/toasterService';
import {appDispatch} from '@/redux/AppStore';
import {sendOtp, verifyOtp} from '@/redux/actions/AuthAction';
import {
  addUserProfile,
  loginSuccess,
  setNavigateFrom,
} from '@/redux/reducers/authSlice';
import strings from '@/util/Strings';
import AppTouchableOpacity from '@/components/AppTouchableOpacity';
import HomeProfileContainer from './HomeProfileContainer';
import AppBottomTab from '@/navigation/AppBottomTab';
import Config from 'react-native-config';
import DriverHomeContainer from '../main/driver/driver-home/screens/DriverHomeContainer';

const VerifyOtpContainer = ({route}: RootNavigationParam<any>) => {
  const {params} = route;
  const style = useSignInStyle();
  const [timerText, setTimerText] = useState(30);
  const [code, setCode] = useState<string>('');
  useEffect(() => {
    const interval = setInterval(() => setTimerText((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, []);
  const callBackForVerifiedOtp = (
    success: boolean,
    error?: string,
    userData?: any,
  ) => {
    if (success) {
      setToken(userData.token);
      if (userData.deleted_by_admin === true) {
        showAlert({message: strings.deleteByAdmin});
      } else {
        if (userData && userData?.isRegistered) {
          if (userData?.user[0]) {
            appDispatch(addUserProfile(userData?.user[0]));
            appDispatch(loginSuccess(userData.token));
            StorageInstace.setItem('kyc_id', userData?.user[0]?.kyc_id);
            StorageInstace.setItem(
              'mobile&otp',
              JSON.stringify({mobileNumber: `${params?.mobileNumber}`, code}),
            );
            StorageInstace.setItem('user', JSON.stringify(userData?.user[0]));
            StorageInstace.setItem('agrigator:token', userData.token);
            AnalyticsFunction.functionSetUserId(userData?.user[0]?.user_id);
            AnalyticsFunction.functionLogUpdate('UserLogin', {
              mobileNumber: `${params?.mobileNumber}`,
              code,
            });
            LoggerInstance.registerUser(userData?.user[0]?.user_id);
            appDispatch(setNavigateFrom(false));
            if (userData?.user[0]?.profileType === 'driver') {
              appDispatch(setNavigateFrom(false));
              navigationRef.current?.navigate(DriverHomeContainer.SCREEN_NAME);
              return;
            } else {
              AppBottomTab.navigate();
            }
          }
        } else {
          HomeProfileContainer.navigate(params?.mobileNumber);
        }
      }
    } else if (!success) {
      showAlert({message: String(strings.checkOtp)});
    }
  };
  const resendOtp = () => {
    if (params?.mobileNumber.length == 10) {
      const req = {mobile_number: `${params?.mobileNumber}`};
      sendOtp(req, callBack);
    } else {
      Toaster.show('Please enter mobile number');
    }
  };

  const handleVerify = () => {
    if (code.length == 4) {
      let data = {
        mobile_number: `${params?.mobileNumber}`,
        otp: code,
        user_type: 'fleet_owner',
      };
      verifyOtp(data, callBackForVerifiedOtp);
    } else {
      Toaster.show('Please enter OTP');
    }
  };
  return (
    <GuestKeyboardBaseScreen
      scrollChildren={
        <React.Fragment>
          <AppText style={style.welcometext}>Welcome to,</AppText>
          <View style={style.logoContainer}>
            <Image source={IMAGE_URL.logo} style={style.logo} />
            <AppText mode="description" style={style.appmoto}>
              Simplifying On-Spot Agri Logistics
            </AppText>
          </View>
          <View style={style.formGroup}>
            <OTPInputView
              style={style.otpInput}
              pinCount={4}
              autoFocusOnLoad={false}
              codeInputFieldStyle={style.underlineStyleBase}
              codeInputHighlightStyle={style.underlineStyleHighLighted}
              onCodeFilled={(_code) => {
                setCode(_code);
              }}
              code={code}
              onCodeChanged={(_code) => {
                setCode(_code);
              }}
              placeholderCharacter="-"
            />

            <View style={[style.terms_wrap, style.terms_box]}>
              <AppText style={style.terms}>
                By Continuing, You are agreeing to our{' '}
              </AppText>
              <AppText
                onPress={() => Linking.openURL(String(Config.TERMSURL))}
                style={style.termsText}>
                Terms & Conditions
              </AppText>
            </View>
            <AppTouchableOpacity
              onPress={resendOtp}
              children={
                <AppText
                  mode="defaultBold"
                  style={style.resendText}
                  onPress={() => {
                    timerText < 1 ? null : null;
                  }}>
                  {timerText < 1 ? 'Resend OTP' : timerText}{' '}
                  {timerText < 1 ? ' ' : 'Seconds'}
                </AppText>
              }
            />
            <View style={style.center}>
              <AppButton
                buttonStyle={[
                  style.button,
                  code.length !== 4 && style.disabled,
                ]}
                textColor={style.colors.white}
                label="Login"
                onPress={handleVerify}
                isEnabled={code.length === 4}
              />
            </View>
          </View>
        </React.Fragment>
      }
    />
  );
};
VerifyOtpContainer.SCREEN_NAME = 'VerifyOtpContainer';
VerifyOtpContainer.navigationOptions = {
  headerShown: false,
};
VerifyOtpContainer.navigate = (mobileNumber: string) => {
  RootNavigator.navigate(VerifyOtpContainer.SCREEN_NAME, {mobileNumber});
};
export default VerifyOtpContainer;

function callBack(success: boolean, error?: string | undefined): void {
  if (success) Toaster.show('Otp send successfully');
  else showAlert({message: String(error)});
}
