import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Text,
  RefreshControl,
} from 'react-native';
import { useLifeContext } from '../hooks/useLifeContext';
import { MenstruationCard } from '../components/MenstruationCard';
import { PregnancyCard } from '../components/PregnancyCard';

export const StatusScreen: React.FC = () => {
  const { menstruations, pregnancy, loading, error, loadLifeContexts, updatePregnancyWeek } =
    useLifeContext();

  if (loading && !menstruations.length) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={() => loadLifeContexts(true)} />
      }
    >
      {pregnancy && (
        <PregnancyCard
          pregnancy={pregnancy}
          onUpdateWeek={() => updatePregnancyWeek(pregnancy.id)}
        />
      )}

      {menstruations.map(menstruation => (
        <MenstruationCard key={menstruation.id} menstruation={menstruation} />
      ))}

      {!pregnancy && menstruations.length === 0 && (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No life contexts found</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    margin: 16,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    color: '#666',
    fontSize: 16,
  },
});
