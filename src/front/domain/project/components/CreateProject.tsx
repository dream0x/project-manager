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
import { useProjectStore } from "../state";

// リクエストの型
export type CreateProjectRequest = components["schemas"]["CreateProjectRequest"];

// スキーマ
export const createProjectSchema = z.object({
	name: z
		.string()
		.trim()
		.min(1, "名前を入力してください")
		.max(100, "名前は100文字以内で入力してください"),
}) satisfies z.ZodType<CreateProjectRequest>;

// 作成フォーム
export default function CreateProject() {
	// 作成リクエスト
	const createProject = useProjectStore((state) => state.create);

	// フォームのデフォルト値
	const createProjectDefaultValues: CreateProjectRequest = {
		name: ""
	};

	// フォームの初期化
	const { control, handleSubmit, formState, reset } =
		useForm<CreateProjectRequest>({
			resolver: zodResolver(createProjectSchema),
			defaultValues: createProjectDefaultValues,
		});

	// フォーム送信時処理
	const submit = async (values: CreateProjectRequest) => {
		createProject(values);
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
						<Text>Projectを追加</Text>
					</XStack>
				</Button>
			}
			content={(closeDialog) => (
				<FormArea
					handleSubmit={handleSubmit}
					submit={async (values: CreateProjectRequest) => {
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
