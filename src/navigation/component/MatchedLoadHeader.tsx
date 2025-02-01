import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';
import {useTruckHeaderStyle} from '@/features/main/Component/useTruckHeaderStyle';
import {useTheme} from '@/hooks/useTheme';
import LinearGradient from 'react-native-linear-gradient';
import {BackIcon} from '@/components/icons/Icon';
import {useInventoryStyle} from '@/features/main/Inventory/Styles/useInventoryStyle';
import {AppText} from '@/components/AppText';
import Notification from '@/assets/svgs/Notification';
import IMAGE_URL from '@/theme/ImageUrl';
import {normalize} from '@/theme/Utils';
import RootNavigator from '@/libs/navigation/RootNavigation';
import NotificationContainer from '@/features/main/common-pages/Notification';
import MyProfileContainer from '@/features/main/kyc/MyProfileContainer';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/AppStore';
import UserKycContainer from '@/features/main/kyc/UserKycContainer';
const MatchedLoadHeader = ({data}: any) => {
  const {
    value,
    style: {layout, gutter},
  } = useTheme();
  const style = useTruckHeaderStyle();
  const inventoryStyle = useInventoryStyle();
  const tabStyle = useStyle();
  const userDetails: any = useSelector(
    (state: RootState) => state.auth.userDetails,
  );
  const handleNavigate = () => {
    if (userDetails && !userDetails?.is_KYC_completed) {
      UserKycContainer.navigate();
    } else {
      MyProfileContainer.navigate();
    }
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
      <View style={layout.row}>
        <TouchableOpacity
          style={[
            tabStyle.arrowIcon,
            {
              backgroundColor:
                userDetails?.profileType == 'transporter'
                  ? value.color.transporter
                  : value.color.buttonNew,
            },
          ]}
          onPress={() => RootNavigator.pop()}>
          <BackIcon size={30} color={value.color.white} />
        </TouchableOpacity>
        <View
          style={[
            inventoryStyle.locationContainer,
            layout.fill,
            gutter.marginLeft.large,
            gutter.marginRight.regular,
          ]}>
          <View style={inventoryStyle.origin}>
            <View
              style={[
                inventoryStyle.dot,
                {
                  top: 7,
                  backgroundColor:
                    userDetails?.profileType == 'transporter'
                      ? value.color.transporter
                      : value.color.buttonNew,
                },
              ]}
            />
            <AppText style={inventoryStyle.originLocation}>
              {data?.origin?.name?.replace(', India', '')}
            </AppText>
            <View style={[inventoryStyle.originLine]} />
          </View>
          <View style={[inventoryStyle.line, {left: 0, height: 39}]} />
          <View style={[inventoryStyle.origin, {marginTop: -10}]}>
            <View
              style={[
                inventoryStyle.dot,
                {
                  top: 7,
                  backgroundColor:
                    userDetails?.profileType == 'transporter'
                      ? value.color.transporter
                      : value.color.buttonNew,
                },
              ]}
            />
            <AppText style={inventoryStyle.originLocation}>
              {data?.destination?.name?.replace(', India', '')}
            </AppText>
          </View>
        </View>
        <TouchableOpacity
          style={tabStyle.notification}
          onPress={() => NotificationContainer.navigate()}>
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

export default MatchedLoadHeader;
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
