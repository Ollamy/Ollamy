import React, { useState } from 'react';
import { Animated, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  image: {
    width: 100,
    height: 75,
    borderRadius: 8,
  },
});

interface ImageModalProps {
  uri: string;
}

function ImageModal({ uri }: ImageModalProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const scale = useState(new Animated.Value(1))[0];

  const expandImage = () => {
    setIsExpanded(true);
    Animated.parallel([
      Animated.timing(scale, {
        toValue: 4,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const shrinkImage = () => {
    Animated.parallel([
      Animated.timing(scale, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => setIsExpanded(false));
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={isExpanded ? shrinkImage : expandImage}>
        <Animated.Image
          source={{ uri }}
          style={[
            styles.image,
            {
              borderWidth: 2,
              transform: [{ scale }],
            },
          ]}
        />
      </TouchableWithoutFeedback>
    </View>
  );
}

export default ImageModal;
