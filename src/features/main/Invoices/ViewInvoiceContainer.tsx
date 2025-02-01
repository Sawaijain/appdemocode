import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import RootNavigator, {navigationRef} from '@/libs/navigation/RootNavigation';
import {RootNavigationParam} from '@/features/base/interfaces/interfaces';
import TruckBaseScreen from '@/features/base/screens/TruckBaseScreen';
import DetailHeader from '../payment/components/DetailHeader';
import strings from '@/util/Strings';
import InvoiceList from './component/InvoiceList';
import AppButton from '@/components/AppButton';
import {useTheme} from '@/hooks/useTheme';
import {AppFontFamily} from '@/theme/Utils';
import Config from 'react-native-config';
import {showAlert} from '@/components/Alert';
import PaymentBill from '../loads/PaymentBill';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/AppStore';
const ViewInvoiceContainer = ({
  route: {params},
}: RootNavigationParam<Record<any, any>>) => {
  const {userDetails} = useSelector((state: RootState) => state.auth);
  const style = useStyle();

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
    <TruckBaseScreen
      profileType={userDetails?.profileType}
      scrollChildren={
        <React.Fragment>
          <DetailHeader title={strings.bilty} data={params?.data} />
          <View style={style.container}>
            <InvoiceList
              invoices={{
                consignee: params?.data?.consigneeInvoice,
                driver: params?.data?.driverInvoice,
              }}
              showInvoice={showInvoice}
            />
            <View style={style.buttonContainer}>
              <AppButton
                buttonStyle={[style.button]}
                label={strings.receipt}
                onPress={() =>
                  navigationRef.current?.navigate(PaymentBill.SCREEN_NAME, {
                    orderId: params?.data?.orderId,
                  })
                }
              />
            </View>
          </View>
        </React.Fragment>
      }
    />
  );
};
ViewInvoiceContainer.SCREEN_NAME = 'ViewInvoiceContainer';
ViewInvoiceContainer.navigationOptions = {
  headerShown: false,
};
ViewInvoiceContainer.navigate = (data: any) => {
  RootNavigator.navigate(ViewInvoiceContainer.SCREEN_NAME, {data});
};
export default ViewInvoiceContainer;

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
  });
}
