import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Notification from '@/features/main/common-pages/Notification';
import CustomHeader from '@/components/CustomHeader';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/AppStore';
import TruckContainer from '@/features/main/truck/Screens/TruckContainer';
import InventoryContainer from '@/features/main/Inventory/Screens/InventoryContainer';
const RootStack = createNativeStackNavigator();
const TruckStack = () => {
  const {
    token,
    loggedIn,
    userDetails: {user_id},
    isFromRegister,
  }: any = useSelector((state: RootState) => state.auth);
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name={InventoryContainer.SCREEN_NAME}
        component={InventoryContainer}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name={TruckContainer.SCREEN_NAME}
        component={TruckContainer}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name={Notification.SCREEN_NAME}
        component={Notification}
        options={{
          header: ({navigation}) => (
            <CustomHeader navigation={navigation} loggedIn={loggedIn} />
          ),
        }}
      />
    </RootStack.Navigator>
  );
};

export default TruckStack;
