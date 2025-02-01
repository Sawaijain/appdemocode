import React from 'react';
import {StyleSheet, Text} from 'react-native';
import Config from 'react-native-config';
import DeviceInfo from 'react-native-device-info';
import {AppText} from './AppText';

const VersionNameText = (props: {isSideMenu?: boolean}) => {
  const text = `${'agrigator'} v${DeviceInfo.getVersion()}`;
  if (!text) {
    return <></>;
  }
  return (
    <AppText
      style={[styles.text, props.isSideMenu && styles.version]}
      {...props}>
      {text}
    </AppText>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    fontSize: 16,
    marginVertical: 30,
  },
  version: {
    marginVertical: 5,
    color: 'white',
  },
});

export default VersionNameText;
