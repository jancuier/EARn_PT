//App.js
import React, { useState, useRef } from 'react';
import { StyleSheet, View, Image, Animated, Dimensions, TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './HomeScreen';
import StartScreen from './StartScreen';
import CalendarScreen from './CalendarScreen';
import MapScreen from './MapScreen';
import FriendsScreen from './FriendsScreen';
import PTScreen from './PTScreen';
//import PTAudioScreen from './PTAudioScreen';

const Stack = createStackNavigator();
const { width } = Dimensions.get('window');
const TAB_WIDTH = width / 5;

export default function App() {
  const [showHomeScreen, setShowHomeScreen] = useState(false);
  const swipeX = React.useRef(new Animated.Value(0)).current;

  const handleSwipe = () => {
    Animated.timing(swipeX, {
      toValue: -width,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      console.log('화면을 우측으로 쓸어넘겼습니다.');
      setShowHomeScreen(true);
    });
  };

  const handleTabPress = (tabName) => {
    console.log(`${tabName} 탭을 선택했습니다.`);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen
          name="Home"
          options={{ gestureEnabled: false }}
          initialParams={{ handleTabPress, showTabs: showHomeScreen }}
        >
          {(props) => <HomeScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Calendar" component={CalendarScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Friends" component={FriendsScreen} />
        <Stack.Screen name="PT" component={PTScreen} />
        {/* <Stack.Screen name="PTAudio" component={PTAudioScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
