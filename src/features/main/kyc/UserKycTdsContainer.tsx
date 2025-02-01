import {View, Text} from 'react-native';
import React, {useState} from 'react';
import RootNavigator, {navigationRef} from '@/libs/navigation/RootNavigation';
import {useSignInStyle} from '@/features/auth/styles/useSignInStyle';
import {useTheme} from '@/hooks/useTheme';
import strings from '@/util/Strings';
import KeyboardBaseScreen from '@/features/base/screens/KeyboardBaseScreen';
import Stepper from '@/components/Stepper';
import {AppText} from '@/components/AppText';
import TruckCount from './components/TruckCount';
import {Checkbox, useToast} from 'native-base';
import AppButton from '@/components/AppButton';
import {useKeyboard} from '@/hooks/useKeyboard';
import {RootNavigationParam} from '@/features/base/interfaces/interfaces';
import {useSelector} from 'react-redux';
import {RootState, appDispatch} from '@/redux/AppStore';
import CustomCheckbox from './components/CustomCheckbox';
import {isObjectEmpty, setToken} from '@/libs';
import {updateKyc} from '@/redux/actions/UserAction';
import {showAlert} from '@/components/Alert';
import LoggerInstance from '@/libs/Logger';
import AnalyticsFunction from '@/libs/analytics/AnalyticsService';
import StorageInstace from '@/libs/storage/Storage';
import {
  addUserProfile,
  loginSuccess,
  getUserKycDetails,
  setNavigateFrom,
} from '@/redux/reducers/authSlice';
import LoadContainer from '../loads/LoadContainer';
import AppBottomTab from '@/navigation/AppBottomTab';

