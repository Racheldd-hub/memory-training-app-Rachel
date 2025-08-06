import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const StatsScreen = () => {
  // 模拟统计数据
  const stats = {
    totalGames: 25,
    totalScore: 1250,
    averageScore: 50,
    bestScore: 180,
    totalTime: 120, // 分钟
    streak: 7, // 连续天数
    gamesThisWeek: 8,
    gamesThisMonth: 25,
  };

  const weeklyData = [
    { day: '周一', score: 45, games: 2 },
    { day: '周二', score: 60, games: 3 },
    { day: '周三', score: 35, games: 1 },
    { day: '周四', score: 80, games: 4 },
    { day: '周五', score: 55, games: 2 },
    { day: '周六', score: 70, games: 3 },
    { day: '周日', score: 65, games: 2 },
  ];

  const achievements = [
    { id: 1, title: '初学者', description: '完成第一次训练', earned: true },
    { id: 2, title: '坚持不懈', description: '连续训练7天', earned: true },
    { id: 3, title: '高分玩家', description: '单次得分超过100', earned: true },
    { id: 4, title: '记忆大师', description: '完成100次训练', earned: false },
    { id: 5, title: '速度之王', description: '在30秒内完成训练', earned: false },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* 头部统计卡片 */}
        <View style={styles.headerStats}>
          <View style={styles.statCard}>
            <Ionicons name="trophy" size={30} color="#FFD700" />
            <Text style={styles.statNumber}>{stats.totalScore}</Text>
            <Text style={styles.statLabel}>总分数</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="game-controller" size={30} color="#007AFF" />
            <Text style={styles.statNumber}>{stats.totalGames}</Text>
            <Text style={styles.statLabel}>总游戏</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="trending-up" size={30} color="#4CAF50" />
            <Text style={styles.statNumber}>{stats.averageScore}</Text>
            <Text style={styles.statLabel}>平均分</Text>
          </View>
        </View>

        {/* 详细统计 */}
        <View style={styles.detailedStats}>
          <Text style={styles.sectionTitle}>详细统计</Text>
          <View style={styles.statsGrid}>
            <View style={styles.detailStat}>
              <Text style={styles.detailStatNumber}>{stats.bestScore}</Text>
              <Text style={styles.detailStatLabel}>最高分数</Text>
            </View>
            <View style={styles.detailStat}>
              <Text style={styles.detailStatNumber}>{stats.totalTime}</Text>
              <Text style={styles.detailStatLabel}>总时长(分钟)</Text>
            </View>
            <View style={styles.detailStat}>
              <Text style={styles.detailStatNumber}>{stats.streak}</Text>
              <Text style={styles.detailStatLabel}>连续天数</Text>
            </View>
            <View style={styles.detailStat}>
              <Text style={styles.detailStatNumber}>{stats.gamesThisWeek}</Text>
              <Text style={styles.detailStatLabel}>本周游戏</Text>
            </View>
          </View>
        </View>

        {/* 本周进度 */}
        <View style={styles.weeklyProgress}>
          <Text style={styles.sectionTitle}>本周进度</Text>
          <View style={styles.weeklyChart}>
            {weeklyData.map((day, index) => (
              <View key={index} style={styles.dayColumn}>
                <View style={[styles.scoreBar, { height: (day.score / 80) * 100 }]} />
                <Text style={styles.dayLabel}>{day.day}</Text>
                <Text style={styles.dayScore}>{day.score}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 游戏类型统计 */}
        <View style={styles.gameTypeStats}>
          <Text style={styles.sectionTitle}>游戏类型统计</Text>
          <View style={styles.gameTypeList}>
            <View style={styles.gameTypeItem}>
              <View style={styles.gameTypeInfo}>
                <Ionicons name="calculator" size={24} color="#4CAF50" />
                <Text style={styles.gameTypeName}>数字记忆</Text>
              </View>
              <View style={styles.gameTypeStats}>
                <Text style={styles.gameTypeScore}>平均分: 52</Text>
                <Text style={styles.gameTypeGames}>游戏次数: 12</Text>
              </View>
            </View>
            <View style={styles.gameTypeItem}>
              <View style={styles.gameTypeInfo}>
                <Ionicons name="images" size={24} color="#2196F3" />
                <Text style={styles.gameTypeName}>图片配对</Text>
              </View>
              <View style={styles.gameTypeStats}>
                <Text style={styles.gameTypeScore}>平均分: 48</Text>
                <Text style={styles.gameTypeGames}>游戏次数: 8</Text>
              </View>
            </View>
            <View style={styles.gameTypeItem}>
              <View style={styles.gameTypeInfo}>
                <Ionicons name="text" size={24} color="#FF9800" />
                <Text style={styles.gameTypeName}>词语回忆</Text>
              </View>
              <View style={styles.gameTypeStats}>
                <Text style={styles.gameTypeScore}>平均分: 45</Text>
                <Text style={styles.gameTypeGames}>游戏次数: 5</Text>
              </View>
            </View>
          </View>
        </View>

        {/* 成就系统 */}
        <View style={styles.achievements}>
          <Text style={styles.sectionTitle}>成就</Text>
          <View style={styles.achievementsList}>
            {achievements.map((achievement) => (
              <View key={achievement.id} style={styles.achievementItem}>
                <View style={styles.achievementIcon}>
                  <Ionicons 
                    name={achievement.earned ? "checkmark-circle" : "ellipse-outline"} 
                    size={24} 
                    color={achievement.earned ? "#4CAF50" : "#ccc"} 
                  />
                </View>
                <View style={styles.achievementInfo}>
                  <Text style={[
                    styles.achievementTitle,
                    { color: achievement.earned ? '#333' : '#999' }
                  ]}>
                    {achievement.title}
                  </Text>
                  <Text style={[
                    styles.achievementDescription,
                    { color: achievement.earned ? '#666' : '#ccc' }
                  ]}>
                    {achievement.description}
                  </Text>
                </View>
              </View>
            ))}
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
  headerStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  detailedStats: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  detailStat: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    minWidth: '45%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  detailStatNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  detailStatLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  weeklyProgress: {
    marginBottom: 30,
  },
  weeklyChart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dayColumn: {
    alignItems: 'center',
    flex: 1,
  },
  scoreBar: {
    width: 20,
    backgroundColor: '#007AFF',
    borderRadius: 10,
    marginBottom: 8,
  },
  dayLabel: {
    fontSize: 12,
    color: '#666',
  },
  dayScore: {
    fontSize: 10,
    color: '#999',
    marginTop: 2,
  },
  gameTypeStats: {
    marginBottom: 30,
  },
  gameTypeList: {
    gap: 10,
  },
  gameTypeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  gameTypeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gameTypeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  gameTypeStats: {
    alignItems: 'flex-end',
  },
  gameTypeScore: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  gameTypeGames: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  achievements: {
    marginBottom: 20,
  },
  achievementsList: {
    gap: 10,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  achievementIcon: {
    marginRight: 15,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  achievementDescription: {
    fontSize: 14,
  },
});

export default StatsScreen; 