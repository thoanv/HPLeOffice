import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './components/context';
import SignIn from './screens/Auth/SignIn';
import Splash from './screens/Splash';

import Tabs from './navigation/tabs';
import Notification from './screens/Notification';
import Profile from './screens/Profile';

import List from './screens/Signatures/List';
import Detail from './screens/Signatures/Detail';
import Signature from './screens/Signatures/Signature';
import ViewFile from './screens/Signatures/ViewFile';
import { Provider as PaperProvider } from 'react-native-paper';
import { GET_LOGIN, POST_LOGIN, POST_DATA } from './screens/ultils/api';
import { requestUserPermission, notificationListener } from './screens/ultils/notificationServices';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: 'transparent'
  }
}
const Stack = createStackNavigator();
export default function App({ navigation }) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );
  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
    requestUserPermission();
    notificationListener();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        let username = data.username;
        let password = data.password;
        let payload = `https://id.haiphatland.com.vn/api/password/gfyvhxnueb?username=${username}&pw=${password}`
        var fcmToken = await AsyncStorage.getItem('fcmToken');
        GET_LOGIN(`${payload}`).then(res => {
          if (res.errors.errorCode === 0) {
            let email = res.userInfo.mail;
            
            const filed = {
              email: email,
              username: username,
              fcmToken: fcmToken
            };

            let url = '/login.php';
            console.log(filed)
            POST_LOGIN(`${url}`, filed).then(response => {
              if (response['success'] == 1) {
                AsyncStorage.setItem("userToken", response['token']);
                dispatch({ type: 'SIGN_IN', token: response['token'] });
              }
            }).catch((error) => {
              console.log("Api call error");
              alert(error.message);
            });
          }
        }).catch((error) => {
          console.log("Api call error");
          alert(error.message);
        });

      },
      signOut: async () => {
        try {
          const filed = {
            fcmToken: true,
          };
          console.log(filed);
          let url = '/logout.php';
          POST_DATA(`${url}`, filed).then(response => {
            console.log(response);
            if (response['success'] == 1) {
              AsyncStorage.removeItem('userToken');
              dispatch({ type: 'SIGN_OUT' });
            }
          }).catch((error) => {
            console.log("Api call error");
            alert(error.message);
          });
          
        } catch (e) {
          console.log(e);
        }
      },
      signUp: async (data) => {
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );
  if (state.isLoading) {
    // We haven't finished checking for the token yet
    return <Splash />;
  }
  return (
    <PaperProvider>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer theme={theme}>
          <Stack.Navigator>
            {state.userToken == null ? (
              //                <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false}}/>
              <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
            ) : (
              <>
                <Stack.Screen name="Tab" component={Tabs} options={{ headerShown: false }} />
                <Stack.Screen name="Notification" component={Notification} options={{ headerShown: false }} />
                <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
                <Stack.Screen name="Signature" component={Signature} options={{ headerShown: false }} />
                <Stack.Screen name="Detail" component={Detail} options={{ headerShown: false }} />
                <Stack.Screen name="List" component={List} options={{ headerShown: false }} />
                <Stack.Screen name="ViewFile" component={ViewFile} options={{ headerShown: false }} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </PaperProvider>
  );
}

