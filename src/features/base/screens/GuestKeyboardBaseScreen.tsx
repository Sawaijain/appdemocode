import {useTheme} from '@/hooks/useTheme';
import {isAndroid} from '@/libs';
import IMAGE_URL from '@/theme/ImageUrl';
import * as React from 'react';
import {Dimensions} from 'react-native';
import {
  ScrollView,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  ImageBackground,
} from 'react-native';
interface KeyboardBaseScreenProps {
  backgroundColor?: string;
  scrollChildren?: React.ReactNode;
  children?: React.ReactNode;
}

const GuestKeyboardBaseScreen = (props: KeyboardBaseScreenProps) => {
  const extraStyle = props.backgroundColor
    ? {backgroundColor: props.backgroundColor}
    : undefined;
  return (
    <SafeAreaView style={[styles.container, extraStyle]}>
      <ImageBackground source={IMAGE_URL.bg} style={[styles.imageBg]}>
        <KeyboardAvoidingView
          style={styles.containerKeyboardAvoidingView}
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
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  containerKeyboardAvoidingView: {
    flex: 1,
  },
  imageBg: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default GuestKeyboardBaseScreen;
