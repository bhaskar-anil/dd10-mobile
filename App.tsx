// App.tsx
import 'react-native-url-polyfill/auto';
import 'react-native-get-random-values';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LanguageProvider } from './src/context/LanguageContext';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import HomeScreen from './src/screens/HomeScreen';
import ThemeToggle from './src/components/ThemeToggle';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const { theme } = useTheme();

  return (
    <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          headerTitle: 'DailyDigest10',
          headerTitleAlign: 'center',
          headerRight: () => <ThemeToggle />, // ✅ clean injection
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AppNavigator />
      </ThemeProvider>
    </LanguageProvider>
  );
}
