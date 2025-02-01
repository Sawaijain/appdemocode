import {Theme} from '@react-navigation/native';
import {fromPairs} from 'lodash';
import {StyleSheet} from 'react-native';
import {
  ThemeColor,
  ThemeFontSize,
  ThemeMetricSize,
} from '@/theme/Default/Value';
import {AppFontFamily, normalize} from '@/theme/Utils';

function doCreateThemeInputStyle(
  color: ThemeColor,
  metricSize: ThemeMetricSize,
  fontSize: ThemeFontSize,
) {
  return StyleSheet.create({
    label: {
      textAlign: 'center',
      fontSize: fontSize.inputLabel,
    },
    textInput: {
      borderColor: color.black,
      borderWidth: 1,
      borderRadius: 8,
      height: metricSize.inputHeight,
      color: color.black,
      fontSize: fontSize.alternative,
      letterSpacing: 1.5,
    },
    choiceInput: {
      borderColor: color.primary,
      borderWidth: 1,
      height: metricSize.choiceHeight,
      color: color.primary,
    },
  });
}

export type ThemeInputStyle = ReturnType<typeof doCreateThemeInputStyle>;
export const createThemeInputStyle: (
  color: ThemeColor,
  metricSize: ThemeMetricSize,
  fontSize: ThemeFontSize,
) => ThemeInputStyle = doCreateThemeInputStyle;

function doCreateThemeLayoutStyle(
  metricSize: ThemeMetricSize,
  color: ThemeColor,
) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.white,
    },
    /* Column Layouts */
    column: {
      display: 'flex',
      flexDirection: 'column',
    },
    columnReverse: {
      display: 'flex',
      flexDirection: 'column-reverse',
    },
    columnCenter: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    columnVerticalCenter: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    columnHorizontalCenter: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    /* Row Layouts */
    row: {
      display: 'flex',
      flexDirection: 'row',
    },
    rowReverse: {
      display: 'flex',
      flexDirection: 'row-reverse',
    },
    rowCenter: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    rowVerticalCenter: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    rowHorizontalCenter: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    defaultTableRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: metricSize.small,
      minHeight: metricSize.tableRowHeight,
    },
    /* Default Layouts */
    center: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    alignItemsCenter: {
      alignItems: 'center',
    },
    alignItemsStart: {
      alignItems: 'flex-start',
    },
    alignItemsEnd: {
      alignItems: 'flex-end',
    },
    alignItemsStretch: {
      alignItems: 'stretch',
    },
    textAlignCenter: {
      textAlign: 'center',
    },
    textAlignEnd: {
      textAlign: 'right',
    },
    textStart: {
      textAlign: 'left',
    },
    justifyContentCenter: {
      justifyContent: 'center',
    },
    justifyContentEnd: {
      justifyContent: 'flex-end',
    },
    justifyContentStart: {
      justifyContent: 'flex-start',
    },
    justifyContentAround: {
      justifyContent: 'space-around',
    },
    justifyContentBetween: {
      justifyContent: 'space-between',
    },
    scrollSpaceAround: {
      flexGrow: 1,
      justifyContent: 'space-around',
    },
    scrollSpaceBetween: {
      flexGrow: 1,
      justifyContent: 'space-between',
    },
    selfStretch: {
      alignSelf: 'stretch',
    },
    selfCenter: {
      alignSelf: 'center',
    },
    selfEnd: {
      alignSelf: 'flex-end',
    },
    forceBottom: {
      position: 'absolute',
      bottom: 0,
    },
    forceTop: {
      position: 'absolute',
      top: 0,
    },
    forceRight: {
      position: 'absolute',
      right: 0,
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    overlayHorizontal: {
      position: 'absolute',
      left: 0,
      right: 0,
    },
    overlayVertical: {
      position: 'absolute',
      top: 0,
      left: 0,
    },
    countryCodeCenterOverlay: {
      position: 'absolute',
      top: normalize(12),
      left: normalize(13),
    },
    modalBackground: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: color.blackOverlay,
    },
    modalContent: {
      backgroundColor: color.white,
      shadowColor: color.black,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.5,
      shadowRadius: 4,
    },
    /* Sizes Layouts */
    fill: {
      flex: 1,
    },
    consumeSpace: {
      flexGrow: 1,
    },
    square: {
      aspectRatio: 1,
    },
    fullSize: {
      height: '100%',
      width: '100%',
    },
    fullWidth: {
      width: '100%',
    },
    width: {
      width: 50,
    },
    fullHeight: {
      height: '100%',
    },
    /* Operation Layout */
    mirror: {
      transform: [{scaleX: -1}],
    },
    rotate90: {
      transform: [{rotate: '90deg'}],
    },
    rotate90Inverse: {
      transform: [{rotate: '-90deg'}],
    },
    round: {
      borderRadius: Number.MAX_SAFE_INTEGER,
    },
    /* Image Layout */
    aspectFill: {
      resizeMode: 'cover',
    },
    aspectFit: {
      resizeMode: 'contain',
    },
    zIndex: {
      zIndex: 9999,
    },
  });
}

