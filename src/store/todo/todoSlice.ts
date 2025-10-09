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
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },
    setFilter: (state, action: PayloadAction<'all' | 'low' | 'medium' | 'high'>) => {
      state.filter = action.payload;
    },
    editTask: (state, action: PayloadAction<{ id: number; name: string }>) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task && task.name !== action.payload.name) {
        task.name = action.payload.name;
      }
    },
  },
});
export const { addTask, toggleCompleted, deleteTask, setFilter, editTask } = toDoSlice.actions;
export default toDoSlice.reducer;
