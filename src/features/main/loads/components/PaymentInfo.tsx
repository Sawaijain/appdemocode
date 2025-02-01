import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {useTheme} from '@/hooks/useTheme';
import {AppFontFamily, normalize} from '@/theme/Utils';
import {AppText} from '@/components/AppText';
import strings from '@/util/Strings';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/AppStore';

const PaymentInfo = ({data}: {data: any[]}) => {
  const {box, upperBox, heading, innerBox, paymentText, amountText} =
    useStyle();
  return (
    <View style={box}>
      <View style={upperBox}>
        <AppText style={heading}>{strings.payment}</AppText>
        <AppText style={heading}>{strings.amount}</AppText>
      </View>
      {data &&
        data?.map((item, index) => (
          <View key={index} style={innerBox}>
            {Object.keys(item)?.map((ele, idx) => (
              <React.Fragment key={idx}>
                <AppText style={paymentText}>{ele}</AppText>
                <AppText style={amountText}>{item[ele]}</AppText>
              </React.Fragment>
            ))}
          </View>
        ))}
    </View>
  );
};

export default PaymentInfo;
function useStyle() {
  const {
    style: {layout, gutter},
    value: {color, fontSize},
  } = useTheme();
  const {userDetails} = useSelector((state: RootState) => state.auth);
  return {
    ...StyleSheet.create({
      box: {
        borderWidth: 1,
        borderColor: color.receiptBorder,
        borderRadius: normalize(11),
        ...gutter.padding.regular,
        backgroundColor: color.white,
        ...gutter.marginHorizontal.regular,
        ...gutter.marginBottom.regular,
      },
      upperBox: {
        borderBottomWidth: 1,
        borderBottomColor: color.receiptBorder,
        ...layout.rowVerticalCenter,
        ...layout.justifyContentBetween,
        ...gutter.marginBottom.small,
        ...gutter.paddingBottom.small,
      },
      heading: {
        color:
          userDetails?.profileType === 'transporter'
            ? color.transporter
            : color.buttonNew,
        fontSize: fontSize.regular,
      },
      paymentText: {
        color: color.tabText,
        fontSize: fontSize.alternative + 2,
      },
      amountText: {
        color: color.black,
        fontSize: fontSize.alternative + 2,
        fontFamily: AppFontFamily.ROBOTOMEDIUM,
      },
      innerBox: {
        ...layout.rowVerticalCenter,
        ...layout.justifyContentBetween,
        ...gutter.marginBottom.regular,
      },
    }),
  };
}
