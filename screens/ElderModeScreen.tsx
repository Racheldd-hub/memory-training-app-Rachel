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

const ElderModeScreen = ({ navigation }: any) => {
  const games = [
    {
      id: 'number-memory',
      title: '数字记忆',
      description: '记住屏幕上显示的数字序列',
      icon: 'calculator',
      difficulty: '简单',
      color: '#4CAF50',
    },
    {
      id: 'image-matching',
      title: '图片配对',
      description: '找到相同的图片进行配对',
      icon: 'images',
      difficulty: '简单',
      color: '#2196F3',
    },
    {
      id: 'word-recall',
      title: '词语回忆',
      description: '记住并回忆显示的词语',
      icon: 'text',
      difficulty: '中等',
      color: '#FF9800',
    },
    {
      id: 'color-memory',
      title: '颜色记忆',
      description: '记住颜色出现的顺序',
      icon: 'color-palette',
      difficulty: '简单',
      color: '#9C27B0',
    },
  ];

  const startGame = (gameId: string) => {
    navigation.navigate('游戏', { 
      gameType: gameId, 
      mode: 'elder',
      difficulty: 'easy'
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* 模式介绍 */}
        <View style={styles.header}>
          <Ionicons name="person" size={50} color="#4CAF50" />
          <Text style={styles.title}>老年人模式</Text>
          <Text style={styles.subtitle}>
            专为老年人设计的简单易用记忆训练
          </Text>
        </View>

        {/* 模式特点 */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>模式特点</Text>
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <Ionicons name="text" size={20} color="#4CAF50" />
              <Text style={styles.featureText}>大字体显示</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="time" size={20} color="#4CAF50" />
              <Text style={styles.featureText}>充足反应时间</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="volume-high" size={20} color="#4CAF50" />
              <Text style={styles.featureText}>语音提示</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="trending-up" size={20} color="#4CAF50" />
              <Text style={styles.featureText}>渐进式难度</Text>
            </View>
          </View>
        </View>

        {/* 游戏选择 */}
        <View style={styles.gamesSection}>
          <Text style={styles.sectionTitle}>选择游戏</Text>
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
                    <Text style={styles.gameDifficulty}>{game.difficulty}</Text>
                  </View>
                </View>
                <Text style={styles.gameDescription}>{game.description}</Text>
                <View style={styles.playButton}>
                  <Text style={styles.playButtonText}>开始游戏</Text>
                  <Ionicons name="play" size={16} color="#fff" />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 训练建议 */}
        <View style={styles.tipsSection}>
          <Text style={styles.sectionTitle}>训练建议</Text>
          <View style={styles.tipsList}>
            <Text style={styles.tipText}>• 每天训练15-20分钟</Text>
            <Text style={styles.tipText}>• 保持专注，不要着急</Text>
            <Text style={styles.tipText}>• 可以重复练习同一游戏</Text>
            <Text style={styles.tipText}>• 注意休息，避免疲劳</Text>
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
  gameDifficulty: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
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
    backgroundColor: '#4CAF50',
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

export default ElderModeScreen; 