import type { Control, FieldValues, Path } from "react-hook-form";
import { Input } from "tamagui";
import FormField from "./FormField";

export default function FormInput<T extends FieldValues>(props: {
	control: Control<T>;
	id: Path<T>;
	label: string;
	placeholder: string;
}) {
	return (
		<FormField
			control={props.control}
			id={props.id}
			label={props.label}
			placeholder={props.placeholder}
		>
			{({ field }) => (
				<Input
					size="$4"
					id={props.id}
					placeholder={props.placeholder}
					value={field.value}
					onChangeText={field.onChange}
					onBlur={field.onBlur}
				/>
			)}
		</FormField>
	);
}
