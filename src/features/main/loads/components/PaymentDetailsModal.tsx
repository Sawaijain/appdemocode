import {AppText} from '@/components/AppText';
import NumberSeparatorInstance from '@/libs/ConvertNumber';
import moment from 'moment';
import React, {memo} from 'react';
import {View, StyleSheet, Dimensions, ScrollView} from 'react-native';
import Modal from 'react-native-modal';

const PaymentBillModal = ({
  modalVisible,
  onClose,
  currentLoad,
  paymentType,
}: any) => {
  let _isPaymentArray = currentLoad?.foPayments?.find(
    (ele: any) => ele.paymentType == paymentType,
  );

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
    <Modal
      animationIn="bounce"
      isVisible={modalVisible}
      onSwipeComplete={() => onClose()}
      swipeDirection="left"
      onBackdropPress={() => onClose()}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {_isPaymentArray && Object.keys(_isPaymentArray).length > 0 && (
            <View style={styles.table}>
              <View style={styles.row}>
                <View style={[styles.column, styles.bg_black]}>
                  <AppText style={styles.h_text}>क्रमांक</AppText>
                </View>
                <View style={[styles.column, styles.bg_black]}>
                  <AppText style={styles.h_text}>राशि </AppText>
                </View>
                <View style={[styles.column, styles.bg_black]}>
                  <AppText style={styles.h_text}>माध्यम</AppText>
                </View>

                <View style={[styles.column, styles.bg_black]}>
                  <AppText style={styles.h_text}>{'तारीख़ '}</AppText>
                </View>
              </View>
              {_isPaymentArray &&
              _isPaymentArray?.transactionHistory?.length > 0 ? (
                _isPaymentArray &&
                _isPaymentArray?.transactionHistory?.map(
                  (ele: any, i: number) => (
                    <View key={i} style={[styles.row, {borderBottomWidth: 1}]}>
                      <View style={[styles.column]}>
                        <AppText style={styles.column_text}>{i + 1} </AppText>
                      </View>
                      <View style={[styles.column, {position: 'relative'}]}>
                        <AppText style={[styles.column_text]}>
                          {NumberSeparatorInstance.numberSeparator(
                            Math.round(ele?.amount),
                          )}
                        </AppText>
                      </View>
                      <View style={[styles.column, {position: 'relative'}]}>
                        <AppText style={[styles.column_text]}>
                          {getPaymentType(ele?.paymentMode)}
                        </AppText>
                      </View>
                      <View style={[styles.column, {position: 'relative'}]}>
                        <AppText style={[styles.column_text]}>
                          {moment(ele?.transactionDate).format('DD-MM-YYYY')}
                        </AppText>
                      </View>
                    </View>
                  ),
                )
              ) : (
                <>
                  <View style={[styles.column]}>
                    <AppText style={styles.column_text}>
                      {'No data found'}{' '}
                    </AppText>
                  </View>
                </>
              )}
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};
export default memo(PaymentBillModal);
const fontFamily = 'Roboto_medium';
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
  },
  modalView: {
    margin: 0,
    backgroundColor: 'white',
    borderRadius: 0,
    padding: 10,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    shadowColor: '#1a1717',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
  },
  header: {
    marginTop: 10,
  },
  header_inner: {
    justifyContent: 'center',
    marginVertical: 20,
  },
  date: {},
  heading: {
    fontWeight: '900',
    fontSize: 20,
    lineHeight: 24,
    color: 'black',
    textAlign: 'center',
  },
  table: {
    borderRadius: 4,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  column: {
    flex: 1,
    borderLeftWidth: 0,
  },
  bg_black: {backgroundColor: '#1a1717'},
  h_text: {
    fontWeight: '900',
    color: '#fff',
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 18,
    padding: 8,
  },
  column_text: {
    fontWeight: '500',
    fontSize: 13,
    color: '#6A6A6A',
    padding: 6,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  total_heading: {
    color: 'black',
    padding: 8,
    textAlign: 'center',
  },
  total: {
    color: 'black',
    padding: 8,
    textAlign: 'center',
  },
  walletBox: {},
  wallet: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  walletCurrentText: {
    color: '#1a1717',
    fontFamily: fontFamily,
    fontSize: 15,
    paddingLeft: 7,
  },
  walletBalance: {
    color: '#1a1717',
    fontFamily: fontFamily,
    fontSize: 15,
  },
  customCheck: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkIcon: {
    height: 20,
    width: 20,
    backgroundColor: 'black',
  },
  defaultCheck: {
    height: 20,
    width: 20,
    borderWidth: 1,
    borderColor: '#1a1717',
  },
  checkLabel: {
    marginLeft: 10,
    fontSize: 16,
    lineHeight: 20,
  },
  notesSection: {
    marginBottom: 30,
  },
  notesWrap: {},
  notesHeading: {
    fontWeight: '500',
    fontSize: 16,
  },
  notestext: {
    color: '#717171',
    fontSize: 14,
    lineHeight: 21,
    marginRight: 14,
    paddingVertical: 10,
  },
});
