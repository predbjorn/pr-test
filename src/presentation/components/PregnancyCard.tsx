import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Pregnancy } from '../../domain/entities/LifeContext/Pregnancy';

interface PregnancyCardProps {
  pregnancy: Pregnancy;
  onUpdateWeek?: () => void;
}

export const PregnancyCard: React.FC<PregnancyCardProps> = ({ pregnancy, onUpdateWeek }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Pregnancy</Text>
        <Text style={styles.date}>Started: {pregnancy.startDate.toLocaleDateString()}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.infoText}>Week: {pregnancy.getWeekNr()}</Text>
        <Text style={styles.infoText}>Trimester: {pregnancy.getTrimester()}</Text>
        <Text style={styles.infoText}>Due Date: {pregnancy.getDueDate().toLocaleDateString()}</Text>
      </View>

      {onUpdateWeek && (
        <TouchableOpacity style={styles.button} onPress={onUpdateWeek}>
          <Text style={styles.buttonText}>Update Week</Text>
        </TouchableOpacity>
      )}
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
    marginBottom: 12,
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
    marginVertical: 8,
  },
  infoText: {
    fontSize: 14,
    marginVertical: 2,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
});
