//HomeScreen.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    flexGrow: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    paddingBottom: 10,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  logo: {
    width: 30,
    height: 30,
    marginTop: 3,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 5,
    borderTopWidth: 1,
    borderTopColor: '#DDDDDD',
    paddingTop: 25,
  },
  workoutContainer: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    padding: 10,
    marginVertical: 20,
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  workoutHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  routineBox: {
    borderWidth: 2,
    borderColor: '#FF0000',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  routineText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  startButton: {
    backgroundColor: '#C30C00',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  friendsContainer: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    padding: 20,
    marginTop: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  friendCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#FF0000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  friendName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  videoContainer: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    padding: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  videoThumbnail: {
    width: 300,
    height: 200,
    borderRadius: 8,
    marginTop: 10,
  },
});

function TodayWorkout({ onButtonPress }) {
  const date = new Date();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const formattedDate = `${month} . ${day} . ${['일', '월', '화', '수', '목', '금', '토'][date.getDay()]}요일`;

  return (
    <View style={styles.workoutContainer}>
      <View style={styles.workoutHeader}>
        <Text style={styles.workoutHeaderText}>Today</Text>
        <View style={styles.routineBox}>
          <Text style={styles.routineText}>하체</Text>
        </View>
        <Text style={styles.dateText}>{formattedDate}</Text>
      </View>
      <TouchableOpacity style={styles.startButton} onPress={onButtonPress}>
        <Text style={styles.startButtonText}>START</Text>
      </TouchableOpacity>
    </View>
  );
}

function HomeScreen({ navigation }) {
  const handleTabPress = (screenName) => {
    navigation.navigate(screenName);
  };

  const handleFriendPress = () => {
    handleTabPress('Friends');
  };

  const handleVideoPress = () => {
    navigation.navigate('VideoScreen', { url: 'https://youtu.be/aae6UOmVeXM' });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.logoText}>EARn PT</Text>
        <Image style={styles.logo} source={require('./assets/logo.png')} />
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.workoutContainer}>
        <TodayWorkout onButtonPress={() => handleTabPress('PT')} />
      </View>
      <View style={styles.friendsContainer}>
        <Text style={styles.workoutHeaderText}>Friends</Text>
        <TouchableOpacity style={styles.friendContainer} onPress={handleFriendPress}>
          <View style={[styles.friendCircle, { backgroundColor: '#FED7D7' }]}>
            <Text style={styles.friendName}>김규혁</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.friendContainer} onPress={handleFriendPress}>
          <View style={[styles.friendCircle, { backgroundColor: '#FED7D7' }]}>
            <Text style={styles.friendName}>오선용</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.friendContainer} onPress={handleFriendPress}>
          <View style={styles.friendCircle}>
            <Text style={styles.friendName}>이병건</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.videoContainer}>
        <Text style={styles.videoTitle}>운동의 정석</Text>
        <TouchableOpacity onPress={handleVideoPress}>
          <Image style={styles.videoThumbnail} source={require('./assets/video_thumbnail.jpg')} />
        </TouchableOpacity>
      </View>
      </ScrollView>
      <View style={styles.footerContainer}>
        <TouchableOpacity onPress={() => handleTabPress('Home')}>
          <Text>홈</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTabPress('Calendar')}>
          <Text>캘린더</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTabPress('PT')}>
          <Text>P.T</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTabPress('Map')}>
          <Text>지도</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTabPress('Friends')}>
          <Text>친구</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function VideoScreen({ navigation, route }) {
  const { url } = route.params;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Video Screen</Text>
      <Text>{url}</Text>
    </View>
  );
}

export default function App() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="VideoScreen" component={VideoScreen} />
    </Stack.Navigator>
  );
}