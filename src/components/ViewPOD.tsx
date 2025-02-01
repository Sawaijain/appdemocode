import {MAX_HEIGHT, MAX_WIDTH} from '@/libs';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import {AppText} from './AppText';
const ViewPODModal = ({url, onclose, isVisible, isKycPage}: any) => {
  return (
    <Modal
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      backdropColor={'rgba(0,0,0,0.5)'}
      onBackdropPress={() => onclose()}
      isVisible={isVisible}>
      <View style={styles.centeredView}>
        <TouchableOpacity
          onPress={() => onclose()}
          style={{alignSelf: 'flex-end'}}>
          <Icon name="ios-close" size={20} color="black" />
        </TouchableOpacity>
        <View style={{marginTop: 10}}>
          {url !== undefined && url !== '' ? (
            <Image
              source={{
                uri: url,
              }}
              style={{
                height: MAX_HEIGHT * 0.4,
                width: MAX_WIDTH * 0.79,
              }}
              resizeMode="contain"
            />
          ) : (
            <View style={{alignSelf: 'center'}}>
              <AppText style={{textAlign: 'center', borderBottomWidth: 2}}>
                {isKycPage ? 'No Image Uploaded' : 'No POD Uploaded'}
              </AppText>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};
export default ViewPODModal;
const styles = StyleSheet.create({
  modal: {},
  centeredView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    shadowColor: '#1a1717',
    width: '99%',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