export type ThemeLayoutStyle = ReturnType<typeof doCreateThemeLayoutStyle>;
export const createThemeLayoutStyle: (
  metricSize: ThemeMetricSize,
  color: ThemeColor,
) => ThemeLayoutStyle = doCreateThemeLayoutStyle;

function doCreateThemeFontStyle(color: ThemeColor) {
  return StyleSheet.create({
    modalText: {
      color: color.black,
    },
    default: {
      fontFamily: AppFontFamily.ROBOTO,
    },
    defaultBold: {
      fontFamily: AppFontFamily.ROBOTOBOLD,
    },
    defaultSemiBold: {
      fontFamily: AppFontFamily.ROBOTOMEDIUM,
    },
    alternative: {
      fontFamily: AppFontFamily.ROBOTOMEDIUM,
    },
    alternativeBold: {
      fontFamily: AppFontFamily.ROBOTOMEDIUM,
    },
    title: {
      textTransform: 'uppercase',
      fontFamily: AppFontFamily.ROBOTOMEDIUM,
      letterSpacing: 0.05,
    },
    header: {
      textTransform: 'uppercase',
      fontFamily: AppFontFamily.ROBOTOMEDIUM,
    },
    neutral: {
      fontFamily: AppFontFamily.ROBOTOMEDIUM,
    },
    error: {
      fontFamily: AppFontFamily.ROBOTOMEDIUM,
      color: color.danger,
    },
    success: {
      fontFamily: AppFontFamily.ROBOTOMEDIUM,
      color: color.success,
    },

    // lbaglie: deprecated, do not use
    allCaps: {
      textTransform: 'uppercase',
    },
    textCenter: {
      textAlign: 'center',
    },
    textUnderline: {
      textDecorationLine: 'underline',
    },
  });
}

export type ThemeFontStyle = ReturnType<typeof doCreateThemeFontStyle>;
export const createThemeFontStyle: (color: ThemeColor) => ThemeFontStyle =
  doCreateThemeFontStyle;

const gutterTypes = [
  /* Margins */
  'margin',
  'marginBottom',
  'marginTop',
  'marginRight',
  'marginLeft',
  'marginVertical',
  'marginHorizontal',
  /* Paddings */
  'padding',
  'paddingBottom',
  'paddingTop',
  'paddingRight',
  'paddingLeft',
  'paddingVertical',
  'paddingHorizontal',
  /* Gap */
  'gap',
  'columnGap',
  'rowGap',
] as const;
type GutterType = (typeof gutterTypes)[number];
type MetricSizeType = keyof ThemeMetricSize;

function doCreateThemeGutterStyle(
  metricSize: ThemeMetricSize,
): Record<GutterType, Record<MetricSizeType, Record<GutterType, number>>> {
  return StyleSheet.create(
    fromPairs(
      gutterTypes.map((gutterType) => [
        gutterType,
        fromPairs(
          Object.entries(metricSize).map(([metricType, value]) => [
            metricType,
            {[gutterType]: value},
          ]),
        ),
      ]),
    ),
  ) as any;
}

export type ThemeGutterStyle = ReturnType<typeof doCreateThemeGutterStyle>;
export const createThemeGutterStyle: (
  metricSize: ThemeMetricSize,
) => ThemeGutterStyle = doCreateThemeGutterStyle;

export function createThemeRNTheme(color: ThemeColor, base: Theme): Theme {
  return {
    ...base,
    dark: false,
    colors: {
      ...base.colors,
      primary: color.primary,
      background: base.colors.background,
    },
  };
}
