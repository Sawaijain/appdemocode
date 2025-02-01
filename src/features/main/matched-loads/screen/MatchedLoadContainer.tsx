import {View, StyleSheet, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import RootNavigator from '@/libs/navigation/RootNavigation';
import MatchedLoadHeader from '@/navigation/component/MatchedLoadHeader';
import TruckBaseScreen from '@/features/base/screens/TruckBaseScreen';
import {AppText} from '@/components/AppText';
import {useTheme} from '@/hooks/useTheme';
import Stopwatch from '@/assets/svgs/Stopwatch';
import AppButton from '@/components/AppButton';
import LoadCard from '../components/LoadCard';
import moment from 'moment';
import {getLocationLoads} from '@/redux/actions/LoadAction';
import {getQuery, sleep} from '@/libs';
import {useSelector} from 'react-redux';
import {RootState, appDispatch} from '@/redux/AppStore';
import {setLocationLoad} from '@/redux/reducers/loadSlice';
import {useIsFocused} from '@react-navigation/native';
import AppTouchableOpacity from '@/components/AppTouchableOpacity';
import {RefreshIcon} from '@/components/icons/Icon';
import {isUndefined} from 'lodash';

const MatchedLoadContainer = (props: any) => {
  const {userDetails} = useSelector((state: RootState) => state.auth);
  const {
    route: {params},
  }: any = props;
  const {
    value: {color},
    style: {layout, gutter},
  } = useTheme();
  const style = useStyle();
  const isFocus = useIsFocused();
  const [isRefresh, setIsRefresh] = useState<boolean>(false);
  const getWeight = () => {
    let metricTonValues: number[] = [];
    if (params?.data && params?.data?.inventory?.length > 0)
      for (const item of params?.data?.inventory) {
        metricTonValues.push(item?.metricTon);
      }
    return metricTonValues;
  };
  useEffect(() => {
    if (
      !isUndefined(params?.data) &&
      params?.data?.origin?.name &&
      params?.data?.origin?.latitude &&
      params?.data?.origin?.longitude &&
      params?.data?.destination?.name &&
      params?.data?.availabilityDate
    ) {
      const req = {
        originName: params?.data?.origin?.name,
        originLatitude: params?.data?.origin?.latitude,
        originlongitude: params?.data?.origin?.longitude,
        destinationName: params?.data?.destination?.name,
        preferredWeight: getWeight()?.toString(),
        availabilityDate: params?.data?.availabilityDate,
      };
      getLocationLoads(getQuery(req));
    }
    return () => {
      appDispatch(setLocationLoad([]));
    };
  }, [isFocus, params?.data]);
  const locationLoads = useSelector(
    (state: RootState) => state.load.locationLoads,
  );
  const onRefresh = React.useCallback(() => {
    appDispatch(setLocationLoad([]));
    const req = {
      originName: params?.data?.origin?.name,
      originLatitude: params?.data?.origin?.latitude,
      originlongitude: params?.data?.origin?.longitude,
      destinationName: params?.data?.destination?.name,
      preferredWeight: getWeight()?.toString(),
      availabilityDate: params?.data?.availabilityDate,
    };
    setIsRefresh(true);
    getLocationLoads(getQuery(req));
    sleep(2000).then(() => setIsRefresh(false));
  }, [params?.data]);
  return (
    <React.Fragment>
      <MatchedLoadHeader data={params?.data} />
      <TruckBaseScreen
        profileType={userDetails?.profileType}
        scrollChildren={
          <View style={gutter.paddingHorizontal.regular}>
            <View style={[layout.row, gutter.marginTop.regular]}>
              <View style={layout.fill}>
                <AppText style={style.date}>
                  {moment(params?.data?.availabilityDate).format('LL')}
                </AppText>
                <View style={[layout.rowVerticalCenter, gutter.marginTop.tiny]}>
                  <Stopwatch />
                  <AppText style={style.time}>
                    {moment(params?.data?.createdAt).format('hh:mm a')}
                  </AppText>
                </View>
              </View>
              <View>
                <AppText style={style.weight}>
                  {getWeight()?.toString()} MT
                </AppText>
              </View>
            </View>
            <View
              style={[
                layout.rowVerticalCenter,
                gutter.marginTop.tableRowHeight,
                gutter.marginBottom.large,
                layout.justifyContentBetween,
              ]}>
              <AppButton
                buttonStyle={style.outlineButton}
                label={`${locationLoads?.length} लोड`}
                textColor={
                  userDetails?.profileType === 'transporter'
                    ? color.transporter
                    : color.buttonNew
                }
              />
              <AppTouchableOpacity
                onPress={onRefresh}
                children={<RefreshIcon size={25} />}
              />
            </View>
            <FlatList
              data={locationLoads}
              renderItem={({item}) => <LoadCard data={item} />}
              keyExtractor={(item, index) => index?.toString()}
              nestedScrollEnabled={false}
              onRefresh={onRefresh}
              refreshing={isRefresh}
            />
          </View>
        }
      />
    </React.Fragment>
  );
};
MatchedLoadContainer.SCREEN_NAME = 'MatchedLoadContainer';
MatchedLoadContainer.navigationOptions = {
  tabBarVisible: false,
};
MatchedLoadContainer.navigate = (data: any) => {
  RootNavigator.navigate(MatchedLoadContainer.SCREEN_NAME, {data});
};
export default MatchedLoadContainer;

function useStyle() {
  const {
    style: {layout, gutter},
    value: {color},
  } = useTheme();
  const {userDetails} = useSelector((state: RootState) => state.auth);
  return StyleSheet.create({
    time: {
      fontSize: 18,
      fontWeight: '400',
      color: color.uploadText,
      ...gutter.marginLeft.tiny,
    },
    date: {
      fontSize: 18,
      fontWeight: '400',
    },
    weight: {
      fontSize: 22,
      fontWeight: '400',
    },
    outlineButton: {
      backgroundColor: 'rgba(217, 217, 217, 0.33)',
      borderWidth: 1,
      borderColor:
        userDetails?.profileType === 'transporter'
          ? color.transporter
          : color.buttonNew,
      borderRadius: 5,
      paddingLeft: 12,
      paddingRight: 12,
    },
  });
}
