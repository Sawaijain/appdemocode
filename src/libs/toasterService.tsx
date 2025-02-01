import Snackbar from 'react-native-snackbar';

class ToasterService {
  show(message: string) {
    let timeout = 400;
    setTimeout(() => {
      Snackbar.show({
        text: message,
        backgroundColor: 'black',
        duration: 3000,
        textColor: 'white',
        action: {
          text: 'Close',
          textColor: 'green',
          onPress: () => {
            Snackbar.dismiss();
          },
        },
      });
    }, timeout);
  }
}
const Toaster = new ToasterService();
export default Toaster;
