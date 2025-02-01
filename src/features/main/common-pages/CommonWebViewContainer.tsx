import WebViewScreen from '@/components/WebViewScreen';
import RootNavigator from '@/libs/navigation/RootNavigation';
import {RouteProp} from '@react-navigation/native';
import * as React from 'react';

interface CommonWebViewContainerProps {
  route: RouteProp<{params: {url: string}}, 'params' | any>;
}

const CommonWebViewContainer = ({route}: CommonWebViewContainerProps) => {
  const {
    params: {url},
  }: any = route;

  return <WebViewScreen url={url && url} />;
};

CommonWebViewContainer.SCREEN_NAME = 'CommonWebViewContainer';
CommonWebViewContainer.navigationOptions = {
  headerShown: false,
};
CommonWebViewContainer.navigate = (link: string) => {
  RootNavigator.navigate(CommonWebViewContainer.SCREEN_NAME, {url: link});
};
export default CommonWebViewContainer;
