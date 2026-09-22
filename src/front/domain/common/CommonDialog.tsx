import { type ReactElement, useState } from "react";
import { Dialog, Unspaced } from "tamagui";
import { useShowDialogOverlay } from "./state/dialogOverlay";

/**
 * 共通ダイアログ
 */
export default function CommonDialog(props: {
	trigger: ReactElement;
	content: (onClose: () => void) => ReactElement;
	menuItems?: ReactElement;
}) {
	const [open, setOpen] = useState(false);
	const showOverlay = useShowDialogOverlay(open);

	return (
		<Dialog modal open={open} onOpenChange={setOpen}>
			{/* 開くボタン */}
			<Dialog.Trigger asChild>{props.trigger}</Dialog.Trigger>

			{/* コンテンツ */}
			<Dialog.Portal>
				{showOverlay && <Dialog.Overlay opacity={0.5} />}
				<Dialog.FocusScope focusOnIdle>
					<Dialog.Content
						width="100%"
						$xl={{ width: "50%" }}
						transition="250ms"
						enterStyle={{ opacity: 0 }}
					>
						<Dialog.Title></Dialog.Title>
						<Dialog.Description></Dialog.Description>

						{/* メニューアイテム */}
						<Unspaced>{props.menuItems && props.menuItems}</Unspaced>

						{/* コンテンツ */}
						{props.content(() => setOpen(false))}
					</Dialog.Content>
				</Dialog.FocusScope>
			</Dialog.Portal>
		</Dialog>
	);
}
