import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ActiveLoadContainer from '@/features/main/loads/ActiveLoadContainer';
import LoadSearchContainer from '@/features/main/loads/LoadSearchContainer';
import RootNavigator from '@/libs/navigation/RootNavigation';
const LoadStack = createNativeStackNavigator();
const LoadStackNavigation = () => {
  return (
    <LoadStack.Navigator>
      <LoadStack.Screen
        name={ActiveLoadContainer.SCREEN_NAME}
        component={ActiveLoadContainer}
        options={{headerShown: false}}
      />
      <LoadStack.Screen
        name={LoadSearchContainer.SCREEN_NAME}
        component={LoadSearchContainer}
        options={{headerShown: false}}
      />
    </LoadStack.Navigator>
  );
};

LoadStackNavigation.SCREEN_NAME = 'LoadStackNavigation';
LoadStackNavigation.navigate = () => {
  RootNavigator.navigate(LoadStackNavigation.SCREEN_NAME);
};
export default LoadStackNavigation;
