import {View, StatusBar, Linking} from 'react-native';
import React, {useEffect, useState} from 'react';
import RootNavigator from '@/libs/navigation/RootNavigation';
import GuestKeyboardBaseScreen from '../base/screens/GuestKeyboardBaseScreen';
import {AppText} from '@/components/AppText';
import {useSignInStyle} from './styles/useSignInStyle';
import {Image} from 'react-native';
import IMAGE_URL from '@/theme/ImageUrl';
import {AppTextInput} from '@/components/AppTextInput';
import AppButton from '@/components/AppButton';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {BackHandler} from 'react-native';
import VerifyOtpContainer from './VerifyOtpContainer';
import {appDispatch} from '@/redux/AppStore';
import {setUserMobileNumber} from '@/redux/reducers/authSlice';
import {showAlert} from '@/components/Alert';
import Toaster from '@/libs/toasterService';
import {sendOtp} from '@/redux/actions/AuthAction';
import CommonWebViewContainer from '../main/common-pages/CommonWebViewContainer';
import Config from 'react-native-config';
const SignInContainer = () => {
  const style = useSignInStyle();
  const [mobileNumber, setMobileNumber] = useState<string>('');
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        BackHandler.exitApp();
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  const callBack = (success: boolean, error?: string) => {
    if (success) {
      appDispatch(setUserMobileNumber(mobileNumber));
      Toaster.show('Otp send successfully');
      VerifyOtpContainer.navigate(mobileNumber);
      setMobileNumber('');
    } else if (!success) {
      showAlert({message: String(error)});
    }
  };
  const handleLogin = () => {
    const PHONE_REGEXP = /^[6789]\d{9}$/;
    if (!PHONE_REGEXP.test(mobileNumber)) {
      Toaster.show('Invalid Mobile Number');
      return;
    }
    const req = {mobile_number: mobileNumber};
    sendOtp(req, callBack);
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
            <AppTextInput
              keyboardType={'numeric'}
              placeholder="Enter Your Mobile Number"
              maxLength={10}
              placeholderTextColor={style.colors.placeholder}
              //@ts-ignore
              textInputStyle={[style.textInput, {color: style.colors.white}]}
              onChangeText={setMobileNumber}
              value={mobileNumber}
              fillParent={true}
              isCenter
              multiline
              textAlign="center"
              blurOnSubmit={true}
              onSubmitEditing={handleLogin}
            />
            <View style={style.terms_wrap}>
              <AppText style={style.terms}>
                By Continuing, You are agreeing to our{' '}
              </AppText>
              <AppText
                onPress={() => Linking.openURL(String(Config.TERMSURL))}
                style={style.termsText}>
                Terms & Conditions
              </AppText>
            </View>
            <View style={style.center}>
              <AppButton
                buttonStyle={[
                  style.button,
                  mobileNumber.length !== 10 && style.disabled,
                ]}
                textColor={style.colors.white}
                label="Request OTP"
                onPress={handleLogin}
                isEnabled={mobileNumber.length === 10}
              />
            </View>
          </View>
        </React.Fragment>
      }
    />
  );
};
SignInContainer.SCREEN_NAME = 'SignInContainer';
SignInContainer.navigationOptions = {
  headerShown: false,
};
SignInContainer.navigate = () => {
  RootNavigator.navigate(SignInContainer.SCREEN_NAME);
};
export default SignInContainer;
