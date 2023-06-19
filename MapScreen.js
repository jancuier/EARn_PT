import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const MapScreen = () => {
  const navigation = useNavigation();
  const [currentLocation, setCurrentLocation] = useState(null);
  const [gyms, setGyms] = useState([]);

  useEffect(() => {
    const fetchCurrentLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('위치 권한을 허용해야 이 기능을 사용할 수 있습니다.');
          return;
        }

        const location = await Location.getCurrentPositionAsync();
        setCurrentLocation(location.coords);
      } catch (error) {
        console.log('위치 정보를 가져오는 데 실패했습니다.', error);
      }
    };

    fetchCurrentLocation();
  }, []);

  useEffect(() => {
    if (currentLocation) {
      const fetchNearbyGyms = async () => {
        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${currentLocation.latitude},${currentLocation.longitude}&radius=1000&type=gym&key=AIzaSyAlvPvnyaPrvIp3JyM7_vzY5qVVxMex6Z8`
          );
          const data = await response.json();
          setGyms(data.results);
        } catch (error) {
          console.log('주변 헬스장 검색에 실패했습니다.', error);
        }
      };

      fetchNearbyGyms();
    }
  }, [currentLocation]);

  const handleTabPress = (tabName) => {
    navigation.navigate(tabName);
  };

  // 두 지점 간의 거리를 계산하는 함수
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // 지구의 반경 (단위: km)
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  // 각도를 라디안으로 변환하는 함수
  const toRad = (value) => {
    return (value * Math.PI) / 180;
  };

  // 헬스장 목록을 현재 위치로부터 가까운 순서로 정렬하는 함수
  const sortGymsByDistance = () => {
    if (currentLocation && gyms.length > 0) {
      const sortedGyms = [...gyms].sort((a, b) => {
        const distanceA = calculateDistance(
          currentLocation.latitude,
          currentLocation.longitude,
          a.geometry.location.lat,
          a.geometry.location.lng
        );
        const distanceB = calculateDistance(
          currentLocation.latitude,
          currentLocation.longitude,
          b.geometry.location.lat,
          b.geometry.location.lng
        );
        return distanceA - distanceB;
      });
      return sortedGyms;
    }
    return gyms;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.logoText}>EARn PT</Text>
          <Image style={styles.logo} source={require('./assets/logo.png')} />
        </View>
        <View style={styles.contentContainer}>
          {currentLocation ? (
            <MapView
              style={styles.map}
              region={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
              }}
            >
              {gyms.map((gym, index) => (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: gym.geometry.location.lat,
                    longitude: gym.geometry.location.lng,
                  }}
                  title={gym.name}
                />
              ))}
            </MapView>
          ) : (
            <Text>위치 정보를 가져오는 중입니다...</Text>
          )}
        </View>
        <View style={styles.listContainer}>
          <ScrollView>
            {sortGymsByDistance().map((gym, index) => (
              <TouchableOpacity key={index} style={styles.gymItem}>
                <Text style={styles.gymName}>{gym.name}</Text>
                <Text style={styles.distance}>
                  {`${calculateDistance(
                    currentLocation.latitude,
                    currentLocation.longitude,
                    gym.geometry.location.lat,
                    gym.geometry.location.lng
                  ).toFixed(2)} km`}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
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
    justifyContent: 'center',
    padding: 20,
  },
  map: {
    width: '100%',
    height: '100%', // 지도 크기를 절반으로 조정
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  gymItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
  },
  gymName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  distance: {
    fontSize: 14,
    color: '#888888',
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

export default MapScreen;
