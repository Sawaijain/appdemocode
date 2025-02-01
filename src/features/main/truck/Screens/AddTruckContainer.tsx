import {showAlert} from '@/components/Alert';
import {useTheme} from '@/hooks/useTheme';
import RootNavigator, {navigationRef} from '@/libs/navigation/RootNavigation';
import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {useSelector} from 'react-redux';
import strings from '@/util/Strings';
import {AppText} from '@/components/AppText';
import {getRCDetails} from '@/redux/actions/AuthAction';
import {
  ChevronLeftIcon,
  SearchIcon,
  Select,
  isEmptyObj,
  useToast,
} from 'native-base';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import {CameraOptions, launchCamera} from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import {AppTextInput} from '@/components/AppTextInput';
import AppTouchableOpacity from '@/components/AppTouchableOpacity';
import AppButton from '@/components/AppButton';
import useShipperStyle from '@/libs/customStyles/ShipperStyle';
import {tyres} from '@/libs/Utils';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import {getMobileNo, isObjectEmpty} from '@/libs';
import {addTrucks, updateTruck} from '@/redux/actions/TruckAction';
import {RootState} from '@/redux/AppStore';
import TruckBaseScreen from '@/features/base/screens/TruckBaseScreen';
import {useSignInStyle} from '@/features/auth/styles/useSignInStyle';
import TruckContainer from './TruckContainer';
import {PHONE_REGEXP, rcNumberPattern} from '@/util/UnknownOptionError';
import {normalize} from '@/theme/Utils';
import {AddCircleIcon, BackIcon, CloseIcon} from '@/components/icons/Icon';
import GooglePlaceInput from '@/components/GoogleInput';
import {useInventoryStyle} from '../../Inventory/Styles/useInventoryStyle';
import {GooglePlacesAutocompleteRef} from 'react-native-google-places-autocomplete';
interface AddTruckContainerProps {}

