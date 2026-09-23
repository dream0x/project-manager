import { zodResolver } from "@hookform/resolvers/zod";
import { Circle, CircleCheck } from "@tamagui/lucide-icons-2";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Text, View, XStack } from "tamagui";
import z from "zod";
import type { components } from "@/domain/common/api-types";
import CommonDialog from "@/domain/common/components/CommonDialog";
import FormArea from "@/domain/common/components/form/FormArea";
import FormInput from "@/domain/common/components/form/FormInput";
import FormTextArea from "@/domain/common/components/form/FormTextArea";
import { useTodoStore } from "../state";
import type { Todo } from "../type";

// リクエストの型
export type UpdateTodoRequest = components["schemas"]["UpdateTodoRequest"];

// スキーマ
export const updateTodoSchema = z.object({
	title: z
		.string()
		.trim()
		.min(1, "タイトルを入力してください")
		.max(100, "タイトルは100文字以内で入力してください"),
	description: z
		.string()
		.trim()
		.max(500, "詳細は500文字以内で入力してください"),
	completed: z.boolean(),
}) satisfies z.ZodType<UpdateTodoRequest>;

// 作成フォーム
export default function UpdateTodo(props: { todo: Todo }) {
	// トグルアイコンホバー時の状態
	const [isHoveringToggle, setIsHoveringToggle] = useState(false);

	// 作成リクエスト
	const updateTodo = useTodoStore((state) => state.update);

	// フォームのデフォルト値
	const updateTodoDefaultValues: UpdateTodoRequest = {
		title: props.todo.title,
		description: props.todo.description,
		completed: props.todo.completed,
	};

	// フォームの初期化
	const { control, handleSubmit, formState, reset } =
		useForm<UpdateTodoRequest>({
			resolver: zodResolver(updateTodoSchema),
			defaultValues: updateTodoDefaultValues,
		});

	// タスクの更新に合わせてフォームのデフォルト値を同期
	useEffect(() => {
		reset({
			title: props.todo.title,
			description: props.todo.description,
			completed: props.todo.completed,
		});
	}, [reset, props.todo.title, props.todo.description, props.todo.completed]);

	// フォーム送信時処理
	const submit = async (values: UpdateTodoRequest) => {
		updateTodo(props.todo.id, values);
		reset();
	};

	return (
		<CommonDialog
			trigger={
				<Button
					unstyled
					cursor="pointer"
					borderRadius="$2"
					borderWidth={1}
					borderColor="lightgray"
					padding="$2"
				>
					<XStack gap="$2" alignItems="center">
						<Button
							unstyled
							cursor="pointer"
							padding="$2"
							icon={
								isHoveringToggle || props.todo.completed ? (
									<CircleCheck />
								) : (
									<Circle />
								)
							}
							onMouseEnter={() => setIsHoveringToggle(true)}
							onMouseLeave={() => setIsHoveringToggle(false)}
							onPress={() =>
								submit({
									...updateTodoDefaultValues,
									completed: !props.todo.completed,
								})
							}
						/>
						<Text
							textDecorationLine={
								props.todo.completed ? "line-through" : "none"
							}
						>
							{props.todo.title}
						</Text>
					</XStack>
				</Button>
			}
			content={(closeDialog) => (
				<FormArea
					handleSubmit={handleSubmit}
					submit={async (values: UpdateTodoRequest) => {
						await submit(values);
						closeDialog();
					}}
					formState={formState}
					submitLabel="作成"
				>
					<View>
						<FormInput
							control={control}
							id="title"
							label="タイトル"
							placeholder="タイトル"
						/>

						<FormTextArea
							control={control}
							id="description"
							label="詳細"
							placeholder="詳細"
						/>
					</View>
				</FormArea>
			)}
		/>
	);
}
