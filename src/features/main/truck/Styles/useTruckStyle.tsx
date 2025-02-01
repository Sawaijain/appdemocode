import {useTheme} from '@/hooks/useTheme';
import {normalize} from '@/theme/Utils';

import {StatusBar, StyleSheet} from 'react-native';

export function useTruckStyle(profileType?: string) {
  const {
    style: {layout, gutter},
    value,
  } = useTheme();

  return StyleSheet.create({
    truckHeading: {
      width: normalize(300),
      fontSize: normalize(16),
      fontWeight: '400',
      ...gutter.marginBottom.normal,
      paddingHorizontal: normalize(15),
    },
    container: {
      ...layout.fill,
      paddingTop: StatusBar.currentHeight,
      paddingHorizontal: normalize(15),
    },

    truckAdd: {
      ...layout.rowVerticalCenter,
      ...layout.justifyContentBetween,
    },
    truckInput: {
      width: normalize(215),
      height: normalize(60),
      ...gutter.paddingVertical.regular,
      ...gutter.paddingHorizontal.inputHeight,
      borderWidth: normalize(1),
      borderColor: value.color.welcomeText,
      ...gutter.marginRight.tableRowHeight,
    },
    truckAddBtn: {
      width: normalize(143),
      backgroundColor: value.color.buttonNew,
      ...gutter.paddingRight.small,
      ...gutter.paddingLeft.small,
      height: normalize(56),
    },
    truckAddText: {
      marginTop: normalize(0),
      marginBottom: normalize(0),
      fontWeight: '400',
      fontSize: normalize(20),
    },
    truckListWrap: {
      ...gutter.marginTop.small,
      backgroundColor: value.color.white,
      borderRadius: normalize(10),
      borderWidth: normalize(1),
      borderColor: value.color.driverBorder,
      // ...gutter.padding.regular,
    },
    truckPMT: {
      ...layout.rowVerticalCenter,
      ...layout.justifyContentBetween,
      backgroundColor: value.color.lightWhite,
      ...gutter.padding.small,
      borderRadius: 10,
    },
    truckDetailsPanNumber: {
      color: value.color.black,
      fontSize: normalize(18),
      fontWeight: '500',
    },
    truckDetailsMt: {
      textAlign: 'right',
      color: value.color.black,
      fontSize: normalize(18),
      fontWeight: '500',
      ...gutter.marginRight.small,
    },
    truckDetailsName: {
      color: value.color.uploadText,
      fontSize: normalize(19),
      fontWeight: '400',
    },
    truckAddress: {
      ...layout.rowVerticalCenter,
    },

    active: {
      backgroundColor: value.color.buttonNew,
      width: normalize(10),
      height: normalize(10),
      borderRadius: 100,
      ...gutter.marginRight.tiny,
      ...layout.textAlignCenter,
    },
    fill: layout.fill,
    middleview: {
      ...layout.row,
      ...gutter.marginBottom.normal,
      ...gutter.marginTop.normal,
      ...gutter.paddingHorizontal.regular,
    },
    truckOrwer: {
      fontSize: normalize(18),
      fontWeight: '400',
      color: value.color.tabText,
      ...layout.textAlignEnd,
    },
    filterWrap: {
      ...layout.alignItemsEnd,
      ...gutter.marginVertical.regular,
    },
    filterButton: {
      backgroundColor: value.color.transparent,
      borderWidth: 1,
      borderColor: value.color.buttonNew,
      borderRadius: 8,
      paddingLeft: 12,
      paddingRight: 12,
    },
    buttonStyle: {
      backgroundColor:
        profileType == 'transporter'
          ? value.color.transporter
          : value.color.buttonNew,
      ...gutter.paddingLeft.small,
      ...gutter.paddingRight.small,
    },
    clearButton: {
      ...layout.alignItemsEnd,
    },
    textRight: {
      ...layout.column,
      ...layout.justifyContentEnd,
    },
  });
}
