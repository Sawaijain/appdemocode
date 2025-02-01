import {firebase} from '@react-native-firebase/analytics';
import analytics from '@react-native-firebase/analytics';
interface RegisterRequest {
  method: string;
}
interface ProfileUpdateRequest {}
const defaultAppAnalytics = firebase.analytics();
class AnalyticsService {
  async init() {
    await defaultAppAnalytics.setAnalyticsCollectionEnabled(true);
  }
  async functionAppOpen() {
    await defaultAppAnalytics.logAppOpen();
  }
  async functionUserRegister(request: RegisterRequest) {
    await defaultAppAnalytics.logSignUp(request);
  }
  async functionProfileUpdate(request: ProfileUpdateRequest) {
    await defaultAppAnalytics.logEvent('profileUpdate', {request});
  }
  async functionLogUpdate(eventName: string, request: any) {
    await defaultAppAnalytics.logEvent(eventName, {request});
  }
  async functionSetUserId(id: string) {
    await defaultAppAnalytics.setUserId(id);
  }
  async functionSetSessionTimeDuration() {
    await defaultAppAnalytics.setSessionTimeoutDuration(900000);
  }
  async functionScreenTracking(
    previousRouteName?: string,
    currentRouteName?: string,
  ) {
    const params = {
      screen_name: currentRouteName,
      screen_class: currentRouteName,
    };
    if (previousRouteName !== currentRouteName) {
      await analytics().logScreenView(params);
    }
  }
  async logEvent(event: string, request: {[key: string]: any} | undefined) {
    await defaultAppAnalytics.logEvent(event, request);
  }
  async functionRevieveEvent(event: {
    screen: string;
    action: string;
    category: string;
    label?: string;
    data?: {[key: string]: any};
  }) {
    // reference: https://revieve-plugin-docs.netlify.app/snippet/analytics
    await defaultAppAnalytics.logEvent(`revieveEvent`, event);
    const stringifiedData = JSON.stringify({
      ...(event.data || {}),
      label: event.label,
    });
    const logData: any = {
      screen: `REVIEVE/${event.screen}`,
      action: event.action,
      category: event.category,
    };
    if (stringifiedData !== '{}') logData.data = stringifiedData;
  }
}
const AnalyticsFunction = new AnalyticsService();
export default AnalyticsFunction;
