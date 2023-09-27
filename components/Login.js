import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import styles from '../css/LoginStyle';
import { storeToken, getToken } from '../utils/authStorage';

const Login = ({ navigation }) => {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function requestToken(email, password) {
    try {
        const response = await fetch('http://10.0.2.2:5000/api/tokens', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'tenant': 'root',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });

        if (!response.ok) {
          if (response.status === 401) {
              throw new Error('Incorrect username or password');
          } else {
              throw new Error('Network response was not ok');
          }
      }

        const data = await response.json();
        return data.token;

    } catch (error) {
        throw error;
    }
  }

  
  const handleLogin = async () => {
    try {
      const tokenData = await requestToken(username, password);
      
      await storeToken(tokenData);
      const retrievedToken = await getToken();
      console.log(retrievedToken);
      setIsLoggedIn(true);
      navigation.navigate('Management');
    } catch (error) {
      if (error.message === 'Incorrect username or password') {
        Alert.alert('Login Failed', 'Incorrect username or password');
    } else {
        console.error('Login failed:', error);
    }
    }
  };
  
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Tên đăng nhập"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Đăng nhập" onPress={handleLogin} />
    </View>
  );
};

export default Login;
