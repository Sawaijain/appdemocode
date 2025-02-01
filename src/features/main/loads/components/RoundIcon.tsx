import {normalize} from '@/theme/Utils';
import React, {memo} from 'react';
import {ColorValue, View} from 'react-native';
const RoundIcon = (props: {color: ColorValue | undefined}) => {
  return (
    <View
      style={{
        height: normalize(10),
        width: normalize(10),
        backgroundColor: props.color ? props.color : '#000',
        borderRadius: normalize(20),
        borderColor: '#000',
        borderWidth: 1,
      }}></View>
  );
};
export default memo(RoundIcon);
