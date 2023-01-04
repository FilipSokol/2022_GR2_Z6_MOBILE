import {
  View,
  Text,
  Pressable,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import UsersThree from '../assets/images/UsersThree.svg';
import { useNavigation } from '@react-navigation/native';
import { isLoading } from 'expo-font';
import StudentCard from '../components/StudentCard';
import axios from 'axios';
import { AuthContext } from '../context/authModel';
import { BASE_URL } from '../context/config';
import { studentProps } from './TeacherGroupStudentsScreen';
const TeacherAllStudents = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [students, setStudents] = useState<studentProps[]>([]);
  const { userInfo } = useContext(AuthContext);
  const studentsInfo = async () => {
    // const response = await axios.get(
    //   `${BASE_URL}/api/departments/${userInfo.DepartmentId}/groups/${groupId}/students`,
    // );
    const response = await axios.get(`${BASE_URL}/api/students`);
    if (response.status == 200) {
      setIsLoading(false);
      setStudents(response.data);
    }
  };
  useEffect(() => {
    studentsInfo();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? <ActivityIndicator size="large" /> : null}
      <FlatList
        data={students}
        renderItem={({ item }) => StudentCard(item, navigation)}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => studentsInfo()}
          />
        }
        //refreshControl={{}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#FDFDFD',
  },
  node: {
    backgroundColor: '#FDFDFD',
    borderColor: '#000022',
    borderWidth: 2,
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderRadius: 8,
    borderStyle: 'solid',
    //alignItems: 'center',
  },
  text: {
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 16,
    width: 180,
  },
});

export default TeacherAllStudents;
