import {View, StyleSheet} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import RootNavigator from '@/libs/navigation/RootNavigation';
import KeyboardBaseScreen from '@/features/base/screens/KeyboardBaseScreen';
import {RootNavigationParam} from '@/features/base/interfaces/interfaces';
import MapViewComponent from '../matched-loads/components/MapViewComponent';
import Details from '../matched-loads/components/Details';
import VehicleInfo from './component/VehicleInfo';
import PaymentWeightCommodity from './component/PaymentWeightCommodity';
import ImportantNotes from '../matched-loads/components/ImportantNotes';
import AppButton from '@/components/AppButton';
import strings from '@/util/Strings';
import {useTheme} from '@/hooks/useTheme';
import ViewInvoiceContainer from '../Invoices/ViewInvoiceContainer';
import PaymentDetailContainer from '../payment/PaymentDetailContainer';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import DocumentPicker from 'react-native-document-picker';
import {ImagePickerResponse, launchCamera} from 'react-native-image-picker';
import {showAlert} from '@/components/Alert';
import {isEmptyObj} from 'native-base';
import {getImageName, getImageType, getImageUri} from '@/libs';
import UploadButtonModal from '../payment/components/UploadButtonModal';
import {doUploadPod} from '@/redux/actions/LoadAction';
import OrderContainer from './OrderContainer';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/AppStore';
const LoadOrderDetailContainer = ({
  route: {
    params: {data},
  },
}: RootNavigationParam<Record<any, any>>) => {
  const style = useStyle();
  const {userDetails} = useSelector((state: RootState) => state.auth);
  const actionSheetRef2 = useRef<ActionSheetRef>(null);
  const [poddocName, setPodDocName] = useState<any>([]);
  const [slipdocName, setSlipDocName] = useState<any>([]);
  const [addDocOnedocName, setAddDocOneDocName] = useState<any>([]);
  const [addDocTwodocName, setAddDocTwoDocName] = useState<any>([]);
  const [poddocNameUrl, setPodDocNameUrl] = useState<string>('');
  const [slipdocNameUrl, setSlipDocNameUrl] = useState<string>('');
  const [addDocOnedocNameUrl, setAddDocOneDocNameUrl] = useState<string>('');
  const [addDocTwodocNameUrl, setAddDocTwoDocNameUrl] = useState<string>('');
  const [isShowPodModal, setIsShowPodModal] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [uploadUsing, setUploadUsing] = useState('');
  const {
    style: {layout, gutter},
  } = useTheme();
  const handleNavigate = () => {
    if (data?.isPodUploaded) {
      PaymentDetailContainer.navigate(data);
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
      formData.append('orderId', data?.orderId);
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
    <React.Fragment>
      <KeyboardBaseScreen
        scrollChildren={
          <React.Fragment>
            <MapViewComponent
              origin={{origin: data?.origin, location: data?.originLocation}}
              destination={{
                destination: data?.destination,
                location: data?.destinationLocation,
              }}
            />
            <VehicleInfo
              orderid={data?.orderId}
              vehicleNumber={data?.vehicleNumber}
            />
            <Details
              isOrderPage
              data={{
                origin: data?.origin,
                destination: data?.destination,
                loadingDate: data?.dispatchDate,
              }}
            />
            <View>
              <PaymentWeightCommodity
                data={{
                  advancePercentage: data?.advancePercentage,
                  weight:
                    data?.weightActual > 0 ? data?.weightActual : data?.weight,
                  commodity: data?.commodityType,
                  rate: data?.carrierFinalRate || data?.finalRate,
                  payments: data?.payments,
                  tdsAmount: data?.tdsAmount,
                  tripType: data?.tripType,
                }}
              />
            </View>
            <ImportantNotes data={data} isDetailPage />
          </React.Fragment>
        }
      />
      {['in-transit', 'balance pending', 'completed', 'pending-dues'].includes(
        data?.orderStatus,
      ) && (
        <View style={style.buttonWrap}>
          {/* <AppButton
            buttonStyle={style.leftButton}
            textColor={
              userDetails?.profileType === 'transporter'
                ? style.color.transporter
                : style.color.buttonNew
            }
            label={strings.bilty}
            onPress={() => ViewInvoiceContainer.navigate(data)}
          /> */}
          <AppButton
            onPress={handleNavigate}
            buttonStyle={style.rightButton}
            label={!data?.isPodUploaded ? strings.podUpload : strings.podHindi}
          />
        </View>
      )}
      {isShowPodModal ? (
        <UploadButtonModal
          visible={isShowPodModal}
          onClose={() => setIsShowPodModal(false)}
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
                ? style.color.transporter
                : style.color.buttonNew
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
                ? style.color.transporter
                : style.color.buttonNew
            }
            label={strings.open_camera}
          />
        </View>
      </ActionSheet>
    </React.Fragment>
  );
};

LoadOrderDetailContainer.SCREEN_NAME = 'LoadOrderDetailContainer';
LoadOrderDetailContainer.navigationOptions = {
  headerShown: false,
};
LoadOrderDetailContainer.navigate = (data: any) => {
  RootNavigator.navigate(LoadOrderDetailContainer.SCREEN_NAME, {data});
};

export default LoadOrderDetailContainer;

function useStyle() {
  const {
    style: {layout, gutter, font},
    value: {color},
  } = useTheme();
  const {userDetails} = useSelector((state: RootState) => state.auth);
  return {
    ...StyleSheet.create({
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
    }),
    color: color,
    layout: layout,
    font: font,
  };
}
