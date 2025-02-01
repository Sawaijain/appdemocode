import {AppText} from '@/components/AppText';
import AppTouchableOpacity from '@/components/AppTouchableOpacity';
import {useTheme} from '@/hooks/useTheme';
import IMAGE_URL from '@/theme/ImageUrl';
import {normalize} from '@/theme/Utils';
import strings from '@/util/Strings';
import * as React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

interface FooterButtonsProps {
  isLoadTabActive: boolean;
  isMyTripTabActive: boolean;
  onPress: (tabName: string) => void;
}

const FooterButtons = ({
  isLoadTabActive,
  onPress,
  isMyTripTabActive,
}: FooterButtonsProps) => {
  const {
    style: {layout, gutter},
    value: {color},
  } = useTheme();
  return (
    <View>
      <View
        style={[
          layout.rowVerticalCenter,
          gutter.padding.small,
          {backgroundColor: color.navHeader},
          layout.justifyContentAround,
        ]}>
        <AppTouchableOpacity
          onPress={() => onPress('loadPost')}
          style={[
            layout.rowVerticalCenter,
            layout.center,
            {
              backgroundColor: isLoadTabActive
                ? color.black
                : color.transparent,
              maxWidth: isLoadTabActive ? 120 : '100%',
              borderRadius: 10,
            },
            isLoadTabActive && gutter.paddingHorizontal.small,
            isLoadTabActive && gutter.paddingVertical.regular,
          ]}
          children={
            <React.Fragment>
              <Image
                source={
                  !isLoadTabActive
                    ? IMAGE_URL.loadActiveBlack
                    : IMAGE_URL.loadActive
                }
                style={style.image}
              />
              <AppText
                style={[
                  style.tabName,
                  {color: isLoadTabActive ? color.white : color.black},
                ]}>
                {strings.load_post}
              </AppText>
            </React.Fragment>
          }
        />
        <AppTouchableOpacity
          onPress={() => onPress('myTrips')}
          style={[
            layout.rowVerticalCenter,
            layout.center,
            {
              backgroundColor: isMyTripTabActive
                ? color.black
                : color.transparent,
              maxWidth: isMyTripTabActive ? 120 : '100%',
              borderRadius: 10,
            },
            isMyTripTabActive && gutter.paddingHorizontal.small,
            isMyTripTabActive && gutter.paddingVertical.regular,
          ]}
          children={
            <React.Fragment>
              <Image
                source={IMAGE_URL.truckIcon}
                style={[
                  style.image,
                  {tintColor: isMyTripTabActive ? color.white : color.black},
                ]}
              />
              <AppText
                style={[
                  style.tabName,
                  {color: isMyTripTabActive ? color.white : color.black},
                ]}>
                {strings.my_trip}
              </AppText>
            </React.Fragment>
          }
        />
      </View>
    </View>
  );
};

export default React.memo(FooterButtons);
const style = StyleSheet.create({
  image: {
    height: normalize(30),
    width: normalize(30),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  tabName: {
    fontSize: normalize(15),
    marginLeft: normalize(5),
  },
});
