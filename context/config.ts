import Constants from 'expo-constants';

const { manifest }: any = Constants;

// eslint-disable-next-line prettier/prettier
export const BASE_URL = 'https://student-service-app.azurewebsites.net';
//export const BASE_URL = `http://${manifest.debuggerHost.split(':').shift()}:5000`;
//export const BASE_URL = 'http://10.0.2.2:5000';
// eslint-disable-next-line prettier/prettier
export const LOCAL_MOBILE_URL = `http://${manifest.debuggerHost.split(':').shift()}:5000`;
