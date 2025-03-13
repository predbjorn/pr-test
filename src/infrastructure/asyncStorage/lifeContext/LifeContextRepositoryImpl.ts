import { injectable } from 'tsyringe';
import AsyncStorage from '@react-native-community/async-storage';
import LifeContextRepository from '../../../domain/repositories/LifeContextRepository';
import { LifeContext } from '../../../domain/entities/LifeContext/LifeContext';
import { Pregnancy } from '../../../domain/entities/LifeContext/Pregnancy';
import { Menstruation } from '../../../domain/entities/LifeContext/Menstruation';

@injectable()
export class LifeContextRepositoryImpl implements LifeContextRepository {
  private readonly STORAGE_KEY = 'life_contexts';

  private deserializeLifeContext(data: any): LifeContext {
    switch (data.type) {
      case 'PREGNANCY':
        return new Pregnancy({
          id: data.id,
          startDate: data.startDate,
          dueDate: data.dueDate,
          weekNr: data.weekNr,
          trimester: data.trimester,
          endDate: data.endDate,
        });
      case 'MENSTRUATION':
        return new Menstruation(data);
      default:
        throw new Error(`Unknown life context type: ${data.type}`);
    }
  }

  async save(lifeContext: LifeContext): Promise<LifeContext> {
    const contexts = await this.getAll();
    const index = contexts.findIndex(c => c.id === lifeContext.id);

    const contextToSave = this.deserializeLifeContext(lifeContext);

    if (index >= 0) {
      contexts[index] = contextToSave;
    } else {
      contexts.push(contextToSave);
    }

    await AsyncStorage.setItem(this.STORAGE_KEY, JSON.stringify(contexts));
    return contextToSave;
  }

  async getById(id: string): Promise<LifeContext | null> {
    const contexts = await this.getAll();
    const contextData = contexts.find(c => c.id === id);
    return contextData ? this.deserializeLifeContext(contextData) : null;
  }

  async getAll(): Promise<LifeContext[]> {
    const data = await AsyncStorage.getItem(this.STORAGE_KEY);
    const contexts = data ? JSON.parse(data) : [];
    return contexts.map(this.deserializeLifeContext);
  }

  async delete(id: string): Promise<void> {
    const contexts = await this.getAll();
    const filtered = contexts.filter(c => c.id !== id);
    await AsyncStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered));
  }
}
