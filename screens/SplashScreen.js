import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {FontFamilyUtil} from '../utils/FontFamiltUtil';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation}) => {
  const isLoggedIN = useSelector(state => state.auth.isLoggedIN);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
        console.log('==userLogginStatus==', isLoggedIn);
        if (isLoggedIn === 'true') {
          navigation.navigate('Homescreen');
        } else {
          navigation.navigate('Login');
        }
      } catch (error) {
        console.error('Failed to fetch login status', error);
      }
    };
    const timer = setTimeout(checkLoginStatus, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/butterfly.jpg')}
        style={{resizeMode: 'center', flex: 1}}
      />
      <Text style={styles.text}>Authentication</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontFamily: FontFamilyUtil.w900.fontFamily,
    fontWeight: FontFamilyUtil.w900.fontWeight,
    color: 'black',
    position: 'absolute',
    bottom: '20%',
    fontSize: 22,
  },
});
