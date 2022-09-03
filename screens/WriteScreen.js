import React, {useState, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, KeyboardAvoidingView, Platform, Alert} from 'react-native';
import WriteHeader from '../components/WriteHeader';
import {SafeAreaView} from 'react-native-safe-area-context';
import WriteEditor from '../components/WriteEditor';
import LogContext from '../contexts/LogContext';

function WriteScreen({route}) {
  const log = route.params?.log;
  const [title, setTitle] = useState(log?.title ?? '');
  const [body, setBody] = useState(log?.body ?? '');
  const {onCreate, onUpdate, onRemove} = useContext(LogContext);
  const navigation = useNavigation();

  const onSave = () => {
    if (log) {
      onUpdate(log);
    } else {
      onCreate({
        title: title,
        body: body,
        date: new Date(),
      });
    }
    navigation.pop();
  };

  const onAskRemove = () => {
    Alert.alert(
      '삭제',
      '정말로 삭제하시겠어요?',
      [
        {text: '취소', style: 'cancel'},
        {
          text: '삭제',
          style: 'destructive',
          onPress: () => {
            onRemove(log);
            navigation.pop();
          },
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  return (
    <SafeAreaView style={styles.block}>
      <KeyboardAvoidingView
        style={styles.avoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <WriteHeader
          onSave={onSave}
          onAskRemove={onAskRemove}
          isEditing={!!log}
        />
        <WriteEditor
          title={title}
          body={body}
          onChangeTitle={setTitle}
          onChagneBody={setBody}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: 'white',
  },
  avoidingView: {flex: 1},
});

export default WriteScreen;
