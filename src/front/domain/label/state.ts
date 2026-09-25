import { create } from "zustand";
import { api } from "../common/lib/axios";
import type { Label } from "./type";

export const useLabelStore = create<{
	labels: Label[];
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
	labels: [],

	create: async ({ name }) => {
		const response = await api.post("/labels", { name });
		const createdLabel = response.data;
		set((state) => ({
			labels: [
				...state.labels,
				{
					id: createdLabel.id,
					name: createdLabel.name,
				},
			],
		}));
	},

	getAll: async () => {
		const response: { data: Label[] } = await api.get("/labels");
		set({ labels: response.data });
	},

	update: async (id, { name }) => {
		const response = await api.patch(`labels/${id}`, {
			name
		});
		const updatedLabel = response.data;
		set((state) => ({
			labels: state.labels.map((label) =>
				label.id === id
					? {
							...label,
							name: updatedLabel.name
						}
					: label,
			),
		}));
	},

	delete: async (id) => {
		await api.delete(`/labels/${id}`);
		set((state) => ({
			labels: state.labels.filter((label) => label.id !== id),
		}));
	},
}));
