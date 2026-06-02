/**
 * Main App Component
 * Root component with navigation setup
 */

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AppProvider } from './context/AppContext';
import { HistoryProvider } from './context/HistoryContext';
import { useDarkMode } from './hooks/useDarkMode';
import { COLORS } from './styles/colors';

// Screens (to be created)
// import SplashScreen from './screens/SplashScreen';
// import HomeScreen from './screens/HomeScreen';
// import ScannerScreen from './screens/ScannerScreen';
// import GeneratorScreen from './screens/GeneratorScreen';
// import HistoryScreen from './screens/HistoryScreen';
// import SettingsScreen from './screens/SettingsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  const { isDarkMode, theme, isLoading } = useDarkMode();
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    // Initialize app
    const initializeApp = async () => {
      try {
        // Add initialization logic here (permissions, database setup, etc)
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate loading
      } catch (error) {
        console.error('Error initializing app:', error);
      } finally {
        setAppReady(true);
      }
    };

    if (!isLoading) {
      initializeApp();
    }
  }, [isLoading]);

  if (isLoading || !appReady) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.primary} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <AppProvider>
      <HistoryProvider>
        <NavigationContainer
          theme={{
            dark: isDarkMode,
            colors: {
              primary: theme.primary,
              background: theme.background,
              card: theme.surface,
              text: theme.text,
              border: theme.border,
              notification: theme.primary,
            },
          }}
        >
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              cardStyle: { backgroundColor: theme.background },
            }}
          >
            {/* Navigation structure will be implemented here */}
            {/* <Stack.Screen name="Splash" component={SplashScreen} /> */}
            {/* <Stack.Screen name="Main" component={MainTabs} /> */}
          </Stack.Navigator>
        </NavigationContainer>
      </HistoryProvider>
    </AppProvider>
  );
};

// Main Tab Navigator
// const MainTabs = () => {
//   const { theme } = useDarkMode();
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         headerShown: true,
//         tabBarActiveTintColor: theme.primary,
//         tabBarInactiveTintColor: theme.textSecondary,
//         tabBarStyle: {
//           backgroundColor: theme.surface,
//           borderTopColor: theme.border,
//         },
//       }}
//     >
//       <Tab.Screen name="Home" component={HomeScreen} />
//       <Tab.Screen name="Scanner" component={ScannerScreen} />
//       <Tab.Screen name="Generator" component={GeneratorScreen} />
//       <Tab.Screen name="History" component={HistoryScreen} />
//       <Tab.Screen name="Settings" component={SettingsScreen} />
//     </Tab.Navigator>
//   );
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
