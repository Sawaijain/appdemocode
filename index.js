/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import RNBootSplash from 'react-native-bootsplash';
RNBootSplash.hide();
AppRegistry.registerComponent(appName, () => App);
