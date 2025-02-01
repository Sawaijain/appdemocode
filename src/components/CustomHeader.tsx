import useShipperStyle from '@/libs/customStyles/ShipperStyle';
import {navigationRef} from '@/libs/navigation/RootNavigation';
import IMAGE_URL from '@/theme/ImageUrl';
import {DrawerActions, ParamListBase} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {BackIcon, MenuIcon, NotificationIcon} from './icons/Icon';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
interface HeaderProps {
  isBack?: boolean;
  shipmentPage?: boolean;
  loggedIn?: boolean;
  navigation:
    | NativeStackNavigationProp<ParamListBase, string, undefined>
    | BottomTabNavigationProp<ParamListBase, string, undefined>;
}
const CustomHeader = ({
  isBack,
  shipmentPage,
  navigation,
  loggedIn,
}: HeaderProps) => {
  const state: any = navigation.getState();

  const style = useShipperStyle();
  return (
    <React.Fragment>
      <View style={style.header}>
        <View style={style.headerInner}>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            {isBack === true ? (
              <TouchableOpacity
                onPress={navigation.goBack}
                style={style.headerLeftBack}>
                <BackIcon color="white" size={30} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={style.headerLeftMenu}
                onPress={() => {
                  if (loggedIn)
                    navigationRef?.current?.dispatch(
                      DrawerActions.openDrawer(),
                    );
                }}>
                <MenuIcon color="white" size={30} />
              </TouchableOpacity>
            )}
          </View>
          <View style={style.headerLogoWrap}>
            <Image source={IMAGE_URL.logo} style={style.headerLogo} />
          </View>
          {shipmentPage && (
            <TouchableOpacity
              onPress={() =>
                state.routes[0].params && state.routes[0].params?.showFilter()
              }
              style={style.headerFilterWrap}>
              <Image
                source={IMAGE_URL.filterWhite}
                style={style.headerFilter}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[
              style.headerNotificationWrap,
              {maxWidth: shipmentPage ? 50 : 100},
            ]}
            onPress={() => {
              loggedIn && navigation?.navigate('Notification');
            }}>
            <NotificationIcon color="white" size={30} />
          </TouchableOpacity>
        </View>
      </View>
    </React.Fragment>
  );
};
export default CustomHeader;
