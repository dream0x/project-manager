import z from "zod";
import type { components } from "@/domain/common/api-types";
import type { FormField } from "@/domain/common/types";

export type CreateTodoRequest = components["schemas"]["CreateTodoRequest"];

// スキーマ
export const createTodoSchema = z.object({
	title: z
		.string()
		.min(1, "タイトルを入力してください")
		.max(100, "タイトルは100文字以内で入力してください"),
	description: z
		.string()
		.max(500, "詳細は500文字以内で入力してください")
		.optional(),
}) satisfies z.ZodType<CreateTodoRequest>;

// スキーマの型
export type createTodoValues = z.infer<typeof createTodoSchema>;

// フィールド
export const createTodoFields: FormField<createTodoValues>[] = [
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
