import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';
import {useTruckHeaderStyle} from '@/features/main/Component/useTruckHeaderStyle';
import {useTheme} from '@/hooks/useTheme';
import LinearGradient from 'react-native-linear-gradient';
import {AppText} from '@/components/AppText';
import Notification from '@/assets/svgs/Notification';
import IMAGE_URL from '@/theme/ImageUrl';
import {normalize} from '@/theme/Utils';
import NotificationContainer from '@/features/main/common-pages/Notification';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/AppStore';
import strings from '@/util/Strings';
import {navigationRef} from '@/libs/navigation/RootNavigation';
import AppHomeTopTab from '../AppHomeTopTab';
import ProfileContainer from '@/features/main/kyc/ProfileContainer';
const LoadHeader = ({title}: {title: string}) => {
  const {
    value,
    style: {layout, gutter},
  } = useTheme();
  const style = useTruckHeaderStyle();
  const tabStyle = useStyle();
  const userDetails: any = useSelector(
    (state: RootState) => state.auth.userDetails,
  );
  const handleNavigate = () => {
    navigationRef.current?.navigate(AppHomeTopTab.SCREEN_NAME, {
      screen: ProfileContainer.SCREEN_NAME,
    });
  };
  return (
    <LinearGradient
      style={style.box}
      colors={[
        userDetails?.profileType == 'transporter'
          ? value.color.transporter
          : value.color.linear.color1,
        userDetails?.profileType == 'transporter'
          ? value.color.transporterLight
          : value.color.linear.color2,
      ]}>
      <View style={[layout.row, gutter.gap.small]}>
        <View
          style={[
            layout.fill,
            layout.justifyContentCenter,
            gutter.marginLeft.regular,
          ]}>
          <View>
            <AppText>
              {title === 'load'
                ? strings.myLanes
                : title === 'payment'
                ? strings.tabs.payment
                : strings.tabs.order}
            </AppText>
          </View>
        </View>
        <TouchableOpacity
          style={tabStyle.notification}
          onPress={() =>
            navigationRef.current?.navigate(AppHomeTopTab.SCREEN_NAME, {
              screen: NotificationContainer.SCREEN_NAME,
            })
          }>
          <Notification
            currentColor={
              userDetails?.profileType == 'transporter'
                ? value.color.transporter
                : value.color.buttonNew
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={tabStyle.profile}
          onPress={() => handleNavigate()}>
          <Image
            source={IMAGE_URL.bg}
            style={[
              tabStyle.profileImage,
              {
                borderColor:
                  userDetails?.profileType == 'transporter'
                    ? value.color.transporter
                    : value.color.buttonNew,
              },
            ]}
          />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default LoadHeader;
function useStyle() {
  const {
    style: {layout, gutter},
    value: {color},
  } = useTheme();
  return StyleSheet.create({
    arrowIcon: {
      height: 40,
      width: 40,
      backgroundColor: color.buttonNew,
      borderRadius: 20,
      ...layout.center,
      ...layout.fill,
      maxWidth: 40,
    },
    notification: {
      maxWidth: 30,
      ...layout.fill,
    },
    profile: {
      maxWidth: 60,
      ...layout.fill,
    },
    profileImage: {
      width: normalize(40),
      height: normalize(40),
      backgroundColor: color.white,
      borderRadius: 100,
      ...gutter.marginLeft.normal,
      borderWidth: normalize(5),
      borderColor: color.buttonNew,
    },
  });
}
