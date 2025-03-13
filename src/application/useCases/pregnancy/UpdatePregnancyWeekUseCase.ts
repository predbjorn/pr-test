import { injectable, inject } from 'tsyringe';
import { Store } from '@reduxjs/toolkit';
import { Pregnancy } from '../../../domain/entities/LifeContext/Pregnancy';
import LifeContextRepository from '../../../domain/repositories/LifeContextRepository';
import { isPregnancy } from '../../../domain/entities/LifeContext/Pregnancy';
import { updateWeek } from '../../../infrastructure/store/slices/pregnancySlice';
import { updateContext } from '../../../infrastructure/store/slices/lifeContextSlice';

@injectable()
export class UpdatePregnancyWeekUseCase {
  constructor(
    @inject('LifeContextRepository')
    private repository: LifeContextRepository<Pregnancy>,
    @inject('Store')
    private store: Store
  ) {}

  async execute(pregnancyId: string): Promise<Pregnancy> {
    const context = await this.repository.getById(pregnancyId);

    if (!context || !isPregnancy(context)) {
      throw new Error('Pregnancy module not found');
    }

    context.updateWeekNr();
    const updated = await this.repository.save(context);

    this.store.dispatch(updateWeek(updated));
    this.store.dispatch(updateContext(updated));

    return updated;
  }
}
