import crashlytics from '@react-native-firebase/crashlytics';
export interface CrashReporterError {
    name: string;
    message: string;
    stack?: string;
}

class CrashReporter {
    async setUserId(uid: string) {
        await crashlytics().setUserId(uid);
    }
    recordError(error: string, jsErrorName?: string) {
        crashlytics().recordError(new Error(error), jsErrorName);
    }
    executeError() {
        crashlytics().crash();
    }
    async setAttribute(key: string, value: string) {
        await crashlytics().setAttribute(key, value);
    }
}
const CrashReporterInstance = new CrashReporter();
export default CrashReporterInstance;
