import {View, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTheme} from '@/hooks/useTheme';
import {AppText} from '@/components/AppText';
import AppTouchableOpacity from '@/components/AppTouchableOpacity';
import {normalize, AppFontFamily} from '@/theme/Utils';
import {useInventoryStyle} from '@/features/main/Inventory/Styles/useInventoryStyle';
import moment from 'moment';
import {getCommodityLanguage} from '@/libs';
import NumberSeparatorInstance from '@/libs/ConvertNumber';
import ViewDriverLoadContainer from '../screens/ViewDriverLoadContainer';

const DriverLoadComponent = ({item}: {item: any}) => {
  const style = useStyle();
  const inventoryStyle = useInventoryStyle();
  const {
    value: {color},
  } = useTheme();
  var [weightActual, setWeightActual] = useState(0);
  var [finalRateLoad, setFinalRateLoad] = useState(0);

  useEffect(() => {
    if (item?.weightActual) {
      setWeightActual(item?.weightActual);
    } else {
      setWeightActual(item?.weight);
    }
  }, [weightActual]);
  useEffect(() => {
    if (item?.carrierFinalRate) {
      setFinalRateLoad(item?.carrierFinalRate);
    } else {
      setFinalRateLoad(item?.targetRate);
    }
  }, [finalRateLoad]);
  return (
    <AppTouchableOpacity
      onPress={() => ViewDriverLoadContainer.navigate(item)}
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
                  {borderStyle: 'solid', height: 45},
                ]}
              />
              <View style={[inventoryStyle.origin, {marginTop: -10}]}>
                <View
                  style={[
                    inventoryStyle.dot,
                    {top: 7, backgroundColor: color.driver},
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
            <View style={style.right}>
              <View style={style.weightWrap}>
                <AppText style={style.weight}>
                  लोडिंग - {moment(item?.dispatchDate).format('DD/MM/YYYY')}
                </AppText>
                <AppText style={style.commodity}>
                  {getCommodityLanguage(item?.commodityType)},{' '}
                  {item?.weightActual || item?.weight} MT
                </AppText>
                <AppText style={style.price}>
                  कुल भाड़ा -{' '}
                  <AppText
                    mode="defaultBold"
                    style={[style.price, {color: color.driver}]}>
                    {NumberSeparatorInstance.numberSeparator(
                      Math.round(finalRateLoad * weightActual),
                    )}
                  </AppText>
                </AppText>
              </View>
            </View>
          </View>
        </View>
      }
    />
  );
};

export default DriverLoadComponent;
function useStyle() {
  const {
    style: {layout, gutter},
    value: {color},
  } = useTheme();
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
      color: color.driver,
    },
    bottomView: {
      ...layout.row,
    },
    weightWrap: {
      ...layout.fill,
      ...layout.column,
      ...gutter.gap.small,
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
    right: {
      ...layout.column,
      ...gutter.gap.small,
    },
  });
}
