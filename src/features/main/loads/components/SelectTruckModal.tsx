import AppButton from '@/components/AppButton';
import {AppText} from '@/components/AppText';
import {AppTextInput} from '@/components/AppTextInput';
import AppTouchableOpacity from '@/components/AppTouchableOpacity';
import strings from '@/util/Strings';
import React, {memo} from 'react';
import {View, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
interface SelectTruckModalProps {
  modalVisible: boolean;
  onPressCloseModal: () => void;
  onPressTruckModalVisiable: () => void;
  updateCarrierLoad: () => void;
  selectedTruck: string;
  driverNumber: string;
  driverName: string;
  setDriverNumber: (text: string) => void;
  setDriverName: (text: string) => void;
}

const SelectTruckModal = ({
  modalVisible,
  onPressCloseModal,
  onPressTruckModalVisiable,
  updateCarrierLoad,
  selectedTruck,
  driverName,
  driverNumber,
  setDriverNumber,
  setDriverName,
}: SelectTruckModalProps) => {
  return (
    <Modal
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      backdropColor={'rgba(0,0,0,0.5)'}
      onBackdropPress={() => onPressCloseModal()}
      isVisible={modalVisible}>
      <View
        style={{
          width: '100%',
          backgroundColor: '#fff',
          borderRadius: 10,
          alignSelf: 'center',
          paddingHorizontal: 15,
          paddingVertical: 10,
        }}>
        <AppTouchableOpacity
          onPress={() => onPressTruckModalVisiable()}
          style={styles.appTouch}
          children={
            <React.Fragment>
              <AppText mode="defaultBold" style={styles.subTitle}>
                {selectedTruck || strings.select_truck}
              </AppText>
            </React.Fragment>
          }
        />

        <View>
          <AppTextInput
            value={driverNumber}
            keyboardType="number-pad"
            maxLength={10}
            placeholder={strings.driver_number}
            placeholderTextColor={'gray'}
            onChangeText={setDriverNumber}
            fillParent={false}
          />
        </View>
        <View
          style={{
            marginVertical: 10,
          }}>
          <AppTextInput
            value={driverName}
            placeholder={strings.driver_name}
            placeholderTextColor={'gray'}
            onChangeText={setDriverName}
            fillParent={false}
          />
        </View>

        <View
          style={{
            alignItems: 'center',
            height: 70,
            justifyContent: 'center',
          }}>
          <AppButton
            label={strings.submit}
            textColor={'white'}
            onPress={updateCarrierLoad}
          />
        </View>
      </View>
    </Modal>
  );
};

export default memo(SelectTruckModal);

const styles = StyleSheet.create({
  appTouch: {
    alignItems: 'center',
    borderColor: '#bcbcbc',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: 10,
    width: '100%',
  },
  title: {
    color: '#fff',
    fontSize: 22,
    marginTop: 12,
  },
  subTitle: {
    color: '#121212',
    fontSize: 15,
    marginVertical: 12,
    textAlign: 'center',
  },
});
