//StartScreen.js
import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function StartScreen() {
  const navigation = useNavigation();

  const handleSwipe = () => {
    navigation.navigate('Home');
  };

  return (
    <TouchableOpacity style={styles.swipeContainer} onPress={handleSwipe}>
      <Image source={require('./assets/Mainlogo.png')} style={styles.logo} />
      <Text style={styles.swipeText}>Swipe to continue</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  swipeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  swipeText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
});
