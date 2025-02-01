import { DarkTheme } from "@react-navigation/native";
import { THEME_DEFAULT_IMAGE } from "@/theme/Default/Image";
import {
  createThemeInputStyle,
  createThemeFontStyle,
  createThemeGutterStyle,
  createThemeLayoutStyle,
  createThemeRNTheme,
} from "@/theme/Default/Style";
import {
  THEME_DEFAULT_COLOR,
  THEME_DEFAULT_FONTSIZE,
  THEME_DEFAULT_METRICSIZE,
} from "@/theme/Default/Value";

const themeValues = {
  color: THEME_DEFAULT_COLOR,
  fontSize: THEME_DEFAULT_FONTSIZE,
  metricSize: THEME_DEFAULT_METRICSIZE,
  image: THEME_DEFAULT_IMAGE,
};

export type ThemeValues = typeof themeValues;

const themeStyles = {
  input: createThemeInputStyle(themeValues.color, themeValues.metricSize, themeValues.fontSize),
  gutter: createThemeGutterStyle(THEME_DEFAULT_METRICSIZE),
  font: createThemeFontStyle(themeValues.color),
  layout: createThemeLayoutStyle(themeValues.metricSize, themeValues.color),
};

export type ThemeStyles = typeof themeStyles;

const DefaultAppThemeObj = {
  value: themeValues as ThemeValues,
  style: themeStyles as ThemeStyles,
  reactTheme: createThemeRNTheme(THEME_DEFAULT_COLOR, DarkTheme),
};

export type AppTheme = Readonly<typeof DefaultAppThemeObj>;

export const DefaultAppTheme: AppTheme = DefaultAppThemeObj;
