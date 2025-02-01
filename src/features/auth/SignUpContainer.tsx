import {KeyboardAvoidingView, ScrollView, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import RootNavigator, {navigationRef} from '@/libs/navigation/RootNavigation';
import {useSignInStyle} from './styles/useSignInStyle';
import Stepper from '@/components/Stepper';
import {AppText} from '@/components/AppText';
import strings from '@/util/Strings';
import {AppTextInput} from '@/components/AppTextInput';
import AppButton from '@/components/AppButton';
import MultiSelectDropdown from '@/components/MultiSelectDropdown';
import {
  getCities,
  getRCDetails,
  registerUser,
} from '@/redux/actions/AuthAction';
import {appDispatch, useAppSelector} from '@/redux/AppStore';
import {ActionSheetRef} from 'react-native-actions-sheet';
import {isEmptyObj, useToast} from 'native-base';
import DocumentPicker from 'react-native-document-picker';
import {CameraOptions, launchCamera} from 'react-native-image-picker';
import {showAlert} from '@/components/Alert';
import OptionsActionSheet from '../main/kyc/components/OptionsActionSheet';
import {useKeyboard} from '@/hooks/useKeyboard';
import AppTouchableOpacity from '@/components/AppTouchableOpacity';
import {useTheme} from '@/hooks/useTheme';
import {Image} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {rcNumberPattern, validateRegisterForm} from '@/util/UnknownOptionError';
import {RootNavigationParam} from '../base/interfaces/interfaces';
import {isObjectEmpty, setToken} from '@/libs';
import LoggerInstance from '@/libs/Logger';
import AnalyticsFunction from '@/libs/analytics/AnalyticsService';
import StorageInstace from '@/libs/storage/Storage';
import {
  addUserProfile,
  loginSuccess,
  setNavigateFrom,
} from '@/redux/reducers/authSlice';
import UserKycContainer from '../main/kyc/UserKycContainer';
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from 'react-native-google-places-autocomplete';
import DriverHomeContainer from '../main/driver/driver-home/screens/DriverHomeContainer';
import {isUndefined} from 'lodash';
import {useIsFocused} from '@react-navigation/native';
let timeout: any;
const SignUpContainer = ({route}: RootNavigationParam<any>) => {
  const {params} = route;
  const style = useSignInStyle(params?.profileType);
  const toast = useToast();
  const isKeyboard = useKeyboard();
  const {
    style: {layout, gutter, input},
    value: {color},
  } = useTheme();
  const [isFrontBackBtnShow, setIsFrontBackBtnShow] = useState<boolean>(false);
  const actionSheetRef2 = useRef<ActionSheetRef>(null);
  const googleRef = useRef<GooglePlacesAutocompleteRef>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const [isBtnEnable, setIsBtnEnable] = useState<boolean>(false);
  const [errors, setErrors] = useState<any>({selected: undefined});
  const [registerForm, setRegisterForm] = useState<any>({
    rcNumber: '',
    name: '',
    address: '',
    origin: [],
    destination: [],
    searchQuery: '',
    rcFront: undefined,
    rcBack: undefined,
    rcErrorResponse: undefined,
    isPhotoUpload: false,
    referral_code: '',
    latitude: '',
    longitude: '',
    companyName: '',
    driver_name: '',
    dlPhoto: undefined,
  });
  const [formValidate, setSubmitting] = useState({
    isSubmitting: false,
    error: undefined,
  });
  const [pictype, setPictype] = useState<string>('');
  const [originNames, setOriginNames] = useState<any>([]);
  const [destinationNames, setDestinationNames] = useState<any>([]);
  const cities = useAppSelector((state) => state.auth.cities);
  const handleChangeInput = (id: string, value: any) => {
    let _citiesNames: any[] = [];
    let _cities: any[] = [];
    if (id == 'searchQuery' && value.length >= 2) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      timeout = setTimeout(() => {
        getCities(value);
      }, 1000);
    }
    if (id == 'origin' || id == 'destination') {
      _citiesNames = cities
        .filter((ele) => value?.find((object: any) => ele?._id === object?._id))
        .map((ele) => ele?.name);
      _cities = _citiesNames.map((str) => str.split(',').shift());
      if (id == 'origin') {
        setOriginNames(_citiesNames.map((str) => str.split(',').shift()));
      } else {
        setDestinationNames([..._cities]);
      }
    }
    setErrors({
      ...errors,
      selected: id,
    });
    setRegisterForm({
      ...registerForm,
      [id]: value,
    });
  };
  function openCamera() {
    let option: CameraOptions = {
      mediaType: 'photo',
      maxWidth: 900,
      maxHeight: 900,
      quality: 0.8,
    };

    launchCamera(option, (res: any) => {
      actionSheetRef2.current?.hide();
      if (res.didCancel === true) {
      } else {
        if (res && res.assets && res.assets?.length > 0) {
          let tempType = res?.assets[0]?.type.split('/');
          if (tempType[0] === 'image') {
            let tempimage = {
              name: res?.assets[0]?.fileName,
              uri: res?.assets[0]?.uri,
              type: res?.assets[0]?.type,
            };
            if (pictype == 'front') {
              setRegisterForm({
                ...registerForm,
                rcFront: tempimage,
              });
            } else if (pictype == 'dl') {
              setRegisterForm({
                ...registerForm,
                dlPhoto: tempimage,
              });
            } else {
              setRegisterForm({
                ...registerForm,
                rcBack: tempimage,
              });
            }
          } else {
            showAlert({message: 'कृपया एक मान्य फ़ाइल प्रकार चुनें'});
          }
        }
      }
    });
  }

  const openDocument = async () => {
    actionSheetRef2.current?.hide();
    setTimeout(async () => {
      try {
        const res = await DocumentPicker.pick({
          type: [DocumentPicker.types.images],
        });
        if (
          res[0].type === 'image/jpeg' ||
          res[0].type === 'image/png' ||
          res[0].type === 'image/jpg'
        ) {
          if (pictype == 'front') {
            setRegisterForm({
              ...registerForm,
              rcFront: res,
            });
          } else if (pictype == 'dl') {
            setRegisterForm({
              ...registerForm,
              dlPhoto: res,
            });
          } else {
            setRegisterForm({
              ...registerForm,
              rcBack: res,
            });
          }
        } else {
          showAlert({message: 'कृपया एक मान्य फ़ाइल प्रकार चुनें'});
        }
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
          console.log('user cancelled upload >>', err);
        } else {
          console.log('error occured >>', err);
          throw err;
        }
      }
    }, 400);
  };
  const callBackForRc = (success: boolean, error?: string, rcData?: any) => {
    if (success) {
      const firstTwoChars = registerForm?.rcNumber.slice(0, 2).toLowerCase();
      let _rcCat = rcData?.vehicle_category || rcData?.rc_vch_catg;
      let _rcFuel = rcData?.vehicle_fuel_description || rcData?.rc_fuel_desc;
      if (
        _rcCat == 'HGV' ||
        _rcCat === 'MGV' ||
        _rcCat === 'HMV' ||
        _rcCat === 'HGMV' ||
        _rcCat === 'HTV' ||
        _rcCat === 'COMMERCIAL' ||
        _rcCat === 'LGV' ||
        (firstTwoChars.includes('ap') &&
          _rcCat === 'GCRT' &&
          _rcFuel === 'DIESEL')
      ) {
        setRegisterForm({
          ...registerForm,
          name: rcData?.user_name || rcData?.rc_owner_name,
          isPhotoUpload: false,
          rcErrorResponse: undefined,
          rcBack: undefined,
          rcFront: undefined,
        });

        setIsBtnEnable(true);
      } else {
        setRegisterForm({
          ...registerForm,
          name: '',
          isPhotoUpload: false,
          rcErrorResponse: undefined,
        });
        showAlert({
          message: String(strings.register.notRc),
        });
        setIsBtnEnable(false);
      }
    } else if (!success) {
      setRegisterForm({
        ...registerForm,
        rcErrorResponse: rcData,
        isPhotoUpload: true,
      });
      showAlert({message: String(error)});
    }
  };
  const handleRcSubmit = () => {
    if (
      registerForm?.rcNumber &&
      registerForm?.rcNumber.length >= 9 &&
      rcNumberPattern.test(registerForm?.rcNumber)
    ) {
      let data = {
        reg_no: registerForm?.rcNumber,
      };
      getRCDetails(data, callBackForRc);
    } else {
      toast.show({
        title: !rcNumberPattern.test(registerForm?.rcNumber)
          ? strings.rcError
          : 'Please enter RC number',
      });
    }
  };
  useEffect(() => {
    let {isValidForm, errors: _errors} = validateRegisterForm(
      registerForm,
      params?.profileType,
    );
    let currentError = _errors[errors?.selected];
    setSubmitting({isSubmitting: isValidForm, error: currentError});
  }, [errors]);
  const handleReLookUp = () => {
    setIsBtnEnable(false);
    setRegisterForm({
      ...registerForm,
      rcNumber: '',
      isPhotoUpload: false,
      rcFront: undefined,
      rcBack: undefined,
      name: '',
    });
  };
  useEffect(() => {
    getCurrentLocation();
  }, []);
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (pos) => {
        const crd = pos.coords;
        setRegisterForm({
          ...registerForm,
          latitude: crd?.latitude,
          longitude: crd?.longitude,
        });
      },
      (error) => {
        showAlert({message: error?.message});
      },
      {enableHighAccuracy: true},
    );
  };
  const handleSubmit = () => {
    let {isValidForm} = validateRegisterForm(registerForm, params?.profileType);
    if (isValidForm) {
      const formData: FormData = new FormData();
      formData.append('mobile_number', params?.mobileNumber);
      formData.append('profileType', params?.profileType);
      formData.append('number_of_trucks', '1');
      formData.append('rc_number', registerForm?.rcNumber);
      formData.append(
        params?.profileType == 'transporter' ? 'transporterName' : 'owner_name',
        registerForm?.name || '',
      );
      formData.append(
        'truck_owner_name',
        registerForm?.driver_name || registerForm?.name,
      );
      formData.append('driver_name', registerForm?.driver_name || '');
      formData.append('owner_number', params?.mobileNumber);
      formData.append('referral_code', registerForm?.referral_code || '');
      formData.append('latitude', registerForm?.latitude);
      formData.append('longitude', registerForm?.longitude);
      formData.append(
        params?.profileType == 'transporter'
          ? 'transporterLocality'
          : 'locality',
        registerForm?.address,
      );
      formData.append(
        'companyName',
        params?.profileType == 'transporter' ? registerForm?.companyName : '',
      );
      formData.append('origin', JSON.stringify(registerForm?.origin));
      formData.append('destination', JSON.stringify(registerForm?.destination));
      if (registerForm?.isPhotoUpload) {
        formData.append(
          'is_rc_data_unavailable',
          registerForm?.isPhotoUpload ? 'unavailable' : '',
        );
        formData.append(
          'rc_error_response',
          JSON.stringify(registerForm?.rcErrorResponse),
        );
        formData.append('type', 'failure');
        if (registerForm?.rcFront && !isObjectEmpty(registerForm?.rcFront)) {
          formData.append('file', {
            uri: registerForm?.rcFront?.uri
              ? registerForm?.rcFront?.uri
              : registerForm?.rcFront[0]?.uri,
            name: registerForm?.rcFront?.name
              ? registerForm?.rcFront.name
              : registerForm?.rcFront[0]?.name,
            type: registerForm?.rcFront?.type
              ? registerForm?.rcFront.type
              : registerForm?.rcFront[0]?.type,
          });
        }
        if (registerForm?.rcBack && !isObjectEmpty(registerForm?.rcBack)) {
          formData.append('file', {
            uri: registerForm?.rcBack?.uri
              ? registerForm?.rcBack?.uri
              : registerForm?.rcBack[0]?.uri,
            name: registerForm?.rcBack.name
              ? registerForm?.rcBack.name
              : registerForm?.rcBack[0]?.name,
            type: registerForm?.rcBack?.type
              ? registerForm?.rcBack.type
              : registerForm?.rcBack[0]?.type,
          });
        }
      } else {
        formData.append('type', 'success');
      }
      if (registerForm?.dlPhoto && !isObjectEmpty(registerForm?.dlPhoto)) {
        formData.append('file', {
          uri: registerForm?.dlPhoto?.uri
            ? registerForm?.dlPhoto?.uri
            : registerForm?.dlPhoto[0]?.uri,
          name: registerForm?.dlPhoto.name
            ? registerForm?.dlPhoto.name
            : registerForm?.dlPhoto[0]?.name,
          type: registerForm?.dlPhoto?.type
            ? registerForm?.dlPhoto.type
            : registerForm?.dlPhoto[0]?.type,
        });
      }
      registerUser(formData, callBackForRegister);
    } else {
      const message = `Please fill all required fields`;
      toast.show({title: message});
    }
  };
  const callBackForRegister = (
    success: boolean,
    error?: string,
    userData?: any,
  ) => {
    if (success) {
      setToken(userData.token);
      if (userData.deleted_by_admin === true) {
        showAlert({message: strings.deleteByAdmin});
      } else {
        if (userData?.user) {
          appDispatch(addUserProfile(userData?.user));
          appDispatch(loginSuccess(userData.token));
          StorageInstace.setItem('kyc_id', userData?.user[0]?.kyc_id || '');
          StorageInstace.setItem('user', JSON.stringify(userData?.user));
          StorageInstace.setItem('agrigator:token', userData.token);
          AnalyticsFunction.functionSetUserId(userData?.user?.user_id);
          AnalyticsFunction.functionLogUpdate('carreirRegister', {
            mobile_number: params?.mobileNumber,
            fullname: registerForm?.name,
            referral_code: registerForm?.referral_code,
          });
          LoggerInstance.registerUser(userData?.user?.user_id);
          if (params?.profileType === 'driver') {
            appDispatch(setNavigateFrom(false));
            navigationRef.current?.navigate(DriverHomeContainer.SCREEN_NAME);
            return;
          } else {
            navigationRef.current?.navigate(UserKycContainer.SCREEN_NAME);
          }
          appDispatch(setNavigateFrom(true));
          showAlert({message: error});
        } else {
        }
      }
    } else if (!success) {
      showAlert({message: String(error)});
    }
  };
  const onKeyPress = ({nativeEvent}: any) => {
    if (nativeEvent.key === 'Enter') {
      console.log('d');
      // submit code
    }
  };
  useEffect(() => {
    if (isKeyboard && googleRef.current?.isFocused()) {
      scrollViewRef?.current?.scrollTo({x: 300, animated: true});
    }
  }, [isKeyboard, googleRef]);
  return (
    <React.Fragment>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={-300}
        style={style.container}>
        <ScrollView keyboardShouldPersistTaps="handled" ref={scrollViewRef}>
          <React.Fragment>
            <View style={style.homeProfile}>
              <Stepper
                profileType={params?.profileType}
                totalSteps={5}
                activeStep={1}
              />
              <View style={[style.chooseProfile, style.registerBox]}>
                <AppText mode="header" style={style.textProfile}>
                  {strings.registration}
                </AppText>
              </View>
              {params?.profileType !== 'transporter' ? (
                <React.Fragment>
                  <View style={style.space}>
                    <AppTextInput
                      placeholderTextColor={style.colors.placeholder}
                      //@ts-ignore
                      textInputStyle={[style.textInput, style.registerInput]}
                      placeholder={`${strings.register.rc}`}
                      onChangeText={(text) =>
                        handleChangeInput('rcNumber', text)
                      }
                      value={registerForm?.rcNumber}
                      autoCapitalize="characters"
                      editable={!isBtnEnable}
                      textAlign="center"
                      multiline={true}
                      enablesReturnKeyAutomatically
                      returnKeyType="done"
                      onKeyPress={onKeyPress}
                      blurOnSubmit={true}
                    />
                  </View>
                  {registerForm?.rcNumber?.length > 6 && (
                    <View style={style.space}>
                      <AppButton
                        buttonStyle={[style.nextButton, {marginLeft: 0}]}
                        textColor={style.colors.white}
                        label={
                          isBtnEnable
                            ? `${strings.changeInRc}`
                            : `${strings.truck_rc_look} ${strings.look_up}`
                        }
                        onPress={isBtnEnable ? handleReLookUp : handleRcSubmit}
                      />
                    </View>
                  )}
                  {registerForm?.isPhotoUpload && (
                    <>
                      <AppTouchableOpacity
                        style={[style.nextButton, {marginLeft: 0}, style.space]}
                        onPress={() => {
                          setIsFrontBackBtnShow(!isFrontBackBtnShow);
                        }}
                        children={
                          <AppText
                            mode="alternative"
                            style={{
                              color: color.white,
                              ...layout.textAlignCenter,
                              ...gutter.padding.small,
                            }}>
                            {strings.register.rcFind}
                          </AppText>
                        }
                      />
                      {isFrontBackBtnShow && (
                        <View style={[layout.rowVerticalCenter, style.space]}>
                          <AppTouchableOpacity
                            style={[
                              style.uploadButton,
                              layout.fill,
                              gutter.marginRight.small,
                            ]}
                            onPress={() => {
                              setPictype('front');
                              actionSheetRef2.current?.show();
                            }}
                            children={
                              <React.Fragment>
                                {registerForm?.rcFront &&
                                !isEmptyObj(registerForm?.rcFront) &&
                                (registerForm?.rcFront?.uri ||
                                  registerForm?.rcFront[0]?.uri) ? (
                                  <View style={[layout.fill]}>
                                    <Image
                                      style={style.rcImage}
                                      source={
                                        registerForm?.rcFront?.uri
                                          ? {uri: registerForm?.rcFront?.uri}
                                          : {uri: registerForm?.rcFront[0]?.uri}
                                      }
                                    />
                                  </View>
                                ) : (
                                  <AppText
                                    mode="alternative"
                                    style={[
                                      {color: color.uploadText},
                                      gutter.padding.small,
                                    ]}>
                                    {strings.frontPhoto}
                                  </AppText>
                                )}
                              </React.Fragment>
                            }
                          />
                          <AppTouchableOpacity
                            style={[style.uploadButton, layout.fill]}
                            onPress={() => {
                              setPictype('back');
                              actionSheetRef2.current?.show();
                            }}
                            children={
                              <React.Fragment>
                                {registerForm?.rcBack &&
                                !isEmptyObj(registerForm?.rcBack) &&
                                (registerForm?.rcBack?.uri ||
                                  registerForm?.rcBack[0]?.uri) ? (
                                  <>
                                    <View style={layout.fill}>
                                      <Image
                                        style={style.rcImage}
                                        source={
                                          registerForm?.rcBack.uri
                                            ? {uri: registerForm?.rcBack?.uri}
                                            : {
                                                uri: registerForm?.rcBack[0]
                                                  ?.uri,
                                              }
                                        }
                                      />
                                    </View>
                                  </>
                                ) : (
                                  <AppText
                                    mode="alternative"
                                    style={[
                                      {color: color.uploadText},
                                      gutter.padding.small,
                                    ]}>
                                    {strings.backPhoto}
                                  </AppText>
                                )}
                              </React.Fragment>
                            }
                          />
                        </View>
                      )}
                    </>
                  )}
                </React.Fragment>
              ) : (
                <View style={style.space}>
                  <AppTextInput
                    placeholderTextColor={style.colors.placeholder}
                    //@ts-ignore
                    textInputStyle={[style.textInput, style.registerInput]}
                    placeholder={`${strings.register.companyName}`}
                    onChangeText={(text) =>
                      handleChangeInput('companyName', text)
                    }
                    value={registerForm?.companyName}
                    textAlign="center"
                    multiline={true}
                    enablesReturnKeyAutomatically
                    returnKeyType="done"
                    onKeyPress={onKeyPress}
                    blurOnSubmit={true}
                  />
                  {errors?.selected == 'companyName' && (
                    <AppText style={style.error}>{formValidate?.error}</AppText>
                  )}
                </View>
              )}
              <View style={style.space}>
                <AppTextInput
                  placeholderTextColor={style.colors.placeholder}
                  //@ts-ignore
                  textInputStyle={[style.textInput, style.registerInput]}
                  placeholder={`${strings.register.driver_Name} `}
                  onChangeText={(text) => handleChangeInput('name', text)}
                  value={registerForm?.name}
                  textAlign="center"
                  editable={!isBtnEnable}
                  multiline={true}
                  enablesReturnKeyAutomatically
                  returnKeyType="done"
                  onKeyPress={onKeyPress}
                  blurOnSubmit={true}
                />
                {errors?.selected == 'name' ? (
                  <AppText style={style.error}>{formValidate?.error}</AppText>
                ) : (
                  <AppText style={{display: 'none'}} />
                )}
              </View>
              {params?.profileType === 'driver' && (
                <View style={style.space}>
                  <AppTextInput
                    placeholderTextColor={style.colors.placeholder}
                    //@ts-ignore
                    textInputStyle={[style.textInput, style.registerInput]}
                    placeholder={`ट्रक ड्राइवर का नाम `.trim()}
                    onChangeText={(text) =>
                      handleChangeInput('driver_name', text)
                    }
                    value={registerForm?.driver_name}
                    textAlign="center"
                    multiline={true}
                    enablesReturnKeyAutomatically
                    returnKeyType="done"
                    onKeyPress={onKeyPress}
                    blurOnSubmit={true}
                  />
                  {errors?.selected == 'driver_name' && (
                    <AppText style={style.error}>{formValidate?.error}</AppText>
                  )}
                </View>
              )}
              <View style={style.space}>
                <GooglePlacesAutocomplete
                  ref={googleRef}
                  placeholder={strings.register.place}
                  onPress={(data, details = null) => {
                    handleChangeInput('address', data.description);
                    setErrors({
                      ...errors,
                      selected: undefined,
                    });
                  }}
                  keepResultsAfterBlur
                  keyboardShouldPersistTaps={'handled'}
                  fetchDetails={true}
                  minLength={2}
                  query={{
                    key: 'AIzaSyD7IPP_3U7QzRDkTylMF4atkWQPgLet74o',
                    language: 'en',
                    components: 'country:in',
                  }}
                  textInputProps={{
                    placeholderTextColor: color.placeholder,
                    textAlign: 'center',
                    multiline: false,
                    enablesReturnKeyAutomatically: true,
                    returnKeyType: 'done',
                    onKeyPress: onKeyPress,
                    blurOnSubmit: true,
                    onChangeText: (value) => {
                      if (
                        value.length <= 0 &&
                        googleRef.current &&
                        googleRef.current?.isFocused()
                      ) {
                        console.log(value);
                        setRegisterForm({
                          ...registerForm,
                          address: '',
                        });
                        setErrors({
                          ...errors,
                          selected: 'address',
                        });
                      }
                    },
                  }}
                  styles={{
                    textInput: [
                      input.textInput,
                      style.textInput,
                      style.registerInput,
                      {zIndex: 999},
                    ],
                    listView: {
                      elevation: 5,
                      backgroundColor: color.white,
                      shadowOpacity: 0.15,
                      shadowColor: '#000',
                      shadowOffset: {width: 0, height: 20},
                      shadowRadius: 8,
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10,
                      marginTop: -10,
                    },
                    description: {color: color.black},
                  }}
                  listViewDisplayed="auto"
                />
                {errors?.selected == 'address' && (
                  <AppText style={style.error}>
                    {formValidate?.error || 'Address is required'}
                  </AppText>
                )}
              </View>
              <View style={style.space}>
                <AppTextInput
                  placeholderTextColor={style.colors.placeholder}
                  //@ts-ignore
                  textInputStyle={[style.textInput, style.registerInput]}
                  placeholder={`${strings.referralCode}`}
                  onChangeText={(text) =>
                    handleChangeInput('referral_code', text)
                  }
                  value={registerForm?.referral_code}
                  textAlign="center"
                  autoCapitalize="characters"
                  multiline
                  enablesReturnKeyAutomatically
                  returnKeyType="done"
                  onKeyPress={onKeyPress}
                  blurOnSubmit={true}
                />
                {errors?.selected == 'referral_code' && (
                  <AppText style={style.error}>{formValidate?.error}</AppText>
                )}
              </View>
              {/* <View style={style.space}>
                {validateForm(registerForm, params?.profileType).length > 0 && (
                  <AppText mode="contact" style={style.error}>
                    {validateForm(
                      registerForm,
                      params?.profileType,
                    )?.toString()}
                  </AppText>
                )}
              </View> */}
              {params?.profileType === 'driver' && (
                <React.Fragment>
                  <AppText style={style.favRoute}>
                    {strings.register.dl}
                  </AppText>
                  <View style={style.space}>
                    <AppTouchableOpacity
                      style={[
                        style.uploadButton,
                        layout.fill,
                        gutter.marginRight.small,
                      ]}
                      onPress={() => {
                        setPictype('dl');
                        actionSheetRef2.current?.show();
                      }}
                      children={
                        <React.Fragment>
                          {registerForm?.dlPhoto &&
                          !isEmptyObj(registerForm?.dlPhoto) &&
                          (registerForm?.dlPhoto?.uri ||
                            registerForm?.dlPhoto[0]?.uri) ? (
                            <View style={[layout.fill]}>
                              <Image
                                style={style.rcImage}
                                source={
                                  registerForm?.dlPhoto?.uri
                                    ? {uri: registerForm?.dlPhoto?.uri}
                                    : {uri: registerForm?.dlPhoto[0]?.uri}
                                }
                              />
                            </View>
                          ) : (
                            <AppText
                              mode="alternative"
                              style={[
                                {color: color.uploadText},
                                gutter.padding.small,
                              ]}>
                              {strings.upload_document}
                            </AppText>
                          )}
                        </React.Fragment>
                      }
                    />
                  </View>
                </React.Fragment>
              )}
              <AppText style={style.favRoute}>
                {strings.register.favRoute}
              </AppText>
              <View style={style.space}>
                <MultiSelectDropdown
                  title="Origin:"
                  options={cities}
                  searchQuery={registerForm.searchQuery}
                  setSearchQuery={(text: string) =>
                    handleChangeInput('searchQuery', text)
                  }
                  selectedOptions={registerForm?.origin}
                  setSelectedOptions={(data: any) =>
                    handleChangeInput('origin', data)
                  }
                  color={
                    params?.profileType === 'driver'
                      ? color.driver
                      : params?.profileType === 'transporter'
                      ? color.transporter
                      : style.colors.buttonNew
                  }
                />
                {errors?.selected == 'origin' && (
                  <AppText style={style.error}>{formValidate?.error}</AppText>
                )}
              </View>
              <View style={style.space}>
                <MultiSelectDropdown
                  options={cities}
                  title="Destination:"
                  searchQuery={registerForm.searchQuery}
                  setSearchQuery={(text: string) =>
                    handleChangeInput('searchQuery', text)
                  }
                  selectedOptions={registerForm?.destination}
                  setSelectedOptions={(data: any) =>
                    handleChangeInput('destination', data)
                  }
                  cityNames={destinationNames?.toString()}
                  color={
                    params?.profileType === 'driver'
                      ? color.driver
                      : params?.profileType === 'transporter'
                      ? color.transporter
                      : style.colors.buttonNew
                  }
                />
                {errors?.selected == 'destination' && (
                  <AppText style={style.error}>{formValidate?.error}</AppText>
                )}
              </View>
            </View>
          </React.Fragment>
        </ScrollView>
      </KeyboardAvoidingView>
      {!isKeyboard && (
        <View style={style.buttonRow}>
          <AppButton
            buttonStyle={[
              style.nextButton,
              !validateRegisterForm(registerForm, params?.profileType)
                .isValidForm && style.disabled,
            ]}
            textColor={style.colors.white}
            label={strings.next}
            onPress={handleSubmit}
            isEnabled={
              validateRegisterForm(registerForm, params?.profileType)
                .isValidForm
            }
          />
        </View>
      )}
      <OptionsActionSheet
        ref={actionSheetRef2}
        openDocument={openDocument}
        openCamera={openCamera}
      />
    </React.Fragment>
  );
};

SignUpContainer.SCREEN_NAME = 'SignUpContainer';
SignUpContainer.navigationOptions = {
  headerShown: false,
};
SignUpContainer.navigate = (mobileNumber: string, profileType: string) => {
  RootNavigator.navigate(SignUpContainer.SCREEN_NAME, {
    mobileNumber,
    profileType,
  });
};
export default SignUpContainer;
