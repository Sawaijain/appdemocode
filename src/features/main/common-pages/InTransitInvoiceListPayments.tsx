import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import BaseScreen from '@/features/base/screens/BaseScreen';
import RootNavigator, {navigationRef} from '@/libs/navigation/RootNavigation';
import {showAlert} from '@/components/Alert';
import Config from 'react-native-config';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {getDispatchDetails} from '@/redux/actions/LoadAction';
import {useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {AppText} from '@/components/AppText';
import {isObjectEmpty} from '@/libs';
import strings from '@/util/Strings';
import PaymentBill from '../loads/PaymentBill';
import ViewPodContainer from '../loads/ViewPod';
import {RootState, appDispatch} from '@/redux/AppStore';
import {getImageDocument} from '@/redux/reducers/userSlice';
const InTransitInvoiceListPayments = ({route}: NativeStackScreenProps<any>) => {
  const isFocused = useIsFocused();
  const {
    params: {orderId},
  }: any = route;
  useEffect(() => {
    if (orderId) {
      getDispatchDetails(orderId);
    }
  }, [orderId]);
  useEffect(() => {
    if (isFocused) {
      appDispatch(getImageDocument(''));
    }
  }, [isFocused]);
  const dispatchDetails = useSelector(
    (state: RootState) => state.load.dispatchDetails,
  );
  const showInvoice = (path: string) => {
    if (path && path.length > 0) {
      navigationRef.current?.navigate('ShowInvoiceInTransit', {
        fileName: `${Config.BASERRLZOOP}misc/getInvoicePDF?document_name=${path}`,
      });
    } else {
      showAlert({message: 'No copy generated from admin'});
    }
  };
  return (
    <BaseScreen>
      {dispatchDetails && !isObjectEmpty(dispatchDetails) && (
        <ScrollView>
          <React.Fragment>
            <View style={styles.button}>
              <View style={styles.seprateView} />
              <View style={styles.centerWithFlex}>
                <AppText style={styles.label}> कन्साइन कॉपी</AppText>
              </View>
              <TouchableOpacity
                onPress={() => {
                  showInvoice(dispatchDetails.consigneeInvoice);
                }}
                style={[styles.viewBtn, {marginRight: 0}]}>
                <AppText style={styles.viewBtnText}>देखे</AppText>
              </TouchableOpacity>
            </View>
            <View style={styles.button}>
              <View style={styles.seprateView} />
              <View style={styles.centerWithFlex}>
                <AppText style={styles.label}>ड्राइवर कॉपी</AppText>
              </View>
              <TouchableOpacity
                onPress={() => {
                  showInvoice(dispatchDetails.driverInvoice);
                }}
                style={[styles.viewBtn, {marginRight: 0}]}>
                <AppText style={styles.viewBtnText}>देखे</AppText>
              </TouchableOpacity>
            </View>
          </React.Fragment>
          {dispatchDetails && dispatchDetails.isPodUploaded && (
            <View style={styles.button}>
              <View style={styles.seprateView} />
              <View style={styles.centerWithFlex}>
                <AppText style={styles.label}>पीओडी</AppText>
              </View>
              <TouchableOpacity
                onPress={() => {
                  navigationRef.current?.navigate(
                    ViewPodContainer.SCREEN_NAME,
                    {
                      orderId,
                    },
                  );
                }}
                style={[styles.viewBtn, {marginRight: 0}]}>
                <AppText style={styles.viewBtnText}>देखे</AppText>
              </TouchableOpacity>
            </View>
          )}
          {(dispatchDetails.orderStatus === 'in-transit' ||
            dispatchDetails.orderStatus === 'balance pending)' ||
            dispatchDetails.orderStatus === 'completed' ||
            dispatchDetails.orderStatus === 'pending-dues') && (
            <View style={styles.button}>
              <View style={styles.seprateView} />
              <View style={styles.centerWithFlex}>
                <AppText style={styles.label}>{strings.receipt}</AppText>
              </View>
              <TouchableOpacity
                onPress={() => {
                  navigationRef.current?.navigate(PaymentBill.SCREEN_NAME, {
                    orderId,
                  });
                }}
                style={[styles.viewBtn, {marginRight: 0}]}>
                <AppText style={styles.viewBtnText}>देखे</AppText>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      )}
    </BaseScreen>
  );
};
InTransitInvoiceListPayments.SCREEN_NAME = 'InTransitInvoiceListPayments';
InTransitInvoiceListPayments.navigationOptions = {
  headerShown: false,
};
InTransitInvoiceListPayments.navigate = () => {
  RootNavigator.navigate(InTransitInvoiceListPayments.SCREEN_NAME);
};
export default InTransitInvoiceListPayments;

const styles = StyleSheet.create({
  button: {
    width: '95%',
    height: 70,
    borderRadius: 5,
    borderWidth: 1,
    marginVertical: 10,
    alignSelf: 'center',
    borderColor: '#bcbcbc',
    flexDirection: 'row',
  },
  seprateView: {
    width: 20,
    backgroundColor: '#1a1717',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    flex: 1,
    maxWidth: 20,
  },
  centerWithFlex: {justifyContent: 'center', flex: 1},
  label: {
    textAlign: 'center',
    fontSize: 18,
  },
  viewBtn: {
    justifyContent: 'center',
    backgroundColor: '#1a1717',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    flex: 1,
    maxWidth: 70,
    marginRight: 7,
  },
  viewBtnText: {
    alignSelf: 'center',
    fontSize: 16,
    color: 'white',
  },
  printBtn: {
    justifyContent: 'center',
    backgroundColor: '#1a1717',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    flex: 1,
    maxWidth: 70,
    marginRight: 0,
  },
});
