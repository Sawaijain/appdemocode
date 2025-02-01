import AppButton from '@/components/AppButton';
import {AppText} from '@/components/AppText';
import AppTouchableOpacity from '@/components/AppTouchableOpacity';
import PageNav from '@/components/PageNav';
import BaseScreen from '@/features/base/screens/BaseScreen';
import {useTheme} from '@/hooks/useTheme';
import RootNavigator from '@/libs/navigation/RootNavigation';
import IMAGE_URL from '@/theme/ImageUrl';
import {normalize} from '@/theme/Utils';
import strings from '@/util/Strings';
import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, ScrollView, RefreshControl} from 'react-native';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import {useSelector} from 'react-redux';
import DocumentPicker from 'react-native-document-picker';
import {ImagePickerResponse, launchCamera} from 'react-native-image-picker';
import {showAlert} from '@/components/Alert';
import UploadButtonModal from './components/UploadButtonModal';
import {useIsFocused} from '@react-navigation/native';
import {doUploadPod, getCarrierPaymentLoads} from '@/redux/actions/LoadAction';
import PaymentComponent from './components/PaymentComponent';
import {isObjectEmpty} from '@/libs';
import {isEmptyObj} from 'native-base';
import {RootState} from '@/redux/AppStore';
import RenderEmpty from '@/components/RenderEmpty';
interface PaymentContainerProps {
  navigation: any;
}

