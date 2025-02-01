import RootNavigator from '@/libs/navigation/RootNavigation';
import React, {useEffect, useRef, useState} from 'react';
import {FlatList, ScrollView, TouchableOpacity, View} from 'react-native';
import strings from '@/util/Strings';
import {useTheme} from '@/hooks/useTheme';
import TruckBaseScreen from '@/features/base/screens/TruckBaseScreen';
import {useInventoryStyle} from '../Styles/useInventoryStyle';
import {AppText} from '@/components/AppText';
import AppButton from '@/components/AppButton';
import {
  formatDateToStringDateMonth,
  getFourDatesFromToday,
  sleep,
} from '@/libs';
import {useIsFocused} from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import GooglePlaceInput from '@/components/GoogleInput';
import {
  AddIcon,
  MinusIcon,
  Actionsheet,
  useDisclose,
  useToast,
} from 'native-base';
import {weightList} from '@/util/Commodity';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/AppStore';
import {
  addInventory,
  deleteInventory,
  getInventoryList,
  getProfileBasedPreferdLoads,
  updateInventory,
} from '@/redux/actions/TruckAction';
import InvertoryComponent from '../Component/InvertoryComponent';
import {GooglePlacesAutocompleteRef} from 'react-native-google-places-autocomplete';
import AppTouchableOpacity from '@/components/AppTouchableOpacity';
import {CloseCircleIcon, RefreshIcon} from '@/components/icons/Icon';
import HeaderButton from '../Component/HeaderButton';
import LoadCard from '../../matched-loads/components/LoadCard';
import MatchedLoadContainer from '../../matched-loads/screen/MatchedLoadContainer';
const InventoryContainer = () => {
  const {userDetails} = useSelector((state: RootState) => state.auth);
  const profileBasedLoads = useSelector(
    (state: RootState) => state.load?.profileBasedLoads,
  );
  const [tabName, setTabName] = useState<'Invertory' | 'Load'>('Invertory');
  const {inventory} = useSelector((state: RootState) => state.truck);
  const [availFrom, setAvailFrom] = useState<Date>(new Date());
  const [isDatePicker, setIsDatePicker] = useState<boolean>(false);
  const [isRefresh, setIsRefresh] = useState<boolean>(false);
  const style = useInventoryStyle();
  const {isOpen, onOpen, onClose} = useDisclose();
  const {
    value,
    style: {layout, gutter},
  } = useTheme();

  const [fourDateArray, setFourDateArray] = useState<any[]>([]);
  const [destination, setDestination] = useState<any>(null);
  const [origin, setOrigin] = useState<any>(null);
  const [truckCount, setTruckCount] = useState(1);
  const [metricTon, setMetricTon] = useState('9');
  const isFocus = useIsFocused();
  const toast = useToast();
  const inventoryStyle = useInventoryStyle();
  const [isSelectedFromDatePicker, setIsSelectedFromDatePicker] =
    useState<boolean>(false);
  const originRef = useRef<GooglePlacesAutocompleteRef>(null);
  const destinationRef = useRef<GooglePlacesAutocompleteRef>(null);
  useEffect(() => {
    setFourDateArray(getFourDatesFromToday());
    getInventoryList(userDetails?.user_id);
    getProfileBasedPreferdLoads(userDetails?.user_id);
  }, [isFocus]);
  const isDisbled = () => {
    if (origin && destination && truckCount && availFrom && metricTon)
      return true;
    else return false;
  };
  const handleSubmit = () => {
    if (origin && destination && truckCount && availFrom && metricTon) {
      const req = {
        origin: {
          name: origin?.name,
          latitude: origin?.lat,
          longitude: origin?.lng,
        },
        destination: {
          name: destination?.name,
          latitude: destination?.lat,
          longitude: destination?.lng,
        },
        metricTon,
        availabilityDate: moment(availFrom).format('YYYY-MM-DD'),
        numberOfTruck: truckCount,
        owner_id: userDetails?.user_id,
      };
      addInventory(req, (success, message) => {
        if (success) {
          toast.show({title: message});
          setDestination(null);
          setOrigin(null);
          setTruckCount(1);
          setAvailFrom(new Date());
          destinationRef.current?.setAddressText('');
          originRef.current?.setAddressText('');
        } else {
          toast.show({title: message});
        }
      });
    }
  };
  const handleUpdate = (_inventory: any, _id: string) => {
    const req = {
      inventory: _inventory,
      _id: _id,
    };
    updateInventory(req, (success, message) => {
      if (success) {
        toast.show({title: message});
        getInventoryList(userDetails?.user_id);
      } else {
        toast.show({title: message});
      }
    });
  };
  const handleDelete = (id: string) => {
    if (id) {
      deleteInventory(id, (success, message) => {
        if (success) {
          toast.show({title: message});
          getInventoryList(userDetails?.user_id);
        } else {
          toast.show({title: message});
        }
      });
    }
  };
  const onRefresh = React.useCallback(() => {
    setIsRefresh(true);
    getInventoryList(userDetails?.user_id);
    getProfileBasedPreferdLoads(userDetails?.user_id);
    sleep(2000).then(() => setIsRefresh(false));
  }, []);
  const isSame = (selectedDate: Date) => {
    const _availFrom = moment(availFrom).format('DD-MM-YYYY');
    const _selected = moment(new Date(selectedDate)).format('DD-MM-YYYY');
    const date1 = moment(_availFrom);
    const date2 = moment(_selected);
    return date1.isSame(date2);
  };
  const isSameWithDifferentDate = (selectedDate: Date, date: Date) => {
    const _availFrom = moment(date).format('DD-MM-YYYY');
    const _selected = moment(new Date(selectedDate)).format('DD-MM-YYYY');
    const date1 = moment(_availFrom);
    const date2 = moment(_selected);
    return date1.isSame(date2);
  };
  const isMatchWithFourDates = (selectedDate: Date) => {
    const _isSame = fourDateArray.some((ele) =>
      isSameWithDifferentDate(selectedDate, ele),
    );
    return _isSame;
  };
  return (
    <TruckBaseScreen
      profileType={userDetails?.profileType}
      scrollChildren={
        <React.Fragment>
          <View style={style.orderContainer}>
            <HeaderButton onPress={setTabName} tabName={tabName} />
          </View>
          {tabName === 'Invertory' ? (
            <>
              <AppText style={style.truckHeading}>
                {strings.inventory.inventoryHeading}
              </AppText>
              <View style={style.container}>
                <View style={style.routeSearch}>
                  <View style={style.origin}>
                    <View style={style.dot} />
                    <GooglePlaceInput
                      onTapPlace={(text, location) => {
                        setOrigin({
                          ...origin,
                          name: text,
                          ...location,
                        });
                        originRef.current?.setAddressText(text);
                      }}
                      style={style.inventoryInput}
                      value={origin?.name}
                      ref={originRef}
                      placeholder={strings.inventory.inventoryPlaceholderOrigin}
                    />
                    <View style={[style.originLine, {top: 20}]} />
                  </View>
                  <View style={[style.line, {height: 30}]} />
                  <View style={[style.origin, {marginTop: -20}]}>
                    <View
                      style={[
                        style.dot,
                        {
                          backgroundColor:
                            userDetails?.profileType == 'transporter'
                              ? value.color.transporter
                              : value.color.buttonNew,
                        },
                      ]}
                    />
                    <GooglePlaceInput
                      ref={destinationRef}
                      onTapPlace={(text, location) => {
                        setDestination({
                          ...destination,
                          name: text,
                          ...location,
                        });
                        destinationRef.current?.setAddressText(text);
                      }}
                      style={style.inventoryInput}
                      value={destination?.name}
                      placeholder={
                        strings.inventory.inventoryPlaceholderDestination
                      }
                    />
                  </View>
                  <AppText style={style.loadingAvailabilityText}>
                    {strings.inventory.loadingAvailability}
                  </AppText>

                  <View style={style.availabilityDatebtn}>
                    {isSelectedFromDatePicker ? (
                      <View>
                        <AppButton
                          onPress={() => {
                            setIsSelectedFromDatePicker(false);
                            setAvailFrom(new Date());
                          }}
                          buttonStyle={[
                            style.btn,
                            {
                              backgroundColor:
                                userDetails?.profileType == 'transporter'
                                  ? value.color.transporter
                                  : value.color.buttonNew,
                              maxWidth: 100,
                            },
                          ]}
                          textColor={value.color.white}
                          textStyle={style.dateBtnText}
                          label={formatDateToStringDateMonth(availFrom)}
                          icon={
                            <CloseCircleIcon
                              size={18}
                              color={value.color.white}
                            />
                          }
                        />
                      </View>
                    ) : (
                      <View
                        style={[
                          layout.rowVerticalCenter,
                          layout.justifyContentBetween,
                          gutter.gap.tiny,
                        ]}>
                        {fourDateArray.map((item) => (
                          <AppButton
                            key={item}
                            label={formatDateToStringDateMonth(item)}
                            buttonStyle={[
                              style.btn,
                              {
                                backgroundColor: isSame(item)
                                  ? userDetails?.profileType == 'transporter'
                                    ? value.color.transporter
                                    : value.color.buttonNew
                                  : value.color.transparent,
                              },
                            ]}
                            textColor={
                              isSame(item)
                                ? value.color.white
                                : value.color.uploadText
                            }
                            textStyle={style.dateBtnText}
                            onPress={() => {
                              setAvailFrom(item);
                              setIsSelectedFromDatePicker(false);
                            }}
                          />
                        ))}
                      </View>
                    )}
                    <View style={[layout.alignItemsEnd]}>
                      <AppButton
                        label={strings.inventory.buttonNames.date}
                        buttonStyle={[style.btn, style.dateBtn]}
                        textColor={value.color.uploadText}
                        textStyle={style.btnText}
                        leftIcon={<EvilIcon name="calendar" size={10} />}
                        onPress={() => {
                          setIsDatePicker(true);
                        }}
                      />
                    </View>
                  </View>
                  <View style={style.availabilityAddbtnCon}>
                    <View style={style.addIcon}>
                      <TouchableOpacity
                        onPress={() => {
                          setTruckCount((prev) => (prev > 1 ? prev - 1 : 1));
                        }}
                        style={style.minus}>
                        <MinusIcon />
                      </TouchableOpacity>
                      <AppText style={style.count}>{truckCount}</AppText>
                      <TouchableOpacity
                        onPress={() => {
                          setTruckCount((prev) => prev + 1);
                        }}
                        style={style.plus}>
                        <AddIcon />
                      </TouchableOpacity>
                    </View>
                    <AppButton
                      label={`${metricTon} ${strings.inventory.buttonNames.mt}`}
                      buttonStyle={[
                        style.availabilityAddbtn,
                        style.smallButton,
                      ]}
                      textColor={value.color.uploadText}
                      textStyle={style.availabilityAddbtnText}
                      onPress={onOpen}
                    />
                    <AppButton
                      isEnabled={isDisbled()}
                      label={strings.inventory.buttonNames.addAvailability}
                      buttonStyle={[
                        style.availabilityAddbtn,
                        {
                          backgroundColor: isDisbled()
                            ? userDetails?.profileType == 'transporter'
                              ? value.color.transporter
                              : value.color.buttonNew
                            : value.color.disableButton,
                          borderColor: isDisbled()
                            ? userDetails?.profileType == 'transporter'
                              ? value.color.transporter
                              : value.color.buttonNew
                            : value.color.disableButton,
                          paddingLeft: 10,
                          paddingRight: 10,
                        },
                      ]}
                      textColor={value.color.white}
                      textStyle={style.availabilityAddbtnText}
                      onPress={handleSubmit}
                    />
                  </View>
                </View>
                <View
                  style={[
                    layout.rowVerticalCenter,
                    layout.justifyContentBetween,
                    gutter.marginTop.large,
                  ]}>
                  <AppText style={style.truckAvail}>उपलब्ध ट्रक </AppText>
                  <AppTouchableOpacity
                    onPress={() => onRefresh()}
                    children={<RefreshIcon size={25} />}
                  />
                </View>
                <FlatList
                  data={inventory}
                  renderItem={({item}) => (
                    <InvertoryComponent
                      data={item}
                      handleSubmit={(_inventory: any) =>
                        handleUpdate(_inventory, item?._id)
                      }
                      handleDelete={(id: string) => handleDelete(id)}
                      profileType={userDetails?.profileType}
                      navigateTo={(data: any) =>
                        MatchedLoadContainer.navigate(data)
                      }
                    />
                  )}
                  onRefresh={onRefresh}
                  refreshing={isRefresh}
                  keyExtractor={(item, index) => 'key' + index}
                  ListEmptyComponent={
                    <View style={[layout.center, gutter.marginTop.regular]}>
                      <AppText mode="alternative">
                        {strings.inventory.noFound}
                      </AppText>
                    </View>
                  }
                />
              </View>
              {isDatePicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={availFrom}
                  mode="date"
                  is24Hour={true}
                  display="default"
                  onChange={(_value, selectedDate: any) => {
                    setIsDatePicker(false);
                    setAvailFrom(selectedDate);
                    if (isMatchWithFourDates(selectedDate)) {
                      setIsSelectedFromDatePicker(false);
                      return;
                    }
                    setIsSelectedFromDatePicker(true);
                  }}
                  minimumDate={new Date()}
                />
              )}
              <Actionsheet isOpen={isOpen} onClose={onClose}>
                <Actionsheet.Content style={{height: 300}}>
                  <ScrollView style={layout.fullWidth}>
                    {weightList.map((item) => (
                      <Actionsheet.Item
                        onPress={() => {
                          setMetricTon(item);
                          onClose();
                        }}
                        key={item}>
                        {item}
                      </Actionsheet.Item>
                    ))}
                  </ScrollView>
                </Actionsheet.Content>
              </Actionsheet>
            </>
          ) : (
            <View style={style.container}>
              <FlatList
                data={profileBasedLoads}
                renderItem={({item}) => <LoadCard data={item} />}
                onRefresh={onRefresh}
                refreshing={isRefresh}
                keyExtractor={(item, index) => 'key' + index}
                ListEmptyComponent={
                  <View style={[layout.center, gutter.marginTop.regular]}>
                    <AppText mode="alternative">
                      {strings.inventory.noFound}
                    </AppText>
                  </View>
                }
              />
            </View>
          )}
        </React.Fragment>
      }
    />
  );
};
InventoryContainer.SCREEN_NAME = 'InventoryContainer';
InventoryContainer.navigationOptions = {
  headerShown: false,
};
InventoryContainer.navigate = () => {
  RootNavigator.navigate(InventoryContainer.SCREEN_NAME);
};
export default InventoryContainer;
