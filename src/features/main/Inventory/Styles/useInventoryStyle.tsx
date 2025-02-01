import {useTheme} from '@/hooks/useTheme';
import {RootState} from '@/redux/AppStore';
import {AppFontFamily, normalize} from '@/theme/Utils';
import {StatusBar, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

export function useInventoryStyle() {
  const {
    style: {layout, gutter},
    value,
  } = useTheme();
  const {userDetails} = useSelector((state: RootState) => state.auth);
  return StyleSheet.create({
    truckHeading: {
      width: normalize(300),
      fontSize: normalize(16),
      fontWeight: '400',
      ...gutter.marginBottom.normal,
      paddingHorizontal: normalize(15),
    },
    container: {
      ...layout.fill,
      paddingHorizontal: normalize(15),
    },
    routeSearch: {
      backgroundColor: value.color.white,
      borderRadius: normalize(10),
      borderWidth: normalize(1),
      borderColor: value.color.routeSearch,
      ...gutter.paddingHorizontal.normal,
      ...gutter.paddingTop.normal,
      ...gutter.paddingBottom.small,
    },
    inventoryInput: {
      borderWidth: normalize(0),
      borderBottomWidth: normalize(2),
      borderColor: value.color.routeSearch,
      fontSize: normalize(22),
      height: normalize(55),
      ...gutter.marginBottom.small,
      marginLeft: 20,
    },
    loadingAvailabilityText: {
      ...gutter.marginTop.normal,
      color: value.color.uploadText,
      fontSize: normalize(18),
      fontWeight: '400',
    },

    availabilityDatebtn: {
      ...layout.rowVerticalCenter,
      ...layout.justifyContentBetween,
      ...gutter.marginTop.small,
    },
    btn: {
      backgroundColor: value.color.transparent,
      borderRadius: normalize(5),
      borderWidth: normalize(1),
      borderColor: value.color.routeSearch,
      paddingLeft: 10,
      paddingRight: 10,
      maxWidth: 60,
    },
    dateBtn: {
      marginRight: normalize(0),
      paddingLeft: 5,
      paddingRight: 5,
      maxWidth: 118,
    },
    btnText: {
      fontSize: normalize(13),
    },
    dateBtnText: {
      fontSize: normalize(10),
    },
    availabilityAddbtnCon: {
      ...layout.rowVerticalCenter,
      ...gutter.marginTop.regular,
      ...layout.justifyContentBetween,
    },
    availabilityAddbtn: {
      backgroundColor: value.color.transparent,
      borderRadius: normalize(5),
      borderWidth: normalize(1),
      borderColor: value.color.routeSearch,
      height: normalize(45),
      maxWidth: 108,
    },
    availabilityAddbtnText: {
      fontSize: normalize(16),
      marginTop: normalize(0),
      marginBottom: normalize(0),
      textAlign: 'center',
    },
    orderContainer: {
      ...gutter.marginHorizontal.regular,
    },
    addIcon: {
      borderRadius: normalize(5),
      borderWidth: normalize(1),
      borderColor: value.color.routeSearch,
      ...layout.rowVerticalCenter,
      ...gutter.paddingHorizontal.small,
      marginRight: normalize(10),
      height: normalize(45),
    },
    minus: {},
    plus: {},
    originLine: {
      position: 'absolute',
      top: 9,
      bottom: 0,
      left: 5,
      borderLeftWidth: 1,
      borderLeftColor: value.color.uploadText,
      borderStyle: 'dashed',
      overflow: 'hidden',
    },
    line: {
      borderLeftWidth: 1,
      borderLeftColor: value.color.uploadText,
      borderStyle: 'dashed',
      overflow: 'hidden',
      height: 10,
      marginLeft: 5,
    },
    origin: {
      position: 'relative',
    },
    dot: {
      height: 10,
      width: 10,
      borderRadius: 5,
      backgroundColor: value.color.uploadText,
      position: 'absolute',
      top: 18,
    },
    count: {
      ...gutter.paddingHorizontal.inputVerticalPadding,
    },
    inventorybox: {
      backgroundColor: value.color.white,
      borderWidth: 1,
      borderColor: 'rgba(132, 132, 132, 0.17)',
      ...layout.row,
      ...layout.justifyContentBetween,
      ...gutter.marginVertical.small,
      paddingHorizontal: 13,
      paddingVertical: 6,
      borderRadius: 5,
    },
    card: {
      ...layout.fill,
      ...gutter.paddingVertical.small,
    },
    inner: {
      ...layout.rowVerticalCenter,
      ...gutter.marginBottom.small,
    },
    date: {
      fontSize: 12,
      marginRight: 18,
    },
    time: {
      fontSize: 12,
    },
    buttonContainer: {
      ...layout.fill,
      ...layout.alignItemsEnd,
      ...layout.justifyContentBetween,
      ...gutter.paddingVertical.small,
    },
    locationContainer: {
      maxWidth: 200,
    },
    originLocation: {
      fontSize: 14,
      marginLeft: 20,
      position: 'relative',
      overflow: 'hidden',
    },
    weight: {
      ...gutter.marginTop.regular,
      ...layout.rowVerticalCenter,
    },
    weights: {
      fontSize: 12,
    },
    outlineButton: {
      backgroundColor: 'rgba(217, 217, 217, 0.33)',
      borderWidth: 1,
      borderColor: value.color.buttonNew,
      borderRadius: 5,
      paddingLeft: 12,
      paddingRight: 12,
    },
    truckAvail: {
      borderBottomWidth: 4,
      borderBottomColor: value.color.black,
      ...gutter.paddingBottom.tiny,
      width: 90,
      fontSize: normalize(22),
    },
    loading: {
      fontSize: normalize(18),
      fontFamily: AppFontFamily.ROBOTOMEDIUM,
    },
    loadingDate: {
      fontSize: normalize(19),
      fontFamily: AppFontFamily.ROBOTOMEDIUM,
      color: value.color.disableButton,
    },
    unloading: {
      fontSize: normalize(18),
      fontFamily: AppFontFamily.ROBOTOMEDIUM,
    },
    hrLine: {
      height: 3,
      ...layout.fullWidth,
      backgroundColor: value.color.borderbottom,
      ...gutter.marginTop.regular,
    },
    smallButton: {paddingLeft: 15, paddingRight: 15},
    searchButton: {
      borderWidth: 1,
      borderColor: 'rgba(132, 132, 132, 0.26)',
      ...gutter.marginVertical.regular,
      ...gutter.paddingHorizontal.small,
      ...gutter.paddingVertical.regular,
      borderRadius: 5,
      ...layout.rowVerticalCenter,
      ...gutter.gap.regular,
    },
    searchUpper: {
      borderWidth: 1,
      borderColor: 'rgba(132, 132, 132, 0.26)',
      ...gutter.padding.regular,
      borderRadius: 5,
      ...gutter.marginBottom.regular,
    },
    favRoute: {
      borderBottomWidth: 1,
      borderColor: 'rgba(132, 132, 132, 0.26)',
      ...gutter.paddingBottom.regular,
      ...gutter.marginBottom.regular,
    },
    bestRoute: {
      color: value.color.uploadText,
    },
    box: {
      borderWidth: 2,
      borderColor:
        userDetails?.profileType === 'transporter'
          ? value.color.transporter
          : value.color.buttonNew,
      ...gutter.paddingVertical.small,
      ...gutter.paddingHorizontal.regular,
      borderRadius: 10,
      ...gutter.marginBottom.regular,
    },
    upperView: {
      ...layout.rowVerticalCenter,
      ...gutter.marginBottom.large,
    },
    upperViewLeft: {
      ...layout.rowVerticalCenter,
      ...layout.fill,
    },
    upperViewRight: {
      fontSize: normalize(15),
      color: value.color.disableButton,
    },
    orderId: {
      fontSize: normalize(13),
      color: value.color.disableButton,
      ...gutter.marginLeft.tiny,
    },
    middleview: {
      ...layout.row,
      ...gutter.marginBottom.large,
    },
    fill: layout.fill,
    price: {
      fontSize: normalize(26),
      fontFamily: AppFontFamily.ROBOTOBLACK,
    },
    bonus: {
      fontSize: normalize(17),
      fontWeight: '400',
      color:
        userDetails?.profileType === 'transporter'
          ? value.color.transporter
          : value.color.buttonNew,
    },
    bottomView: {
      ...layout.row,
    },
    weightWrap: {
      ...layout.fill,
      ...layout.row,
    },
    // weight: {
    //   color: value.color.disableButton,
    //   fontFamily: AppFontFamily.ROBOTOBLACK,
    // },
    commodity: {
      ...gutter.paddingLeft.small,
    },
    tripType: {
      color: value.color.disableButton,
      fontSize: normalize(22),
    },
  });
}
