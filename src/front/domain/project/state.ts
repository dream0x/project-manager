import { create } from "zustand";
import { api } from "../common/lib/axios";
import type { Project } from "./type";

export const useProjectStore = create<{
	projects: Project[];
	getAll: () => Promise<void>;
	create: (values: { name: string; }) => void;
	update: (
		id: number,
		values: {
			name: string;
		},
	) => void;
	delete: (id: number) => void;
}>((set) => ({
	projects: [],

	create: async ({ name }) => {
		const response = await api.post("/projects", { name });
		const createdProject = response.data;
		set((state) => ({
			projects: [
				...state.projects,
				{
					id: createdProject.id,
					name: createdProject.name,
				},
			],
		}));
	},

	getAll: async () => {
		const response: { data: Project[] } = await api.get("/projects");
		set({ projects: response.data });
	},

	update: async (id, { name }) => {
		const response = await api.patch(`projects/${id}`, {
			name
		});
		const updatedProject = response.data;
		set((state) => ({
			projects: state.projects.map((project) =>
				project.id === id
					? {
							...project,
							name: updatedProject.name
						}
					: project,
			),
		}));
	},

	delete: async (id) => {
		await api.delete(`/projects/${id}`);
		set((state) => ({
			projects: state.projects.filter((project) => project.id !== id),
		}));
	},
}));
