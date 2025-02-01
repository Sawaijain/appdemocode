import {View, Text} from 'react-native';
import React from 'react';
import RootNavigator from '@/libs/navigation/RootNavigation';

const SupportContainer = () => {
  return (
    <View>
      <Text>SupportContainer</Text>
    </View>
  );
};

SupportContainer.SCREEN_NAME = 'SupportContainer';
SupportContainer.navigationOptions = {
  headerShown: false,
};
SupportContainer.navigate = () => {
  RootNavigator.navigate(SupportContainer.SCREEN_NAME);
};

export default SupportContainer;
