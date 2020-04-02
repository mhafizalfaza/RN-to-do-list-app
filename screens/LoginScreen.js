import React, { useState, useContext, useEffect} from 'react';
import { View, Text, TextInput, TouchableHighlight, TouchableOpacity, ActivityIndicator } from 'react-native';
import variables from '../utils/variables';
import { getLocalStorageItem, setLocalStorageItem } from '../utils/methods';
import { UserData, UserDispatch } from '../contexts/userContext';
import { SET_USER } from '../reducers/constants';

function LoginScreen({ navigation }) {

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ isLoggingIn, setIsLoggingIn ] = useState(false);
  const [ errors, setErrors ] = useState([]);
  const [ loginScreenActive, setLoginScreenActive ] = useState(false);
  const userData = useContext(UserData)
  const userDispatch = useContext(UserDispatch)

  useEffect(() => {
    if (!userData) checkAuthUser()
  }, [userData])

  const checkAuthUser = async () => {
    const authUser = await getLocalStorageItem('@auth_user');
    if (authUser) {
      userDispatch({ type: SET_USER, payload: authUser });
      navigation.navigate('Landing');
    } else {
      setLoginScreenActive(true)
    }
  };

  const onPressLogin = async () => {
    setErrors([])
    setIsLoggingIn(true)

    const users = await getLocalStorageItem('@users');

    let existingUser;

    if (!users) {
      setIsLoggingIn(false);
      return setErrors(['Invalid credentials']);
    } else {
      existingUser = users.find((eachUser) => {
        return eachUser.email === email;
      });

      if (!existingUser) {
        setIsLoggingIn(false);
        return setErrors(['Invalid credentials']);
      }
    }

    if (existingUser.password !== password) {
      setIsLoggingIn(false)
      return setErrors(['Invalid credentials']);
    }

    setIsLoggingIn(false);

    delete existingUser.password;
    delete existingUser.confirmPassword;

    await setLocalStorageItem('@auth_user', existingUser);

    userDispatch({ type: SET_USER, payload: existingUser });

    navigation.navigate('Landing');
  }

  const onPressSignup = () => {
    // setIsLoggingIn(true)
    navigation.navigate('Signup')
  }


  if (loginScreenActive) {
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
          
          <View style={{ marginBottom: 8 }}>
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
  
          <Text style={{ color: 'red', marginBottom: 8 }}>
            {errors.length ? errors[0] : ' '}
          </Text>
  
          <View style={{ marginBottom: 16 }}>
            <TouchableHighlight
              onPress={onPressLogin}
              title="Login"
              color="#841584"
              accessibilityLabel="Login"
              disabled={isLoggingIn}
              style={{ justifyContent: 'center', alignItems: "center", padding: 8, backgroundColor: variables.color.primary, borderRadius: 4 }}
              
            >
              <Text style={{ color: variables.color.white, textTransform: 'uppercase' }}>
                Login
              </Text>
            </TouchableHighlight>
  
            {isLoggingIn && <View style={{ position: 'absolute', width: '100%', height: '100%', borderColor: 'black', borderWidth: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
              <ActivityIndicator size="small" color="#00ff00" />
            </View>}
          </View>
          
  
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 12 }}>
              Don't have an account? &nbsp;
            </Text>
  
            <TouchableOpacity onPress={onPressSignup}>
              <Text style={{ color: variables.color.primary, fontSize: 12 }}>
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  } else {
    return null
  }
}

export default LoginScreen;