//PTScreen.js
import React, { useState, useEffect } from 'react';
import {  View,  Text,  TouchableOpacity,  StyleSheet,  Vibration,  ScrollView,  TextInput,  Modal,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import PTAudioScreen from './PTAudioScreen';

const PTScreen = () => {
  const navigation = useNavigation();

  const [timer, setTimer] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [exerciseName, setExerciseName] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [workouts, setWorkouts] = useState([]);
  const [totalVolume, setTotalVolume] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAudioModalVisible, setIsAudioModalVisible] = useState(false);

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    if (timer === 0) {
      clearInterval(intervalId);
      Vibration.vibrate();
      setTimeout(() => {
        setTimer(60);
        setIsRunning(false);
      }, 3000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning, timer]);

  const handleTimerButtonPress = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  const handleExerciseNameSubmit = () => {
    toggleModal();
    const newWorkout = {
      id: Date.now().toString(),
      exerciseName: exerciseName,
      sets: [],
    };
    setWorkouts((prevWorkouts) => [...prevWorkouts, newWorkout]);
    setExerciseName('');
  };

  const handleAddSet = (workoutId) => {
    const newSet = {
      id: Date.now().toString(),
      weight: '',
      reps: '',
      completed: false,
    };

    setWorkouts((prevWorkouts) =>
      prevWorkouts.map((workout) => {
        if (workout.id === workoutId) {
          return { ...workout, sets: [...workout.sets, newSet] };
        }
        return workout;
      })
    );
  };

  const handleDeleteSet = (workoutId, setId) => {
    setWorkouts((prevWorkouts) =>
      prevWorkouts.map((workout) => {
        if (workout.id === workoutId) {
          return {
            ...workout,
            sets: workout.sets.filter((set) => set.id !== setId),
          };
        }
        return workout;
      })
    );
  };

  const handleDeleteWorkout = (workoutId) => {
    setWorkouts((prevWorkouts) => prevWorkouts.filter((workout) => workout.id !== workoutId));
  };

  useEffect(() => {
    const calculateTotalVolume = () => {
      let volume = 0;
      workouts.forEach((workout) => {
        workout.sets.forEach((set) => {
          if (set.weight && set.reps) {
            volume += parseInt(set.weight) * parseInt(set.reps);
          }
        });
      });
      setTotalVolume(volume);
    };

    calculateTotalVolume();
  }, [workouts]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const toggleAudioModal = () => {
    setIsAudioModalVisible(!isAudioModalVisible);
  };

  const handleExerciseNameChange = (text) => {
    setExerciseName(text);
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  const handleAudioButtonPress = () => {
    toggleAudioModal();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Calendar')}>
            <Ionicons name="calendar" size={30} color="black" />
          </TouchableOpacity>
          <Text style={styles.date}>{new Date().toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })}</Text>
        </View>
        <ScrollView style={styles.contentContainer}>
          <View style={styles.volumeContainer}>
            <Text style={styles.volumeLabel}>전체 볼륨</Text>
            <Text style={styles.volumeValue}>{totalVolume} kg</Text>
          </View>
          {workouts.map((workout) => (
            <View key={workout.id} style={styles.workoutContainer}>
              <View style={styles.workoutHeader}>
                <Text style={styles.workoutTitle}>{workout.exerciseName}</Text>
                <TouchableOpacity
                  style={styles.deleteWorkoutButton}
                  onPress={() => handleDeleteWorkout(workout.id)}
                >
                  <Ionicons name="trash" size={24} color="#FF0000" />
                </TouchableOpacity>
              </View>
              {workout.sets.map((set, index) => (
                <View key={set.id} style={styles.setContainer}>
                  <Text style={styles.setLabel}>{index + 1}</Text>
                  <View style={styles.weightInputContainer}>
                    <TextInput
                      style={styles.weightInput}
                      value={set.weight}
                      onChangeText={(text) =>
                        setWorkouts((prevWorkouts) =>
                          prevWorkouts.map((w) => {
                            if (w.id === workout.id) {
                              return {
                                ...w,
                                sets: w.sets.map((s) => {
                                  if (s.id === set.id) {
                                    return { ...s, weight: text };
                                  }
                                  return s;
                                }),
                              };
                            }
                            return w;
                          })
                        )
                      }
                      placeholder="무게"
                    />
                  </View>
                  <View style={styles.repsInputContainer}>
                    <TextInput
                      style={styles.repsInput}
                      value={set.reps}
                      onChangeText={(text) =>
                        setWorkouts((prevWorkouts) =>
                          prevWorkouts.map((w) => {
                            if (w.id === workout.id) {
                              return {
                                ...w,
                                sets: w.sets.map((s) => {
                                  if (s.id === set.id) {
                                    return { ...s, reps: text };
                                  }
                                  return s;
                                }),
                              };
                            }
                            return w;
                          })
                        )
                      }
                      placeholder="횟수"
                    />
                  </View>
                  <TouchableOpacity
                    style={[styles.completeButton, set.completed && styles.completeButtonCompleted]}
                    onPress={() =>
                      setWorkouts((prevWorkouts) =>
                        prevWorkouts.map((w) => {
                          if (w.id === workout.id) {
                            return {
                              ...w,
                              sets: w.sets.map((s) => {
                                if (s.id === set.id) {
                                  return { ...s, completed: !s.completed };
                                }
                                return s;
                              }),
                            };
                          }
                          return w;
                        })
                      )
                    }
                  >
                    <Ionicons name="checkmark-sharp" size={24} color={set.completed ? 'white' : 'black'} />
                  </TouchableOpacity>
                </View>
              ))}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.deleteButton, styles.button]}
                  onPress={() => handleDeleteSet(workout.id, workout.sets[workout.sets.length - 1].id)}
                >
                  <Text style={styles.deleteButtonText}>삭제</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.addSetButton, styles.button]}
                  onPress={() => handleAddSet(workout.id)}
                >
                  <Text style={styles.addSetText}>추가</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
        <View style={styles.addButtonContainer}>
          <TouchableOpacity style={styles.addButton} onPress={toggleModal}>
            <Ionicons name="add" size={30} color="white" />
          </TouchableOpacity>
        </View>
        <Modal visible={isModalVisible} animationType="fade" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TextInput
                style={styles.exerciseNameInput}
                value={exerciseName}
                onChangeText={handleExerciseNameChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                placeholder={isInputFocused ? '' : '운동의 이름'}
                placeholderTextColor="#AAAAAA"
              />
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity style={styles.modalButton} onPress={handleExerciseNameSubmit}>
                  <Text style={styles.modalButtonText}>확인</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={toggleModal}>
                  <Text style={styles.modalButtonText}>취소</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Modal visible={isAudioModalVisible} animationType="fade" transparent={true}>
          <View style={styles.modalAudioContainer}>
            <View style={styles.modalAudioContent}>
              <PTAudioScreen />
              <TouchableOpacity style={styles.modalButton} onPress={toggleAudioModal}>
                <Text style={styles.modalButtonText}>닫기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View style={styles.footerContainer}>
          <TouchableOpacity style={styles.timerButton} onPress={handleTimerButtonPress}>
            {isRunning ? (
              <Ionicons name="pause" size={40} color="black" />
            ) : (
              <Ionicons name="play" size={40} color="black" />
            )}
          </TouchableOpacity>
          <View style={styles.timerBox}>
            <Text style={styles.timerText}>{formatTime(timer)}</Text>
          </View>
          <TouchableOpacity style={styles.audioButton} onPress={handleAudioButtonPress}>
            <Ionicons name="headset" size={40} color="black" />
          </TouchableOpacity>
        </View>
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
  date: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  volumeContainer: {
    flexDirection: 'row',
    width: '92%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  volumeLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  volumeValue: {
    fontSize: 16,
  },
  workoutContainer: {
    backgroundColor: '#F4F4F4',
    width: '92%',
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  workoutTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 8,
  },
  deleteWorkoutButton: {
    alignSelf: 'flex-start',
    marginTop: 3,
  },
  setContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  setLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  weightInputContainer: {
    backgroundColor: '#F4F4F4',
    borderRadius: 8,
    padding: 5,
  },
  weightInput: {
    width: 60,
    height: 30,
  },
  repsInputContainer: {
    backgroundColor: '#F4F4F4',
    borderRadius: 8,
    padding: 5,
  },
  repsInput: {
    width: 60,
    height: 30,
  },
  completeButton: {
    backgroundColor: '#DDDDDD',
    borderRadius: 8,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completeButtonCompleted: {
    backgroundColor: '#FF0000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButton: {
    backgroundColor: '#FF0000',
    borderRadius: 8,
    paddingHorizontal: 40,
    paddingVertical: 8,
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  addSetButton: {
    backgroundColor: '#FF0000',
    borderRadius: 8,
    paddingHorizontal: 40,
    paddingVertical: 8,
    alignSelf: 'flex-end',
  },
  addSetText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  addButtonContainer: {
    marginLeft: 15,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#C30C00',
    borderRadius: 50,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    padding: 5,
    borderTopWidth: 1,
    borderTopColor: '#DDDDDD',
    paddingTop: 10,
  },
  timerButton: {
    width: 70,
    height: 70,
    backgroundColor: '#C30C00',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerBox: {
    width: 150,
    height: 70,
    backgroundColor: '#C30C00',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
  },
  audioButton: {
    width: 70,
    height: 70,
    backgroundColor: '#C30C00',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    paddingVertical: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 8,
    width: '80%',
  },
  modalAudioContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalAudioContent: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    height: 300, // 원하는 높이 값으로 수정해주세요.
  },  
  exerciseNameInput: {
    height: 40,
    borderColor: '#DDDDDD',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  modalButton: {
    backgroundColor: '#C30C00',
    borderRadius: 8,
    width: 60,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PTScreen;