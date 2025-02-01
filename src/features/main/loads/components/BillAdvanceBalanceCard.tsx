import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {useTheme} from '@/hooks/useTheme';
import {AppFontFamily} from '@/theme/Utils';
import {AppText} from '@/components/AppText';
import NumberSeparatorInstance from '@/libs/ConvertNumber';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/AppStore';
import AppAccordeon from '@/components/Accordeon';
import moment from 'moment';

const BillAdvanceBalanceCard = ({title, data}: {title: string; data: any}) => {
  const {box, innerBox, heading, right, amount, date, tId} = useStyle();
  const getPaymentType = (type: any) => {
    let _type = '';
    if (type == 'cheque') {
      _type = 'चेक';
    } else if (type == 'online') {
      _type = 'ऑनलाइन ';
    } else {
      _type = 'कैश ';
    }
    return _type;
  };
  return (
    <React.Fragment>
      <AppAccordeon
        title={title}
        children={
          <React.Fragment>
            <View style={box}>
              <View style={innerBox}>
                <AppText style={heading} mode="contact">
                  राशि
                </AppText>
                <AppText style={heading} mode="contact">
                  माध्यम
                </AppText>
                <AppText style={heading} mode="contact">
                  टिप्पणी
                </AppText>
                <AppText style={heading} mode="contact">
                  तारीख़
                </AppText>
              </View>
              {data &&
                data?.history &&
                data?.history?.length > 0 &&
                data?.history?.map(
                  (ele: any, index: React.Key | null | undefined) => (
                    <View key={index} style={innerBox}>
                      <AppText style={heading} mode="contact">
                        {NumberSeparatorInstance.numberSeparator(
                          Math.round(ele?.amount),
                        )}
                      </AppText>
                      <AppText style={heading} mode="contact">
                        {getPaymentType(ele?.paymentMode)}
                      </AppText>
                      <AppText style={heading} mode="contact">
                        {ele?.remark}
                      </AppText>
                      <AppText style={heading} mode="contact">
                        {moment(ele?.transactionDate).format('DD-MM-YYYY')}
                      </AppText>
                    </View>
                  ),
                )}
            </View>
          </React.Fragment>
        }
      />
    </React.Fragment>
  );
};

export default BillAdvanceBalanceCard;
function useStyle() {
  const {
    style: {layout, gutter},
    value: {color, fontSize},
  } = useTheme();
  const {userDetails} = useSelector((state: RootState) => state.auth);
  return StyleSheet.create({
    box: {
      ...gutter.padding.regular,
      backgroundColor: color.gray50,
      ...gutter.marginBottom.regular,
      borderRadius: 10,
    },
    innerBox: {
      ...layout.row,
      ...gutter.marginBottom.small,
    },
    heading: {
      fontFamily: AppFontFamily.ROBOTOMEDIUM,
      fontSize: fontSize.alternative,
      ...layout.fill,
    },
    right: {
      ...layout.alignItemsEnd,
    },
    amount: {
      color:
        userDetails?.profileType === 'transporter'
          ? color.transporter
          : color.buttonNew,
      fontSize: fontSize.alternative + 2,
      fontFamily: AppFontFamily.ROBOTOBOLD,
      ...gutter.marginBottom.small,
    },
    date: {
      fontSize: fontSize.alternative + 2,
      color: color.tabText,
    },
    tId: {
      fontSize: fontSize.footprint,
      color: color.black,
    },
  });
}
