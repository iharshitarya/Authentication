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

const SignIn = ({navigation}) => {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
          start={{x: 0.1, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#8E0E00', '#1F1C18']}
          style={styles.container}>
          <View style={styles.headingContainer}>
            <Text style={styles.headingText}>Sign Up</Text>
            <Text style={[styles.headingText, {fontSize: 18, marginTop: 10}]}>
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
                onChangeText={text => setName(text)}
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
                onChangeText={text => setEmail(text)}
                keyboardType="email-address"
              />
              {errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
              <Text style={styles.formText}>Password</Text>
              <TextInput
                placeholder="Password"
                style={styles.textInputContainer}
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry
              />
              {errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
              <Text style={styles.formText}>Confirm Password</Text>
              <TextInput
                placeholder="Confirm Password"
                style={styles.textInputContainer}
                value={confirmPassword}
                onChangeText={text => setConfirmPassword(text)}
                secureTextEntry
              />
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
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: '#ffffff',
    paddingVertical: 20,
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
