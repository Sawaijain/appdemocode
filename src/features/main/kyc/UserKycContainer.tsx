import {TouchableOpacity, View} from 'react-native';
import React, {useRef, useState} from 'react';
import RootNavigator from '@/libs/navigation/RootNavigation';
import {useSignInStyle} from '@/features/auth/styles/useSignInStyle';
import KeyboardBaseScreen from '@/features/base/screens/KeyboardBaseScreen';
import Stepper from '@/components/Stepper';
import {AppText} from '@/components/AppText';
import strings from '@/util/Strings';
import {ActionSheetRef} from 'react-native-actions-sheet';
import AppTouchableOpacity from '@/components/AppTouchableOpacity';
import {useTheme} from '@/hooks/useTheme';
import {ChevronIcon} from '@/components/icons/Icon';
import CustomActionSheet from './components/CustomActionSheet';
import OptionsActionSheet from './components/OptionsActionSheet';
import DocumentPicker from 'react-native-document-picker';
import {CameraOptions, launchCamera} from 'react-native-image-picker';
import {showAlert} from '@/components/Alert';
import {isEmptyObj, useToast} from 'native-base';
import AppButton from '@/components/AppButton';
import {RootState, appDispatch} from '@/redux/AppStore';
import {useSelector} from 'react-redux';
import UserKycPaymentContainer from './UserKycPaymentContainer';
import {Image} from 'react-native';
import AppBottomTab from '@/navigation/AppBottomTab';
import {setNavigateFrom} from '@/redux/reducers/authSlice';
const addressProofTypes = [
  strings.aadhar,
  strings.voter_id,
  strings.electricity_bill,
];
const UserKycContainer = () => {
  const toast = useToast();

  const {
    style: {layout, gutter, input},
    value: {color},
  } = useTheme();
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const actionSheetRef2 = useRef<ActionSheetRef>(null);
  const [addressFront, setAddressFront] = useState<any>();
  const [addressBack, setAddressBack] = useState<any>();
  const [visitingCard, setVisitingCard] = useState<any>(undefined);
  const [addressProofType, setAddressProofType] = useState(strings.aadhar);
  const [picType, setPicType] = useState('');
  const {userDetails, kycDetails} = useSelector(
    (state: RootState) => state.auth,
  );
  const style = useSignInStyle(userDetails?.profileType);
  function openCamera() {
    let option: CameraOptions = {
      mediaType: 'photo',
      quality: 0.9,
      maxWidth: 1200,
      maxHeight: 1200,
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
            if (picType == 'front') {
              setAddressFront(tempimage);
              toast.show({title: `${strings.frontPhoto} अपलोड हो गयी है`});
            } else if (picType == 'visting') {
              setVisitingCard(tempimage);
              toast.show({title: `${strings.backPhoto} अपलोड हो गयी है`});
            } else {
              setAddressBack(tempimage);
              toast.show({title: `${strings.backPhoto} अपलोड हो गयी है`});
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
          if (picType == 'front') {
            setAddressFront(res);
            toast.show({title: `${strings.frontPhoto} अपलोड हो गयी है`});
          } else if (picType == 'visting') {
            setVisitingCard(res);
            toast.show({title: `${strings.backPhoto} अपलोड हो गयी है`});
          } else {
            setAddressBack(res);
            toast.show({title: `${strings.backPhoto} अपलोड हो गयी है`});
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
  const handleFrontUpload = () => {
    if (kycDetails?.address_proof_photo) {
      showAlert({
        message:
          'आपका पता प्रमाण पहले ही जमा किया जा चुका है। क्या आप इसे बदलना चाहते हैं?',
        buttons: [
          {
            title: 'पुन: अपलोड',
            onPress: () => {
              setPicType('front');
              actionSheetRef.current?.hide();
              actionSheetRef2.current?.show();
            },
          },
          {
            title: 'दस्तावेज देखे',
            onPress: () => {
              // getImage(kycDetails?.address_proof_photo);
              // setIsModalVisible(true);
            },
          },
        ],
      });
    } else {
      setPicType('front');
      actionSheetRef.current?.hide();
      actionSheetRef2.current?.show();
    }
  };
  const handleBackUpload = () => {
    if (kycDetails?.address_proof_photo_back) {
      showAlert({
        message:
          'आपका पता प्रमाण पहले ही जमा किया जा चुका है। क्या आप इसे बदलना चाहते हैं?',
        buttons: [
          {
            title: 'पुन: अपलोड',
            onPress: () => {
              setPicType('back');
              actionSheetRef.current?.hide();
              actionSheetRef2.current?.show();
            },
          },
          {
            title: 'दस्तावेज देखे',
            onPress: () => {
              // getImage(kycDetails?.address_proof_photo_back);
              // setIsModalVisible(true);
            },
          },
        ],
      });
    } else {
      setPicType('back');
      actionSheetRef.current?.hide();
      actionSheetRef2.current?.show();
    }
  };
  const handleNext = () => {
    if (addressProofType !== strings.electricity_bill) {
      if (userDetails?.profileType === 'transporter') {
        if (addressFront && addressBack && visitingCard) {
          const _data = {
            addressFront,
            addressBack,
            visitingCard,
            addressProofType,
          };
          UserKycPaymentContainer.navigate(_data);
        } else {
          const message = strings.upload_document;
          toast.show({title: message});
        }
      } else {
        if (addressFront && addressBack) {
          const _data = {addressFront, addressBack, addressProofType};
          UserKycPaymentContainer.navigate(_data);
        } else {
          const message = strings.upload_document;
          toast.show({title: message});
        }
      }
    } else {
      if (userDetails?.profileType !== 'transporter') {
        if (addressFront) {
          const _data = {addressFront, addressProofType};
          UserKycPaymentContainer.navigate(_data);
        } else {
          const message = strings.upload_document;
          toast.show({title: message});
        }
      } else {
        if (addressFront && visitingCard) {
          const _data = {addressFront, visitingCard, addressProofType};
          UserKycPaymentContainer.navigate(_data);
        } else {
          const message = strings.upload_document;
          toast.show({title: message});
        }
      }
    }
  };
  const isButtonDisabled =
    (addressProofType !== strings.electricity_bill &&
      userDetails?.profileType === 'transporter' &&
      !(addressFront && addressBack && visitingCard)) ||
    (addressProofType !== strings.electricity_bill &&
      userDetails?.profileType !== 'transporter' &&
      !(addressFront && addressBack)) ||
    (addressProofType === strings.electricity_bill &&
      userDetails?.profileType !== 'transporter' &&
      !addressFront) ||
    (addressProofType === strings.electricity_bill &&
      userDetails?.profileType === 'transporter' &&
      !(addressFront && visitingCard));

  return (
    <React.Fragment>
      <KeyboardBaseScreen
        scrollChildren={
          <View style={style.homeProfile}>
            <Stepper
              profileType={userDetails?.profileType}
              totalSteps={5}
              activeStep={2}
            />
            <View style={style.chooseProfile}>
              <AppText mode="header" style={style.textProfile}>
                {strings.kyc.doKyc}
              </AppText>
              <AppText mode="description" style={style.textProfile}>
                {strings.kyc.note}
              </AppText>
            </View>
            <View style={style.space}>
              <AppText mode="description">{`${strings.same_as_rc}`}</AppText>
              <AppTouchableOpacity
                onPress={() => actionSheetRef.current?.show()}
                activeOpacity={0.5}
                style={[
                  input.textInput,
                  layout.rowVerticalCenter,
                  layout.scrollSpaceBetween,
                  gutter.paddingHorizontal.small,
                  gutter.marginBottom.large,
                  gutter.marginTop.small,
                ]}
                children={
                  <React.Fragment>
                    <AppText>{addressProofType}</AppText>
                    <ChevronIcon
                      direction="down"
                      size={15}
                      color={color.black}
                    />
                  </React.Fragment>
                }
              />
              {addressProofType === strings.aadhar ||
              addressProofType == strings.voter_id ? (
                <View style={[layout.rowCenter]}>
                  <React.Fragment>
                    {addressFront &&
                    !isEmptyObj(addressFront) &&
                    (addressFront?.uri || addressFront[0]?.uri) ? (
                      <TouchableOpacity
                        onPress={handleFrontUpload}
                        style={[style.uploadButton]}>
                        <View style={[layout.fill]}>
                          <Image
                            style={style.rcImage}
                            source={
                              addressFront?.uri
                                ? {uri: addressFront?.uri}
                                : {uri: addressFront[0]?.uri}
                            }
                          />
                        </View>
                      </TouchableOpacity>
                    ) : (
                      <AppButton
                        onPress={handleFrontUpload}
                        textColor={color.uploadText}
                        label={strings.frontPhoto}
                        buttonStyle={style.uploadButton}
                      />
                    )}
                    {addressBack &&
                    !isEmptyObj(addressBack) &&
                    (addressBack?.uri || addressBack[0]?.uri) ? (
                      <TouchableOpacity
                        onPress={handleBackUpload}
                        style={[style.uploadButton, gutter.marginLeft.small]}>
                        <View style={[layout.fill]}>
                          <Image
                            style={style.rcImage}
                            source={
                              addressBack?.uri
                                ? {uri: addressBack?.uri}
                                : {uri: addressBack[0]?.uri}
                            }
                          />
                        </View>
                      </TouchableOpacity>
                    ) : (
                      <AppButton
                        onPress={handleBackUpload}
                        textColor={color.uploadText}
                        label={strings.backPhoto}
                        buttonStyle={[
                          style.uploadButton,
                          gutter.marginLeft.small,
                        ]}
                      />
                    )}
                  </React.Fragment>
                </View>
              ) : (
                <React.Fragment>
                  {addressFront &&
                  !isEmptyObj(addressFront) &&
                  (addressFront?.uri || addressFront[0]?.uri) ? (
                    <View style={[style.uploadButton]}>
                      <View style={[layout.fill]}>
                        <Image
                          style={style.rcImage}
                          source={
                            addressFront?.uri
                              ? {uri: addressFront?.uri}
                              : {uri: addressFront[0]?.uri}
                          }
                        />
                      </View>
                    </View>
                  ) : (
                    <AppButton
                      onPress={() => {
                        actionSheetRef.current?.hide();
                        actionSheetRef2.current?.show();
                        setPicType('front');
                      }}
                      buttonStyle={style.uploadButton}
                      textColor={color.uploadText}
                      label={strings.upload_document}
                    />
                  )}
                </React.Fragment>
              )}
            </View>
            {userDetails?.profileType == 'transporter' && (
              <View>
                {visitingCard &&
                !isEmptyObj(visitingCard) &&
                (visitingCard?.uri || visitingCard[0]?.uri) ? (
                  <View style={[style.uploadButton]}>
                    <View style={[layout.fill]}>
                      <Image
                        style={style.rcImage}
                        source={
                          visitingCard?.uri
                            ? {uri: visitingCard?.uri}
                            : {uri: visitingCard[0]?.uri}
                        }
                      />
                    </View>
                  </View>
                ) : (
                  <AppButton
                    onPress={() => {
                      actionSheetRef.current?.hide();
                      actionSheetRef2.current?.show();
                      setPicType('visting');
                    }}
                    buttonStyle={style.uploadButton}
                    textColor={color.uploadText}
                    label={strings.kyc.vistingCard}
                  />
                )}
              </View>
            )}
          </View>
        }
      />
      <View style={style.skipSteps}>
        <AppTouchableOpacity
          children={
            <AppText
              style={style.space}
              mode="contact">{`Skip For Now >>`}</AppText>
          }
          onPress={() => {
            AppBottomTab.navigate();
            appDispatch(setNavigateFrom(false));
          }}
        />
        <View style={style.buttonRow}>
          <AppButton
            buttonStyle={[style.nextButton, isButtonDisabled && style.disabled]}
            textColor={style.colors.white}
            label={strings.next}
            onPress={handleNext}
            isEnabled={!isButtonDisabled}
          />
        </View>
      </View>
      <CustomActionSheet
        onHide={() => actionSheetRef.current?.hide()}
        ref={actionSheetRef}
        addressProofTypes={addressProofTypes}
        setAddressProofType={(type) => {
          setAddressFront(null);
          setAddressBack(null);
          setVisitingCard(null);
          setAddressProofType(type);
        }}
      />
      <OptionsActionSheet
        ref={actionSheetRef2}
        openDocument={openDocument}
        openCamera={openCamera}
      />
    </React.Fragment>
  );
};
UserKycContainer.SCREEN_NAME = 'UserKycContainer';
UserKycContainer.navigationOptions = {
  headerShown: false,
};
UserKycContainer.navigate = () => {
  RootNavigator.navigate(UserKycContainer.SCREEN_NAME);
};
export default UserKycContainer;
