import {View, StyleSheet} from 'react-native';
import React from 'react';
import {AppText} from '@/components/AppText';
import {useTheme} from '@/hooks/useTheme';
import {AppFontFamily, normalize} from '@/theme/Utils';
import strings from '@/util/Strings';
import AppTouchableOpacity from '@/components/AppTouchableOpacity';
import EyeIcon from '@/assets/svgs/EyeIcon';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/AppStore';
const invoiceList = [strings.invoices.consignee, strings.invoices.driver];
const InvoiceList = ({
  invoices,
  showInvoice,
}: {
  invoices: any;
  showInvoice: (path: string) => void;
}) => {
  const style = useStyle();
  const {userDetails} = useSelector((state: RootState) => state.auth);
  return (
    <View style={style.podWrap}>
      <View style={style.upperBox}>
        <View style={style.upperInner}>
          <AppText mode="alternative">{strings.bilty}</AppText>
        </View>
      </View>
      <View>
        {invoiceList.map((item, index) => (
          <View key={index} style={style.podList}>
            <AppText mode="alternative">{item}</AppText>
            <AppTouchableOpacity
              onPress={() =>
                showInvoice(index == 0 ? invoices?.consignee : invoices?.driver)
              }
              children={
                <EyeIcon
                  color={
                    userDetails?.profileType === 'transporter'
                      ? style.color.transporter
                      : style.color.buttonNew
                  }
                />
              }
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default InvoiceList;
function useStyle() {
  const {
    style: {layout, gutter},
    value: {color},
  } = useTheme();
  return {
    ...StyleSheet.create({
      podWrap: {
        borderWidth: 1,
        borderColor: color.border,
        borderRadius: 10,
        ...gutter.marginVertical.large,
      },
      upperBox: {
        backgroundColor: color.lightWhite,
        overflow: 'hidden',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        ...gutter.paddingVertical.small,
        ...gutter.paddingHorizontal.regular,
      },
      upperInner: {
        ...layout.rowVerticalCenter,
        ...layout.justifyContentBetween,
      },
      truckNumber: {
        fontSize: normalize(16),
        fontFamily: AppFontFamily.ROBOTOMEDIUM,
      },
      podList: {
        ...gutter.paddingHorizontal.regular,
        ...layout.rowVerticalCenter,
        ...layout.justifyContentBetween,
        ...gutter.paddingVertical.regular,
        borderBottomWidth: 1,
        borderBottomColor: color.border,
      },
    }),
    color,
  };
}
