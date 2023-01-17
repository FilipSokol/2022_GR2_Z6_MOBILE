import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Button,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import CustomInput from '../components/CustomInput';
import { View, Text } from '../components/Themed';
import { AuthContext } from '../context/authModel';
import { BASE_URL } from '../context/config';
import { RootHomeStackScreenProps } from '../types';
import { EMAIL_REGEX } from './Login';

interface userRegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

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
  const { control, handleSubmit, watch } = useForm();
  const pwd = watch('password');
  const [created, setCreated] = useState(false);
  const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;
  //const [email, setEmail] = useState('');
  //const [password, setPassword] = useState('');
  //const [confirmPassword, setConfirmPassword] = useState('');
  const registerFrom = (data: userRegisterData | any) => {
    const object = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      roleId: '1',
    };

    axios
      .post(`${BASE_URL}/api/account/register`, object, {
        //headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((response) => {
        //console.log(response.status);
        if (response.status == 200) {
          setCreated(true);
        }
      });
    //.catch((err) => console.log(err));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <CustomInput
        name="firstName"
        placeholder="First Name"
        rules={{
          required: 'First Name is required',
        }}
        control={control}
      />
      <CustomInput
        name="lastName"
        placeholder="Last Name"
        rules={{
          required: 'Last Name is required',
        }}
        control={control}
      />
      <CustomInput
        name="email"
        placeholder="Email"
        rules={{
          required: 'Email is required',
          pattern: { value: EMAIL_REGEX, message: 'Email is invalid' },
        }}
        control={control}
      />
      <CustomInput
        name="password"
        placeholder="Password"
        control={control}
        rules={{
          required: 'Password is required',
          pattern: {
            value: PASSWORD_REGEX,
            message: 'Password should be minimum 8 characters long',
          },
          // minLength: {
          //   value: 8,
          //   message: 'Password should be minimum 8 characters long',
          // },
        }}
        secureTextEntry
      />
      <CustomInput
        name="confirmPassword"
        placeholder="Confirm Password"
        control={control}
        rules={{
          required: 'Password is required',
          validate: (value) => value === pwd || 'Password do not match',
        }}
        secureTextEntry
      />

      {created ? (
        <Text style={{ color: 'green', fontWeight: 'bold' }}>
          Account have been created!
        </Text>
      ) : null}
      {/* <TextInput
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
      /> */}
      <View style={{ width: 200, marginTop: 10 }}>
        <Button title={'Register'} onPress={handleSubmit(registerFrom)} />
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
    padding: 20,
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
