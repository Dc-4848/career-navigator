import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MobileAppProvider, useMobileApp } from './src/context/MobileAppContext';
import { colors } from './src/theme/colors';

// Screens
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import DomainsScreen from './src/screens/DomainsScreen';
import RoadmapScreen from './src/screens/RoadmapScreen';
import SkillsScreen from './src/screens/SkillsScreen';
import JobsScreen from './src/screens/JobsScreen';
import HackathonsScreen from './src/screens/HackathonsScreen';
import ResumeScreen from './src/screens/ResumeScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tab Navigator for Authenticated User
function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.accentTeal,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarIcon: ({ color, size }) => {
          let icon = '🧭';
          if (route.name === 'HomeTab') icon = '🏠';
          else if (route.name === 'RoadmapTab') icon = '🗺️';
          else if (route.name === 'SkillsTab') icon = '⚡';
          else if (route.name === 'JobsTab') icon = '💼';
          else if (route.name === 'ResumeTab') icon = '📄';
          return <Text style={{ fontSize: 18 }}>{icon}</Text>;
        },
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeScreen} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name="RoadmapTab" component={RoadmapScreen} options={{ tabBarLabel: 'Roadmap' }} />
      <Tab.Screen name="SkillsTab" component={SkillsScreen} options={{ tabBarLabel: 'Skills' }} />
      <Tab.Screen name="JobsTab" component={JobsScreen} options={{ tabBarLabel: 'Jobs' }} />
      <Tab.Screen name="ResumeTab" component={ResumeScreen} options={{ tabBarLabel: 'Resume' }} />
    </Tab.Navigator>
  );
}

// Navigation Root Component
function NavigationRoot() {
  const { user, loading } = useMobileApp();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.accentTeal} />
        <Text style={styles.loadingText}>Connecting to Career Navigator...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer
      theme={{
        ...DarkTheme,
        colors: {
          ...DarkTheme.colors,
          background: colors.bgPrimary,
          card: colors.bgSecondary,
          text: colors.textPrimary,
          border: colors.glassBorder,
        },
      }}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          // Unauthenticated Stack
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        ) : (
          // Authenticated Stack
          <>
            <Stack.Screen name="MainTabs" component={MainTabNavigator} />
            <Stack.Screen name="ProfileModal" component={ProfileScreen} options={{ presentation: 'modal' }} />
            <Stack.Screen name="DomainsModal" component={DomainsScreen} options={{ presentation: 'modal' }} />
            <Stack.Screen name="HackathonsModal" component={HackathonsScreen} options={{ presentation: 'modal' }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <MobileAppProvider>
      <StatusBar style="light" backgroundColor="#030610" />
      <NavigationRoot />
    </MobileAppProvider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'rgba(3, 6, 16, 0.95)',
    borderTopColor: colors.glassBorder,
    borderTopWidth: 1,
    height: 60,
    paddingBottom: 6,
    paddingTop: 6,
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: '700',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.bgPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  loadingText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
});
