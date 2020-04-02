import AsyncStorage from '@react-native-community/async-storage';

export const validateUserRegistration = ({ name, email, password, confirmPassword }) => {

  const errors = [];

  if (password !== confirmPassword) {
    errors.unshift('Passwords do not match');
  }

  if (!isEmailValid(email)) {
    errors.unshift('Email is invalid');
  }

  return errors;
};

const isEmailValid = (email) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }

  return false;
};

export const getLocalStorageItem = async (name) => {

  return new Promise( async (resolve, reject) => {
    try {
      let value = await AsyncStorage.getItem(name);

      if (isJsonString(value)) value = JSON.parse(value);

      resolve(value);

    } catch (e) {

      resolve('')

    }
  })
}

export const setLocalStorageItem = async (name, value) => {

  let valueToSet;

  if (typeof value === 'object') {
    valueToSet = JSON.stringify(value);
  } else {
    valueToSet = value
  }

  return new Promise( async (resolve, reject) => {
    try {
      await AsyncStorage.setItem(name, valueToSet);

      resolve(true);

    } catch (e) {

      reject('SET LOCAL STORAGE ITEM ERROR');

    }
  })
}

const isJsonString = (str) => {
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return true;
}

export const uuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}