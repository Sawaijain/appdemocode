import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import RNPrint from 'react-native-print';
import Pdf from 'react-native-pdf';
import AppButton from '@/components/AppButton';
import {useTheme} from '@/hooks/useTheme';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/AppStore';
import {MAX_HEIGHT, MAX_WIDTH} from '@/libs';
import AppTouchableOpacity from '@/components/AppTouchableOpacity';
import {BackIcon} from '@/components/icons/Icon';
import RootNavigator from '@/libs/navigation/RootNavigation';

const PDFViewer = ({uri}: any) => {
  const {
    style: {layout},
    value: {color},
  } = useTheme();

  const userDetails = useSelector((state: RootState) => state.auth.userDetails);

  const source = {uri: uri?.filePath};

  const printPDF = async () => {
    if (source.uri?.length > 0) {
      await RNPrint.print({
        filePath: source.uri,
      });
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <AppTouchableOpacity
          style={{flex: 1}}
          onPress={() => RootNavigator.pop()}
          children={<BackIcon size={30} />}
        />
        <AppButton
          label="Print"
          textColor={color.white}
          buttonStyle={{
            backgroundColor:
              userDetails?.profileType === 'transporter'
                ? color.transporter
                : color.buttonNew,
            ...layout.selfEnd,
          }}
          onPress={printPDF}
        />
      </View>
      <Pdf
        singlePage
        trustAllCerts={false}
        source={source}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`current page: ${page}`);
        }}
        onError={(error) => {
          console.log(error);
        }}
        onPressLink={(uri) => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={styles.pdf}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  pdf: {
    width: MAX_WIDTH * 0.9,
    height: MAX_HEIGHT * 0.8,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
  },
  upperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
});

export default PDFViewer;
