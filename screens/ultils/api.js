import { BASE_URL } from './config';
import AsyncStorage from '@react-native-async-storage/async-storage';
exports.POST_LOGIN = function (url, data) {
  return new Promise(async (resolve) => {
    fetch(`${BASE_URL}${url}`, {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }).then((res) => {
      return res.json()
    }).then((responseData) => {
      return resolve(responseData);
    }).catch(function (error) {
        console.log(
          'There has been a problem with your fetch operation: ' +
          error.message,
        );
        throw error;
      });
  })
}
exports.GET_LOGIN = function(url) {
  return new Promise(async (resolve) => {
    fetch(`${url}`, {
      method: "GET",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      return res.json()
    }).then((responseData) => {
      return resolve(responseData);
    }).catch(function (error) {
      console.log(
        'There has been a problem with your fetch operation: ' +
        error.message,
      );
      throw error;
    });
  })
}
exports.GET_DATA = function(url) {
  return new Promise(async (resolve) => {
    let token = await AsyncStorage.getItem('userToken');
    fetch(`${BASE_URL}${url}`, {
      method: "GET",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    }).then((res) => {
      console.log(res)
      return res.json()
    }).then((responseData) => {
      return resolve(responseData);
    }).catch(function (error) {
      console.log(
        'There has been a problem with your fetch operation: ' +
        error.message,
      );
      throw error;
    });
  })
}
exports.POST_DATA = function (url, data) {
  return new Promise(async (resolve) => {
    let token = await AsyncStorage.getItem('userToken');
    fetch(`${BASE_URL}${url}`, {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      body: JSON.stringify(data)
    }).then((res) => {
      return res.json()
    }).then((responseData) => {
      return resolve(responseData);
    }).catch(function (error) {
        console.log(
          'There has been a problem with your fetch operation: ' +
          error.message,
        );
        throw error;
      });
  })
}
