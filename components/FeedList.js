import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import FeedListItem from './FeedListItem';

function FeedList({logs, setFade, ListHeaderComponent}) {
  const onScroll = e => {
    const {contentSize, layoutMeasurement, contentOffset} = e.nativeEvent;

    if (contentSize.height > layoutMeasurement.height) {
      if (contentOffset.y >= contentSize.height - layoutMeasurement.height) {
        setFade && setFade(false);
      } else {
        setFade && setFade(true);
      }
    }
  };

  return (
    <FlatList
      data={logs}
      style={styles.block}
      renderItem={({item}) => <FeedListItem log={item} />}
      keyExtractor={log => log.id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      onScroll={onScroll}
      ListHeaderComponent={ListHeaderComponent}
    />
  );
}

const styles = StyleSheet.create({
  block: {flex: 1},
  separator: {
    backgroundColor: '#e0e0e0',
    height: 1,
    width: '100%',
  },
});

export default FeedList;
