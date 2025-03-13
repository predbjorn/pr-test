import { LifeContext } from '../entities/LifeContext/LifeContext';

abstract class LifeContextRepository<T extends LifeContext = LifeContext> {
  abstract save(lifeContext: T): Promise<T>;
  abstract getById(id: string): Promise<T | null>;
  abstract getAll(): Promise<T[]>;
  abstract delete(id: string): Promise<void>;
}

export default LifeContextRepository;
