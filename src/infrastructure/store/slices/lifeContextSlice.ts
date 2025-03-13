import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LifeContext } from '../../../domain/entities/LifeContext/LifeContext';

interface LifeContextState {
  contexts: LifeContext[];
  loading: boolean;
  error: string | null;
}

const initialState: LifeContextState = {
  contexts: [],
  loading: false,
  error: null,
};

const lifeContextSlice = createSlice({
  name: 'lifeContext',
  initialState,
  reducers: {
    setContexts: (state, action: PayloadAction<LifeContext[]>) => {
      state.contexts = action.payload;
    },
    addContext: (state, action: PayloadAction<LifeContext>) => {
      state.contexts.push(action.payload);
    },
    updateContext: (state, action: PayloadAction<LifeContext>) => {
      const index = state.contexts.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.contexts[index] = action.payload;
      }
    },
    removeContext: (state, action: PayloadAction<string>) => {
      state.contexts = state.contexts.filter(c => c.id !== action.payload);
    },
  },
});

export const { setContexts, addContext, updateContext, removeContext } = lifeContextSlice.actions;
export default lifeContextSlice.reducer;
