import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {Calendar} from 'react-native-calendars';

function CalendarView() {
  return <Calendar style={styles.calendar} />;
}

const styles = StyleSheet.create({
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
});

export default CalendarView;
