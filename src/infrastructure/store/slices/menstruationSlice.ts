import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Menstruation } from '../../../domain/entities/LifeContext/Menstruation';

interface MenstruationState {
  current: Menstruation | null;
  history: Menstruation[];
}

const initialState: MenstruationState = {
  current: null,
  history: [],
};

const menstruationSlice = createSlice({
  name: 'menstruation',
  initialState,
  reducers: {
    setCurrent: (state, action: PayloadAction<Menstruation | null>) => {
      state.current = action.payload;
    },
    setHistory: (state, action: PayloadAction<Menstruation[]>) => {
      state.history = action.payload;
    },
    addToHistory: (state, action: PayloadAction<Menstruation>) => {
      state.history.push(action.payload);
    },
    updateInHistory: (state, action: PayloadAction<Menstruation>) => {
      const index = state.history.findIndex(m => m.id === action.payload.id);
      if (index !== -1) {
        state.history[index] = action.payload;
      }
    },
  },
});

export const { setCurrent, setHistory, addToHistory, updateInHistory } = menstruationSlice.actions;
export default menstruationSlice.reducer;
