import { useAppActions } from '@/store/actions';
import * as React from 'react';
import { DimensionValue, Pressable, StyleSheet, Text, View, Animated, Easing, Image } from 'react-native';

interface WPSuccessProps {
  visible: boolean | undefined;
  duration?: number | undefined;
  position?: DimensionValue | undefined;
  description: string | undefined;
}

const WPSuccess: React.FC<WPSuccessProps> = ({
  visible,
  duration = 5000,
  position = '6%',
  description,
}) => {
  const { setGlobalSuccess, setGlobalError } = useAppActions();
  //const slideAnim = React.useRef(new Animated.Value(500)).current; // Start off-screen (500px to the right)
  const slideAnimation = React.useRef(new Animated.Value(-100)).current; // Start off-screen (above)

  React.useEffect(() => {
    if (visible) {
      // Slide in from right to left
      Animated.timing(slideAnimation, {
        toValue: 0, // Final position
        duration: 200, // Slide duration
        easing: Easing.out(Easing.ease),
        useNativeDriver: true, // Use native driver for better performance
      }).start();

      // Auto-hide after the duration
      const timeoutId = setTimeout(() => {
        setGlobalSuccess(null);
      }, duration);

      return () => clearTimeout(timeoutId);
    } else {
      // Slide out (backward) when hidden
      Animated.timing(slideAnimation, {
        toValue: -150, // Slide back up off-screen
        duration: 200, // Same duration as the slide-in, adjust if needed
        easing: Easing.in(Easing.ease), // Easing to make the transition smooth
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  if (!visible && slideAnimation._value === -100) return null;
  return (
    //<Animated.View style={[errorStyles.container, { top: position, transform: [{ translateX: slideAnim }] }]}>
    <Animated.View
      style={[
        errorStyles.container,
        { top: position, transform: [{ translateY: slideAnimation }] },
      ]}>
      <View style={errorStyles.error}>
        <View style={errorStyles.errorLeft}>
          <Image
            style={errorStyles.image}
            // contentFit='cover'
            source={require('@/assets/images/school1.png')}
          />
        </View>
        <View style={errorStyles.errorCenter}>
          <Text style={errorStyles.errorMessage}>
            {description?.length > 94
              ? `${description?.slice(0, 94)}...`
              : description || 'Successful'}
          </Text>
        </View>
        <View style={errorStyles.errorRight}>
          <Pressable onPress={() => setGlobalError(null)}>
            {/* <Image
              source={require('@/assets/images/iconoir_cancel.png')}
              style={{ width: 20, height: 20 }}
              contentFit='contain'
            /> */}
          </Pressable>
        </View>
      </View>
    </Animated.View>
  );
};

const errorStyles = StyleSheet.create({
  container: {
    zIndex: 1,
    left: 0,
    top: '6%',
    width: '100%',
    position: 'absolute',
    backgroundColor: 'transparent',
    paddingVertical: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    width: '90%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    height: 50,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 0,
    paddingRight: 0,
    backgroundColor: '#3ab34b',
  },
  errorLeft: {
    width: '12.5%',
    borderRightWidth: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRightColor: 'black',
  },
  errorCenter: {
    width: '75%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 0,
  },
  errorRight: {
    width: '12.5%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 0,
  },
  errorMessage: {
    color: 'white', // changed from black to white
  },
  image: {
    width: 35,
    height: 35,
    borderRadius: 50,
  },
  image2: {
    width: 20,
    height: 20,
  },
});

export default WPSuccess;
