import type { FieldValues, Path } from "react-hook-form";

export type FormField<TValues extends FieldValues> = {
	name: Path<TValues>;
	label: string;
	placeholder?: string;
};
