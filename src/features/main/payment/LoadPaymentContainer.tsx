import {View, StyleSheet, FlatList, RefreshControl} from 'react-native';
import React, {useEffect, useState} from 'react';
import RootNavigator from '@/libs/navigation/RootNavigation';
import TruckBaseScreen from '@/features/base/screens/TruckBaseScreen';
import {useTheme} from '@/hooks/useTheme';
import PaymentCard from './components/PaymentCard';
import AppButton from '@/components/AppButton';
import FilterIcon from '@/assets/svgs/FilterIcon';
import strings from '@/util/Strings';
import HeaderButton from './components/HeaderButton';
import {RootState, appDispatch, useAppSelector} from '@/redux/AppStore';
import {useIsFocused} from '@react-navigation/native';
import {getCarrierPaymentLoads} from '@/redux/actions/LoadAction';
import {getPaymentLoadList} from '@/redux/reducers/loadSlice';
import RenderEmpty from '@/components/RenderEmpty';
import {useSelector} from 'react-redux';
const wait = (timeout: number | undefined) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
const LoadPaymentContainer = () => {
  const [tabName, setTabName] = useState<'advance' | 'balance'>('advance');
  const style = useStyle();
  const isFocused = useIsFocused();
  const {
    userDetails: {user_id},
  }: any = useAppSelector((state: RootState) => state.auth);
  const {
    value: {color},
    style: {layout, gutter},
  } = useTheme();
  const {userDetails} = useSelector((state: RootState) => state.auth);
  const {paymentLods} = useAppSelector((state: RootState) => state.load);
  const [loads, setLoads] = useState<Array<[]>>([]);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    if (isFocused) {
      getCarrierPaymentLoads(user_id);
    }
  }, [isFocused]);
  useEffect(() => {
    if (tabName == 'advance') {
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
  }, [paymentLods, tabName]);
  const onRefresh = React.useCallback(() => {
    appDispatch(getPaymentLoadList([]));
    setRefreshing(true);
    wait(1000).then(() => {
      getCarrierPaymentLoads(user_id);
      setRefreshing(false);
    });
  }, [refreshing]);
  return (
    <TruckBaseScreen
      profileType={userDetails?.profileType}
      children={
        <View style={style.orderContainer}>
          <HeaderButton onPress={setTabName} tabName={tabName} />
          <View style={style.filterWrap}>
            <AppButton
              label={strings.filter}
              icon={
                <FilterIcon
                  color={
                    userDetails?.profileType == 'transporter'
                      ? style.color.transporter
                      : style.color.buttonNew
                  }
                />
              }
              textColor={
                userDetails?.profileType == 'transporter'
                  ? style.color.transporter
                  : style.color.buttonNew
              }
              buttonStyle={[
                style.filterButton,
                {
                  borderColor:
                    userDetails?.profileType === 'transporter'
                      ? color.transporter
                      : color.buttonNew,
                },
              ]}
            />
          </View>
          <FlatList
            data={loads}
            renderItem={({item}) => <PaymentCard item={item} />}
            keyExtractor={(item, index) => index?.toString()}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListEmptyComponent={
              <RenderEmpty title="अभी तक कोई शिपमेंट नहीं !" />
            }
            ListFooterComponent={<View />}
            ListFooterComponentStyle={{height: 200}}
          />
        </View>
      }
    />
  );
};
LoadPaymentContainer.SCREEN_NAME = 'LoadPaymentContainer';
LoadPaymentContainer.navigate = () => {
  RootNavigator.navigate(LoadPaymentContainer.SCREEN_NAME);
};
export default LoadPaymentContainer;
function useStyle() {
  const {
    style: {layout, gutter},
    value: {color},
  } = useTheme();
  return {
    ...StyleSheet.create({
      orderContainer: {
        ...gutter.marginHorizontal.regular,
      },
      filterWrap: {
        ...layout.alignItemsEnd,
        ...gutter.marginVertical.regular,
      },
      filterButton: {
        backgroundColor: color.transparent,
        borderWidth: 1,

        borderRadius: 8,
        paddingLeft: 12,
        paddingRight: 12,
      },
    }),
    color: color,
  };
}
