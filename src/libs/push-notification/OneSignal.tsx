// eslint-disable-next-line @typescript-eslint/no-unused-vars
import OneSignal from 'react-native-onesignal';
import Config from 'react-native-config';
import {Alert} from 'react-native';
import {Linking} from 'react-native';
import {AppDispatch, appDispatch} from '@/libs';
import {getUserDetail} from '@/redux/actions/UserAction';
class OneSignalController {
  async OneSignalInitAndExcute() {
    OneSignal.setLogLevel(6, 0);
    OneSignal.setAppId(
      String(Config.ONESIGNALID) || 'f88f2620-a651-4ff6-9f99-010a92139c15',
    );
    OneSignal.promptForPushNotificationsWithUserResponse();
    OneSignal.setRequiresUserPrivacyConsent(false);

    OneSignal.setNotificationOpenedHandler((notification) => {});
  }
  showNotification(notifReceivedEvent: any) {
    let notif: any = notifReceivedEvent?.getNotification();
    console.log(notif);
    const button1 = {
      text: 'Cancel',
      onPress: () => {
        notifReceivedEvent?.complete();
      },
      style: 'cancel',
    };
    const button2 = {
      text: 'Ok',
      onPress: () => {
        if (notif && notif.additionalData?.callUrl) {
          Linking.openURL(notif.additionalData?.callUrl);
        }
        notifReceivedEvent.complete(notif);
      },
    };
    Alert.alert('', notif.body, [button1, button2], {cancelable: true});
  }
  openNotification(notification: any) {
    const {
      notification: {additionalData},
      action,
    }: any = notification;
    console.log(additionalData);
    if (additionalData && additionalData?.callUrl) {
      Linking.openURL(additionalData?.callUrl);
    }
  }
}

const OneSignalControllerInstance = new OneSignalController();
export default OneSignalControllerInstance;
