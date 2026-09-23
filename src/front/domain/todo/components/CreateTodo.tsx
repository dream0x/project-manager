import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "@tamagui/lucide-icons-2";
import { useForm } from "react-hook-form";
import { Button, Text, View, XStack } from "tamagui";
import z from "zod";
import type { components } from "@/domain/common/api-types";
import CommonDialog from "@/domain/common/components/CommonDialog";
import FormArea from "@/domain/common/components/form/FormArea";
import FormInput from "@/domain/common/components/form/FormInput";
import FormTextArea from "@/domain/common/components/form/FormTextArea";
import { useTodoStore } from "../state";

// リクエストの型
export type CreateTodoRequest = components["schemas"]["CreateTodoRequest"];

// スキーマ
export const createTodoSchema = z.object({
	title: z
		.string()
		.trim()
		.min(1, "タイトルを入力してください")
		.max(100, "タイトルは100文字以内で入力してください"),
	description: z
		.string()
		.trim()
		.max(500, "詳細は500文字以内で入力してください")
		.optional(),
}) satisfies z.ZodType<CreateTodoRequest>;

// 作成フォーム
export default function CreateTodo() {
	// 作成リクエスト
	const createTodo = useTodoStore((state) => state.create);

	// フォームのデフォルト値
	const createTodoDefaultValues: CreateTodoRequest = {
		title: "",
		description: "",
	};

	// フォームの初期化
	const { control, handleSubmit, formState, reset } =
		useForm<CreateTodoRequest>({
			resolver: zodResolver(createTodoSchema),
			defaultValues: createTodoDefaultValues,
		});

	// フォーム送信時処理
	const submit = async (values: CreateTodoRequest) => {
		createTodo(values);
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
					<XStack alignItems="center">
						<Plus />
						<Text>タスクを追加</Text>
					</XStack>
				</Button>
			}
			content={(closeDialog) => (
				<FormArea
					handleSubmit={handleSubmit}
					submit={async (values: CreateTodoRequest) => {
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
