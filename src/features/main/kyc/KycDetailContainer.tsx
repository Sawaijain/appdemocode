import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import RootNavigator from '@/libs/navigation/RootNavigation';
import {useTheme} from '@/hooks/useTheme';
import TruckBaseScreen from '@/features/base/screens/TruckBaseScreen';
import {appDispatch, useAppSelector} from '@/redux/AppStore';
import {BackIcon} from '@/components/icons/Icon';
import {AppText} from '@/components/AppText';
import {getKycDetails} from '@/redux/actions/AuthAction';
import {normalize} from '@/theme/Utils';
import {getImage} from '@/redux/actions/UserAction';
import {showAlert} from '@/components/Alert';
import AppTouchableOpacity from '@/components/AppTouchableOpacity';
import strings from '@/util/Strings';
import Icon from 'react-native-vector-icons/Ionicons';
import {getImageDocument} from '@/redux/reducers/userSlice';
const KycDetailContainer = () => {
  const [isFrontShow, setIsFrontShow] = useState<boolean>(false);
  const [isBackShow, setIsBackShow] = useState<boolean>(false);
  const userDetails = useAppSelector((state) => state.auth.userDetails);
  const style = useStyle();
  const kycDetails = useAppSelector((state) => state.auth.kycDetails);
  const {imagePath} = useAppSelector((state) => state.user);
  useEffect(() => {
    getKycDetails(userDetails?.kyc_id);
  }, [userDetails?.kyc_id]);
  const toggleFrontShow = () => {
    if (kycDetails?.address_proof_photo) {
      getImage(kycDetails?.address_proof_photo);
    } else {
      showAlert({message: 'अपलोड नहीं किया गया '});
      return;
    }
    setIsFrontShow(!isFrontShow);
    setIsBackShow(false);
    appDispatch(getImageDocument(''));
  };

  const toggleBackShow = () => {
    if (kycDetails?.address_proof_photo_back) {
      setIsBackShow(!isBackShow);
      getImage(kycDetails?.address_proof_photo_back);
    } else {
      showAlert({message: 'अपलोड नहीं किया गया '});
      return;
    }
    setIsBackShow(!isBackShow);
    setIsFrontShow(false);
    appDispatch(getImageDocument(''));
  };
  return (
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
            <AppText mode="defaultBold">केवाईसी सूचना</AppText>
          </View>
          <View style={style.container}>
            <View style={style.menuWrap}>
              <View style={style.menu}>
                <AppText style={style.gray} mode="contact">
                  नाम
                </AppText>
                <AppText style={style.space} mode="alternative">
                  {userDetails?.owner_name}
                </AppText>
              </View>
              <View style={style.menu}>
                <AppText style={style.gray} mode="contact">
                  बैंक अकाउंट का नाम{' '}
                </AppText>
                <AppText style={style.space} mode="alternative">
                  {kycDetails?.bankDetails?.beneficiary_name}
                </AppText>
              </View>
              <View style={style.menu}>
                <AppText style={style.gray} mode="contact">
                  अकाउंट नंबर
                </AppText>
                <AppText style={style.space} mode="alternative">
                  {kycDetails?.account_number}
                </AppText>
              </View>
              <View style={style.menu}>
                <AppText style={style.gray} mode="contact">
                  आइ एफ एस सी कोड
                </AppText>
                <AppText style={style.space} mode="alternative">
                  {kycDetails?.ifsc_code}
                </AppText>
              </View>
              <View style={style.menu}>
                <AppText style={style.gray} mode="contact">
                  पैन पर नाम
                </AppText>
                <AppText style={style.space} mode="alternative">
                  {kycDetails?.pan_details?.user_full_name ||
                    kycDetails?.pan_details?.name}
                </AppText>
              </View>
              <View style={style.menu}>
                <AppText style={style.gray} mode="contact">
                  पैन नंबर
                </AppText>
                <AppText style={style.space} mode="alternative">
                  {kycDetails?.pan_details?.pan_number}
                </AppText>
              </View>
            </View>

            <View style={style.Imagecontainer}>
              <AppText
                style={{marginBottom: 10, marginLeft: 14}}
                mode="defaultBold">
                पहचान पत्र
              </AppText>
              <AppTouchableOpacity
                onPress={toggleFrontShow}
                style={style.docBtn}>
                <View style={style.fill}>
                  <Icon
                    size={30}
                    name="ios-file-tray-full-outline"
                    style={style.icon}
                  />
                  <AppText mode="alternative">{strings.frontPhoto}</AppText>
                </View>
                <Icon
                  size={25}
                  style={style.icon}
                  name={isFrontShow ? 'ios-chevron-up' : 'ios-chevron-down'}
                />
              </AppTouchableOpacity>
              {isFrontShow && imagePath && (
                <View>
                  <Image
                    style={style.imageContainer}
                    source={{uri: imagePath}}
                  />
                </View>
              )}
              <AppTouchableOpacity
                onPress={toggleBackShow}
                style={style.docBtn}>
                <View style={style.fill}>
                  <Icon
                    size={30}
                    name="ios-file-tray-full-outline"
                    style={style.icon}
                  />
                  <AppText mode="alternative">{strings.backPhoto}</AppText>
                </View>
                <Icon
                  size={25}
                  style={style.icon}
                  name={isBackShow ? 'ios-chevron-up' : 'ios-chevron-down'}
                />
              </AppTouchableOpacity>
              {isBackShow && imagePath && (
                <View>
                  <Image
                    style={style.imageContainer}
                    source={{uri: imagePath}}
                  />
                </View>
              )}
            </View>
          </View>
        </React.Fragment>
      }
    />
  );
};
KycDetailContainer.SCREEN_NAME = 'KycDetailContainer';
KycDetailContainer.navigationOptions = {
  headerShown: false,
};
KycDetailContainer.navigate = () => {
  RootNavigator.navigate(KycDetailContainer.SCREEN_NAME);
};
export default KycDetailContainer;
function useStyle() {
  const {
    style: {layout, gutter},
    value: {color},
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

      menuWrap: {
        borderWidth: 1,
        ...gutter.paddingHorizontal.regular,
        borderColor: color.receiptBorder,
        borderRadius: 15,
        ...gutter.marginTop.large,
      },
      menu: {
        ...gutter.paddingVertical.regular,
        borderBottomWidth: 1,
        borderColor: color.receiptBorder,
      },
      space: {
        ...gutter.marginTop.tiny,
      },
      gray: {
        color: color.tabText,
      },
      Imagecontainer: {
        backgroundColor: color.profileCard,
        ...gutter.marginTop.regular,
      },
      docBtn: {
        ...layout.rowVerticalCenter,
        ...gutter.padding.small,
        ...layout.justifyContentBetween,
        backgroundColor: color.background,
        ...gutter.marginBottom.small,
        borderRadius: 10,
      },
      icon: {},
      imageContainer: {
        height: 250,
        width: '96%',
        resizeMode: 'cover',
        borderRadius: 10,
      },
      fill: {
        ...layout.rowVerticalCenter,
        ...layout.fill,
        ...gutter.gap.small,
      },
    }),
    color,
  };
}
