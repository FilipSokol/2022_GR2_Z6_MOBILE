import React, { useContext } from 'react';
import { useForm, ValidationRule } from 'react-hook-form';
import { Button, StyleSheet, TextInput, View, Text } from 'react-native';
import CustomInput from '../components/CustomInput';
import { AuthContext } from '../context/authModel';
import { RootTabScreenProps } from '../types';

export const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const Login = ({ navigation }: RootTabScreenProps<any>) => {
  // const [email, setEmail] = useState<string | null>(null);
  // const [password, setPassword] = useState<string | null>(null);
  const { login }: any = useContext(AuthContext);

  const { control, handleSubmit } = useForm();
  return (
    <View style={styles.container}>
      {/* <TextInput
        placeholder="Email"
        style={styles.textInput}
        onChangeText={(value) => setEmail(value)}
      /> */}

      {/* <TextInput
        placeholder="Password"
        style={styles.textInput}
        autoCorrect={false}
        secureTextEntry
        onChangeText={(value) => setPassword(value)}
      />  */}
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
          minLength: {
            value: 6,
            message: 'Password should be minimum 6 characters long',
          },
        }}
        autoCorrect={false}
        secureTextEntry
      />
      <View style={{ width: 200, marginTop: 10 }}>
        <Button title={'Login'} onPress={handleSubmit(login)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    width: '70%',
    padding: 4,
  },
  textInput: {
    margin: 10,
    borderWidth: 1,
    borderColor: '#e1e1e1',
    width: 200,
    fontSize: 15,
    textAlign: 'center',
    backgroundColor: '#ffffff',
  },
});

export default Login;
