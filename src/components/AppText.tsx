import {useTheme} from '@/hooks/useTheme';
import {normalize} from '@/theme/Utils';
import {UnknownOptionError} from '@/util/UnknownOptionError';
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {CheckIcon} from './icons/Icon';
import {StyleProps} from './icons/Props';
function useAppTextStyle() {
  const {
    style: {font, layout, gutter},
    value,
  } = useTheme();
  const base = {color: value.color.black};
  return StyleSheet.create({
    default: {
      ...base,
      ...font.default,
      fontSize: value.fontSize.regular,
    },
    defaultBold: {
      ...base,
      ...font.defaultBold,
      fontSize: value.fontSize.regular,
    },
    alternative: {
      ...base,
      ...font.alternative,
      fontSize: value.fontSize.alternative,
    },
    title: {
      ...base,
      ...font.title,
      fontSize: value.fontSize.large,
    },
    description: {
      ...base,
      fontSize: value.fontSize.small,
    },
    header: {
      ...base,
      ...font.header,
      fontSize: value.fontSize.header,
    },
    validationContainer: layout.row,
    validationIcon: {
      width: normalize(20),
    },
    successIcon: {
      marginTop: value.metricSize.tiny,
    },
    neutral: {
      ...base,
      ...font.neutral,
    },
    error: {
      ...base,
      ...font.error,
      fontSize: normalize(12),
    },
    success: {
      ...base,
      ...font.success,
      ...gutter.marginRight.tiny,
    },
    contact: {
      ...base,
      ...font.defaultSemiBold,
    },
  });
}
export type AppTextProps = TextProps & {
  mode?:
    | 'default'
    | 'defaultBold'
    | 'alternative'
    | 'header'
    | 'title'
    | 'description'
    | 'contact';
};
export const AppText = ({style, mode = 'default', ...props}: AppTextProps) => (
  <Text style={[useAppTextStyle()[mode], style]} {...props} />
);

export type VersionTextProps = StyleProps<TextStyle> & {
  includeLabel?: boolean;
};

// export const VersionText = ({ style, includeLabel = true }: VersionTextProps) => {
//   if (Config.BUILD_TYPE === 'production') {
//     return null
//   }
//   const text = `${includeLabel ? 'Version: ' : ''}${Config.ENV_CODE} v${DeviceInfo.getVersion()} (${DeviceInfo.getBuildNumber()})`
//   return <AppText style={style}>{text}</AppText>
// }

export type ValidationTextProps = StyleProps<ViewStyle> & {
  textStyle?: StyleProp<TextStyle>;
  mode: 'neutral' | 'success' | 'error';
  children: string | undefined;
};

export const ValidationText = ({
  style,
  textStyle,
  mode,
  children,
}: ValidationTextProps) => {
  const themeStyle = useAppTextStyle();

  if (!children) return null;

  return (
    <View style={[themeStyle.validationContainer, style]}>
      {(() => {
        switch (mode) {
          case 'neutral':
            return <View style={themeStyle.validationIcon} />;
          case 'success':
            return (
              <CheckIcon
                color={themeStyle.success.color}
                style={[themeStyle.validationIcon, themeStyle.successIcon]}
              />
            );
          case 'error':
            return <AppText style={themeStyle.error}></AppText>;
          default:
            throw new UnknownOptionError('ValidationText.mode', mode);
        }
      })()}
      <AppText style={[themeStyle[mode], textStyle]}>{children}</AppText>
    </View>
  );
};

function useValueLabelStyle() {
  const theme = useTheme();
  return StyleSheet.create({
    container: theme.style.layout.columnCenter,
    label: {
      ...theme.style.font.allCaps,
      fontSize: theme.value.fontSize.regular,
    },
    value: {
      ...theme.style.font.allCaps,
      fontSize: theme.value.fontSize.large,
    },
    topValue: theme.style.gutter.marginBottom.tiny,
    middleValue: theme.style.gutter.marginVertical.tiny,
    bottomValue: theme.style.gutter.marginBottom.tiny,
  });
}
type ValueLabelProps = StyleProps<ViewStyle> & {
  children: string;
  topLabel: string;
  bottomLabel: string;
  alignValue?: 'top' | 'bottom' | 'middle';
};
export const ValueLabel = ({
  style,
  children,
  topLabel,
  bottomLabel,
  alignValue = 'middle',
}: ValueLabelProps) => {
  const themeStyle = useValueLabelStyle();

  const [valueStyle, position] = (() => {
    switch (alignValue) {
      case 'top':
        return [themeStyle.topValue, 0];
      case 'middle':
        return [themeStyle.middleValue, 1];
      case 'bottom':
        return [themeStyle.bottomValue, 2];
      default:
        throw new UnknownOptionError('ValueLabel.alignValue', alignValue);
    }
  })();

  const elements = [
    <AppText key="top" style={themeStyle.label}>
      {topLabel}
    </AppText>,
    <AppText key="bottom" style={themeStyle.label}>
      {bottomLabel}
    </AppText>,
  ];
  elements.splice(
    position,
    0,
    <AppText key="value" mode="title" style={[themeStyle.value, valueStyle]}>
      {children}
    </AppText>,
  );

  return <View style={[themeStyle.container, style]}>{elements}</View>;
};
