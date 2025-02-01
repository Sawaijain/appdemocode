import {StatusBarStyle} from 'react-native';
import {normalize} from '@/theme/Utils';

// NOTE lbaglie: to change the primary color on Android, we gotta change the
// native style at `android/app/src/res/values/styles.xml`
export const THEME_DEFAULT_COLOR = {
  statusBar: 'light-content' as StatusBarStyle,
  primary: '#0564d4',
  secondary: '#ff6a00',
  background: '#f6f8fa',
  white: '#fff',
  black: '#101214',
  button: '#1c1e21',
  shadow: '#757575',
  text: '#30363b',
  borderColor: '#d0d7de',
  borderColorDark: '#333942',
  placeholder: '#a1a1a1',
  danger: 'rgb(208, 2, 27)',
  title: 'rgb(102, 102, 102)',
  separator: 'rgb(194, 194, 195)',
  highlight: 'rgb(199, 198, 203)',
  blackOverlay: 'rgba(0,0,0,0.6)',
  iconWhite: '#fff',
  iconBlack: '#101214',
  dynamicWhite: '#fff',
  dynamicBlack: '#1c1e21',
  dynamicBackground: '#fff',
  transparent: 'transparent',
  calpyse: '#2b7488',
  splashBG: 'rgba(172, 183, 240, 0.53)',
  success: '#008000',
  navHeader: '#f5f6f6',
  welcomeText: 'rgba(217, 217, 217, 0.84)',
  placeholderText: 'rgba(255, 255, 255, 0.80)',
  border: '#D9D9D9',
  buttonNew: '#049981',
  disableButton: '#575757',
  favRoute: 'rgba(0, 0, 0, 0.85)',
  uploadText: '#848484',
  routeSearch: 'rgba(132, 132, 132, 0.17)',
  driver: '#5D6ECC',
  transporter: '#F17F53',
  transporterLight: 'rgba(241, 127, 83, 0.56)',
  transporterLight2: 'rgba(255, 238, 231, 1)',
  linear: {
    color1: '#04998159',
    color2: 'rgba(4, 153, 129, 0.18)',
    color3: '#04998100',
    color4: '#fff',
  },
  borderbottom: '#E9EDED',
  tabText: '#626262',
  gray50: '#F9FAFB',
  lightWhite: '#F6F6F6',
  notesBg: '#E1EFED',
  receiptBorder: '#EAEAEA',
  driverColor: '#5D6FCD',
  driverBorder: '#CFCFCF',
  driverLoadBg: '#F0F0F8',
  profileCard: 'rgba(249, 250, 251, 1)',
};

export type ThemeColor = typeof THEME_DEFAULT_COLOR;

export const THEME_DEFAULT_FONTSIZE = {
  footprint: normalize(12),
  small: normalize(14),
  regular: normalize(20),
  alternative: normalize(16),
  header: normalize(42),
  large: normalize(70),
  inputLabel: normalize(40),
  medium: normalize(22),
};

export type ThemeFontSize = typeof THEME_DEFAULT_FONTSIZE;

export const THEME_DEFAULT_METRICSIZE = {
  tiny: normalize(5),
  small: normalize(10),
  regular: normalize(15),
  normal: normalize(22),
  large: normalize(30),
  tableRowHeight: normalize(44),
  inputHeight: normalize(50),
  inputVerticalPadding: normalize(12),
  choiceHeight: normalize(70),
  longTextLineHeight: normalize(27),
  extraLarge: normalize(100),
};
export type ThemeMetricSize = typeof THEME_DEFAULT_METRICSIZE;
