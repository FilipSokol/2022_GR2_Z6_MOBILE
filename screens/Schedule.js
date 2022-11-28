import React, { useEffect, useState } from 'react';
import { View, Dimensions, SafeAreaView } from 'react-native';
import EventCalendar from 'react-native-events-calendar';
import axios from 'axios';

import { BASE_URL } from '../context/config';

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
      return null;
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

// {
//   "name": "string",
//   "description": "string",
//   "startTime": "2022-11-01T08:52:34.897Z",
//   "endTime": "2022-11-01T10:52:34.897Z",
//   "weekDaysId": 1,
//   "ects": 1,
//   "teacherId": 3
// }

const getData = () => {
  let list = [];
  axios
    .get(`${BASE_URL}/api/subjects`)
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
        //setEvents([...events, obj]);
        //setEvents((events) => [...events, obj]);
        //console.log(events);
      });
    })
    .catch((err) => {
      console.log(err);
    });

  return list;
};

export const Schedule = (preload = []) => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    // preload = [
    //   {
    //     name: 'string',
    //     description: 'string',
    //     startTime: '2022-11-01T08:52:34.897Z',
    //     endTime: '2022-11-01T10:52:34.897Z',
    //     weekDaysId: 1,
    //     ects: 1,
    //     teacherId: 3,
    //   },
    // ];
    //preload = [];
    if (
      !preload.length === 'undefined' ||
      preload.length === 0 ||
      (Object.keys(preload).length === 0 && preload.constructor === Object)
    ) {
      //console.log('here?', preload.length);
      setEvents(getData());
    }

    //const resultt = getData();
  }, []);
  return (
    <SafeAreaView>
      <View>
        <EventCalendar
          eventTapped={() => {
            idk();
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
          initDate={'2022-10-31'}
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

export default Schedule;
