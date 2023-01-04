import { View, Text, TextInput, StyleSheet } from 'react-native';
import React from 'react';
import { Controller, RegisterOptions } from 'react-hook-form';

interface CustomInputProps {
  name: string;
  control: any;
  rules: RegisterOptions;
  style?: StyleSheet;
  placeholder: string;
  secureTextEntry?: boolean;
  autoCorrect?: boolean;
}

const CustomInput = ({
  name,
  control,
  rules = {},
  style,
  placeholder,
  secureTextEntry,
  autoCorrect,
}: CustomInputProps) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <>
          <TextInput
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            style={[
              styles.textInput,
              { borderColor: error ? 'red' : undefined },
            ]}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            autoCorrect={autoCorrect}
          />
          <Text
            style={{
              color: 'red',
              alignSelf: 'center',
              fontWeight: 'bold',
            }}
          >
            {error ? error.message : null}
          </Text>
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    margin: 2,
    borderWidth: 1,
    borderColor: '#e1e1e1',
    width: 200,
    fontSize: 15,
    textAlign: 'center',
    backgroundColor: '#ffffff',
  },
});

export default CustomInput;
