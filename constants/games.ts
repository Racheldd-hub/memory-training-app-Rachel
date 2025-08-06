// 游戏类型定义
export const GAME_TYPES = {
  NUMBER_MEMORY: 'number-memory',
  IMAGE_MATCHING: 'image-matching',
  WORD_RECALL: 'word-recall',
  COLOR_MEMORY: 'color-memory',
  SEQUENCE_MEMORY: 'sequence-memory',
  PATTERN_RECOGNITION: 'pattern-recognition',
  MULTI_TASK: 'multi-task',
  SPEED_MEMORY: 'speed-memory',
  LOGIC_MEMORY: 'logic-memory',
  SPATIAL_MEMORY: 'spatial-memory',
} as const;

// 游戏配置接口
export interface GameConfig {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  timeLimit: number; // 秒
  sequenceLength: {
    elder: number;
    young: number;
  };
  displayTime: {
    elder: number; // 毫秒
    young: number; // 毫秒
  };
  color: string;
  category: 'memory' | 'logic' | 'speed' | 'spatial';
}

// 老年人模式游戏配置
export const ELDER_GAMES: GameConfig[] = [
  {
    id: GAME_TYPES.NUMBER_MEMORY,
    title: '数字记忆',
    description: '记住屏幕上显示的数字序列',
    icon: 'calculator',
    difficulty: 'easy',
    timeLimit: 60,
    sequenceLength: { elder: 3, young: 5 },
    displayTime: { elder: 3000, young: 2000 },
    color: '#4CAF50',
    category: 'memory',
  },
  {
    id: GAME_TYPES.IMAGE_MATCHING,
    title: '图片配对',
    description: '找到相同的图片进行配对',
    icon: 'images',
    difficulty: 'easy',
    timeLimit: 90,
    sequenceLength: { elder: 4, young: 6 },
    displayTime: { elder: 4000, young: 2500 },
    color: '#2196F3',
    category: 'memory',
  },
  {
    id: GAME_TYPES.WORD_RECALL,
    title: '词语回忆',
    description: '记住并回忆显示的词语',
    icon: 'text',
    difficulty: 'medium',
    timeLimit: 120,
    sequenceLength: { elder: 3, young: 4 },
    displayTime: { elder: 5000, young: 3000 },
    color: '#FF9800',
    category: 'memory',
  },
  {
    id: GAME_TYPES.COLOR_MEMORY,
    title: '颜色记忆',
    description: '记住颜色出现的顺序',
    icon: 'color-palette',
    difficulty: 'easy',
    timeLimit: 60,
    sequenceLength: { elder: 3, young: 5 },
    displayTime: { elder: 3000, young: 2000 },
    color: '#9C27B0',
    category: 'memory',
  },
];

// 年轻人模式游戏配置
export const YOUNG_GAMES: GameConfig[] = [
  {
    id: GAME_TYPES.SEQUENCE_MEMORY,
    title: '序列记忆',
    description: '记住复杂的数字和字母序列',
    icon: 'code',
    difficulty: 'hard',
    timeLimit: 30,
    sequenceLength: { elder: 4, young: 6 },
    displayTime: { elder: 4000, young: 2000 },
    color: '#FF5722',
    category: 'memory',
  },
  {
    id: GAME_TYPES.PATTERN_RECOGNITION,
    title: '模式识别',
    description: '识别并记住复杂的图案序列',
    icon: 'grid',
    difficulty: 'hard',
    timeLimit: 45,
    sequenceLength: { elder: 5, young: 7 },
    displayTime: { elder: 5000, young: 2500 },
    color: '#E91E63',
    category: 'logic',
  },
  {
    id: GAME_TYPES.MULTI_TASK,
    title: '多任务记忆',
    description: '同时处理多个记忆任务',
    icon: 'layers',
    difficulty: 'expert',
    timeLimit: 60,
    sequenceLength: { elder: 6, young: 8 },
    displayTime: { elder: 6000, young: 3000 },
    color: '#9C27B0',
    category: 'memory',
  },
  {
    id: GAME_TYPES.SPEED_MEMORY,
    title: '快速记忆',
    description: '在短时间内快速记忆信息',
    icon: 'flash',
    difficulty: 'hard',
    timeLimit: 20,
    sequenceLength: { elder: 4, young: 6 },
    displayTime: { elder: 2000, young: 1000 },
    color: '#FF9800',
    category: 'speed',
  },
  {
    id: GAME_TYPES.LOGIC_MEMORY,
    title: '逻辑记忆',
    description: '结合逻辑推理的记忆训练',
    icon: 'bulb',
    difficulty: 'expert',
    timeLimit: 90,
    sequenceLength: { elder: 5, young: 7 },
    displayTime: { elder: 7000, young: 4000 },
    color: '#2196F3',
    category: 'logic',
  },
  {
    id: GAME_TYPES.SPATIAL_MEMORY,
    title: '空间记忆',
    description: '训练空间位置记忆能力',
    icon: 'map',
    difficulty: 'hard',
    timeLimit: 40,
    sequenceLength: { elder: 4, young: 6 },
    displayTime: { elder: 4000, young: 2000 },
    color: '#4CAF50',
    category: 'spatial',
  },
];

