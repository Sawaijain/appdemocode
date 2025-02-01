import React from 'react';
import {NavigationContainerRef} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export const navigationRef = React.createRef<NavigationContainerRef<any>>();

class RootNavigatorClass {
  isReadyRef = false;

  navigate(screen: string, params?: Record<string, any>) {
    if (this.isReadyRef && navigationRef.current) {
      navigationRef.current?.navigate(screen, params);
    }
  }

  replace(
    {navigation}: NativeStackScreenProps<any>,
    screen: string,
    params?: Record<string, any>,
  ) {
    if (this.isReadyRef && navigation) {
      navigation.replace(screen, params);
    }
  }

  clear(screenName: string, params?: Record<string, string>) {
    if (this.isReadyRef && navigationRef.current) {
      navigationRef.current?.reset({
        index: 0,
        routes: [{name: screenName, params: params}],
      });
    }
  }

  pop() {
    if (this.isReadyRef && navigationRef.current) {
      navigationRef.current?.goBack();
    }
  }
}

const RootNavigator = new RootNavigatorClass();
export default RootNavigator;
