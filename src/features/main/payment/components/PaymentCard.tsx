import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {useTheme} from '@/hooks/useTheme';
import {AppFontFamily, normalize} from '@/theme/Utils';
import {useInventoryStyle} from '../../Inventory/Styles/useInventoryStyle';
import {AppText} from '@/components/AppText';
import AppTouchableOpacity from '@/components/AppTouchableOpacity';
import PaymentDetailContainer from '../PaymentDetailContainer';
import NumberSeparatorInstance from '@/libs/ConvertNumber';
import {filteredDate} from '@/libs';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/AppStore';
import strings from '@/util/Strings';
import AppButton from '@/components/AppButton';
import {navigationRef} from '@/libs/navigation/RootNavigation';
import PaymentBill from '../../loads/PaymentBill';

const PaymentCard = ({item}: {item: any}) => {
  const {userDetails} = useSelector((state: RootState) => state.auth);
  const style = useStyle();
  const inventoryStyle = useInventoryStyle();
  const {
    value: {color},
  } = useTheme();
  return (
    <AppTouchableOpacity
      onPress={() => {
        PaymentDetailContainer.navigate(item);
      }}
      activeOpacity={0.8}
      children={
        <View style={style.box}>
          <View style={style.upperBox}>
            <View style={style.upperInner}>
              <AppText mode="alternative">आर्डर - {item?.orderId}</AppText>
              <AppText mode="alternative">{item?.vehicleNumber}</AppText>
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
                  {item?.destination?.replace(', India', '')}
                </AppText>
              </View>
            </View>
            <View>
              <View style={style.weightWrap}>
                <AppText style={style.weight}>
                  लोडिंग - {filteredDate(item?.dispatchDate)}
                </AppText>
                <AppText style={style.commodity}>
                  संपूर्ण भाड़ा -{' '}
                  <AppText
                    mode="alternative"
                    style={{
                      color:
                        userDetails?.profileType === 'transporter'
                          ? color.transporter
                          : color.buttonNew,
                    }}>
                    {NumberSeparatorInstance.numberSeparator(
                      item?.payments?.reduce(function (
                        previousValue: any,
                        currentValue: any,
                      ) {
                        return previousValue?.amount + currentValue?.amount;
                      }) + item?.tdsAmount,
                    )}
                  </AppText>
                </AppText>
                <AppText mode="defaultBold" style={style.commodity}>
                  {item?.tripType === 'Account Pay'
                    ? strings.account_pay
                    : strings.to_pay}
                </AppText>
              </View>
            </View>
          </View>
          {[
            'in-transit',
            'balance pending',
            'completed',
            'pending-dues',
          ].includes(item?.orderStatus) && (
            <View style={style.buttonWrap}>
              <AppButton
                buttonStyle={style.leftButton}
                textColor={
                  userDetails?.profileType === 'transporter'
                    ? color.transporter
                    : color.buttonNew
                }
                label={strings.receipt}
                onPress={() => {
                  navigationRef.current?.navigate(PaymentBill.SCREEN_NAME, {
                    orderId: item?.orderId,
                  });
                }}
              />
            </View>
          )}
        </View>
      }
    />
  );
};

export default PaymentCard;

function useStyle() {
  const {
    style: {layout, gutter},
    value: {color},
  } = useTheme();
  const {userDetails} = useSelector((state: RootState) => state.auth);
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
      ...gutter.marginTop.small,
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
    buttonWrap: {
      ...layout.rowCenter,
      backgroundColor: color.white,
      ...gutter.gap.small,
      ...gutter.paddingVertical.small,
    },
    leftButton: {
      backgroundColor: color.transparent,
      borderWidth: 1,
      borderColor:
        userDetails?.profileType === 'transporter'
          ? color.transporter
          : color.buttonNew,
    },
  });
}
