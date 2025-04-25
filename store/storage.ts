// import { MMKV } from 'react-native-mmkv';
 
// const storage = new MMKV();
 
// export const zustandStorage = {
//   setItem: (name: string, value: string) => {
//     return storage.set(name, value);
//   },
 
//   getItem: (name: string) => {
//     const value = storage.getString(name);
//     return value ?? null;
//   },
 
//   removeItem: (name: string) => {
//     return storage.delete(name);
//   },
// };
 
import * as SecureStore from 'expo-secure-store';

export const zustandStorage = {
  setItem: async (name: string, value: string) => {
    await SecureStore.setItemAsync(name, value);
  },
  getItem: async (name: string) => {
    return await SecureStore.getItemAsync(name) ?? null;
  },
  removeItem: async (name: string) => {
    await SecureStore.deleteItemAsync(name);
  },
};