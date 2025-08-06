import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
  User 
} from 'firebase/auth';
import { db, auth } from '../config/firebase';

// 用户接口
export interface FirebaseUser {
  id: string;
  email: string;
  name: string;
  age: number;
  level: string;
  joinDate: string;
  totalTrainingDays: number;
  preferredMode: 'elder' | 'young';
  totalScore: number;
  createdAt: any;
  updatedAt: any;
}

// 训练记录接口
export interface TrainingRecord {
  id: string;
  userId: string;
  gameType: string;
  mode: 'elder' | 'young';
  score: number;
  level: number;
  duration: number;
  difficulty: string;
  createdAt: any;
}

// 成就接口
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockCondition: string;
  points: number;
  category: string;
}

// 用户成就接口
export interface UserAchievement {
  id: string;
  userId: string;
  achievementId: string;
  earnedAt: any;
}

// 应用设置接口
export interface AppSettings {
  userId: string;
  notificationsEnabled: boolean;
  soundEnabled: boolean;
  hapticEnabled: boolean;
  fontSize: 'small' | 'medium' | 'large';
  theme: 'light' | 'dark';
  language: string;
  updatedAt: any;
}

// 认证服务
export class AuthService {
  // 用户注册
  static async register(email: string, password: string, userData: Partial<FirebaseUser>) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // 创建用户文档
      const userDoc = {
        id: user.uid,
        email: user.email,
        totalScore: 0,
        ...userData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      await setDoc(doc(db, 'users', user.uid), userDoc);
      
      return { user, userData: userDoc };
    } catch (error) {
      throw error;
    }
  }

  // 用户登录
  static async login(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  }

  // 用户登出
  static async logout() {
    try {
      await signOut(auth);
    } catch (error) {
      throw error;
    }
  }

  // 获取当前用户
  static getCurrentUser(): User | null {
    return auth.currentUser;
  }

  // 监听认证状态
  static onAuthStateChange(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);
  }
}

// 用户数据服务
export class UserService {
  // 获取用户资料
  static async getUserProfile(userId: string): Promise<FirebaseUser | null> {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        return userDoc.data() as FirebaseUser;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  // 更新用户资料
  static async updateUserProfile(userId: string, data: Partial<FirebaseUser>) {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        ...data,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      throw error;
    }
  }

  // 获取用户统计
  static async getUserStats(userId: string) {
    try {
      const trainingQuery = query(
        collection(db, 'training_records'),
        where('userId', '==', userId)
      );
      
      const querySnapshot = await getDocs(trainingQuery);
      const records = querySnapshot.docs.map(doc => doc.data() as TrainingRecord);
      
      return {
        totalGames: records.length,
        totalScore: records.reduce((sum, record) => sum + record.score, 0),
        averageScore: records.length > 0 ? records.reduce((sum, record) => sum + record.score, 0) / records.length : 0,
        bestScore: records.length > 0 ? Math.max(...records.map(record => record.score)) : 0,
        totalTime: records.reduce((sum, record) => sum + record.duration, 0),
        lastPlayedDate: records.length > 0 ? records[0].createdAt : null
      };
    } catch (error) {
      throw error;
    }
  }

