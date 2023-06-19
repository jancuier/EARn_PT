// FriendsScreen.js
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Friend1, Friend2, Friend3 } from './FriendComponents';

const FriendsScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState(0);

  const handleTabPress = (index) => {
    setActiveTab(index);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <Friend1 />;
      case 1:
        return <Friend2 />;
      case 2:
        return <Friend3 />;
      default:
        return null;
    }
  };

  const handleGoodButtonPress = () => {
    Alert.alert('Well Done Buddy!', '알림을 보냈습니다.');
  };

  const handlePokeButtonPress = () => {
    Alert.alert('What\'s Wrong?', '알림을 보냈습니다.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.logoText}>EARn PT</Text>
        <Image style={styles.logo} source={require('./assets/logo.png')} />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.friendsTabContainer}>
          <TouchableOpacity
            style={[styles.friendTab, activeTab === 0 && styles.activeTab]}
            onPress={() => handleTabPress(0)}
          >
            <View style={[styles.friendCircle, activeTab === 0 && styles.activeFriendCircle]}>
              <Image style={styles.friendProfile} source={require('./assets/friend1.jpg')} />
            </View>
            <Text style={[styles.tabText, activeTab === 0 && styles.activeTabText]}>김규혁</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.friendTab, activeTab === 1 && styles.activeTab]}
            onPress={() => handleTabPress(1)}
          >
            <View style={[styles.friendCircle, activeTab === 1 && styles.activeFriendCircle]}>
              <Image style={styles.friendProfile} source={require('./assets/friend2.jpg')} />
            </View>
            <Text style={[styles.tabText, activeTab === 1 && styles.activeTabText]}>오선용</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.friendTab, activeTab === 2 && styles.activeTab]}
            onPress={() => handleTabPress(2)}
          >
            <View style={[styles.friendCircle, activeTab === 2 && styles.activeFriendCircle]}>
              <Image style={styles.friendProfile} source={require('./assets/friend3.jpg')} />
            </View>
            <Text style={[styles.tabText, activeTab === 2 && styles.activeTabText]}>이병건</Text>
          </TouchableOpacity>
        </View>
        {renderTabContent()}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.goodButton} onPress={handleGoodButtonPress}>
            <Text style={styles.buttonText}>GOOD</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.pokeButton} onPress={handlePokeButtonPress}>
            <Text style={styles.buttonText}>POKE</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.footerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text>홈</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Calendar')}>
          <Text>캘린더</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('PT')}>
          <Text>P.T</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Map')}>
          <Text>지도</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Friends')}>
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
  },
  friendsTabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
  },
  friendTab: {
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 0,
    borderBottomColor: '#FF0000',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 10,
  },
  activeTabText: {
    color: '#FF0000',
  },
  tabContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
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
  friendProfile: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  activeFriendCircle: {
    borderColor: '#FF0000',
    backgroundColor: '#FED7D7',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 5,
    borderTopWidth: 1,
    borderTopColor: '#DDDDDD',
    paddingTop: 25,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
    marginTop: 'auto',
  },
  goodButton: {
    backgroundColor: '#C30C00',
    borderRadius: 8,
    width: '48%',
    height: 60, // 버튼의 높이를 60으로 고정
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pokeButton: {
    backgroundColor: '#C30C00',
    borderRadius: 8,
    width: '48%',
    height: 60, // 버튼의 높이를 60으로 고정
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#000000',
    fontSize: 28,
    fontWeight: 'bold',
  },
});

export default FriendsScreen;
