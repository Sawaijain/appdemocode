import {useTheme} from '@/hooks/useTheme';
import {normalize} from '@/theme/Utils';
import {StyleSheet} from 'react-native';

export function useTruckHeaderStyle(profileType?: string) {
  const {
    style: {layout, gutter},
    value,
  } = useTheme();

  return StyleSheet.create({
    truckHeader: {
      ...layout.rowVerticalCenter,
      ...layout.scrollSpaceBetween,
    },
    availabilityBtn: {
      backgroundColor: value.color.transparent,
      borderWidth: normalize(2),
      borderColor:
        profileType === 'driver'
          ? value.color.driver
          : profileType === 'transporter'
          ? value.color.shadow
          : value.color.buttonNew,
      ...gutter.paddingRight.small,
      ...gutter.paddingLeft.small,
      height: normalize(47),
      borderRadius: normalize(5),
      ...gutter.marginRight.regular,
    },
    availabilityBtnText: {
      marginTop: normalize(0),
      marginBottom: normalize(0),
      fontWeight: '400',
      fontSize: normalize(20),
    },

    myTruckBtn: {
      backgroundColor:
        profileType === 'driver'
          ? value.color.driver
          : profileType === 'transporter'
          ? value.color.transporter
          : value.color.buttonNew,
      borderWidth: normalize(2),
      borderColor:
        profileType === 'driver'
          ? value.color.driver
          : profileType === 'transporter'
          ? value.color.shadow
          : value.color.buttonNew,
      ...gutter.paddingRight.small,
      ...gutter.paddingLeft.small,
      height: normalize(47),
    },
    myTruckBtnText: {
      marginTop: normalize(0),
      marginBottom: normalize(0),
      fontSize: normalize(20),
    },
    profileImage: {
      width: normalize(50),
      height: normalize(50),
      backgroundColor: value.color.white,
      borderRadius: 100,
      ...gutter.marginLeft.normal,
      borderWidth: normalize(5),
      borderColor:
        profileType === 'driver'
          ? value.color.driver
          : profileType === 'transporter'
          ? value.color.transporter
          : value.color.buttonNew,
    },

    box: {
      ...gutter.padding.regular,
      elevation: 0,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      zIndex: 0,
    },
  });
}
