import {useTheme} from '@/hooks/useTheme';
import {AppFontFamily} from '@/theme/Utils';
import React from 'react';
import {
  TextInputProps,
  StyleSheet,
  View,
  ViewStyle,
  TextStyle,
  TextInput,
} from 'react-native';
import {ValidationText} from './AppText';
import {StyleProps} from './Props';
import {isUndefined} from 'lodash';

function useAppTextInputStyle(
  fillParent: boolean,
  error: boolean,
  isCountryCode?: boolean,
  isCenter?: boolean,
) {
  const {style, value} = useTheme();
  return StyleSheet.create({
    container: {},
    containerInput: {
      ...style.input.textInput,
      ...style.gutter.paddingHorizontal.regular,
      ...(fillParent ? style.layout.fill : {}),
      borderColor: error ? value.color.danger : value.color.driverBorder,
      fontFamily: AppFontFamily.ROBOTO,
      ...(isCountryCode ? style.gutter.paddingLeft.inputHeight : {}),
      ...(isCenter ? style.layout.textAlignCenter : {}),
    },
    placeholder: {
      color: value.color.placeholder,
    },
    errorContainer: style.gutter.marginTop.tiny,
  });
}
export type AppTextInputProps = Omit<TextInputProps, 'style'> &
  StyleProps<ViewStyle> & {
    errorText?: string;
    fillParent?: boolean;
    isCountryCode?: boolean;
    isCenter?: boolean;
  } & {
    textInputStyle?: StyleProps<TextStyle | ViewStyle>;
  };
export const AppTextInput = ({
  style,
  errorText,
  fillParent = true,
  isCountryCode,
  isCenter,
  textInputStyle,
  ...props
}: AppTextInputProps) => {
  const themeStyle = useAppTextInputStyle(
    fillParent,
    errorText !== undefined,
    isCountryCode,
    isCenter,
  );
  return (
    <View style={[themeStyle.container, style]}>
      <TextInput
        {...props}
        style={[
          themeStyle.containerInput,
          //@ts-ignore
          !isUndefined(textInputStyle) && textInputStyle,
        ]}
        placeholderTextColor={themeStyle.placeholder.color}
      />
      {errorText !== undefined && (
        <ValidationText mode="error" style={themeStyle.errorContainer}>
          {errorText}
        </ValidationText>
      )}
    </View>
  );
};
