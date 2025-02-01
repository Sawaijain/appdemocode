import React, {createContext, useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';
import Snackbar from 'react-native-snackbar';
interface NetworkInfoProps {
  children: React.ReactNode;
}
export const NetworkContext = createContext({isConnected: true});
const NetworkInfo = (props: NetworkInfoProps) => {
  const [isConnected, setIsConnected] = useState<boolean | any>(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isInternetReachable && !state.isConnected) {
        setIsConnected(state.isConnected);
        handleSnackBar();
      } else {
        Snackbar.dismiss();
      }
    });
    return () => unsubscribe();
  }, [isConnected]);
  const handleSnackBar = () => {
    Snackbar.show({
      text: 'Please check your internet connection',
      duration: Snackbar.LENGTH_INDEFINITE,
    });
  };

  return (
    <NetworkContext.Provider value={isConnected}>
      {props.children}
    </NetworkContext.Provider>
  );
};

export default NetworkInfo;
