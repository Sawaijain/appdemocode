import {RootState} from '@/redux/AppStore';
import React from 'react';
import {View, StyleSheet, Modal, ActivityIndicator} from 'react-native';
import {useSelector} from 'react-redux';

const LoadingScreen = () => {
  const loading = useSelector((state: RootState) => state.loading.loading);
  return (
    <React.Fragment>
      <Modal transparent visible={loading}>
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorHolder}>
            <ActivityIndicator
              animating={loading}
              size="large"
              color={'white'}
            />
          </View>
        </View>
      </Modal>
    </React.Fragment>
  );
};
export default LoadingScreen;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff00',
    opacity: 0.9,
  },
  activityIndicatorHolder: {
    backgroundColor: '#1a1717',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
