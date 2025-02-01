import BaseScreen from '@/features/base/screens/BaseScreen';
import RootNavigator from '@/libs/navigation/RootNavigation';
import React, {useEffect, useRef, useState} from 'react';
import {FlatList, Image, RefreshControl, ScrollView, View} from 'react-native';
import {useSelector} from 'react-redux';
import FooterButtons from './components/FooterButton';
import {useIsFocused} from '@react-navigation/native';
import {
  doRequestForLoad,
  doSubmitTruck,
  getCarrierLoads,
  getCarrierRequestedLoads,
} from '@/redux/actions/LoadAction';
import {getTruckList} from '@/redux/actions/TruckAction';
import PageNav from '@/components/PageNav';
import strings from '@/util/Strings';
import LoadpostComponent from './components/LoadpostComponent';
import {useTheme} from '@/hooks/useTheme';
import LoadpostRequests from './components/LoadpostRequests';
import IMAGE_URL from '@/theme/ImageUrl';
import AppButton from '@/components/AppButton';
import {normalize} from '@/theme/Utils';
import {showAlert} from '@/components/Alert';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import componentStyles from './components/ComponentStyles';
import {AppText} from '@/components/AppText';
import AppTouchableOpacity from '@/components/AppTouchableOpacity';
import SelectTruckModal from './components/SelectTruckModal';
import Toaster from '@/libs/toasterService';
import RenderEmpty from '@/components/RenderEmpty';
import {RootState, appDispatch} from '@/redux/AppStore';
import {
  getLoadListRequested,
  getTempRequestedLoads,
} from '@/redux/reducers/loadSlice';
interface LoadContainerProps {}
const wait = (timeout: number | undefined) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
const LoadContainer = (props: LoadContainerProps) => {
  const {
    userDetails: {user_id, owner_name, assignedTo},
  }: any = useSelector((state: RootState) => state.auth);
  const {loadsData, requestedLoads, tempRequestedLoads} = useSelector(
    (state: RootState) => state.load,
  );
  const {truckData} = useSelector((state: RootState) => state.truck);
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const [tabs, setTabs] = useState<string>('loadPost');
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);
  const [carrierTripType, setCarrierTripType] = useState<string>('current');
  const [requestLoadData, setRequestLoadData] = useState<Array<[]>>([]);
  const [activeLoadData, setActiveLoadData] = useState<Array<[]>>([]);
  const [trucks, setTrucks] = useState<Array<[]>>([]);
  const [selectedLoad, setSelectedLoad] = useState<any>({});
  const [isModalShown, setIsModalShown] = useState<boolean>(false);
  const [driverName, setDriverName] = useState<string>('');
  const [driverNumber, setDriverNumber] = useState<string>('');
  const [selectedTruck, setSelectedTruck] = useState<string>('');
  useEffect(() => {
    if (isFocused) {
      getCarrierLoads(user_id);
      getTruckList(user_id);
    }
    return () => {
      appDispatch(getTempRequestedLoads([]));
      appDispatch(getLoadListRequested([]));
    };
  }, [isFocused]);
  useEffect(() => {
    if (truckData && truckData.length > 0) {
      const _truck = truckData.filter(
        (e: {vehicle: {deleted: boolean}}) => e.vehicle.deleted === false,
      );
      setTrucks([..._truck?.reverse()]);
    }
  }, [truckData]);
  const onRefresh = React.useCallback(() => {
    appDispatch(getTempRequestedLoads([]));
    appDispatch(getLoadListRequested([]));
    setRefreshing(true);
    wait(1000).then(() => {
      if (tabs == 'loadPost') {
        getCarrierLoads(user_id);
      } else if (tabs == 'myTrips') {
        getCarrierRequestedLoads(user_id);
      }
      setRefreshing(false);
    });
  }, [tabs, refreshing]);
  const {
    style: {layout, gutter, font},
    value: {color, fontSize},
  } = useTheme();
  useEffect(() => {
    if (tabs == 'loadPost') {
      getCarrierLoads(user_id);
    } else if (tabs == 'myTrips') {
      getCarrierRequestedLoads(user_id);
    }
    return () => {
      appDispatch(getTempRequestedLoads([]));
      appDispatch(getLoadListRequested([]));
    };
  }, [tabs]);
  useEffect(() => {
    if (loadsData && loadsData.length > 0) {
      setActiveLoadData([...loadsData]);
    }
  }, [loadsData]);
  useEffect(() => {
    if (requestedLoads && requestedLoads.length > 0) {
      setRequestLoadData([...requestedLoads]);
    }
  }, [requestedLoads]);
  useEffect(() => {
    if (carrierTripType == 'current') {
      if (tempRequestedLoads && tempRequestedLoads.length > 0) {
        let _loads = tempRequestedLoads?.filter(
          (e: any) =>
            e.carrier_quotations?.status === 'requested' ||
            e.carrier_quotations?.status === 'accepted' ||
            e.carrier_quotations.status === 'driver_data_updation' ||
            e.carrier_quotations.status === 'driver_data_updation_done',
        );
        setRequestLoadData([..._loads]);
      }
    } else if (carrierTripType == 'history') {
      if (tempRequestedLoads && tempRequestedLoads.length > 0) {
        let _loads = tempRequestedLoads?.filter(
          (e: any) =>
            e.carrier_quotations?.status === 'completed' ||
            e.carrier_quotations?.status === 'rejected' ||
            (e?.foPayments[0]?.transactionStatus == 'completed' &&
              e?.foPayments[0]?.transactionStatus == 'completed'),
        );

        setRequestLoadData([..._loads]);
      }
    }
  }, [carrierTripType, tempRequestedLoads]);
  const callBack = (success: boolean, message?: string) => {
    if (success) {
      appDispatch(getTempRequestedLoads([]));
      appDispatch(getLoadListRequested([]));
      showAlert({message: message});
      setTabs('myTrips');
      setCarrierTripType('current');
      setIsModalShown(false);
      setDriverName('');
      setDriverNumber('');
      setSelectedTruck('');
      getCarrierRequestedLoads(user_id);
    } else if (!success) {
      showAlert({message: message});
    }
  };
  const sendReqForLoad = async (item: any) => {
    let _data = {
      orderId: item?.orderId,
      carrier_id: user_id,
      origin: item?.origin,
      destination: item?.destination,
      carrier_name: owner_name,
    };
    doRequestForLoad(_data, callBack);
  };
  function updateCarrier(item: any) {
    setSelectedLoad(item);
    setIsModalShown(true);
  }
  function updateCarrierLoad() {
    if (selectedTruck && driverNumber.length == 10) {
      const _data = {
        order_id: selectedLoad.orderId,
        carrier_id: user_id,
        selected_truck: selectedTruck,
        driver_number: driverNumber,
        driver_name: driverName,
        carrierAgentCode: assignedTo || '',
      };
      doSubmitTruck(_data, callBack);
    } else {
      Toaster.show('कृपया सभी फ़ील्ड भरें');
    }
  }

  return (
    <React.Fragment>
      <BaseScreen>
        <PageNav
          header={
            tabs == 'loadPost'
              ? strings.load_post.trim()
              : strings.my_trip.trim()
          }
        />
        <View style={[gutter.marginHorizontal.small, layout.fill]}>
          {tabs == 'loadPost' && (
            <FlatList
              data={activeLoadData}
              keyExtractor={(item: any, index) => index?.toString()}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}: any) => (
                <LoadpostComponent
                  origin={item?.origin}
                  destination={item?.destination}
                  onPress={() => {
                    sendReqForLoad(item);
                  }}
                  item={item}
                  {...props}
                  key={index?.toString()}
                />
              )}
            />
          )}
          {tabs == 'myTrips' && (
            <React.Fragment>
              <View
                style={[layout.rowVerticalCenter, gutter.marginVertical.small]}>
                <View style={layout.fill}>
                  <Image
                    source={IMAGE_URL.filterCarrier}
                    style={{
                      height: normalize(30),
                      width: normalize(30),
                      resizeMode: 'contain',
                    }}
                  />
                </View>
                <AppButton
                  onPress={() => setCarrierTripType('current')}
                  buttonStyle={[
                    layout.fill,
                    gutter.marginHorizontal.small,
                    {
                      backgroundColor:
                        carrierTripType == 'current'
                          ? color.black
                          : color.white,
                    },
                  ]}
                  label={strings.active}
                  textColor={
                    carrierTripType !== 'current' ? color.black : color.white
                  }
                />
                <AppButton
                  onPress={() => setCarrierTripType('history')}
                  buttonStyle={[
                    layout.fill,
                    {
                      backgroundColor:
                        carrierTripType == 'history'
                          ? color.black
                          : color.white,
                    },
                  ]}
                  label={strings.history}
                  textColor={
                    carrierTripType !== 'history' ? color.black : color.white
                  }
                />
              </View>
              <FlatList
                data={requestLoadData}
                keyExtractor={(item: any, index) => index?.toString()}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                showsVerticalScrollIndicator={false}
                renderItem={({item, index}: any) => (
                  <LoadpostRequests
                    origin={item?.origin}
                    destination={item?.destination}
                    updateLoadPostdata={() => updateCarrier(item)}
                    item={item}
                    {...props}
                    key={index?.toString()}
                    onPress={() => {
                      sendReqForLoad(item);
                    }}
                  />
                )}
                ListEmptyComponent={
                  <RenderEmpty title="अभी तक कोई शिपमेंट नहीं !" />
                }
              />
            </React.Fragment>
          )}
        </View>
      </BaseScreen>
      <ActionSheet
        containerStyle={componentStyles.actionSheet}
        ref={actionSheetRef}>
        <View style={{marginTop: 20}}>
          <ScrollView>
            {trucks &&
              trucks.length > 0 &&
              trucks.map((type: any, i: number) => (
                <AppTouchableOpacity
                  key={i?.toString()}
                  style={{alignItems: 'center'}}
                  onPress={() => {
                    actionSheetRef.current?.hide();
                    setSelectedTruck(type.vehicle.rc_number);
                  }}
                  children={
                    <AppText style={componentStyles.actionSheetDefaultButton}>
                      {type.vehicle.rc_number}
                    </AppText>
                  }
                />
              ))}
          </ScrollView>
        </View>
      </ActionSheet>
      {isModalShown && (
        <SelectTruckModal
          modalVisible={isModalShown}
          onPressCloseModal={function (): void {
            setIsModalShown(false);
          }}
          onPressTruckModalVisiable={function (): void {
            actionSheetRef.current?.show();
          }}
          updateCarrierLoad={updateCarrierLoad}
          selectedTruck={selectedTruck}
          driverNumber={driverNumber}
          driverName={driverName}
          setDriverNumber={setDriverNumber}
          setDriverName={setDriverName}
        />
      )}
      <FooterButtons
        isLoadTabActive={tabs == 'loadPost'}
        isMyTripTabActive={tabs == 'myTrips'}
        onPress={setTabs}
      />
    </React.Fragment>
  );
};
LoadContainer.SCREEN_NAME = 'LoadContainer';
LoadContainer.navigate = () => {
  RootNavigator.navigate(LoadContainer.SCREEN_NAME);
};
export default LoadContainer;
