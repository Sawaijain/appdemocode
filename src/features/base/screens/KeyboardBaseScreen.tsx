import {isAndroid} from '@/libs';
import * as React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
interface KeyboardBaseScreenProps {
  backgroundColor?: string;
  scrollChildren?: React.ReactNode;
  children?: React.ReactNode;
}

const KeyboardBaseScreen = (props: KeyboardBaseScreenProps) => {
  const extraStyle = props.backgroundColor
    ? {backgroundColor: props.backgroundColor}
    : undefined;

  return (
    <SafeAreaView style={[styles.container, extraStyle]}>
      <KeyboardAvoidingView
        style={!isAndroid && styles.containerKeyboardAvoidingView}
        behavior={'padding'}
        enabled
        keyboardVerticalOffset={isAndroid ? -300 : 40}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled>
          {!!props.scrollChildren && props.scrollChildren}
        </ScrollView>
        {!!props.children && props.children}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  containerKeyboardAvoidingView: {
    flex: 1,
  },
});

export default KeyboardBaseScreen;