const UserKycTdsContainer = ({route}: RootNavigationParam<any>) => {
  const {params} = route;
  const isKeyboard = useKeyboard();
  const toast = useToast();
  const [truckCount, setTruckCount] = useState(strings.kyc.one);
  const [isChecked, setIsChecked] = useState(false);
  const {
    style: {layout, gutter},
    value: {color},
  } = useTheme();
  const {userDetails} = useSelector((state: RootState) => state.auth);
  const style = useSignInStyle(userDetails?.profileType);
  const handleNext = () => {
    if (isChecked) {
      let _countType =
        truckCount == strings.kyc.one ? '1-9 trucks' : '10+ trucks';
      const formData: FormData = new FormData();
      formData.append('mobile_number', userDetails?.mobile_number);
      formData.append('pan_number', params?.data?.panNumber);
      formData.append('account_number', params?.data?.accountNumber);
      formData.append('ifsc_code', params?.data?.ifscCode);
      formData.append('user_id', userDetails?.user_id);
      formData.append('address_proof_type', params?.data?.addressProofType);
      if (
        params?.data?.addressFront &&
        !isObjectEmpty(params?.data?.addressFront)
      ) {
        formData.append('file', {
          uri: params?.data?.addressFront?.uri
            ? params?.data?.addressFront?.uri
            : params?.data?.addressFront[0]?.uri,
          name: params?.data?.addressFront?.name
            ? params?.data?.addressFront.name
            : params?.data?.addressFront[0]?.name,
          type: params?.data?.addressFront?.type
            ? params?.data?.addressFront.type
            : params?.data?.addressFront[0]?.type,
        });
      }
      if (
        params?.data?.addressBack &&
        !isObjectEmpty(params?.data?.addressBack)
      ) {
        formData.append('file', {
          uri: params?.data?.addressBack?.uri
            ? params?.data?.addressBack?.uri
            : params?.data?.addressBack[0]?.uri,
          name: params?.data?.addressBack?.name
            ? params?.data?.addressBack.name
            : params?.data?.addressBack[0]?.name,
          type: params?.data?.addressBack?.type
            ? params?.data?.addressBack.type
            : params?.data?.addressBack[0]?.type,
        });
      }
      formData.append('bankDetails', JSON.stringify(params?.data?.bankDetails));
      formData.append('pan_details', JSON.stringify(params?.data?.panDetails));
      formData.append('profileType', userDetails?.profileType);
      formData.append('truck_count_type', _countType);
      if (
        params?.data?.visitingCard &&
        !isObjectEmpty(params?.data?.visitingCard)
      ) {
        formData.append('file', {
          uri: params?.data?.visitingCard?.uri
            ? params?.data?.visitingCard?.uri
            : params?.data?.visitingCard[0]?.uri,
          name: params?.data?.visitingCard?.name
            ? params?.data?.visitingCard.name
            : params?.data?.visitingCard[0]?.name,
          type: params?.data?.visitingCard?.type
            ? params?.data?.visitingCard.type
            : params?.data?.visitingCard[0]?.type,
        });
      }
      updateKyc(formData, callBack, false);
      appDispatch(setNavigateFrom(false));
    } else {
      toast.show({title: 'Please accept terms '});
    }
  };
  const callBack = (
    success: boolean,
    error?: string,
    _data?: any,
    isUpdate?: boolean,
  ) => {
    if (success) {
      showAlert({
        message: String(
          error || 'KYC Updated Succesfully, waiting for verification',
        ),
        buttons: [
          {
            title: 'Okay',
            onPress: () => {
              if (isUpdate) {
                navigationRef.current?.navigate(LoadContainer.SCREEN_NAME);
              } else {
                if (_data) {
                  appDispatch(addUserProfile(_data.user));
                  appDispatch(loginSuccess(_data.token));
                  appDispatch(getUserKycDetails(_data));
                  StorageInstace.setItem('kyc_id', _data?.user?.kyc_id);
                  StorageInstace.setItem('agrigator:token', _data.token);
                  AnalyticsFunction.functionLogUpdate('kycUpdate', {..._data});
                  setToken(_data.token);
                  LoggerInstance.logEvent('Kyc Register', {..._data});
                  AppBottomTab.navigate();
                }
              }
            },
          },
        ],
      });
    } else if (!success) {
      showAlert({message: String(error)});
    }
  };
  return (
    <React.Fragment>
      <KeyboardBaseScreen
        scrollChildren={
          <View style={style.homeProfile}>
            <Stepper
              profileType={userDetails?.profileType}
              totalSteps={5}
              activeStep={4}
            />
            <View style={style.chooseProfile}>
              <AppText mode="header" style={style.textProfile}>
                {strings.kyc.tds}
              </AppText>
            </View>

            <View style={[style.space, gutter.marginTop.regular]}>
              <AppText style={style.space} mode="alternative">
                {strings.kyc.tds}
              </AppText>
              <TruckCount
                setTruckCount={setTruckCount}
                truckCount={truckCount}
                profileType={userDetails?.profileType}
              />
            </View>
            <View style={[layout.row, style.space, gutter.marginTop.regular]}>
              <CustomCheckbox
                isChecked={isChecked}
                onToggle={setIsChecked}
                profileType={userDetails?.profileType}
              />

              <AppText style={gutter.marginLeft.small} mode="description">
                {truckCount == strings.kyc.one
                  ? strings.kyc.term(
                      userDetails?.profileType,
                      userDetails?.owner_name,
                    )
                  : strings.kyc.term10(
                      userDetails?.profileType,
                      userDetails?.owner_name,
                    )}
              </AppText>
            </View>
          </View>
        }
      />
      {!isKeyboard && (
        <View style={style.buttonRow}>
          <AppButton
            buttonStyle={style.backButton}
            label={strings.back}
            onPress={() => RootNavigator.pop()}
            textColor={
              userDetails?.profileType === 'driver'
                ? color.driver
                : userDetails?.profileType === 'transporter'
                ? color.transporter
                : userDetails?.profileType === 'transporter'
                ? style.colors.buttonNew
                : style.colors.buttonNew
            }
          />
          <AppButton
            buttonStyle={style.nextButton}
            textColor={style.colors.white}
            label={strings.next}
            onPress={handleNext}
          />
        </View>
      )}
    </React.Fragment>
  );
};
UserKycTdsContainer.SCREEN_NAME = 'UserKycTdsContainer';
UserKycTdsContainer.navigationOptions = {
  headerShown: false,
};
UserKycTdsContainer.navigate = (data: any) => {
  RootNavigator.navigate(UserKycTdsContainer.SCREEN_NAME, {data});
};
export default UserKycTdsContainer;
