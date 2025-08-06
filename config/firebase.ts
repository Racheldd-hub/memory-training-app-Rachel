import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import Constants from 'expo-constants';

// Firebase配置 - 请替换为您的实际配置
const firebaseConfig = {
  apiKey: "your-api-key-here",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};

// 初始化Firebase
const app = initializeApp(firebaseConfig);

// 获取认证和数据库实例
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app; 