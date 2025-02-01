import {AppText} from '@/components/AppText';
import ViewPODModal from '@/components/ViewPOD';
import BaseScreen from '@/features/base/screens/BaseScreen';
import {isObjectEmpty} from '@/libs';
import RootNavigator, {navigationRef} from '@/libs/navigation/RootNavigation';
import {RootState, appDispatch} from '@/redux/AppStore';
import {getDispatchDetails} from '@/redux/actions/LoadAction';
import {getImage} from '@/redux/actions/UserAction';
import {getImageDocument} from '@/redux/reducers/userSlice';
import strings from '@/util/Strings';
import {RouteProp, useIsFocused} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import Config from 'react-native-config';
import {useDispatch, useSelector} from 'react-redux';

interface ViewPodContainerProps {
  route: RouteProp<{params: {orderId: string}}, 'params'>;
  navigation: NativeStackNavigationProp<any, 'ViewPodContainer'>;
}

const ViewPodContainer = ({route, navigation}: ViewPodContainerProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const isFocused = useIsFocused();
  const imagePath = useSelector((state: RootState) => state.user.imagePath);
  const getPOD = (path: string) => {
    const documentType = getExt(path);
    if (documentType == 'pdf') {
      navigationRef.current?.navigate('ShowInvoiceInTransit', {
        fileName: `${Config.BASERRLZOOP}misc/getInvoicePDF?document_name=${path}`,
      });
    } else {
      if (path) {
        getImage(path);
      }
    }
  };
  const {
    params: {orderId},
  }: any = route;
  const getExt = (fileName: string) => {
    return fileName.substr(fileName.lastIndexOf('.') + 1);
  };
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
  useEffect(() => {
    if (imagePath) {
      setIsModalVisible(true);
    }
  }, [imagePath]);
  return (
    <BaseScreen>
      {dispatchDetails && !isObjectEmpty(dispatchDetails) && (
        <ScrollView>
          <React.Fragment>
            {dispatchDetails && dispatchDetails?.podArrivedUrl && (
              <View style={styles.button}>
                <View style={styles.seprateView} />
                <View style={styles.centerWithFlex}>
                  <AppText style={styles.label}>{strings.arrive}</AppText>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    getPOD(dispatchDetails?.podArrivedUrl);
                  }}
                  style={[styles.viewBtn, {marginRight: 0}]}>
                  <AppText style={styles.viewBtnText}>देखे</AppText>
                </TouchableOpacity>
              </View>
            )}
            {dispatchDetails && dispatchDetails?.podReceiptUrl && (
              <View style={styles.button}>
                <View style={styles.seprateView} />
                <View style={styles.centerWithFlex}>
                  <AppText style={styles.label}>{strings.receipt}</AppText>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    getPOD(dispatchDetails?.podReceiptUrl);
                  }}
                  style={[styles.viewBtn, {marginRight: 0}]}>
                  <AppText style={styles.viewBtnText}>देखे</AppText>
                </TouchableOpacity>
              </View>
            )}
            {dispatchDetails && dispatchDetails?.podAdditional1Url && (
              <View style={styles.button}>
                <View style={styles.seprateView} />
                <View style={styles.centerWithFlex}>
                  <AppText style={styles.label}> {strings.addDoc} 1</AppText>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    getPOD(dispatchDetails?.podAdditional1Url);
                  }}
                  style={[styles.viewBtn, {marginRight: 0}]}>
                  <AppText style={styles.viewBtnText}>देखे</AppText>
                </TouchableOpacity>
              </View>
            )}
            {dispatchDetails && dispatchDetails?.podAdditional2Url && (
              <View style={styles.button}>
                <View style={styles.seprateView} />
                <View style={styles.centerWithFlex}>
                  <AppText style={styles.label}> {strings.addDoc} 2</AppText>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    getPOD(dispatchDetails?.podAdditional2Url);
                  }}
                  style={[styles.viewBtn, {marginRight: 0}]}>
                  <AppText style={styles.viewBtnText}>देखे</AppText>
                </TouchableOpacity>
              </View>
            )}
          </React.Fragment>
        </ScrollView>
      )}
      {isModalVisible && (
        <ViewPODModal
          onclose={() => {
            setIsModalVisible(false);
          }}
          isVisible={isModalVisible}
          url={imagePath}
        />
      )}
    </BaseScreen>
  );
};
ViewPodContainer.SCREEN_NAME = 'ViewPodContainer';
ViewPodContainer.navigationOptions = {
  headerShown: false,
};
ViewPodContainer.navigate = () => {
  RootNavigator.navigate(ViewPodContainer.SCREEN_NAME);
};
export default ViewPodContainer;

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
