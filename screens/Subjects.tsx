import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  SectionList,
  Dimensions,
  GestureResponderEvent,
  Pressable,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  View,
  ViewProps,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import COLORS from '../constants/Colors_Screens';
import { AuthContext } from '../context/authModel';
import { BASE_URL } from '../context/config';
import { RootStackScreenProps } from '../types';
//import { useNavigation } from '@react-navigation/native';

export type GradeProps = {
  grade: number;
  date?: string;
  description?: string;
};

interface Igrade {
  grade: number;
  date?: string;
  description?: string;
}

interface ISubjects extends TextProps {
  subjectName: string;
  teacher?: string;
  ECTS?: number;
  onPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewProps>;
  grades: GradeProps[];
}

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

// useEffect(()=>{
//     Grades();
// },[])

const Grades = (props: ISubjects['grades']) => {
  return props.forEach((grade) => {
    return (
      //console.warn(`${gradee.grade} - ${gradee.date} - ${gradee.description}`)
      <Pressable style={{ backgroundColor: 'red' }}>
        <Text>
          {grade.grade} - {grade.date} - {grade.description}
        </Text>
      </Pressable>
    );
  });
};

type tip = {
  subjects: ISubjects[];
};

export type subjectProps = {
  description: string;
  ects: number;
  startTime: string;
  endTime: string;
  name: string;
  scheduleId: number;
  type: string;
};

const Subjects = ({ navigation, route }: RootStackScreenProps<'Modal'>) => {
  //const navigation = useNavigation();
  const [userSubject, setUserSubjects] = useState([]);
  const { userInfo }: any = useContext(AuthContext);
  const [refresh, setRefresh] = useState(true);

  route?.params?.StudentId
    ? (userInfo.StudentId = route.params.StudentId)
    : null;
  const getAllSubjects = () => {
    axios
      .get(`${BASE_URL}/api/subjects/${userInfo.StudentId}/student`)
      .then((response) => {
        const topTierBackEnd = response.data.filter(
          (ele: subjectProps, index: number) =>
            index ===
            response.data.findIndex(
              (elem: subjectProps) => elem.name === ele.name,
            ),
        );
        setRefresh(false);
        setUserSubjects(topTierBackEnd);
      });
  };
  useEffect(() => {
    getAllSubjects();
  }, []);
  const [data, setData] = useState([
    {
      subjectName: 'Subject1',
      teacher: '<teacher_name>',
      ECTS: 5,
      grades: [
        {
          grade: 3.5,
          date: '2022-10-10 13:45:22',
          description: 'Homework1',
        },
        {
          grade: 5,
          date: '2022-10-22 09:22:13',
          description: 'Homework2',
        },
        {
          grade: 2,
          date: '2022-11-07 15:10:12',
          description: 'Homework3',
        },
      ],
    },
    {
      subjectName: 'Subject2',
      teacher: '<teacher_name>',
      ECTS: 3,
      grades: [
        {
          grade: 3,
          date: '2022-10-10 13:45:22',
          description: 'Homework2',
        },
        {
          grade: 2,
          date: '2022-10-22 09:22:13',
          description: 'Homework2',
        },
        {
          grade: 4,
          date: '2022-11-07 15:10:12',
          description: 'Homework3',
        },
        {
          grade: 5,
          date: '2022-11-07 15:10:12',
          description: 'Homework4',
        },
        {
          grade: 5,
          date: '2022-11-07 15:10:12',
          description: 'Homework5',
        },
        {
          grade: 5,
          date: '2022-11-07 15:10:12',
          description: 'Homework6',
        },
        {
          grade: 5,
          date: '2022-11-07 15:10:12',
          description: 'Homework7',
        },
        {
          grade: 5,
          date: '2022-11-07 15:10:12',
          description: 'Homework8',
        },
        {
          grade: 3,
          date: '2022-11-07 15:10:12',
          description: 'Homework9',
        },
        {
          grade: 2,
          date: '2022-11-07 15:10:12',
          description: 'Homework10',
        },
      ],
    },
    {
      subjectName: 'Subject3',
      teacher: '<teacher_name>',
      ECTS: 4,
      grades: [],
    },
    {
      subjectName: 'Subject4',
      teacher: '<teacher_name>',
      ECTS: 4,
      grades: [
        {
          grade: 3,
          date: '2022-10-10 13:45:22',
          description: 'Homework1',
        },
        {
          grade: 5,
          date: '2022-10-22 09:22:13',
          description: 'Homework2',
        },
      ],
    },
  ]);

  return (
    <View style={{ flex: 1 }}>
      {refresh ? <ActivityIndicator /> : null}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={getAllSubjects} />
        }
      >
        {userSubject?.map((value: subjectProps, key) => (
          <Pressable
            key={key.toString()}
            style={[styles.Node]}
            onPress={() => {
              navigation.navigate('Grades', { grade: value.name });
            }}
            //onPress={() => { Grades(props.grades) }}
            android_ripple={{ color: 'powderblue' }}
          >
            <Text
              style={{
                alignSelf: 'center',
                textAlign: 'center',
                fontWeight: '500',
                fontSize: 16,
              }}
            >
              {value.name}
              {/* - {value.description} */}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  Subject: {
    //opacity: 0.1,
    //fontSize: 20,
    backgroundColor: '#FDFDFD',
    alignSelf: 'center',
  },
  Node: {
    width: width * 0.8,
    height: height * 0.1,
    backgroundColor: '#FDFDFD',
    justifyContent: 'center',
    margin: 10,
    borderWidth: 2,
    borderRadius: 3,
    //borderBottomRightRadius: 4,
    borderColor: '#4D0036',
    //shadowOpacity: 0.8,
    elevation: 6,
    borderBottomWidth: 7,
    borderRightWidth: 4,
    shadowColor: '#000022',
    shadowRadius: 15,
  },
});

export default Subjects;
