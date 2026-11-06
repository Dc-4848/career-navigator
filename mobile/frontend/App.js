import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MobileAppProvider, useMobileApp } from './src/context/MobileAppContext';
import { colors } from './src/theme/colors';
import { Ionicons } from '@expo/vector-icons';

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
import ResourcesScreen from './src/screens/ResourcesScreen';

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
        tabBarIcon: ({ color, size, focused }) => {
          let iconName = 'ellipse-outline';
          if (route.name === 'HomeTab') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'RoadmapTab') iconName = focused ? 'map' : 'map-outline';
          else if (route.name === 'ResourcesTab') iconName = focused ? 'library' : 'library-outline';
          else if (route.name === 'JobsTab') iconName = focused ? 'briefcase' : 'briefcase-outline';
          else if (route.name === 'ResumeTab') iconName = focused ? 'document-text' : 'document-text-outline';
          return <Ionicons name={iconName} size={20} color={color} />;
        },
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeScreen} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name="RoadmapTab" component={RoadmapScreen} options={{ tabBarLabel: 'Roadmaps' }} />
      <Tab.Screen name="ResourcesTab" component={ResourcesScreen} options={{ tabBarLabel: 'Resources' }} />
      <Tab.Screen name="JobsTab" component={JobsScreen} options={{ tabBarLabel: 'Opportunities' }} />
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
            <Stack.Screen name="SkillsModal" component={SkillsScreen} options={{ presentation: 'modal' }} />
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
