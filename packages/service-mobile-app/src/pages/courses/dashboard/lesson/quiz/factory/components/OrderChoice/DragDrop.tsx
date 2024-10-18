import React, { useRef, useState } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Animated, PanResponder, StyleSheet, Text } from 'react-native';

interface DragAndDropCardProps {
  style?: StyleProp<ViewStyle>;
  heading: string;
  checkCollision: (
    idx: number,
    draggableBox: { left: number; top: number },
  ) => Promise<{ x: number; y: number } | null>;
  idx: number;
  setScrollEnable: (b: boolean) => void;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    elevation: 5,
    borderWidth: 4,
    borderColor: '#ECECEC',
    width: '100%',
    height: 45,
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

function DragAndDropCard({ heading, checkCollision, idx, style, setScrollEnable }: DragAndDropCardProps) {
  const boxRef = useRef(null);
  const top = idx * 55;

  // Create a ref to store the position of the card
  const position = useRef(new Animated.ValueXY()).current;

  // State to track if the card is being dragged
  const [dragging, setDragging] = useState(false);

  // Create a pan responder to handle touch events
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        setScrollEnable(false);
        setDragging(true);
      },
      onPanResponderMove: Animated.event(
        [
          null,
          {
            dx: position.x,
            dy: position.y,
          },
        ],
        { useNativeDriver: false },
      ),
      onPanResponderRelease: () => {
        if (!boxRef.current) return;
        boxRef.current.measure(async (x, y, width, height) => {
          const destPos = await checkCollision(idx, { left: x + width / 2, top: y + height / 2 });

          // Reset to original pos
          if (!destPos) position.setValue({ x: 0, y: 0 });
          else position.setValue({ x: destPos.x, y: destPos.y - top });
        });

        // set dragging to false
        setDragging(false);
        setScrollEnable(true);
      },
    }),
  ).current;

  return (
    <Animated.View
      ref={boxRef}
      style={[
        styles.card,
        {
          transform: position.getTranslateTransform(),
          position: 'absolute',
          top,
          opacity: dragging ? 0.8 : 1,
        },
        style,
      ]}
      {...panResponder.panHandlers}
    >
      <Text style={styles.heading}>{heading}</Text>
    </Animated.View>
  );
}

export default DragAndDropCard;
