import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {AppText} from './AppText';
const AppRadio = ({
  radioButtonData,
  onPress,
  value,
}: {
  radioButtonData: any[];
  onPress: Function;
  value: string;
}) => {
  return (
    <View style={styles.radio}>
      {radioButtonData.map((item, key) => {
        return (
          <View key={key}>
            <TouchableOpacity
              onPress={() => {
                onPress(item.label);
              }}
              style={styles.btn}>
              <MaterialIcons
                name={
                  item.label == value
                    ? 'radio-button-checked'
                    : 'radio-button-unchecked'
                }
                color={'#191919'}
                size={30}
              />
              <AppText style={styles.radioText}>{item.label}</AppText>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  radio: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 0,
  },

  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
  },
  radioText: {
    marginLeft: 5,
    fontSize: 15,
  },
});

export default AppRadio;
