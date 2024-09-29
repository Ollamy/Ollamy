// @ts-ignore
import UNLOCK_SOUND from 'assets/sound/unlock.mp3';
import { Audio } from 'expo-av';
import { Text, View } from 'native-base';
import { createElement, useEffect, useState } from 'react';
import { Modal, StyleSheet, TouchableOpacity } from 'react-native';

import type { FactoryEventComponentData } from './eventFactory';
import { eventFactory } from './eventFactory';

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    display: 'flex',
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface EventModalProps {
  data?: FactoryEventComponentData;
  isModalVisible: boolean;
  closeModal: () => void;
}

function EventModal({ isModalVisible, closeModal, data }: EventModalProps): JSX.Element {
  const [sound, setSound] = useState<Audio.Sound>();

  useEffect(() => {
    const loadSound = async () => {
      const { sound: soundObject } = await Audio.Sound.createAsync(UNLOCK_SOUND);
      setSound(soundObject);
    };
    loadSound().catch(console.error);
  }, []);

  useEffect(() => {
    if (isModalVisible && sound) {
      const playSound = async () => {
        await sound.setPositionAsync(0);
        await sound.playAsync();
      };
      playSound().catch(console.error);
    }
  }, [isModalVisible, sound]);

  return (
    <Modal transparent visible={isModalVisible} animationType={'slide'} onRequestClose={closeModal}>
      <TouchableOpacity style={styles.modalOverlay} onPress={closeModal}>
        <View style={styles.modalContainer}>
          {data ? (
            createElement(eventFactory[data.type], {
              data,
            })
          ) : (
            <Text>A event have occur !</Text>
          )}
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

export default EventModal;
