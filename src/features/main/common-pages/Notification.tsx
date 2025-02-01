import {CloseIcon} from '@/components/icons/Icon';
import useShipperStyle, {APPCOLORS} from '@/libs/customStyles/ShipperStyle';
import RootNavigator, {navigationRef} from '@/libs/navigation/RootNavigation';
import {
  changeNotificationStatus,
  clearAllNotification,
  getNotification,
} from '@/redux/actions/NotificationAction';
import {useIsFocused} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View, TouchableOpacity, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {showAlert} from '@/components/Alert';
import AppButton from '@/components/AppButton';
import RenderEmpty from '@/components/RenderEmpty';
import {AppText} from '@/components/AppText';
import {RootState} from '@/redux/AppStore';
import TruckBaseScreen from '@/features/base/screens/TruckBaseScreen';
import {useTheme} from '@/hooks/useTheme';
const NotificationContainer = () => {
  const style = useShipperStyle();
  const {user_id, profileType}: any = useSelector(
    (state: RootState) => state.auth.userDetails,
  );
  const notificationData = useSelector(
    (state: RootState) => state.notification.notificationData,
  );
  const isFocused = useIsFocused();
  useEffect(() => {
    getNotification(user_id);
  }, [isFocused]);
  const callBack = (success: boolean, error?: string) => {
    if (success) {
      getNotification(user_id);
    } else if (!success) {
      showAlert({message: String(error)});
    }
  };
  const {
    value: {color},
  } = useTheme();
  return (
    <TruckBaseScreen
      scrollChildren={
        <React.Fragment>
          <View style={style.notificationHeader}>
            <AppText mode="defaultBold" style={style.notificationText}>
              Notifications
            </AppText>
            <TouchableOpacity onPress={() => navigationRef.current?.goBack()}>
              <CloseIcon color={APPCOLORS.darkBlack} size={30} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={notificationData || []}
            renderItem={({item, index}) => {
              return (
                <React.Fragment key={index}>
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        changeNotificationStatus(
                          {
                            notification_id: item.notification_id,
                            read_by_shipper: true,
                          },
                          callBack,
                        );
                      }}
                      style={{
                        backgroundColor: item.read_by_shipper
                          ? 'white'
                          : profileType == 'transporter'
                          ? color.transporterLight
                          : color.linear.color3,
                        padding: 20,
                        flexDirection: 'row',
                        borderBottomColor: '#f2f2f2',
                        borderBottomWidth: 1,
                        width: '100%',
                        alignItems: 'center',
                      }}>
                      <Ionicons
                        name="notifications-circle-sharp"
                        color={APPCOLORS.darkBlack}
                        size={20}
                      />
                      <AppText
                        style={{
                          color: APPCOLORS.darkBlack,
                          fontSize: 13,
                          marginHorizontal: 20,
                          fontWeight:
                            item.read_by_carrier === false ? '700' : '300',
                        }}>
                        {item.message}
                      </AppText>
                    </TouchableOpacity>
                  </View>
                </React.Fragment>
              );
            }}
            ListEmptyComponent={
              <RenderEmpty title="No notification found yet!" />
            }
          />
          {notificationData && notificationData.length > 0 && (
            <AppButton
              label="Clear"
              onPress={() => {
                clearAllNotification({shipperId: user_id}, callBack);
              }}
              buttonStyle={[
                style.clearNotification,
                {
                  backgroundColor:
                    profileType == 'transporter'
                      ? color.transporter
                      : color.buttonNew,
                },
              ]}
              textColor={'white'}
            />
          )}
        </React.Fragment>
      }
    />
  );
};
NotificationContainer.SCREEN_NAME = 'NotificationContainer';
NotificationContainer.navigationOptions = {
  headerShown: false,
};
NotificationContainer.navigate = () => {
  RootNavigator.navigate(NotificationContainer.SCREEN_NAME);
};
export default NotificationContainer;
