import {View, Text} from 'react-native';
import React from 'react';
import Svg, {Path} from 'react-native-svg';

const ArrowIcon = () => {
  return (
    <Svg width="33" height="8" viewBox="0 0 33 8" fill="none">
      <Path
        d="M32.3536 4.35355C32.5488 4.15829 32.5488 3.84171 32.3536 3.64645L29.1716 0.464466C28.9763 0.269204 28.6597 0.269204 28.4645 0.464466C28.2692 0.659728 28.2692 0.976311 28.4645 1.17157L31.2929 4L28.4645 6.82843C28.2692 7.02369 28.2692 7.34027 28.4645 7.53553C28.6597 7.7308 28.9763 7.7308 29.1716 7.53553L32.3536 4.35355ZM0 4.5H32V3.5H0V4.5Z"
        fill="black"
      />
    </Svg>
  );
};

export default ArrowIcon;
