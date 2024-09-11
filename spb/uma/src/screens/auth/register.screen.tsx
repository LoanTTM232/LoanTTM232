import { RootStackParamList } from '@/navigation'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useState } from 'react'
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native'

type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Register'
>

type Props = {
  navigation: RegisterScreenNavigationProp
}

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [fullname, setFullname] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  // const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [phone, setPhone] = useState<string>('')

  const handleRegister = async () => {
    if (!fullname || !email || !password || !phone) {
      Alert.alert('Please fill in all fields.')
      return
    }
    // if (password !== confirmPassword) {
    //   Alert.alert('Passwords do not match')
    //   return
    // }

    // Register user
    fetch('http://127.0.0.1:3000/api/v1/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullname: fullname,
        email: email,
        password: password,
        phone: phone,
        role: 'user',
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          navigation.navigate('Login')
        } else {
          Alert.alert(data.message || 'Registration failed')
        }
      })
      .catch((err) => {
        Alert.alert('Network error, please check your connection.')
        console.error(err)
      })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Fullname"
        value={fullname}
        onChangeText={setFullname}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  error: {
    color: 'red',
    marginBottom: 12,
  },
})

export default RegisterScreen
