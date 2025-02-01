import React, {RefObject, useState} from 'react';
import {WebView} from 'react-native-webview';
import {ActivityIndicator, ScrollView} from 'react-native';
interface WebViewProps {
  url: string;
  onError?: any;
  callbackCanGoBack?: (canGoBack: boolean) => void;
  webviewRef?: RefObject<WebView>;
  renderError?: any;
}

export default function CarrierWebview({
  url,
  onError,
  callbackCanGoBack,
  webviewRef,
  renderError,
}: WebViewProps) {
  return (
    <ScrollView
      contentContainerStyle={{flex: 1, width: '100%', height: '100%'}}>
      <WebView
        automaticallyAdjustContentInsets={false}
        scrollEnabled={true}
        style={{flexGrow: 1}}
        onError={onError}
        renderError={renderError}
        mediaPlaybackRequiresUserAction={true}
        source={{uri: url}}
        ref={webviewRef}
        onNavigationStateChange={(navState) => {
          if (callbackCanGoBack) {
            callbackCanGoBack(navState.canGoBack);
          }
        }}
        startInLoadingState={true}
      />
    </ScrollView>
  );
}
