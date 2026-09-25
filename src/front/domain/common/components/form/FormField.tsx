import type React from "react";
import {
	type Control,
	Controller,
	type ControllerRenderProps,
	type FieldValues,
	type Path,
} from "react-hook-form";
import { Label, Text, YStack } from "tamagui";

export default function FormField<T extends FieldValues>(props: {
	control: Control<T>;
	id: Path<T>;
	label: string;
	placeholder?: string;
	children: (props: {
		field: ControllerRenderProps<T, Path<T>>;
	}) => React.JSX.Element;
}) {
	return (
		<YStack>
			{/* フォームラベル */}
			<Label htmlFor={props.id}>{props.label}</Label>
			<Controller
				control={props.control}
				name={props.id}
				render={({ field, fieldState }) => (
					<YStack gap="$2">
						{/* 入力欄 */}
						{props.children({ field })}
						{/* エラーメッセージ */}
						{fieldState.error && (
							<Text color="$red10" fontSize="$2">
								{fieldState.error.message}
							</Text>
						)}
					</YStack>
				)}
			/>
		</YStack>
	);
}
