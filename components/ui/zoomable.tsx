import React from "react";
import { Dimensions, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

export default function ZoomableImage({ uri }: { uri: string }) {
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const panX = useSharedValue(0);
  const panY = useSharedValue(0);
  const savedPanX = useSharedValue(0);
  const savedPanY = useSharedValue(0);

  const MIN_SCALE = 0.5;
  const MAX_SCALE = 4;

  // Reset function
  const reset = () => {
    scale.value = withSpring(1);
    savedScale.value = 1;
    panX.value = withSpring(0);
    panY.value = withSpring(0);
    savedPanX.value = 0;
    savedPanY.value = 0;
  };

  const pinch = Gesture.Pinch()
    .onUpdate((e) => {
      const newScale = savedScale.value * e.scale;
      scale.value = Math.max(MIN_SCALE, Math.min(MAX_SCALE, newScale));
    })
    .onEnd(() => {
      savedScale.value = scale.value;
      
      // Reset if zoomed out too much
      if (scale.value < 1) {
        runOnJS(reset)();
      }
    });

  const pan = Gesture.Pan()
    .onStart(() => {
      savedPanX.value = panX.value;
      savedPanY.value = panY.value;
    })
    .onUpdate((e) => {
      // Only allow panning if zoomed in
      if (scale.value > 1) {
        panX.value = savedPanX.value + e.translationX;
        panY.value = savedPanY.value + e.translationY;
      }
    })
    .onEnd(() => {
      savedPanX.value = panX.value;
      savedPanY.value = panY.value;
    });

  // Double tap to reset
  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      runOnJS(reset)();
    });

  const gesture = Gesture.Simultaneous(
    Gesture.Race(doubleTap, pinch),
    pan
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateX: panX.value },
      { translateY: panY.value },
    ],
  }));

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <GestureDetector gesture={gesture}>
        <Animated.Image
          source={{ uri }}
          resizeMode="contain"
          style={[
            {
              width: width * 0.95,
              height: height * 0.8,
            },
            animatedStyle,
          ]}
        />
      </GestureDetector>
    </View>
  );
}