  // 获取用户设置
  static async getUserSettings(userId: string): Promise<AppSettings | null> {
    try {
      const settingsDoc = await getDoc(doc(db, 'user_settings', userId));
      if (settingsDoc.exists()) {
        return settingsDoc.data() as AppSettings;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  // 更新用户设置
  static async updateUserSettings(userId: string, settings: Partial<AppSettings>) {
    try {
      const settingsRef = doc(db, 'user_settings', userId);
      await setDoc(settingsRef, {
        userId,
        ...settings,
        updatedAt: serverTimestamp()
      }, { merge: true });
    } catch (error) {
      throw error;
    }
  }
}

// 训练记录服务
export class TrainingService {
  // 保存训练记录
  static async saveTrainingRecord(record: Omit<TrainingRecord, 'id' | 'createdAt'>) {
    try {
      const docRef = await addDoc(collection(db, 'training_records'), {
        ...record,
        createdAt: serverTimestamp()
      });
      
      // 更新用户总分
      const userRef = doc(db, 'users', record.userId);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const currentScore = userDoc.data().totalScore || 0;
        await updateDoc(userRef, {
          totalScore: currentScore + record.score,
          updatedAt: serverTimestamp()
        });
      }
      
      return docRef.id;
    } catch (error) {
      throw error;
    }
  }

  // 获取用户训练历史
  static async getUserTrainingHistory(userId: string, limit: number = 50) {
    try {
      const trainingQuery = query(
        collection(db, 'training_records'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc'),
        limit(limit)
      );
      
      const querySnapshot = await getDocs(trainingQuery);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as TrainingRecord[];
    } catch (error) {
      throw error;
    }
  }

  // 获取排行榜
  static async getLeaderboard(limit: number = 100) {
    try {
      const leaderboardQuery = query(
        collection(db, 'users'),
        orderBy('totalScore', 'desc'),
        limit(limit)
      );
      
      const querySnapshot = await getDocs(leaderboardQuery);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as FirebaseUser[];
    } catch (error) {
      throw error;
    }
  }

  // 获取周排行榜
  static async getWeeklyLeaderboard(limit: number = 50) {
    try {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      
      const weeklyQuery = query(
        collection(db, 'training_records'),
        where('createdAt', '>=', oneWeekAgo),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(weeklyQuery);
      const records = querySnapshot.docs.map(doc => doc.data() as TrainingRecord);
      
      // 按用户分组并计算总分
      const userScores: { [userId: string]: number } = {};
      records.forEach(record => {
        userScores[record.userId] = (userScores[record.userId] || 0) + record.score;
      });
      
      // 获取用户信息并排序
      const leaderboard = await Promise.all(
        Object.entries(userScores)
          .sort(([,a], [,b]) => b - a)
          .slice(0, limit)
          .map(async ([userId, score]) => {
            const userProfile = await UserService.getUserProfile(userId);
            return {
              userId,
              score,
              name: userProfile?.name || '未知用户',
              level: userProfile?.level || '初级'
            };
          })
      );
      
      return leaderboard;
    } catch (error) {
      throw error;
    }
  }
}

// 成就服务
export class AchievementService {
  // 获取所有成就
  static async getAllAchievements(): Promise<Achievement[]> {
    try {
      const achievementsQuery = query(collection(db, 'achievements'));
      const querySnapshot = await getDocs(achievementsQuery);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Achievement[];
    } catch (error) {
      throw error;
    }
  }

  // 获取用户成就
  static async getUserAchievements(userId: string): Promise<UserAchievement[]> {
    try {
      const userAchievementsQuery = query(
        collection(db, 'user_achievements'),
        where('userId', '==', userId)
      );
      
      const querySnapshot = await getDocs(userAchievementsQuery);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as UserAchievement[];
    } catch (error) {
      throw error;
    }
  }

  // 解锁成就
  static async unlockAchievement(userId: string, achievementId: string) {
    try {
      // 检查是否已经解锁
      const existingQuery = query(
        collection(db, 'user_achievements'),
        where('userId', '==', userId),
        where('achievementId', '==', achievementId)
      );
      
      const existingDocs = await getDocs(existingQuery);
      if (!existingDocs.empty) {
        return; // 已经解锁
      }
      
      await addDoc(collection(db, 'user_achievements'), {
        userId,
        achievementId,
        earnedAt: serverTimestamp()
      });
    } catch (error) {
      throw error;
    }
  }

  // 检查并解锁成就
  static async checkAndUnlockAchievements(userId: string, userStats: any) {
    try {
      const achievements = await this.getAllAchievements();
      const userAchievements = await this.getUserAchievements(userId);
      const unlockedAchievementIds = userAchievements.map(ua => ua.achievementId);
      
      for (const achievement of achievements) {
        if (unlockedAchievementIds.includes(achievement.id)) {
          continue; // 已经解锁
        }
        
        // 检查解锁条件
        let shouldUnlock = false;
        switch (achievement.unlockCondition) {
          case 'first_game':
            shouldUnlock = userStats.totalGames >= 1;
            break;
          case 'ten_games':
            shouldUnlock = userStats.totalGames >= 10;
            break;
          case 'hundred_games':
            shouldUnlock = userStats.totalGames >= 100;
            break;
          case 'score_1000':
            shouldUnlock = userStats.totalScore >= 1000;
            break;
          case 'score_10000':
            shouldUnlock = userStats.totalScore >= 10000;
            break;
          case 'streak_7':
            shouldUnlock = userStats.streak >= 7;
            break;
          case 'streak_30':
            shouldUnlock = userStats.streak >= 30;
            break;
        }
        
        if (shouldUnlock) {
          await this.unlockAchievement(userId, achievement.id);
        }
      }
    } catch (error) {
      throw error;
    }
  }
} 