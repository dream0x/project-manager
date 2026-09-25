import { create } from "zustand";
import { api } from "../common/lib/axios";
import type { Resource } from "./type";

export const useResourceStore = create<{
	resources: Resource[];
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
	resources: [],

	create: async ({ name }) => {
		const response = await api.post("/resources", { name });
		const createdResource = response.data;
		set((state) => ({
			resources: [
				...state.resources,
				{
					id: createdResource.id,
					name: createdResource.name,
				},
			],
		}));
	},

	getAll: async () => {
		const response: { data: Resource[] } = await api.get("/resources");
		set({ resources: response.data });
	},

	update: async (id, { name }) => {
		const response = await api.patch(`resources/${id}`, {
			name
		});
		const updatedResource = response.data;
		set((state) => ({
			resources: state.resources.map((resource) =>
				resource.id === id
					? {
							...resource,
							name: updatedResource.name
						}
					: resource,
			),
		}));
	},

	delete: async (id) => {
		await api.delete(`/resources/${id}`);
		set((state) => ({
			resources: state.resources.filter((resource) => resource.id !== id),
		}));
	},
}));
