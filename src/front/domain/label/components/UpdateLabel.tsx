import { zodResolver } from "@hookform/resolvers/zod";
import { Circle } from "@tamagui/lucide-icons-2";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Text, XStack, YStack } from "tamagui";
import z from "zod";
import type { components } from "@/domain/common/api-types";
import CommonDialog from "@/domain/common/components/CommonDialog";
import DeleteButton from "@/domain/common/components/form/DeleteButton";
import FormArea from "@/domain/common/components/form/FormArea";
import FormInput from "@/domain/common/components/form/FormInput";
import { useLabelStore } from "../state";
import type { Label } from "../type";

// リクエストの型
export type UpdateLabelRequest = components["schemas"]["UpdateLabelRequest"];

// スキーマ
export const updateLabelSchema = z.object({
	name: z
		.string()
		.trim()
		.min(1, "名前を入力してください")
		.max(100, "名前は100文字以内で入力してください"),
}) satisfies z.ZodType<UpdateLabelRequest>;

// 作成フォーム
export default function UpdateLabel(props: { label: Label }) {
	// 作成リクエスト
	const updateLabel = useLabelStore((state) => state.update);

	// フォームのデフォルト値
	const updateLabelDefaultValues: UpdateLabelRequest = {
		name: props.label.name,
	};

	// フォームの初期化
	const { control, handleSubmit, formState, reset } =
		useForm<UpdateLabelRequest>({
			resolver: zodResolver(updateLabelSchema),
			defaultValues: updateLabelDefaultValues,
		});

	// Labelの更新に合わせてフォームのデフォルト値を同期
	useEffect(() => {
		reset({
			name: props.label.name,
		});
	}, [reset, props.label.name]);

	// フォーム送信時処理
	const submit = async (values: UpdateLabelRequest) => {
		updateLabel(props.label.id, values);
		reset();
	};

	const deleteLabel = useLabelStore((state) => state.delete);
	const deleteSubmit = () => {
		deleteLabel(props.label.id);
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
						<Text>{props.label.name}</Text>
					</XStack>
				</Button>
			}
			content={(closeDialog) => (
				<FormArea
					handleSubmit={handleSubmit}
					submit={async (values: UpdateLabelRequest) => {
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
