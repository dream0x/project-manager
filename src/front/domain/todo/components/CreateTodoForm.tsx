import { z } from "zod";
import CommonForm from "@/domain/common/CommonForm";
import type { FormField } from "@/domain/common/types";
import { useTodoStore } from "@/domain/todo/state";

// スキーマ
const todoUpsertFormSchema = z.object({
	title: z
		.string()
		.min(1, "タイトルを入力してください")
		.max(100, "タイトルは100文字以内で入力してください"),
	description: z.string().max(500, "詳細は500文字以内で入力してください"),
});
type TodoUpsertFormValues = z.infer<typeof todoUpsertFormSchema>;

// デフォルト値
const defaultValues: TodoUpsertFormValues = {
	title: "",
	description: "",
};

// フォームフィールド
const fields: FormField<TodoUpsertFormValues>[] = [
	{
		name: "title",
		label: "タイトル",
		placeholder: "タイトルを入力してください",
	},
	{
		name: "description",
		label: "詳細",
		placeholder: "詳細を入力してください",
	},
];

export default function CreateTodoForm(props: { closeDialog: () => void }) {
	const createTodo = useTodoStore((state) => state.createTodo);

	const onSubmit = async ({ title, description }: TodoUpsertFormValues) => {
		await createTodo(title, description);
		props.closeDialog();
	};

	return (
		<CommonForm
			schema={todoUpsertFormSchema}
			defaultValues={defaultValues}
			fields={fields}
			onSubmit={onSubmit}
			submitLabel="作成"
		/>
	);
}
