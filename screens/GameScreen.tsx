import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const GameScreen = ({ route, navigation }: any) => {
  const { gameType, mode, difficulty } = route.params;
  const [gameState, setGameState] = useState('ready'); // ready, playing, result
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(30);
  const [currentSequence, setCurrentSequence] = useState<string[]>([]);
  const [userInput, setUserInput] = useState<string[]>([]);
  const [showSequence, setShowSequence] = useState(false);

  // 游戏配置
  const gameConfig = {
    'number-memory': {
      title: '数字记忆',
      description: '记住数字序列',
      sequenceLength: mode === 'elder' ? 3 : 5,
      displayTime: mode === 'elder' ? 3000 : 2000,
    },
    'image-matching': {
      title: '图片配对',
      description: '找到相同的图片',
      sequenceLength: mode === 'elder' ? 4 : 6,
      displayTime: mode === 'elder' ? 4000 : 2500,
    },
    'word-recall': {
      title: '词语回忆',
      description: '记住词语列表',
      sequenceLength: mode === 'elder' ? 3 : 4,
      displayTime: mode === 'elder' ? 5000 : 3000,
    },
    'sequence-memory': {
      title: '序列记忆',
      description: '记住复杂序列',
      sequenceLength: mode === 'elder' ? 4 : 6,
      displayTime: mode === 'elder' ? 4000 : 2000,
    },
  };

  const config = gameConfig[gameType] || gameConfig['number-memory'];

  // 生成随机序列
  const generateSequence = () => {
    const sequence = [];
    const items = gameType === 'number-memory' || gameType === 'sequence-memory' 
      ? ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
      : ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    
    for (let i = 0; i < config.sequenceLength + level - 1; i++) {
      const randomIndex = Math.floor(Math.random() * items.length);
      sequence.push(items[randomIndex]);
    }
    return sequence;
  };

  // 开始游戏
  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setLevel(1);
    setTimeLeft(30);
    nextRound();
  };

  // 下一轮
  const nextRound = () => {
    const newSequence = generateSequence();
    setCurrentSequence(newSequence);
    setUserInput([]);
    setShowSequence(true);
    
    setTimeout(() => {
      setShowSequence(false);
    }, config.displayTime);
  };

  // 处理用户输入
  const handleInput = (input: string) => {
    if (gameState !== 'playing' || showSequence) return;
    
    const newUserInput = [...userInput, input];
    setUserInput(newUserInput);
    
    // 检查是否完成序列
    if (newUserInput.length === currentSequence.length) {
      checkAnswer(newUserInput);
    }
  };

  // 检查答案
  const checkAnswer = (input: string[]) => {
    const isCorrect = input.every((item, index) => item === currentSequence[index]);
    
    if (isCorrect) {
      setScore(score + 10 * level);
      setLevel(level + 1);
      setTimeout(() => {
        nextRound();
      }, 1000);
    } else {
      endGame();
    }
  };

  // 结束游戏
  const endGame = () => {
    setGameState('result');
  };

  // 重新开始
  const restartGame = () => {
    setGameState('ready');
  };

  // 返回主页
  const goHome = () => {
    navigation.goBack();
  };

  // 倒计时
  useEffect(() => {
    if (gameState === 'playing') {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [gameState]);

  // 渲染准备界面
  if (gameState === 'ready') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <TouchableOpacity onPress={goHome} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.gameTitle}>{config.title}</Text>
            <View style={{ width: 24 }} />
          </View>
          
          <View style={styles.readyContent}>
            <Ionicons name="play-circle" size={80} color="#007AFF" />
            <Text style={styles.readyTitle}>准备开始</Text>
            <Text style={styles.readyDescription}>{config.description}</Text>
            <Text style={styles.readyInstructions}>
              记住屏幕上显示的序列，然后按顺序点击
            </Text>
            
            <TouchableOpacity style={styles.startButton} onPress={startGame}>
              <Text style={styles.startButtonText}>开始游戏</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // 渲染游戏界面
  if (gameState === 'playing') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          {/* 游戏头部信息 */}
          <View style={styles.gameHeader}>
            <View style={styles.gameInfo}>
              <Text style={styles.infoText}>分数: {score}</Text>
              <Text style={styles.infoText}>等级: {level}</Text>
              <Text style={styles.infoText}>时间: {timeLeft}s</Text>
            </View>
          </View>

          {/* 序列显示区域 */}
          <View style={styles.sequenceArea}>
            {showSequence ? (
              <View style={styles.sequenceDisplay}>
                <Text style={styles.sequenceText}>
                  {currentSequence.join(' ')}
                </Text>
              </View>
            ) : (
              <View style={styles.inputArea}>
                <Text style={styles.inputTitle}>请重复序列:</Text>
                <View style={styles.userInputDisplay}>
                  {userInput.map((item, index) => (
                    <Text key={index} style={styles.inputItem}>{item}</Text>
                  ))}
                </View>
              </View>
            )}
          </View>

          {/* 输入按钮 */}
          <View style={styles.inputButtons}>
            {gameType === 'number-memory' || gameType === 'sequence-memory' ? (
              // 数字按钮
              <View style={styles.numberGrid}>
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map((num) => (
                  <TouchableOpacity
                    key={num}
                    style={styles.numberButton}
                    onPress={() => handleInput(num)}
                    disabled={showSequence}
                  >
                    <Text style={styles.numberButtonText}>{num}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              // 字母按钮
              <View style={styles.letterGrid}>
                {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map((letter) => (
                  <TouchableOpacity
                    key={letter}
                    style={styles.letterButton}
                    onPress={() => handleInput(letter)}
                    disabled={showSequence}
                  >
                    <Text style={styles.letterButtonText}>{letter}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // 渲染结果界面
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.resultContent}>
          <Ionicons name="trophy" size={80} color="#FFD700" />
          <Text style={styles.resultTitle}>游戏结束</Text>
          <Text style={styles.resultScore}>最终分数: {score}</Text>
          <Text style={styles.resultLevel}>达到等级: {level}</Text>
          
          <View style={styles.resultButtons}>
            <TouchableOpacity style={styles.restartButton} onPress={restartGame}>
              <Text style={styles.restartButtonText}>再玩一次</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.homeButton} onPress={goHome}>
              <Text style={styles.homeButtonText}>返回主页</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  backButton: {
    padding: 8,
  },
  gameTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  readyContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  readyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  readyDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  readyInstructions: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  startButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  gameHeader: {
    marginBottom: 30,
  },
  gameInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  sequenceArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  sequenceDisplay: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sequenceText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  inputArea: {
    alignItems: 'center',
  },
  inputTitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 15,
  },
  userInputDisplay: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  inputItem: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginHorizontal: 5,
  },
  inputButtons: {
    marginBottom: 20,
  },
  numberGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  numberButton: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  numberButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  letterGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  letterButton: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  letterButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  resultContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  resultScore: {
    fontSize: 20,
    color: '#007AFF',
    marginBottom: 5,
  },
  resultLevel: {
    fontSize: 18,
    color: '#666',
    marginBottom: 40,
  },
  resultButtons: {
    flexDirection: 'row',
    gap: 20,
  },
  restartButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  restartButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  homeButton: {
    backgroundColor: '#666',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  homeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GameScreen; 