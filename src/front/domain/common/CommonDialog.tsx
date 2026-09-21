import { X } from "@tamagui/lucide-icons-2";
import { type ReactElement, useState } from "react";
import { Button, Dialog, Unspaced } from "tamagui";

export default function CommonDialog(props: {
	trigger: ReactElement;
	content: (onClose: () => void) => ReactElement;
}) {
	const [open, setOpen] = useState(false);

	return (
		<Dialog modal open={open} onOpenChange={setOpen}>
			{/* 開くボタン */}
			<Dialog.Trigger asChild>{props.trigger}</Dialog.Trigger>

			{/* コンテンツ */}
			<Dialog.Portal>
				<Dialog.Overlay background="$background" />
				<Dialog.FocusScope focusOnIdle>
					<Dialog.Content
						width="50%"
						transition="250ms"
						enterStyle={{ opacity: 0 }}
					>
						<Dialog.Title></Dialog.Title>

						{/* 閉じるボタン */}
						<Unspaced>
							<Dialog.Close asChild>
								<Button
									cursor="pointer"
									alignSelf="flex-end"
									size="$2"
									circular
									icon={X}
								/>
							</Dialog.Close>
						</Unspaced>

						{/* コンテンツ */}
						{props.content(() => setOpen(false))}
					</Dialog.Content>
				</Dialog.FocusScope>
			</Dialog.Portal>
		</Dialog>
	);
}
