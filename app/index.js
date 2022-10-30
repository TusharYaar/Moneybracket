/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import AppContainer from './AppContainer';
AppRegistry.registerComponent(appName, () => AppContainer);
