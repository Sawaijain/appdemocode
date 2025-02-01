import {Image, View} from 'react-native';
import React from 'react';
import {AppText} from './AppText';
import IMAGE_URL from '@/theme/ImageUrl';
import useShipperStyle from '@/libs/customStyles/ShipperStyle';
const RenderEmpty = ({
  title,
  isButton,
}: {
  title?: string;
  isButton?: boolean;
}) => {
  const style = useShipperStyle();
  return (
    <View style={style.emptyListStyle}>
      <Image source={IMAGE_URL.nodata} style={style.nodata} />
      <AppText style={style.emptyMessageStyle} mode="defaultBold">
        {title}
      </AppText>
    </View>
  );
};

export default RenderEmpty;
