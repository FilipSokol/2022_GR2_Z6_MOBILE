import axios from 'axios';
import React, { useState } from 'react';
import {
  Button,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import { View, Text } from '../components/Themed';
import { BASE_URL } from '../context/config';
import { RootHomeStackScreenProps } from '../types';

const registerFrom = (
  email: string,
  password: string,
  confirmPassword: string,
) => {
  const object = {
    email: email,
    password: password,
    confirmPassword: confirmPassword,
    //roleId: '0',
  };

  axios
    .post(`${BASE_URL}/api/account/register`, object, {
      //headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then((response) => console.log(response))
    .catch((err) => console.log(err));
};
// {
//   "firstName": "test1",
//   "lastName": "test2",
//   "email": "test@wp.pl",
//   "password": "test123",
//   "confirmPassword": "test123",
//   "nationality": "Poland",
//   "province": "Śląskie",
//   "dateOfBirth": "2022-11-27T22:29:56.959Z",
//   "roleId": 1
// }
const Register = ({
  navigation,
  route,
}: RootHomeStackScreenProps<'Register'>) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <TextInput
        placeholder="Email"
        style={styles.textInput}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        placeholder="Password"
        style={styles.textInput}
        autoCorrect={false}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        placeholder="Confirm Password"
        style={styles.textInput}
        autoCorrect={false}
        secureTextEntry
        onChangeText={(text) => setConfirmPassword(text)}
      />
      <View style={{ width: 200, marginTop: 10 }}>
        <Button
          title={'Register'}
          onPress={() => registerFrom(email, password, confirmPassword)}
        />
      </View>
      <Text>
        Navigate to{' '}
        <Text
          onPress={() => {
            navigation.navigate('Login');
          }}
          style={{ fontWeight: 'bold' }}
        >
          login{' '}
        </Text>
        page
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    width: '100%',
  },
  textInput: {
    margin: 5,
    borderWidth: 1,
    borderColor: '#e1e1e1',
    width: 200,
    fontSize: 15,
    textAlign: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

export default Register;
