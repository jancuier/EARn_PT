// FriendComponents.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const Friend1 = () => {
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
  const workoutDays = [0]; // Friend1의 운동한 요일 목록 (0: 일요일)
  const challenges = [
    { name: '- 주 5회 이상 운동하기', progress: '1 / 5' },
    { name: '- 3대 400 달성하기', progress: '375 / 400' },
  ]; // Friend1과 진행 중인 챌린지 목록

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.daysOfWeekContainer}>
        {daysOfWeek.map((day, index) => (
          <Text
            key={index}
            style={[styles.dayText, workoutDays.includes(index)]}
          >
            {day}
          </Text>
        ))}
      </View>
      <View style={styles.workoutCircleContainer}>
        {daysOfWeek.map((day, index) => (
          <View
            key={index}
            style={[styles.workoutCircle, workoutDays.includes(index) && styles.workoutCircleActive]}
          />
        ))}
      </View>
      <View style={styles.challengeContainer}>
        <Text style={styles.challengeTitle}>챌린지</Text>
        {challenges.map((challenge, index) => (
          <View key={index} style={styles.challengeItem}>
            <Text style={styles.challengeName}>{challenge.name}</Text>
            <Text style={styles.challengeProgress}>{challenge.progress}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const Friend2 = () => {
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
  const workoutDays = []; // Friend2의 운동한 요일 목록 (없음)
  const challenges = [
    { name: '- 주 3회 이상 운동하기', progress: '0 / 3' },
    { name: '- 아침마다 고관절 스트레칭하기', progress: '3 / 7' },
    { name: '- 삼시 세끼 챙겨 먹기', progress: '1 / 3' },
  ]; // Friend2와 진행 중인 챌린지 목록

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.daysOfWeekContainer}>
        {daysOfWeek.map((day, index) => (
          <Text
            key={index}
            style={[styles.dayText, workoutDays.includes(index)]}
          >
            {day}
          </Text>
        ))}
      </View>
      <View style={styles.workoutCircleContainer}>
        {daysOfWeek.map((day, index) => (
          <View
            key={index}
            style={[styles.workoutCircle, workoutDays.includes(index) && styles.workoutCircleActive]}
          />
        ))}
      </View>
      <View style={styles.challengeContainer}>
        <Text style={styles.challengeTitle}>챌린지</Text>
        {challenges.map((challenge, index) => (
          <View key={index} style={styles.challengeItem}>
            <Text style={styles.challengeName}>{challenge.name}</Text>
            <Text style={styles.challengeProgress}>{challenge.progress}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const Friend3 = () => {
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
  const workoutDays = [0, 1]; // Friend3의 운동한 요일 목록 (0: 일요일, 1: 월요일)
  const challenges = [{ name: '- 까불지 않기', progress: '100 / 100' }]; // Friend3와 진행 중인 챌린지 목록

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.daysOfWeekContainer}>
        {daysOfWeek.map((day, index) => (
          <Text
            key={index}
            style={[styles.dayText, workoutDays.includes(index)]}
          >
            {day}
          </Text>
        ))}
      </View>
      <View style={styles.workoutCircleContainer}>
        {daysOfWeek.map((day, index) => (
          <View
            key={index}
            style={[styles.workoutCircle, workoutDays.includes(index) && styles.workoutCircleActive]}
          />
        ))}
      </View>
      <View style={styles.challengeContainer}>
        <Text style={styles.challengeTitle}>챌린지</Text>
        {challenges.map((challenge, index) => (
          <View key={index} style={styles.challengeItem}>
            <Text style={styles.challengeName}>{challenge.name}</Text>
            <Text style={styles.challengeProgress}>{challenge.progress}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    marginTop: 20,
    paddingBottom: 20,
  },
  daysOfWeekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  dayText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333333',
    marginHorizontal: 12,
    marginVertical: 10,
  },
  workoutCircleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  workoutCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginHorizontal: 10.5,
    backgroundColor: 'rgba(255, 0, 0, 0.3)', // 반투명한 원 배경색
  },
  workoutCircleActive: {
    backgroundColor: '#FF0000', // 운동한 요일 원 배경색 (불투명한 빨간색)
  },
  challengeContainer: {
    backgroundColor: '#F4F4F4',
    width: '90%',
    borderRadius: 10,
    padding: 20,
    marginTop: 50,
  },
  challengeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 25,
  },
  challengeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  challengeName: {
    fontSize: 19,
  },
  challengeProgress: {
    fontSize: 17,
  },
});

export { Friend1, Friend2, Friend3 };
