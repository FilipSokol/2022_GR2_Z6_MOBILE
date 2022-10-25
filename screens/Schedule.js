import React from 'react';
import { View, Text, Dimensions, SafeAreaView, Platform } from 'react-native';
import EventCalendar from 'react-native-events-calendar';

let { width } = Dimensions.get('window');

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

const Schedule = () => {
  return (
    <SafeAreaView>
      <View>
        <EventCalendar
          eventTapped={() => {
            null;
          }}
          // Function on event press
          events={event}
          scrollToFirst={'True'}
          format24h={'True'}
          // passing the Array of event
          width={width}
          // Container width
          size={30}
          //upperCaseHeader
          //uppercase
          // Number of date will render before and after initDate
          // (default is 30 will render 30 day before initDate
          // and 29 day after initDate)
          initDate={'2022-10-10'}
          // Show initial date (default is today)
          //scrollToFirst
          // Scroll to first event of the day (default true)
        />
      </View>
    </SafeAreaView>
  );
};

export default Schedule;
