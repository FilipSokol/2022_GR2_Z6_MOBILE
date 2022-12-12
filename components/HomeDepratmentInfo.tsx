import axios from 'axios';
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  ActivityIndicator,
} from 'react-native';
import { AuthContext } from '../context/authModel';
import { BASE_URL } from '../context/config';

const getDepartmentData = async (
  userInfo: any,
  setDepartmentName: Dispatch<SetStateAction<any>>,
  setRefresh: Dispatch<SetStateAction<any>>,
) => {
  const response = await axios.get(
    `${BASE_URL}/api/departments/${userInfo['DepartmentId']}`,
  );
  setRefresh(false);
  setDepartmentName(response.data.name);
};

const HomeDepartmentInfo = () => {
  const { width, height } = useWindowDimensions();
  const [departmentName, setDepartmentName] = useState('');
  const [refresh, setRefresh] = useState(true);
  const { userInfo }: any = useContext(AuthContext);
  useEffect(() => {
    userInfo
      ? getDepartmentData(userInfo, setDepartmentName, setRefresh)
      : null;
  }, [userInfo]);
  return (
    <View
      style={[styles.container, { width: width * 0.8, height: height * 0.1 }]}
    >
      {refresh ? <ActivityIndicator /> : null}
      <Text style={styles.text}>{departmentName}</Text>
      {/* <Text style={styles.text}>role</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fbf1e6',
    borderColor: '#000022',
    borderWidth: 2,
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderRadius: 8,
    borderStyle: 'solid',
  },
  text: {
    fontWeight: '500',
    fontSize: 16,
  },
});

export default HomeDepartmentInfo;
