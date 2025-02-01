import firestore from '@react-native-firebase/firestore';
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';
import {replaceDeep} from './Utils';
class Logger {
  private COLLECTION_SCREEN_LOGS = 'ScreenLogs';

  private COLLECTION_EVENT_LOGS = 'EventLogs';

  private userId?: string;

  registerUser = (userId: string | undefined) => {
    this.userId = userId;
  };

  logScreen = async (
    screenClass: string,
    screenPath: string,
    params: any | undefined,
  ) => {
    const actualDate = new Date();
    try {
      const data = {
        screen: screenClass,
        logDateTime: actualDate,
        params: params || null,
        appUserKey: this.userId || null,
      };
      await firestore()
        .collection(this.COLLECTION_SCREEN_LOGS)
        .doc('LogsData')
        .collection(actualDate.getTime()?.toString())
        .doc(this.geStringfyJsonWithoutSlash(data))
        .set(data);
      await analytics().logScreenView({
        screen_name: screenPath,
        screen_class: screenClass,
      });
    } catch (err) {
      crashlytics().recordError(err as Error);
    }
  };

  logEvent = async <TEvent extends any>(event: TEvent, param: any) => {
    const actualDate = new Date();
    try {
      const data = {
        event,
        payload: replaceDeep(param, undefined, null),
        logDateTime: actualDate,
        appUserKey: this.userId || null,
      };
      await firestore()
        .collection(this.COLLECTION_EVENT_LOGS)
        .doc('LogsData')
        .collection(actualDate.getTime()?.toString())
        .doc(this.geStringfyJsonWithoutSlash(data))
        .set(data);
    } catch (err) {
      crashlytics().recordError(err as Error);
    }
  };

  logError = async (error: Error) => {
    crashlytics().recordError(error);
  };

  private geStringfyJsonWithoutSlash = (data: any): string =>
    JSON.stringify(data).replace(/[/]/g, ':');
}
const LoggerInstance = new Logger();
export default LoggerInstance;
