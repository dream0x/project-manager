import { Trash } from "@tamagui/lucide-icons-2";
import { useState } from "react";
import { AlertDialog, Button, XStack, YStack } from "tamagui";
import { useTodoStore } from "../todo/state";
import type { Todo } from "../todo/type";
import { useShowDialogOverlay } from "./state/dialogOverlay";

export default function DeleteButton(props: { todo: Todo }) {
	const [open, setOpen] = useState(false);
	const showOverlay = useShowDialogOverlay(open);
	const deleteTodo = useTodoStore((state) => state.deleteTodo);

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			{/* トリガー */}
			<AlertDialog.Trigger asChild>
				<Button
					unstyled
					position="absolute"
					justifyContent="center"
					alignItems="center"
					top="$2"
					right="$4"
					background="$red3"
					borderRadius="$2"
					borderWidth={1}
					borderColor="$red6"
					size="$4"
					iconSize="$7"
					icon={<Trash color="$red10" />}
				/>
			</AlertDialog.Trigger>

			<AlertDialog.Portal>
				{showOverlay && <AlertDialog.Overlay opacity={0.5} />}
				{/* コンテンツ */}
				<AlertDialog.Content>
					<YStack gap="$3" marginBottom="$4">
						<AlertDialog.Title>削除の確認</AlertDialog.Title>
						<AlertDialog.Description>
							本当に削除しますか？この操作は取り消せません。
						</AlertDialog.Description>
					</YStack>
					<XStack justifyContent="flex-end" gap="$4">
						{/* キャンセルボタン */}
						<AlertDialog.Cancel asChild>
							<Button>キャンセル</Button>
						</AlertDialog.Cancel>

						{/* アクションボタン */}
						<AlertDialog.Action asChild>
							<Button
								theme="accent"
								onPress={() => {
									deleteTodo(props.todo.id);
								}}
							>
								削除
							</Button>
						</AlertDialog.Action>
					</XStack>
				</AlertDialog.Content>
			</AlertDialog.Portal>
		</AlertDialog>
	);
}
