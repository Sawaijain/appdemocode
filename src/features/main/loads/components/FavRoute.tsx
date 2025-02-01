import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {AppText} from '@/components/AppText';
import {useTheme} from '@/hooks/useTheme';
import ArrowIcon from '@/assets/svgs/ArrowIcon';
import LocationPinIcon from '@/assets/svgs/LocationPinIcon';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/AppStore';

const FavRoute = () => {
  const style = useStyle();
  return (
    <View style={style.container}>
      <LocationPinIcon />
      <AppText style={style.origin}>मंडीदीप, मध्यप्रदेश </AppText>
      <ArrowIcon />
      <AppText style={style.destination}>कांडला, गुजरात </AppText>
    </View>
  );
};

export default FavRoute;
function useStyle() {
  const {
    style: {layout, gutter},
    value: {color, fontSize},
  } = useTheme();
  const {userDetails} = useSelector((state: RootState) => state.auth);
  return StyleSheet.create({
    container: {
      ...layout.rowVerticalCenter,
      ...gutter.gap.regular,
      ...layout.fill,
      ...layout.justifyContentBetween,
    },
    origin: {
      fontSize: fontSize.medium,
    },
    destination: {
      fontSize: fontSize.medium,
      color:
        userDetails?.profileType === 'transporter'
          ? color.transporter
          : color.buttonNew,
    },
  });
}
