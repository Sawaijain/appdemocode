import {View, ScrollView, SafeAreaView, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import RootNavigator from '@/libs/navigation/RootNavigation';
import MapViewComponent from '../components/MapViewComponent';
import {RootNavigationParam} from '@/features/base/interfaces/interfaces';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from '@/hooks/useTheme';
import Star from '@/assets/svgs/Star';
import ShareIcon from '@/assets/svgs/ShareIcon';
import Copy from '@/assets/svgs/Copy';
import {AppText} from '@/components/AppText';
import AppTouchableOpacity from '@/components/AppTouchableOpacity';
import {normalize} from '@/theme/Utils';
import Details from '../components/Details';
import PaymentWeightCommodity from '../components/PaymentWeightCommodity';
import ImportantNotes from '../components/ImportantNotes';
import AppButton from '@/components/AppButton';
import {useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/AppStore';
import {getLoadWithStatus} from '@/redux/actions/LoadAction';
import {getQuery} from '@/libs';
import NumberSeparatorInstance from '@/libs/ConvertNumber';
import strings from '@/util/Strings';
import BookTruckContainer from './BookTruckContainer';

const OrderDetailContainer = ({
  route: {
    params: {data, laneData},
  },
}: RootNavigationParam<Record<any, any>>) => {
  const insets = useSafeAreaInsets();
  const style = useStyle();
  const isFocus = useIsFocused();
  const {userDetails}: any = useSelector((state: RootState) => state.auth);
  const loadDataWithStatus: any = useSelector(
    (state: RootState) => state.load.loadDataWithStatus,
  );
  useEffect(() => {
    getLoad();
  }, [isFocus]);
  const getLoad = () => {
    const req = {
      origin: laneData?.origin,
      destination: laneData?.destination,
      commodity: laneData?.commodityType,
      tripType: laneData?.tripType,
      carrier_id: userDetails?.user_id,
    };
    getLoadWithStatus(getQuery(req));
  };
  const handleRequestLoad = () => {
    BookTruckContainer.navigate({data, laneData: laneData}, false);
  };
  return (
    <SafeAreaView
      style={[
        style.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}>
      <ScrollView>
        <MapViewComponent
          origin={{origin: data?.origin, location: data?.originLocation}}
          destination={{
            destination: data?.destination,
            location: data?.destinationLocation,
          }}
        />
        <View style={style.upperView}>
          {/* <View style={style.upperViewLeft}>
            <Star />
            <View style={style.space}>
              <Copy />
            </View>
            <AppText style={style.orderId}>{data?.orderId}</AppText>
          </View>
          <AppTouchableOpacity
            style={style.upperViewRight}
            children={<ShareIcon />}
          /> */}
        </View>
        <Details
          data={{
            origin: data?.origin,
            destination: data?.destination,
            loadingDate: data?.dispatchDate,
          }}
        />
        <PaymentWeightCommodity
          data={{
            advancePercentage: data?.advancePercentage || '70',
            weight: laneData?.totalWeight,
            commodity: data?.commodityType,
          }}
        />
        <ImportantNotes data={undefined} />
      </ScrollView>
      <View style={style.buttonContainer}>
        <AppText
          style={[style.layout.fill, style.gutter.marginLeft.regular]}
          mode="defaultBold">
          {NumberSeparatorInstance.numberSeparator(
            data?.finalRate || data?.targetRate,
          )}
          /MT
        </AppText>
        {/* <AppButton
          textColor={
            userDetails?.profileType === 'transporter'
              ? style.color.transporter
              : style.color.buttonNew
          }
          buttonStyle={style.leftButton}
          label={``}
        /> */}
        {loadDataWithStatus?.truckDetails &&
        loadDataWithStatus?.truckDetails?.length > 0 ? (
          <AppText
            style={[
              style.layout.fill,
              style.layout.textAlignCenter,
              style.font.textUnderline,
              {fontSize: 18},
            ]}
            mode="alternative">
            {strings.requested}
          </AppText>
        ) : (
          <AppButton
            textColor={style.color.white}
            buttonStyle={style.rightButton}
            label={strings.send_request}
            onPress={handleRequestLoad}
          />
        )}
      </View>
    </SafeAreaView>
  );
};
OrderDetailContainer.SCREEN_NAME = 'OrderDetailContainer';
OrderDetailContainer.navigationOptions = {
  headerShown: false,
};
OrderDetailContainer.navigate = (data: any, laneData?: any) => {
  RootNavigator.navigate(OrderDetailContainer.SCREEN_NAME, {data, laneData});
};
export default OrderDetailContainer;
function useStyle() {
  const {
    style: {layout, gutter, font},
    value: {color},
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
      },
      buttonContainer: {
        ...layout.rowVerticalCenter,
        ...gutter.paddingVertical.regular,
        ...gutter.paddingHorizontal.regular,
        ...gutter.gap.small,
      },
      leftButton: {
        backgroundColor: color.transparent,
        borderWidth: 1,
        borderRadius: 5,
        borderColor:
          userDetails?.profileType === 'transporter'
            ? color.transporter
            : color.buttonNew,
        height: normalize(60),
        ...layout.fill,
        paddingLeft: 10,
        paddingRight: 10,
      },
      rightButton: {
        borderRadius: 5,
        backgroundColor:
          userDetails?.profileType === 'transporter'
            ? color.transporter
            : color.buttonNew,
        ...gutter.marginLeft.regular,
        height: normalize(60),
        ...layout.fill,
        paddingLeft: 10,
        paddingRight: 10,
      },
    }),
    color: color,
    layout: layout,
    gutter: gutter,
    font: font,
  };
}
