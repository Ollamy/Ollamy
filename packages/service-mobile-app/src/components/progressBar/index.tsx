import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface ProgressBarProps {
  progress: number;
  width: number;
  height: number;
  containerStyle?: ViewStyle;
  fillStyle?: ViewStyle;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  width,
  height,
  containerStyle,
  fillStyle,
}) => {
  const [filledWidth, setFilledWidth] = useState(0);

  useEffect(() => {
    setFilledWidth(progress * width);
  }, [progress, width]);

  return (
    <View style={[styles.progressBar, { width, height }, containerStyle]}>
      <View style={[styles.progressFill, { width: filledWidth, height }, fillStyle]}>
        <View style={[styles.progressFill, { width: filledWidth + 0.1 * width, height, opacity: 0.1 }, fillStyle]}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  progressBar: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 16,
    overflow: 'hidden',
  },
  progressFill: {
    borderRadius: 16,
    backgroundColor: '#876BF6',
  },
});

export default ProgressBar;