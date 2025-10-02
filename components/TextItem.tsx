import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, runOnJS } from 'react-native-reanimated';

interface TextItemProps {
  textOverlay: {
    id: string;
    text: string;
    x: number;
    y: number;
    fontSize: number;
    color: string;
    fontFamily: string;
    alignment: 'left' | 'center' | 'right';
    timestamp: number;
    isSelected?: boolean;
  };
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
  onResize: (id: string, fontSize: number) => void;
  onPositionUpdate: (id: string, x: number, y: number) => void;
  screenWidth: number;
  styles: any;
}

const TextItem: React.FC<TextItemProps> = ({
  textOverlay,
  onSelect,
  onRemove,
  onResize,
  onPositionUpdate,
  screenWidth,
  styles
}) => {
  const translateX = useSharedValue(textOverlay.x);
  const translateY = useSharedValue(textOverlay.y);
  const scale = useSharedValue(1);
  const pinchScale = useSharedValue(1);

  const updateTextPosition = (x: number, y: number) => {
    const boundedX = Math.max(0, Math.min(screenWidth - 100, x));
    const boundedY = Math.max(0, Math.min(400, y));
    onPositionUpdate(textOverlay.id, boundedX, boundedY);
  };

  const updateTextSize = (newScale: number) => {
    const currentSize = textOverlay.fontSize;
    const newSize = Math.max(12, Math.min(72, currentSize * newScale));
    onResize(textOverlay.id, newSize);
  };

  const panGesture = Gesture.Pan()
    .onStart(() => {
      scale.value = withSpring(1.1);
      runOnJS(onSelect)(textOverlay.id);
    })
    .onUpdate((event) => {
      translateX.value = textOverlay.x + event.translationX;
      translateY.value = textOverlay.y + event.translationY;
    })
    .onEnd(() => {
      scale.value = withSpring(1);
      runOnJS(updateTextPosition)(translateX.value, translateY.value);
      translateX.value = withSpring(translateX.value);
      translateY.value = withSpring(translateY.value);
    });

  const pinchGesture = Gesture.Pinch()
    .onStart(() => {
      runOnJS(onSelect)(textOverlay.id);
    })
    .onUpdate((event) => {
      pinchScale.value = event.scale;
    })
    .onEnd((event) => {
      runOnJS(updateTextSize)(event.scale);
      pinchScale.value = withSpring(1);
    });

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      const newSize = textOverlay.fontSize >= 48 ? 18 : textOverlay.fontSize + 6;
      runOnJS(onResize)(textOverlay.id, newSize);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value * pinchScale.value },
    ],
  }));

  const composedGesture = Gesture.Simultaneous(panGesture, pinchGesture, doubleTap);

  return (
    <GestureDetector gesture={composedGesture}>
      <Animated.View
        style={[
          styles.textOverlay,
          {
            borderWidth: textOverlay.isSelected ? 2 : 0,
            borderColor: textOverlay.isSelected ? '#259B9A' : 'transparent',
            borderRadius: textOverlay.isSelected ? 8 : 0,
            padding: textOverlay.isSelected ? 8 : 0,
          },
          animatedStyle
        ]}
      >
        <TouchableOpacity
          onLongPress={() => onRemove(textOverlay.id)}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.overlayText,
              {
                fontSize: textOverlay.fontSize,
                color: textOverlay.color,
                fontFamily: textOverlay.fontFamily,
                textAlign: textOverlay.alignment,
              }
            ]}
          >
            {textOverlay.text}
          </Text>
        </TouchableOpacity>
        
        {/* Cross Icon for Easy Removal */}
        {textOverlay.isSelected && (
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: -10,
              right: -10,
              width: 24,
              height: 24,
              backgroundColor: '#FF4444',
              borderRadius: 12,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 2,
              borderColor: '#FFFFFF',
            }}
            onPress={() => onRemove(textOverlay.id)}
            activeOpacity={0.8}
          >
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 14,
                fontWeight: 'bold',
                lineHeight: 14,
              }}
            >
              ×
            </Text>
          </TouchableOpacity>
        )}
      </Animated.View>
    </GestureDetector>
  );
};

export default TextItem;