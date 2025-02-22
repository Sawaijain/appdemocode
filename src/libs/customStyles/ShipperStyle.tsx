import {normalize} from '@/theme/Utils';
import {StyleSheet} from 'react-native';
export const APPCOLORS = {
  white: '#fff',
  black: '#000',
  gray: '#C8CBCB',
  darkBlack: '#1a1717',
  golden: '#e9cfa3',
  borderColor: '#bcbcbc',
};
function useShipperStyle() {
  return StyleSheet.create({
    fill: {
      flex: 1,
    },
    container: {
      flex: 1,
      backgroundColor: APPCOLORS.white,
    },
    loginScreen: {
      flex: 1,
      backgroundColor: APPCOLORS.darkBlack,
    },
    logoContainer: {marginBottom: 30},
    loginCard: {
      flexDirection: 'column',
      justifyContent: 'center',
      flex: 1,
    },
    logo: {
      height: 50,
      width: 350,
      resizeMode: 'contain',
      alignSelf: 'center',
      marginVertical: 10,
    },
    loginInner: {
      backgroundColor: '#fff',
      opacity: 1,
      borderRadius: 5,
      height: 350,
      width: '90%',
      elevation: 11,
      alignSelf: 'center',
    },
    loginContainer: {
      marginHorizontal: 15,
    },
    textInput: {
      width: '100%',
      fontSize: 22,
      height: 60,
      marginTop: 50,
      borderRadius: 10,
      borderColor: APPCOLORS.darkBlack,
      alignSelf: 'center',
    },
    textInputRegister: {
      width: '100%',
      borderRadius: 5,
      borderColor: APPCOLORS.borderColor,
      borderWidth: 1,
      marginVertical: 5,
      fontSize: 16,
      paddingLeft: 10,
    },
    btnLogin: {
      backgroundColor: APPCOLORS.golden,
      marginVertical: 30,
    },
    commonLinks: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 5,
    },
    terms: {
      fontSize: 13,
      color: '#1a1717',
    },
    termsHyper: {
      fontSize: 18,
      color: '#1a1717',
      fontWeight: 'bold',
    },
    counts: {
      alignSelf: 'center',
      flexDirection: 'row',
      marginBottom: 20,
    },
    count: {
      height: 25,
      width: 25,
      borderRadius: 12,
      backgroundColor: APPCOLORS.golden,
      justifyContent: 'center',
      margin: 8,
      textAlign: 'center',
      textAlignVertical: 'center',
      fontSize: 13,
    },
    contactWrap: {bottom: 50, justifyContent: 'center', alignSelf: 'center'},
    contactText: {
      color: APPCOLORS.white,
      textAlign: 'center',
      fontSize: 13,
      fontWeight: '100',
    },
    underlineStyleBase: {
      width: normalize(60),
      height: normalize(60),
      borderWidth: 1,
      borderColor: APPCOLORS.darkBlack,
      color: APPCOLORS.darkBlack,
      borderRadius: 5,
      fontSize: normalize(17),
      marginTop: 80,
      zIndex: 99,
    },

    underlineStyleHighLighted: {
      borderColor: APPCOLORS.darkBlack,
      borderWidth: 1,
      borderRadius: 0,
    },
    otpInput: {
      width: '90%',
      height: 100,
      marginBottom: 30,
      alignSelf: 'center',
    },
    dropdownStyle: {
      height: 50,
      borderRadius: 5,
      borderColor: APPCOLORS.borderColor,
      justifyContent: 'center',
      marginVertical: 5,
      alignSelf: 'center',
      borderWidth: 1,
      backgroundColor: 'none',
    },
    header: {
      height: 60,
      width: '100%',
      backgroundColor: APPCOLORS.darkBlack,
    },
    headerInner: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      alignItems: 'center',
      position: 'relative',
      zIndex: 999,
    },
    headerWrap: {
      flex: 1,
      alignItems: 'flex-start',
    },
    headerLeftBack: {
      width: 120,
      height: 50,
      marginTop: 10,
      zIndex: 999,
    },
    headerLeftMenu: {
      justifyContent: 'center',
      width: 120,
      height: 50,
      marginTop: 10,
      zIndex: 999,
    },
    headerLogoWrap: {flex: 1, alignItems: 'center', justifyContent: 'center'},
    headerLogo: {
      height: 30,
      width: 350,
      resizeMode: 'contain',
      alignSelf: 'center',
      marginVertical: 10,
    },
    headerFilterWrap: {
      flex: 1,
      maxWidth: 60,
    },
    headerFilter: {
      height: 20,
      width: 20,
      resizeMode: 'contain',
      alignSelf: 'flex-end',
      marginVertical: 10,
    },
    headerNotificationWrap: {
      flex: 1,
      alignItems: 'flex-end',
      justifyContent: 'center',
      maxWidth: 100,
      position: 'relative',
    },
    dashboardWrap: {flex: 1, alignItems: 'center', justifyContent: 'center'},
    toAccessAll: {
      color: APPCOLORS.darkBlack,
      fontSize: 15,
      textAlign: 'center',
      marginVertical: 20,
    },
    iconBorder: {
      borderWidth: 1,
      borderColor: APPCOLORS.white,
      padding: 8,
      borderRadius: 5,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    drawerText: {
      fontSize: 16,
      color: APPCOLORS.white,
      marginLeft: 20,
    },
    drawerMenuWrap: {
      backgroundColor: APPCOLORS.darkBlack,
      flexDirection: 'row',
      marginVertical: 10,
      alignItems: 'center',
      marginLeft: -18,
    },
    kycBox: {
      backgroundColor: APPCOLORS.white,
      fontSize: 13,
      fontWeight: '100',
      color: APPCOLORS.darkBlack,
      textAlign: 'center',
      paddingVertical: 5,
      borderRadius: 5,
    },
    drawerMainMenu: {
      backgroundColor: APPCOLORS.darkBlack,
      borderRadius: 10,
      flexDirection: 'row',
      marginVertical: 10,
      alignItems: 'center',
    },
    drawerBox: {
      backgroundColor: APPCOLORS.darkBlack,
      paddingLeft: '10%',
      paddingTop: '15%',
      borderBottomWidth: 1,
      borderBottomColor: APPCOLORS.white,
      paddingBottom: 20,
    },
    drawerCarrierBox: {
      backgroundColor: APPCOLORS.darkBlack,
      paddingLeft: 15,
      paddingTop: 20,
      borderBottomWidth: 1,
      borderBottomColor: APPCOLORS.white,
      paddingBottom: 20,
    },
    drawerCarrierBoxLabel: {
      color: APPCOLORS.white,
      fontSize: 15,
    },
    notificationHeader: {
      height: 50,
      justifyContent: 'center',
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 20,
      marginBottom: 20,
    },
    notificationText: {
      fontSize: 20,
      color: '#bcbcbc',
      flex: 1,
      textAlign: 'center',
      marginLeft: 30,
    },
    activeText: {
      fontSize: 16,
    },
    clearNotification: {
      marginVertical: 10,
      borderRadius: 0,
      width: '50%',
      alignSelf: 'center',
    },
    emptyListStyle: {
      flex: 1,
      justifyContent: 'center',
    },
    emptyMessageStyle: {
      textAlign: 'center',
      fontSize: 20,
    },
    formContainer: {
      marginBottom: 15,
    },
    formControlPlaceInput: {
      borderWidth: 1,
      borderColor: APPCOLORS.gray,
      padding: 0,
      paddingLeft: 5,
      borderRadius: 10,
      fontSize: 16,
      fontWeight: '500',
      color: APPCOLORS.darkBlack,
      backgroundColor: '#edeced',
    },
    formControl: {
      borderWidth: 1,
      borderColor: APPCOLORS.gray,
      padding: 10,
      paddingLeft: 10,
      borderRadius: 10,
      fontSize: 16,
      fontWeight: '500',
      color: APPCOLORS.darkBlack,
    },
    formControlDisabled: {
      backgroundColor: APPCOLORS.gray,
      padding: 10,
      paddingLeft: 10,
      borderRadius: 10,
      fontSize: 16,
      fontWeight: '500',
      color: APPCOLORS.darkBlack,
    },

    actionSheet: {
      height: 50,
      borderRadius: 10,
      borderColor: APPCOLORS.darkBlack,
      backgroundColor: APPCOLORS.darkBlack,
      justifyContent: 'space-between',
      width: '100%',
      flexDirection: 'row',
      padding: 10,
      alignItems: 'center',
      borderWidth: 1,
      paddingLeft: 5,
    },
    commodity: {
      padding: 0,
      paddingLeft: 10,
      color: APPCOLORS.darkBlack,
      fontSize: 16,
    },
    cancelBtn: {
      backgroundColor: '#1a1717',
      borderRadius: 20,
      padding: 8,
      elevation: 0,
    },
    cancelText: {
      fontWeight: '100',
      color: 'white',
      textAlign: 'center',
      fontSize: 13,
    },
    rowWMargin: {
      flexDirection: 'row',
      marginTop: 10,
    },
    loadsWrap: {marginHorizontal: 10, flex: 1},
    checkBoxWithCard: {
      flexDirection: 'row',
    },
    printBtn: {
      position: 'absolute',
      top: 15,
      right: 10,
      zIndex: 99,
      borderRadius: 0,
    },
    nodata: {
      height: 200,
      width: 200,
      alignSelf: 'center',
      marginVertical: 30,
    },
    createBtn: {
      alignSelf: 'center',
      marginVertical: 30,
    },
    skeleton: {
      backgroundColor: APPCOLORS.gray,
    },
    upIcon: {
      backgroundColor: APPCOLORS.darkBlack,
      height: 60,
      width: 60,
      borderRadius: 50,
      zIndex: 30,
      position: 'absolute',
      bottom: 20,
      right: 20,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    photoBtn: {
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor: '#000',
      width: '100%',
      alignSelf: 'center',
      borderRadius: 5,
      marginVertical: 10,
    },
    rcImage: {
      height: normalize(120),
      width: '100%',
      borderRadius: normalize(10),
    },
    profileBox: {
      borderColor: '#fff',
      borderRadius: 5,
      borderWidth: 1,
      paddingHorizontal: 10,
      paddingVertical: 10,
      marginVertical: 15,
      width: '100%',
      backgroundColor: '#fff',
    },
    docBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      backgroundColor: '#F9F9F9',
      marginBottom: 10,
      borderRadius: 10,
      paddingRight: 5,
      borderBottomWidth: 1,
      borderBottomColor: '#e9e9e9',
      marginTop: 20,
    },
    checkIcon: {
      position: 'absolute',
      right: 10,
      top: 10,
    },
    hrLine: {
      marginTop: 40,
      borderBottomWidth: 1,
      borderBottomColor: '#b5b5b5',
      marginBottom: 20,
    },
  });
}
export default useShipperStyle;
