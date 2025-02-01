import {View, StyleSheet} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useTheme} from '@/hooks/useTheme';
import {useInventoryStyle} from '../../Inventory/Styles/useInventoryStyle';
import {AppText} from '@/components/AppText';
import AppTouchableOpacity from '@/components/AppTouchableOpacity';
import {normalize, AppFontFamily} from '@/theme/Utils';
import {filteredDate, getCommodityLanguage} from '@/libs';
import strings from '@/util/Strings';
import LoadOrderDetailContainer from '../LoadOrderDetailContainer';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/AppStore';
import AppButton from '@/components/AppButton';
import ViewInvoiceContainer from '../../Invoices/ViewInvoiceContainer';
import PaymentDetailContainer from '../../payment/PaymentDetailContainer';
import UploadButtonModal from '../../payment/components/UploadButtonModal';
import {getImageName, getImageType, getImageUri} from '@/libs';
import {isEmptyObj} from 'native-base';
import {doUploadPod} from '@/redux/actions/LoadAction';
import {showAlert} from '@/components/Alert';
import {ImagePickerResponse, launchCamera} from 'react-native-image-picker';
import OrderContainer from '../OrderContainer';
import DocumentPicker from 'react-native-document-picker';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import {navigationRef} from '@/libs/navigation/RootNavigation';
import PaymentBill from '../../loads/PaymentBill';
const OrderComponent = ({item}: {item: any}) => {
  const style = useStyle();
  const {userDetails} = useSelector((state: RootState) => state.auth);
  const inventoryStyle = useInventoryStyle();
  const [isShowPodModal, setIsShowPodModal] = useState(false);
  const [poddocNameUrl, setPodDocNameUrl] = useState<string>('');
  const [slipdocNameUrl, setSlipDocNameUrl] = useState<string>('');
  const [slipdocName, setSlipDocName] = useState<any>([]);
  const [addDocOnedocName, setAddDocOneDocName] = useState<any>([]);
  const [addDocTwodocName, setAddDocTwoDocName] = useState<any>([]);
  const [addDocOnedocNameUrl, setAddDocOneDocNameUrl] = useState<string>('');
  const [addDocTwodocNameUrl, setAddDocTwoDocNameUrl] = useState<string>('');
  const actionSheetRef2 = useRef<ActionSheetRef>(null);
  const [selectedValue, setSelectedValue] = useState('');
  const [uploadUsing, setUploadUsing] = useState('');
  const [poddocName, setPodDocName] = useState<any>([]);
  const {
    style: {layout, gutter},
    value: {color},
  } = useTheme();
  const handleNavigate = () => {
    if (item?.isPodUploaded) {
      PaymentDetailContainer.navigate(item);
    } else {
      setIsShowPodModal(true);
    }
  };
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
      setIsShowPodModal(false);
      OrderContainer.navigate();
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
      formData.append('orderId', item?.orderId);
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
  return (
    <AppTouchableOpacity
      onPress={() => {
        LoadOrderDetailContainer.navigate(item);
      }}
      activeOpacity={0.8}
      children={
        <View style={style.box}>
          <View style={style.upperBox}>
            <View style={style.upperInner}>
              <AppText mode="alternative">आर्डर - {item?.orderId}</AppText>
              <AppText style={style.truckNumber}>{item?.vehicleNumber}</AppText>
            </View>
          </View>
          <View style={style.middleview}>
            <View style={[inventoryStyle.locationContainer, style.fill]}>
              <View style={inventoryStyle.origin}>
                <View style={[inventoryStyle.dot, {top: 7}]} />
                <AppText
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={[
                    inventoryStyle.originLocation,
                    {fontSize: normalize(18)},
                  ]}>
                  {item?.origin?.replace(', India', '')}
                </AppText>
                <View
                  style={[inventoryStyle.originLine, {borderStyle: 'solid'}]}
                />
              </View>
              <View
                style={[
                  inventoryStyle.line,
                  {borderStyle: 'solid', height: 20},
                ]}
              />
              <View style={[inventoryStyle.origin, {marginTop: -10}]}>
                <View
                  style={[
                    inventoryStyle.dot,
                    {
                      top: 7,
                      backgroundColor:
                        userDetails?.profileType === 'transporter'
                          ? color.transporter
                          : color.buttonNew,
                    },
                  ]}
                />
                <AppText
                  style={[
                    inventoryStyle.originLocation,
                    {fontSize: normalize(18)},
                  ]}>
                  {item?.destination?.replace(', India', '')}
                </AppText>
              </View>
            </View>
            <View>
              <View style={style.weightWrap}>
                <AppText style={style.weight}>
                  लोडिंग - {filteredDate(item?.dispatchDate)}
                </AppText>
                <AppText style={style.commodity}>
                  {getCommodityLanguage(item?.commodityType)}
                </AppText>
              </View>
              <AppText style={style.price}>
                {item?.tripType === 'Account Pay'
                  ? strings.account_pay
                  : strings.to_pay}
              </AppText>
            </View>
          </View>

          {[
            'in-transit',
            'balance pending',
            'completed',
            'pending-dues',
          ].includes(item?.orderStatus) && (
            <View style={style.buttonWrap}>
              <AppButton
                buttonStyle={style.leftButton}
                textColor={
                  userDetails?.profileType === 'transporter'
                    ? color.transporter
                    : color.buttonNew
                }
                label={strings.receipt}
                onPress={() => {
                  navigationRef.current?.navigate(PaymentBill.SCREEN_NAME, {
                    orderId: item?.orderId,
                  });
                }}
              />
              <AppButton
                onPress={handleNavigate}
                buttonStyle={style.rightButton}
                label={
                  !item?.isPodUploaded ? strings.podUpload : strings.podHindi
                }
              />
            </View>
          )}
          <ActionSheet ref={actionSheetRef2}>
            <View
              style={[
                layout.column,
                gutter.gap.regular,
                gutter.paddingVertical.large,
                gutter.paddingHorizontal.large,
                {height: 150},
              ]}>
              <AppButton
                onPress={() => {
                  actionSheetRef2?.current?.hide();
                  setUploadUsing('gallery');
                }}
                buttonStyle={style.buttonOutline}
                textColor={
                  userDetails?.profileType === 'transporter'
                    ? color.transporter
                    : color.buttonNew
                }
                label={strings.upload_from_gallery}
              />
              <AppButton
                onPress={() => {
                  actionSheetRef2?.current?.hide();
                  setUploadUsing('camera');
                }}
                buttonStyle={style.buttonOutline}
                textColor={
                  userDetails?.profileType === 'transporter'
                    ? color.transporter
                    : color.buttonNew
                }
                label={strings.open_camera}
              />
            </View>
          </ActionSheet>
          {isShowPodModal ? (
            <UploadButtonModal
              visible={isShowPodModal}
              onClose={() => setIsShowPodModal(false)}
              onSelect={(type: React.SetStateAction<string>) => {
                console.log(type);
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
        </View>
      }
    />
  );
};

export default OrderComponent;
function useStyle() {
  const {
    style: {layout, gutter},
    value: {color},
  } = useTheme();
  const {userDetails} = useSelector((state: RootState) => state.auth);
  return StyleSheet.create({
    box: {
      borderWidth: 1,
      borderColor: color.border,
      borderRadius: 10,
      ...gutter.marginBottom.regular,
      ...gutter.marginTop.regular,
      backgroundColor: color.white,
    },
    upperViewLeft: {
      ...layout.rowVerticalCenter,
      ...layout.fill,
    },
    upperViewRight: {
      fontSize: normalize(15),
      color: color.disableButton,
    },
    orderId: {
      fontSize: normalize(13),
      color: color.disableButton,
      ...gutter.marginLeft.tiny,
    },
    middleview: {
      ...layout.row,
      ...gutter.marginBottom.regular,
      ...gutter.gap.regular,
      ...gutter.paddingVertical.small,
      ...gutter.paddingHorizontal.regular,
    },
    fill: layout.fill,
    price: {
      fontSize: normalize(18),
      ...layout.textAlignEnd,
      color: color.tabText,
    },
    bonus: {
      fontSize: normalize(17),
      fontWeight: '400',
      color:
        userDetails?.profileType === 'transporter'
          ? color.transporter
          : color.buttonNew,
    },
    bottomView: {
      ...layout.row,
    },
    weightWrap: {
      ...layout.fill,
    },
    weight: {
      color: color.tabText,
      fontSize: normalize(16),
      ...layout.textAlignEnd,
    },
    commodity: {
      ...gutter.paddingLeft.small,
      fontSize: normalize(16),
      ...layout.textAlignEnd,
      color: color.tabText,
    },
    tripType: {
      fontSize: normalize(22),
      ...layout.textAlignEnd,
      color: color.tabText,
    },
    upperBox: {
      backgroundColor: color.lightWhite,
      overflow: 'hidden',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      ...gutter.paddingVertical.small,
      ...gutter.paddingHorizontal.regular,
      ...gutter.marginBottom.normal,
    },
    upperInner: {
      ...layout.rowVerticalCenter,
      ...layout.justifyContentBetween,
    },
    truckNumber: {
      fontSize: normalize(16),
      fontFamily: AppFontFamily.ROBOTOMEDIUM,
    },
    buttonWrap: {
      ...layout.rowCenter,
      backgroundColor: color.white,
      ...gutter.gap.small,
      ...gutter.paddingVertical.small,
    },
    leftButton: {
      backgroundColor: color.transparent,
      borderWidth: 1,
      borderColor:
        userDetails?.profileType === 'transporter'
          ? color.transporter
          : color.buttonNew,
    },
    rightButton: {
      backgroundColor:
        userDetails?.profileType === 'transporter'
          ? color.transporter
          : color.buttonNew,
    },
    buttonOutline: {
      borderWidth: 1,
      backgroundColor: color.transparent,
      borderColor:
        userDetails?.profileType === 'transporter'
          ? color.transporter
          : color.buttonNew,
      ...layout.fill,
      paddingLeft: 10,
      paddingRight: 10,
    },
  });
}
