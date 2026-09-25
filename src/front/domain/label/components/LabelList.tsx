import { useEffect } from "react";
import { Separator, Text, YStack } from "tamagui";
import { useLabelStore } from "@/domain/label/state";
import CreateLabel from "./CreateLabel";
import UpdateLabel from "./UpdateLabel";

export default function LabelList() {
	const labels = useLabelStore((state) => state.labels);

	useEffect(() => {
		useLabelStore.getState().getAll();
	}, []);

	return (
		<YStack gap="$3" alignItems="center">
			<YStack width="100%" $xl={{ width: "50%" }} padding="$6">
				{/* Label追加欄 */}
				<CreateLabel />

				{/* Label一覧 */}
				<YStack gap="$2">
					<Text marginTop="$3">Label一覧</Text>
					{labels.map((label) => (
						<UpdateLabel key={label.id} label={label} />
					))}
				</YStack>
			</YStack>
		</YStack>
	);
}
