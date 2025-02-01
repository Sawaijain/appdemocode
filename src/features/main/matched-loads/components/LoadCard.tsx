import {View, LayoutChangeEvent, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import Star from '@/assets/svgs/Star';
import Copy from '@/assets/svgs/Copy';
import {AppText} from '@/components/AppText';
import {useTheme} from '@/hooks/useTheme';
import {AppFontFamily, normalize} from '@/theme/Utils';
import {useInventoryStyle} from '../../Inventory/Styles/useInventoryStyle';
import moment from 'moment';
import {getCommodityLanguage} from '@/libs';
import strings from '@/util/Strings';
import AppTouchableOpacity from '@/components/AppTouchableOpacity';
import OrderDetailContainer from '../screen/OrderDetailContainer';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/AppStore';

const LoadCard = ({data}: {data: any}) => {
  const {userDetails} = useSelector((state: RootState) => state.auth);
  const style = useStyle();
  const inventoryStyle = useInventoryStyle();
  const {
    value: {color},
  } = useTheme();
  const [viewDimensions, setViewDimensions] = useState({width: 0, height: 0});
  const onViewLayout = (event: LayoutChangeEvent) => {
    const {width, height} = event.nativeEvent.layout;
    setViewDimensions({width, height});
  };
  return (
    <AppTouchableOpacity
      onPress={() => OrderDetailContainer.navigate(data?.loads[0], data)}
      activeOpacity={0.8}
      children={
        <View style={style.box}>
          <View style={style.upperView}>
            <AppText style={[style.upperViewRight, {textAlign: 'right'}]}>
              {moment(data?.createdAt).format('LL')}
            </AppText>
          </View>
          <View style={style.middleview}>
            <View
              onLayout={onViewLayout}
              style={[inventoryStyle.locationContainer, style.fill]}>
              <View style={inventoryStyle.origin}>
                <View style={[inventoryStyle.dot, {top: 7}]} />
                <AppText
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={[
                    inventoryStyle.originLocation,
                    {fontSize: normalize(18)},
                  ]}>
                  {data?.origin?.replace(', India', '')}
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
                      backgroundColor:
                        userDetails?.profileType === 'transporter'
                          ? color.transporter
                          : color.buttonNew,
                    },
                  ]}
                />
                <AppText
                  style={[
                    inventoryStyle.originLocation,
                    {fontSize: normalize(18)},
                  ]}>
                  {data?.destination?.replace(', India', '')}
                </AppText>
              </View>
            </View>
            <View>
              <AppText style={style.price}>₹{data?.maxTargetRate}/MT</AppText>
              {/* <AppText style={style.bonus}>+ बोनस - ₹50/MT*</AppText> */}
            </View>
          </View>
          <View style={style.bottomView}>
            <View style={style.weightWrap}>
              <AppText style={style.weight}>{data?.totalWeight} MT,</AppText>
              <AppText style={style.commodity}>
                {getCommodityLanguage(data?.commodityType)}
              </AppText>
            </View>
            <AppText style={style.tripType}>
              {data?.tripType === 'Account Pay'
                ? strings.account_pay
                : strings.to_pay}
            </AppText>
          </View>
        </View>
      }
    />
  );
};

export default LoadCard;
function useStyle() {
  const {
    style: {layout, gutter},
    value: {color},
  } = useTheme();
  const {userDetails} = useSelector((state: RootState) => state.auth);
  return StyleSheet.create({
    box: {
      borderWidth: 2,
      borderColor:
        userDetails?.profileType === 'transporter'
          ? color.transporter
          : color.buttonNew,
      ...gutter.paddingVertical.small,
      ...gutter.paddingHorizontal.regular,
      borderRadius: 10,
      ...gutter.marginBottom.regular,
    },
    upperView: {
      ...layout.rowVerticalCenter,
      ...layout.justifyContentEnd,
      ...gutter.marginBottom.large,
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
      ...gutter.marginBottom.large,
      ...gutter.gap.regular,
    },
    fill: layout.fill,
    price: {
      fontSize: normalize(26),
      fontFamily: AppFontFamily.ROBOTOBLACK,
    },
    bonus: {
      fontSize: normalize(17),
      fontWeight: '400',
      color:
        userDetails?.profileType === 'transporter'
          ? color.transporter
          : color.buttonNew,
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
