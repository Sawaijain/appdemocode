import {useTheme} from '@/hooks/useTheme';
import {AppFontFamily, normalize} from '@/theme/Utils';
import {StyleSheet} from 'react-native';

export function useSignInStyle(profileType?: string) {
  const {
    style: {layout, gutter},
    value: {color, fontSize},
  } = useTheme();
  return {
    ...StyleSheet.create({
      container: {
        ...layout.container,
      },
      welcometext: {
        color: color.welcomeText,
        fontSize: normalize(30),
        ...gutter.marginTop.extraLarge,
        ...gutter.marginLeft.choiceHeight,
        ...gutter.marginBottom.inputHeight,
        fontFamily: AppFontFamily.ROBOTOBOLD,
      },
      logo: {
        height: normalize(71),
        width: normalize(270),
        resizeMode: 'cover',
        alignSelf: 'center',
      },
      appmoto: {
        color: color.welcomeText,
        fontSize: fontSize.alternative,
        ...layout.textAlignCenter,
        ...gutter.marginVertical.tiny,
      },
      logoContainer: {
        ...gutter.marginBottom.choiceHeight,
      },
      formGroup: {
        ...gutter.marginHorizontal.regular,
      },
      textInput: {
        borderWidth: 2,
        borderColor: color.border,
        height: normalize(60),
        color: color.black,
        fontSize: fontSize.medium,
        ...layout.textAlignCenter,
      },
      registerInput: {
        height: normalize(77),
        borderColor: '#575757',
        color: color.favRoute,
      },
      space: {
        ...gutter.marginBottom.regular,
      },
      terms_wrap: {
        ...gutter.marginTop.regular,
        ...gutter.marginBottom.inputHeight,
      },
      terms_box: {
        ...gutter.marginTop.small,
        ...gutter.marginBottom.normal,
      },
      terms: {
        ...layout.textAlignCenter,
        color: color.placeholderText,
        fontSize: fontSize.alternative,
      },
      termsText: {
        fontFamily: AppFontFamily.ROBOTOBOLD,
        color: color.placeholderText,
        ...layout.textAlignCenter,
      },
      center: {
        ...layout.center,
      },
      button: {
        height: normalize(77),
        backgroundColor: color.buttonNew,
        paddingLeft: 30,
        paddingRight: 30,
      },
      disabled: {
        backgroundColor: color.disableButton,
      },
      underlineStyleBase: {
        width: normalize(60),
        height: normalize(60),
        borderWidth: 1,
        borderColor: color.border,
        color: color.border,
        borderRadius: 5,
        fontSize: normalize(17),
        zIndex: 99,
      },

      underlineStyleHighLighted: {
        borderColor: color.border,
        borderWidth: 1,
        borderRadius: 0,
      },
      otpInput: {
        width: '90%',
        height: 60,
        alignSelf: 'center',
      },
      resendText: {
        fontFamily: AppFontFamily.ROBOTOBOLD,
        color: color.placeholderText,
        ...layout.textAlignCenter,
        textDecorationLine: 'underline',
        ...gutter.marginBottom.normal,
      },
      homeProfile: {
        ...gutter.paddingTop.large,
        ...gutter.paddingHorizontal.tableRowHeight,
      },
      chooseProfile: {
        ...gutter.marginVertical.choiceHeight,
      },
      textProfile: {
        fontFamily: AppFontFamily.ROBOTO,
      },
      driver: {
        backgroundColor: color.disableButton,
        ...gutter.marginVertical.regular,
      },
      owner: {
        height: normalize(77),
        backgroundColor: color.buttonNew,
        width: normalize(265),
        paddingLeft: 10,
        paddingRight: 10,
      },
      transporter: {
        backgroundColor: color.disableButton,
      },
      registerBox: {
        ...gutter.marginBottom.regular,
      },
      favRoute: {
        ...gutter.marginTop.tableRowHeight,
        ...gutter.marginBottom.large,
        fontSize: fontSize.medium,
        color: color.favRoute,
      },
      buttonRow: {
        ...layout.rowCenter,
        backgroundColor: color.white,
        ...gutter.paddingBottom.regular,
      },
      backButton: {
        backgroundColor: color.transparent,
        borderWidth: 1,
        borderRadius: 5,
        borderColor:
          profileType === 'driver'
            ? color.driver
            : profileType === 'transporter'
            ? color.transporter
            : color.buttonNew,
      },
      nextButton: {
        borderRadius: 5,
        backgroundColor:
          profileType === 'driver'
            ? color.driver
            : profileType === 'transporter'
            ? color.transporter
            : color.buttonNew,
        ...gutter.marginLeft.regular,
      },
      uploadButton: {
        backgroundColor: color.transparent,
        borderWidth: 2,
        borderColor: color.disableButton,
        borderRadius: 10,
        height: normalize(126),
        ...layout.fill,
        ...gutter.paddingLeft.small,
        ...gutter.paddingRight.small,
        ...layout.rowCenter,
      },
      skipSteps: {
        backgroundColor: color.white,
        ...gutter.paddingBottom.regular,
        ...layout.center,
      },
      truckCountButton: {
        height: normalize(77),
        paddingLeft: 10,
        paddingRight: 10,
        ...layout.rowCenter,
        borderRadius: 10,
        borderWidth: 2,
        borderColor:
          profileType === 'driver'
            ? color.driver
            : profileType === 'transporter'
            ? color.transporter
            : profileType === 'transporter'
            ? color.buttonNew
            : color.buttonNew,
        ...layout.fill,
      },
      activeTruckButton: {
        backgroundColor:
          profileType === 'driver'
            ? color.driver
            : profileType === 'transporter'
            ? color.transporter
            : profileType === 'transporter'
            ? color.buttonNew
            : color.buttonNew,
        borderColor:
          profileType === 'driver'
            ? color.driver
            : profileType === 'transporter'
            ? color.transporter
            : profileType === 'transporter'
            ? color.buttonNew
            : color.buttonNew,
      },
      truckCountButtonText: {
        color:
          profileType === 'driver'
            ? color.driver
            : profileType === 'transporter'
            ? color.transporter
            : profileType === 'transporter'
            ? color.buttonNew
            : color.buttonNew,
      },
      activeTruckButtonText: {
        color: color.white,
      },
      rcImage: {
        height: normalize(100),
        width: '100%',
        borderRadius: normalize(10),
        alignSelf: 'center',
        resizeMode: 'center',
      },
      checkbox: {
        width: 20,
        height: 20,
        borderRadius: 5,
        borderWidth: 2,
        borderColor:
          profileType === 'driver'
            ? color.driver
            : profileType === 'transporter'
            ? color.transporter
            : profileType === 'transporter'
            ? color.buttonNew
            : color.buttonNew,
        justifyContent: 'center',
        alignItems: 'center',
      },
      checked: {
        backgroundColor:
          profileType === 'driver'
            ? color.driver
            : profileType === 'transporter'
            ? color.transporter
            : profileType === 'transporter'
            ? color.buttonNew
            : color.buttonNew,
      },
      unchecked: {
        borderColor:
          profileType === 'driver'
            ? color.driver
            : profileType === 'transporter'
            ? color.transporter
            : profileType === 'transporter'
            ? color.buttonNew
            : color.buttonNew,
      },
      listGoogle: {
        position: 'absolute',
        top: 53,
        elevation: 5,
        backgroundColor: color.white,
        width: '100%',
        zIndex: 9999999,
        height: 180,
      },
      error: {
        color: color.danger,
        fontSize: fontSize.small,
      },
    }),
    colors: {
      placeholder: color.placeholderText,
      white: color.white,
      buttonNew: color.buttonNew,
    },
  };
}
