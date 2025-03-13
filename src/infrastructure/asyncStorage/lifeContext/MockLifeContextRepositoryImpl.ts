import { injectable } from 'tsyringe';
import LifeContextRepository from '../../../domain/repositories/LifeContextRepository';
import { LifeContext } from '../../../domain/entities/LifeContext/LifeContext';
import { Pregnancy } from '../../../domain/entities/LifeContext/Pregnancy';
import { Menstruation } from '../../../domain/entities/LifeContext/Menstruation';

@injectable()
export class MockLifeContextRepositoryImpl implements LifeContextRepository {
  private contexts: LifeContext[] = [
    new Pregnancy({
      id: '1',
      startDate: '2024-03-01',
      dueDate: '2024-12-25',
    }),
    new Menstruation({
      id: '2',
      startDate: '2024-03-10',
      endDate: '2024-03-15',
    }),
  ];

  async save(lifeContext: LifeContext): Promise<LifeContext> {
    const index = this.contexts.findIndex(c => c.id === lifeContext.id);
    if (index >= 0) {
      this.contexts[index] = lifeContext;
    } else {
      this.contexts.push(lifeContext);
    }
    return lifeContext;
  }

  async getById(id: string): Promise<LifeContext | null> {
    return this.contexts.find(c => c.id === id) || null;
  }

  async getAll(): Promise<LifeContext[]> {
    return [...this.contexts];
  }

  async delete(id: string): Promise<void> {
    this.contexts = this.contexts.filter(c => c.id !== id);
  }
}
