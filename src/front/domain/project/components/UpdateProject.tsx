import { zodResolver } from "@hookform/resolvers/zod";
import { Circle } from "@tamagui/lucide-icons-2";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Text, View, XStack, YStack } from "tamagui";
import z from "zod";
import type { components } from "@/domain/common/api-types";
import CommonDialog from "@/domain/common/components/CommonDialog";
import DeleteButton from "@/domain/common/components/form/DeleteButton";
import FormArea from "@/domain/common/components/form/FormArea";
import FormInput from "@/domain/common/components/form/FormInput";
import FormTextArea from "@/domain/common/components/form/FormTextArea";
import { useProjectStore } from "../state";
import type { Project } from "../type";

// リクエストの型
export type UpdateProjectRequest = components["schemas"]["UpdateProjectRequest"];

// スキーマ
export const updateProjectSchema = z.object({
	name: z
		.string()
		.trim()
		.min(1, "名前を入力してください")
		.max(100, "名前は100文字以内で入力してください"),
}) satisfies z.ZodType<UpdateProjectRequest>;

// 作成フォーム
export default function UpdateProject(props: { project: Project }) {
	// 作成リクエスト
	const updateProject = useProjectStore((state) => state.update);

	// フォームのデフォルト値
	const updateProjectDefaultValues: UpdateProjectRequest = {
		name: props.project.name
	};

	// フォームの初期化
	const { control, handleSubmit, formState, reset } =
		useForm<UpdateProjectRequest>({
			resolver: zodResolver(updateProjectSchema),
			defaultValues: updateProjectDefaultValues,
		});

	// Projectの更新に合わせてフォームのデフォルト値を同期
	useEffect(() => {
		reset({
			name: props.project.name
		});
	}, [reset, props.project.name]);

	// フォーム送信時処理
	const submit = async (values: UpdateProjectRequest) => {
		updateProject(props.project.id, values);
		reset();
	};

	const deleteProject = useProjectStore((state) => state.delete);
	const deleteSubmit = () => {
		deleteProject(props.project.id);
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
						<Circle padding="$2" />
						<Text>{props.project.name}</Text>
					</XStack>
				</Button>
			}
			content={(closeDialog) => (
				<FormArea
					handleSubmit={handleSubmit}
					submit={async (values: UpdateProjectRequest) => {
						await submit(values);
						closeDialog();
					}}
					formState={formState}
					submitLabel="更新"
				>
					<YStack>
						<DeleteButton onSubmit={deleteSubmit} />
						<FormInput
							control={control}
							id="name"
							label="名前"
							placeholder="名前"
						/>
					</YStack>
				</FormArea>
			)}
		/>
	);
}
