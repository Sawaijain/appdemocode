import {StyleSheet} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AppTheme} from '@/theme/Default/AppTheme';
import {normalize} from '@/theme/Utils';
import {useTheme} from '@/hooks/useTheme';
import Truck from '@/assets/svgs/Truck';
import strings from '@/util/Strings';
import Search from '@/assets/svgs/Search';
import OrderContainer from '@/features/main/order/OrderContainer';
import Order from '@/assets/svgs/Order';
import Payment from '@/assets/svgs/Payment';
import RootNavigator from '@/libs/navigation/RootNavigation';
import AppHomeTopTab from './AppHomeTopTab';
import LoadHeader from './component/LoadHeader';
import LoadStackNavigation from './component/LoadStackNavigation';
import LoadPaymentContainer from '@/features/main/payment/LoadPaymentContainer';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/AppStore';
import InventoryContainer from '@/features/main/Inventory/Screens/InventoryContainer';
import ActiveLoadContainer from '@/features/main/loads/ActiveLoadContainer';
const Tab = createBottomTabNavigator();
const AppBottomTab = () => {
  const theme = useTheme();
  const {
    value: {color},
  } = theme;
  const style = useStyle(theme);
  const {userDetails}: any = useSelector((state: RootState) => state.auth);

  return (
    <Tab.Navigator
      initialRouteName={AppHomeTopTab.SCREEN_NAME}
      backBehavior="none"
      screenOptions={{
        tabBarActiveTintColor: color.white,
        tabBarInactiveTintColor: color.uploadText,
        tabBarStyle: style.tabBar,
        tabBarLabelStyle: style.tabText,
        tabBarHideOnKeyboard: true,
        tabBarActiveBackgroundColor:
          userDetails?.profileType == 'transporter'
            ? color.transporter
            : color.buttonNew,
        unmountOnBlur: true,
        lazy: false,
      }}>
      <Tab.Screen
        name={AppHomeTopTab.SCREEN_NAME}
        component={AppHomeTopTab}
        options={{
          tabBarIcon: (props) => <Truck color={props.color} />,
          tabBarLabel: strings.tabs.truck,
          headerShown: false,
          unmountOnBlur: true,
          lazy: false,
        }}
        listeners={({navigation, route}) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate(AppHomeTopTab.SCREEN_NAME, {
              screen: InventoryContainer.SCREEN_NAME,
            });
          },
        })}
      />
      <Tab.Screen
        name={LoadStackNavigation.SCREEN_NAME}
        component={LoadStackNavigation}
        options={{
          tabBarIcon: (props) => <Search color={props.color} />,
          tabBarLabel: strings.myLanes,
          header: () => <LoadHeader title="load" />,
          unmountOnBlur: true,
        }}
        listeners={({navigation, route}) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate(LoadStackNavigation.SCREEN_NAME, {
              screen: ActiveLoadContainer.SCREEN_NAME,
            });
          },
        })}
      />
      <Tab.Screen
        name={OrderContainer.SCREEN_NAME}
        component={OrderContainer}
        options={{
          tabBarIcon: (props) => <Order color={props.color} />,
          tabBarLabel: strings.myorder,
          header: () => <LoadHeader title="order" />,
          unmountOnBlur: true,
        }}
        listeners={({navigation, route}) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate(OrderContainer.SCREEN_NAME);
          },
        })}
      />
      <Tab.Screen
        name={LoadPaymentContainer.SCREEN_NAME}
        component={LoadPaymentContainer}
        options={{
          tabBarIcon: (props) => <Payment color={props.color} />,
          tabBarLabel: strings.tabs.payment,
          header: () => <LoadHeader title="payment" />,
          unmountOnBlur: true,
        }}
        listeners={({navigation, route}) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate(LoadPaymentContainer.SCREEN_NAME);
          },
        })}
      />
      {/* <Tab.Screen
        name={SupportContainer.SCREEN_NAME}
        component={SupportContainer}
        options={{
          tabBarIcon: (props) => <Support color={props.color} />,
          tabBarLabel: strings.tabs.support,
          headerShown: false,
        }}
      /> */}
    </Tab.Navigator>
  );
};

AppBottomTab.SCREEN_NAME = 'AppBottomTab';
AppBottomTab.navigationOptions = {
  headerShown: false,
};
AppBottomTab.navigate = () => {
  RootNavigator.navigate(AppBottomTab.SCREEN_NAME);
};

export default AppBottomTab;
function useStyle(theme: AppTheme) {
  const {
    value: {color},
  } = theme;
  return StyleSheet.create({
    tabBar: {
      elevation: 16,
      height: normalize(70),
      borderTopWidth: 1,
      backgroundColor: color.black,
      paddingBottom: 0,
      borderColor: color.white,
    },
    icon: {
      height: normalize(30),
      width: normalize(30),
    },
    tabText: {
      fontSize: normalize(16),
      paddingBottom: 5,
    },
  });
}
