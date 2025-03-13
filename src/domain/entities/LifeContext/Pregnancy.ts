import { LifeContext, LifeContextType, LifeContextTypes } from './LifeContext';

export class Pregnancy implements LifeContext {
  readonly id: string;
  readonly type: LifeContextTypes;
  readonly startDate: Date;
  readonly isActive: boolean = true;
  readonly endDate?: Date;

  private trimester: number;
  private dueDate: Date;
  private weekNr: number;

  constructor(props: {
    id?: string;
    startDate: Date | string;
    dueDate: Date | string;
    weekNr?: number;
    trimester?: number;
    endDate?: Date | string;
  }) {
    this.id = props.id || Date.now().toString();
    this.type = LifeContextType.PREGNANCY;
    this.startDate = new Date(props.startDate);
    this.dueDate = new Date(props.dueDate);
    this.weekNr = props.weekNr || this.calculateWeekNr();
    this.trimester = props.trimester || this.calculateTrimester();
    if (props.endDate) {
      this.endDate = props.endDate instanceof Date ? props.endDate : new Date(props.endDate);
    }
  }

  private calculateWeekNr(): number {
    const today = new Date();
    const timeDiff = this.dueDate.getTime() - today.getTime();
    const weeksUntilDue = Math.ceil(timeDiff / (1000 * 60 * 60 * 24 * 7));
    return 42 - weeksUntilDue; // Assuming 40 weeks total pregnancy
  }

  private calculateTrimester(): number {
    const weekNr = this.weekNr;
    if (weekNr <= 13) return 1;
    if (weekNr <= 26) return 2;
    return 3;
  }

  getDueDate(): Date {
    return new Date(this.dueDate);
  }

  getWeekNr(): number {
    return this.weekNr;
  }

  getTrimester(): number {
    return this.trimester;
  }

  updateWeekNr(): void {
    this.weekNr = this.calculateWeekNr();
    this.trimester = this.calculateTrimester();
  }

  isValid(): boolean {
    return (
      this.dueDate instanceof Date &&
      !isNaN(this.dueDate.getTime()) &&
      this.weekNr >= 0 &&
      this.weekNr <= 40
    );
  }
}

export function isPregnancy(context: LifeContext): context is Pregnancy {
  return context.type === LifeContextType.PREGNANCY;
}
