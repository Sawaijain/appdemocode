import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {AppText} from './AppText';
import useShipperStyle from '@/libs/customStyles/ShipperStyle';

interface ErrorModalProps {
  error: string;
}

const ErrorModal = (props: ErrorModalProps) => {
  const style = useShipperStyle();
  return (
    <View style={style.container}>
      <View style={styles.errorBox}>
        <AppText style={styles.error}>{props.error}</AppText>
      </View>
    </View>
  );
};

export default ErrorModal;

const styles = StyleSheet.create({
  errorBox: {
    backgroundColor: '#232323',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginHorizontal: 30,
    borderRadius: 7,
  },
  error: {
    fontSize: 15,
    color: '#d80000',
    textAlign: 'center',
  },
});
