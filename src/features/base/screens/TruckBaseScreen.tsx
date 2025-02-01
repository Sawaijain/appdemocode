import {useTheme} from '@/hooks/useTheme';
import {isAndroid} from '@/libs';
import * as React from 'react';
import {ScrollView, StyleSheet, KeyboardAvoidingView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
interface KeyboardBaseScreenProps {
  backgroundColor?: string;
  scrollChildren?: React.ReactNode;
  children?: React.ReactNode;
  profileType?: string;
}

const TruckBaseScreen = (props: KeyboardBaseScreenProps) => {
  const extraStyle = props.backgroundColor
    ? {backgroundColor: props.backgroundColor}
    : undefined;
  const {
    value: {color},
  } = useTheme();
  return (
    <LinearGradient
      colors={[
        props?.profileType == 'driver'
          ? 'rgba(93, 111, 205, 0.69)'
          : props?.profileType == 'transporter'
          ? color.transporterLight
          : color.linear.color2,
        color.linear.color3,
        color.linear.color4,
      ]}
      style={[styles.container, extraStyle]}>
      <KeyboardAvoidingView
        style={!!props.scrollChildren && styles.containerKeyboardAvoidingView}
        behavior={isAndroid ? 'height' : 'padding'}
        enabled
        keyboardVerticalOffset={isAndroid ? -300 : 40}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
          keyboardShouldPersistTaps="handled">
          {!!props.scrollChildren && props.scrollChildren}
        </ScrollView>
        {!!props.children && props.children}
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  containerKeyboardAvoidingView: {
    flex: 1,
  },
});

export default TruckBaseScreen;
