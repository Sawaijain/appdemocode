import {useTheme} from '@/hooks/useTheme';
import {normalize} from '@/theme/Utils';
import {StyleSheet} from 'react-native';

export function useStyle() {
  const {
    style: {layout, gutter},
    value: {color},
  } = useTheme();
  return {
    ...StyleSheet.create({
      innerContainer: {
        ...gutter.marginTop.regular,
        ...gutter.paddingHorizontal.regular,
      },

      profile: {
        ...layout.rowVerticalCenter,
        ...gutter.gap.small,
      },
      profileImage: {
        width: normalize(40),
        height: normalize(40),
        backgroundColor: color.white,
        borderRadius: 100,
        borderWidth: normalize(5),
        borderColor: color.driver,
      },
      name: {
        fontSize: normalize(26),
      },
      buttonContainer: {
        ...layout.rowVerticalCenter,
        ...layout.justifyContentBetween,
        ...gutter.marginVertical.normal,
      },
      showCompleteOrder: {
        backgroundColor: color.transparent,
        borderWidth: 1,
        borderColor: color.driverColor,
        ...gutter.paddingLeft.small,
        ...gutter.paddingRight.small,
      },
      buttonText: {
        color: color.driver,
      },
      referCard: {},
      referImage: {
        ...layout.fullWidth,
        resizeMode: 'contain',
        height: normalize(238),
      },
      rowHeader: {
        ...layout.rowVerticalCenter,
        ...layout.justifyContentBetween,
        ...gutter.paddingHorizontal.regular,
        ...gutter.paddingVertical.regular,
      },
      backIcon: {},
      buttonRow: {
        ...layout.rowVerticalCenter,
      },
      buttonActive: {
        backgroundColor: color.driver,
        ...layout.fill,
        height: 52,
        borderRadius: 0,
        // borderTopLeftRadius: 10,
        // borderBottomLeftRadius: 10,
      },
      buttonWhite: {
        backgroundColor: color.white,
        ...layout.fill,
        height: 52,
        borderRadius: 0,
        // borderTopRightRadius: 10,
        // borderBottomRightRadius: 10,
      },
      googlePlay: {
        height: 64,
        width: 164,
        resizeMode: 'contain',
        ...layout.selfCenter,
        marginTop: -30,
      },
      upperWrap: {
        ...layout.rowVerticalCenter,
        ...layout.justifyContentBetween,
      },
    }),
    color,
  };
}
