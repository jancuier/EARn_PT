// CalendarScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CalendarScreen = () => {
  const navigation = useNavigation();

  const handleTabPress = (tabName) => {
    navigation.navigate(tabName);
  };

  // 현재 월, 연도 정보를 가져오는 함수
  const getCurrentMonthYear = () => {
    const date = new Date();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    return `${month} ${year}`;
  };

  // 해당 월의 달력 배열을 생성하는 함수
  const generateCalendarArray = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const startDay = firstDay.getDay(); // 해당 월의 첫 번째 날의 요일 인덱스
    const endDay = lastDay.getDate(); // 해당 월의 마지막 날짜

    const calendarArray = [];

    // 첫 번째 날짜 이전의 빈 칸 채우기
    for (let i = 0; i < startDay; i++) {
      calendarArray.push('');
    }

    // 해당 월의 날짜 정보 채우기
    for (let i = 1; i <= endDay; i++) {
      calendarArray.push(i);
    }

    // 마지막 날짜 이후의 빈 칸 채우기
    const remainingDays = 7 - (calendarArray.length % 7);
    for (let i = 0; i < remainingDays; i++) {
      calendarArray.push('');
    }

    return calendarArray;
  };

  // 오늘 날짜에 해당하는 스타일을 반환하는 함수
  const getTodayStyle = (date) => {
    const today = new Date();
    if (date === today.getDate()) {
      return styles.todayCircle;
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.logoText}>EARn PT</Text>
        <Image style={styles.logo} source={require('./assets/logo.png')} />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.monthYearContainer}>
          <Text style={styles.monthYearText}>{getCurrentMonthYear()}</Text>
        </View>
        <View style={styles.calendarContainer}>
          <View style={styles.weekdaysContainer}>
            <Text style={styles.weekdayText}>일</Text>
            <Text style={styles.weekdayText}>월</Text>
            <Text style={styles.weekdayText}>화</Text>
            <Text style={styles.weekdayText}>수</Text>
            <Text style={styles.weekdayText}>목</Text>
            <Text style={styles.weekdayText}>금</Text>
            <Text style={styles.weekdayText}>토</Text>
          </View>
          {generateCalendarArray().map((date, index) => {
            return (
              <TouchableOpacity key={index} style={[styles.dateCircle, getTodayStyle(date)]}>
                <Text style={styles.dateText}>{date}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <TouchableOpacity onPress={() => handleTabPress('PT')}>
          <View style={styles.todayButton}>
            <Text style={styles.todayButtonText}>" TODAY "</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.routineContainer}>
          <TouchableOpacity onPress={() => handleTabPress('Routine1')}>
            <View style={styles.routineBox}>
              <Text style={styles.routineTitle}>어깨</Text>
              <Text style={styles.routineSubtitle}>1일 전</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleTabPress('Routine2')}>
            <View style={styles.routineBox}>
              <Text style={styles.routineTitle}>등</Text>
              <Text style={styles.routineSubtitle}>2일 전</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleTabPress('Routine3')}>
            <View style={styles.routineBox}>
              <Text style={styles.routineTitle}>가슴</Text>
              <Text style={styles.routineSubtitle}>4일 전</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  monthYearContainer: {
    alignItems: 'center',
  },
  monthYearText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  calendarContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  weekdaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  weekdayText: {
    fontWeight: 'bold',
    fontSize: 16,
    width: '14.2%',
    textAlign: 'center',
  },
  dateCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  todayCircle: {
    backgroundColor: 'red',
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  todayButton: {
    backgroundColor: '#C30C00',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 50,
    marginTop: 20,
    marginBottom: 30,
    borderRadius: 10,
  },
  todayButtonText: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: 'bold',
  },
  routineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  routineBox: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: '#FF0000',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  routineTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  routineSubtitle: {
    fontSize: 12,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 5,
    borderTopWidth: 1,
    borderTopColor: '#DDDDDD',
    paddingTop: 25,
  },
});

export default CalendarScreen;
