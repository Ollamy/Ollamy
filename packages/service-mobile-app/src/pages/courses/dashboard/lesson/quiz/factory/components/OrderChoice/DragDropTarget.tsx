import React, { forwardRef } from 'react';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#EEECEC',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 5,
    borderWidth: 2,
    borderStyle: 'dashed',
    height: 45,
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 6,
  },
});

const DragAndDropTargetCard = forwardRef<any>(function MyInput(props, ref) {
  return <View ref={ref} style={styles.card} />;
});

export default DragAndDropTargetCard;
