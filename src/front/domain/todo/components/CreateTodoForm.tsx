import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button, Input, Label, Text, YStack } from "tamagui";
import { z } from "zod";
import { useTodoStore } from "@/domain/todo/state";

const todoSchema = z.object({
	title: z
		.string()
		.min(1, "タイトルを入力してください")
		.max(100, "タイトルは100文字以内で入力してください"),

	description: z.string().max(500, "詳細は500文字以内で入力してください"),
});

type TodoFormValues = z.infer<typeof todoSchema>;

export default function CreateTodoForm({
	onSuccess,
}: {
	onSuccess: () => void;
}) {
	const createTodo = useTodoStore((state) => state.createTodo);
	const { control, formState, handleSubmit, reset } = useForm<TodoFormValues>({
		resolver: zodResolver(todoSchema),
		defaultValues: {
			title: "",
			description: "",
		},
	});

	const onSubmit = async (values: TodoFormValues) => {
		await createTodo(values.title, values.description);
		reset();
		onSuccess();
	};
	return (
		<YStack gap="$4">
			<YStack>
				<Label htmlFor="title">タイトル</Label>
				<Controller
					control={control}
					name="title"
					render={({ field }) => (
						<YStack gap="$2">
							<Input
								id="title"
								size="$4"
								placeholder="タイトルを入力してください"
								value={field.value}
								onChangeText={field.onChange}
								onBlur={field.onBlur}
								autoCapitalize="none"
								keyboardType="default"
							/>

							{formState.errors.title && (
								<Text color="red" fontSize="$3">
									{formState.errors.title.message}
								</Text>
							)}
						</YStack>
					)}
				/>
			</YStack>

			<YStack>
				<Label htmlFor="description">詳細</Label>
				<Controller
					control={control}
					name="description"
					render={({ field }) => (
						<YStack gap="$2">
							<Input
								id="description"
								size="$4"
								placeholder="詳細を入力してください"
								value={field.value}
								onChangeText={field.onChange}
								onBlur={field.onBlur}
							/>

							{formState.errors.description && (
								<Text color="$red10" fontSize="$2">
									{formState.errors.description.message}
								</Text>
							)}
						</YStack>
					)}
				/>
			</YStack>
			<Button
				size="$4"
				theme="blue"
				onPress={handleSubmit(onSubmit)}
				disabled={formState.isSubmitting}
			>
				送信
			</Button>
		</YStack>
	);
}