const AddTruckContainer = (props: AddTruckContainerProps) => {
  const {userDetails} = useSelector((state: RootState) => state.auth);
  const {
    route: {params},
  }: any = props;

  const toast = useToast();
  const style = useShipperStyle();
  const actionSheetRef2 = useRef<ActionSheetRef>(null);
  const {
    mobile_number,
    userDetails: {user_id, profileType},
  } = useSelector((state: RootState) => state.auth);
  const signInStyle = useSignInStyle(profileType);
  const {
    style: {layout, gutter, input},
    value: {color, fontSize},
  } = useTheme();
  const styles = useTruckStyle();
  const [noOfTyres, setNoOfTyres] = useState<string>('');
  const [rcNumber, setRcNumber] = useState<string>('');
  const [isBtnEnable, setIsBtnEnable] = useState<boolean>(false);
  const [isFrontBackBtnShow, setIsFrontBackBtnShow] = useState<boolean>(false);
  const [isPhotoUpload, setIsPhotoUpload] = useState<boolean>(false);
  const [pictype, setPictype] = useState<string>('');
  const [isRcFront, setIsRcFront] = useState<any>();
  const [isRcBack, setIsRcBack] = useState<any>();
  const [rcErrorResponse, setRcErrorResponse] = useState<any>();
  const [carrierName, setCarrierName] = useState<string>('');
  const [rcRespones, setRcResponse] = useState<any>({});
  const [isOwnTruck, setIsOwnTruck] = useState<boolean>(false);
  const [ownerMobileNumber, setOwnerMobileNumber] = useState<string>('');
  const [origin, setOrigin] = useState<any>(null);
  const originRef = useRef<GooglePlacesAutocompleteRef>(null);
  const destinationRef = useRef<GooglePlacesAutocompleteRef>(null);
  const [destination, setDestination] = useState<any>(null);
  const styleGoogle = useInventoryStyle();
  useEffect(() => {
    if (params && params.isEdit && params.item) {
      setRcNumber(params.item?.rc_number);
      setCarrierName(params.item?.owner_name);
      setNoOfTyres(params.item?.no_of_tyres);
      setOwnerMobileNumber(getMobileNo(params.item?.owner_number));
      setIsBtnEnable(true);
      setRcErrorResponse(params?.item?.rc_error_response);
      setIsOwnTruck(
        `91${getMobileNo(mobile_number)}` ==
          `91${getMobileNo(params.item?.owner_number)}`,
      );

      // originRef.current?.setAddressText(params.item?.origin?.name);
      // destinationRef.current?.setAddressText(params.item?.destination?.name);
    } else {
      setOwnerMobileNumber(getMobileNo(mobile_number));
    }
  }, [params]);
  const callBackForRc = (success: boolean, error?: string, rcData?: any) => {
    if (success) {
      const firstTwoChars = rcNumber.slice(0, 2).toLowerCase();
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
        setIsPhotoUpload(false);
        setRcResponse(rcData);
        setCarrierName(rcData.user_name);
        setIsBtnEnable(true);
        toast.show({title: 'RC नम्बर खोज लिए गए है |'});
      } else {
        showAlert({
          message: String(
            'कृपया एक मान्य RC दर्ज करें यह RC ट्रक की नहीं हैं ||',
          ),
        });
      }
    } else if (!success) {
      setRcErrorResponse(rcData);
      showAlert({message: String(error)});
      setIsPhotoUpload(true);
    }
  };
  const handleRcSubmit = () => {
    setCarrierName('');
    if (rcNumber && rcNumber.length >= 9 && rcNumberPattern.test(rcNumber)) {
      let data = {
        reg_no: rcNumber,
      };
      getRCDetails(data, callBackForRc);
    } else {
      toast.show({title: strings.rcError});
    }
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
              setIsRcFront(tempimage);
            } else {
              setIsRcBack(tempimage);
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
            setIsRcFront(res);
          } else {
            setIsRcBack(res);
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
  const callBack = (success: boolean, message?: string) => {
    if (success) {
      showAlert({message: message});
      TruckContainer.navigate();
      navigationRef.current?.goBack();
    } else if (!success) {
      showAlert({message: message});
      showAlert({message: '', buttons: [{title: 'Okay', onPress: () => {}}]});
    }
  };
  const handleSubmit = () => {
    if (
      !isOwnTruck &&
      `91${getMobileNo(mobile_number)}` == `91${getMobileNo(ownerMobileNumber)}`
    ) {
      toast.show({
        title: 'दर्ज किया गया संपर्क नंबर लॉगिन नंबर के समान नहीं हो सकता',
      });
      return;
    }
    if (
      rcNumber &&
      noOfTyres &&
      ownerMobileNumber &&
      PHONE_REGEXP.test(ownerMobileNumber) &&
      carrierName
    ) {
      const formData: FormData = new FormData();
      formData.append('mobile_number', mobile_number);
      formData.append(
        'owner_number',
        isOwnTruck ? mobile_number : `91${ownerMobileNumber}`,
      );
      formData.append(
        'truck_number',
        rcRespones?.rc_registration_number || rcNumber,
      );
      formData.append('rc_number', rcNumber);
      formData.append('owner_name', carrierName || '');
      formData.append('no_of_tyres', noOfTyres);
      formData.append('profileType', profileType);
      formData.append('rc_details', JSON.stringify(rcRespones) || '{}');
      // formData.append('origin', JSON.stringify(origin) || '{}');
      // formData.append('destination', JSON.stringify(destination) || '{}');
      if (isPhotoUpload) {
        formData.append(
          'is_rc_data_unavailable',
          isPhotoUpload ? 'unavailable' : '',
        );
        formData.append(
          'rc_error_response',
          JSON.stringify(rcErrorResponse) || '{}',
        );
        formData.append('type', 'failure');
        if (isRcFront && !isObjectEmpty(isRcFront)) {
          formData.append('file', {
            uri: isRcFront?.uri ? isRcFront?.uri : isRcFront[0]?.uri,
            name: isRcFront?.name ? isRcFront.name : isRcFront[0]?.name,
            type: isRcFront?.type ? isRcFront.type : isRcFront[0]?.type,
          });
        }
        if (isRcBack && !isObjectEmpty(isRcBack)) {
          formData.append('file', {
            uri: isRcBack?.uri ? isRcBack?.uri : isRcBack[0]?.uri,
            name: isRcBack.name ? isRcBack.name : isRcBack[0]?.name,
            type: isRcBack?.type ? isRcBack.type : isRcBack[0]?.type,
          });
        }
      } else {
        formData.append('type', 'success');
      }
      if (params && params.isEdit) {
        formData.append('user_id', user_id);
        formData.append('vehicle_id', params.item?.vehicle_id);
        updateTruck(formData, callBack);
      } else {
        addTrucks(formData, callBack);
      }
    } else {
      toast.show({
        title: !PHONE_REGEXP.test(ownerMobileNumber)
          ? strings.owner_contact_number_error
          : strings.submitError,
      });
    }
  };
  const isDisabled = () => {
    if (
      params &&
      params.isEdit &&
      noOfTyres &&
      rcNumber &&
      carrierName &&
      ownerMobileNumber
    ) {
      return true;
    } else {
      if (
        (noOfTyres &&
          rcNumber &&
          carrierName &&
          ownerMobileNumber &&
          !isObjectEmpty(rcRespones)) ||
        (isPhotoUpload &&
          isRcFront &&
          !isObjectEmpty(isRcFront) &&
          isRcBack &&
          !isObjectEmpty(isRcBack))
      ) {
        return true;
      } else {
        return false;
      }
    }
  };
  return (
    <React.Fragment>
      <TruckBaseScreen
        profileType={userDetails?.profileType}
        scrollChildren={
          <React.Fragment>
            <View
              style={[
                layout.rowVerticalCenter,
                gutter.paddingHorizontal.regular,
                gutter.paddingVertical.regular,
                gutter.gap.regular,
                {borderBottomWidth: 2, borderBottomColor: color.borderColor},
              ]}>
              <AppTouchableOpacity
                style={[
                  styles.arrowIcon,
                  {
                    backgroundColor:
                      userDetails?.profileType == 'transporter'
                        ? color.transporter
                        : color.buttonNew,
                  },
                ]}
                onPress={() => navigationRef.current?.goBack()}
                children={
                  <BackIcon color={color.white} size={fontSize.medium} />
                }
              />
              <AppText style={[layout.fill]} mode="defaultBold">
                {strings.add_truck}
              </AppText>
            </View>

            <View
              style={[
                gutter.marginHorizontal.large,
                gutter.marginVertical.small,
                gutter.marginTop.normal,
              ]}>
              <View>
                <AppText style={gutter.marginBottom.regular} mode="defaultBold">
                  {strings.truck_rc}
                </AppText>
                <View
                  style={[
                    gutter.marginBottom.regular,
                    layout.rowVerticalCenter,
                  ]}>
                  <View style={layout.fill}>
                    <AppTextInput
                      placeholder={strings.truck_rc}
                      placeholderTextColor="black"
                      value={rcNumber.trim().toUpperCase()}
                      onChangeText={(text: React.SetStateAction<string>) =>
                        setRcNumber(text)
                      }
                      autoCapitalize={'characters'}
                      editable={!isBtnEnable}
                      fillParent={true}
                      //@ts-ignore
                      textInputStyle={{backgroundColor: color.gray50}}
                    />
                  </View>
                  <AppTouchableOpacity
                    onPress={() => {
                      if (isBtnEnable) {
                        setIsBtnEnable(false);
                        setRcNumber('');
                        setRcResponse({});
                        setCarrierName('');
                      } else {
                        handleRcSubmit();
                      }
                    }}
                    style={[
                      styles.buttonStyle,
                      {
                        backgroundColor:
                          userDetails?.profileType == 'transporter'
                            ? color.transporter
                            : color.buttonNew,
                      },
                    ]}
                    children={
                      isBtnEnable ? (
                        <CloseIcon color={color.white} size={15} />
                      ) : (
                        <SearchIcon color={color.white} size={15} />
                      )
                    }
                    disabled={isBtnEnable}
                  />
                </View>
                {/* {rcNumber?.length > 6 && (
                  <View style={gutter.marginBottom.regular}>
                    {isBtnEnable ? (
                      <AppButton
                        buttonStyle={[signInStyle.nextButton, {marginLeft: 0}]}
                        onPress={() => {
                          setIsBtnEnable(false);
                          setRcNumber('');
                          setRcResponse({});
                          setCarrierName('');
                        }}
                        textColor={color.white}
                        label={strings.changeInRc}
                      />
                    ) : (
                      <AppButton
                        buttonStyle={[signInStyle.nextButton, {marginLeft: 0}]}
                        onPress={handleRcSubmit}
                        textColor={color.white}
                        label={strings.truck_rc_look + ' ' + strings.look_up}
                      />
                    )}
                  </View>
                )} */}
                {isPhotoUpload && (
                  <>
                    <AppTouchableOpacity
                      style={[
                        signInStyle.backButton,
                        {marginLeft: 0},
                        signInStyle.space,
                      ]}
                      onPress={() => {
                        setIsFrontBackBtnShow(true);
                      }}
                      children={
                        <AppText
                          mode="alternative"
                          style={{
                            color:
                              userDetails?.profileType === 'driver'
                                ? color.driver
                                : userDetails?.profileType === 'transporter'
                                ? color.transporter
                                : color.buttonNew,
                            ...layout.textAlignCenter,
                            ...gutter.padding.small,
                          }}>
                          {'आरसी अपलोड करे '}
                        </AppText>
                      }
                    />
                    {isFrontBackBtnShow && (
                      <View
                        style={[
                          layout.rowVerticalCenter,
                          signInStyle.space,
                          gutter.gap.regular,
                        ]}>
                        <AppTouchableOpacity
                          style={[
                            signInStyle.uploadButton,
                            layout.fill,

                            {
                              borderColor: color.white,
                              backgroundColor: color.white,
                              elevation: 3,
                            },
                          ]}
                          onPress={() => {
                            setPictype('front');
                            actionSheetRef2.current?.show();
                          }}
                          children={
                            <React.Fragment>
                              {isRcFront &&
                              !isEmptyObj(isRcFront) &&
                              (isRcFront?.uri || isRcFront[0]?.uri) ? (
                                <View style={[layout.fill]}>
                                  <Image
                                    style={style.rcImage}
                                    source={
                                      isRcFront?.uri
                                        ? {uri: isRcFront?.uri}
                                        : {uri: isRcFront[0]?.uri}
                                    }
                                  />
                                </View>
                              ) : (
                                <View style={[layout.columnCenter]}>
                                  <AddCircleIcon color="#BCBCBC" size={20} />
                                  <AppText
                                    mode="alternative"
                                    style={[
                                      {color: color.uploadText},
                                      gutter.padding.small,
                                    ]}>
                                    {strings.frontPhoto}
                                  </AppText>
                                </View>
                              )}
                            </React.Fragment>
                          }
                        />
                        <AppTouchableOpacity
                          style={[
                            signInStyle.uploadButton,
                            layout.fill,
                            {
                              borderColor: color.white,
                              backgroundColor: color.white,
                              elevation: 3,
                            },
                          ]}
                          onPress={() => {
                            setPictype('back');
                            actionSheetRef2.current?.show();
                          }}
                          children={
                            <React.Fragment>
                              {isRcBack &&
                              !isEmptyObj(isRcBack) &&
                              (isRcBack?.uri || isRcBack[0]?.uri) ? (
                                <>
                                  <View style={layout.fill}>
                                    <Image
                                      style={style.rcImage}
                                      source={
                                        isRcBack.uri
                                          ? {uri: isRcBack?.uri}
                                          : {uri: isRcBack[0]?.uri}
                                      }
                                    />
                                  </View>
                                </>
                              ) : (
                                <View style={[layout.columnCenter]}>
                                  <AddCircleIcon color="#BCBCBC" size={20} />
                                  <AppText
                                    mode="alternative"
                                    style={[
                                      {color: color.uploadText},
                                      gutter.padding.small,
                                    ]}>
                                    {strings.backPhoto}
                                  </AppText>
                                </View>
                              )}
                            </React.Fragment>
                          }
                        />
                      </View>
                    )}
                  </>
                )}
                <View style={gutter.marginBottom.regular}>
                  <AppText
                    style={gutter.marginBottom.regular}
                    mode="defaultBold">
                    {strings.TruckNumber}
                  </AppText>
                  <Select
                    backgroundColor={color.gray50}
                    borderRadius={8}
                    size={'0.5'}
                    selectedValue={noOfTyres}
                    onValueChange={(itemValue) => {
                      setNoOfTyres(itemValue);
                    }}>
                    {tyres.map((item, i) => (
                      <Select.Item
                        key={i}
                        label={item.label}
                        value={item.value}
                      />
                    ))}
                  </Select>
                </View>

                <View>
                  <AppText
                    style={gutter.marginBottom.regular}
                    mode="defaultBold">
                    {strings.owner_name}
                  </AppText>

                  <View style={gutter.marginBottom.regular}>
                    <AppTextInput
                      placeholder={strings.owner_name}
                      placeholderTextColor="black"
                      value={carrierName}
                      onChangeText={(text: React.SetStateAction<string>) =>
                        setCarrierName(text)
                      }
                      fillParent={false}
                      //@ts-ignore
                      textInputStyle={{backgroundColor: color.gray50}}
                    />
                  </View>
                </View>
                {/* <AppText style={gutter.marginBottom.regular} mode="defaultBold">
                  {strings.inventory.inventoryPlaceholderOrigin}
                </AppText>
                <View style={styleGoogle.origin}>
                  <GooglePlaceInput
                    onTapPlace={(text, location) => {
                      setOrigin({
                        name: text,
                        latitude: location?.lat,
                        longitude: location?.lng,
                      });
                      originRef.current?.setAddressText(text);
                    }}
                    style={styles.inventoryInput}
                    value={
                      origin?.name ||
                      strings.inventory.inventoryPlaceholderOrigin
                    }
                    ref={originRef}
                    placeholder={strings.inventory.inventoryPlaceholderOrigin}
                  />
                </View>
                <AppText style={gutter.marginBottom.regular} mode="defaultBold">
                  {strings.inventory.inventoryPlaceholderDestination}
                </AppText>
                <View style={[styleGoogle.origin]}>
                  <View
                    style={[
                      {
                        backgroundColor:
                          userDetails?.profileType == 'transporter'
                            ? color.transporter
                            : color.buttonNew,
                      },
                    ]}
                  />
                  <GooglePlaceInput
                    ref={destinationRef}
                    onTapPlace={(text, location) => {
                      setDestination({
                        name: text,
                        latitude: location?.lat,
                        longitude: location?.lng,
                      });
                      destinationRef.current?.setAddressText(text);
                    }}
                    style={styles.inventoryInput}
                    value={
                      destination?.name ||
                      strings.inventory.inventoryPlaceholderDestination
                    }
                    placeholder={
                      strings.inventory.inventoryPlaceholderDestination
                    }
                  />
                </View> */}

                {!isOwnTruck && (
                  <View style={gutter.marginVertical.regular}>
                    <AppText
                      style={gutter.marginBottom.regular}
                      mode="defaultBold">
                      {strings.owner_contact_number}
                    </AppText>
                    <View style={gutter.marginBottom.regular}>
                      <AppTextInput
                        placeholder={strings.owner_contact_number}
                        placeholderTextColor="black"
                        value={ownerMobileNumber.trim().toUpperCase()}
                        onChangeText={(text: React.SetStateAction<string>) =>
                          setOwnerMobileNumber(text)
                        }
                        autoCapitalize={'characters'}
                        fillParent={false}
                        maxLength={10}
                        keyboardType="number-pad"
                        //@ts-ignore
                        textInputStyle={{backgroundColor: color.gray50}}
                      />
                    </View>
                  </View>
                )}
                <View
                  style={[
                    gutter.marginBottom.regular,
                    layout.rowVerticalCenter,
                    gutter.marginTop.small,
                  ]}>
                  <AppTouchableOpacity
                    onPress={() => setIsOwnTruck(!isOwnTruck)}
                    children={
                      <IconMat
                        size={30}
                        color={
                          userDetails?.profileType == 'transporter'
                            ? color.transporter
                            : color.buttonNew
                        }
                        name={
                          isOwnTruck ? 'check-box' : 'check-box-outline-blank'
                        }
                      />
                    }
                  />
                  <AppText style={gutter.marginLeft.regular} mode="defaultBold">
                    {strings.ownTruck}
                  </AppText>
                </View>
                <View style={gutter.marginVertical.large}>
                  <AppButton
                    onPress={() => handleSubmit()}
                    label={strings.submit}
                    textColor={color.white}
                    buttonStyle={[
                      signInStyle.nextButton,
                      !isDisabled() && signInStyle.disabled,
                      {marginLeft: 0},
                    ]}
                    isEnabled={isDisabled()}
                  />
                </View>
              </View>
            </View>
          </React.Fragment>
        }
      />
      <ActionSheet ref={actionSheetRef2}>
        <View style={{paddingVertical: 50, backgroundColor: '#000'}}>
          <AppTouchableOpacity
            onPress={() => openDocument()}
            style={gutter.marginBottom.regular}
            children={
              <AppText
                style={[
                  input.textInput,
                  {
                    textAlignVertical: 'center',
                    color: color.white,
                    borderColor: color.black,
                    borderWidth: 0,
                  },
                  gutter.paddingLeft.small,
                  layout.textAlignCenter,
                ]}>
                {strings.upload_from_gallery}
              </AppText>
            }
          />
          <AppTouchableOpacity
            onPress={() => openCamera()}
            style={gutter.marginBottom.regular}
            children={
              <AppText
                style={[
                  input.textInput,
                  {
                    textAlignVertical: 'center',
                    color: color.white,
                    borderColor: color.black,
                    borderWidth: 0,
                  },
                  gutter.paddingLeft.small,
                  layout.textAlignCenter,
                ]}>
                {strings.open_camera}
              </AppText>
            }
          />
        </View>
      </ActionSheet>
    </React.Fragment>
  );
};
AddTruckContainer.SCREEN_NAME = 'AddTruckContainer';
AddTruckContainer.navigate = () => {
  RootNavigator.navigate(AddTruckContainer.SCREEN_NAME);
};
export default AddTruckContainer;
export function useTruckStyle() {
  const {
    value,
    style: {layout, gutter},
  } = useTheme();
  return StyleSheet.create({
    buttonStyle: {
      backgroundColor: value.color.buttonNew,
      marginLeft: normalize(10),
      paddingVertical: normalize(14),
      paddingHorizontal: normalize(15),
      borderRadius: 8,
    },
    arrowIcon: {
      height: 40,
      width: 40,
      backgroundColor: value.color.buttonNew,
      borderRadius: 20,
      ...layout.center,
      ...layout.fill,
      maxWidth: 40,
    },
    origin: {
      position: 'relative',
    },
    inventoryInput: {
      borderWidth: normalize(1),
      borderColor: value.color.driverBorder,
      fontSize: normalize(22),
      ...gutter.marginBottom.small,
      backgroundColor: value.color.gray50,
      borderRadius: 10,
      ...gutter.marginBottom.normal,
    },
  });
}
