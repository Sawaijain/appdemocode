import React, {useEffect} from 'react';
import OneSignalControllerInstance from './OneSignal';
import {useDispatch} from 'react-redux';

const OneSignalWatcher = () => {
  useEffect(() => {
    OneSignalControllerInstance.OneSignalInitAndExcute();
  }, []);
  return <></>;
};
export default OneSignalWatcher;
