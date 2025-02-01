import {View, StyleSheet, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import RootNavigator from '@/libs/navigation/RootNavigation';
import KeyboardBaseScreen from '@/features/base/screens/KeyboardBaseScreen';
import {RootNavigationParam} from '@/features/base/interfaces/interfaces';
import MapViewComponent from '../components/MapViewComponent';
import AppTouchableOpacity from '@/components/AppTouchableOpacity';
import Details from '../components/Details';
import {useTheme} from '@/hooks/useTheme';
import {AppFontFamily, normalize} from '@/theme/Utils';
import {AppTextInput} from '@/components/AppTextInput';
import strings from '@/util/Strings';
import AppButton from '@/components/AppButton';
import {useKeyboard} from '@/hooks/useKeyboard';
import {AddCircleIcon, RemoveCircleIcon} from '@/components/icons/Icon';
import {Actionsheet, InfoOutlineIcon, useDisclose, useToast} from 'native-base';
import {weightList} from '@/util/Commodity';
import {InputData, validateInputRequestForm} from '@/util/UnknownOptionError';
import {AppText} from '@/components/AppText';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/AppStore';
import {doLoadRequest} from '@/redux/actions/LoadAction';
import moment from 'moment';
import {getTruckList} from '@/redux/actions/TruckAction';
import {useIsFocused} from '@react-navigation/native';

const BookTruckContainer = ({
  route: {
    params: {data, isAddMore},
  },
}: RootNavigationParam<Record<any, any>>) => {
  const {isOpen, onOpen, onClose} = useDisclose();
  const style = useStyle();
  const isKeyboard = useKeyboard();
  const toast = useToast();
  const isFocus = useIsFocused();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [truckData, setTruckData] = useState<any[]>([]);
  const {userDetails}: any = useSelector((state: RootState) => state.auth);
  const {truckList} = useSelector((state: RootState) => state.truck);
  const [inputsArr, setInputsArr] = useState<InputData[]>([
    {
      driverName: '',
      vehicleNumber: '',
      truckWeight: '',
      driverNumber: '',
      errorMessage: '',
    },
  ]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const handleInputChange = (
    text: string,
    index: number,
    field: keyof InputData,
  ) => {
    const updatedInputs = [...inputsArr];
    updatedInputs[index][field] = text;
    updatedInputs[index].errorMessage = validateInputRequestForm(
      updatedInputs[index],
    );
    setInputsArr(updatedInputs);
  };
  useEffect(() => {
    getTruckList(userDetails?.user_id);
  }, [isFocus]);
  useEffect(() => {
    if (truckList && truckList.length > 0) {
      const _truck = truckList.filter((e: any) => e?.deleted === false);
      setTruckData([..._truck]);
    }
  }, [truckList]);
  const handleAddInput = () => {
    const newInputs = inputsArr.map((input) => ({
      ...input,
      errorMessage: validateInputRequestForm(input),
    }));
    if (!newInputs.some((input) => !!input.errorMessage)) {
      newInputs.push({
        driverName: '',
        vehicleNumber: '',
        truckWeight: '',
        driverNumber: '',
        errorMessage: 'All fields are required',
      });
    }
    setInputsArr(newInputs);
  };

  const handleRemoveInput = (index: number) => {
    const updatedInputs = [...inputsArr];
    updatedInputs.splice(index, 1);
    setInputsArr(updatedInputs);
  };

  const canAddMore =
    inputsArr.every((input) => !input.errorMessage) &&
    inputsArr.some(
      (input) =>
        !!(
          input.driverName ||
          input.vehicleNumber ||
          input.truckWeight ||
          input.driverNumber
        ),
    );

  const handleAddInputWithValidation = () => {
    if (canAddMore) {
      handleAddInput();
    } else {
      const firstInvalidInput = inputsArr.find((input) => input.errorMessage);
      if (firstInvalidInput) {
        toast.show({title: firstInvalidInput?.errorMessage});
      }
    }
  };
  const handleSubmit = () => {
    let req: any;
    if (isAddMore) {
      let trucks = [...inputsArr, ...data?.data?.truckDetails];
      req = {
        truckDetails: trucks?.map(function (item) {
          delete item?.errorMessage;
          return item;
        }),
        carrier_request_id: data?.data?.carrier_request_id,
        id: data?.data?._id,
      };
    } else {
      req = {
        origin: data?.laneData?.origin,
        destination: data?.laneData?.destination,
        commodity: data?.laneData?.commodityType || data?.commodity,
        tripType: data?.laneData?.tripType,
        carrier_id: userDetails?.user_id,
        allWeight: String(data?.laneData?.totalWeight),
        is_KYC_verified: userDetails?.is_KYC_verified,
        dispatchDate: moment(data?.laneData?.dispatchDate).format('YYYY-MM-DD'),
        truckDetails: inputsArr.map(function (item) {
          delete item?.errorMessage;
          return item;
        }),
        originLocation: data?.data?.originLocation,
        destinationLocation: data?.data?.destinationLocation,
      };
    }

    doLoadRequest(req, isAddMore);
  };
  return (
    <React.Fragment>
      <KeyboardBaseScreen
        scrollChildren={
          <React.Fragment>
            <MapViewComponent
              origin={{
                origin: data?.data?.origin,
                location: data?.data?.originLocation,
              }}
              destination={{
                destination: data?.data?.destination,
                location: data?.data?.destinationLocation,
              }}
            />
            <View style={style.upperView}>
              {/* <View style={style.upperViewLeft}>
                <Star />
                <Copy />
              </View>
              <AppTouchableOpacity
                style={style.upperViewRight}
                children={<ShareIcon />}
              /> */}
            </View>
            <Details
              data={{
                origin: data?.data?.origin,
                destination: data?.data?.destination,
                loadingDate: data?.data?.dispatchDate,
              }}
            />
            {inputsArr &&
              inputsArr.map((item, index) => (
                <View key={index} style={style.formContainer}>
                  <View style={style.space}>
                    <AppButton
                      label={`${
                        item.vehicleNumber
                          ? item.vehicleNumber
                          : strings.truck_no
                      }`}
                      buttonStyle={style.availabilityAddbtn}
                      textColor={
                        item.vehicleNumber
                          ? style.color.black
                          : style.color.uploadText
                      }
                      textStyle={style.availabilityAddbtnText}
                      onPress={() => {
                        setIsModalOpen(true);
                        setSelectedIndex(index);
                      }}
                    />
                  </View>
                  <View style={style.space}>
                    <AppTextInput
                      placeholder={strings.driver_name}
                      placeholderTextColor={style.color.placeholder}
                      //@ts-ignore
                      textInputStyle={style.textInput}
                      value={item.driverName}
                      onChangeText={(text) =>
                        handleInputChange(text, index, 'driverName')
                      }
                    />
                  </View>
                  <View style={style.space}>
                    <AppTextInput
                      placeholder={strings.driver_no}
                      placeholderTextColor={style.color.placeholder}
                      //@ts-ignore
                      textInputStyle={style.textInput}
                      value={item.driverNumber}
                      onChangeText={(text) =>
                        handleInputChange(text, index, 'driverNumber')
                      }
                      keyboardType="number-pad"
                      maxLength={10}
                    />
                  </View>
                  <View style={style.space}>
                    <AppButton
                      label={`${item.truckWeight} ${strings.inventory.buttonNames.mt}`}
                      buttonStyle={style.availabilityAddbtn}
                      textColor={
                        item.truckWeight
                          ? style.color.black
                          : style.color.uploadText
                      }
                      textStyle={style.availabilityAddbtnText}
                      onPress={() => {
                        onOpen();
                        setSelectedIndex(index);
                      }}
                    />
                  </View>
                  <View style={[style.space, style.errorRow]}>
                    {item?.errorMessage ? (
                      <React.Fragment>
                        <InfoOutlineIcon color={style.color.danger} />
                        <AppText style={style.errorMessage}>
                          {item.errorMessage}
                        </AppText>
                      </React.Fragment>
                    ) : null}
                  </View>
                  {index > 0 && (
                    <View style={[style.space, style.layout.alignItemsEnd]}>
                      <AppButton
                        textColor={style.color.danger}
                        buttonStyle={style.outlineButton}
                        label={strings.delete}
                        onPress={() => handleRemoveInput(index)}
                        icon={
                          <RemoveCircleIcon
                            color={style.color.danger}
                            size={15}
                          />
                        }
                      />
                    </View>
                  )}
                </View>
              ))}
          </React.Fragment>
        }
      />
      {!isKeyboard && (
        <View style={style.buttonContainer}>
          <AppButton
            textColor={style.color.white}
            buttonStyle={[
              style.rightButton,
              {
                backgroundColor: !canAddMore
                  ? style.color.disableButton
                  : style.color.buttonNew,
              },
            ]}
            label={strings.add_truck}
            onPress={handleAddInputWithValidation}
            isEnabled={canAddMore}
            icon={<AddCircleIcon color={style.color.white} size={20} />}
          />
          <AppButton
            textColor={style.color.white}
            buttonStyle={[
              style.rightButton,
              {
                backgroundColor: !canAddMore
                  ? style.color.disableButton
                  : style.color.buttonNew,
              },
            ]}
            label={'सबमिट'}
            onPress={handleSubmit}
            isEnabled={canAddMore}
          />
        </View>
      )}
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content style={{height: 300}}>
          <ScrollView style={style.fullWidth}>
            {weightList?.map((item) => (
              <Actionsheet.Item
                onPress={() => {
                  handleInputChange(item, selectedIndex, 'truckWeight');
                  onClose();
                }}
                key={item}>
                {item}
              </Actionsheet.Item>
            ))}
          </ScrollView>
        </Actionsheet.Content>
      </Actionsheet>
      <Actionsheet isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Actionsheet.Content style={{height: 300}}>
          <ScrollView style={style.fullWidth}>
            {truckData &&
              truckData?.map((item, index) => (
                <AppTouchableOpacity
                  style={style.rcBox}
                  onPress={() => {
                    handleInputChange(
                      item?.rc_number,
                      selectedIndex,
                      'vehicleNumber',
                    );
                    setIsModalOpen(false);
                  }}
                  key={index}
                  children={
                    <AppText style={style.rcNumber}>{item?.rc_number}</AppText>
                  }
                />
              ))}
          </ScrollView>
        </Actionsheet.Content>
      </Actionsheet>
    </React.Fragment>
  );
};
BookTruckContainer.SCREEN_NAME = 'BookTruckContainer';
BookTruckContainer.navigationOptions = {
  headerShown: false,
};
BookTruckContainer.navigate = (data: any, isAddMore?: boolean) => {
  RootNavigator.navigate(BookTruckContainer.SCREEN_NAME, {data, isAddMore});
};
export default BookTruckContainer;
function useStyle() {
  const {
    style: {layout, gutter},
    value: {color, fontSize},
  } = useTheme();
  const {userDetails} = useSelector((state: RootState) => state.auth);
  return {
    ...StyleSheet.create({
      container: {
        ...layout.container,
      },
      upperView: {
        ...layout.rowVerticalCenter,
        ...gutter.marginBottom.large,
        ...gutter.paddingHorizontal.regular,
        ...gutter.marginVertical.regular,
      },
      upperViewLeft: {
        ...layout.rowVerticalCenter,
        ...layout.fill,
        ...gutter.gap.small,
      },
      upperViewRight: {},
      orderId: {
        fontSize: normalize(19),
        color: '#575757',
        ...gutter.marginLeft.tiny,
      },
      middleview: {
        ...layout.row,
        ...gutter.marginBottom.large,
      },
      space: {
        ...gutter.marginHorizontal.small,
        ...gutter.marginBottom.small,
      },
      buttonContainer: {
        ...layout.rowCenter,
        ...gutter.paddingVertical.regular,
        ...gutter.paddingHorizontal.regular,
        backgroundColor: color.white,
        ...gutter.gap.regular,
      },
      rightButton: {
        borderRadius: 5,
        backgroundColor:
          userDetails?.profileType === 'transporter'
            ? color.transporter
            : color.buttonNew,

        height: normalize(60),
      },
      textInput: {
        borderWidth: 1,
        borderColor:
          userDetails?.profileType === 'transporter'
            ? color.transporter
            : color.buttonNew,
        height: normalize(60),
        color: color.black,
        fontSize: fontSize.medium,
      },
      formContainer: {
        ...gutter.marginTop.large,
      },
      fullWidth: layout.fullWidth,
      availabilityAddbtn: {
        backgroundColor: color.transparent,
        borderRadius: normalize(5),
        borderWidth: normalize(1),
        borderColor:
          userDetails?.profileType === 'transporter'
            ? color.transporter
            : color.buttonNew,
        height: normalize(60),
        ...layout.justifyContentStart,
        paddingLeft: normalize(10),
      },
      availabilityAddbtnText: {
        fontSize: normalize(16),
      },
      errorRow: {
        ...layout.rowVerticalCenter,
        ...gutter.gap.small,
      },
      errorMessage: {
        color: color.danger,
        fontSize: normalize(14),
      },
      outlineButton: {
        backgroundColor: color.transparent,
        borderRadius: normalize(5),
        borderWidth: normalize(1),
        borderColor: color.danger,
        paddingLeft: normalize(10),
        paddingRight: normalize(10),
      },
      rcNumber: {
        ...gutter.marginLeft.regular,
        ...gutter.marginBottom.regular,
        ...layout.textAlignCenter,
        fontFamily: AppFontFamily.ROBOTOBOLD,
      },
      rcBox: {
        borderBottomWidth: 1,
        ...gutter.paddingBottom.tiny,
        ...gutter.marginTop.small,
        borderColor: color.borderColor,
      },
    }),
    color: color,
    layout: layout,
  };
}
