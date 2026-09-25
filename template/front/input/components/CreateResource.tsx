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
import { useResourceStore } from "../state";

// リクエストの型
export type CreateResourceRequest = components["schemas"]["CreateResourceRequest"];

// スキーマ
export const createResourceSchema = z.object({
	name: z
		.string()
		.trim()
		.min(1, "名前を入力してください")
		.max(100, "名前は100文字以内で入力してください"),
}) satisfies z.ZodType<CreateResourceRequest>;

// 作成フォーム
export default function CreateResource() {
	// 作成リクエスト
	const createResource = useResourceStore((state) => state.create);

	// フォームのデフォルト値
	const createResourceDefaultValues: CreateResourceRequest = {
		name: ""
	};

	// フォームの初期化
	const { control, handleSubmit, formState, reset } =
		useForm<CreateResourceRequest>({
			resolver: zodResolver(createResourceSchema),
			defaultValues: createResourceDefaultValues,
		});

	// フォーム送信時処理
	const submit = async (values: CreateResourceRequest) => {
		createResource(values);
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
						<Text>Resourceを追加</Text>
					</XStack>
				</Button>
			}
			content={(closeDialog) => (
				<FormArea
					handleSubmit={handleSubmit}
					submit={async (values: CreateResourceRequest) => {
						await submit(values);
						closeDialog();
					}}
					formState={formState}
					submitLabel="作成"
				>
					<View>
						<FormInput
							control={control}
							id="name"
							label="名前"
							placeholder="名前"
						/>
					</View>
				</FormArea>
			)}
		/>
	);
}
