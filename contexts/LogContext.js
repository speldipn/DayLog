import React, {useRef} from 'react';
import {createContext, useState, useEffect} from 'react';
import {v4 as uuidv4} from 'uuid';
import LogsStorage from '../storages/LogsStorage';

// const [logs, setLogs] = useState(
//   Array.from({length: 5}).map((_, index) => ({
//     id: uuidv4(),
//     title: `Log ${index}`,
//     body: `Body ${index}`,
//     date: new Date(
//       Date.now() - 1000 * 60 * 60 * 24 * (Math.random() * 10),
//     ).toISOString(),
//   })),
// );

const LogContext = createContext();

export function LogContextProvider({children}) {
  const [logs, setLogs] = useState([]);
  const initialLogsRef = useRef(null);

  const onCreate = ({title, body, date}) => {
    const log = {
      id: uuidv4(),
      title,
      body,
      date,
    };
    setLogs([log, ...logs]);
  };

  const onUpdate = log => {
    const nextLogs = logs.map(item => (item.id === log.id ? log : item));
    setLogs(nextLogs);
  };

  const onRemove = log => {
    const nextLogs = logs.filter(item => item.id !== log.id);
    setLogs(nextLogs);
  };

  useEffect(() => {
    (async () => {
      const savedLogs = await LogsStorage.get();
      if (savedLogs) {
        initialLogsRef.current = savedLogs;
        setLogs(savedLogs);
      }
    })();
  }, []);

  useEffect(() => {
    if (logs === initialLogsRef.current) {
      return;
    }
    LogsStorage.set(logs);
  }, [logs]);

  return (
    <LogContext.Provider value={{logs, onCreate, onUpdate, onRemove}}>
      {children}
    </LogContext.Provider>
  );
}

export default LogContext;
