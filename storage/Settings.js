import { AsyncStorage } from 'react-native';

export default class Settings {
  static _getBackendAddrStorageKey = () => 'BACKEND_ADDR';

  static getBackendAddr() {
    return AsyncStorage.getItem(this._getBackendAddrStorageKey())
                       .catch(error => console.log('Error in AsyncStorage.getItem: ' + error));
  }

  static setBackendAddr(addr) {
    return AsyncStorage.setItem(this._getBackendAddrStorageKey(), addr)
                      .catch(error => console.log('Error in AsyncStorage.setItem: ' + error));
  }
}