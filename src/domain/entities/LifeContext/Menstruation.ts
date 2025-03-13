import { LifeContext, LifeContextType, LifeContextTypes } from './LifeContext';

export class Menstruation implements LifeContext {
  readonly id: string;
  readonly type: LifeContextTypes;
  readonly startDate: Date;
  readonly isActive: boolean = true;
  readonly endDate?: Date;

  private cycleLength?: number | null;

  constructor(props: { id?: string; startDate: Date | string; endDate?: Date | string | null }) {
    this.id = props.id || Date.now().toString();
    this.type = LifeContextType.MENSTRUATION;
    this.startDate = new Date(props.startDate);
    if (props.endDate) {
      this.endDate = props.endDate instanceof Date ? props.endDate : new Date(props.endDate);
      this.cycleLength = this.calculateCycleLength();
    }
  }

  isValid(): boolean {
    return this.startDate instanceof Date && !isNaN(this.startDate.getTime());
  }

  private calculateCycleLength(): number {
    if (!this.endDate) return 0;
    return Math.round((this.endDate.getTime() - this.startDate.getTime()) / (1000 * 60 * 60 * 24));
  }

  getCycleLength(): number | null {
    return this.cycleLength || null;
  }

  getEndDate(): Date | null {
    return this.endDate || null;
  }
}

export function isMenstruation(context: LifeContext): context is Menstruation {
  return context.type === LifeContextType.MENSTRUATION;
}
