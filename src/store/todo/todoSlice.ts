import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type taskPriority = 'low' | 'medium' | 'high';
export interface Todo {
  id: number;
  name: string;
  priority: taskPriority;
  completed: boolean;
}
interface TodoState {
  tasks: Todo[];
  filter: 'all' | 'low' | 'medium' | 'high';
}

const initialState: TodoState = {
  tasks: [],
  filter: 'all',
};
const toDoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<{ name: string; priority: taskPriority }>) {
      state.tasks.push({
        id: Date.now(),
        name: action.payload.name,
        priority: action.payload.priority,
        completed: false,
      });
    },
    toggleCompleted(state, action: PayloadAction<number>) {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
  },
});
export const { addTask, toggleCompleted } = toDoSlice.actions;
export default toDoSlice.reducer;
