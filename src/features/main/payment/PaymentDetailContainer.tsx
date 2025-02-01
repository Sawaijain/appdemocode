import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import TruckBaseScreen from '@/features/base/screens/TruckBaseScreen';
import RootNavigator, {navigationRef} from '@/libs/navigation/RootNavigation';
import DetailHeader from './components/DetailHeader';
import strings from '@/util/Strings';
import {AppText} from '@/components/AppText';
import {useTheme} from '@/hooks/useTheme';
import {AppFontFamily, normalize} from '@/theme/Utils';
import PodList from './components/PodList';
import AppButton from '@/components/AppButton';
import {RootNavigationParam} from '@/features/base/interfaces/interfaces';
import {filteredDate, getCommodityLanguage} from '@/libs';
import NumberSeparatorInstance from '@/libs/ConvertNumber';
import {RootState, appDispatch} from '@/redux/AppStore';
import {getImageDocument} from '@/redux/reducers/userSlice';
import {useIsFocused} from '@react-navigation/native';
import PaymentBill from '../loads/PaymentBill';
import {useSelector} from 'react-redux';

const PaymentDetailContainer = ({
  route: {params},
}: RootNavigationParam<Record<any, any>>) => {
  const style = useStyle();
  const isFocused = useIsFocused();
  const {userDetails} = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    if (isFocused) {
      appDispatch(getImageDocument(''));
    }
  }, [isFocused]);

  return (
    <TruckBaseScreen
      profileType={userDetails?.profileType}
      scrollChildren={
        <React.Fragment>
          <DetailHeader title={strings.tabs.payment} data={params?.data} />
          <View style={style.container}>
            <PaymentCard data={params?.data} />
            <PodList
              podData={[
                {[strings.arrive]: params?.data?.podArrivedUrl},
                {[strings.receipt]: params?.data?.podReceiptUrl},
                {[`${strings.addDoc} 1`]: params?.data?.podAdditional1Url},
                {[`${strings.addDoc} 2`]: params?.data?.podAdditional2Url},
              ]}
            />
            <View style={style.buttonContainer}>
              <AppButton
                onPress={() =>
                  navigationRef.current?.navigate(PaymentBill.SCREEN_NAME, {
                    orderId: params?.data?.orderId,
                  })
                }
                buttonStyle={style.button}
                label={strings.receipt}
              />
            </View>
            {params?.data?.podConfirmStatus !== 'accepted' && (
              <AppText style={style.textStyle}>
                POD अपलोड कर दिया गया है. सत्यापन प्रगति पर है
              </AppText>
            )}
          </View>
        </React.Fragment>
      }
    />
  );
};
PaymentDetailContainer.SCREEN_NAME = 'PaymentDetailContainer';
PaymentDetailContainer.navigate = (data: any) => {
  RootNavigator.navigate(PaymentDetailContainer.SCREEN_NAME, {data});
};
PaymentDetailContainer.navigationOptions = {
  headerShown: false,
};
export default PaymentDetailContainer;

const PaymentCard = ({data}: {data?: any}) => {
  const style = useStyle();
  const totalFreight =
    Number(data?.weight || data?.weightActual) *
    Number(data?.carrierFinalRate || data?.finalRate);
  return (
    <View style={style.paymentCard}>
      <View style={style.paymentCardInner}>
        <AppText style={style.cardText}>
          लोडिंग - {filteredDate(data?.dispatchDate)}
        </AppText>
        <AppText style={style.cardText}>अकाउंट पेय</AppText>
      </View>
      <View style={style.paymentCardInner}>
        <AppText style={style.cardText}>
          {getCommodityLanguage(data?.commodityType)},{' '}
          {data?.weight || data?.weightActual} MT
        </AppText>
        <AppText style={style.cardText}>
          ₹ {data?.carrierFinalRate || data?.finalRate}/MT
        </AppText>
      </View>
      <View style={style.paymentCardInner}>
        <AppText style={style.cardText}>{data?.vehicleNumber}</AppText>
        <AppText style={style.cardText}>
          संपूर्ण भाड़ा -{' '}
          <AppText
            style={style.price}>{` ${NumberSeparatorInstance.numberSeparator(
            totalFreight,
          )}`}</AppText>
        </AppText>
      </View>
    </View>
  );
};
function useStyle() {
  const {
    style: {layout, gutter},
    value: {color},
  } = useTheme();
  const {userDetails} = useSelector((state: RootState) => state.auth);
  return StyleSheet.create({
    container: {
      ...gutter.paddingHorizontal.normal,
    },
    paymentCard: {
      backgroundColor: color.gray50,
      ...gutter.paddingHorizontal.regular,
      ...gutter.paddingVertical.normal,
      borderRadius: normalize(10),
    },
    paymentCardInner: {
      ...layout.rowVerticalCenter,
      ...layout.justifyContentBetween,
      ...gutter.marginBottom.normal,
    },
    cardText: {
      color: color.tabText,
    },
    price: {
      color:
        userDetails?.profileType === 'transporter'
          ? color.transporter
          : color.buttonNew,
      fontFamily: AppFontFamily.ROBOTOMEDIUM,
    },
    buttonContainer: {
      ...layout.center,
    },
    button: {
      backgroundColor:
        userDetails?.profileType === 'transporter'
          ? color.transporter
          : color.buttonNew,
    },
    textStyle: {
      ...layout.rowHorizontalCenter,
      ...gutter.marginTop.small,
      fontSize: normalize(18),
    },
  });
}
