import {AppText} from '@/components/AppText';
import CustomButon from '@/components/CustomButon';
import {useTheme} from '@/hooks/useTheme';
import {getCommodityLanguage} from '@/libs';
import NumberSeparatorInstance from '@/libs/ConvertNumber';
import {navigationRef} from '@/libs/navigation/RootNavigation';
import strings from '@/util/Strings';
import moment from 'moment';
import React, {memo, useEffect, useState} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import InTransitInvoiceListPayments from '../../common-pages/InTransitInvoiceListPayments';
import IMAGE_URL from '@/theme/ImageUrl';
const PaymentComponent = ({onPressPod = Function, loads, navigation}: any) => {
  var [weightActual, setWeightActual] = useState(0);
  var [finalRateLoad, setFinalRateLoad] = useState(0);
  const {
    style: {layout, gutter},
  } = useTheme();
  useEffect(() => {
    if (loads.weightActual) {
      setWeightActual(loads.weightActual);
    } else {
      setWeightActual(loads.weight);
    }
  }, [weightActual]);
  useEffect(() => {
    if (loads.finalRate) {
      setFinalRateLoad(loads.finalRate);
    } else {
      setFinalRateLoad(loads.targetRate);
    }
  }, [finalRateLoad]);

  return (
    <View>
      <View style={style.container}>
        <View style={[layout.row, layout.alignItemsStart]}>
          <View style={layout.fill}>
            <AppText style={style.fs} mode="defaultBold">
              #{loads.orderId}
            </AppText>
            <AppText style={style.fs} mode="defaultBold">
              {moment(loads?.orderDate).format('DD-MM-YYYY')}
            </AppText>
          </View>
          <View style={[layout.fill, layout.alignItemsEnd]}>
            <AppText style={style.fs}>
              {loads?.tripType === 'Account Pay'
                ? strings.account_pay
                : strings.to_pay}
            </AppText>
            <AppText style={style.fs}>
              {loads.weightActual ? loads.weightActual : loads.weight}MT |{' '}
              {getCommodityLanguage(loads.commodityType)}
            </AppText>
          </View>
        </View>
        <View
          style={[
            layout.row,
            layout.alignItemsStart,
            gutter.marginTop.regular,
          ]}>
          <View style={{...layout.fill, maxWidth: 180}}>
            {loads?.carrier_quotations?.status === 'accepted' ? (
              <AppText style={style.fs} mode="alternative">
                {loads?.vehicleNumber}
              </AppText>
            ) : (
              <AppText style={style.fs} mode="alternative">
                {loads?.maskedOrigin}
              </AppText>
            )}
          </View>
          <View style={{paddingLeft: 0, ...layout.fill, maxWidth: 50}}>
            <Image
              style={{height: 30, width: 30, resizeMode: 'contain'}}
              source={IMAGE_URL.sidedArrow}
            />
          </View>
          <View
            style={{
              paddingLeft: 0,
              ...layout.fill,
              ...layout.alignItemsStart,
              maxWidth: 200,
            }}>
            <AppText style={style.fs} mode="alternative">
              {loads?.maskedDestination}
            </AppText>
          </View>
        </View>
        <View style={{paddingBottom: 0}}>
          <View>
            {loads && loads?.foPayments?.length > 0 ? (
              loads &&
              loads?.foPayments[0]?.transactionStatus === 'completed' &&
              loads?.foPayments[1]?.transactionStatus === 'completed' ? (
                loads?.foPayments?.length > 0 ? (
                  <>
                    <AppText
                      mode="defaultBold"
                      style={{
                        fontSize: 16,
                        paddingVertical: 3,
                      }}>
                      {strings.advancePay} :{' '}
                      {NumberSeparatorInstance.numberSeparator(
                        Math.round(loads && loads?.foPayments[0]?.amount),
                      )}
                    </AppText>
                    <AppText
                      mode="defaultBold"
                      style={{
                        fontSize: 16,
                        paddingVertical: 3,
                      }}>
                      {'पूर्ण भुगतान'} :{' '}
                      {NumberSeparatorInstance.numberSeparator(
                        Math.round(loads && loads?.foPayments[1]?.amount),
                      )}
                    </AppText>
                  </>
                ) : null
              ) : loads?.foPayments?.length > 0 ? (
                <>
                  <AppText
                    mode="defaultBold"
                    style={{
                      fontSize: 16,
                      paddingVertical: 3,
                    }}>
                    {strings.advancePay} :
                    {NumberSeparatorInstance.numberSeparator(
                      Math.round(loads && loads?.foPayments[0]?.amount),
                    )}
                  </AppText>
                  <AppText
                    mode="defaultBold"
                    style={{
                      fontSize: 16,
                      paddingVertical: 3,
                    }}>
                    {strings.dueComplete} :{' '}
                    {NumberSeparatorInstance.numberSeparator(
                      Math.round(loads && loads?.foPayments[1]?.amount),
                    )}
                  </AppText>
                </>
              ) : null
            ) : null}
            <AppText
              mode="defaultBold"
              style={{fontSize: 16, paddingVertical: 3}}>
              {strings.total_rs} :{' '}
              {NumberSeparatorInstance.numberSeparator(
                Math.round(finalRateLoad * weightActual),
              )}
            </AppText>
          </View>
        </View>
        <View style={[layout.rowVerticalCenter, gutter.marginTop.small]}>
          {!loads.isPodUploaded ? (
            <View
              style={{
                ...layout.fill,
                ...layout.alignItemsStart,
              }}>
              <View>
                <CustomButon
                  text={strings.podUpload}
                  onPress={() => onPressPod(loads.orderId)}
                  backgroundColor="#121212"
                  color={'white'}
                  width={150}
                  height={35}
                  isFont
                  marginTop={0}
                />
              </View>
            </View>
          ) : null}
          <View
            style={{
              ...layout.fill,
              ...layout.alignItemsEnd,
            }}>
            <CustomButon
              text={strings.bilty}
              onPress={() => {
                navigationRef.current?.navigate(
                  InTransitInvoiceListPayments.SCREEN_NAME,
                  {orderId: loads.orderId},
                );
              }}
              backgroundColor="#121212"
              color={'white'}
              height={35}
              isFont
              marginTop={0}
              width={100}
            />
          </View>
        </View>
      </View>
    </View>
  );
};
export default memo(PaymentComponent);
const style = StyleSheet.create({
  container: {
    marginHorizontal: 0,
    marginVertical: 5,
    backgroundColor: '#f5f6f6',
    paddingHorizontal: 10,
    paddingTop: 10,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 5,
    borderWidth: 3,
    borderColor: '#C8CBCB',
  },
  fs: {
    fontSize: 15,
  },
});
