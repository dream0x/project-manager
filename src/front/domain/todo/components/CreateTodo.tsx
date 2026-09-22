import { Plus } from "@tamagui/lucide-icons-2";
import { Button, Text, XStack } from "tamagui";
import CommonDialog from "@/domain/common/CommonDialog";
import CommonForm from "@/domain/common/CommonForm";
import {
	fields,
	type TodoUpsertFormValues,
	todoUpsertFormSchema,
} from "../form";
import { useTodoStore } from "../state";

// デフォルト値
const defaultValues: TodoUpsertFormValues = {
	title: "",
	description: "",
};

export default function CreateTodo() {
	const createTodo = useTodoStore((state) => state.createTodo);

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
					schema={todoUpsertFormSchema}
					defaultValues={defaultValues}
					formFields={fields}
					onSubmit={async ({ title, description }: TodoUpsertFormValues) => {
						await createTodo(title, description);
						setClose();
					}}
					submitLabel="作成"
				/>
			)}
		/>
	);
}
