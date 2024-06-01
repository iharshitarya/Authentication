import React, {useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {FontFamilyUtil} from '../utils/FontFamiltUtil';
import Entypo from 'react-native-vector-icons/Entypo';

const SignIn = ({navigation}) => {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [secureText, setSecureText] = useState(true);

  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const toggleSecureTextEntry = () => {
    setSecureText(!secureText);
  };

  const userSignUp = async () => {
    let errorMessages = {};

    if (name === '') {
      errorMessages.name = 'Please enter your name.';
    }
    if (mobileNumber.length !== 10) {
      errorMessages.mobileNumber = 'Please enter your 10 digit mobile number.';
    }
    if (email === '') {
      errorMessages.email = 'Please enter your email id.';
    } else if (!validateEmail(email)) {
      errorMessages.email = 'Please enter the email in correct format.';
    }
    if (password === '') {
      errorMessages.password = 'Please enter your password.';
    }
    if (confirmPassword === '') {
      errorMessages.confirmPassword = 'Please enter your confirm password.';
    } else if (password !== confirmPassword) {
      errorMessages.confirmPassword =
        'Your password and confirm password are different.';
    }

    setErrors(errorMessages);

    if (Object.keys(errorMessages).length > 0) {
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        'https://first-mern-app-api.onrender.com/v1/api/auth/user/sign-up',
        {
          email: email,
          password: password,
          name: name,
          mobileNumber: mobileNumber,
        },
      );

      // Handle success
      console.log('Response:', response.data);
      if (response.data.status === 200) {
        await AsyncStorage.setItem('name', name);
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('password', password);
        await AsyncStorage.setItem('mobileNumber', mobileNumber);
      }
    } catch (error) {
      // Handle error
      console.error('Error in post req userSignUp', error);
      setErrors({general: 'An error occurred during sign up.'});
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {loading == true ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#ffffff',
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
          <View
            style={[
              styles.headingContainer,
              {alignItems: 'center', justifyContent: 'center'},
            ]}>
            <Text style={styles.headingText}>SignUp</Text>
            <Text style={[styles.headingText, {fontSize: 18,}]}>
              Create your account
            </Text>
          </View>
          <ScrollView contentContainerStyle={styles.formContainer}>
            <View>
              <Text style={styles.formText}>Full Name</Text>
              <TextInput
                placeholder="Enter Your Name"
                style={styles.textInputContainer}
                value={name}
                onChangeText={text => {
                  setName(text);
                  setErrors('');
                }}
              />
              {errors.name && (
                <Text style={styles.errorText}>{errors.name}</Text>
              )}
              <Text style={styles.formText}>Mobile Number</Text>
              <TextInput
                placeholder="Enter Mobile Number"
                style={styles.textInputContainer}
                value={mobileNumber}
                onChangeText={text => {
                  setMobileNumber(text);
                  setErrors('');
                  if (text.length === 10) {
                    Keyboard.dismiss();
                  }
                }}
                keyboardType="number-pad"
              />
              {errors.mobileNumber && (
                <Text style={styles.errorText}>{errors.mobileNumber}</Text>
              )}
              <Text style={styles.formText}>Enter Your Email Id</Text>
              <TextInput
                placeholder="Email"
                style={styles.textInputContainer}
                value={email}
                onChangeText={text => {
                  setEmail(text);
                  setErrors('');
                }}
                keyboardType="email-address"
              />
              {errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
              <Text style={styles.formText}>Password</Text>
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
                  onChangeText={text => {
                    setPassword(text);
                    setErrors('');
                  }}
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
              <Text style={styles.formText}>Confirm Password</Text>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderBottomWidth: 0.5,
                  borderColor: '#ccc',
                }}>
                <TextInput
                  placeholder="Confirm Password"
                  // style={styles.textInputContainer}
                  value={confirmPassword}
                  onChangeText={text => setConfirmPassword(text)}
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
              {errors.confirmPassword && (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              )}
              <LinearGradient
                start={{x: 0.1, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#8E0E00', '#1F1C18']}
                style={styles.buttonContainer}>
                <Pressable onPress={userSignUp}>
                  <Text style={styles.buttonText}>SIGN UP</Text>
                </Pressable>
              </LinearGradient>
              <Text style={styles.haveAnAccountText}>
                Already have an account?{' '}
                <Text
                  onPress={() => {
                    navigation.navigate('Login');
                  }}
                  style={{fontWeight: '700'}}>
                  Sign In
                </Text>
              </Text>
              {errors.general && (
                <Text style={styles.errorText}>{errors.general}</Text>
              )}
            </View>
          </ScrollView>
        </LinearGradient>
      )}
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    // flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    paddingVertical: 40,
    marginHorizontal: 20,
    borderRadius: 15,
  },
  textInputContainer: {
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
    marginBottom: 5,
  },
  headingContainer: {
    justifyContent: 'center',
    marginHorizontal: 20,
    marginVertical: 40,
  },
  headingText: {
    color: 'white',
    fontSize: 24,
    fontFamily: FontFamilyUtil.w900.fontFamily,
    fontWeight: FontFamilyUtil.w900.fontWeight,
    lineHeight: 28,
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
  haveAnAccountText: {
    textAlign: 'center',
    marginTop: 5,
    color: '#000000',
    fontFamily: FontFamilyUtil.w300.fontFamily,
    fontWeight: FontFamilyUtil.w300.fontWeight,
    fontSize: 14,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: -5,
    marginBottom: 10,
    fontFamily: FontFamilyUtil.w300.fontFamily,
    fontWeight: FontFamilyUtil.w300.fontWeight,
  },
});
