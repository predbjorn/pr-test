import { container } from 'tsyringe';
import { useState, useCallback } from 'react';
import { TrackCycleUseCase } from '../../application/useCases/cycle/TrackCycleUseCase';
import { LogSymptomsUseCase } from '../../application/useCases/cycle/LogSymptomsUseCase';
import { Cycle } from '../../domain/entities/cycle/Cycle';

export const useCycleTracking = () => {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const trackCycleUseCase = container.resolve(TrackCycleUseCase);
  const logSymptomsUseCase = container.resolve(LogSymptomsUseCase);

  const loadCycles = useCallback(async () => {
    try {
      setLoading(true);
      const data = await trackCycleUseCase.getAll();
      //   console.log('data', data);
      setCycles(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load cycles');
    } finally {
      setLoading(false);
    }
  }, []);

  const startNewCycle = useCallback(
    async (startDate: string) => {
      try {
        setLoading(true);
        await trackCycleUseCase.execute({ startDate });
        await loadCycles();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to start cycle');
      } finally {
        setLoading(false);
      }
    },
    [loadCycles]
  );

  const completeCycle = useCallback(
    async (cycleId: string, endDate: string) => {
      try {
        setLoading(true);
        await trackCycleUseCase.execute({ cycleId, endDate });
        await loadCycles();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to complete cycle');
      } finally {
        setLoading(false);
      }
    },
    [loadCycles]
  );

  const logSymptom = useCallback(
    async (cycleId: string, symptom: string, date: string) => {
      try {
        setLoading(true);
        await logSymptomsUseCase.execute({ moduleId: cycleId, symptom, date });
        await loadCycles();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to log symptom');
      } finally {
        setLoading(false);
      }
    },
    [loadCycles]
  );

  return {
    cycles,
    loading,
    error,
    loadCycles,
    startNewCycle,
    completeCycle,
    logSymptom,
  };
};
