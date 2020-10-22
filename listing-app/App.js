import { Roboto_100Thin, Roboto_300Light, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold, } from '@expo-google-fonts/roboto';
import * as Font from 'expo-font'
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import FlashMessage from 'react-native-flash-message';
import * as Permissions from 'expo-permissions'
import { Notifications } from 'expo'
import { ApolloProvider } from '@apollo/client'
import { UserProvider } from './src/context/user';
import AppContainer from './src/routes';
import { colors } from './src/utilities';
import { AppLoading } from 'expo';
import setupApolloClient from './src/apollo/index'

export default function App() {
  const [client, setupClient] = useState(null)
  const [fontLoaded, setFontLoaded] = useState(false)

  useEffect(() => {
    loadAppData()
  }, [])

  async function loadAppData() {
    const client = await setupApolloClient()
    setupClient(client)
    await Font.loadAsync({
      Thin: Roboto_100Thin,
      Light: Roboto_300Light,
      Regular: Roboto_400Regular,
      Bold: Roboto_500Medium,
      Bolder: Roboto_700Bold
    })
    await permissionForPushNotificationsAsync()
    setFontLoaded(true)
  }



  async function permissionForPushNotificationsAsync() {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    )
    let finalStatus = existingStatus
    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
      finalStatus = status
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return
    }

    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('default', {
        name: 'default',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250]
      })
    }
  }

  if (fontLoaded && client) { 
    return (
      <ApolloProvider client={client}>
        <UserProvider>
          <AppContainer />
          <StatusBar style="dark" backgroundColor={colors.buttonbackground} />
          <FlashMessage position="top" />
        </UserProvider>
      </ApolloProvider>
    )
  } else {
    return (
      <AppLoading />
    );
  }
} 
