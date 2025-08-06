import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface GameCardProps {
  title: string;
  description: string;
  icon: string;
  difficulty: string;
  color: string;
  timeLimit?: string;
  onPress: () => void;
  mode?: 'elder' | 'young';
}

const GameCard: React.FC<GameCardProps> = ({
  title,
  description,
  icon,
  difficulty,
  color,
  timeLimit,
  onPress,
  mode = 'young',
}) => {
  return (
    <TouchableOpacity
      style={[styles.card, { borderLeftColor: color }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.header}>
        <Ionicons name={icon as any} size={30} color={color} />
        <View style={styles.info}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.meta}>
            <Text style={[styles.difficulty, { color }]}>
              {difficulty}
            </Text>
            {timeLimit && (
              <Text style={styles.timeLimit}>{timeLimit}</Text>
            )}
          </View>
        </View>
      </View>
      
      <Text style={styles.description}>{description}</Text>
      
      <View style={[styles.playButton, { backgroundColor: color }]}>
        <Text style={styles.playButtonText}>
          {mode === 'elder' ? '开始游戏' : '开始挑战'}
        </Text>
        <Ionicons name="play" size={16} color="#fff" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    borderLeftWidth: 4,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  info: {
    marginLeft: 15,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  difficulty: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 10,
  },
  timeLimit: {
    fontSize: 12,
    color: '#666',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  description: {
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
});

export default GameCard; 