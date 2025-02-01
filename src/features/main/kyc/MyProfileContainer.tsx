import {AppText} from '@/components/AppText';
import AppTouchableOpacity from '@/components/AppTouchableOpacity';
import {useTheme} from '@/hooks/useTheme';
import {getMobileNo, sleep} from '@/libs';
import useShipperStyle from '@/libs/customStyles/ShipperStyle';
import RootNavigator, {navigationRef} from '@/libs/navigation/RootNavigation';
import {getKycDetails} from '@/redux/actions/AuthAction';
import strings from '@/util/Strings';
import React, {useEffect, useState} from 'react';
import {View, Image} from 'react-native';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import {normalize} from '@/theme/Utils';
import {getImage} from '@/redux/actions/UserAction';
import {showAlert} from '@/components/Alert';
import {RootState, appDispatch} from '@/redux/AppStore';
import TruckBaseScreen from '@/features/base/screens/TruckBaseScreen';
import AppButton from '@/components/AppButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSignInStyle} from '@/features/auth/styles/useSignInStyle';
import SignInContainer from '@/features/auth/SignInContainer';
import {setClearState} from '@/redux/reducers/authSlice';
import {BackIcon} from '@/components/icons/Icon';

const MyProfileContainer = () => {
  const [isFrontShow, setIsFrontShow] = useState<boolean>(false);
  const [isBackShow, setIsBackShow] = useState<boolean>(false);
  const {userDetails, kycDetails} = useSelector(
    (state: RootState) => state.auth,
  );
  const {
    style: {layout, gutter},
    value: {fontSize, color},
  } = useTheme();
  const style = useShipperStyle();
  const signInStyle = useSignInStyle();
  useEffect(() => {
    if (userDetails && userDetails.kyc_id) getKycDetails(userDetails.kyc_id);
  }, [userDetails]);
  const {imagePath} = useSelector((state: RootState) => state.user);
  const handleLogout = () => {
    AsyncStorage.clear();
    appDispatch({type: 'LOGOUT'});
    appDispatch(setClearState());
    AsyncStorage.removeItem('persist:root');
    sleep(200).then(() =>
      navigationRef.current?.navigate(SignInContainer.SCREEN_NAME),
    );
  };
  useEffect(() => {
    if (imagePath) setIsFrontShow(!isFrontShow);
  }, [imagePath]);
  return (
    <React.Fragment>
      <TruckBaseScreen
        profileType={userDetails?.profileType}
        scrollChildren={
          <View style={gutter.marginHorizontal.normal}>
            <AppTouchableOpacity
              onPress={() => RootNavigator.pop()}
              children={<BackIcon size={25} />}
            />
            {userDetails?.owner_name ? (
              <AppText
                style={{
                  fontSize: fontSize.regular,
                  ...gutter.marginTop.regular,
                }}
                mode="defaultBold">
                {strings.welcome} {userDetails?.owner_name} !
              </AppText>
            ) : null}
            <View style={gutter.marginVertical.regular}>
              <View>
                <AppText
                  style={{fontSize: fontSize.regular}}
                  mode="defaultBold">
                  {strings.mobileNo}
                </AppText>
                <AppText mode="alternative" style={style.profileBox}>
                  {getMobileNo(userDetails?.mobile_number)}
                </AppText>
              </View>
              <View>
                <AppText
                  style={{fontSize: fontSize.regular}}
                  mode="defaultBold">
                  {strings.panNo}
                </AppText>
                <AppText mode="alternative" style={style.profileBox}>
                  {kycDetails?.pan_number}
                </AppText>
              </View>
              <View>
                <AppText
                  style={{fontSize: fontSize.regular}}
                  mode="defaultBold">
                  {strings.bank + ' ' + strings.account + ' ' + strings.number}:
                </AppText>
                <AppText mode="alternative" style={style.profileBox}>
                  {kycDetails?.account_number}
                </AppText>
              </View>
              <View>
                <AppText
                  style={{fontSize: fontSize.regular}}
                  mode="defaultBold">
                  {strings.ifsc}:
                </AppText>
                <AppText mode="alternative" style={style.profileBox}>
                  {kycDetails?.ifsc_code}
                </AppText>
              </View>
              <View
                style={[gutter.marginBottom.small, gutter.marginTop.regular]}>
                <AppText
                  style={{fontSize: fontSize.regular}}
                  mode="defaultBold">
                  {strings.addressProof}:
                </AppText>
                <AppText
                  style={[{fontSize: fontSize.medium}, gutter.marginTop.tiny]}
                  mode="alternative">
                  {strings.providedProof} : {kycDetails?.address_proof_type}
                </AppText>
              </View>
              <View
                style={{
                  backgroundColor: '#F9F9F9',
                }}>
                <AppTouchableOpacity
                  onPress={() => {
                    if (kycDetails?.address_proof_photo) {
                      getImage(kycDetails?.address_proof_photo);
                    } else {
                      showAlert({message: 'अपलोड नहीं किया गया '});
                      return;
                    }
                  }}
                  style={style.docBtn}
                  children={
                    <React.Fragment>
                      <Icon
                        style={{...layout.fill, maxWidth: normalize(50)}}
                        size={30}
                        name="ios-file-tray-full-outline"
                      />
                      <AppText>{strings.frontPhoto}</AppText>
                      <Icon
                        size={25}
                        style={{
                          ...layout.fill,
                          maxWidth: normalize(50),
                          ...layout.alignItemsEnd,
                          ...layout.forceRight,
                          ...gutter.marginRight.small,
                        }}
                        name={
                          isFrontShow ? 'ios-chevron-up' : 'ios-chevron-down'
                        }
                      />
                    </React.Fragment>
                  }
                />
                {isFrontShow && imagePath && (
                  <View>
                    <Image
                      style={{
                        height: 250,
                        width: '96%',
                        resizeMode: 'cover',
                        borderRadius: 10,
                      }}
                      source={{
                        uri: imagePath,
                      }}
                    />
                  </View>
                )}

                <AppTouchableOpacity
                  style={style.docBtn}
                  onPress={() => {
                    if (kycDetails?.address_proof_photo_back) {
                      setIsBackShow(!isBackShow);
                      getImage(kycDetails?.address_proof_photo_back);
                    } else {
                      showAlert({message: 'अपलोड नहीं किया गया '});
                      return;
                    }
                  }}
                  children={
                    <React.Fragment>
                      <Icon
                        style={{...layout.fill, maxWidth: normalize(50)}}
                        size={30}
                        name="ios-file-tray-full-outline"
                      />
                      <AppText>{strings.backPhoto}</AppText>
                      <Icon
                        size={25}
                        style={{
                          ...layout.fill,
                          maxWidth: normalize(50),
                          ...layout.alignItemsEnd,
                          ...layout.forceRight,
                          ...gutter.marginRight.small,
                        }}
                        name={
                          isBackShow ? 'ios-chevron-up' : 'ios-chevron-down'
                        }
                      />
                    </React.Fragment>
                  }
                />
                {isBackShow && imagePath && (
                  <View>
                    <Image
                      style={{
                        height: 250,
                        width: '96%',
                        resizeMode: 'cover',
                        borderRadius: 10,
                      }}
                      source={{
                        uri: imagePath,
                      }}
                    />
                  </View>
                )}
              </View>
            </View>
            <View
              style={[
                gutter.marginBottom.extraLarge,
                layout.rowVerticalCenter,
              ]}>
              <AppText style={{fontSize: fontSize.regular}} mode="alternative">
                {' '}
                दस्तावेज सत्यापन स्थिति:{' '}
              </AppText>
              <AppText
                style={{fontSize: fontSize.regular, color: color.success}}
                mode="defaultBold">
                {userDetails?.is_KYC_verified
                  ? 'सत्यापित'
                  : 'सत्यापित नहीं किए गए||'}
              </AppText>
            </View>
          </View>
        }
      />
      <View style={[gutter.marginHorizontal.regular]}>
        <AppButton
          buttonStyle={[
            signInStyle.nextButton,
            {
              marginLeft: 0,
              backgroundColor:
                userDetails?.profileType == 'transporter'
                  ? color.transporter
                  : color.buttonNew,
            },
          ]}
          label={strings.sign_out}
          onPress={handleLogout}
          textColor={color.white}
        />
      </View>
    </React.Fragment>
  );
};
MyProfileContainer.SCREEN_NAME = 'MyProfileContainer';
MyProfileContainer.navigationOptions = {
  headerShown: false,
};
MyProfileContainer.navigate = () => {
  RootNavigator.navigate(MyProfileContainer.SCREEN_NAME);
};
export default MyProfileContainer;
