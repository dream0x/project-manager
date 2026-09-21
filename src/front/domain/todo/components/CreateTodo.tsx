import { Plus } from "@tamagui/lucide-icons-2";
import { Button, Text, XStack } from "tamagui";
import CommonDialog from "@/domain/common/CommonDialog";
import CreateTodoForm from "./CreateTodoForm";

export default function CreateTodo() {
	return (
		<CommonDialog
			trigger={
				<Button unstyled cursor="pointer">
					<XStack alignItems="center">
						<Plus />
						<Text>タスクを追加</Text>
					</XStack>
				</Button>
			}
			content={(setClose) => <CreateTodoForm closeDialog={setClose} />}
		/>
	);
}
