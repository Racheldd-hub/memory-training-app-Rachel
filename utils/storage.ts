import AsyncStorage from '@react-native-async-storage/async-storage';

// 存储键名常量
export const STORAGE_KEYS = {
  USER_PROFILE: 'user_profile',
  GAME_STATS: 'game_stats',
  SETTINGS: 'app_settings',
  ACHIEVEMENTS: 'achievements',
  TRAINING_HISTORY: 'training_history',
};

// 用户资料接口
export interface UserProfile {
  id: string;
  name: string;
  age: number;
  level: string;
  joinDate: string;
  totalTrainingDays: number;
  preferredMode: 'elder' | 'young';
}

// 游戏统计接口
export interface GameStats {
  totalGames: number;
  totalScore: number;
  averageScore: number;
  bestScore: number;
  totalTime: number; // 分钟
  streak: number;
  gamesThisWeek: number;
  gamesThisMonth: number;
  lastPlayedDate: string;
}

// 应用设置接口
export interface AppSettings {
  notificationsEnabled: boolean;
  soundEnabled: boolean;
  hapticEnabled: boolean;
  fontSize: 'small' | 'medium' | 'large';
  theme: 'light' | 'dark';
}

// 成就接口
export interface Achievement {
  id: string;
  title: string;
  description: string;
  earned: boolean;
  earnedDate?: string;
  icon: string;
}

// 训练历史接口
export interface TrainingSession {
  id: string;
  date: string;
  gameType: string;
  mode: 'elder' | 'young';
  score: number;
  level: number;
  duration: number; // 秒
}

// 通用存储函数
export const storeData = async (key: string, value: any): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error('存储数据失败:', error);
  }
};

export const getData = async (key: string): Promise<any> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('读取数据失败:', error);
    return null;
  }
};

export const removeData = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('删除数据失败:', error);
  }
};

// 用户资料相关函数
export const saveUserProfile = async (profile: UserProfile): Promise<void> => {
  await storeData(STORAGE_KEYS.USER_PROFILE, profile);
};

export const getUserProfile = async (): Promise<UserProfile | null> => {
  return await getData(STORAGE_KEYS.USER_PROFILE);
};

// 游戏统计相关函数
export const saveGameStats = async (stats: GameStats): Promise<void> => {
  await storeData(STORAGE_KEYS.GAME_STATS, stats);
};

export const getGameStats = async (): Promise<GameStats | null> => {
  return await getData(STORAGE_KEYS.GAME_STATS);
};

export const updateGameStats = async (newStats: Partial<GameStats>): Promise<void> => {
  const currentStats = await getGameStats();
  if (currentStats) {
    const updatedStats = { ...currentStats, ...newStats };
    await saveGameStats(updatedStats);
  }
};

// 应用设置相关函数
export const saveAppSettings = async (settings: AppSettings): Promise<void> => {
  await storeData(STORAGE_KEYS.SETTINGS, settings);
};

export const getAppSettings = async (): Promise<AppSettings | null> => {
  return await getData(STORAGE_KEYS.SETTINGS);
};

// 成就相关函数
export const saveAchievements = async (achievements: Achievement[]): Promise<void> => {
  await storeData(STORAGE_KEYS.ACHIEVEMENTS, achievements);
};

export const getAchievements = async (): Promise<Achievement[] | null> => {
  return await getData(STORAGE_KEYS.ACHIEVEMENTS);
};

export const unlockAchievement = async (achievementId: string): Promise<void> => {
  const achievements = await getAchievements();
  if (achievements) {
    const updatedAchievements = achievements.map(achievement => {
      if (achievement.id === achievementId && !achievement.earned) {
        return {
          ...achievement,
          earned: true,
          earnedDate: new Date().toISOString(),
        };
      }
      return achievement;
    });
    await saveAchievements(updatedAchievements);
  }
};

// 训练历史相关函数
export const saveTrainingSession = async (session: TrainingSession): Promise<void> => {
  const history = await getTrainingHistory();
  const updatedHistory = history ? [session, ...history] : [session];
  await storeData(STORAGE_KEYS.TRAINING_HISTORY, updatedHistory);
};

export const getTrainingHistory = async (): Promise<TrainingSession[] | null> => {
  return await getData(STORAGE_KEYS.TRAINING_HISTORY);
};

export const getWeeklyHistory = async (): Promise<TrainingSession[]> => {
  const history = await getTrainingHistory();
  if (!history) return [];
  
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  
  return history.filter(session => {
    const sessionDate = new Date(session.date);
    return sessionDate >= oneWeekAgo;
  });
};

// 初始化默认数据
export const initializeDefaultData = async (): Promise<void> => {
  // 检查是否已经初始化
  const userProfile = await getUserProfile();
  if (!userProfile) {
    // 创建默认用户资料
    const defaultProfile: UserProfile = {
      id: '1',
      name: '用户',
      age: 25,
      level: '初级',
      joinDate: new Date().toISOString().split('T')[0],
      totalTrainingDays: 0,
      preferredMode: 'young',
    };
    await saveUserProfile(defaultProfile);
  }

  const gameStats = await getGameStats();
  if (!gameStats) {
    // 创建默认游戏统计
    const defaultStats: GameStats = {
      totalGames: 0,
      totalScore: 0,
      averageScore: 0,
      bestScore: 0,
      totalTime: 0,
      streak: 0,
      gamesThisWeek: 0,
      gamesThisMonth: 0,
      lastPlayedDate: '',
    };
    await saveGameStats(defaultStats);
  }

  const appSettings = await getAppSettings();
  if (!appSettings) {
    // 创建默认应用设置
    const defaultSettings: AppSettings = {
      notificationsEnabled: true,
      soundEnabled: true,
      hapticEnabled: true,
      fontSize: 'medium',
      theme: 'light',
    };
    await saveAppSettings(defaultSettings);
  }

  const achievements = await getAchievements();
  if (!achievements) {
    // 创建默认成就列表
    const defaultAchievements: Achievement[] = [
      {
        id: 'first_game',
        title: '初学者',
        description: '完成第一次训练',
        earned: false,
        icon: 'play-circle',
      },
      {
        id: 'streak_7',
        title: '坚持不懈',
        description: '连续训练7天',
        earned: false,
        icon: 'flame',
      },
      {
        id: 'high_score_100',
        title: '高分玩家',
        description: '单次得分超过100',
        earned: false,
        icon: 'trophy',
      },
      {
        id: 'games_100',
        title: '记忆大师',
        description: '完成100次训练',
        earned: false,
        icon: 'brain',
      },
      {
        id: 'speed_demon',
        title: '速度之王',
        description: '在30秒内完成训练',
        earned: false,
        icon: 'flash',
      },
    ];
    await saveAchievements(defaultAchievements);
  }
};

// 清除所有数据
export const clearAllData = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('清除所有数据失败:', error);
  }
}; 