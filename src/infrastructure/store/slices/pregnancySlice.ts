import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pregnancy } from '../../../domain/entities/LifeContext/Pregnancy';

interface PregnancyState {
  current: Pregnancy | null;
  weekNumber: number | null;
  trimester: number | null;
}

const initialState: PregnancyState = {
  current: null,
  weekNumber: null,
  trimester: null,
};

const pregnancySlice = createSlice({
  name: 'pregnancy',
  initialState,
  reducers: {
    setCurrent: (state, action: PayloadAction<Pregnancy | null>) => {
      state.current = action.payload;
      if (action.payload) {
        state.weekNumber = action.payload.getWeekNr();
        state.trimester = action.payload.getTrimester();
      } else {
        state.weekNumber = null;
        state.trimester = null;
      }
    },
    updateWeek: (state, action: PayloadAction<Pregnancy>) => {
      state.current = action.payload;
      state.weekNumber = action.payload.getWeekNr();
      state.trimester = action.payload.getTrimester();
    },
  },
});

export const { setCurrent, updateWeek } = pregnancySlice.actions;
export default pregnancySlice.reducer;
