import { injectable, inject } from 'tsyringe';
import { Store } from '@reduxjs/toolkit';
import LifeContextRepository from '../../../domain/repositories/LifeContextRepository';
import { LifeContext } from '../../../domain/entities/LifeContext/LifeContext';
import { Pregnancy, isPregnancy } from '../../../domain/entities/LifeContext/Pregnancy';
import { Menstruation, isMenstruation } from '../../../domain/entities/LifeContext/Menstruation';
import { setContexts } from '../../../infrastructure/store/slices/lifeContextSlice';
import { setCurrent as setCurrentPregnancy } from '../../../infrastructure/store/slices/pregnancySlice';
import {
  setHistory,
  setCurrent as setCurrentMenstruation,
} from '../../../infrastructure/store/slices/menstruationSlice';

@injectable()
export class GetLifeContextUseCase {
  private CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  constructor(
    @inject('LifeContextRepository')
    private repository: LifeContextRepository<LifeContext>,
    @inject('Store')
    private store: Store
  ) {}

  async execute(forceRefresh = false): Promise<void> {
    const state = this.store.getState();
    const { contexts, lastLoaded } = state.lifeContext;

    // Return if cache is valid and not forcing refresh
    if (
      !forceRefresh &&
      lastLoaded &&
      Date.now() - lastLoaded < this.CACHE_DURATION &&
      contexts.length > 0
    ) {
      return;
    }

    const allContexts = await this.repository.getAll();

    // Update base LifeContext slice
    this.store.dispatch(setContexts(allContexts));

    // Filter and update Pregnancy slice
    const activePregnancy = allContexts.find(
      context => isPregnancy(context) && context.isActive
    ) as Pregnancy | undefined;
    this.store.dispatch(setCurrentPregnancy(activePregnancy || null));

    // Filter and update Menstruation slice
    const menstruations = allContexts.filter(isMenstruation) as Menstruation[];
    const activeMenstruation = menstruations.find(m => m.isActive);

    this.store.dispatch(setHistory(menstruations));
    this.store.dispatch(setCurrentMenstruation(activeMenstruation || null));
  }

  async getById(id: string): Promise<LifeContext> {
    const context = await this.repository.getById(id);
    if (!context) {
      throw new Error('Life context not found');
    }

    // Update appropriate slice based on context type
    if (isPregnancy(context)) {
      this.store.dispatch(setCurrentPregnancy(context));
    } else if (isMenstruation(context)) {
      this.store.dispatch(setCurrentMenstruation(context));
    }

    return context;
  }
}
