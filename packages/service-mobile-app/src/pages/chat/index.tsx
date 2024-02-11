import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Box, FlatList, Text } from 'native-base';
import { io } from 'socket.io-client';
import { useGetUserQuery } from 'src/services/user/user';
import { EnvVar } from 'src/utils/loadEnv';

import IconButton from 'src/components/buttons/iconButton';

interface Messages {
	sender: string;
	room: string;
	message: string;
	id: string;
}

function Chat() {
	const socket = io(`${EnvVar.backendUrl}chat`, { transports: ['websocket'] });
	const [messages, setMessages] = useState<Messages[]>([]);
	const [tempMessage, setTempMessage] = useState<string>('');
	const [editId, setEditId] = useState<string>();
	const { data: user } = useGetUserQuery();

	socket.on('connect', () => {
		socket.emit('joinRoom', 'ROOM-general');
		// eslint-disable-next-line no-console
		console.log('connected');
	});

	socket.on('connect_error', (err) => {
		// eslint-disable-next-line no-console
		console.log(err.message);
	});

	socket.on('chatToClient', (msg: Messages) => {
		setMessages([...messages, msg]);
	});

	socket.on('deleteChatToClient', ({ id }) => {
		setMessages(messages.filter((msg) => msg.id !== id));
	});

	socket.on('editChatToClient', ({ id, message }) => {
		setMessages(messages.map((msg) => (msg.id !== id ? msg : { ...msg, message })));
	});

	if (!user) return <Box />;

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
										iconName="edit"
										onPress={() => editMessage(msg.id)}
									/>
									<IconButton
										style={styles.deleteButton}
										styleIcon={styles.deleteButton}
										iconName="delete"
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
						iconName="close"
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
				<IconButton iconName="arrow-right" onPress={sendMessage} />
			</Box>
		</>
	);
}

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
