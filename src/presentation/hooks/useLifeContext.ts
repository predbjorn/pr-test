import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { container } from 'tsyringe';
import { GetLifeContextUseCase } from '../../application/useCases/lifeContext/GetLifeContextUseCase';
import { UpdatePregnancyWeekUseCase } from '../../application/useCases/pregnancy/UpdatePregnancyWeekUseCase';
import { RootState } from '../../infrastructure/store/store';

export const useLifeContext = () => {
  const { contexts, loading, error } = useSelector((state: RootState) => state.lifeContext);
  const { current: pregnancy } = useSelector((state: RootState) => state.pregnancy);
  const { history: menstruations } = useSelector((state: RootState) => state.menstruation);

  const getLifeContextUseCase = container.resolve(GetLifeContextUseCase);
  const updatePregnancyWeekUseCase = container.resolve(UpdatePregnancyWeekUseCase);

  const loadLifeContexts = useCallback(async (forceRefresh = false) => {
    try {
      await getLifeContextUseCase.execute(forceRefresh);
    } catch (err) {
      console.error('Failed to load life contexts:', err);
    }
  }, []);

  const updatePregnancyWeek = useCallback(
    async (pregnancyId: string) => {
      try {
        await updatePregnancyWeekUseCase.execute(pregnancyId);
        // Refresh contexts after update
        await loadLifeContexts(true);
      } catch (err) {
        console.error('Failed to update pregnancy week:', err);
      }
    },
    [loadLifeContexts]
  );

  // Load contexts on mount
  useEffect(() => {
    loadLifeContexts();
  }, [loadLifeContexts]);

  return {
    contexts,
    menstruations,
    pregnancy,
    loading,
    error,
    loadLifeContexts,
    updatePregnancyWeek,
  };
};
