import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const YoungModeScreen = ({ navigation }: any) => {
  const games = [
    {
      id: 'sequence-memory',
      title: '序列记忆',
      description: '记住复杂的数字和字母序列',
      icon: 'code',
      difficulty: '困难',
      color: '#FF5722',
      timeLimit: '30秒',
    },
    {
      id: 'pattern-recognition',
      title: '模式识别',
      description: '识别并记住复杂的图案序列',
      icon: 'grid',
      difficulty: '困难',
      color: '#E91E63',
      timeLimit: '45秒',
    },
    {
      id: 'multi-task',
      title: '多任务记忆',
      description: '同时处理多个记忆任务',
      icon: 'layers',
      difficulty: '极难',
      color: '#9C27B0',
      timeLimit: '60秒',
    },
    {
      id: 'speed-memory',
      title: '快速记忆',
      description: '在短时间内快速记忆信息',
      icon: 'flash',
      difficulty: '困难',
      color: '#FF9800',
      timeLimit: '20秒',
    },
    {
      id: 'logic-memory',
      title: '逻辑记忆',
      description: '结合逻辑推理的记忆训练',
      icon: 'bulb',
      difficulty: '极难',
      color: '#2196F3',
      timeLimit: '90秒',
    },
    {
      id: 'spatial-memory',
      title: '空间记忆',
      description: '训练空间位置记忆能力',
      icon: 'map',
      difficulty: '困难',
      color: '#4CAF50',
      timeLimit: '40秒',
    },
  ];

  const startGame = (gameId: string) => {
    navigation.navigate('游戏', { 
      gameType: gameId, 
      mode: 'young',
      difficulty: 'hard'
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* 模式介绍 */}
        <View style={styles.header}>
          <Ionicons name="flash" size={50} color="#FF9800" />
          <Text style={styles.title}>年轻人模式</Text>
          <Text style={styles.subtitle}>
            挑战性记忆训练，提升认知能力
          </Text>
        </View>

        {/* 模式特点 */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>模式特点</Text>
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <Ionicons name="speedometer" size={20} color="#FF9800" />
              <Text style={styles.featureText}>快速反应训练</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="trophy" size={20} color="#FF9800" />
              <Text style={styles.featureText}>竞技排行榜</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="analytics" size={20} color="#FF9800" />
              <Text style={styles.featureText}>详细数据分析</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="star" size={20} color="#FF9800" />
              <Text style={styles.featureText}>成就系统</Text>
            </View>
          </View>
        </View>

        {/* 游戏选择 */}
        <View style={styles.gamesSection}>
          <Text style={styles.sectionTitle}>挑战游戏</Text>
          <View style={styles.gamesGrid}>
            {games.map((game) => (
              <TouchableOpacity
                key={game.id}
                style={[styles.gameCard, { borderLeftColor: game.color }]}
                onPress={() => startGame(game.id)}
              >
                <View style={styles.gameHeader}>
                  <Ionicons name={game.icon as any} size={30} color={game.color} />
                  <View style={styles.gameInfo}>
                    <Text style={styles.gameTitle}>{game.title}</Text>
                    <View style={styles.gameMeta}>
                      <Text style={[styles.gameDifficulty, { color: game.color }]}>
                        {game.difficulty}
                      </Text>
                      <Text style={styles.gameTimeLimit}>{game.timeLimit}</Text>
                    </View>
                  </View>
                </View>
                <Text style={styles.gameDescription}>{game.description}</Text>
                <View style={[styles.playButton, { backgroundColor: game.color }]}>
                  <Text style={styles.playButtonText}>开始挑战</Text>
                  <Ionicons name="play" size={16} color="#fff" />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 挑战模式 */}
        <View style={styles.challengeSection}>
          <Text style={styles.sectionTitle}>挑战模式</Text>
          <View style={styles.challengeCards}>
            <TouchableOpacity style={styles.challengeCard}>
              <Ionicons name="timer" size={30} color="#FF5722" />
              <Text style={styles.challengeTitle}>限时挑战</Text>
              <Text style={styles.challengeDescription}>
                在限定时间内完成尽可能多的任务
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.challengeCard}>
              <Ionicons name="trending-up" size={30} color="#4CAF50" />
              <Text style={styles.challengeTitle}>连续挑战</Text>
              <Text style={styles.challengeDescription}>
                连续完成多个游戏，难度递增
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 训练建议 */}
        <View style={styles.tipsSection}>
          <Text style={styles.sectionTitle}>训练建议</Text>
          <View style={styles.tipsList}>
            <Text style={styles.tipText}>• 每天训练20-30分钟</Text>
            <Text style={styles.tipText}>• 挑战不同难度的游戏</Text>
            <Text style={styles.tipText}>• 关注反应速度和准确性</Text>
            <Text style={styles.tipText}>• 定期查看进步报告</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  featuresSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  featuresList: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
  },
  gamesSection: {
    marginBottom: 30,
  },
  gamesGrid: {
    gap: 15,
  },
  gameCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  gameHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  gameInfo: {
    marginLeft: 15,
    flex: 1,
  },
  gameTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  gameMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  gameDifficulty: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 10,
  },
  gameTimeLimit: {
    fontSize: 12,
    color: '#666',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  gameDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 15,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  playButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  challengeSection: {
    marginBottom: 30,
  },
  challengeCards: {
    flexDirection: 'row',
    gap: 15,
  },
  challengeCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
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
  challengeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    marginBottom: 8,
  },
  challengeDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 16,
  },
  tipsSection: {
    marginBottom: 20,
  },
  tipsList: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tipText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 8,
  },
});

export default YoungModeScreen; 