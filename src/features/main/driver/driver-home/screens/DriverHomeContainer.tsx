import {View, Image, Linking, RefreshControl} from 'react-native';
import React, {useEffect, useState} from 'react';
import RootNavigator, {navigationRef} from '@/libs/navigation/RootNavigation';
import {appDispatch, useAppSelector} from '@/redux/AppStore';
import TruckBaseScreen from '@/features/base/screens/TruckBaseScreen';
import {useStyle} from '../../styles/useStyle';
import IMAGE_URL from '@/theme/ImageUrl';
import {AppText} from '@/components/AppText';
import strings from '@/util/Strings';
import AppButton from '@/components/AppButton';
import DriverLoadCard from '../components/DriverLoadCard';
import DriverLoadContainer from '../../driver-load/screens/DriverLoadContainer';
import AppTouchableOpacity from '@/components/AppTouchableOpacity';
import {useIsFocused} from '@react-navigation/native';
import {getDriverLoads} from '@/redux/actions/DriverAction';
import {SignOutIcon} from '@/components/icons/Icon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setClearState} from '@/redux/reducers/authSlice';
import {sleep} from '@/libs';
import SignInContainer from '@/features/auth/SignInContainer';
import {ScrollView} from 'native-base';

const DriverHomeContainer = () => {
  const style = useStyle();
  const auth = useAppSelector((state) => state.auth);
  const driverLoads = useAppSelector((state) => state.driver.driverLoads);
  const [isRefresh, setIsRefresh] = useState<boolean>(false);
  const isFocus = useIsFocused();
  useEffect(() => {
    getDriverLoads(auth?.mobile_number);
  }, [isFocus]);
  const handleLogout = () => {
    AsyncStorage.clear();
    appDispatch({type: 'LOGOUT'});
    appDispatch(setClearState());
    AsyncStorage.removeItem('persist:root');
    sleep(200).then(() =>
      navigationRef.current?.navigate(SignInContainer.SCREEN_NAME),
    );
  };
  const onRefresh = React.useCallback(() => {
    setIsRefresh(true);
    getDriverLoads(auth?.mobile_number);
    sleep(2000).then(() => setIsRefresh(false));
  }, []);
  return (
    <TruckBaseScreen
      profileType={auth.userDetails?.profileType}
      children={
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={isRefresh} onRefresh={onRefresh} />
          }>
          <View style={style.innerContainer}>
            <View style={style.upperWrap}>
              <View style={style.profile}>
                <View style={style.profileImage} />
                <AppText mode="defaultBold" style={style.name}>
                  {auth?.userDetails?.owner_name}
                </AppText>
              </View>
              <AppTouchableOpacity
                onPress={handleLogout}
                children={<SignOutIcon size={20} color={style.color.black} />}
              />
            </View>
            <View style={style.buttonContainer}>
              <AppText mode="defaultBold">{strings.my_Order}</AppText>
              <AppButton
                onPress={() => DriverLoadContainer.navigate()}
                buttonStyle={style.showCompleteOrder}
                textStyle={style.buttonText}
                label={strings.my_completed_order}
                textColor={style.color.driverColor}
              />
            </View>
            {driverLoads &&
              driverLoads?.length > 0 &&
              driverLoads?.map((item, index) => (
                <React.Fragment key={index}>
                  {index < 1 && <DriverLoadCard item={item} />}
                </React.Fragment>
              ))}
            <View style={style.referCard}>
              <Image source={IMAGE_URL.refer} style={style.referImage} />
              <AppTouchableOpacity
                onPress={() =>
                  Linking.openURL(
                    'https://play.google.com/store/apps/developer?id=Anati+Technologies+Pvt.+Ltd',
                  )
                }
                children={
                  <Image
                    source={IMAGE_URL.googleplay}
                    style={style.googlePlay}
                  />
                }
              />
            </View>
          </View>
        </ScrollView>
      }
    />
  );
};
DriverHomeContainer.SCREEN_NAME = 'DriverHomeContainer';
DriverHomeContainer.navigationOptions = {
  headerShown: false,
};
DriverHomeContainer.navigate = () => {
  RootNavigator.navigate(DriverHomeContainer.SCREEN_NAME);
};
export default DriverHomeContainer;
