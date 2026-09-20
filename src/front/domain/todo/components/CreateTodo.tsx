import { Plus, X } from "@tamagui/lucide-icons-2";
import { useState } from "react";
import { Button, Dialog, Text, Unspaced, XStack } from "tamagui";
import CreateTodoForm from "./CreateTodoForm";

export default function CreateTodo() {
	const [open, setOpen] = useState(false);

	return (
		<Dialog modal open={open} onOpenChange={setOpen}>
			{/* 開くボタン */}
			<Dialog.Trigger asChild>
				<Button unstyled cursor="pointer">
					<XStack alignItems="center">
						<Plus />
						<Text>タスクを追加</Text>
					</XStack>
				</Button>
			</Dialog.Trigger>

			{/* コンテンツ */}
			<Dialog.Portal>
				<Dialog.Overlay background="$background" opacity={0.5} />
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

						{/* フォーム */}
						<CreateTodoForm onSuccess={() => setOpen(false)} />
					</Dialog.Content>
				</Dialog.FocusScope>
			</Dialog.Portal>
		</Dialog>
	);
}
