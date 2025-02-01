import React from 'react';
import Svg, {Path} from 'react-native-svg';

const Star = () => {
  return (
    <Svg width="24" height="22" viewBox="0 0 24 22" fill="none">
      <Path
        d="M0.814697 0.836914H23.1308V21.3477H0.814697V0.836914Z"
        fill="white"
        fillOpacity="0.01"
      />
      <Path
        d="M11.9757 2.97266L9.13365 8.30442L2.67798 9.16481L7.35455 13.3669L6.23665 19.2103L11.9757 16.3983L17.716 19.2103L16.6063 13.3669L21.2747 9.16481L14.8548 8.30442L11.9757 2.97266Z"
        fill="#049981"
        stroke="#049981"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default Star;
