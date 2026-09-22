import z from "zod";
import type { FormField } from "@/domain/common/types";

// スキーマ
export const todoUpsertFormSchema = z.object({
	title: z
		.string()
		.min(1, "タイトルを入力してください")
		.max(100, "タイトルは100文字以内で入力してください"),
	description: z.string().max(500, "詳細は500文字以内で入力してください"),
});

// スキーマの型
export type TodoUpsertFormValues = z.infer<typeof todoUpsertFormSchema>;

// フォームフィールド
export const fields: FormField<TodoUpsertFormValues>[] = [
	{
		type: "input",
		name: "title",
		label: "タイトル",
		placeholder: "タイトルを入力してください",
	},
	{
		type: "textarea",
		name: "description",
		label: "詳細",
		placeholder: "詳細を入力してください",
	},
];
