import {StyleSheet} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import InventoryContainer from '@/features/main/Inventory/Screens/InventoryContainer';
import TruckContainer from '@/features/main/truck/Screens/TruckContainer';
import NotificationContainer from '@/features/main/common-pages/Notification';
import MyProfileContainer from '@/features/main/kyc/MyProfileContainer';
import RootNavigator, {navigationRef} from '@/libs/navigation/RootNavigation';
import {AppTheme} from '@/theme/Default/AppTheme';
import {useTheme} from '@/hooks/useTheme';
import TruckHeaderComponent from '@/features/main/Component/TruckHeaderComponent';
import MatchedLoadContainer from '@/features/main/matched-loads/screen/MatchedLoadContainer';
import ProfileContainer from '@/features/main/kyc/ProfileContainer';

const Tab = createMaterialTopTabNavigator();
const AppHomeTopTab = () => {
  const theme = useTheme();
  const style = useStyle(theme);

  return (
    <Tab.Navigator
      initialRouteName={InventoryContainer.SCREEN_NAME}
      backBehavior="initialRoute"
      screenOptions={{
        tabBarStyle: style.tabbar,
        lazy: false,
        swipeEnabled: false,
      }}
      tabBar={(props) => {
        const routeName = navigationRef.current?.getCurrentRoute();
        if (
          String(routeName?.name) === MatchedLoadContainer.SCREEN_NAME ||
          String(routeName?.name) === ProfileContainer.SCREEN_NAME
        ) {
          return null;
        }
        return <TruckHeaderComponent {...props} />;
      }}>
      <Tab.Screen
        name={InventoryContainer.SCREEN_NAME}
        component={InventoryContainer}
        options={{animationEnabled: false}}
      />
      <Tab.Screen
        name={TruckContainer.SCREEN_NAME}
        component={TruckContainer}
      />
      <Tab.Screen
        name={NotificationContainer.SCREEN_NAME}
        component={NotificationContainer}
      />
      <Tab.Screen
        name={ProfileContainer.SCREEN_NAME}
        component={ProfileContainer}
      />
      <Tab.Screen
        name={MatchedLoadContainer.SCREEN_NAME}
        component={MatchedLoadContainer}
      />
      {/* <Tab.Screen
        name={MyTruckContainer.SCREEN_NAME}
        component={MyTruckContainer}
      /> */}
    </Tab.Navigator>
  );
};
AppHomeTopTab.SCREEN_NAME = 'AppHomeTopTab';
AppHomeTopTab.navigationOptions = {
  headerShown: false,
};
AppHomeTopTab.navigate = () => {
  RootNavigator.navigate(AppHomeTopTab.SCREEN_NAME);
};

export default AppHomeTopTab;
function useStyle(theme: AppTheme) {
  return StyleSheet.create({
    tabbar: {
      shadowOffset: {
        width: 0,
        height: 0,
      },
      elevation: 0,
      zIndex: 0,
    },
  });
}
