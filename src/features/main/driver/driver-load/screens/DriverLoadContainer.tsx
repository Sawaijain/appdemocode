import {FlatList, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import RootNavigator from '@/libs/navigation/RootNavigation';
import {useAppSelector} from '@/redux/AppStore';
import {useStyle} from '../../styles/useStyle';
import TruckBaseScreen from '@/features/base/screens/TruckBaseScreen';
import DriverHeader from '../components/DriverHeader';
import AppButton from '@/components/AppButton';
import strings from '@/util/Strings';
import DriverLoadComponent from '../components/DriverLoadComponent';
import {
  getDriverCompletedLoads,
  getDriverLoads,
} from '@/redux/actions/DriverAction';
import RenderEmpty from '@/components/RenderEmpty';
import {sleep} from '@/libs';

const DriverLoadContainer = () => {
  const style = useStyle();
  const auth = useAppSelector((state) => state.auth);
  const [tabName, setTabName] = useState<'current' | 'completed'>('current');
  const driverLoads = useAppSelector((state) => state.driver.driverLoads);
  const [isRefresh, setIsRefresh] = useState<boolean>(false);
  const driverCompletedLoads = useAppSelector(
    (state) => state.driver.driverCompletedLoads,
  );
  useEffect(() => {
    if (tabName == 'current') {
      getDriverLoads(auth?.mobile_number);
    } else {
      getDriverCompletedLoads(auth?.mobile_number);
    }
  }, [tabName]);
  const onRefresh = React.useCallback(() => {
    setIsRefresh(true);
    if (tabName == 'current') {
      getDriverLoads(auth?.mobile_number);
    } else {
      getDriverCompletedLoads(auth?.mobile_number);
    }
    sleep(2000).then(() => setIsRefresh(false));
  }, []);
  return (
    <TruckBaseScreen
      profileType={auth.userDetails?.profileType}
      children={
        <React.Fragment>
          <DriverHeader />
          <View style={style.innerContainer}>
            <View style={style.buttonRow}>
              <AppButton
                textColor={
                  tabName == 'current' ? style.color.white : style.color.tabText
                }
                buttonStyle={[
                  style.buttonWhite,
                  tabName == 'current' && style.buttonActive,
                ]}
                label={strings.current}
                mode="defaultBold"
                onPress={() => setTabName('current')}
              />
              <AppButton
                textColor={
                  tabName == 'completed'
                    ? style.color.white
                    : style.color.tabText
                }
                buttonStyle={[
                  style.buttonWhite,
                  tabName == 'completed' && style.buttonActive,
                ]}
                label={strings.comple}
                mode="defaultBold"
                onPress={() => setTabName('completed')}
              />
            </View>
            <FlatList
              data={tabName == 'current' ? driverLoads : driverCompletedLoads}
              renderItem={({item}) => <DriverLoadComponent item={item} />}
              keyExtractor={(item, index) => index?.toString()}
              ListFooterComponent={<View />}
              ListFooterComponentStyle={{height: 200}}
              onRefresh={onRefresh}
              refreshing={isRefresh}
              ListEmptyComponent={
                <RenderEmpty title="अभी तक कोई शिपमेंट नहीं !" />
              }
            />
          </View>
        </React.Fragment>
      }
    />
  );
};
DriverLoadContainer.SCREEN_NAME = 'DriverLoadContainer';
DriverLoadContainer.navigationOptions = {
  headerShown: false,
};
DriverLoadContainer.navigate = () => {
  RootNavigator.navigate(DriverLoadContainer.SCREEN_NAME);
};
export default DriverLoadContainer;
