// src/features/counter/counterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '~/app/store';

// 슬라이스 상태 타입 정의
interface CounterState {
  value: number;
  status: 'idle' | 'loading' | 'failed';
}

// 초기 상태 설정
const initialState: CounterState = {
  value: 0,
  status: 'idle',
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

// 액션 생성자 내보내기
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// 셀렉터 함수 내보내기
export const selectCount = (state: RootState) => state.counter.value;

// 리듀서 내보내기
export default counterSlice.reducer;