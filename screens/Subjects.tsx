import React, { useEffect, useState } from 'react';
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
} from 'react-native';
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

const Node = (props: tip) => {
  // const renderItemm = ({ item }) => {

  //     // <Pressable style={item.style}
  //     //     //onPress={() => { Grades(props.grades) }}
  //     //     android_ripple={{ color: "powderblue" }}>
  //     //     <Text style={{ alignSelf: 'center' }}>{item.subjectName} - {item.teacher}</Text>
  //     // </Pressable>
  // }

  // const renderItem = ({ item }) => (
  //     <Pressable style={item.style}
  //         // onPress={() => { Grades(props.grades) }}
  //         android_ripple={{ color: "powderblue" }}>
  //         <Text style={{ alignSelf: 'center' }}>{item.subjectName} - {item.teacher}</Text>
  //     </Pressable>
  // );

  return (
    // <SectionList
    //      sections={dataa}
    //      keyExtractor={(item, index)=> item + index}
    //      renderItem={({item})=> <Text>{item}</Text>}
    //      renderSectionHeader={({section: {item}})=>(
    //         <Text>{item}</Text>
    //      )}
    // />
    <Text>dd</Text>
  );
};

const Subjects = ({ navigation }: RootStackScreenProps<'Modal'>) => {
  //const navigation = useNavigation();
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
      <Text style={styles.Subject}>Subjects</Text>
      {/* {data.map((value: ISubjects, key: any) => (
                <Node key={key.toString()}
                    props={value}
                    style={styles.Node}
                >
                {/* <SectionList sections={value.grades} renderItem={({ item }) => <Grades props={item} />} /> 
                
                ))}
            */}
      {/* <Node
                subjects={subject}
                style={styles.Node}
            /> */}
      <ScrollView>
        {data.map((value: ISubjects, key) => (
          <Pressable
            key={key.toString()}
            style={styles.Node}
            onPress={() => {
              navigation.navigate('Grades', { grade: value.grades });
            }}
            //onPress={() => { Grades(props.grades) }}
            android_ripple={{ color: 'powderblue' }}
          >
            <Text style={{ alignSelf: 'center' }}>
              {value.subjectName} - {value.teacher}
            </Text>
            {/* {value.grades.map((valuee: Igrade, keyy) => (
                            <Text key={keyy.toString()} style={{ alignSelf: 'center' }}>{valuee.date} - {valuee.grade} - {valuee.description}</Text>
                        ))} */}
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

    alignSelf: 'center',
  },
  Node: {
    width: width * 0.8,
    height: height * 0.1,
    backgroundColor: '#f4f4f4',
    justifyContent: 'center',
    margin: 10,
    borderWidth: 3,
    borderRadius: 10,
    borderColor: 'whitesmoke',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
  },
});

export default Subjects;
