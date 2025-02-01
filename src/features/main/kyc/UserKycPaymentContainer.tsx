import {View} from 'react-native';
import React, {useState} from 'react';
import RootNavigator from '@/libs/navigation/RootNavigation';
import {useSignInStyle} from '@/features/auth/styles/useSignInStyle';
import {useTheme} from '@/hooks/useTheme';
import KeyboardBaseScreen from '@/features/base/screens/KeyboardBaseScreen';
import Stepper from '@/components/Stepper';
import {AppText} from '@/components/AppText';
import strings from '@/util/Strings';
import {AppTextInput} from '@/components/AppTextInput';
import AppButton from '@/components/AppButton';
import UserKycTdsContainer from './UserKycTdsContainer';
import {RootNavigationParam} from '@/features/base/interfaces/interfaces';
import {getPANDetails} from '@/redux/actions/AuthAction';
import {showAlert} from '@/components/Alert';
import {useToast} from 'native-base';
import {getBankDetail} from '@/redux/actions/UserAction';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/AppStore';
import {useKeyboard} from '@/hooks/useKeyboard';
import {isEmpty, isNull} from 'lodash';

const UserKycPaymentContainer = ({route}: RootNavigationParam<any>) => {
  const {params} = route;
  const isKeyboard = useKeyboard();
  const {
    style: {layout, gutter},
    value: {color},
  } = useTheme();
  const {userDetails} = useSelector((state: RootState) => state.auth);
  const toast = useToast();
  const style = useSignInStyle(userDetails?.profileType);
  const [paymentForm, setPaymentForm] = useState<any>({
    panNumber: '',
    accountNumber: '',
    ifscCode: '',
    panDetails: null,
    bankDetails: null,
    isPanValid: false,
    fullname: '',
  });
  const [count, setCount] = useState<number>(0);
  const handleOnChangeInput = (id: string, data: any) => {
    if (id == 'panNumber' && data?.length < 11 && data?.length > 9) {
      let _data = {
        pan_number: data,
      };
      getPANDetails(_data, callBackForPAN);
    }
    setPaymentForm({
      ...paymentForm,
      [id]: data,
    });
  };
  const callBackForPAN = (success: boolean, panData?: any) => {
    if (success) {
      let result = panData.result;
      setPaymentForm({
        ...paymentForm,
        fullname: result?.user_full_name || result?.name,
        panDetails: result,
        panNumber: result?.pan_number,
      });
    } else if (!success) {
      showAlert({message: panData});
    }
  };
  const verifyBank = async () => {
    if (
      paymentForm &&
      !isNull(paymentForm?.bankDetails) &&
      !isEmpty(paymentForm?.bankDetails)
    ) {
      setPaymentForm({
        ...paymentForm,
        bankDetails: null,
      });
      return;
    }
    if (paymentForm?.accountNumber && paymentForm?.ifscCode) {
      setCount((prev) => prev + 1);
      if (count < 2) {
        const req = {
          account_number: paymentForm?.accountNumber,
          ifsc: paymentForm?.ifscCode,
        };
        const result = await getBankDetail(req);
        if (result && result.message == 'Success') {
          toast.show({title: 'बैंक विवरण सफलतापूर्वक प्राप्त किए गए'});
          let _result = result?.result;
          setPaymentForm({
            ...paymentForm,
            bankDetails: _result,
          });
        } else {
          toast.show({
            title:
              result?.message ||
              'बैंक विवरण सत्यापित नहीं हुआ है कृपया ग्राहक सहायता से संपर्क करें।',
          });
        }
      } else {
        showAlert({
          message: 'आपके पास 2 और प्रयास हैं. कृपया सही जानकारी भरें।',
        });
        return;
      }
    } else {
      showAlert({
        message: strings.field_requirment,
      });
      return;
    }
  };
  const handleNext = () => {
    const requiredFields = [
      {field: 'panNumber', name: 'PAN Number'},
      {field: 'ifscCode', name: 'IFSC Code'},
      {field: 'accountNumber', name: 'Account Number'},
      {field: 'panDetails', name: 'PAN Details'},
      {field: 'bankDetails', name: 'Bank Details'},
    ];

    const missingFields = requiredFields.filter(
      ({field}) => !paymentForm?.[field],
    );
    if (missingFields.length > 0) {
      missingFields.forEach(({name}) => {
        toast.show({title: `${name} is required`});
      });
    } else {
      let _kyc = {
        ...paymentForm,
        ...params?.data,
      };

      UserKycTdsContainer.navigate(_kyc);
    }
  };
  const isAnyFieldEmptyOrNull = () => {
    for (const field in paymentForm) {
      if (
        paymentForm[field] === null ||
        paymentForm[field] === undefined ||
        paymentForm[field] === ''
      ) {
        return true;
      }
    }
    return false;
  };
  const isButtonDisabled = isAnyFieldEmptyOrNull();

  return (
    <React.Fragment>
      <KeyboardBaseScreen
        scrollChildren={
          <View style={style.homeProfile}>
            <Stepper
              profileType={userDetails?.profileType}
              totalSteps={5}
              activeStep={3}
            />
            <View style={style.chooseProfile}>
              <AppText mode="header" style={style.textProfile}>
                {strings.kyc.payment}
              </AppText>
            </View>
            <AppText style={style.space} mode="description">
              {`(${strings.same_as_pan})`}
            </AppText>
            <View style={style.space}>
              <AppTextInput
                placeholder={strings.kyc.pan}
                placeholderTextColor={style.colors.placeholder}
                //@ts-ignore
                textInputStyle={style.textInput}
                onChangeText={(text) => handleOnChangeInput('panNumber', text)}
                value={paymentForm?.panNumber}
                autoCapitalize={'characters'}
                maxLength={10}
              />
            </View>
            <View style={style.space}>
              <AppTextInput
                placeholder={strings.name}
                placeholderTextColor={style.colors.placeholder}
                //@ts-ignore
                textInputStyle={style.textInput}
                value={paymentForm?.fullname}
                editable={false}
              />
            </View>
            <View style={style.space}>
              <AppTextInput
                placeholder={strings.kyc.account}
                placeholderTextColor={style.colors.placeholder}
                //@ts-ignore
                textInputStyle={style.textInput}
                onChangeText={(text) =>
                  handleOnChangeInput('accountNumber', text)
                }
                value={paymentForm?.accountNumber}
                keyboardType="number-pad"
                editable={isEmpty(paymentForm?.bankDetails)}
              />
            </View>
            <View style={style.space}>
              <AppTextInput
                placeholder={strings.kyc.ifsc}
                placeholderTextColor={style.colors.placeholder}
                //@ts-ignore
                textInputStyle={style.textInput}
                onChangeText={(text) => handleOnChangeInput('ifscCode', text)}
                value={paymentForm?.ifscCode}
                autoCapitalize="characters"
                editable={isEmpty(paymentForm?.bankDetails)}
              />
            </View>
            <View style={[layout.alignItemsEnd, style.space]}>
              <AppButton
                label={
                  isEmpty(paymentForm?.bankDetails)
                    ? strings.verification
                    : strings.change
                }
                textColor={color.white}
                buttonStyle={[
                  style.nextButton,
                  !(paymentForm?.accountNumber && paymentForm?.ifscCode) &&
                    style.disabled,
                ]}
                onPress={verifyBank}
                isEnabled={paymentForm?.accountNumber && paymentForm?.ifscCode}
              />
            </View>
            <View style={[style.space, gutter.marginTop.choiceHeight]}>
              <AppText mode="contact">
                कृपया अपनी बैंक जानकारी सही ढंग से भरें। आपके पास सत्यापित करने
                के लिए केवल 3 मौके होंगे।
              </AppText>
            </View>
          </View>
        }
      />
      {!isKeyboard && (
        <View style={style.buttonRow}>
          <AppButton
            buttonStyle={style.backButton}
            textColor={
              userDetails?.profileType === 'driver'
                ? color.driver
                : userDetails?.profileType === 'transporter'
                ? color.transporter
                : userDetails?.profileType === 'transporter'
                ? style.colors.buttonNew
                : style.colors.buttonNew
            }
            label={strings.back}
            onPress={() => RootNavigator.pop()}
          />
          <AppButton
            buttonStyle={[style.nextButton, isButtonDisabled && style.disabled]}
            textColor={style.colors.white}
            label={strings.next}
            onPress={handleNext}
            isEnabled={!isButtonDisabled}
          />
        </View>
      )}
    </React.Fragment>
  );
};
UserKycPaymentContainer.SCREEN_NAME = 'UserKycPaymentContainer';
UserKycPaymentContainer.navigationOptions = {
  headerShown: false,
};
UserKycPaymentContainer.navigate = (data: any) => {
  RootNavigator.navigate(UserKycPaymentContainer.SCREEN_NAME, {data});
};
export default UserKycPaymentContainer;
