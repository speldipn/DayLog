import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FeedsScreen from './FeedsScreen';
import CalendarScreen from './CalendarScreen';
import SearchScreen from './SearchScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SearchHeader from '../components/SearchHeader';
import SearchContext from '../contexts/SearchContext';

const Tab = createBottomTabNavigator();

// const getRouteName = ({route}) => {
//   const nameMap = {
//     Feeds: '피드',
//     Calendar: '달력',
//     Search: '검색',
//   };
//   console.log(route.name);
//   return nameMap[route.name];
// };

function MainTab() {
  const {keyword, onChangeText} = useContext(SearchContext);

  return (
    <Tab.Navigator
      initialRouteName="Feeds"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#009688',
      }}>
      <Tab.Screen
        name="Feeds"
        component={FeedsScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="view-stream" color={color} size={size} />
          ),
          title: '피드',
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="event" color={color} size={size} />
          ),
          title: '달력',
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="search" color={color} size={size} />
          ),
          title: '검색',
          headerTitle: () => (
            <SearchHeader keyword={keyword} onChangeText={onChangeText} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTab;
