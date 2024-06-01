import React, {useState} from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {FontFamilyUtil} from '../utils/FontFamiltUtil';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {setLoggedIn} from '../redux/LoginSlice';
import Entypo from 'react-native-vector-icons/Entypo';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [visibleModal, setVisibleModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [secureText, setSecureText] = useState(true);

  const toggleSecureTextEntry = () => {
    setSecureText(!secureText);
  };

  const dispatch = useDispatch();

  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const userLogin = async () => {
    setErrors({});
    setLoading(true);

    let errorMessages = {};

    if (email === '') {
      errorMessages.email = 'Please enter your email id.';
    } else if (!validateEmail(email)) {
      errorMessages.email = 'Please enter the email in correct format.';
    }
    if (password === '') {
      errorMessages.password = 'Please enter your password.';
    }

    setErrors(errorMessages);

    if (Object.keys(errorMessages).length > 0) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        'https://first-mern-app-api.onrender.com/v1/api/auth/user/sign-in',
        {
          email: email,
          password: password,
        },
      );

      if (response.data.status === 200) {
        dispatch(setLoggedIn({login: true}));
        await AsyncStorage.setItem('isLoggedIn', 'true');
        setLoading(false);
        navigation.reset({
          index: 0,
          routes: [{name: 'Homescreen'}],
        });
      } else {
        setLoading(false);
        setWelcomeMessage(response.data.message);
        setVisibleModal(true);
      }
    } catch (error) {
      console.log('error in login request', error);
      setLoading(false);
      setWelcomeMessage('An error occurred. Please try again.');
      setVisibleModal(true);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {loading ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}>
          <ActivityIndicator size={'small'} color={'black'} />
          <Text>loading...</Text>
        </View>
      ) : (
        <LinearGradient
          start={{x: 1, y: 1}}
          end={{x: 1, y: 0}}
          colors={['#8E0E00', '#1F1C18']}
          style={styles.container}>
          <View style={styles.headingContainer}>
            <Text style={styles.headingText}>Hello</Text>
            <Text style={styles.headingText}>Sign In</Text>
          </View>
          <View style={styles.formContainer}>
            <Text style={styles.formText}>Enter Your Email Id</Text>
            <TextInput
              placeholder="Email"
              style={{borderBottomWidth: 0.5, borderColor: '#ccc'}}
              value={email}
              onChangeText={text => setEmail(text)}
              keyboardType="email-address"
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
            <Text style={[styles.formText, {marginTop: 20}]}>Password</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomWidth: 0.5,
                borderColor: '#ccc',
              }}>
              <TextInput
                placeholder="Password"
                style={{flex: 1}}
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry={secureText}
              />
              <Entypo
                name={secureText ? 'eye-with-line' : 'eye'}
                size={22}
                color={'black'}
                style={{alignSelf: 'center'}}
                onPress={toggleSecureTextEntry}
              />
            </View>
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
            <LinearGradient
              start={{x: 0.1, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#8E0E00', '#1F1C18']}
              style={styles.buttonContainer}>
              <Pressable onPress={userLogin}>
                <Text style={styles.buttonText}>SIGN IN</Text>
              </Pressable>
            </LinearGradient>
            <View
              style={{
                marginTop: 5,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={styles.bottomText}>
                Don't have an account?{' '}
                <Text
                  style={{color: '#8E0E00', fontSize: 16}}
                  onPress={() => {
                    navigation.navigate('SignIn');
                  }}>
                  SignUp
                </Text>
              </Text>
            </View>
          </View>
        </LinearGradient>
      )}
      {/* Modal for displaying error messages */}
      <Modal
        transparent={true}
        visible={visibleModal}
        onRequestClose={() => setVisibleModal(false)}>
        <TouchableHighlight
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => setVisibleModal(false)}>
          <View style={styles.modalView}>
            <Text style={styles.welcomeMessageText}>Authentication App</Text>
            <Text
              style={[
                styles.welcomeMessageText,
                {fontSize: 14, marginBottom: 20},
              ]}>
              {welcomeMessage}
            </Text>
            <LinearGradient
              start={{x: 0.1, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#8E0E00', '#1F1C18']}
              style={[styles.buttonContainer, {marginBottom: 20}]}>
              <Pressable onPress={() => setVisibleModal(false)}>
                <Text style={styles.welcomeOkayText}>Ok</Text>
              </Pressable>
            </LinearGradient>
          </View>
        </TouchableHighlight>
      </Modal>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
  },
  formContainer: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginTop: '20%',
    paddingVertical: 40,
    borderRadius: 15,
  },
  headingContainer: {
    // flex: 1,
    marginTop: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    // backgroundColor: 'blue',
    marginBottom: 20,
  },
  formText: {
    color: '#8E0E00',
    fontFamily: FontFamilyUtil.w600.fontFamily,
    fontWeight: FontFamilyUtil.w600.fontWeight,
    fontSize: 16,
    marginVertical: 5,
  },
  buttonContainer: {
    backgroundColor: '#8E0E00',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 15,
  },
  buttonText: {
    fontFamily: FontFamilyUtil.w700.fontFamily,
    fontWeight: FontFamilyUtil.w700.fontWeight,
    fontSize: 16,
    color: '#ffffff',
    marginHorizontal: 40,
    marginVertical: 10,
  },
  headingText: {
    fontFamily: FontFamilyUtil.w900.fontFamily,
    fontWeight: FontFamilyUtil.w900.fontWeight,
    color: 'white',
    fontSize: 22,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: -5,
    marginBottom: 10,
    fontFamily: FontFamilyUtil.w300.fontFamily,
    fontWeight: FontFamilyUtil.w300.fontWeight,
  },
  modalView: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    width: '90%',
  },
  welcomeMessageText: {
    fontFamily: FontFamilyUtil.w900.fontFamily,
    fontWeight: FontFamilyUtil.w900.fontWeight,
    color: 'black',
    fontSize: 18,
    marginTop: 20,
    marginHorizontal: 20,
  },
  welcomeOkayText: {
    fontFamily: FontFamilyUtil.w900.fontFamily,
    fontWeight: FontFamilyUtil.w900.fontWeight,
    color: '#ffffff',
    marginVertical: 5,
    marginHorizontal: 20,
  },
  bottomText: {
    color: 'black',
    fontFamily: FontFamilyUtil.w500.fontFamily,
    fontWeight: FontFamilyUtil.w500.fontWeight,
    fontSize: 12,
  },
});
