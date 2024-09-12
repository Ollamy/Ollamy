import { Text, View } from 'native-base';
import { createElement } from 'react';
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
  setModalVisible: (v: boolean) => void;
}

function EventModal({ isModalVisible, setModalVisible, data }: EventModalProps): JSX.Element {
  const closeModal = () => {
    setModalVisible(false);
  };

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
