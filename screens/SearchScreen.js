import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import SearchContext from '../contexts/SearchContext';
import LogContext from '../contexts/LogContext';
import FeedList from '../components/FeedList';
import EmptySearchResult from '../components/EmptySearchResult';

function SearchScreen() {
  const {keyword} = useContext(SearchContext);
  const {logs} = useContext(LogContext);
  const searchLogs =
    keyword === ''
      ? []
      : logs.filter(log =>
          [log.title, log.body].some(text => text.includes(keyword)),
        );

  if (keyword === '') {
    return <EmptySearchResult type={'EMPTY_KEYWORD'} />;
  }

  if (searchLogs.length === 0) {
    return <EmptySearchResult type={'NOT_FOUND'} />;
  }

  return (
    <View style={styles.block}>
      <FeedList logs={searchLogs} />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {flex: 1},
});

export default SearchScreen;
