import type React from "react";
import type { FormState, UseFormHandleSubmit } from "react-hook-form";
import { Button, YStack } from "tamagui";

export default function FormArea<T>(props: {
	children: React.JSX.Element;
	handleSubmit: UseFormHandleSubmit<any>;
	submit: (args: T) => void;
	formState: FormState<any>;
	submitLabel: string;
}) {
	return (
		<YStack gap="$4">
			{props.children}

			{/* 送信ボタン */}
			<Button
				onPress={props.handleSubmit(props.submit)}
				disabled={props.formState.isSubmitting}
			>
				{props.submitLabel}
			</Button>
		</YStack>
	);
}
