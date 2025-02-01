import {View, StyleSheet, TouchableOpacity, Image, Linking} from 'react-native';
import React, {useEffect, useState} from 'react';
import RootNavigator, {navigationRef} from '@/libs/navigation/RootNavigation';
import {appDispatch, useAppSelector} from '@/redux/AppStore';
import TruckBaseScreen from '@/features/base/screens/TruckBaseScreen';
import {useTheme} from '@/hooks/useTheme';
import {BackIcon, ChevronIcon} from '@/components/icons/Icon';
import {AppText} from '@/components/AppText';
import IMAGE_URL from '@/theme/ImageUrl';
import {getMobileNo, sleep} from '@/libs';
import {AppFontFamily} from '@/theme/Utils';
import AppTouchableOpacity from '@/components/AppTouchableOpacity';
import KycDetailContainer from './KycDetailContainer';
import Config from 'react-native-config';
import UserKycContainer from './UserKycContainer';
import AppButton from '@/components/AppButton';
import SignInContainer from '@/features/auth/SignInContainer';
import {setClearState} from '@/redux/reducers/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showAlert} from '@/components/Alert';

const ProfileContainer = () => {
  const userDetails = useAppSelector((state) => state.auth.userDetails);
  const style = useStyle();
  const [firstCharactor, setFirstCharactor] = useState('');
  const [lastNameCharactor, setLastNameCharactor] = useState('');
  const verifiedStatusShow = () => {
    if (userDetails?.is_KYC_completed && !userDetails?.is_KYC_verified) {
      showAlert({message: 'सत्यापन प्रगति पर है!'});
    } else if (
      !userDetails?.is_KYC_completed &&
      !userDetails?.is_KYC_verified
    ) {
      UserKycContainer.navigate();
    } else {
      KycDetailContainer.navigate();
    }
  };
  useEffect(() => {
    if (userDetails?.owner_name) {
      let _name = userDetails?.owner_name?.split(' ');
      setFirstCharactor(_name[0]?.charAt(0));
      setLastNameCharactor(_name[1]?.charAt(0));
    }
  }, [userDetails?.owner_name]);
  const menus = [
    {
      name: 'केवाईसी सूचना',
      onAction: () => verifiedStatusShow(),
    },
    {
      name: 'नियम और शर्तें',
      onAction: () => Linking.openURL('https://agrigator.co/terms/'),
    },
    {
      name: 'प्राइवेसी पालिसी',
      onAction: () => Linking.openURL('https://agrigator.co/privacy-policy/'),
    },
    {
      name: 'सहायता',
      onAction: () => Linking.openURL(`tel:${Config.AGRIGATORHELPLINE}`),
    },
    {
      name: 'वेबसाइट',
      onAction: () => Linking.openURL(`https://agrigator.co`),
    },
  ];
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
    <React.Fragment>
      <TruckBaseScreen
        profileType={userDetails?.profileType}
        scrollChildren={
          <React.Fragment>
            <View style={style.row}>
              <TouchableOpacity
                style={[
                  style.arrowIcon,
                  {
                    backgroundColor:
                      userDetails?.profileType == 'transporter'
                        ? style.color.transporter
                        : style.color.buttonNew,
                  },
                ]}
                onPress={() => RootNavigator.pop()}>
                <BackIcon size={30} color={style.color.white} />
              </TouchableOpacity>
              <AppText mode="defaultBold">प्रोफ़ाइल</AppText>
            </View>
            <View style={style.container}>
              <View style={style.profileSection}>
                <View style={style.profileImage}>
                  <AppText
                    style={[
                      style.customerName,
                      {
                        backgroundColor:
                          userDetails?.profileType == 'transporter'
                            ? style.color.transporter
                            : style.color.buttonNew,
                      },
                    ]}
                    mode="defaultBold">{`${
                    firstCharactor ? firstCharactor : ''
                  }${lastNameCharactor ? lastNameCharactor : ''}`}</AppText>
                </View>
                <View style={style.details}>
                  <View style={style.profileDetailRow}>
                    <AppText style={style.userName}>
                      {userDetails?.owner_name}
                    </AppText>
                    <AppText style={style.profileType}>
                      {userDetails?.profileType}
                    </AppText>
                  </View>
                  <View style={style.profileDetailRow}>
                    <AppText style={style.mobileNumber}>
                      {getMobileNo(userDetails?.mobile_number)}
                    </AppText>
                  </View>
                </View>
              </View>
              <View style={style.menuWrap}>
                {menus.map((item, index) => (
                  <AppTouchableOpacity
                    key={index}
                    onPress={item.onAction}
                    style={style.menu}
                    children={
                      <React.Fragment>
                        <View style={style.rowWithDot}>
                          <AppText mode="alternative">{item.name}</AppText>
                          {index == 0 && (
                            <React.Fragment>
                              {!userDetails?.is_KYC_completed &&
                              !userDetails?.is_KYC_verified ? (
                                <View style={style.yellowDot} />
                              ) : userDetails?.is_KYC_completed &&
                                !userDetails?.is_KYC_verified ? (
                                <View style={style.yellowDot} />
                              ) : (
                                <View style={style.greenDot} />
                              )}
                            </React.Fragment>
                          )}
                        </View>
                        {index == 0 && (
                          <ChevronIcon direction="forward" size={20} />
                        )}
                      </React.Fragment>
                    }
                  />
                ))}
              </View>
            </View>
          </React.Fragment>
        }
      />
      <View style={style.logoutButtonContainer}>
        <AppButton
          onPress={handleLogout}
          buttonStyle={{
            backgroundColor:
              userDetails?.profileType == 'transporter'
                ? style.color.transporter
                : style.color.buttonNew,
          }}
          label="लॉग आउट"
        />
      </View>
    </React.Fragment>
  );
};
ProfileContainer.SCREEN_NAME = 'ProfileContainer';
ProfileContainer.navigationOptions = {
  headerShown: false,
};
ProfileContainer.navigate = () => {
  RootNavigator.navigate(ProfileContainer.SCREEN_NAME);
};
export default ProfileContainer;
function useStyle() {
  const {
    style: {layout, gutter},
    value: {color, fontSize},
  } = useTheme();
  return {
    ...StyleSheet.create({
      container: {
        ...gutter.paddingHorizontal.regular,
        ...gutter.paddingTop.regular,
      },
      row: {
        ...layout.rowVerticalCenter,
        ...gutter.gap.small,
        ...gutter.paddingHorizontal.regular,
        ...gutter.paddingVertical.large,
        borderBottomWidth: 2,
        borderBottomColor: color.borderColor,
      },
      arrowIcon: {
        height: 40,
        width: 40,
        backgroundColor: color.buttonNew,
        borderRadius: 20,
        ...layout.center,
        ...layout.fill,
        maxWidth: 40,
      },
      image: {
        height: 70,
        width: 70,
        alignSelf: 'center',
      },
      profileSection: {
        backgroundColor: color.gray50,
        ...gutter.paddingVertical.large,
        ...gutter.paddingHorizontal.normal,
        ...gutter.marginTop.inputHeight,
        ...gutter.marginBottom.large,
        borderRadius: 15,
      },
      profileImage: {
        ...layout.overlayHorizontal,
        top: -40,
      },
      profileDetailRow: {
        ...layout.rowVerticalCenter,
        ...layout.justifyContentBetween,
        ...gutter.marginBottom.tiny,
        ...gutter.gap.regular,
      },
      userName: {
        fontFamily: AppFontFamily.ROBOTOMEDIUM,
        fontSize: fontSize.alternative + 2,
        ...layout.fill,
      },
      profileType: {
        fontFamily: AppFontFamily.ROBOTOMEDIUM,
        fontSize: fontSize.alternative + 2,
        textTransform: 'uppercase',
      },
      mobileNumber: {
        color: color.tabText,
        fontSize: fontSize.alternative,
      },
      details: {
        ...gutter.marginTop.normal,
      },
      menuWrap: {
        borderWidth: 1,
        ...gutter.paddingHorizontal.regular,
        borderColor: '#EAEAEA',
        borderRadius: 15,
      },
      menu: {
        ...layout.rowVerticalCenter,
        ...layout.justifyContentBetween,
        ...gutter.paddingVertical.regular,
        borderBottomWidth: 1,
        borderColor: '#EAEAEA',
      },
      logoutButtonContainer: {
        ...gutter.paddingHorizontal.normal,
        ...gutter.paddingBottom.normal,
        backgroundColor: color.white,
      },
      customerName: {
        ...layout.textAlignCenter,
        backgroundColor: color.white,
        height: 60,
        width: 60,
        ...layout.selfCenter,
        borderRadius: 30,
        verticalAlign: 'middle',
        color: color.white,
      },
      yellowDot: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: 'yellow',
      },
      greenDot: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: 'green',
      },
      redDot: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: 'red',
      },
      rowWithDot: {
        ...layout.rowVerticalCenter,
        ...gutter.gap.small,
      },
    }),
    color,
  };
}
