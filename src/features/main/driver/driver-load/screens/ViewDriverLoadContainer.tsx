import {View, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import RootNavigator from '@/libs/navigation/RootNavigation';
import {RootNavigationParam} from '@/features/base/interfaces/interfaces';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from '@/hooks/useTheme';
import MapViewComponent from '@/features/main/matched-loads/components/MapViewComponent';
import {AppText} from '@/components/AppText';
import {AppFontFamily, normalize} from '@/theme/Utils';
import DetailLoadCard from '../components/DetailLoadCard';
import {getCommodityLanguage} from '@/libs';
import NumberSeparatorInstance from '@/libs/ConvertNumber';
import strings from '@/util/Strings';

const ViewDriverLoadContainer = ({
  route: {
    params: {data},
  },
}: RootNavigationParam<Record<any, any>>) => {
  const insets = useSafeAreaInsets();
  const style = useStyle();
  var [weightActual, setWeightActual] = useState(0);
  var [finalRateLoad, setFinalRateLoad] = useState(0);

  useEffect(() => {
    if (data?.weightActual) {
      setWeightActual(data?.weightActual);
    } else {
      setWeightActual(data?.weight);
    }
  }, [weightActual]);
  useEffect(() => {
    if (data?.carrierFinalRate) {
      setFinalRateLoad(data?.carrierFinalRate);
    } else {
      setFinalRateLoad(data?.targetRate);
    }
  }, [finalRateLoad]);

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
          isDriverPage
        />
        <View style={style.orderWrap}>
          <View style={style.upperBox}>
            <View style={style.upperInner}>
              <AppText mode="alternative">आर्डर - {data?.orderId}</AppText>
              <AppText style={style.truckNumber}>{data?.vehicleNumber}</AppText>
            </View>
          </View>
          <DetailLoadCard item={data} />
          <View style={style.hrLine} />
          <View style={[style.upperInner, style.space]}>
            <AppText style={style.commodity}>
              {getCommodityLanguage(data?.commodityType)},{' '}
              {data?.weightActual || data?.weight} MT
            </AppText>
            <AppText style={style.commodity}>
              {NumberSeparatorInstance.numberSeparator(
                data?.carrierFinalRate || data?.finalRate,
              )}{' '}
              MT
            </AppText>
          </View>
          <View style={[style.upperInner, style.space]}>
            <AppText style={style.commodity}>
              {data?.tripType === 'Account Pay'
                ? strings.account_pay
                : strings.to_pay}
            </AppText>
            <AppText style={style.price}>
              कुल भाड़ा -{' '}
              <AppText
                mode="defaultBold"
                style={[style.price, {color: style.color.driver}]}>
                {NumberSeparatorInstance.numberSeparator(
                  Math.round(finalRateLoad * weightActual),
                )}
              </AppText>
            </AppText>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
ViewDriverLoadContainer.SCREEN_NAME = 'ViewDriverLoadContainer';
ViewDriverLoadContainer.navigationOptions = {
  headerShown: false,
};
ViewDriverLoadContainer.navigate = (data: any) => {
  RootNavigator.navigate(ViewDriverLoadContainer.SCREEN_NAME, {data});
};
export default ViewDriverLoadContainer;
function useStyle() {
  const {
    style: {layout, gutter, font},
    value: {color},
  } = useTheme();
  return {
    ...StyleSheet.create({
      container: {
        ...layout.container,
      },
      orderWrap: {
        shadowColor: color.black,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: color.white,
        ...gutter.paddingHorizontal.normal,
        ...gutter.paddingVertical.tableRowHeight,
        ...gutter.marginHorizontal.normal,
        ...gutter.marginBottom.normal,
        marginTop: -30,
        borderRadius: 12,
      },
      upperBox: {
        ...gutter.paddingVertical.small,
        ...gutter.paddingHorizontal.regular,
        ...gutter.marginBottom.normal,
        borderWidth: 1,
        borderColor: color.driverColor,
        borderRadius: 8,
      },
      upperInner: {
        ...layout.rowVerticalCenter,
        ...layout.justifyContentBetween,
      },
      truckNumber: {
        fontSize: normalize(16),
        fontFamily: AppFontFamily.ROBOTOMEDIUM,
      },
      hrLine: {
        height: 1,
        ...layout.fullWidth,
        backgroundColor: color.driverBorder,
        ...gutter.marginBottom.large,
      },
      space: {
        ...gutter.marginBottom.tiny,
      },
      commodity: {
        fontSize: normalize(18),
        color: color.tabText,
      },
      price: {
        fontSize: normalize(18),
        ...layout.textAlignEnd,
        color: color.tabText,
      },
    }),
    color: color,
    layout: layout,
    font: font,
  };
}
