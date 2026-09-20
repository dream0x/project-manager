import { create } from "zustand";
import type { Todo } from "../types/todo";

export const useTodoStore = create<{
	todos: Todo[];
	addTodo: (title: string) => void;
	toggleTodo: (id: number) => void;
}>((set) => ({
	todos: [
		{
			id: 1,
			title: "掃除",
			completed: false,
		},
		{
			id: 2,
			title: "運動",
			completed: false,
		},
		{
			id: 3,
			title: "プログラミング",
			completed: true,
		},
	],

	addTodo: (title) =>
		set((state) => ({
			todos: [
				...state.todos,
				{
					id: Date.now(),
					title,
					completed: false,
				},
			],
		})),

	toggleTodo: (id) =>
		set((state) => ({
			todos: state.todos.map((todo) =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo,
			),
		})),
}));
