import React, {useState, useRef} from 'react';
import {WebView} from 'react-native-webview';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import ErrorModal from './Errors';
import CarrierWebview from './CarrierWebview';
import RootNavigator from '@/libs/navigation/RootNavigation';

interface WebViewScreenProps {
  url: string;
  showBackButton?: boolean;
  profileIcon?: boolean;
}

const styles = StyleSheet.create({
  rootcontainer: {
    flex: 1,
    padding: 0,
    margin: 0,
    backgroundColor: 'white',
  },
});

const WebViewScreen = ({url}: WebViewScreenProps) => {
  const [canGoBack, setCanGoBack] = useState(false);
  const webviewRefNav = useRef<WebView>(null);
  const [error, setError] = useState('');
  const renderErrorCallback = (errorResponse: string) =>
    setError(errorResponse);
  const callbackCanGoBack = (canGoBackResponse: boolean) => {
    setCanGoBack(canGoBackResponse);
  };
  const backNavigation = () => {
    if (canGoBack) {
      if (webviewRefNav.current) {
        webviewRefNav.current.goBack();
      }
    } else {
      RootNavigator.pop();
    }
    return null;
  };
  if (error) {
    return <ErrorModal error={'Something went wrong'} />;
  }
  return (
    <SafeAreaView style={styles.rootcontainer}>
      <View style={styles.rootcontainer}>
        <CarrierWebview
          url={url}
          callbackCanGoBack={callbackCanGoBack}
          webviewRef={webviewRefNav}
          renderError={renderErrorCallback}
        />
      </View>
    </SafeAreaView>
  );
};

export default WebViewScreen;
