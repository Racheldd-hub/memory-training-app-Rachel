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

const HomeScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* 头部欢迎区域 */}
        <View style={styles.header}>
          <Text style={styles.title}>记忆力训练</Text>
          <Text style={styles.subtitle}>提升记忆力的最佳选择</Text>
        </View>

        {/* 快速开始区域 */}
        <View style={styles.quickStartSection}>
          <Text style={styles.sectionTitle}>快速开始</Text>
          <View style={styles.modeCards}>
            <TouchableOpacity
              style={[styles.modeCard, styles.elderMode]}
              onPress={() => navigation.navigate('训练', { screen: 'ElderMode' })}
            >
              <Ionicons name="person" size={40} color="#fff" />
              <Text style={styles.modeTitle}>老年人模式</Text>
              <Text style={styles.modeDescription}>
                简单易用，适合老年人的记忆训练
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modeCard, styles.youngMode]}
              onPress={() => navigation.navigate('训练', { screen: 'YoungMode' })}
            >
              <Ionicons name="flash" size={40} color="#fff" />
              <Text style={styles.modeTitle}>年轻人模式</Text>
              <Text style={styles.modeDescription}>
                挑战性强，适合年轻人的记忆训练
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 功能特色区域 */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>功能特色</Text>
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <Ionicons name="brain" size={24} color="#007AFF" />
              <Text style={styles.featureText}>科学记忆训练</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="trending-up" size={24} color="#007AFF" />
              <Text style={styles.featureText}>进度跟踪分析</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="game-controller" size={24} color="#007AFF" />
              <Text style={styles.featureText}>游戏化体验</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="people" size={24} color="#007AFF" />
              <Text style={styles.featureText}>个性化设计</Text>
            </View>
          </View>
        </View>

        {/* 今日统计 */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>今日统计</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>训练次数</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>平均分数</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>训练时长</Text>
            </View>
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  quickStartSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  modeCards: {
    gap: 15,
  },
  modeCard: {
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    minHeight: 120,
  },
  elderMode: {
    backgroundColor: '#4CAF50',
  },
  youngMode: {
    backgroundColor: '#FF9800',
  },
  modeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
    marginBottom: 5,
  },
  modeDescription: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
  },
  featuresSection: {
    marginBottom: 30,
  },
  featuresList: {
    gap: 15,
  },
  featureItem: {
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
  featureText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
  },
  statsSection: {
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
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
    color: '#007AFF',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
});

export default HomeScreen; 