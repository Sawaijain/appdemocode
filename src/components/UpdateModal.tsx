import React from 'react';
import {
  View,
  StyleSheet,
  Modal,
  ActivityIndicator,
  Dimensions,
  Linking,
} from 'react-native';
import {AppText} from './AppText';
import AppButton from './AppButton';
import Config from 'react-native-config';
const {height, width} = Dimensions.get('screen');
interface IProps {
  isOpen: boolean;
}
const UpdateModal = ({isOpen}: IProps) => {
  const handleNavigate = () => {
    Linking.openURL(String(Config.PLAY_STORE_URL));
  };
  return (
    <React.Fragment>
      <Modal transparent visible={isOpen}>
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorHolder}>
            <AppText style={styles.updateText} mode="contact">
              New feature added Please update your app
            </AppText>
            <AppButton
              textColor="white"
              buttonStyle={styles.button}
              label="Update Now"
              onPress={handleNavigate}
            />
          </View>
        </View>
      </Modal>
    </React.Fragment>
  );
};
export default UpdateModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(0, 0, 0, .8)',
    opacity: 1,
  },
  activityIndicatorHolder: {
    backgroundColor: '#fff',
    height: height / 4,
    width: width * 0.78,
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  updateText: {
    textAlign: 'center',
    marginVertical: 10,
    color: '#171717',
  },
  button: {marginVertical: 10},
});
