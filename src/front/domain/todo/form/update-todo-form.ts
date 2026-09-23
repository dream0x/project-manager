import z from "zod";
import type { components } from "@/domain/common/api-types";
import type { FormField } from "@/domain/common/types";

export type UpdateTodoRequest = components["schemas"]["UpdateTodoRequest"];

// スキーマ
export const updateTodoSchema = z.object({
	title: z
		.string()
		.min(1, "タイトルを入力してください")
		.max(100, "タイトルは100文字以内で入力してください"),
	description: z.string().max(500, "詳細は500文字以内で入力してください"),
	completed: z.boolean(),
}) satisfies z.ZodType<UpdateTodoRequest>;

// スキーマの型
export type updateTodoValues = z.infer<typeof updateTodoSchema>;

// フィールド
export const updateTodoFields: FormField<updateTodoValues>[] = [
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
