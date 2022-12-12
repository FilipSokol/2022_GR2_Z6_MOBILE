import Constants from 'expo-constants';

const { manifest }: any = Constants;

// eslint-disable-next-line prettier/prettier
export const BASE_URL = `http://${manifest.debuggerHost.split(':').shift()}:5000`;
// eslint-disable-next-line prettier/prettier
export const LOCAL_MOBILE_URL = `http://${manifest.debuggerHost.split(':').shift()}:5000`;
