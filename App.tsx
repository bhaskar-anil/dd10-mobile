// App.tsx
import 'react-native-url-polyfill/auto';
import 'react-native-get-random-values';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import HomeScreen from './src/screens/HomeScreen';
import { LanguageProvider } from './src/context/LanguageContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <LanguageProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator
          screenOptions={{
            headerShown: true,
            headerTitle: 'DailyDigest10',
            headerTitleAlign: 'center',
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </LanguageProvider>
  );
}
