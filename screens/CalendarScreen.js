import React, {useRef, useState, useEffect} from 'react';
import {StyleSheet, View, Animated, Button} from 'react-native';
import CalendarView from '../components/CalendarView';

function SlideLeftAndRight() {
  const animation = useRef(new Animated.Value(0)).current;
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: enabled ? 1 : 0,
      useNativeDriver: true,
    }).start();
  }, [enabled, animation]);

  return (
    <View style={styles.block}>
      <CalendarView />
    </View>
  );
}

function CalendarScreen() {
  return (
    <View style={styles.block}>
      <SlideLeftAndRight />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {flex: 1},
  rectangle: {width: 100, height: 100, backgroundColor: 'black'},
});

export default CalendarScreen;
