import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {AppText} from '@/components/AppText';
import strings from '@/util/Strings';
import {useTheme} from '@/hooks/useTheme';
import {AppFontFamily, normalize} from '@/theme/Utils';
import {useInventoryStyle} from '../../Inventory/Styles/useInventoryStyle';
import {getCommodityLanguage} from '@/libs';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/AppStore';

const PaymentWeightCommodity = ({data}: any) => {
  const style = useStyle();
  const inventoryStyle = useInventoryStyle();
  return (
    <React.Fragment>
      <View style={style.container}>
        <View style={style.left}>
          <AppText style={style.accountPay}>
            {strings.details.accountPay}
          </AppText>
          <AppText style={style.advance}>
            {strings.details.advance} {`${data?.advancePercentage}%`}
          </AppText>
          <AppText style={style.advance}>
            {strings.details.balance} 7 दिन
          </AppText>
        </View>
        <View style={style.right}>
          <AppText style={style.commodity}>
            {getCommodityLanguage(data?.commodity)}{' '}
          </AppText>
          <AppText style={style.weight}>{data?.weight}MT </AppText>
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
  return StyleSheet.create({
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
    },
    advance: {
      fontSize: normalize(18),
      fontFamily: AppFontFamily.ROBOTOMEDIUM,
      ...gutter.marginVertical.tiny,
    },
    commodity: {
      fontSize: normalize(18),
      fontFamily: AppFontFamily.ROBOTOMEDIUM,
      textAlign: 'right',
      color:
        userDetails?.profileType === 'transporter'
          ? color.transporter
          : color.buttonNew,
    },
    weight: {
      ...gutter.marginVertical.tiny,
      fontSize: normalize(16),
      fontFamily: AppFontFamily.ROBOTOMEDIUM,
    },
  });
}
