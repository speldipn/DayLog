import React, {useContext, useState, useMemo} from 'react';
import CalendarView from '../components/CalendarView';
import LogContext from '../contexts/LogContext';
import {format} from 'date-fns';
import FeedList from '../components/FeedList';

function CalendarScreen() {
  const {logs} = useContext(LogContext);

  const markedDates = useMemo(
    () =>
      logs.reduce((acc, current) => {
        const formattedDate = format(new Date(current.date), 'yyyy-MM-dd');
        acc[formattedDate] = {marked: true};
        console.log('Process markDates');
        return acc;
      }, {}),
    [logs],
  );

  const [selectedDate, setSelectedDate] = useState(
    format(Date.now(), 'yyyy-MM-dd'),
  );

  const filteredLogs = logs.filter(
    log => format(new Date(log.date), 'yyyy-MM-dd') === selectedDate,
  );

  return (
    <FeedList
      logs={filteredLogs}
      ListHeaderComponent={
        <CalendarView
          markedDates={markedDates}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      }
    />
  );
}

export default CalendarScreen;
