import AsyncStorage from '@react-native-async-storage/async-storage';

class Storage {
  async setItem(key: string, value: any) {
    return await AsyncStorage.setItem(key, value?.toString());
  }

  async getItem(key: string) {
    return await AsyncStorage.getItem(key);
  }

  async removeItem(key: string) {
    return await AsyncStorage.removeItem(key);
  }
  async clearStorage() {
    return await AsyncStorage.clear();
  }
}
const StorageInstace = new Storage();
export default StorageInstace;
