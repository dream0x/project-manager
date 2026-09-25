import { Check, Tag } from "@tamagui/lucide-icons-2";
import { useEffect } from "react";
import {
	type Control,
	type FieldValues,
	type Path,
	useWatch,
} from "react-hook-form";
import { Button, Checkbox, Text, XStack, YStack } from "tamagui";
import { useLabelStore } from "@/domain/label/state";
import CommonDialog from "../CommonDialog";
import FormField from "./FormField";

export default function FormCheckBox<T extends FieldValues>(props: {
	control: Control<T>;
	id: Path<T>;
	label: string;
}) {
	// ラベル一覧
	const labels = useLabelStore((state) => state.labels);

	useEffect(() => {
		useLabelStore.getState().getAll();
	}, []);

	// 選択中のラベルID
	const selectedIds: number[] =
		useWatch({ control: props.control, name: props.id }) ?? [];

	// 選択中のラベル名
	const selectedNames = labels
		.filter((label) => selectedIds.includes(label.id))
		.map((label) => label.name);

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
						<Tag />
						<Text>
							{selectedNames.length > 0 ? selectedNames.join("、") : "ラベル"}
						</Text>
					</XStack>
				</Button>
			}
			content={() => (
				<FormField control={props.control} id={props.id} label={props.label}>
					{({ field }) => {
						const toggle = (id: number) => {
							field.onChange(
								selectedIds.includes(id)
									? selectedIds.filter((labelId) => labelId !== id)
									: [...selectedIds, id],
							);
						};

						return (
							<YStack gap="$2">
								{labels.map((label) => (
									<XStack key={label.id} alignItems="center" gap="$2">
										<Checkbox
											id={`${props.id}-${label.id}`}
											checked={selectedIds.includes(label.id)}
											onCheckedChange={() => toggle(label.id)}
										>
											<Checkbox.Indicator>
												<Check />
											</Checkbox.Indicator>
										</Checkbox>
										<Text>{label.name}</Text>
									</XStack>
								))}
							</YStack>
						);
					}}
				</FormField>
			)}
		/>
	);
}
