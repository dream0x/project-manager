import { zodResolver } from "@hookform/resolvers/zod";
import {
	Controller,
	type ControllerRenderProps,
	type DefaultValues,
	type FieldValues,
	type Path,
	type Resolver,
	useForm,
} from "react-hook-form";
import { Button, Input, Label, Text, TextArea, YStack } from "tamagui";
import type { z } from "zod";
import type { FormField } from "./types";

/**
 * 共通フォーム
 */
export default function CommonForm<
	TValues extends FieldValues & Record<string, string>,
>(props: {
	schema: z.ZodObject<z.ZodRawShape>;
	defaultValues: DefaultValues<TValues>;
	formFields: FormField<TValues>[];
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

	// 入力タイプに応じて指定のコンポーネントを表示
	const renderField = (
		formField: FormField<TValues>,
		controllerField: ControllerRenderProps<TValues, Path<TValues>>,
	) => {
		switch (formField.type) {
			case "input":
				return (
					<Input
						id={formField.name}
						size="$4"
						placeholder={formField.placeholder}
						value={controllerField.value}
						onChangeText={controllerField.onChange}
						onBlur={controllerField.onBlur}
					/>
				);
			case "textarea":
				return (
					<TextArea
						id={formField.name}
						size="$4"
						placeholder={formField.placeholder}
						value={controllerField.value}
						onChangeText={controllerField.onChange}
						onBlur={controllerField.onBlur}
					/>
				);
			default: {
				const exhaustiveCheck: never = formField.type;
				return exhaustiveCheck;
			}
		}
	};

	return (
		<YStack gap="$4">
			{/* フォームフィールド */}
			{props.formFields.map((formField) => (
				<YStack key={formField.name}>
					{/* フォームラベル */}
					<Label htmlFor={formField.name}>{formField.label}</Label>
					<Controller<TValues>
						control={control}
						name={formField.name}
						render={({ field, fieldState }) => (
							<YStack gap="$2">
								{/* フォーム入力欄 */}
								{renderField(formField, field)}

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
			))}

			{/* 送信ボタン */}
			<Button onPress={handleSubmit(submit)} disabled={formState.isSubmitting}>
				{props.submitLabel}
			</Button>
		</YStack>
	);
}
