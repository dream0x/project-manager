import type { FieldValues, Path } from "react-hook-form";

// フォームフィールドの種類
export type FieldType = "input" | "textarea";

// フォームフィールドの型定義
export type FormField<TValues extends FieldValues> = {
	type: FieldType;
	name: Path<TValues>;
	label: string;
	placeholder?: string;
};
