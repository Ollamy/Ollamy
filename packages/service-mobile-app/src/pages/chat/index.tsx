import { StyleSheet, View } from 'react-native';
import backendApi from '../../client';

import TopBar from '../../components/topBar';

import { io } from 'socket.io-client';
import { useCallback, useEffect, useState } from 'react';
import { Box, FlatList, Text } from 'native-base';
import { TextInput } from 'react-native';
import IconButton from '../../components/buttons/iconButton';
import { UserInfo } from '../home';

interface Messages {
  sender: string;
  room: string;
  message: string;
  id: string;
}

const Chat = () => {
  const socket = io('http://localhost:3000/chat', { transports: ['websocket'] });
  const [messages, setMessages] = useState<Messages[]>([]);
  const [tempMessage, setTempMessage] = useState<string>('');
  const [editId, setEditId] = useState<string>();

  const [user, setUser] = useState<UserInfo>();
  const handleGetAuthenticatedServices = useCallback(async () => {
    const response = await backendApi.get('/user');
    setUser(response.data);
  }, []);

  useEffect(() => {
    handleGetAuthenticatedServices();
  }, [handleGetAuthenticatedServices]);

  socket.on('connect', () => {
    socket.emit('joinRoom', 'ROOM-general');
    console.log('connected');
  });

  socket.on('connect_error', (err) => {
    console.log(err instanceof Error);
    console.log(err.message);
  });

  socket.on('chatToClient', (msg: Messages) => {
    setMessages([...messages, msg]);
    console.log(msg);
  });

  socket.on('deleteChatToClient', ({ id }) => {
    setMessages(messages.filter((msg) => msg.id !== id));
    console.log(`Deleting ${id}`);
  });

  socket.on('editChatToClient', ({ id, message }) => {
    setMessages(messages.map((msg) => (msg.id !== id ? msg : { ...msg, message })));
    console.log(`Edit ${id}`);
  });

  socket.on('alertToClient', (msg) => {
    console.log(msg);
  });

  if (!user) return <></>;

  const sendMessage = () => {
    if (!editId) {
      socket.emit('chatToServer', { sender: user.email, room: 'ROOM-general', message: tempMessage });
    } else {
      socket.emit('editChatToServer', { id: editId, room: 'ROOM-general', message: tempMessage });
      setEditId(undefined);
    }
    setTempMessage('');
  };

  const deleteMessage = (msgId: string) => {
    socket.emit('deleteChatToServer', { id: msgId, room: 'ROOM-general' });
  };

  const editMessage = (msgId: string) => {
    setEditId(msgId);
  };

  return (
    <>
      <TopBar />
      <View style={styles.body}>
        <FlatList
          data={messages}
          renderItem={({ item: msg }) => (
            <Box style={msg.sender === user.email ? styles.userMessage : styles.otherMessage}>
              <Text style={{ fontSize: 14, fontWeight: '600' }}>{msg.sender}</Text>
              <Text>{msg.message}</Text>
              {msg.sender === user.email && (
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                  <IconButton
                    style={styles.deleteButton}
                    styleIcon={styles.deleteButton}
                    iconName={'edit'}
                    onPress={() => editMessage(msg.id)}
                  />
                  <IconButton
                    style={styles.deleteButton}
                    styleIcon={styles.deleteButton}
                    iconName={'delete'}
                    onPress={() => deleteMessage(msg.id)}
                  />
                </View>
              )}
            </Box>
          )}
        />
      </View>
      {editId && (
        <Box style={styles.editContainer}>
          <IconButton
            style={styles.deleteButton}
            styleIcon={styles.deleteButton}
            iconName={'close'}
            onPress={() => setEditId(undefined)}
          />
          <Text>Edit</Text>
        </Box>
      )}
      <Box style={styles.inputContainer}>
        <TextInput
          value={tempMessage}
          onChangeText={setTempMessage}
          inputMode="text"
          style={styles.input}
          placeholder="Message..."
        />
        <IconButton iconName={'arrow-right'} onPress={sendMessage} />
      </Box>
    </>
  );
};

const styles = StyleSheet.create({
  editContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eeeeee',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 4,
  },
  deleteButton: {
    alignSelf: 'flex-end',
  },
  deleteButtonIcon: {
    fontSize: 16,
    color: 'black',
  },
  userMessage: {
    backgroundColor: '#D2FA7B',
    borderRadius: 8,
    alignSelf: 'flex-end',
    padding: 10,
    marginTop: 5,
  },
  otherMessage: {
    backgroundColor: '#eeeeee',
    borderRadius: 8,
    padding: 10,
    alignSelf: 'flex-start',
    marginTop: 5,
  },
  input: {
    width: '83%',
    height: 56,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F7F7F7',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#BDBDBD',
    fontSize: 16,
    fontWeight: '600',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#BDBDBD',
  },
  body: {
    flex: 1,
    width: '100%',
    paddingTop: 22,
    paddingHorizontal: 5,
  },
  horizontalContainer: {
    textTransform: 'capitalize',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});

export default Chat;
