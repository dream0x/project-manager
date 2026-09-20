import { create } from "zustand";
import type { Todo } from "../types/todo";

export const useTodoStore = create<{
	todos: Todo[];
	createTodo: (title: string, description: string) => void;
	toggleTodo: (id: number) => void;
	deleteTodo: (id: number) => void;
}>((set) => ({
	todos: [
		{
			id: 1,
			title: "掃除",
			description: "部屋を掃除する",
			completed: false,
		},
		{
			id: 2,
			title: "運動",
			description: "毎日運動する",
			completed: false,
		},
		{
			id: 3,
			title: "プログラミング",
			description: "毎日プログラミングする",
			completed: true,
		},
	],

	createTodo: async (title, description) =>
		set((state) => ({
			todos: [
				...state.todos,
				{
					id: Date.now(),
					title,
					description,
					completed: false,
				},
			],
		})),

	toggleTodo: async (id) =>
		set((state) => ({
			todos: state.todos.map((todo) =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo,
			),
		})),
	deleteTodo: async (id) =>
		set((state) => ({
			todos: state.todos.filter((todo) => todo.id !== id),
		})),
}));
