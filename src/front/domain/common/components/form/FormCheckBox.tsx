import { Check, Tag } from "@tamagui/lucide-icons-2";
import { useEffect } from "react";
import type { Control, FieldValues, Path } from "react-hook-form";
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
						<Text>ラベル</Text>
					</XStack>
				</Button>
			}
			content={() => (
				<FormField control={props.control} id={props.id} label={props.label}>
					{({ field }) => {
						// 選択中のラベルID
						const selectedIds: number[] = field.value ?? [];

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
