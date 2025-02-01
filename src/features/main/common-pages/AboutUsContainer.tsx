import {AppText} from '@/components/AppText';
import AppTouchableOpacity from '@/components/AppTouchableOpacity';
import BaseScreen from '@/features/base/screens/BaseScreen';
import {useTheme} from '@/hooks/useTheme';
import RootNavigator from '@/libs/navigation/RootNavigation';
import {normalize} from '@/theme/Utils';
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Linking,
  Image,
  Platform,
} from 'react-native';
import strings from '@/util/Strings';
import Config from 'react-native-config';
import Icon from 'react-native-vector-icons/Ionicons';
import VersionNameText from '@/components/VersionName';
import IMAGE_URL from '@/libs/ImageUrl';
import CommonWebViewContainer from './CommonWebViewContainer';
interface AboutUsContainerProps {}

const AboutUsContainer = (props: AboutUsContainerProps) => {
  const [isPersonal, setIsPersonal] = useState<boolean>(true);
  const {
    style: {layout, gutter},
    value: {color},
  } = useTheme();
  const styles = useAboutStyle();
  async function openLink(link: any) {
    CommonWebViewContainer.navigate(link);
  }
  const openGps = () => {
    const url: any = Platform.select({
      ios: `maps:0,0?q=Agrigator - Agriculture Supply Chain Company, Grain Logistics, Agri Transport Company In INDIA`,
      android: `geo:0,0?q=Agrigator - Agriculture Supply Chain Company, Grain Logistics, Agri Transport Company In INDIA`,
    });

    Linking.openURL(url);
  };
  return (
    <React.Fragment>
      <BaseScreen>
        <View
          style={[
            layout.row,
            gutter.paddingHorizontal.large,
            {backgroundColor: color.white},
            gutter.paddingBottom.normal,
          ]}>
          <AppTouchableOpacity
            onPress={() => {
              setIsPersonal(true);
            }}
            children={
              <AppText
                mode={'defaultBold'}
                style={[
                  styles.buttonText,
                  isPersonal && styles.activeButtonText,
                ]}>
                {strings.aboutCompany}
              </AppText>
            }
            style={[styles.button, isPersonal && styles.activeButton]}
          />

          <AppTouchableOpacity
            onPress={() => {
              setIsPersonal(false);
            }}
            children={
              <AppText
                mode={'defaultBold'}
                style={[
                  styles.buttonText,
                  !isPersonal && styles.activeButtonText,
                ]}>
                {strings.contactInfo}
              </AppText>
            }
            style={[styles.button, !isPersonal && styles.activeButton]}
          />
        </View>
        <ScrollView>
          {!isPersonal ? (
            <>
              <View style={styles.aboutSection}>
                <View style={styles.companyInfo}>
                  <AppText mode="defaultBold" style={styles.companyNameB}>
                    कम्पनी का नाम :
                  </AppText>
                  <AppText style={styles.companyName}>
                    Anati Technologies Private Limited
                  </AppText>
                </View>
                <AppTouchableOpacity
                  activeOpacity={0.8}
                  onPress={openGps}
                  style={styles.companyInfo}
                  children={
                    <React.Fragment>
                      <AppText mode="defaultBold" style={styles.companyNameB}>
                        पता :
                      </AppText>
                      <AppText style={styles.companyName}>
                        C-25 Rani Avanti Bai transport Nagar, Kokta, Bhopal, M.P
                        – 462022
                      </AppText>
                    </React.Fragment>
                  }
                />

                <View style={[styles.companyInfo, {position: 'relative'}]}>
                  <AppText mode="defaultBold" style={styles.companyNameB}>
                    ईमेल :
                  </AppText>
                  <AppText style={styles.companyName}>
                    {Config.AGRIGATOREMAIL}
                  </AppText>
                  <AppTouchableOpacity
                    children={<Icon name="ios-mail-open-outline" size={30} />}
                    style={styles.mailButton}
                    onPress={() =>
                      Linking.openURL(`mailto:${Config.AGRIGATOREMAIL}`)
                    }
                  />
                </View>
                <View style={styles.companyInfo}>
                  <AppText mode="defaultBold" style={styles.companyNameB}>
                    हेल्पलाइन नम्बर:
                  </AppText>
                  <AppText style={styles.companyName}>
                    {Config.AGRIGATORHELPLINE}
                  </AppText>
                  <AppTouchableOpacity
                    children={<Icon name="ios-call-outline" size={30} />}
                    style={styles.mailButton}
                    onPress={() =>
                      Linking.openURL(`tel:${Config.AGRIGATORHELPLINE}`)
                    }
                  />
                </View>
                <VersionNameText />
              </View>
            </>
          ) : (
            <>
              <View>
                <View style={styles.contentWrap}>
                  <AppText style={styles.contentTextFirst}>
                    <AppText style={{fontWeight: 'bold', fontSize: 20}}>
                      एग्रीगेटर
                    </AppText>{' '}
                    एक विश्वसनीय और कुशल ऑनलाइन बाजार है जो मध्यवर्ती संस्थाएँ
                    को हटा के, स्पष्टता लाकर और प्रतिवर्तन काल को कम करके अनाज
                    व्यापार के असंगठित क्षेत्र को सरल बना रहा है, जिसके तहत लागत
                    प्रभावी लेनदेन होता है। यह सत्यापित खरीदारों और विक्रेताओं
                    को विश्वास विकसित करने, अपने व्यापार के नेटवर्क को बढ़ाने और
                    विकास के अधिक अवसर प्रदान करता है। हम एक एंड-टू-एंड सॉल्यूशन
                    प्लेटफॉर्म हैं जो अनाज के व्यापार और परिवहन को परेशानी मुक्त
                    बनाते हैं।
                  </AppText>
                  <AppText style={styles.contentTextSecond}>
                    "डिजिटल इंडिया" की दुनिया में, हमारी तकनिकी मंच खरीदारों,
                    विक्रेताओं और वाहकों को किसी भी स्थान पर अपने कनेक्शन,
                    लेनदेन और दिन-प्रतिदिन के कार्यों का विस्तार करने में मदद
                    करेगा। लंबी अवधि में किसानों को लाभ पहुंचाने वाले उत्पादन
                    केंद्रित से बाजार केंद्रित में स्थान परिवर्तन करने का
                    दृष्टिकोण है।
                  </AppText>
                </View>
              </View>

              <AppTouchableOpacity
                onPress={() => {
                  openLink(Config.PRIVSCYURL);
                }}
                children={
                  <React.Fragment>
                    <Image
                      style={{flex: 1, maxWidth: 50, height: 26, width: 20}}
                      resizeMode="contain"
                      source={IMAGE_URL.privacy}
                    />
                    <AppText
                      style={{
                        flex: 1,
                        textAlign: 'left',
                        maxWidth: 220,
                        fontSize: 16,
                      }}>
                      गोपनीयता नीति
                    </AppText>
                    <Icon
                      name="ios-chevron-forward"
                      style={{
                        flex: 1,
                        justifyContent: 'flex-end',
                        textAlign: 'right',
                      }}
                    />
                  </React.Fragment>
                }
                style={styles.docBtn}
              />

              <AppTouchableOpacity
                onPress={() => {
                  openLink(Config.TERMSURL);
                }}
                children={
                  <React.Fragment>
                    <Image
                      style={{flex: 1, maxWidth: 50, height: 26, width: 20}}
                      resizeMode="contain"
                      source={IMAGE_URL.terms}
                    />
                    <AppText
                      style={{
                        flex: 1,
                        textAlign: 'left',
                        maxWidth: 220,
                        fontSize: 16,
                        fontWeight: '600',
                      }}>
                      नियम व शर्तें
                    </AppText>
                    <Icon
                      name="ios-chevron-forward"
                      style={{
                        flex: 1,
                        justifyContent: 'flex-end',
                        textAlign: 'right',
                      }}
                    />
                  </React.Fragment>
                }
                style={styles.docBtn}
              />
            </>
          )}
        </ScrollView>
      </BaseScreen>
    </React.Fragment>
  );
};
AboutUsContainer.SCREEN_NAME = 'AboutUsContainer';
AboutUsContainer.navigationOptions = {
  headerShown: false,
};
AboutUsContainer.navigate = () => {
  RootNavigator.navigate(AboutUsContainer.SCREEN_NAME);
};
export default AboutUsContainer;
function useAboutStyle() {
  const {
    style: {layout, gutter},
    value: {color, fontSize},
  } = useTheme();
  return StyleSheet.create({
    container: {
      ...layout.fill,
      backgroundColor: color.white,
    },
    aboutSection: {},

    companyInfo: {
      ...gutter.marginTop.large,
      ...gutter.paddingHorizontal.normal,
    },
    companyName: {
      ...gutter.paddingHorizontal.small,
      fontSize: fontSize.alternative,
      ...gutter.paddingVertical.normal,
      backgroundColor: '#E9E9E9',
      borderRadius: normalize(10),
    },
    companyNameB: {
      fontSize: fontSize.alternative,
    },
    docBtn: {
      ...layout.rowVerticalCenter,
      ...gutter.padding.regular,
      backgroundColor: '#F9F9F9',
      ...gutter.marginBottom.regular,
      ...gutter.paddingRight.tiny,
      ...gutter.marginHorizontal.normal,
      ...gutter.marginTop.normal,
      borderRadius: normalize(10),
    },
    button: {
      ...gutter.marginTop.regular,
      ...gutter.padding.regular,
      borderRadius: normalize(30),
      ...layout.fill,
    },
    buttonText: {
      color: 'black',
      ...layout.textAlignCenter,
      fontSize: fontSize.alternative,
    },
    activeButton: {
      backgroundColor: '#121212',
    },
    activeButtonText: {
      color: 'white',
      ...layout.textAlignCenter,
    },
    contentWrap: {
      ...gutter.marginHorizontal.normal,
    },
    contentTextFirst: {
      fontSize: fontSize.alternative,
      lineHeight: normalize(25),
      textAlign: 'justify',
    },
    contentTextSecond: {
      fontSize: normalize(18),
      lineHeight: normalize(25),
      paddingTop: normalize(10),
      textAlign: 'justify',
    },
    mailButton: {
      position: 'absolute',
      right: 30,
      bottom: 12,
      zIndex: 999,
    },
  });
}
