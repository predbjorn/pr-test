import { injectable, inject } from 'tsyringe';
import { Store } from '@reduxjs/toolkit';
import { Menstruation } from '../../../domain/entities/LifeContext/Menstruation';
import LifeContextRepository from '../../../domain/repositories/LifeContextRepository';
import { isMenstruation } from '../../../domain/entities/LifeContext/Menstruation';
import { setHistory, setCurrent } from '../../../infrastructure/store/slices/menstruationSlice';
import { setContexts } from '../../../infrastructure/store/slices/lifeContextSlice';

@injectable()
export class GetMenstruationUseCase {
  private CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  constructor(
    @inject('LifeContextRepository')
    private repository: LifeContextRepository<Menstruation>,
    @inject('Store')
    private store: Store
  ) {}

  async execute(id: string): Promise<Menstruation> {
    const state = this.store.getState();
    const menstruation = state.menstruation.current;

    if (menstruation && menstruation.id === id) {
      return menstruation;
    }

    const context = await this.repository.getById(id);
    if (!context || !isMenstruation(context)) {
      throw new Error('Menstruation record not found');
    }

    this.store.dispatch(setCurrent(context));
    return context;
  }

  async getAll(forceRefresh = false): Promise<Menstruation[]> {
    const state = this.store.getState();
    const { history, lastLoaded } = state.menstruation;

    if (
      !forceRefresh &&
      lastLoaded &&
      Date.now() - lastLoaded < this.CACHE_DURATION &&
      history.length > 0
    ) {
      return history;
    }

    const contexts = await this.repository.getAll();
    const menstruations = contexts.filter(isMenstruation);

    this.store.dispatch(setContexts(contexts));
    this.store.dispatch(setHistory(menstruations));

    return menstruations;
  }
}
