import { container } from 'tsyringe';
import { store } from '../store/store';
import LifeContextRepository from '../../domain/repositories/LifeContextRepository';
import { LifeContextRepositoryImpl } from '../asyncStorage/lifeContext/LifeContextRepositoryImpl';
import { MockLifeContextRepositoryImpl } from '../asyncStorage/lifeContext/MockLifeContextRepositoryImpl';

const isDevelopment = __DEV__;

container.registerInstance('Store', store);

container.registerSingleton<LifeContextRepository>(
  'LifeContextRepository',
  isDevelopment ? MockLifeContextRepositoryImpl : LifeContextRepositoryImpl
);

export { container };