const PaymentContainer = (props: PaymentContainerProps) => {
  const [paymentType, setPaymentType] = useState<string>('current');
  const {
    userDetails: {user_id, owner_name, assignedTo},
  }: any = useSelector((state: RootState) => state.auth);
  const isFocused = useIsFocused();
  const actionSheetRef2 = useRef<ActionSheetRef>(null);
  const {paymentLods} = useSelector((state: RootState) => state.load);
  const [loads, setLoads] = useState<Array<[]>>([]);
  const [isShow, setIsShow] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [poddocName, setPodDocName] = useState<any>([]);
  const [slipdocName, setSlipDocName] = useState<any>([]);
  const [addDocOnedocName, setAddDocOneDocName] = useState<any>([]);
  const [addDocTwodocName, setAddDocTwoDocName] = useState<any>([]);
  const [poddocNameUrl, setPodDocNameUrl] = useState<string>('');
  const [slipdocNameUrl, setSlipDocNameUrl] = useState<string>('');
  const [addDocOnedocNameUrl, setAddDocOneDocNameUrl] = useState<string>('');
  const [addDocTwodocNameUrl, setAddDocTwoDocNameUrl] = useState<string>('');
  const [orderId, setOrderId] = useState('');
  const [uploadUsing, setUploadUsing] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const {
    style: {layout, gutter, input},
    value: {color},
  } = useTheme();
  useEffect(() => {
    if (isFocused) {
      getCarrierPaymentLoads(user_id);
    }
  }, [isFocused]);
  useEffect(() => {
    if (paymentType == 'current') {
      if (paymentLods && paymentLods.length > 0) {
        let _loads = paymentLods?.filter(
          (e: any) =>
            e.carrier_quotations?.status === 'requested' ||
            e.carrier_quotations?.status === 'accepted' ||
            e.carrier_quotations.status === 'driver_data_updation' ||
            e.carrier_quotations.status === 'driver_data_updation_done',
        );
        var filteredLoads = _loads?.filter(
          (e: any) =>
            e?.orderStatus === 'in-transit' ||
            e?.orderStatus === 'balance pending' ||
            e?.orderStatus === 'pending-dues' ||
            e?.orderStatus === 'completed',
        );
        var loadsForTrip = filteredLoads?.filter((e: any) =>
          e.tripType === 'Account Pay'
            ? e.foPaymentBalanceStatus === 'pending' ||
              e.foPaymentAdvanceStatus == 'pending'
            : e.foPaymentAdvanceStatus == 'pending',
        );
        setLoads([...loadsForTrip]);
      }
    } else {
      let _loads = paymentLods?.filter(
        (e: any) =>
          e.carrier_quotations?.status === 'requested' ||
          e.carrier_quotations?.status === 'accepted' ||
          e.carrier_quotations.status === 'driver_data_updation' ||
          e.carrier_quotations.status === 'driver_data_updation_done',
      );
      var filteredLoads = _loads?.filter(
        (e: any) =>
          e?.orderStatus === 'in-transit' ||
          e?.orderStatus === 'balance pending' ||
          e?.orderStatus === 'completed' ||
          e?.orderStatus === 'pending-dues',
      );
      var loadsForTrip = filteredLoads?.filter((e: any) =>
        e.tripType == 'Account Pay'
          ? e.foPaymentBalanceStatus == 'completed' &&
            e.foPaymentAdvanceStatus == 'completed'
          : e.foPaymentAdvanceStatus == 'completed',
      );
      setLoads([...loadsForTrip]);
    }
  }, [paymentLods, paymentType]);
  const openDocument = async (file: string | undefined) => {
    setTimeout(async () => {
      try {
        const res: any = await DocumentPicker.pick({
          type: [DocumentPicker.types.images],
        });
        const fileName = res[0].uri?.replace('file://', '');
        if (res[0].type === 'image/jpeg' || res[0].type === 'image/png') {
          if (file == 'pod') {
            setPodDocName(res);
            setPodDocNameUrl(fileName);
            setSelectedValue('');
          } else if (file == 'slip') {
            setSlipDocName(res);
            setSlipDocNameUrl(fileName);
            setSelectedValue('');
          } else if (file == 'add1') {
            setAddDocOneDocNameUrl(fileName);
            setAddDocOneDocName(res);
            setSelectedValue('');
          } else if (file == 'add2') {
            setAddDocTwoDocName(res);
            setAddDocTwoDocNameUrl(fileName);
            setSelectedValue('');
          }
        } else {
          showAlert({message: 'कृपया केवल छवि अपलोड करें'});
          setSelectedValue('');
        }
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
          console.log('user cancelled upload >>', err);
          setSelectedValue('');
        } else {
          setSelectedValue('');
          console.log('error occured >>', err);
          throw err;
        }
      }
    }, 400);
  };
  function openCamera(file: string | undefined) {
    launchCamera(
      {mediaType: 'photo', maxWidth: 600, maxHeight: 600, quality: 0.7},
      (res: ImagePickerResponse | any) => {
        if (res.didCancel === true) {
        } else {
          if (res && res.assets && res.assets.length > 0) {
            let tempType: any = res?.assets[0]?.type.split('/');
            let fileUrl: any = res?.assets[0]?.uri;
            if (tempType[0] === 'image') {
              let tempimage = {
                name: res?.assets[0]?.fileName,
                uri: res?.assets[0]?.uri,
                type: res?.assets[0]?.type,
              };
              if (file == 'pod') {
                setPodDocNameUrl(fileUrl);
                poddocName.push(tempimage);
                setPodDocName([...poddocName]);
                setSelectedValue('');
              } else if (file == 'slip') {
                slipdocName.push(tempimage);
                setSlipDocNameUrl(fileUrl);
                setSlipDocName([...slipdocName]);
                setSelectedValue('');
              } else if (file == 'add1') {
                addDocOnedocName.push(tempimage);
                setAddDocOneDocNameUrl(fileUrl);
                setAddDocOneDocName([...addDocOnedocName]);
                setSelectedValue('');
              } else if (file == 'add2') {
                addDocTwodocName.push(tempimage);
                setAddDocTwoDocNameUrl(fileUrl);
                setAddDocTwoDocName([...addDocTwodocName]);
                setSelectedValue('');
              }
            } else {
              showAlert({message: 'कृपया केवल छवि अपलोड करें'});
              setSelectedValue('');
            }
          }
        }
      },
    );
  }
  useEffect(() => {
    if (selectedValue && uploadUsing == 'gallery') {
      openDocument(selectedValue);
    } else if (selectedValue && uploadUsing == 'camera') {
      openCamera(selectedValue);
    }
  }, [selectedValue, uploadUsing]);
  const handleRemoveDoc = (file: string) => {
    if (file == 'pod') {
      setPodDocName([]);
      setSelectedValue('');
      setPodDocNameUrl('');
    } else if (file == 'slip') {
      setSlipDocName([]);
      setSelectedValue('');
      setSlipDocNameUrl('');
    } else if (file == 'add1') {
      setAddDocOneDocName([]);
      setSelectedValue('');
      setAddDocOneDocNameUrl('');
    } else if (file == 'add2') {
      setAddDocTwoDocName([]);
      setSelectedValue('');
      setAddDocTwoDocNameUrl('');
    } else {
      setSelectedValue('');
    }
  };
  const callBack = (success: boolean, message?: string) => {
    if (success) {
      showAlert({message: 'पीओडी सफलतापूर्वक अपलोड किया गया'});
      setPodDocName({});
      setSlipDocName({});
      setAddDocOneDocName({});
      setAddDocTwoDocName({});
      setIsShow(false);
      getCarrierPaymentLoads(user_id);
    } else if (!success) {
      showAlert({message: message});
    }
  };
  const handleSubmitButton = () => {
    if (
      poddocName &&
      !isEmptyObj(poddocName) &&
      slipdocName &&
      !isEmptyObj(slipdocName)
    ) {
      let formData: FormData = new FormData();
      formData.append('orderId', orderId);
      formData.append('podArrived', {
        uri: getImageUri(poddocName),
        type: getImageType(poddocName),
        name: getImageName(poddocName),
      });
      formData.append('podReceipt', {
        uri: getImageUri(slipdocName),
        name: getImageName(slipdocName),
        type: getImageType(slipdocName),
      });
      if (addDocOnedocName && !isEmptyObj(addDocOnedocName)) {
        formData.append('podAdditionalOne', {
          uri: getImageUri(addDocOnedocName),
          name: getImageName(addDocOnedocName),
          type: getImageType(addDocOnedocName),
        });
      } else {
        formData.append('podAdditionalOne', '');
      }
      if (addDocTwodocName && !isEmptyObj(addDocTwodocName)) {
        formData.append('podAdditionalSecond', {
          uri: getImageUri(addDocTwodocName),
          name: getImageName(addDocTwodocName),
          type: getImageType(addDocTwodocName),
        });
      } else {
        formData.append('podAdditionalSecond', '');
      }
      doUploadPod(formData, callBack);
    } else {
      showAlert({message: 'Please Upload required Document'});
    }
  };
  const getImageUri = (imageRes: any) => {
    if (imageRes && !isObjectEmpty(imageRes)) {
      return imageRes[0].uri;
    } else {
      return imageRes.uri;
    }
  };
  const getImageType = (imageRes: any) => {
    if (imageRes && !isObjectEmpty(imageRes)) {
      return imageRes[0].type;
    } else {
      return imageRes.type;
    }
  };
  const getImageName = (imageRes: any) => {
    if (imageRes && !isObjectEmpty(imageRes)) {
      return imageRes[0].name;
    } else {
      return imageRes.name;
    }
  };
  return (
    <React.Fragment>
      <BaseScreen>
        <PageNav
          isBack
          header={'भुगतान की स्थिति'}
          xsmallImage={IMAGE_URL.rupeeIcon}
        />
        <View
          style={[
            layout.rowVerticalCenter,
            gutter.marginVertical.small,
            gutter.marginHorizontal.small,
          ]}>
          <AppButton
            onPress={() => setPaymentType('current')}
            buttonStyle={[
              layout.fill,
              gutter.marginHorizontal.small,
              {
                backgroundColor:
                  paymentType == 'current' ? color.black : color.white,
              },
            ]}
            label={strings.active}
            textColor={paymentType !== 'current' ? color.black : color.white}
          />
          <AppButton
            onPress={() => setPaymentType('history')}
            buttonStyle={[
              layout.fill,
              {
                backgroundColor:
                  paymentType == 'history' ? color.black : color.white,
              },
            ]}
            label={strings.completePay}
            textColor={paymentType !== 'history' ? color.black : color.white}
          />
        </View>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setTimeout(() => {
                  if (paymentType == 'current') {
                    getCarrierPaymentLoads(user_id);
                  } else {
                    getCarrierPaymentLoads(user_id);
                  }
                }, 2000);
              }}
            />
          }>
          {loads && loads.length > 0 ? (
            loads &&
            loads.map((item, index) =>
              paymentType === 'current' ? (
                <PaymentComponent
                  onPressPod={(orderId: React.SetStateAction<string>) => {
                    setIsShow(true);
                    setOrderId(orderId);
                  }}
                  loads={item}
                  key={index}
                  navigation={props.navigation}
                />
              ) : (
                <PaymentComponent
                  onPressPod={(orderId: React.SetStateAction<string>) => {
                    setIsShow(true);
                    setOrderId(orderId);
                  }}
                  navigation={props.navigation}
                  loads={item}
                  key={index}
                />
              ),
            )
          ) : (
            <RenderEmpty title="अभी तक कोई शिपमेंट नहीं !" />
          )}
        </ScrollView>
      </BaseScreen>
      {isShow ? (
        <UploadButtonModal
          visible={isShow}
          onClose={() => setIsShow(false)}
          onSelect={(type: React.SetStateAction<string>) => {
            setSelectedValue(type);
            setUploadUsing('');
          }}
          podDocName={poddocNameUrl}
          receiptDocName={slipdocNameUrl}
          addDocName1={addDocOnedocNameUrl}
          addDocName2={addDocTwodocNameUrl}
          onRemoveDoc={(type: string) => handleRemoveDoc(type)}
          onSubmit={() => handleSubmitButton()}
          actionSheetRef={actionSheetRef2}
        />
      ) : null}
      <ActionSheet
        containerStyle={{height: normalize(200)}}
        ref={actionSheetRef2}>
        <View style={{paddingVertical: 50, backgroundColor: '#000'}}>
          <AppTouchableOpacity
            onPress={() => {
              actionSheetRef2?.current?.hide();
              setUploadUsing('gallery');
            }}
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
            onPress={() => {
              actionSheetRef2?.current?.hide();
              setUploadUsing('camera');
            }}
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
PaymentContainer.SCREEN_NAME = 'PaymentContainer';
PaymentContainer.navigate = () => {
  RootNavigator.navigate(PaymentContainer.SCREEN_NAME);
};
export default PaymentContainer;

const styles = StyleSheet.create({
  container: {},
});
