import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface StatCardProps {
  icon: string;
  value: string | number;
  label: string;
  color?: string;
  size?: 'small' | 'medium' | 'large';
}

const StatCard: React.FC<StatCardProps> = ({
  icon,
  value,
  label,
  color = '#007AFF',
  size = 'medium',
}) => {
  const getIconSize = () => {
    switch (size) {
      case 'small': return 20;
      case 'large': return 40;
      default: return 30;
    }
  };

  const getValueSize = () => {
    switch (size) {
      case 'small': return 16;
      case 'large': return 28;
      default: return 24;
    }
  };

  const getLabelSize = () => {
    switch (size) {
      case 'small': return 10;
      case 'large': return 14;
      default: return 12;
    }
  };

  return (
    <View style={styles.card}>
      <Ionicons 
        name={icon as any} 
        size={getIconSize()} 
        color={color} 
      />
      <Text style={[
        styles.value, 
        { 
          fontSize: getValueSize(),
          color: color 
        }
      ]}>
        {value}
      </Text>
      <Text style={[
        styles.label,
        { fontSize: getLabelSize() }
      ]}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
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
  value: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  label: {
    color: '#666',
    marginTop: 5,
  },
});

export default StatCard; 