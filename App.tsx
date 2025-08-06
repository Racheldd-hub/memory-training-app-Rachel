import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';

// 导入页面组件
import HomeScreen from './src/screens/HomeScreen';
import ElderModeScreen from './src/screens/ElderModeScreen';
import YoungModeScreen from './src/screens/YoungModeScreen';
import GameScreen from './src/screens/GameScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import StatsScreen from './src/screens/StatsScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// 主标签导航
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === '首页') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === '训练') {
            iconName = focused ? 'fitness' : 'fitness-outline';
          } else if (route.name === '统计') {
            iconName = focused ? 'stats-chart' : 'stats-chart-outline';
          } else if (route.name === '我的') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="首页" component={HomeScreen} />
      <Tab.Screen name="训练" component={TrainingStack} />
      <Tab.Screen name="统计" component={StatsScreen} />
      <Tab.Screen name="我的" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// 训练页面栈导航
function TrainingStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#007AFF',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="训练模式" 
        component={TrainingModeScreen}
        options={{ title: '选择训练模式' }}
      />
      <Stack.Screen 
        name="游戏" 
        component={GameScreen}
        options={{ title: '记忆力训练' }}
      />
    </Stack.Navigator>
  );
}

// 训练模式选择页面
function TrainingModeScreen({ navigation }: any) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#007AFF',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="ElderMode" 
        component={ElderModeScreen}
        options={{ title: '老年人模式' }}
      />
      <Stack.Screen 
        name="YoungMode" 
        component={YoungModeScreen}
        options={{ title: '年轻人模式' }}
      />
    </Stack.Navigator>
  );
}

// 主应用组件
function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return null; // 或者显示加载屏幕
  }

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      {user ? (
        <MainTabs />
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
} 