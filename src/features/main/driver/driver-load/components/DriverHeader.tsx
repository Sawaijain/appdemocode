import {View} from 'react-native';
import React from 'react';
import {useStyle} from '../../styles/useStyle';
import AppTouchableOpacity from '@/components/AppTouchableOpacity';
import {AppText} from '@/components/AppText';
import strings from '@/util/Strings';
import {ChevronLeftIcon} from 'native-base';
import {SignOutIcon} from '@/components/icons/Icon';
import SignInContainer from '@/features/auth/SignInContainer';
import {sleep} from '@/libs';
import RootNavigator, {navigationRef} from '@/libs/navigation/RootNavigation';
import {appDispatch} from '@/redux/AppStore';
import {setClearState} from '@/redux/reducers/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DriverHeader = () => {
  const style = useStyle();
  const handleLogout = () => {
    AsyncStorage.clear();
    appDispatch({type: 'LOGOUT'});
    appDispatch(setClearState());
    AsyncStorage.removeItem('persist:root');
    sleep(200).then(() =>
      navigationRef.current?.navigate(SignInContainer.SCREEN_NAME),
    );
  };
  return (
    <View style={style.rowHeader}>
      <AppTouchableOpacity
        onPress={() => RootNavigator.pop()}
        style={style.backIcon}
        children={<ChevronLeftIcon size={5} color={style.color.black} />}
      />
      <AppText mode="defaultBold">{strings.my_completed_order}</AppText>
      <AppTouchableOpacity
        onPress={handleLogout}
        children={<SignOutIcon size={20} color={style.color.black} />}
      />
    </View>
  );
};

export default DriverHeader;
