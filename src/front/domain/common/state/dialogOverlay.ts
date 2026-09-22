import { useEffect, useId } from "react";
import { create } from "zustand";

const useDialogStackStore = create<{
	dialogIds: string[];
	addDialog: (id: string) => void;
	removeDialog: (id: string) => void;
}>((set) => ({
	dialogIds: [],
	addDialog: (id) => set((state) => ({ dialogIds: [...state.dialogIds, id] })),
	removeDialog: (id) =>
		set((state) => ({
			dialogIds: state.dialogIds.filter((stackId) => stackId !== id),
		})),
}));

/**
 * ネストされたダイアログが重なって開いた際、オーバーレイが重複して
 * 表示されないよう、一番上（最後に開いた）のダイアログのみで true を返す
 */
export function useShowDialogOverlay(open: boolean) {
	const id = useId();
	const isTop = useDialogStackStore(
		(state) => state.dialogIds[state.dialogIds.length - 1] === id,
	);

	useEffect(() => {
		if (!open) return;
		useDialogStackStore.getState().addDialog(id);
		return () => useDialogStackStore.getState().removeDialog(id);
	}, [open, id]);

	return open && isTop;
}
