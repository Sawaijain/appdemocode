import AppButton from '@/components/AppButton';
import {useTheme} from '@/hooks/useTheme';
import IMAGE_URL from '@/theme/ImageUrl';
import strings from '@/util/Strings';
import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {useTruckHeaderStyle} from './useTruckHeaderStyle';
import {MaterialTopTabBarProps} from '@react-navigation/material-top-tabs';
import LinearGradient from 'react-native-linear-gradient';
import Notification from '@/assets/svgs/Notification';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/AppStore';
import UserKycContainer from '../kyc/UserKycContainer';
import ProfileContainer from '../kyc/ProfileContainer';

const TruckHeaderComponent = ({
  state,
  descriptors,
  navigation,
  position,
}: MaterialTopTabBarProps) => {
  const {value} = useTheme();
  const userDetails: any = useSelector(
    (state: RootState) => state.auth.userDetails,
  );
  const style = useTruckHeaderStyle(userDetails?.profileType);
  return (
    <React.Fragment>
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
        <View style={style.truckHeader}>
          {state.routes.map((route, index) => {
            const {options} = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                //@ts-ignore
                navigation.navigate({name: route.name, merge: true});
              }
            };

            return (
              <React.Fragment key={index}>
                <View>
                  {label == 'InventoryContainer' && index == 0 && (
                    <AppButton
                      label={strings.truck.buttonNames.availability}
                      buttonStyle={[
                        style.availabilityBtn,
                        isFocused && style.myTruckBtn,
                      ]}
                      textColor={
                        isFocused ? value.color.white : value.color.uploadText
                      }
                      textStyle={style.availabilityBtnText}
                      onPress={onPress}
                    />
                  )}
                  {label == 'TruckContainer' && index == 1 && (
                    <AppButton
                      label={strings.truck.buttonNames.myTruck}
                      buttonStyle={[
                        style.availabilityBtn,
                        isFocused && style.myTruckBtn,
                      ]}
                      textColor={
                        isFocused ? value.color.white : value.color.uploadText
                      }
                      textStyle={style.myTruckBtnText}
                      onPress={onPress}
                    />
                  )}
                  {label == 'NotificationContainer' && index == 2 && (
                    <TouchableOpacity onPress={onPress}>
                      <Notification
                        currentColor={
                          userDetails?.profileType === 'driver'
                            ? value.color.driver
                            : userDetails?.profileType === 'transporter'
                            ? value.color.transporter
                            : value.color.buttonNew
                        }
                      />
                    </TouchableOpacity>
                  )}
                  {label == ProfileContainer.SCREEN_NAME && index == 3 && (
                    <TouchableOpacity onPress={onPress}>
                      <Image source={IMAGE_URL.bg} style={style.profileImage} />
                    </TouchableOpacity>
                  )}
                </View>
              </React.Fragment>
            );
          })}
        </View>
      </LinearGradient>
    </React.Fragment>
  );
};

export default TruckHeaderComponent;
