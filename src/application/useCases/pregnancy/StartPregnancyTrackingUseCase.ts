import { injectable, inject } from 'tsyringe';
import { Store } from '@reduxjs/toolkit';
import { Pregnancy } from '../../../domain/entities/LifeContext/Pregnancy';
import LifeContextRepository from '../../../domain/repositories/LifeContextRepository';
import { setCurrent } from '../../../infrastructure/store/slices/pregnancySlice';
import { addContext } from '../../../infrastructure/store/slices/lifeContextSlice';

interface StartPregnancyTrackingParams {
  startDate: string;
  dueDate: string;
}

@injectable()
export class StartPregnancyTrackingUseCase {
  constructor(
    @inject('LifeContextRepository')
    private repository: LifeContextRepository<Pregnancy>,
    @inject('Store')
    private store: Store
  ) {}

  async execute({ startDate, dueDate }: StartPregnancyTrackingParams): Promise<Pregnancy> {
    const pregnancy = new Pregnancy({
      startDate,
      dueDate,
    });

    if (!pregnancy.isValid()) {
      throw new Error('Invalid pregnancy data');
    }

    const saved = await this.repository.save(pregnancy);

    this.store.dispatch(setCurrent(saved));
    this.store.dispatch(addContext(saved));

    return saved;
  }
}
