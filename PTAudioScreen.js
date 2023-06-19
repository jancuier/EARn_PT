// PTAudioScreen.js
import React, { useEffect, useState } from 'react';
import { Gyroscope, Accelerometer } from 'expo-sensors';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Audio } from 'expo-av';

const DEFAULT_GOAL_COUNT = 10;

const PTAudioScreen = () => {
  const [goalCount, setGoalCount] = useState(DEFAULT_GOAL_COUNT);
  const [currentCount, setCurrentCount] = useState(0);
  const [sound, setSound] = useState(null);
  const [isSoundPlayed, setIsSoundPlayed] = useState(false);

  useEffect(() => {
    let lastAccY = 0;
    let squatStarted = false;

    const gyroscopeSubscription = Gyroscope.addListener(({ x, y, z }) => {});

    const accelerometerSubscription = Accelerometer.addListener(({ x, y, z }) => {
      if (!squatStarted && y - lastAccY > 0.3) {
        squatStarted = true;
      }

      if (squatStarted && y - lastAccY < -0.3) {
        squatStarted = false;
        setCurrentCount((count) => {
          const newCount = count + 1;

          if (newCount === Math.ceil(goalCount * 0.8) && !isSoundPlayed) {
            playSound();
            setIsSoundPlayed(true);
          }

          return newCount;
        });
      }

      lastAccY = y;
    });

    return () => {
      gyroscopeSubscription.remove();
      accelerometerSubscription.remove();
      stopSound();
    };
  }, [goalCount, isSoundPlayed]);

  const playSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(require('./assets/file.mp3'));
      setSound(sound);
      await sound.playAsync();
    } catch (error) {
      console.log('Error playing sound:', error);
    }
  };

  const stopSound = async () => {
    if (sound !== null) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
    }
  };

  const handleGoalCountChange = (text) => {
    const parsedCount = parseInt(text);
    if (isNaN(parsedCount) || parsedCount <= 0) {
      setGoalCount(DEFAULT_GOAL_COUNT);
    } else {
      setGoalCount(parsedCount);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EARn PT</Text>
      <View style={styles.boxContainer}>
        <View style={styles.box}>
          <Text style={styles.boxLabel}>목표 개수</Text>
          <TextInput
            style={styles.boxInput}
            value={goalCount.toString()}
            onChangeText={handleGoalCountChange}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.box}>
          <Text style={styles.boxLabel}>현재 개수</Text>
          <Text style={styles.boxCount}>{currentCount}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  boxContainer: {
    width: '90%',
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  boxLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  boxInput: {
    width: '50%',
    height: 30,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  boxCount: {
    fontSize: 16,
  },
});

export default PTAudioScreen;
