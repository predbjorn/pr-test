import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Menstruation } from '../../domain/entities/LifeContext/Menstruation';

interface MenstruationCardProps {
  menstruation: Menstruation;
}

export const MenstruationCard: React.FC<MenstruationCardProps> = ({ menstruation }) => {
  const cycleLength = menstruation.getCycleLength();

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Menstruation</Text>
        <Text style={styles.date}>Started: {menstruation.startDate.toLocaleDateString()}</Text>
      </View>

      {menstruation.endDate && (
        <Text style={styles.info}>
          Ended: {menstruation.endDate.toLocaleDateString()}
          {cycleLength && ` (${cycleLength} days)`}
        </Text>
      )}

      <Text style={styles.status}>Status: {menstruation.isActive ? 'Active' : 'Completed'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  info: {
    fontSize: 14,
    marginVertical: 4,
  },
  status: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
});
