import RootNavigator from '@/libs/navigation/RootNavigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import PDFViewer from './components/ViewInvoice';
import {useTheme} from '@/hooks/useTheme';
import {View} from 'react-native';

const ShowInvoiceInTransit = ({route}: NativeStackScreenProps<any>) => {
  const {
    params: {fileName},
  }: any = route;
  const {
    style: {layout},
  } = useTheme();
  return (
    <View style={[layout.container]}>
      {fileName.length > 0 ? (
        <PDFViewer uri={{filePath: fileName}}></PDFViewer>
      ) : null}
    </View>
  );
};
ShowInvoiceInTransit.SCREEN_NAME = 'ShowInvoiceInTransit';
ShowInvoiceInTransit.navigationOptions = {
  headerShown: false,
};
ShowInvoiceInTransit.navigate = () => {
  RootNavigator.navigate(ShowInvoiceInTransit.SCREEN_NAME);
};
export default ShowInvoiceInTransit;
