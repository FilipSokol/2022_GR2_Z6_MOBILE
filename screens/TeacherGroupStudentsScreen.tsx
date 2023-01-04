import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Pressable,
  RefreshControl,
  ScrollView,
} from 'react-native';
import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import axios from 'axios';
import { AuthContext } from '../context/authModel';
import { BASE_URL } from '../context/config';
import StudentCard from '../components/StudentCard';
import { FlatList } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

export type studentProps = {
  studentId: number;
  groupId: number;
  firstName: string;
  lastName: string;
  email: string;
};

const TeacherGroupStudentsScreen = ({ navigation, route }: any) => {
  const groupId = route?.params?.group;
  const [isLoading, setIsLoading] = useState(true);
  const [students, setStudents] = useState<studentProps[]>([]);
  const { userInfo } = useContext(AuthContext);
  const studentsInfo = async () => {
    const response = await axios.get(
      `${BASE_URL}/api/departments/${userInfo.DepartmentId}/groups/${groupId}/students`,
    );
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
        renderItem={({ item }) => StudentCard(item, navigation, route)}
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

export default TeacherGroupStudentsScreen;