// 获取游戏配置
export const getGameConfig = (gameId: string, mode: 'elder' | 'young'): GameConfig | null => {
  const allGames = [...ELDER_GAMES, ...YOUNG_GAMES];
  return allGames.find(game => game.id === gameId) || null;
};

// 获取模式特定配置
export const getModeSpecificConfig = (gameId: string, mode: 'elder' | 'young') => {
  const gameConfig = getGameConfig(gameId, mode);
  if (!gameConfig) return null;

  return {
    sequenceLength: gameConfig.sequenceLength[mode],
    displayTime: gameConfig.displayTime[mode],
    timeLimit: gameConfig.timeLimit,
  };
};

// 难度等级配置
export const DIFFICULTY_CONFIG = {
  easy: {
    color: '#4CAF50',
    label: '简单',
    multiplier: 1.0,
  },
  medium: {
    color: '#FF9800',
    label: '中等',
    multiplier: 1.5,
  },
  hard: {
    color: '#FF5722',
    label: '困难',
    multiplier: 2.0,
  },
  expert: {
    color: '#9C27B0',
    label: '极难',
    multiplier: 3.0,
  },
};

// 游戏类别配置
export const CATEGORY_CONFIG = {
  memory: {
    label: '记忆训练',
    icon: 'brain',
    color: '#4CAF50',
  },
  logic: {
    label: '逻辑推理',
    icon: 'bulb',
    color: '#2196F3',
  },
  speed: {
    label: '速度训练',
    icon: 'flash',
    color: '#FF9800',
  },
  spatial: {
    label: '空间记忆',
    icon: 'map',
    color: '#9C27B0',
  },
};

// 分数计算规则
export const SCORE_RULES = {
  baseScore: 10,
  timeBonus: 5, // 每剩余10秒奖励5分
  streakBonus: 2, // 连续正确每次奖励2分
  difficultyMultiplier: {
    easy: 1.0,
    medium: 1.5,
    hard: 2.0,
    expert: 3.0,
  },
};

// 计算游戏分数
export const calculateScore = (
  level: number,
  timeLeft: number,
  streak: number,
  difficulty: 'easy' | 'medium' | 'hard' | 'expert'
): number => {
  const baseScore = SCORE_RULES.baseScore * level;
  const timeBonus = Math.floor(timeLeft / 10) * SCORE_RULES.timeBonus;
  const streakBonus = streak * SCORE_RULES.streakBonus;
  const difficultyMultiplier = SCORE_RULES.difficultyMultiplier[difficulty];
  
  return Math.floor((baseScore + timeBonus + streakBonus) * difficultyMultiplier);
};

// 等级进度配置
export const LEVEL_CONFIG = {
  maxLevel: 50,
  experiencePerLevel: 100,
  experienceMultiplier: 1.2,
};

// 计算等级
export const calculateLevel = (totalScore: number): number => {
  let level = 1;
  let requiredExp = LEVEL_CONFIG.experiencePerLevel;
  let currentExp = totalScore;

  while (currentExp >= requiredExp && level < LEVEL_CONFIG.maxLevel) {
    currentExp -= requiredExp;
    level++;
    requiredExp = Math.floor(requiredExp * LEVEL_CONFIG.experienceMultiplier);
  }

  return level;
}; 