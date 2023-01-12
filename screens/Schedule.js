import React, { memo, useEffect, useState } from 'react';
import { View, Dimensions, SafeAreaView } from 'react-native';
import EventCalendar from 'react-native-events-calendar';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';

import { BASE_URL } from '../context/config';
import { AuthContext } from '../context/authModel';

let { width } = Dimensions.get('window');
const idk = async () => {
  const response = await axios
    .get('http://10.0.2.2:5000/api/subjects')
    .then((data) => {
      console.log(data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

let event = [
  {
    color: '#fcfedf',
    start: '2022-10-10 08:15:00',
    end: '2022-10-10 09:45:00',
    title: 'Zaawansowane programowanie internetowe',
    summary: '<teacher_name>, Wykład (WYK), grupa nr 1',
  },
  {
    color: '#fcfedf',
    start: '2022-10-10 10:15:00',
    end: '2022-10-10 11:45:00',
    title: 'Inteligentne aplikacje internetowe',
    summary: '<teacher_name>, Wykład (WYK), grupa nr 1',
  },
  {
    color: 'powderblue',
    start: '2022-10-10 12:15:00',
    end: '2022-10-10 13:45:00',
    title: 'Zaawansowane programowanie internetowe',
    summary: '<teacher_name>, Laboratorium (LAB), grupa nr 2',
  },
  {
    color: 'powderblue',
    start: '2022-10-10 14:15:00',
    end: '2022-10-10 15:45:00',
    title: 'Inteligentne aplikacje internetowe',
    summary: '<teacher_name>, Laboratorium (LAB), grupa nr 2',
  },
];

const checkType = (type) => {
  // if (type === 'Unknown') return null;
  // if (type === 'Laboratory') return 'powderblue';
  switch (type) {
    case 'Unknown':
      return 'whitesmoke';
    case 'Laboratory':
      return 'powderblue';
    case 'Lecture':
      return '#fcfedf';
    case 'Event':
      return null;
    default:
      return null;
  }
};

const getData = (groupId, teacher) => {
  let list = [];
  const url = teacher
    ? `${BASE_URL}/api/subjects/${teacher}/teacher`
    : `${BASE_URL}/api/schedules/${groupId}`;
  axios
    .get(url)
    .then((result) => {
      result.data.forEach((element) => {
        let obj = {
          color: checkType(element.type),
          start: element.startTime,
          end: element.endTime,
          title: element.name,
          summary: `${element.description}, ${element.type}`,
        };
        list.push(obj);
      });
    })
    .catch((err) => {
      console.log(err);
    });
  //console.log(url);
  return list;
};

export const Schedule = (preload = []) => {
  const { userInfo } = React.useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      setEvents(getData(userInfo?.GroupId, userInfo?.TeacherId));
    }
    //console.log('events', { events });
    //const resultt = getData();
  }, [isFocused]);
  return (
    <SafeAreaView>
      <View>
        <EventCalendar
          eventTapped={() => {
            //idk();
            //console.log(events);
          }}
          // Function on event press
          events={events}
          scrollToFirst={'True'}
          format24h={'True'}
          // passing the Array of event
          width={width}
          // Container width
          size={30}
          // upperCaseHeader
          // uppercase
          // Number of date will render before and after initDate
          // (default is 30 will render 30 day before initDate
          // and 29 day after initDate)
          //initDate={'2022-11-26'}
          // Show initial date (default is today)
          //scrollToFirst
          // Scroll to first event of the day (default true)
          ///onDateChange={() => {
          //  console.log('onDateChange');
          //}}
        />
      </View>
    </SafeAreaView>
  );
};

export default memo(Schedule);
