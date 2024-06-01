import {ImageBackground, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {FontFamilyUtil} from '../utils/FontFamiltUtil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {alignContent} from '../utils/CommonUtils';
import LinearGradient from 'react-native-linear-gradient';
import {CommonActions} from '@react-navigation/native';

const Homescreen = ({navigation}) => {
  const [name, setName] = useState('');

  useEffect(() => {
    getName();
  }, []);

  const getName = async () => {
    try {
      const storedName = await AsyncStorage.getItem('name');
      if (storedName !== null) {
        setName(storedName);
        console.log(storedName);
      }
    } catch (error) {
      console.error('Failed to fetch the name from storage', error);
    }
  };

  const handleLogout = () => {
    AsyncStorage.clear();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Splash'}],
      }),
    );
  };

  return (
    <ImageBackground
      source={require('../assets/images/bg.png')}
      blurRadius={10}
      style={{
        flex: 1,
      }}>
      <View
        style={[
          alignContent,
          {
            justifyContent: 'space-between',
            marginVertical: 30,
            marginHorizontal: 20,
          },
        ]}>
        <View style={{flex: 1}}>
          <Text style={styles.welcomeText}>Welcome,</Text>
          <Text style={styles.welcomeText}>{name}</Text>
        </View>
        <LinearGradient
          start={{x: 0.1, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#8E0E00', '#1F1C18']}
          style={{
            borderRadius: 20,
            paddingHorizontal: 20,
          }}>
          <Pressable
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
            }}
            onPress={handleLogout}>
            <Text style={styles.logoutText}>LOGOUT</Text>
          </Pressable>
        </LinearGradient>
      </View>
      <View></View>
    </ImageBackground>
  );
};

export default Homescreen;

const styles = StyleSheet.create({
  welcomeText: {
    fontWeight: FontFamilyUtil.w700.fontWeight,
    fontFamily: FontFamilyUtil.w700.fontFamily,
    color: '#ccc',
    fontSize: 20,
  },
  logoutText: {
    fontWeight: FontFamilyUtil.w700.fontWeight,
    fontFamily: FontFamilyUtil.w700.fontFamily,
    color: '#ccc',
    fontSize: 14,
  },
});
