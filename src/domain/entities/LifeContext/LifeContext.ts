// Enum-like constants
export const LifeContextType = {
  PREGNANCY: 'PREGNANCY',
  PARENTING: 'PARENTING',
  MENSTRUATION: 'MENSTRUATION',
  ABORTION: 'ABORTION',
} as const;

// Type for the values
export type LifeContextTypes = (typeof LifeContextType)[keyof typeof LifeContextType];

export interface LifeContext {
  id: string;
  type: LifeContextTypes;
  startDate: Date;
  endDate?: Date;
  isActive: boolean;
}
