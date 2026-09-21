import { zodResolver } from "@hookform/resolvers/zod";
import {
	Controller,
	type DefaultValues,
	type FieldValues,
	type Resolver,
	useForm,
} from "react-hook-form";
import { Button, Input, Label, Text, YStack } from "tamagui";
import type { z } from "zod";
import type { FormField } from "./types";

export default function CommonForm<
	TValues extends FieldValues & Record<string, string>,
>(props: {
	schema: z.ZodObject<z.ZodRawShape>;
	defaultValues: DefaultValues<TValues>;
	fields: FormField<TValues>[];
	onSubmit: (values: TValues) => Promise<void> | void;
	submitLabel: string;
}) {
	// フォームの初期化
	const { control, handleSubmit, formState, reset } = useForm<TValues>({
		resolver: zodResolver(props.schema) as Resolver<TValues>,
		defaultValues: props.defaultValues,
	});

	// フォーム送信時処理
	const submit = async (values: TValues) => {
		await props.onSubmit(values);
		reset();
	};

	return (
		<YStack gap="$4">
			{props.fields.map((field) => (
				<YStack key={field.name}>
					<Label htmlFor={field.name}>{field.label}</Label>

					<Controller<TValues>
						control={control}
						name={field.name}
						render={({ field: controllerField, fieldState }) => (
							<YStack gap="$2">
								<Input
									id={field.name}
									size="$4"
									placeholder={field.placeholder}
									value={controllerField.value}
									onChangeText={controllerField.onChange}
									onBlur={controllerField.onBlur}
								/>

								{fieldState.error && (
									<Text color="$red10" fontSize="$2">
										{fieldState.error.message}
									</Text>
								)}
							</YStack>
						)}
					/>
				</YStack>
			))}

			<Button onPress={handleSubmit(submit)} disabled={formState.isSubmitting}>
				{props.submitLabel}
			</Button>
		</YStack>
	);
}
