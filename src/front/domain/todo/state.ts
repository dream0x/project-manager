import { create } from "zustand";
import { api } from "../common/lib/axios";
import type { Todo } from "./type";

export const useTodoStore = create<{
	todos: Todo[];
	getAll: () => Promise<void>;
	create: (title: string, description?: string) => void;
	update: (
		id: number,
		title: string,
		description: string,
		completed: boolean,
	) => void;
	delete: (id: number) => void;
}>((set) => ({
	todos: [],

	create: async (title, description) => {
		const response = await api.post("/todos", { title, description });
		const createdTodo = response.data;
		set((state) => ({
			todos: [
				...state.todos,
				{
					id: createdTodo.id,
					title: createdTodo.title,
					description: createdTodo.description,
					completed: createdTodo.completed,
				},
			],
		}));
	},

	getAll: async () => {
		const response: { data: Todo[] } = await api.get("/todos");
		set({ todos: response.data });
	},

	update: async (id, title, description, completed) => {
		const response = await api.patch(`todos/${id}`, {
			title,
			description,
			completed,
		});
		const updatedTodo = response.data;
		set((state) => ({
			todos: state.todos.map((todo) =>
				todo.id === id
					? {
							...todo,
							title: updatedTodo.title,
							description: updatedTodo.description,
							completed: updatedTodo.completed,
						}
					: todo,
			),
		}));
	},

	delete: async (id) => {
		await api.delete(`/todos/${id}`);
		set((state) => ({
			todos: state.todos.filter((todo) => todo.id !== id),
		}));
	},
}));
