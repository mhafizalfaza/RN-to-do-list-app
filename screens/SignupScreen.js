import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableHighlight, TouchableOpacity, ActivityIndicator } from 'react-native';
import variables from '../utils/variables';
import { validateUserRegistration, getLocalStorageItem, setLocalStorageItem } from '../utils/methods'
import { UserDispatch } from '../contexts/userContext';
import { SET_USER } from '../reducers/constants';

function SignupScreen({ navigation }) {

  const [ email, setEmail ] = useState('');
  const [ name, setName ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');
  const [ isLoggingIn, setIsLoggingIn ] = useState(false);
  const [ errors, setErrors ] = useState([]);
  const userDispatch = useContext(UserDispatch);

  const onPressLogin = () => {
    // setIsLoggingIn(true)
    navigation.navigate('Login')
  }

  const onPressSignup = async () => {
    const user = { name, email, password, confirmPassword }

    const errors = validateUserRegistration(user)

    if (errors && errors.length) return setErrors(errors)

    setIsLoggingIn(true)

    const users = await getLocalStorageItem('@users')

    let existingUser

    if (users && users.length) existingUser = users.find((eachUser) => {
      return eachUser.email === user.email
    })

    if (existingUser) {
      setIsLoggingIn(false);
      return setErrors(['Email already registered']);
    }

    let usersToSet;

    if (users && users.length) {
      usersToSet = [user, ...users];
    } else {
      usersToSet = [user];
    }

    await setLocalStorageItem('@users', usersToSet);
    const usersFromStorage = await getLocalStorageItem('@users');

    setIsLoggingIn(false);

    delete user.confirmPassword;

    await setLocalStorageItem('@auth_user', user);

    const authUser = await getLocalStorageItem('@auth_user', user);
    
    delete user.password

    userDispatch({ type: SET_USER, payload: user });

    navigation.navigate('Landing');
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 16, color: variables.color.primary }}>
            To Do List
          </Text>
        </View>
        <View style={{ marginBottom: 16 }}>
          <Text style={{ marginBottom: 8, color: variables.color.primary }}>
            Name
          </Text>
          <TextInput
            style={{height: 32, width: 200, padding: 8, borderWidth: 1, borderColor: variables.color.primary}}
            placeholder=""
            onChangeText={name => setName(name)}
            defaultValue={name}
            autoCompleteType="name"
          />
        </View>

        <View style={{ marginBottom: 16 }}>
          <Text style={{ marginBottom: 8, color: variables.color.primary }}>
            Email
          </Text>
          <TextInput
            style={{height: 32, width: 200, padding: 8, borderWidth: 1, borderColor: variables.color.primary}}
            placeholder=""
            onChangeText={email => setEmail(email)}
            defaultValue={email}
            autoCompleteType="email"
          />
        </View>
        
        <View style={{ marginBottom: 16 }}>
          <Text style={{ marginBottom: 8, color: variables.color.primary }}>
            Password
          </Text>
          <TextInput
            style={{height: 32, width: 200, padding: 8, borderWidth: 1, borderColor: variables.color.primary}}
            placeholder=""
            onChangeText={password => setPassword(password)}
            defaultValue={password}
            autoCompleteType="password"
            secureTextEntry={true}
          />
        </View>

        <View style={{ marginBottom: 8 }}>
          <Text style={{ marginBottom: 8, color: variables.color.primary }}>
            Confirm Password
          </Text>
          <TextInput
            style={{height: 32, width: 200, padding: 8, borderWidth: 1, borderColor: variables.color.primary}}
            placeholder=""
            onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}
            defaultValue={confirmPassword}
            autoCompleteType="password"
            secureTextEntry={true}
          />
        </View>

        <Text style={{ color: 'red', marginBottom: 8 }}>
          {errors.length ? errors[0] : ' '}
        </Text>

        <View style={{ marginBottom: 16 }}>
          <TouchableHighlight
            onPress={onPressSignup}
            title="Login"
            color="#841584"
            accessibilityLabel="Login"
            disabled={isLoggingIn}
            style={{ justifyContent: 'center', alignItems: "center", padding: 8, backgroundColor: variables.color.primary, borderRadius: 4 }}
            
          >
            <Text style={{ color: variables.color.white, textTransform: 'uppercase' }}>
              Sign Up
            </Text>
          </TouchableHighlight>

          {isLoggingIn && <View style={{ position: 'absolute', width: '100%', height: '100%', borderColor: 'black', borderWidth: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
            <ActivityIndicator size="small" color="#00ff00" />
          </View>}
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: 12 }}>
            Have an account? &nbsp;
          </Text>

          <TouchableOpacity onPress={onPressLogin}>
            <Text style={{ color: variables.color.primary, fontSize: 12 }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default SignupScreen;