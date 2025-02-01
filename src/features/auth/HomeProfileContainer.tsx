import {View, StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import RootNavigator from '@/libs/navigation/RootNavigation';
import BaseScreen from '../base/screens/BaseScreen';
import Stepper from '@/components/Stepper';
import {useSignInStyle} from './styles/useSignInStyle';
import {AppText} from '@/components/AppText';
import strings from '@/util/Strings';
import AppButton from '@/components/AppButton';
import SignUpContainer from './SignUpContainer';
import {RootNavigationParam} from '../base/interfaces/interfaces';

const HomeProfileContainer = ({route}: RootNavigationParam<any>) => {
  const activeStep = 0;
  const {params} = route;
  useEffect(() => {
    StatusBar.setHidden(false);
  }, []);
  const style = useSignInStyle();
  return (
    <BaseScreen>
      <View style={style.homeProfile}>
        <Stepper totalSteps={5} activeStep={activeStep} />
        <View style={style.chooseProfile}>
          <AppText mode="header" style={style.textProfile}>
            {strings.chooseProfile}
          </AppText>
        </View>
        <View style={style.center}>
          <AppButton
            label={strings.buttonNames.owner}
            textColor={style.colors.white}
            buttonStyle={style.owner}
            onPress={() =>
              SignUpContainer.navigate(params?.mobileNumber, 'fleet-owner')
            }
          />
          <AppButton
            label={strings.buttonNames.driver}
            textColor={style.colors.white}
            buttonStyle={[style.owner, style.driver]}
            onPress={() =>
              SignUpContainer.navigate(params?.mobileNumber, 'driver')
            }
          />
          <AppButton
            label={strings.buttonNames.transporter}
            textColor={style.colors.white}
            buttonStyle={[style.owner, style.transporter]}
            onPress={() =>
              SignUpContainer.navigate(params?.mobileNumber, 'transporter')
            }
          />
        </View>
      </View>
    </BaseScreen>
  );
};

HomeProfileContainer.SCREEN_NAME = 'HomeProfileContainer';
HomeProfileContainer.navigationOptions = {
  headerShown: false,
};
HomeProfileContainer.navigate = (mobileNumber: string) => {
  RootNavigator.navigate(HomeProfileContainer.SCREEN_NAME, {mobileNumber});
};
export default HomeProfileContainer;
