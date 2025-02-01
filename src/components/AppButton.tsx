import React, {memo} from 'react';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import {AppText} from './AppText';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    paddingLeft: 40,
    paddingRight: 40,
    borderRadius: 11,
  },
  elevation: {
    elevation: 10,
    shadowOpacity: 0.15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 20},
    shadowRadius: 8,
  },
  label: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 15,
    color: 'white',
    letterSpacing: 2,
    textAlign: 'center',
  },
  icon: {
    marginLeft: 8,
  },
  leftIcon: {
    marginRight: 8,
  },
  containerPrimaryVariant: {
    backgroundColor: 'black',
    borderWidth: 0,
  },
  containerDefaultVariant: {
    backgroundColor: 'black',
    borderWidth: 1,
  },
  containerDisabled: {
    backgroundColor: '#ddd',
  },
});

export enum AppButtonType {
  DEFAULT,
  PRIMARY,
  SOCIAL,
}

interface ButtonProps {
  variant?: AppButtonType;
  label: string;
  icon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  onPress?: () => void;
  isElevated?: boolean;
  textColor?: string;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  isEnabled?: boolean;
  mode?:
    | 'default'
    | 'defaultBold'
    | 'alternative'
    | 'header'
    | 'title'
    | 'description'
    | 'contact';
}

const AppButton = ({
  variant = AppButtonType.PRIMARY,
  label,
  onPress,
  icon,
  isElevated = false,
  textColor = 'white',
  textStyle,
  buttonStyle,
  isEnabled = true,
  mode = 'alternative',
  leftIcon,
}: ButtonProps) => {
  let variantStyle;
  switch (variant) {
    case AppButtonType.PRIMARY:
      variantStyle = styles.containerPrimaryVariant;
      break;
    default:
      variantStyle = styles.containerDefaultVariant;
      break;
  }
  return (
    <TouchableOpacity
      style={[
        styles.container,
        variantStyle,
        !isEnabled && styles.containerDisabled,
        isElevated && styles.elevation,
        buttonStyle,
      ]}
      disabled={!isEnabled}
      onPress={() => (isEnabled && onPress ? onPress() : null)}>
      {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
      <AppText
        mode={mode}
        style={[styles.label, textStyle, , {...{color: textColor}}]}>
        {label}
      </AppText>
      {icon && <View style={styles.icon}>{icon}</View>}
    </TouchableOpacity>
  );
};

export default memo(AppButton);
