import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {useTheme} from '@/hooks/useTheme';
import {AppText} from '@/components/AppText';
import {AppFontFamily, normalize} from '@/theme/Utils';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/AppStore';

const VehicleInfo = ({
  orderid,
  vehicleNumber,
}: {
  orderid: string;
  vehicleNumber: string;
}) => {
  const style = useStyle();
  return (
    <View style={style.upperBox}>
      <View style={style.upperInner}>
        <AppText mode="alternative">आर्डर - {orderid}</AppText>
        <AppText style={style.truckNumber}>{vehicleNumber}</AppText>
      </View>
    </View>
  );
};

export default VehicleInfo;
function useStyle() {
  const {
    style: {layout, gutter},
    value: {color},
  } = useTheme();
  const {userDetails} = useSelector((state: RootState) => state.auth);
  return StyleSheet.create({
    upperBox: {
      backgroundColor: color.lightWhite,
      overflow: 'hidden',
      borderRadius: 10,
      ...gutter.paddingVertical.small,
      ...gutter.paddingHorizontal.regular,
      ...gutter.marginVertical.large,
      ...gutter.marginHorizontal.regular,
      borderWidth: 1,
      borderColor:
        userDetails?.profileType === 'transporter'
          ? color.transporter
          : color.buttonNew,
    },
    upperInner: {
      ...layout.rowVerticalCenter,
      ...layout.justifyContentBetween,
    },
    truckNumber: {
      fontSize: normalize(16),
      fontFamily: AppFontFamily.ROBOTOMEDIUM,
    },
  });
}
