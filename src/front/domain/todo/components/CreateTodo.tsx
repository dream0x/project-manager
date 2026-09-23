import { Plus } from "@tamagui/lucide-icons-2";
import { Button, Text, XStack } from "tamagui";
import CommonDialog from "@/domain/common/CommonDialog";
import CommonForm from "@/domain/common/CommonForm";
import {
	createTodoFields,
	createTodoSchema,
	type createTodoValues,
} from "../form/create-todo-form";
import { useTodoStore } from "../state";

export default function CreateTodo() {
	const createTodo = useTodoStore((state) => state.create);

	// フォームのデフォルト値
	const createTodoDefaultValues: createTodoValues = {
		title: "",
		description: "",
	};

	return (
		<CommonDialog
			trigger={
				<Button
					unstyled
					cursor="pointer"
					borderRadius="$2"
					borderWidth={1}
					borderColor="lightgray"
					padding="$2"
				>
					<XStack alignItems="center">
						<Plus />
						<Text>タスクを追加</Text>
					</XStack>
				</Button>
			}
			content={(setClose) => (
				<CommonForm
					schema={createTodoSchema}
					defaultValues={createTodoDefaultValues}
					formFields={createTodoFields}
					onSubmit={async ({ title, description }: createTodoValues) => {
						await createTodo(title, description);
						setClose();
					}}
					submitLabel="作成"
				/>
			)}
		/>
	);
}
