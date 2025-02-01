import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {AppText} from '@/components/AppText';
import strings from '@/util/Strings';
import {useTheme} from '@/hooks/useTheme';
import {AppFontFamily, normalize} from '@/theme/Utils';
import {useInventoryStyle} from '../../Inventory/Styles/useInventoryStyle';
import {getCommodityLanguage} from '@/libs';
import NumberSeparatorInstance from '@/libs/ConvertNumber';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/AppStore';

const PaymentWeightCommodity = ({data}: any) => {
  const style = useStyle();
  const inventoryStyle = useInventoryStyle();
  const totalFreight = Number(data?.weight || 0) * Number(data?.rate || 0);
  const {userDetails} = useSelector((state: RootState) => state.auth);
  return (
    <React.Fragment>
      <View style={style.container}>
        <View style={style.left}>
          <AppText style={style.accountPay}>
            {getCommodityLanguage(data?.commodity)}, {data?.weight}MT
          </AppText>
          <AppText style={style.advance}>
            {strings.details.advance}{' '}
            <AppText
              style={[
                style.advance,
                {
                  color:
                    userDetails?.profileType === 'transporter'
                      ? style.color.transporter
                      : style.color.buttonNew,
                },
              ]}>{`${data?.advancePercentage}%`}</AppText>
          </AppText>
          <AppText style={style.advance}>
            {data?.tripType === 'Account Pay'
              ? strings.account_pay
              : strings.to_pay}
          </AppText>
        </View>
        <View style={style.right}>
          <AppText style={style.commodity}>
            {NumberSeparatorInstance.numberSeparator(data?.rate)}/MT
          </AppText>
          <AppText style={[style.weight, {textAlign: 'right'}]}>
            कुल भाड़ा
            <AppText
              style={[
                style.weight,
                {
                  color:
                    userDetails?.profileType === 'transporter'
                      ? style.color.transporter
                      : style.color.buttonNew,
                },
              ]}>{` ${NumberSeparatorInstance.numberSeparator(
              totalFreight,
            )}`}</AppText>
          </AppText>
        </View>
      </View>
      <View style={inventoryStyle.hrLine} />
    </React.Fragment>
  );
};

export default PaymentWeightCommodity;
function useStyle() {
  const {
    style: {layout, gutter},
    value: {color},
  } = useTheme();
  const {userDetails} = useSelector((state: RootState) => state.auth);
  return {
    ...StyleSheet.create({
      container: {
        ...layout.row,
        ...gutter.paddingHorizontal.regular,
        ...gutter.marginTop.regular,
        ...gutter.paddingBottom.large,
      },
      left: {
        ...layout.fill,
      },
      right: {},
      accountPay: {
        fontSize: normalize(18),
        fontFamily: AppFontFamily.ROBOTOMEDIUM,
        color: color.tabText,
      },
      advance: {
        fontSize: normalize(18),
        fontFamily: AppFontFamily.ROBOTOMEDIUM,
        ...gutter.marginVertical.tiny,
        color: color.tabText,
      },
      commodity: {
        fontSize: normalize(18),
        fontFamily: AppFontFamily.ROBOTOMEDIUM,
        textAlign: 'right',
        color:
          userDetails?.profileType === 'transporter'
            ? color.transporter
            : userDetails?.profileType === 'transporter'
            ? color.transporter
            : color.buttonNew,
      },
      weight: {
        ...gutter.marginVertical.tiny,
        fontSize: normalize(16),
        fontFamily: AppFontFamily.ROBOTOMEDIUM,
        color: color.tabText,
      },
    }),
    color: color,
  };
}
