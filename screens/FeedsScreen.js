import React, {useState, useRef, useContext, useEffect} from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import LogContext from '../contexts/LogContext';
import FeedList from '../components/FeedList';
import FloatingWriteButton from '../components/FloatingWriteButton';

function FeedsScreen() {
  const {logs} = useContext(LogContext);
  const [fade, setFade] = useState(false);

  return (
    <View style={styles.block}>
      <FeedList logs={logs} setFade={setFade} />
      <FloatingWriteButton fade={fade} />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
});

export default FeedsScreen;
