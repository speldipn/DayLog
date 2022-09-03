import React from 'react';
import {createContext, useState} from 'react';
import {v4 as uuidv4} from 'uuid';

const LogContext = createContext();

export function LogContextProvider({children}) {
  const [logs, setLogs] = useState(
    Array.from({length: 3}).map((_, index) => ({
      id: uuidv4(),
      title: `Log ${index}`,
      body: `Body ${index}`,
      date: new Date().toISOString(),
    })),
  );

  // {
  //   id: uuidv4(),
  //   title: 'Log 04',
  //   body: 'Log 05',
  //   date: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
  // },
  // {
  //   id: uuidv4(),
  //   title: 'Log 05',
  //   body: 'Log 05',
  //   date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
  // },

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
    console.log(logs.length, nextLogs.length);
    setLogs(nextLogs);
  };

  return (
    <LogContext.Provider value={{logs, onCreate, onUpdate, onRemove}}>
      {children}
    </LogContext.Provider>
  );
}

export default LogContext;
