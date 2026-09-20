import { Plus, X } from "@tamagui/lucide-icons-2";
import { Button, Dialog, Form, Text, Unspaced, XStack } from "tamagui";

export default function AddTodo() {
	return (
		<Dialog modal>
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
						<Dialog.Title>タイトル</Dialog.Title>
						<Dialog.Description>説明</Dialog.Description>

						{/* フォーム */}
						<Form>
							<Form.Trigger asChild>
								<Button alignSelf="flex-end">追加</Button>
							</Form.Trigger>
						</Form>

						{/* 閉じるボタン */}
						<Unspaced>
							<Dialog.Close asChild>
								<Button
									cursor="pointer"
									position="absolute"
									right="$3"
									size="$2"
									circular
									icon={X}
								/>
							</Dialog.Close>
						</Unspaced>
					</Dialog.Content>
				</Dialog.FocusScope>
			</Dialog.Portal>
		</Dialog>
	);
}
