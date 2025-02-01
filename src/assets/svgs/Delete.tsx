import React from 'react';
import Svg, {Path} from 'react-native-svg';
interface IProps {
  height?: number;
  width?: number;
}
const Delete = ({height, width}: IProps) => {
  return (
    <Svg
      width={width || '32'}
      height={height || '36'}
      viewBox="0 0 32 36"
      fill="none">
      <Path
        d="M13.5 0C11.025 0 9 2.025 9 4.5H4.5C2.025 4.5 0 6.525 0 9H31.5C31.5 6.525 29.475 4.5 27 4.5H22.5C22.5 2.025 20.475 0 18 0H13.5ZM4.5 13.5V35.145C4.5 35.64 4.86 36 5.355 36H26.19C26.685 36 27.045 35.64 27.045 35.145V13.5H22.545V29.25C22.545 30.51 21.555 31.5 20.295 31.5C19.035 31.5 18.045 30.51 18.045 29.25V13.5H13.545V29.25C13.545 30.51 12.555 31.5 11.295 31.5C10.035 31.5 9.045 30.51 9.045 29.25V13.5H4.545H4.5Z"
        fill="#049981"
      />
    </Svg>
  );
};

export default Delete;
