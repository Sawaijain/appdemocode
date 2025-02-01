import {View, StyleSheet} from 'react-native';
import React from 'react';
import {AppText} from '@/components/AppText';
import {useTheme} from '@/hooks/useTheme';
import {AppFontFamily, normalize} from '@/theme/Utils';
import AppTouchableOpacity from '@/components/AppTouchableOpacity';
import {useInventoryStyle} from '@/features/main/Inventory/Styles/useInventoryStyle';
import moment from 'moment';

const DetailLoadCard = ({item}: {item?: any}) => {
  const style = useStyle();
  const inventoryStyle = useInventoryStyle();
  const {
    value: {color},
  } = useTheme();
  return (
    <AppTouchableOpacity
      activeOpacity={0.8}
      children={
        <View style={style.box}>
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
                      backgroundColor: color.driver,
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
            <View style={style.right}>
              <AppText style={style.price}>
                लोडिंग - {moment(item?.dispatchDate).format('DD/MM/YYYY')}
              </AppText>
              <AppText style={style.bonus}>{item?.vehicleNumber}</AppText>
            </View>
          </View>
        </View>
      }
    />
  );
};

export default DetailLoadCard;
function useStyle() {
  const {
    style: {layout, gutter},
    value: {color},
  } = useTheme();
  return StyleSheet.create({
    box: {
      ...gutter.paddingVertical.normal,
      ...gutter.paddingHorizontal.regular,
      borderRadius: 10,
      ...gutter.marginBottom.regular,
      backgroundColor: color.driverLoadBg,
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
    },
    right: {
      ...layout.column,
      ...gutter.gap.small,
    },
    fill: layout.fill,
    price: {
      fontSize: normalize(18),
      color: color.tabText,
      ...layout.textAlignEnd,
    },
    bonus: {
      fontSize: normalize(17),
      color: color.tabText,
      ...layout.textAlignEnd,
    },
    bottomView: {
      ...layout.row,
    },
    weightWrap: {
      ...layout.fill,
      ...layout.row,
    },
    weight: {
      color: color.disableButton,
      fontFamily: AppFontFamily.ROBOTOBLACK,
    },
    commodity: {
      ...gutter.paddingLeft.small,
    },
    tripType: {
      color: color.disableButton,
      fontSize: normalize(22),
    },
  });
}
